import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Col, CardBody, Form, FormGroup, Label, Input, Card, CardHeader } from 'reactstrap';
import fetch from '../../axios/config';
import JobOpportunity from './jobOpportunity';
import Rating from './rating';
import CandidateForm from './candidateForm';

const CreateInterview = () => {

    const { idJobOpportunity } = useParams();
    const [jobOpportunity, setJobOpportunity] = useState([]);
    const [skills, setSkills] = useState([]);
    const [department, setDepartment] = useState([]);
    const [showInterview, setShowInterview] = useState(false);
    const [ShowRating, setShowRating] = useState(false);
    const [idUser, setIdUser] = useState();

    const navigate = new useNavigate();


    const getJobOpportunityById = async () => {
        try {
            const response = await fetch.get(`/jobopportunity/${idJobOpportunity}`);
            const data = response.data;
            console.log(data);
            setJobOpportunity(data);
            setSkills(data.jobopportunitySkills);
            setDepartment(data.department);

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getJobOpportunityById();
    }, []);


    // ultima inclusoes
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [observation, setObservation] = useState('');
    const [isDelayed, setIsDelayed] = useState(false);
    const [candidate, setCandidate] = useState();

    const intervalRef = useRef(null);

    const startTimer = () => {
        setStartTime(new Date());
        setIsRunning(true);
        intervalRef.current = setInterval(() => {
            setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
        }, 1000);
    };

    const stopTimer = () => {
        clearInterval(intervalRef.current);
        setEndTime(new Date());
        setIsRunning(false);
    };

    const handleObservationChange = (event) => {
        setObservation(event.target.value);
    };

    // Variaveis para serem inseridas
    // startDate, finishDate, delay, duration, totalScore, note
    // FK_candidateId, FK_userId, FK_jobopportunityId

    const sendInterviewData = async (e) => {
        e.preventDefault();
        let totalScore = 0;
        for (let i = 0; i < skills.length; i++) {
            totalScore += skills[i].totalScoreBySkill;
        }

        const data = {
            startDate: startTime,
            finishDate: endTime,
            duration: formatTime(elapsedTime),
            totalScore: totalScore,
            isDelayed: isDelayed,
            note: observation,
            FK_userId: Number(idUser),
            FK_jobopportunityId: Number(idJobOpportunity),
            FK_candidateId: Number(candidate.id),
        };

        fetch.post(`/interview/`,
            data
        ).then((response) => {

            const FK_interviewId = Number(response.data.id);

            for (let i = 0; i < skills.length; i++) {

                const score = Number(skills[i].score);
                const FK_skillId = Number(skills[i].skill.id);
                fetch.post(`/rating`, {
                    score, FK_interviewId, FK_skillId
                }).then((response) => {
                    console.log(response.data.id);
                })
            }

            navigate("/jobopportunity/dashboard");
        });
    };



    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''
            }${seconds}`;
    };



    return (
        <Form>

            <FormGroup>
                <Label>
                    <div className='titulo'>
                        <h4>
                            Entrevista
                        </h4>
                    </div>
                    <div className='subtitulo'>
                        <h6 className='fw-light'>
                            Com recursos intuitivos e eficientes, oferecemos uma interface fácil de usar, permitindo que os
                            recrutadores conduzam entrevistas de maneira organizada e produtiva. Não esqueça de fazer anotações relevantes
                            sobre a entrevista para tornar o processo de seleção mais eficiente e preciso.
                        </h6>
                    </div>
                </Label>
            </FormGroup>



            <JobOpportunity opportunity={jobOpportunity} department={department} />
            <Card
                className="card my-2"
                outline
                color="light"
                style={{
                    width: '100%'
                }}
            >
                <CardHeader tag={'h5'}>
                    Selecione o candidato
                </CardHeader>
                <CardBody>
                    <CandidateForm isDelayed={isDelayed} setIsDelayed={setIsDelayed} setCandidate={setCandidate} />
                </CardBody>
            </Card>

            <div>

                <Card
                    className="card my-2"
                    color="light"
                    style={{
                        width: '100%'
                    }}
                >
                    <CardHeader className='d-flex justify-content-between align-items-center'>
                        <FormGroup className='d-flex align-items-center'>

                            <Input type='text' name='idUser' onChange={e => setIdUser(e.target.value)} />

                            <Button className="d-flex align-items-center" type="button" color="success" onClick={startTimer} disabled={isRunning}>
                                Iniciar entrevista
                            </Button>
                            <Button className="mx-2" type="button" color="warning" onClick={stopTimer} disabled={!isRunning}>
                                Pausar entrevista
                            </Button>
                        </FormGroup>
                        <FormGroup tag={'h2'} className='p-0'>
                            {formatTime(elapsedTime)}
                        </FormGroup>
                    </CardHeader>
                </Card>

                <Rating skills={skills} setSkills={setSkills} />

                <Input
                    type="textarea"
                    name="observation"
                    id="observation"
                    placeholder="Observações sobre a entrevista"
                    onChange={handleObservationChange}
                    value={observation}
                />

                <FormGroup check row>
                    <Col lg={12} className='my-3 p-3 d-flex justify-content-end'>
                        <Button color='success' size='md' onClick={(e) => sendInterviewData(e)}>
                            Terminar entrevista
                        </Button>
                    </Col>
                </FormGroup>
            </div>

        </Form>
    );
};

export default CreateInterview;