import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListAlt } from '@fortawesome/free-solid-svg-icons';
import CategoryType from '../../types/CategoryType';
import api, { ApiResponse } from '../../api/api';
import ArticleType from '../../types/ArticleType';
import { Link } from 'react-router-dom';
import { ApiConfig } from '../../config/api.config';

interface CategoryPageProperties {
    match: {
        params: {
            cId: number;
        }
    }
}

interface CategoryPageState {
    cateogry?: CategoryType;
    articles?: ArticleType[];
    message: string;
}

interface CategoryDto {
    categoryId: number;
    name: string;
    description: string;
}

interface ArticleDto {
    articleId: number;
    name: string;
    shortDescription?: string,
    description?: string,
    price: number,
    photos?: {
        imagePath: string;
    }[],
    
}

export default class CategoryPage extends React.Component<CategoryPageProperties>{
    state: CategoryPageState;

    constructor(props: Readonly<CategoryPageProperties>) {
        super(props);

        this.state = {
            message: '',
        };

    }

    private setMessage(message: string) {
        const newState = Object.assign(this.state, {
            message: message,
        });
        this.setState(newState);
    }

    private setCategoryData(category: CategoryType) {
        this.setState(Object.assign(this.state, {
            cateogry: category,
        }));
    }

    private setArticles(articles: ArticleType[]) {
        this.setState(Object.assign(this.state, {
            articles: articles,
        }));
    }

    render() {
        return (
            <Container>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            <FontAwesomeIcon icon={faListAlt} /> {this.state.cateogry?.name} {/* Ako postoji uzeti "name" */}
                        </Card.Title>
                        {this.printOptionalMessage()}

                        {this.showArticles()}
                    </Card.Body>
                </Card>

            </Container>
        );
    }

    private showArticles() {
        if (this.state.articles?.length === 0) {
            return(
                <div>
                    There are no articles in this category.
                </div>
            );
        }
        return(
            <Row>
                {this.state.articles?.map(this.singleArticle)}
            </Row>
        )
    }

    private singleArticle(article:ArticleType){
        return (
            <Col lg="4" md="6" sm="6" xs="12">
              <Card className="mb-3">
                  <Card.Header>
                <img alt={article.name}
                src={ApiConfig.PHOTO_PATH+'small/'+article.imageUrl}
                className="w-100" />
                  </Card.Header>
                <Card.Body>
                  <Card.Title as="p">
                    <strong>{article.name}</strong>
                  </Card.Title>

                  <Card.Text>
                      {article.shortDescription}
                  </Card.Text>

                  <Card.Text>
                     Price: {Number(article.price).toFixed(2)} RSD
                  </Card.Text>
                  
                  
                  <Link to={`/article/${article.articleId}`}
                    className="btn btn-primary btn-block btn-sm">
      
                    Open article page
      
                  </Link>
      
                </Card.Body>
              </Card>
            </Col>
          );
    }

    private printOptionalMessage() {
        if (this.state.message === '') {
            return;
        }
        return (
            <Card.Text>
                {this.state.message}
            </Card.Text>
        );
    }

    componentDidMount() {
        this.getCategoryData();
    }

    //Ovo radimo kako se stranica nebi ponovo ucitavala, ako je vec jednom u proslosti ucitana
    componentDidUpdate(oldProperties: CategoryPageProperties) {
        if (oldProperties.match.params.cId === this.props.match.params.cId) {
            return;
        }
        this.getCategoryData();
    }


    private getCategoryData() {
        api('api/category/' + this.props.match.params.cId, 'get', {})
            .then((res: ApiResponse) => {
                if (res.status === 'error') {
                    return this.setMessage('Request error. Please refresh the page.');
                }

                const categoryData: CategoryType = {
                    categoryId: res.data.categoryId,
                    name: res.data.name,
                    description: res.data.description,
                };

                this.setCategoryData(categoryData);

            });

        api('api/article/search/', 'post', {

            categoryId: Number(this.props.match.params.cId),
            priceMin: 0.01,
            priceMax: Number.MAX_SAFE_INTEGER,
            features: [],
            orderBy: "price",
            orderDirection: "ASC"
        })
            .then((res: ApiResponse) => {
                if (res.status === 'error') {
                    
                    return this.setMessage('Request error. Please refresh the page.');
                }

                if(res.data.statusCode === 0) {
                    this.setMessage('');
                    this.setArticles([]);
                    return;
                }

                const articles: ArticleType[] =
                    res.data.map((article: ArticleDto) => {

                        const object: ArticleType = {

                            articleId: article.articleId,
                            name: article.name,
                            shortDescription: article.shortDescription,
                            description: article.description,
                            imageUrl: '',
                            price: article.price,
                        };

                        if (article.photos !== undefined && article.photos?.length > 0) {
                            object.imageUrl = article.photos[article.photos?.length-1].imagePath;
                        }
                        

                        return object;
                    });

                this.setArticles(articles);
            });
    }
}