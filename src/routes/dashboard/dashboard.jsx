import React from 'react';
import { useState, useEffect } from 'react';
import fetch from '../../axios/config';
import Charts2 from './charts2.jsx'
import PieChartTop10Skill from '../jobopportunity/PieChartTop10Skill'
import ChartsFilterControl from './chartsFilterControl';

import {
    Row,
    Card,
    CardBody,
    CardHeader,
    CardText,
    Col,
    Container,
} from 'reactstrap';

const Dashboard = () => {


    return (
        <Container>
            <Row>

                <Col md={6} className='my-3'>
                    <Card
                        className="my-0"
                        color="secondary"
                        outline
                        style={{
                            width: '100%'
                        }}>
                        <CardHeader tag="h5">
                            Top 10 skills mais utilizadas
                        </CardHeader>
                        <CardBody className='p-2 my-0'>
                            <CardText>
                                <PieChartTop10Skill></PieChartTop10Skill>
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={6} className='my-3'>
                    <Card
                        className="my-0"
                        color="secondary"
                        outline
                        style={{
                            width: '100%'
                        }}>
                        <CardHeader tag="h5">
                            Gráfico 2
                        </CardHeader>
                        <CardBody className='p-0 my-0'>
                            <CardText>
                                <Charts2 />
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={6} className='my-3'>
                    <Card
                        className="my-0"
                        color="secondary"
                        outline
                        style={{
                            width: '100%'
                        }}>
                        <CardHeader tag="h5">
                            Gráfico 3
                        </CardHeader>
                        <CardBody className='p-0 my-0'>
                            <CardText>
                                <ChartsFilterControl />
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Dashboard