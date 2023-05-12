import React from 'react';
import { useState, useEffect } from 'react';
import fetch from '../axios/config';
import CreateSkill from './skill/createSkill';

import {
    Accordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem,
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


    const [open, setOpen] = useState();
    const toggle = (id) => {
        if (open === id) {
            setOpen();
        } else {
            setOpen(id);
        }
    };



    useEffect(() => {
        getSkills();
    }, []);

    return (
        <Row>

            <Col xs={12} md={12}>
                <Card
                    className="p-0"
                    color="secondary"
                    outline
                    style={{
                        width: '100%'
                    }}
                >
                    <CardHeader tag={'h4'}>
                        Insira uma nova Skill
                    </CardHeader>
                    <CardBody className='d-flex justify-content-center'>
                        <CardText
                            style={{
                                width: '80%'
                            }}
                            className='d-flex flex-column'>
                            <CreateSkill></CreateSkill>
                        </CardText>
                    </CardBody>
                </Card>
            </Col>
            <Col md={12}>


                <Accordion xs={12} md={12} open={open} toggle={toggle} className="bg-light border">
                    <AccordionItem>
                        <AccordionHeader targetId="1">Adicionar uma nova Skill</AccordionHeader>
                        <AccordionBody accordionId="1">
                            {Skills.length === 0 ? (
                                <div>Carregando...</div>
                            ) : (
                                Skills.map((skill) => (
                                    <div className='skill' key={skill.id}>
                                        <span>{skill.name} - {skill.type}</span>
                                    </div>
                                ))
                            )}
                        </AccordionBody>
                    </AccordionItem>
                </Accordion>

            </Col>

        </Row>
    )
}

export default Dashboard