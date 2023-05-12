import React from 'react';
import { useState, useEffect } from 'react';
import fetch from '../axios/config';
import { format } from 'date-fns';
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
        <Row xs="2">
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
                            {Skills.length === 0 ? (
                                <div>Carregando...</div>
                            ) : (
                                Skills.map((skill) => (
                                    <div className='skill' key={skill.id}>
                                        <span>{skill.name}</span>
                                    </div>
                                ))
                            )}
                        </CardText>
                    </CardBody>
                </Card>

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