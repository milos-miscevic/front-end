import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListAlt } from '@fortawesome/free-solid-svg-icons';
import CategoryType from '../../types/CategoryType';

interface CategoryPageProperties {
    match: {
        params: {
            cId: number;
        }
    }
}

interface CategoryPageState {
    cateogry?: CategoryType;
}

export default class CategoryPage extends React.Component<CategoryPageProperties>{
    state: CategoryPageState;

    constructor(props: Readonly<CategoryPageProperties>) {
        super(props);

        this.state = {};

    }

    render() {
        return (
            <Container>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            <FontAwesomeIcon icon={faListAlt} /> {this.state.cateogry?.name} {/* Ako postoji uzeti "name" */}
                        </Card.Title>
                        <Card.Text>
                            Here we will have our articles...
                        </Card.Text>
                    </Card.Body>
                </Card>

            </Container>
        );
    }

    componentWillMount() {
        this.getCategoryData();
    }

    //Ovo radimo kako se stranica nebi ponovo ucitavala, ako je vec jednom u proslosti ucitana
    componentWillReceiveProps(newProperties: CategoryPageProperties) {
        if (newProperties.match.params.cId === this.props.match.params.cId) {
            return;
        }
        this.getCategoryData();
    }


    private getCategoryData() {
        setTimeout(() => {
            const data: CategoryType = {
                name: 'Cateogry: ' + this.props.match.params.cId,
                categoryId: this.props.match.params.cId,
                items: []
            };
            this.setState({
                cateogry: data,
            })
        }, 200);
    }
}