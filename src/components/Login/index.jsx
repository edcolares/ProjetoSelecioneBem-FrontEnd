import React, { useState } from 'react';
import { Alert, Container, Row, Col, Form, FormGroup, Label, Input, Button, Card } from 'reactstrap';
import { useAuth } from '../../context/AuthProvider/useAuth';
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const auth = useAuth();
    const navigate = useNavigate();

    const onFinish = async (event) => {
        event.preventDefault();

        try {
            await auth.authenticate(email, password);
            navigate('/dashboard');

            window.location.reload();

        } catch (error) {
            setErrorMessage('E-mail ou senha inválidos');
        }
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ height: '80vh' }}>
            <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form onSubmit={onFinish}>
                        <Card className="d-flex align-items-center justify-content-center p-3">
                            <h1 className="h3 mb-3 fw-normal">Login</h1>
                            {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    className="form-control"
                                    placeholder="Email"
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    className="form-control"
                                    placeholder="Password"
                                    required
                                />
                            </FormGroup>
                            <Button color="primary" className="w-100" type="submit">
                                Logar
                            </Button>
                            <div className='mt-3'>
                                Ainda não tem acesso?
                                <Button
                                    variant="link"
                                    size="sm"
                                    color='link'
                                    onClick={() => navigate('/signup')}
                                >
                                    Clique aqui
                                </Button>
                            </div>
                        </Card>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginScreen;