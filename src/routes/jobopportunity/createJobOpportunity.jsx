import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import fetch from '../../axios/config';
import '../../css/style.css';
import { colorBadgeSkills } from '../codeUtils.jsx';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Col,
    Button,
    Card,
    CardHeader,
    CardBody,
    CardText,
    Badge,
    FormFeedback,
} from 'reactstrap';

/**
 * Esquema de VALIDAÇÃO do FORMULÁRIO
 */
const schema = yup.object().shape({
    title: yup.string().required('Campo título é obrigatório.'),
    level: yup.string().required('Selecione o nível necessário para a oportunidade.'),
    openingDate: yup.date('Por favor, insira uma data válida.').required('Insira a data em que foi aberta a oportunidade.'),
    expectedDate: yup.date('Por favor, insira uma data válida').required('Insira a data prevista para fechamento da oportunidade.').test(
        'is-greater',
        'A data deve ser maior que a data de abertura da oportunidade',
        function (value) {
            return value > this.resolve(yup.ref('openingDate'))
        }
    ),
    departments: yup.string().required('Selecione o departamento.'),
    useId: yup.string().required('UserId é obrigatório.'),
    // cSelected: yup.array().required('Campo obrigatório').min(3, 'Selecione no mínimno três habilidades.'),
});

const createJobOpportunity = () => {

    const navigate = new useNavigate();

    /* Variavel que recebe os campos do formulário */
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});

    console.log(formData);
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
                console.log(validData);
                const { title, level, openingDate, expectedDate, useId } = validData;
                const departmentId = validData.departments;

                // Variavel que irá receber o ID do novo registro
                let idNewJobOpportunity;

                setErrors({});

                await fetch.post("/jobopportunity", {
                    title, level, openingDate, expectedDate, useId, departmentId
                }).then(async (response) => {

                    if (response.request.statusText === "OK") {
                        alert("Oportunidade de emprego cadastrada com sucesso!");
                        for (let i = 0; i < cSelected.length; i++) {
                            console.log(cSelected[i]);

                            const skillId = cSelected[i];
                            await fetch.post("/jobopportunity_skill/" + response.data.id, {
                                skillId
                            }).then(() => { console.log("Cadastrada: Skill> " + skillId + "Opportunity> " + response.data.id); })
                        }
                        idNewJobOpportunity = response.data.id;
                        console.log(`Novo Id> ${idNewJobOpportunity}`);
                    } else {
                        console.log("Erro ao cadastrar oportunidade de emprego");
                    }
                });

                navigate("/jobopportunityskill/" + idNewJobOpportunity);
            })
            .catch(error => {
                const errorObj = error.inner.reduce((acc, curr) => {
                    acc[curr.path] = curr.message;
                    return acc;
                }, {});
                setErrors(errorObj);
            });
    }

    console.log(errors);
    // Busca todos os departamentos ativos
    const [departments, setDepartments] = useState([]);
    const getDepartments = async () => {
        try {
            const response = await fetch.get("/department");
            const data = response.data;
            setDepartments(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * Lista todas as SKILLS do sistemas
     */
    const [Skills, setSkills] = useState([]);
    const getSkills = async () => {
        try {
            const response = await fetch.get("/skill");
            const data = response.data;
            setSkills(data);
        } catch (error) {
            console.log(error);
        }
    }

    /**
 * Código para do BUTTON GROUP COM SELEÇÃO MULTIPLA
 */
    const [cSelected, setCSelected] = useState([]);

    const onCheckboxBtnClick = (selected) => {
        const index = cSelected.indexOf(selected);
        if (index < 0) {
            cSelected.push(selected);
        } else {
            cSelected.splice(index, 1);
        }
        setCSelected([...cSelected]);
    };
    console.log(cSelected)


    /**
     * Adiciona uma JOBOPPORTUNITY
     * @param {Event} e Evento do mouse
     */
    // const createJobOpportunity = async (e) => {
    //     e.preventDefault();
    //     let idNewJobOpportunity = null;

    //     await fetch.post("/jobopportunity", {
    //         title, level, openingDate, expectedDate, useId, departmentId
    //     }).then(async (response) => {

    //         if (response.request.statusText === "OK") {
    //             alert("Oportunidade de emprego cadastrada com sucesso!");
    //             for (let i = 0; i < cSelected.length; i++) {
    //                 console.log(cSelected[i]);

    //                 const skillId = cSelected[i];
    //                 await fetch.post("/jobopportunity_skill/" + response.data.id, {
    //                     skillId
    //                 }).then(() => { console.log("Cadastrada: Skill> " + skillId + "Opportunity> " + response.data.id); })
    //             }
    //             idNewJobOpportunity = response.data.id;
    //             console.log(response.data.id);
    //         } else {
    //             console.log("Erro ao cadastrar oportunidade de emprego");
    //         }
    //     });

    //     navigate("/jobopportunityskill/" + idNewJobOpportunity);
    // };

    /**
     * Código para executar o FILTER dentro de SKILLS
     */
    const [query, setQuery] = useState("");
    // console.log(Skills.filter(skill => skill.name.toLowerCase().includes("em")));

    // *****************************************************************

    useEffect(() => {
        getDepartments();
        getSkills();
    }, []);

    return (

        <Form color='light' onSubmit={handleSubmit}>

            <FormGroup>
                <Label>
                    <div className='titulo'><h4>Oportunidade de emprego</h4></div>
                    <div className='subtitulo'><h6 className='fw-light'>Preencha as informações pertinentes a oportunidade de emprego</h6></div>
                </Label>
            </FormGroup>

            {/* ID */}
            <FormGroup>
                <Col lg={10}>
                    <Input
                        id="useId"
                        name="useId"
                        placeholder="Id"
                        type="text"
                        invalid={!!errors.useId}
                        onChange={handleChange}
                    />
                    {errors.useId && <FormFeedback>{errors.useId}</FormFeedback>}
                </Col>
            </FormGroup>

            {/* TITLE */}
            <FormGroup row>
                <Label for="title" lg={2}>
                    Descrição/Título
                </Label>
                <Col lg={10}>
                    <Input
                        id="title"
                        name="title"
                        placeholder="Título descritivo da oportunidade de emprego"
                        type="text"
                        invalid={!!errors.title}
                        onChange={handleChange}
                    />
                    {errors.title && <FormFeedback>{errors.title}</FormFeedback>}
                </Col>
            </FormGroup>


            {/* LEVEL */}
            <FormGroup row>
                <Label for="level" lg={2}>
                    Nível/Level
                </Label>
                <Col lg={10}>
                    <Input
                        id="level"
                        name="level"
                        type="select"
                        invalid={!!errors.level}
                        onChange={handleChange}
                    >
                        <option key={"default"} value="">-- Selecione o nível de experiência</option>
                        <option key={"Entry level"} value={"Entry level"}>Entry level</option>
                        <option key={"Júnior"} value={"Júnior"}>Júnior</option>
                        <option key={"Pleno"} value={"Pleno"}>Pleno</option>
                        <option key={"Senior"} value={"Senior"}>Senior</option>
                        <option key={"LíderTécnico"} value={"Líder Técnico"}>Líder Técnico</option>
                    </Input>
                    {errors.level && <FormFeedback>{errors.level}</FormFeedback>}
                </Col>
            </FormGroup>

            {/* DEPARTMENT */}
            <FormGroup row>
                <Label for="departments" lg={2} >
                    Departamento
                </Label>
                <Col lg={10}>
                    <Input
                        id="departments"
                        name="departments"
                        type="select"
                        invalid={!!errors.departments}
                        onChange={handleChange}
                    >
                        <option value="">-- Selecione um departamento</option>
                        {departments.length === 0 ? <div>Sem departamentos para relacionar</div> : (
                            departments.map((department) => (
                                <option
                                    key={department.id}
                                    value={department.id}
                                >
                                    {department.name} ({department.manager})
                                </option>
                            ))
                        )}
                    </Input>
                    {errors.departments && <FormFeedback>{errors.departments}</FormFeedback>}
                </Col>
            </FormGroup>

            {/* OPENING DATE */}
            <FormGroup row>
                <Label for='openingDate' lg={2}>
                    Data de abertura
                </Label>
                <Col lg={10}>
                    <Input
                        id='openingDate'
                        name='openingDate'
                        type='date'
                        invalid={!!errors.openingDate}
                        onChange={handleChange}
                    />
                    {errors.openingDate && <FormFeedback>{errors.openingDate}</FormFeedback>}

                </Col>

            </FormGroup>

            {/* EXPECTED DATE */}
            <FormGroup row>
                <Label for='expectedDate' lg={2}>
                    Expectativa fechar
                </Label>
                <Col lg={10}>
                    <Input
                        id='expectedDate'
                        name='expectedDate'
                        type='date'
                        invalid={!!errors.expectedDate}
                        onChange={handleChange}
                    />
                    {errors.expectedDate && <FormFeedback>{errors.expectedDate}</FormFeedback>}
                </Col>
            </FormGroup>

            {/* *************SELEÇÃO DAS SKILLS************* */}

            <FormGroup>
                <Label></Label>
            </FormGroup>
            <FormGroup>
                <Label>
                    <div className='titulo'><h4>Seleção de Skills</h4></div>
                    <div className='subtitulo'><h6 className='fw-light'>Selecione todas as skills relacionadas a oportunidade de emprego</h6></div>
                </Label>
            </FormGroup>

            <FormGroup>

                <Col lg={12} >
                    {/* Para alinhar o componente Col ao centro, usar className='mx-auto' */}
                    <Card
                        className="my-2"
                        color={!!errors.cSelected ? 'danger' : 'secondary'}
                        invalid={!!errors.cSelected}
                        outline
                        style={{
                            width: '100%'
                        }}>
                        <CardHeader>
                            <FormGroup row className='my-3 d-flex align-items-baseline'>
                                <Col lg={2} md={3} xl={3}>
                                    <Label className='d-flex justify-content-center'>
                                        Agilize sua busca
                                    </Label>
                                </Col>
                                <Col lg={10} md={9} xl={9}>
                                    <Input
                                        id='search'
                                        name='search'
                                        placeholder='Filtro'
                                        type='search'
                                        style={{
                                            width: '100%'
                                        }}
                                        onChange={e => setQuery(e.target.value)}
                                    >
                                    </Input>
                                </Col>
                            </FormGroup>
                        </CardHeader>
                        <CardBody>
                            <CardText className='d-flex flex-fill flex-wrap'>
                                {Skills.length === 0 ? <div>Carregando...</div> : (
                                    Skills.filter(skill => skill.name.toLowerCase().includes(query) || skill.type.toLowerCase().includes(query)
                                    ).map((skill) => (
                                        <Col xs={12} sm={12} md={6} lg={6} xxl={4} className='p-1'>
                                            <Button
                                                name='cSelected'
                                                color='light'
                                                className='p-2 d-flex justify-content-between align-items-center'
                                                block
                                                onChange={handleChange}
                                                onClick={() => onCheckboxBtnClick(skill.id)}
                                                active={cSelected.includes(skill.id)} >
                                                {skill.name}

                                                <Badge
                                                    color={colorBadgeSkills(skill.type)}
                                                    className='d-flex align-items-center'>
                                                    {skill.type}
                                                </Badge>
                                            </Button>
                                        </Col>
                                    ))
                                )}

                            </CardText>

                        </CardBody>
                    </Card>
                    {/* {errors.cSelected && <div>{errors.cSelected}</div>} */}
                </Col>
            </FormGroup>
            <FormGroup check row>
                <Col lg={12} className='my-3 p-3 d-flex justify-content-end'>
                    <Button color='success' type='submit' size='lg'>
                        Próximo passo
                    </Button>
                </Col>
            </FormGroup>
        </Form>
    )
}
export default createJobOpportunity