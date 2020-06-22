import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class LoginPage extends React.Component {

    render() {
        return (
            <Container>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            <FontAwesomeIcon icon={faSignInAlt} /> Login
                        </Card.Title>
                        <Card.Text>
                            The form will be shown here...
                        </Card.Text>
                    </Card.Body>
                </Card>

            </Container>
        );
    }

}