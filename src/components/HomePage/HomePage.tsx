import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap'
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CategoryType from '../../types/CategoryType';
import { Link } from 'react-router-dom';
import api, { ApiResponse } from '../../api/api';
import RoledMainMenu from '../RoledMainMenu/RoledMainMenu';
import ApiCategoryDto from '../../dtos/ApiCategoryDto';

interface HomePageState {
  categories: CategoryType[];
}

class HomePage extends React.Component {
  state: HomePageState;

  constructor(props: Readonly<{}>) {
    super(props);

    this.state = {
      categories: []
    };
  }


  componentWillMount() {
    this.getCategories();
  }

  /*  componentWillUpdate() {
      this.getCategories();
    }
    */

  private getCategories() {
    api('api/category/', 'get', {})
      .then((res: ApiResponse) => {
        if (res.status === "error") {
          return;
        }
        this.putCategoriesInState(res.data);
      });

  }

  private putCategoriesInState(data?: ApiCategoryDto[]) {
    const categories: CategoryType[] | undefined = data?.map(category => {
      return {
        categoryId: category.categoryId,
        name: category.name,
        imagePath: category.imagePath,
        description: category.description,
        items: [],
      };
    });

    const newState = Object.assign(this.state, {
      categories: categories,
    });

    this.setState(newState);
  }

  render() {
    return (
      <Container>
        <RoledMainMenu role="visitor" />
        <Card>
          <Card.Body>
            <Card.Title>
              <FontAwesomeIcon icon={faHome} />  Shop fine jewelry creations of timeless beauty and superlative craftsmanship that will be treasured always
            </Card.Title>
            <Row>
              {this.state.categories?.map(this.singleCategory)}
            </Row>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  private singleCategory(category: CategoryType) {
    return (
      <Col lg="3" md="4" sm="6" xs="12">
        <Card className="mb-3">
          <Card.Body>
            <Card.Header>
              <img alt={category.name}
                src={category.imagePath}
                className="w-100" />
            </Card.Header>
            <Card.Title as="p">
              <b>{category.name}</b>
            </Card.Title>
            <Card.Text>
              {category.description}
            </Card.Text>

            <Link to={`/category/${category.categoryId}`}
              className="btn btn-primary btn-block btn-sm">

              Open category

            </Link>

          </Card.Body>
        </Card>
      </Col>
    );
  }

}

export default HomePage;
