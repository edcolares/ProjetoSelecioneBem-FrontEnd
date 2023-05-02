import React from 'react';
import { useState, useEffect } from 'react';
import fetch from '../axios/config';
import CreateSkill from './skill/createSkill';

import {
    Row,
    Col,
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    CardText,
} from 'reactstrap';

const Dashboard = () => {
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

    useEffect(() => {
        getSkills();
    }, []);

    return (
        <Row xs="2">
            <Col>
                {/* <Col className="bg-light border"> */}

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
                        {/* <CardTitle tag="h5">
                            Special Title Treatment
                        </CardTitle> */}
                        <CardText>
                            {Skills.length === 0 ? <p>Carregando...</p> : (
                                Skills.map((skill) => (
                                    <div className='skill' key={skill.id}>
                                        <p>{skill.name}</p>
                                    </div>
                                ))
                            )}


                        </CardText>
                    </CardBody>
                </Card>

            </Col>
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
            </Col>
        </Row>
    )
}

export default Dashboard