import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import fetch from '../../axios/config';
import { format } from 'date-fns';
import { AiOutlineFileText, AiOutlineUnorderedList } from 'react-icons/ai';
import { FaCog, FaRegGrinStars } from 'react-icons/fa';
import { MdStar } from 'react-icons/md';

import {
    Row,
    Card,
    CardBody,
    CardHeader,
    CardText,
    Col,
    Button,
    Toast,
    ToastHeader,
    ToastBody,
    Badge,
    ListGroup,
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText,
} from 'reactstrap';
import { colorBadgeSkills } from '../codeUtils';

const reportJobOpportunity = () => {

    const { idJobOpportunity } = useParams();
    const [opportunity, setOpportunity] = useState([]);
    const [jobopportunitySkills, setJobOpportunitySkills] = useState([]);
    const [department, setDepartment] = useState([]);
    const [interviews, setInterviews] = useState([]);


    const getJobOpportunityWithInterview = async () => {
        try {
            const response = await fetch.get(`/jobopportunity/report/${idJobOpportunity}`);
            const data = response.data[0];
            setOpportunity(data);
            setJobOpportunitySkills(data.jobopportunitySkills);
            setDepartment(data.department);
            setInterviews(data.interviews);
            console.log(data);

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getJobOpportunityWithInterview();
    }, []);

    return (
        <div>
            <h3 className=''>
                <AiOutlineFileText className='mx-2' />
                RELATÓRIO DA OPORTUNIDADE
            </h3>

            <Card className='my-4' color='secondary' outline>
                <CardBody className='p-0'>
                    <CardHeader tag={'h5'} className='text-uppercase fw-bold'>
                        <FaCog className='me-1' /> (Código da Vaga) - {opportunity.title}
                    </CardHeader>
                    <CardText tag={'h6'} className='mx-3 my-1'>
                        <Row>
                            <Col sm={3}>Nível</Col> <Col sm={9}>{opportunity.level}</Col>
                            <Col sm={3}>Departamento</Col> <Col sm={9}>{department.name} - {department.manager}</Col>
                            <Col sm={3}>Data abertura</Col> <Col sm={9}>{opportunity.openingDate}</Col>
                            <Col sm={3}>Previsão fechamento</Col> <Col sm={9}>{opportunity.expectedDate}</Col>
                            <Col sm={3}>Fechamento</Col> <Col sm={9}>{opportunity.closingDate ? opportunity.closingDate : 'Oportunidade aberta'}</Col>

                        </Row>
                    </CardText>
                </CardBody>
            </Card>



            <Card className='my-4' color='secondary' outline>
                <CardBody className='p-0'>
                    <CardHeader tag={'h5'} className='text-uppercase fw-bold'>
                        {/* <FaPuzzlePiece /> */}
                        <MdStar className='me-1' />Skills avaliadas e seus pesos
                    </CardHeader>
                </CardBody>
                <CardText tag={'h6'} className='m-2 d-flex flex-wrap gap-2'>
                    {jobopportunitySkills.map(jobopportunitySkill => (
                        <ListGroup horizontal className='d-flex flex-wrap flex-fill justify-content-between'>
                            <ListGroupItem
                                className="d-flex flex-fill justify-content-between align-items-center"
                                key={jobopportunitySkill.id}
                                color={colorBadgeSkills(jobopportunitySkill.skill.type)}
                            >
                                <div>
                                    {jobopportunitySkill.skill.name} -
                                    {jobopportunitySkill.skill.type}
                                </div>
                                <Badge className='ms-2 p-1'>
                                    {jobopportunitySkill.weightingFactor}
                                </Badge>
                            </ListGroupItem>

                        </ListGroup>
                    ))}
                </CardText>
            </Card>

            <ListGroup
                className='my-4 mb-2' tag={'h5'}>
                <ListGroupItem
                    className='text-uppercase fw-bold'
                    color="primary">
                    <AiOutlineUnorderedList className='me-1' />Entrevistas
                </ListGroupItem>
            </ListGroup>

            <ListGroup className='mb-2 m-0'>
                {interviews.map((interview, index) => (
                    <ListGroupItem
                        key={interview.id}
                    // color={index % 2 === 0 ? 'success' : 'warning'}
                    >
                        <ListGroupItemHeading
                            tag={'h5'}
                            className='align-items-center list-divider'
                        >
                            <div className='d-flex justify-content-between text-uppercase fw-bolder'>
                                <div>
                                    <FaRegGrinStars className='me-1' />
                                    {interview.candidate.name}
                                    {/* ({interview.candidate.email}) */}
                                    <Badge
                                        className='fw-normal ms-3'
                                        color='secondary'
                                        pill
                                    >
                                        {format(new Date(interview.startDate), 'dd/MM/yyyy')}
                                    </Badge>
                                </div>
                                <Badge
                                    className='mx-2'
                                    color='success'>
                                    {interview.totalScore}
                                </Badge>
                            </div>
                        </ListGroupItemHeading>
                        <ListGroupItemText className='d-flex flex-wrap ms-auto'>
                            {interview.ratings.map(rating => (
                                <Col key={rating.id} xs={12} sm={6} md={4} lg={3} xxl={3} className='p-1'>
                                    <div
                                        className='d-flex justify-content-between align-items-center border border-secondary-subtle fs-6 p-1'
                                        block>
                                        {rating.skill.name}
                                        <Badge
                                            // color={colorBadgeSkills(skill.type)}
                                            className='d-flex align-items-center'>
                                            {rating.score}
                                        </Badge>
                                    </div>
                                </Col>
                            ))}
                        </ListGroupItemText>
                    </ListGroupItem>
                ))}
            </ListGroup>


        </div >
    )
}

export default reportJobOpportunity