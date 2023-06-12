import { Col, Row, Container, Card, CardBody, CardHeader, CardText } from 'reactstrap';
import PieChartTop10Skill from './PieChartTop10Skill.jsx'
import TableOpenJobOpportunity from './tableOpenJobOpportunity.jsx'
import { useAuth } from '../../context/AuthProvider/useAuth';
import AllJobOpportunityByUser from './tableAllJobOpportunity.jsx';
import TableComFiltros from './tableOpenJobOpportunity copy.jsx'

export default function dashboardJobOpportunity() {

    const auth = useAuth();

    return (
        <Container>
            <Row>
                <Col lg={12}>
                    <TableOpenJobOpportunity idUser={Number(auth.id)}></TableOpenJobOpportunity>
                </Col>
                <Col lg={12} className='my-3'>
                    <Card
                        className="my-0"
                        color="secondary"
                        outline
                        style={{
                            width: '100%'
                        }}>
                        <CardHeader tag="h5">
                            Título
                        </CardHeader>
                        <CardBody className='p-2 my-0'>
                            <CardText>
                                <AllJobOpportunityByUser idUser={Number(auth.id)} />
                                <TableComFiltros idUser={Number(auth.id)} />
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}