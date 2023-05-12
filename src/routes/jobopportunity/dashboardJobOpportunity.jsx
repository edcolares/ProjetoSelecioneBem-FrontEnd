import React from 'react';
import { Alert, Col, Row, FormGroup, Container, Card, CardBody, CardHeader, CardTitle, CardText } from 'reactstrap';
import Teste from '../teste';
import PieChartTop10Skill from './PieChartTop10Skill.jsx'
import TableOpenJobOpportunity from './tableOpenJobOpportunity.jsx'


const dashboardJobOpportunity = () => {
    return (
        <Container>
            <Row>
                <Col lg={12}>
                    <TableOpenJobOpportunity></TableOpenJobOpportunity>
                </Col>
                <Col lg={6}>
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
                <Col lg={6}>
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
                                <Alert variant="primary">
                                    Gráfico 2
                                </Alert>
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default dashboardJobOpportunity