import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fetch from '../../axios/config';
import '../../css/style.css';
import { Form, FormGroup, Label, Input, Col, Button, Card, CardHeader, CardBody, CardText, Badge } from 'reactstrap';
import { colorBadgeSkills } from '../codeUtils.jsx'

const createJobOpportunity = () => {

    const navigate = new useNavigate();

    const [title, setTitle] = new useState();
    const [level, setLevel] = new useState();
    const [openingDate, setOpeningDate] = new useState();
    const [expectedDate, setExpectedDate] = new useState();
    const [departments, setDepartments] = new useState([]);
    const [useId, setUseId] = new useState();
    // const [closingDate, setClosingDate] = new useState();

    const [departmentId, setDepartmentId] = new useState()
    // const handleChange = (e) => {
    //     setDepartID(e.target.value);
    // }

    // Busca todos os departamentos ativos
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

    /**
     * Adiciona uma JOBOPPORTUNITY
     * @param {Event} e Evento do mouse
     */
    const createJobOpportunity = async (e) => {
        e.preventDefault();
        let idNewJobOpportunity = null;

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
                console.log(response.data.id);
            } else {
                console.log("Erro ao cadastrar oportunidade de emprego");
            }
        });

        navigate("/teste/" + idNewJobOpportunity);
    };

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

        <Form color='light' onSubmit={(e) => createJobOpportunity(e)}>

            <FormGroup>
                <Label>
                    <div className='titulo'><h4>Oportunidade de emprego</h4></div>
                    <div className='subtitulo'><h6 className='fw-light'>Preencha as informações pertinentes a oportunidade de emprego</h6></div>
                </Label>
            </FormGroup>

            {/* ID */}
            <FormGroup>
                <Col lg={10}>
                    <Input id="useId" name="useId" placeholder="Id" type="text"
                        onChange={(e) => setUseId(e.target.value)} />
                </Col>
            </FormGroup>

            {/* TITLE */}
            <FormGroup row>
                <Label for="title" lg={2}>
                    Descrição/Título
                </Label>
                <Col lg={10}>
                    <Input id="title" name="title" placeholder="Título descritivo da oportunidade de emprego" type="text"
                        onChange={(e) => setTitle(e.target.value)} />
                </Col>
            </FormGroup>

            {/* LEVEL */}
            <FormGroup row>
                <Label for="level" lg={2}>
                    Nível/Level
                </Label>
                <Col lg={10}>
                    <Input id="level" name="level" type="select"
                        onChange={(e) => setLevel(e.target.value)}>
                        <option key={"default"} value="">-- Selecione o nível de experiência</option>
                        <option key={"Entry level"} value={"Entry level"}>Entry level</option>
                        <option key={"Júnior"} value={"Júnior"}>Júnior</option>
                        <option key={"Pleno"} value={"Pleno"}>Pleno</option>
                        <option key={"Senior"} value={"Senior"}>Senior</option>
                        <option key={"LíderTécnico"} value={"Líder Técnico"}>Líder Técnico</option>
                    </Input>
                </Col>
            </FormGroup>

            {/* DEPARTMENT */}
            <FormGroup row>
                <Label for="departments" lg={2} >
                    Departamento
                </Label>
                <Col lg={10}>
                    <Input id="departments" name="departments" type="select"
                        onChange={(e) => setDepartmentId(e.target.value)} >

                        <option value="">-- Selecione um departamento</option>
                        {departments.length === 0 ? <p>Sem departamentos para relacionar</p> : (
                            departments.map((department) => (
                                <option key={department.id} value={department.id}>{department.name} ({department.manager})</option>
                            ))
                        )}
                    </Input>
                </Col>
            </FormGroup>

            {/* OPENING DATE */}
            <FormGroup row>
                <Label for='openingDate' lg={2}>
                    Data de abertura
                </Label>
                <Col lg={10}>
                    <Input id='openingDate' name='openingDate' placeholder='' type='date'
                        onChange={(e) => setOpeningDate(e.target.value)} />
                </Col>
            </FormGroup>

            {/* EXPECTED DATE */}
            <FormGroup row>
                <Label for='expectedDate' lg={2}>
                    Expectativa fechar
                </Label>
                <Col lg={10}>
                    <Input id='expectedDate' name='expectedDate' placeholder='' type='date'
                        onChange={(e) => setExpectedDate(e.target.value)} />
                </Col>
            </FormGroup>
            <FormGroup check row>

                <Col lg={12}>
                    <Button color='success' size='lg'>
                        Salvar
                    </Button>
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
                        color="secondary"
                        outline
                        style={{
                            width: '100%'
                        }}>
                        <CardHeader>
                            <FormGroup row>
                                <Col lg={2}>
                                    <Label>
                                        Agilize sua busca
                                    </Label>
                                </Col>
                                <Col lg={10}>
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
                            <CardText>
                                {Skills.length === 0 ? <p>Carregando...</p> : (
                                    Skills.filter(skill => skill.name.toLowerCase().includes(query) || skill.type.toLowerCase().includes(query)
                                    ).map((skill) => (
                                        <Button
                                            color='light'
                                            className='my-1 d-flex justify-content-between'
                                            block
                                            onClick={() => onCheckboxBtnClick(skill.id)}
                                            active={cSelected.includes(skill.id)} >
                                            {skill.name}

                                            <Badge
                                                color={colorBadgeSkills(skill.type)}
                                                className='align-self-center'>
                                                {skill.type}
                                            </Badge>
                                        </Button>
                                    ))
                                )}
                                <p></p>
                                <p>Selecionados: {JSON.stringify(cSelected)}</p>
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>

            </FormGroup>
        </Form>
    )
}
export default createJobOpportunity