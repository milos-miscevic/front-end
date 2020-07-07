import React from 'react';
import CartType from '../../types/CartType';
import api, { ApiResponse } from '../../api/api';
import { Nav, Modal, Button, Table, Form, Alert, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown, faMinusSquare } from '@fortawesome/free-solid-svg-icons';

interface CartState {
    count: number;
    cart?: CartType;
    visible: boolean;
    message: string;
    cartMenuColor: string;
    formData: {
        name: string;
        surname: string;
        email: string;
        address: string;
    };
}


export default class Cart extends React.Component {
    state: CartState;


    constructor(props: Readonly<{}>) {
        super(props);

        this.state = {
            count: 0,
            visible: false,
            message: '',
            cartMenuColor: '#000000',

            formData: {
                name: '',
                surname: '',
                email: '',
                address: '',
            },

        };
    }

    componentDidMount() {
        this.updateCart();
        window.addEventListener("cart.update", () => this.updateCart());
    }
    componentWillUnmount() {
        window.removeEventListener("cart.update", () => this.updateCart());
    }

    private setStateCount(newCount: number) {
        this.setState(Object.assign(this.state, { count: newCount }));
    }

    private setStateCart(newCart?: CartType) {
        this.setState(Object.assign(this.state, { cart: newCart }));
    }

    private setStateVisible(newState: boolean) {
        this.setState(Object.assign(this.state, { visible: newState }));
    }

    private setStateMessage(newMessage: string) {
        this.setState(Object.assign(this.state, { message: newMessage }));
    }

    private setStateMenuColor(newColor: string) {
        this.setState(Object.assign(this.state, { cartMenuColor: newColor }));
    }


    private updateCart() {
        api('cart', 'get', {})
            .then((res: ApiResponse) => {
                if (res.status === 'error') {
                    this.setStateCount(0);
                    this.setStateCart(undefined);
                    return;
                }
                this.setStateCart(res.data);
                this.setStateCount(res.data.cartArticles.length);

                this.setStateMenuColor('#FF0000');
                setTimeout(() => this.setStateMenuColor('#000000'), 500);
            });
    }

    private calculateSum(): number {

        let sum: number = 0;

        if (this.state.cart == undefined) {
            return sum;
        } else {
            for (const item of this.state.cart?.cartArticles) {
                sum += item.article.price * item.quantity;
            }
        }

        return sum;
    }

    private sendCartUpdate(data: any) {
        api('cart', 'patch', data)
            .then((res: ApiResponse) => {
                if (res.status === 'error') {
                    this.setStateCount(0);
                    this.setStateCart(undefined);
                    return;
                }
                this.setStateCart(res.data);
                this.setStateCount(res.data.cartArticles.length);
            });
    }

    private updateQuantity(event: React.ChangeEvent<HTMLInputElement>) {
        const articleId = event.target.dataset.articleId;
        const newQuantity = event.target.value;


        this.sendCartUpdate({
            articleId: Number(articleId),
            quantity: Number(newQuantity),
        });
    }

    private removeFromCart(articleId: number) {

        this.sendCartUpdate({
            articleId: Number(articleId),
            quantity: 0,
        });
    }

    private makeOrder() {
        const data = {
            name: this.state.formData.name,
            surname: this.state.formData.surname,
            email: this.state.formData.email,
            address: this.state.formData.address,
        }
        api('cart/makeOrder', 'post', data)
            .then((res: ApiResponse) => {
                if (res.status === 'error') {
                    this.setStateCount(0);
                    this.setStateCart(undefined);
                    return;
                }
                this.setStateMessage('Your order has been made');

                this.setStateCart(undefined);
                this.setStateCount(0);
            });
    }

    private hideCart() {
        this.setStateMessage('');
        this.setStateVisible(false);
    }

    //dodato
    private formInputChanged(event: React.ChangeEvent<HTMLInputElement>) {
        const newFormData = Object.assign(this.state.formData, {
            [event.target.id]: event.target.value,
        });

        const newState = Object.assign(this.state, {
            formData: newFormData,
        });

        this.setState(newState);
    }


    render() {
        const sum = this.calculateSum();
        return (
            <>
                <Nav.Item>
                    <Nav.Link active={false} onClick={() => this.setStateVisible(true)}
                        style={{ color: this.state.cartMenuColor }}>
                        <FontAwesomeIcon icon={faCartArrowDown} />({this.state.count})
                </Nav.Link>

                </Nav.Item>
                <Modal size="lg" centered show={this.state.visible} onHide={() => this.hideCart()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Your shopping cart</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table hover size="sm">
                            <thead>
                                <tr>
                                    <th>Category</th>
                                    <th>Article</th>
                                    <th className="text-right">Quantity</th>
                                    <th className="text-right">Price</th>
                                    <th className="text-right">Total</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.cart?.cartArticles.map(item => {

                                    const price = Number(item.article.price).toFixed(2);
                                    const total = Number(item.article.price * item.quantity).toFixed(2);

                                    return (
                                        <tr>
                                            <td>{item.article.category.name}</td>
                                            <td>{item.article.name}</td>

                                            <td className="text-right">
                                                <Form.Control type="number" step="1" min="1"
                                                    value={item.quantity}
                                                    data-article-id={item.article.articleId}
                                                    onChange={(e) => this.updateQuantity(e as any)} />

                                            </td>
                                            <td className="text-right">{price} RSD</td>
                                            <td className="text-right">{total} RSD</td>
                                            <td >
                                                <FontAwesomeIcon
                                                    icon={faMinusSquare}
                                                    onClick={() => this.removeFromCart(item.article.articleId)} />

                                            </td>
                                        </tr>
                                    )
                                }, this)}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td className="text-right"><strong>Total: </strong></td>
                                    <td className="text-right">{Number(sum).toFixed(2)} RSD</td>
                                    <td></td>
                                </tr>
                            </tfoot>
                        </Table>


                        <Form>
                            <Row>

                                <Col md="6">
                                    <Form.Group>
                                        <Form.Label htmlFor="name">Name:</Form.Label>
                                        <Form.Control type="name" id="name"
                                            value={this.state.formData.name}
                                            onChange={event => this.formInputChanged(event as any)} />
                                    </Form.Group>
                                </Col>

                                <Col md="6">
                                    <Form.Group>
                                        <Form.Label htmlFor="surname">Surname:</Form.Label>
                                        <Form.Control type="surname" id="surname"
                                            value={this.state.formData.surname}
                                            onChange={event => this.formInputChanged(event as any)} />
                                    </Form.Group>
                                </Col>

                                <Col md="6">
                                    <Form.Group>
                                        <Form.Label htmlFor="address">Address:</Form.Label>
                                        <Form.Control type="address" id="address"
                                            value={this.state.formData.address}
                                            onChange={event => this.formInputChanged(event as any)} />
                                    </Form.Group>
                                </Col>

                                <Col md="6">
                                    <Form.Group>
                                        <Form.Label htmlFor="email">Email:</Form.Label>
                                        <Form.Control type="email" id="email"
                                            value={this.state.formData.email}
                                            onChange={event => this.formInputChanged(event as any)} />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>



                        <Alert variant="success" className={this.state.message ? '' : 'd-none'}>
                            {this.state.message}
                        </Alert>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => this.makeOrder()}
                            disabled={this.state.cart?.cartArticles.length === 0 || this.state.formData.name === '' || this.state.formData.surname === '' || this.state.formData.email === '' || this.state.formData.address === '' || sum === 0}>
                            Make an order
            </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}