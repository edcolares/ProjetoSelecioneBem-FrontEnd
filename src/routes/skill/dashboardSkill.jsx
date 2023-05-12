import React, { useState, useEffect, useRef} from 'react';
import fetch from '../../axios/config';
import SkillsAccordion from './SkillsAccordion.jsx'
import CreateSkill from './createSkill';
import { Card, CardHeader, CardBody, CardText, Col, Row } from 'reactstrap';



const dashboardSkill = () => {

    const createSkillref = useRef(null)
    const [Skills, setSkills] = useState([]);
    console.log(Skills);
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
                                width: '100%'
                            }}
                            className='d-flex flex-column'>
                            <CreateSkill></CreateSkill>
                        </CardText>
                    </CardBody>
                </Card>
            </Col>
            <Col md={12} className='my-3'>

                <Card
                    className="p-0"
                    color="secondary"
                    outline
                    style={{
                        width: '100%'
                    }}>
                    <CardHeader tag={'h4'}>
                        Skills
                    </CardHeader>
                    <CardBody>
                        <SkillsAccordion skills={Skills} />
                    </CardBody>
                </Card>

            </Col>
        </Row>
    );
};

export default dashboardSkill