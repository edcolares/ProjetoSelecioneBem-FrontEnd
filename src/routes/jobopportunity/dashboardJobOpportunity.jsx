import { Col, Row, Container, Card, CardBody, CardHeader, CardText } from 'reactstrap';
import PieChartTop10Skill from './PieChartTop10Skill.jsx'
import TableOpenJobOpportunity from './tableOpenJobOpportunity.jsx'
import { useAuth } from '../../context/AuthProvider/useAuth';

export default function dashboardJobOpportunity() {

    const auth = useAuth();

    return (
        <Container>
            <Row>
                <Col lg={12}>
                    <TableOpenJobOpportunity idUser={Number(auth.id)}></TableOpenJobOpportunity>
                </Col>
                <Col lg={6} className='my-3'>
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
                <Col lg={6} className='my-3'>
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
                                Teste
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}