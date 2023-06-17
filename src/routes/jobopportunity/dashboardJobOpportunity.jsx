import { Col, Row, Container } from 'reactstrap';
import { useAuth } from '../../context/AuthProvider/useAuth';
import TableOpenJobOpportunity from './tableOpenJobOpportunity.jsx'
import AllJobOpportunityByUser from './tableAllJobOpportunity.jsx';

export default function dashboardJobOpportunity() {

    const auth = useAuth();

    return (
        <Container>
            <Row>
                <Col lg={12}>
                    <TableOpenJobOpportunity idUser={Number(auth.id)}></TableOpenJobOpportunity>
                </Col>
                <Col lg={12} className='my-3'>
                    <AllJobOpportunityByUser idUser={Number(auth.id)} />
                </Col>
            </Row>
        </Container>
    )
}