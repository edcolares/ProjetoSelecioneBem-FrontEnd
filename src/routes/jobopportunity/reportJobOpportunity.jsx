import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import fetch from '../../services/config';
import { format } from 'date-fns';
import { AiOutlineFileText, AiOutlineUnorderedList } from 'react-icons/ai';
import { FaCog, FaRegGrinStars } from 'react-icons/fa';
import { MdStar } from 'react-icons/md';
import ReportPage from './ReportPage';
import ReportPage2 from './ReportPage copy';

import {
    Row,
    Card,
    CardBody,
    CardHeader,
    CardText,
    Col,
    Badge,
    ListGroup,
    ListGroupItem,
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
            <div className='d-flex justify-content-between'>
                <h3>
                    <AiOutlineFileText className='mx-2' />
                    RELATÓRIO DA OPORTUNIDADE
                </h3>
                <ReportPage />
                <ReportPage2 />
            </div>
            <Card className='my-2' color='secondary' outline>
                <CardBody className='p-0'>
                    <CardHeader tag={'h5'} className='p-2 m-0 text-uppercase fw-bold'>
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
                    <CardHeader tag={'h5'} className='p-2 m-0 text-uppercase fw-bold'>
                        {/* <FaPuzzlePiece /> */}
                        <MdStar className='me-1' />Skills avaliadas e seus pesos
                    </CardHeader>
                </CardBody>
                <CardText tag={'h6'} className='m-2 d-flex flex-wrap gap-2 ps-3 pe-3'>
                    {jobopportunitySkills.map(jobopportunitySkill => (
                        <ListGroup horizontal className='d-flex flex-wrap'>
                            <div
                                className="d-flex flex-wrap align-items-center border border-secondary-subtle rounded-2 p-1"
                                key={jobopportunitySkill.id}

                            >
                                <div className='m-0 p-0'>
                                    {jobopportunitySkill.skill.name}
                                    {/* {jobopportunitySkill.skill.type} */}
                                </div>
                                <Badge className='align-items-center ms-2'
                                    color={colorBadgeSkills(jobopportunitySkill.skill.type)}
                                >
                                    {jobopportunitySkill.weightingFactor}
                                </Badge>
                            </div>

                        </ListGroup>
                    ))}
                </CardText>
            </Card>

            <ListGroup
                className='my-4 mb-2' tag={'h5'}>
                <ListGroupItem
                    className='p-2 m-0 text-uppercase fw-bold'
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
                        <div
                            className='align-items-center list-divider p-2'
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
                                <h6
                                    className='m-0 p-0 bg-success rounded-2 p-1 text-bg-danger fw-bold'
                                    color='success'>
                                    {interview.totalScore}
                                </h6>
                            </div>
                        </div>
                        <ListGroupItemText className='d-flex flex-wrap gap-2 p-2'>
                            {interview.ratings.map(rating => (
                                <div
                                    className="d-flex flex-wrap align-items-center border border-secondary-subtle rounded-2 p-1"
                                    key={rating.id}

                                >
                                    <div className='m-0 p-0'>
                                        {rating.skill.name}
                                        <Badge
                                            // color={colorBadgeSkills(skill.type)}
                                            className='align-items-center ms-2'>
                                            {rating.score}
                                        </Badge>
                                    </div>
                                </div>
                            ))}

                        </ListGroupItemText>
                        <div className='d-flex border border-secondary-subtle rounded-2 p-1 bg-light'>
                            <div className='d-flex flex-column fw-bolder'>Observação: </div>
                            {interview.note}
                        </div>
                    </ListGroupItem>
                ))}
            </ListGroup>


        </div >
    )
}

export default reportJobOpportunity