import React, { useState } from 'react';
import { CardImg, Row, Col, Form, FormGroup, Label, Input, Button, Card, FormFeedback, CardTitle, CardBody, CardText, CardHeader, Alert } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import imagem2 from '../../assets/imagem.png';
import fetch from '../../services/config'

/**
 * Esquema de VALIDAÇÃO do FORMULÁRIO
 */
const schema = yup.object().shape({
    name: yup.string().required('Campo obrigatório'),
    email: yup.string().required('Campo obrigatório').email('Informe um email válido'),
    password: yup.string().required('Campo obrigatório').min(6, 'A senha deve possuir no mínimo 6 caracteres'),
    confirmPassword: yup.string().required('Campo obrigatório').min(6, 'A senha deve possuir no mínimo 6 caracteres').oneOf([yup.ref('password'), null], 'As senhas devem ser iguais'),
});


const SignUpScreen = () => {


    const navigate = new useNavigate();

    /* Variavel que recebe os campos do formulário */
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});

    /**
 * Função responsável por atualizar o state da variável com o valor
 * passado.
 * Quando ela atender uma validação, vai remover o erro da variável errors.
 * @param {Form} event Recebe o formulário e atualiza o campo
 */
    const handleChange = (event) => {
        const { name, value } = event.target;
        // Aqui atualiza os valores
        setFormData(prevState => ({ ...prevState, [name]: value }));
        // Se um campo for corrigido, aqui remove a linha onde armazenava o erro
        // const { [name]: deletedError, ...restErrors } = errors;
        // setErrors(restErrors);

        const updatedErrors = { ...errors };
        delete updatedErrors[name];
        setErrors(updatedErrors);
    }

    /**
        * Função responsável pela validação das informações conforme o schema montado.
        * Caso encontre erros, a variável errors será alimentada com o campo e o tipo 
        * que gerou o erro, caso o formulário não tenha erros fará a conecção com a API
        * e add uma nova Skill
        * @param {*} event 
        */
    const handleSubmit = (event) => {
        event.preventDefault();

        /**
         * Faz a validação do SCHEMA
         * se atendido em .then fará a inclusão no BD
         * se atendido em .catch atualiza o erro e não inclui dado no BD
         */
        schema.validate(formData, { abortEarly: false })
            .then(async validData => {
                const name = validData.name;
                const email = validData.email;
                const password = validData.password;
                setErrors({});

                await fetch.post("/signup", {
                    name, email, password
                }).then((response) => {
                    if (response.request.status === 201) {
                        navigate("/login");
                    }
                }).catch((err) => {
                    const status = err.response.status;
                    const message = err.response.data.message;
                    if (status === 400) {
                        setErrors(prevState => ({ ...prevState, ['status400']: message }));
                    }
                });
            })
            .catch(error => {
                const errorObj = error.inner.reduce((acc, curr) => {
                    acc[curr.path] = curr.message;
                    return acc;
                }, {});
                setErrors(errorObj);
            });
    }

    return (
        <Row>
            <Col md={8}>
                <CardImg
                    alt="Card image cap"
                    src={imagem2}
                    top
                    width="100%"
                    height="100%"
                />
            </Col>
            <Col md={4} className='d-flex justify-content-center'>
                <Card
                    className="m-0 p-0"
                    color="light"
                    style={{
                        width: '30rem'
                    }}

                >
                    <CardHeader tag={'h4'}>
                        Cadastro de usuário
                    </CardHeader>
                    <CardBody >
                        <CardText className='p-2 m-2'>
                            <Row>
                                <Col>
                                    <Form onSubmit={handleSubmit}>

                                        {errors.status400 && <Alert color='danger'>{errors.status400}</Alert>}


                                        <FormGroup row className='p-0 m-0'>
                                            <Label>Nome</Label>
                                            <Input
                                                type="text"
                                                name="name"
                                                id="name"
                                                placeholder="Nome do usuário"
                                                value={formData.name}
                                                invalid={!!errors.name}
                                                onChange={handleChange}
                                            />
                                            {errors.name && <FormFeedback>{errors.name}</FormFeedback>}
                                        </FormGroup>

                                        <FormGroup row className='p-0 m-0'>
                                            <Label>Email</Label>
                                            <Input
                                                type="text"
                                                name="email"
                                                id="email"
                                                placeholder="Preencha o email do usuário"
                                                value={formData.email}
                                                invalid={!!errors.email}
                                                onChange={handleChange}
                                            />
                                            {errors.email && <FormFeedback>{errors.email}</FormFeedback>}
                                        </FormGroup>

                                        <FormGroup row className='p-0 m-0'>
                                            <Label>Password</Label>
                                            <Input
                                                type="password"
                                                name="password"
                                                id="password"
                                                placeholder="Informe a senha"
                                                value={formData.password}
                                                invalid={!!errors.password}
                                                onChange={handleChange}
                                            />
                                            {errors.password && <FormFeedback>{errors.password}</FormFeedback>}
                                        </FormGroup>

                                        <FormGroup row className='p-0 m-0'>
                                            <Label>Confirme Password</Label>
                                            <Input
                                                type="password"
                                                name="confirmPassword"
                                                id="confirmPassword"
                                                placeholder="Informe a senha"
                                                value={formData.confirmPassword}
                                                invalid={!!errors.confirmPassword}
                                                onChange={handleChange}
                                            />
                                            {errors.confirmPassword && <FormFeedback>{errors.confirmPassword}</FormFeedback>}
                                        </FormGroup>
                                        <FormGroup row className='p-0 m-0'>
                                            <Button color='primary' block type='submit'>
                                                Cadastrar
                                            </Button>
                                        </FormGroup>
                                    </Form>
                                </Col>
                            </Row>
                        </CardText>
                    </CardBody>
                </Card>
            </Col>
        </Row>

    );
};

export default SignUpScreen;