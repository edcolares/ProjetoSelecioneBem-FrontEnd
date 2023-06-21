import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Col, CardBody, Form, FormGroup, Label, Input, Card, CardHeader, ListGroup, ListGroupItem } from 'reactstrap';
import fetch from '../../services/config';
import JobOpportunity from './jobOpportunity';
import Rating from './rating';
import CandidateForm from './candidateForm';
import { useAuth } from '../../context/AuthProvider/useAuth';

const CreateInterview = () => {

    const auth = useAuth();
    const { idJobOpportunity } = useParams();
    const [jobOpportunity, setJobOpportunity] = useState([]);
    const [skills, setSkills] = useState([]);
    const [department, setDepartment] = useState([]);
    const [showInterview, setShowInterview] = useState(false);
    const [ShowRating, setShowRating] = useState(false);
    const [idUser, setIdUser] = useState(auth.id);

    const navigate = new useNavigate();

    const getJobOpportunityById = async () => {
        try {
            const response = await fetch.get(`/jobopportunity/${idJobOpportunity}`);
            const data = response.data;
            // console.log(data);
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
                    // console.log(response.data.id);
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
                            Entrevista de candidato
                        </h4>
                    </div>
                    <div className='subtitulo'>
                        <h6 className='fw-light'>
                            Com recursos intuitivos e eficientes, oferecemos uma interface fácil de usar, permitindo que os
                            recrutadores conduzam entrevistas de maneira organizada e produtiva. Não esqueça de fazer anotações relevantes
                            sobre a entrevista para tornar o processo de seleção mais eficiente e preciso.
                        </h6>


                        <h6 className='m-4 font-12px'>
                            Etapa 3.
                            <h6 className='fw-light font-12px'> Baseado em sua avaliação, defina a pontuação para cada competência inserida para a oportunidade
                                de emprego.
                            </h6>
                        </h6>
                    </div>
                    <hr />
                </Label>
            </FormGroup>



            <JobOpportunity opportunity={jobOpportunity} department={department} />
            <Card
                className="mb-4 p-0"
                color="light"
                style={{
                    width: '100%'
                }}
            >
                <CardHeader tag={'h6'} className='m-0'>
                    Etapa 1 - Candidato
                    <div className='mt-1 fw-light'>
                        Preencha o e-mail para localizar o candidato, se o candidato
                        ainda não for cadastrado, será disponibilizado para inserir o nome e cadastrar.
                    </div>
                </CardHeader>
                <CardBody>
                    <CandidateForm isDelayed={isDelayed} setIsDelayed={setIsDelayed} setCandidate={setCandidate} />
                </CardBody>
            </Card>



            <Card
                className="mb-4 p-0"
                color="light"
                style={{
                    width: '100%'
                }}
            >

                <CardHeader tag={'h6'} className='m-0'>
                    Etapa 2 - Iniciar entrevista
                    <div className='mt-1 fw-light'>
                        Para iniciar entrevista, clique no botão "Iniciar Entrevista", após o início você poderá
                        pausar e retornar a entrevista a qualquer momento.
                    </div>
                </CardHeader>

                <CardBody
                    className='d-flex justify-content-between p-3 m-0'>

                    <div
                        className='d-flex align-items-center m-0 p-0 gap-2'>
                        <Button
                            className="d-flex align-items-center m-0"
                            type="button"
                            color="success"
                            onClick={startTimer} disabled={isRunning}
                        >
                            Iniciar entrevista
                        </Button>
                        <Button
                            className="d-flex align-items-center m-0"
                            type="button"
                            color="warning"
                            onClick={stopTimer} disabled={!isRunning}
                        >
                            Pausar entrevista
                        </Button>
                    </div>
                    <FormGroup
                        tag={'h3'}
                        className="d-flex align-items-center m-0"
                    >
                        {formatTime(elapsedTime)}
                    </FormGroup>
                </CardBody>
            </Card>


            <Rating skills={skills} setSkills={setSkills} />

            <Card
                className="mb-4 p-0"
                color="light"
                style={{
                    width: '100%'
                }}
            >
                <CardHeader tag={'h6'} className='m-0'>
                    Etapa 4 - Observações gerais
                    <div className='mt-1 fw-light'>
                        Insira observações relevantes que possam auxiliar na escolha do candidato,
                        realize comentários sobre as competências e comportamento do candidato no momento da entrevista.
                    </div>
                </CardHeader>
                <CardBody>
                    <Input
                        type="textarea"
                        name="observation"
                        id="observation"
                        rows={12}
                        placeholder="Observações sobre a entrevista"
                        onChange={handleObservationChange}
                        value={observation}
                    />
                </CardBody>
            </Card>

            <FormGroup check row>
                <Col lg={12} className='my-3 p-3 d-flex justify-content-end'>
                    <Button color='success' size='md' onClick={(e) => sendInterviewData(e)}>
                        Terminar entrevista
                    </Button>
                </Col>
            </FormGroup>

        </Form>
    );
};

export default CreateInterview;