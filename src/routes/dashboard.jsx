import React from 'react';
import { useState, useEffect } from 'react';
import fetch from '../axios/config';
// import CreateSkill from './skill/createSkill';
import '../css/style.css'
import { BsFillTrash3Fill, BsPlusCircleFill, BsFileTextFill } from 'react-icons/bs'

import {
    Badge,
    Col,
    Card,
    CardHeader,
    CardBody,
    CardText,
    Row,
    Spinner,
    Table,
    Button,
} from 'reactstrap';

const Dashboard = () => {

    const [skills, setSkills] = useState([]);
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
     * Busca todas as oportunidades com data de fechamento em aberto
     */
    const [jobopportunities, setJobOpportunities] = useState([]);
    const getJobOpportunityByClosingDateOpen = async () => {
        try {
            const idUser = 5;
            const response = await fetch.get(`/jobopportunity/find/${idUser}`);
            const data = response.data;
            setJobOpportunities(data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getSkills();
        getJobOpportunityByClosingDateOpen();
    }, []);

    return (
        <div>

            <Row>
                <Col md={12}>

                    <Card
                        className="my-2"
                        color="secondary"
                        outline
                        style={{
                            width: '100%'
                        }}
                    >
                        <CardHeader>
                            Oportunidades em aberto
                        </CardHeader>
                        <CardBody>
                            <CardText>
                                {jobopportunities.length === 0 ? <Spinner
                                    color="primary"
                                    size="sm"
                                >
                                    Loading...
                                </Spinner> : (

                                    <div>

                                        <Table
                                            bordered
                                            hover
                                            responsive
                                            size="sm"
                                            striped
                                        >
                                            <thead>
                                                <tr>
                                                    <th>
                                                        Nome da oportunidade
                                                    </th>
                                                    <th>
                                                        Level
                                                    </th>
                                                    <th>
                                                        Abertura
                                                    </th>
                                                    <th>
                                                        Fechamento
                                                    </th>
                                                    <th>

                                                    </th>
                                                </tr>
                                            </thead >
                                            <tbody>
                                                {jobopportunities.map((opportunity) => (
                                                    <tr key={opportunity}>
                                                        <th>
                                                            {opportunity.title}
                                                        </th>
                                                        <th>
                                                            {opportunity.level}
                                                        </th>
                                                        <th>
                                                            {opportunity.openingDate}
                                                        </th>
                                                        <th>
                                                            {opportunity.expectedDate}
                                                        </th>
                                                        <th className='d-inline-flex align-items-center'>
                                                            <Button color='danger' outline size="sm"><BsFillTrash3Fill />Deletar</Button>
                                                            <Button color='success' outline size="sm"><BsPlusCircleFill />Entrevista</Button>
                                                            <Button color='danger' outline size="sm"><BsFileTextFill />Relatório</Button>
                                                           
                                                        </th>
                                                    </tr>
                                                ))
                                                }
                                            </tbody >
                                        </Table >

                                        <Table
                                            bordered
                                            hover
                                            responsive
                                            size="sm"
                                            striped
                                        >
                                            <thead>
                                                <tr>
                                                    <th>
                                                        Descrição
                                                    </th>
                                                    <th>
                                                        Nível
                                                    </th>
                                                    <th>
                                                        Dt Abertura
                                                    </th>
                                                    <th>
                                                        Dt Prev Fec
                                                    </th>
                                                    <th>
                                                        Options
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                <tr>
                                                    <td>
                                                        Estagiário Contábil Fiscal
                                                    </td>
                                                    <td>
                                                        No experience
                                                    </td>
                                                    <td>
                                                        2023-04-25                                                    </td>
                                                    <td>
                                                        2023-05-05
                                                    </td>
                                                    <td>
                                                        <Button color='danger' outline size="sm"><BsFillTrash3Fill />Deletar</Button>
                                                        <Button color='success' outline size="sm"><BsPlusCircleFill />Entrevista</Button>
                                                        <Button color='danger' outline size="sm"><BsFileTextFill />Relatório</Button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>


                                    </div >
                                )}
                            </CardText >
                        </CardBody >
                    </Card >
                </Col >
                {/*
                <Col>
                    <Card
                        className="my-2"
                        color="danger"
                        outline
                        style={{
                            width: '100%'
                        }}
                    >
                        <CardHeader>
                            Relação de Skills
                        </CardHeader>
                        <CardBody>
                            <CardText>
                                {skills.length === 0 ? <Spinner
                                    color="light"
                                    size="sm"
                                >
                                    Loading...
                                </Spinner> : (
                                    skills.map((skill) => (
                                        <div className='skill' key={skill.id}>

                                            <div>{skill.name}</div>
                                        </div>
                                    ))
                                )}


                            </CardText >
                        </CardBody >
                    </Card >

                </Col >
                <Col>
                    <Card
                        className="my-2"
                        color="danger"
                        inverse
                        style={{
                            width: '100%'
                        }}
                    >
                        <CardHeader>
                            Oportunidades fora do prazo
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
                <Col className="bg-light border">
                    Column
                </Col>
                <Col className="bg-light border">
                    <CreateSkill></CreateSkill>
                </Col> */}
            </Row>
        </div >
    )
}

export default Dashboard