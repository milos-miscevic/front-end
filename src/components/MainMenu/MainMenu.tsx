import React from 'react';
import { Nav, Card, CardImg, Container } from 'react-bootstrap';
import { HashRouter, Link } from 'react-router-dom';
import Cart from '../Cart/Cart';

export class MainMenuItem {
    text: string = '';
    link: string = '#';

    constructor(text: string, link: string) {
        this.text = text;
        this.link = link;
    }
}

interface MainMenuProperties {
    items: MainMenuItem[];
    showCart?: boolean;
}

interface MainMenuState {
    items: MainMenuItem[];
}

export class MainMenu extends React.Component<MainMenuProperties> {
    state: MainMenuState;

    constructor(props: Readonly<MainMenuProperties>) {
        super(props);

        this.state = {
            items: props.items,
        };

    }

    public setItems(items: MainMenuItem[]) {
        this.setState({
            items: items,
        });
    }

    render() {
        return (

            <Container>
                <Card>
                    <Card.Header >
                        <CardImg src="https://jewellery-art.com/wp-content/uploads/2018/10/Touch-of-Luxury-Logo-Horizontal-Version-Gold-Foil-to-use-on-white-background.png" alt="logo"></CardImg>
                    </Card.Header>
                </Card>

                <Nav variant="tabs">

                    <HashRouter>
                        {this.state.items.map(this.makeNavLink)}
                        {this.props.showCart ? <Cart /> : ''}

                    </HashRouter>

                </Nav>
            </Container>

        );
    }

    private makeNavLink(item: MainMenuItem) {
        return (
            <Link to={item.link} className="nav-link">
                {item.text}
            </Link>

        );
    }
}