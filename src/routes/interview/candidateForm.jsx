import { useState } from 'react';
import { Button, FormGroup, Label, Input, Col, Row, InputGroup, FormFeedback } from 'reactstrap';
import fetch from '../../services/config';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdCheck } from 'react-icons/md';
import * as yup from 'yup';


/**
 * Esquema de VALIDAÇÃO do FORMULÁRIO
 */
const schema = yup.object().shape({
    email: yup.string().email('Preencha corretamente o e-mail').required('Campo de e-mail obrigatório o preenchimento.'),
    name: yup.string('Preencha corretamente o campo nome do candidato'),
    id: yup.number('O valor não é um número').positive('Somente números positivos'),
});

const candidateForm = ({ isDelayed, setIsDelayed, setCandidate }) => {

    const [isDisabled, setIsDisabled] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({});

    const handleChangeDelay = () => {
        setIsDelayed(!isDelayed);
        setFormData(prevState => ({ ...prevState, ['isDelayed']: !isDelayed }));
    };

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

    // console.log('Valor de formData.email', formData.email);
    // console.log('Valor de formData.name', formData.name);
    // console.log('Valor de formData.id', formData.id);


    const handleSubmit = async (e) => {
        e.preventDefault();

        schema.validate(formData, { abortEarly: false })
            .then(async validData => {
                const { email } = validData;

                try {
                    await fetch.get(`/candidate/${email}`).then(
                        (response) => {
                            setFormData(prevState => ({ ...prevState, ['name']: response.data.name }));
                            setFormData(prevState => ({ ...prevState, ['id']: response.data.id }));
                            setFormData(prevState => ({ ...prevState, ['isDelayed']: isDelayed }));
                            setIsSearch(true);
                        }
                    );

                } catch (error) {

                    const name = '';
                    setFormData(prevState => ({ ...prevState, ['name']: name }));
                    setFormData(prevState => ({ ...prevState, ['id']: null }));
                    setFormData(prevState => ({ ...prevState, ['isDelayed']: isDelayed }));
                    setIsSearch(true);
                    console.log("Erro: ", error);

                }
            })
            .catch(error => {
                const errorObj = error.inner.reduce((acc, curr) => {
                    acc[curr.path] = curr.message;
                    return acc;
                }, {});
                setErrors(errorObj);
                console.log(errors);
            });

    };

    // console.log(formData);
    // console.log(isDelayed);

    const handleSave = async (e) => {
        e.preventDefault();

        try {
            const id = formData.id;
            const name = formData.name;
            const email = formData.email;

            if (id) {
                // console.log("Com ID");
                await fetch.put(`/candidate/${id}`, { name, email });
                setIsDisabled(true)
            } else {
                // console.log("Sem id");
                await fetch.post(`/candidate`, {
                    email, name
                }).then((response) => {
                    console.log("Novo usuário cadastrado com sucesso!");
                    setFormData(prevState => ({ ...prevState, ['id']: response.data.id }));
                    // console.log(formData);
                    setIsDisabled(true)
                }).error((error) => {
                    console.error("Não foi possível realizar o cadastro do novo candidato.");
                    console.error(error);
                })
            }
            setCandidate(formData);

        } catch (error) {
            console.error(error);
        }
    };

    return (


        <Row>
            <Col md={6}>
                <FormGroup >
                    <Label>Informe o e-mail do candidato</Label>
                    <InputGroup>
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Informe o e-mail do candidato"
                            invalid={!!errors.email}
                            onChange={handleChange}
                            disabled={isDisabled}
                        />
                        <Button
                            type='submit'
                            alt='Buscar candidato'
                            color='primary'
                            onClick={handleSubmit}
                            disabled={isDisabled}
                        >
                            <AiOutlineSearch />
                        </Button>
                        {errors.email && <FormFeedback>{errors.email}</FormFeedback>}
                    </InputGroup>
                </FormGroup>
            </Col>

            {isSearch ? (
                formData.id ? (
                    <Col md={6} >
                        <FormGroup>
                            <Label>Atualize o nome do candidato</Label>
                            <InputGroup>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    disabled={isDisabled}
                                />

                                <Button
                                    type='submit'
                                    alt='Confirmar candidato'
                                    color='success'
                                    onClick={handleSave}
                                    disabled={isDisabled}
                                >
                                    <MdCheck />
                                </Button>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup switch>
                            <Input
                                type="switch"
                                role="switch"
                                name='isDelayed'
                                onChange={handleChangeDelay}
                                checked={isDelayed}
                            />
                            <Label check>Candidato chegou atrasado!</Label>
                        </FormGroup>
                    </Col>
                ) : (
                    <Col md={6}>
                        <FormGroup>
                            <Label>Novo candidato</Label>
                            <InputGroup>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={formData.name}
                                    placeholder="Informe o nome do candidato"
                                    onChange={handleChange}
                                />
                                <Button
                                    type='submit'
                                    color='success'
                                    alt='Confirmar candidato'
                                    onClick={handleSave}
                                    disabled={isDisabled}
                                >
                                    <MdCheck />
                                </Button>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup switch>
                            <Input
                                type="switch"
                                role="switch"
                                name='isDelayed'
                                onChange={handleChangeDelay}
                                checked={isDelayed}
                            />
                            <Label check>Candidato chegou atrasado!</Label>
                        </FormGroup>
                    </Col>
                )) : null}
        </Row >

    )
}

export default candidateForm