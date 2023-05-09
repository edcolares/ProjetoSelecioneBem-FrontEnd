import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup';
import fetch from '../../axios/config';

import {
    Form,
    FormGroup,
    Label,
    Input,
    Col,
    Button,
    FormFeedback,
} from 'reactstrap';

/**
 * Esquema de VALIDAÇÃO do FORMULÁRIO
 */
const schema = yup.object().shape({
    name: yup.string().required('Campo nome é obrigatório'),
    type: yup.string().required('Campo type é obrigatório'),
});

const createSkill = () => {
    const navigate = new useNavigate()

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
                const type = validData.type;
                setErrors({});

                await fetch.post("/skill", {
                    name, type,
                }).then(() => { alert("Skill incluída com sucesso") });

                navigate("/dashboard");
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
        <Form color='light' onSubmit={handleSubmit}>

            <FormGroup>
                <Label>
                    <div className='titulo'><h4>Cadastro de nova habilidade</h4></div>
                    <div className='subtitulo'><h6 className='fw-light'>Inclua uma nova habilidade para utilizar nas oportunidades e entrevistas.</h6></div>
                </Label>
            </FormGroup>

            <FormGroup row>
                <Label for="name" sm={2}>
                    Nome
                </Label>
                <Col sm={10}>
                    <Input
                        id="name"
                        name="name"
                        placeholder="Preencha o nome da habilidade"
                        type="text"
                        invalid={!!errors.name}
                        onChange={handleChange}
                    />
                    {errors.name && <FormFeedback>{errors.name}</FormFeedback>}

                </Col>
            </FormGroup>

            <FormGroup row>
                <Label for="type" sm={2}>
                    Tipo
                </Label>
                <Col sm={10}>
                    <Input
                        id="type"
                        name="type"
                        type="select"
                        onChange={handleChange}
                        invalid={!!errors.type}
                    >
                        <option key={"default"} value="">-- Defina o tipo da classe da habilidade</option>
                        <option key={"Hard"} value={"Hard Skill"}>Hard Skill</option>
                        <option key={"Soft"} value={"Soft Skill"}>Soft Skill</option>
                        <option key={"Cognitive"} value={"Cognitive Skill"}>Cognitive Skill</option>
                        <option key={"Communication"} value={"Communication Skills"}>Communication Skills</option>
                        <option key={"Interpersonal"} value={"Interpersonal Skills"}>Interpersonal Skills</option>
                        <option key={"Time Management"} value={"Time Management Skills"}>Time Management Skills</option>
                        <option key={"Decision-Making"} value={"Decision-Making Skills"}>Decision-Making Skills</option>
                        <option key={"Leadership"} value={"Leadership Skills"}>Leadership Skills</option>
                    </Input>
                    {errors.type && <FormFeedback>{errors.type}</FormFeedback>}
                </Col>
            </FormGroup>

            <FormGroup check row>
                <Col lg={12} className='my-3 p-3 d-flex justify-content-end'>
                    <Button color='success' type='submit' size='md'>
                        Concluir Cadastro
                    </Button>
                </Col>
            </FormGroup>
        </Form>
    )
}

export default createSkill