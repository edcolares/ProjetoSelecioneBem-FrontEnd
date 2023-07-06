import React, { useState } from 'react';
import { Alert, Container, Row, Col, Form, FormGroup, Label, Input, Button, Card, CardBody } from 'reactstrap';
import { useAuth } from '../../context/AuthProvider/useAuth';
import { useNavigate } from 'react-router-dom';
import SelecioneBem2 from '../../assets/1.svg';

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
        <Container
            className="d-flex bg-light align-items-center justify-content-center p-0 m-0"
            style={
                {
                    height: '85vh'
                }}>
            <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className='d-flex align-items-center justify-content-center'>
                    <Form onSubmit={onFinish}>
                    <FormGroup className='px-4'>
                            <img
                                src={SelecioneBem2}
                                alt='Dashboard'
                                width={200}
                                height={40}
                            />
                            <h5 className='fw-light p-2 mb-4'>
                                Seja bem-vindo ao nosso sistema. <br />
                                Por favor, faça login!
                            </h5>
                        </FormGroup>
                        <Card
                            className="d-flex align-items-center justify-content-center p-3"
                            color='light'
                        outline>
                            <CardBody>
                                {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
                                <FormGroup row className='px-2 d-flex align-items-baseline'>
                                    <Label for="email" className=''>Email</Label>
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

                                <FormGroup row className='px-2 d-flex align-items-baseline'>
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
                                <FormGroup row className='p-2 d-flex align-items-baseline'>
                                    <Button color="primary" className="w-100" type="submit">
                                        Fazer Login
                                    </Button>
                                </FormGroup>
                                <FormGroup className='mt-5'>
                                    Ainda não tem acesso?
                                    <Button
                                        variant="link"
                                        size="sm"
                                        color='link'
                                        onClick={() => navigate('/signup')}
                                    >
                                        Clique aqui
                                    </Button>
                                </FormGroup>
                            </CardBody>
                        </Card>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginScreen;