import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fetch from '../../axios/config';
import '../../css/style.css';


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
    CardTitle,
    ButtonGroup,
} from 'reactstrap';

const createJobOpportunity = () => {

    const navigate = new useNavigate();

    const [title, setTitle] = new useState();
    const [level, setLevel] = new useState();
    const [openingDate, setOpeningDate] = new useState();
    const [expectedDate, setExpectedDate] = new useState();
    // const [closingDate, setClosingDate] = new useState();
    const [useId, setUseId] = new useState();

    /**
     * Código para do BUTTON GROUP COM SELEÇÃO MULTIPLA
     */
    const [cSelected, setCSelected] = useState([]);
    const [rSelected, setRSelected] = useState(null);

    const onCheckboxBtnClick = (selected) => {
        const index = cSelected.indexOf(selected);
        if (index < 0) {
            cSelected.push(selected);
        } else {
            cSelected.splice(index, 1);
        }
        setCSelected([...cSelected]);
    };
    /************************************************************ */

    const [departmentId, setDepartmentId] = new useState([]);

    // Busca todos os departamentos ativos
    const getDepartments = async () => {
        try {

            const response = await fetch.get("/department");
            const data = response.data;
            setDepartmentId(data);
            console.log(data);

        } catch (error) {
            console.log(error);
        }
    };

    // **************************************************************** */

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

    // **************************************************************** */


    const createJobOpportunity = async (e) => {
        e.preventDefault();
        console.log(title, level, openingDate, expectedDate, useId, departmentId);
        await fetch.post("/jobopportunity", {
            title, level, openingDate, expectedDate, useId, departmentId
        }).then(() => { alert("Oportunidade de emprego cadastrada com sucesso!") });

        navigate("/dashboard");
    };

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
                    <div className='subtitulo'><h6 className='fw-light'>Preencha as informações pertinentes a oportunidade de emprego</h6></div>            </Label>
            </FormGroup>

            {/* ID */}
            <FormGroup>
                <Col lg={10}>
                    <Input id="useId" name="useId" value="5" placeholder="Id" type="hidden"
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
                    <Input id="level" name="level" type="select" placeholder='Selecione o nível do candidato para a oportunidade'
                        onChange={(e) => setLevel(e.target.value)} >
                        <option key={"default"} value="">-- Selecione o nível de experiência</option>
                        <option key={"Entry level"} value="null">Entry level</option>
                        <option key={"Júnior"} value={"Júnior"}>Júnior</option>
                        <option key={"Pleno"} value={"Pleno"}>Pleno</option>
                        <option key={"Senior"} value={"Senior"}>Senior</option>
                        <option key={"LíderTécnico"} value={"Líder Técnico"}>Líder Técnico</option>
                    </Input>
                </Col>
            </FormGroup>

            {/* DEPARTMENT */}
            <FormGroup row>
                <Label for="departmentId" lg={2} >
                    Departamento
                </Label>
                <Col lg={10}>
                    <Input id="departmentId" name="departmentId" type="select"
                        onChange={(e) => setDepartmentId(e.target.value)} >

                        <option value={""}>-- Selecione um departamento</option>
                        {departmentId.length === 0 ? <p>Sem departamentos para relacionar</p> : (
                            departmentId.map((department) => (
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

            <FormGroup row>

                <Col lg={6}>

                    <Card
                        className="my-2"
                        color="primary"
                        style={{
                            width: '100%'
                        }}>
                        <CardHeader>
                            Relação de Skills
                        </CardHeader>
                        <CardBody>
                            <CardText>
                                    {Skills.length === 0 ? <p>Carregando...</p> : (
                                        Skills.map((skill) => (
                                            <Button
                                                color='light'
                                                className='my-2'
                                                block
                                                onClick={() => onCheckboxBtnClick(skill.id)}
                                                active={cSelected.includes(skill.id)} >
                                                {skill.name}
                                            </Button>
                                        ))
                                    )}
                                <p></p>
                                <p>Selecionados: {JSON.stringify(cSelected)}</p>
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>

                <Col lg={6}>
                    <Card
                        className="my-2"
                        color="success"
                        inverse
                        style={{
                            width: '100%'
                        }}>
                        <CardHeader>
                            SKILLS SELECIONADAS
                        </CardHeader>

                        <CardBody>
                            <CardTitle tag="h5">
                                Atrasadas
                            </CardTitle>
                            <CardText>
                                Aqui iremos colocar um lista com todas as oportunidades que estão com prazo
                                de término superadas, mas ainda estão em aberto. A partir daqui o profissional poderá
                                clicar na oportunidade que será encaminhado para a tela com todos os dados da
                                oportunidade de emprego.
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>
            </FormGroup>


            <FormGroup check row>

                <Col lg={12}>
                    <Button color='success' size='lg'>
                        Salvar
                    </Button>
                </Col>
            </FormGroup>
        </Form>
    )
}
export default createJobOpportunity