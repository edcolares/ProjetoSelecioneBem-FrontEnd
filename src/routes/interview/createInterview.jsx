import React, { useState, useRef } from 'react';
import { Button, Form, FormGroup, Label, Input, Col, Card, CardBody, CardHeader, CardText, CardTitle } from 'reactstrap';
import fetch from '../../axios/config';


const CandidateForm = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Valor do campo email: ", email)
            const response = await fetch.get(`/candidate/${email}`);
            console.log('Resposta da API' + JSON.stringify(response));
            setName(response.data.name);
        } catch (error) {
            setName('');
        }
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSave = async () => {
        try {
            await fetch.post('/candidate', { name, email });
        } catch (error) {
            console.error(error);
        }
    };


    // ultima inclusoes

    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [observation, setObservation] = useState('');

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
        sendInterviewData();
    };

    const handleObservationChange = (event) => {
        setObservation(event.target.value);
    };

    const sendInterviewData = () => {
        const data = {
            start_time: startTime,
            end_time: endTime,
            elapsed_time: elapsedTime,
            observation: observation,
        };
        fetch.post('sua-api.com/entrevista', data).then((response) => {
            console.log(response);
        });
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''
            }${seconds}`;
    };

    return (
        <Form onSubmit={handleSubmit}>

            <FormGroup>
                <Label>
                    <div className='titulo'>
                        <h4>
                            Entrevista
                        </h4>
                    </div>
                    <div className='subtitulo'>
                        <h6 className='fw-light'>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi dolores, minima dolorem tempora pariatur itaque ipsa quos, dignissimos optio, fuga omnis quaerat quod vero. Voluptas id cumque obcaecati nesciunt ex.
                        </h6>
                    </div>
                </Label>
            </FormGroup>


            <Card
                className="card my-2"
                color="light"
                style={{
                    width: '100%'
                }}
            >
                <CardHeader tag={'h5'}>
                    Defina o candidato
                </CardHeader>
                <CardBody>
                    <CardText>
                        <FormGroup row>
                            <Col lg={2}>
                                <Label for="email">E-mail do candidato</Label>
                            </Col>
                            <Col lg={10}>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Informe o e-mail do candidato"
                                    value={email}
                                    onBlur={handleSubmit}
                                    onChange={handleEmailChange}
                                />
                            </Col>
                            {/* <Col lg={2}>
                <Button color="primary" type="submit">
                  Verificar Candidato
                </Button>
              </Col> */}
                        </FormGroup>


                        {name ? (
                            <FormGroup row>
                                <Col lg={2}>
                                    <Label for="name">Nome do candidato</Label>
                                </Col>
                                <Col lg={10}>
                                    <Input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={name}
                                        onChange={handleNameChange}
                                    />
                                </Col>
                            </FormGroup>
                        ) : (
                            <>
                                <FormGroup row>
                                    <Col lg={2}>
                                        <Label for="name">Nome</Label>
                                    </Col>
                                    <Col lg={10}>
                                        <Input
                                            type="text"
                                            name="name"
                                            id="name"
                                            placeholder="Informe o nome do candidato"
                                            value={name}
                                            onChange={handleNameChange}
                                        />
                                    </Col>
                                </FormGroup>

                                <FormGroup row switch>
                                    <Col lg={2}>

                                    </Col>
                                    <Col lg={10}>
                                        <Input
                                            type="switch"
                                            role="switch"
                                        />
                                        <Label check>Candidato chegou atrasado!</Label>
                                    </Col>
                                </FormGroup>

                            </>
                        )}

                        <FormGroup check row>
                            <Col lg={12} className='my-3 p-3 d-flex justify-content-end'>
                                {!name && (

                                    <Button className="button-77" role="button" onClick={handleSave}>
                                        Salvar Candidato
                                    </Button>

                                )}
                            </Col>
                        </FormGroup>

                    </CardText>
                </CardBody>
            </Card>







            {/* codigo novo */}


            <div>
                <Button color="primary" onClick={startTimer} disabled={isRunning}>
                    Iniciar entrevista
                </Button>

                <h2>{formatTime(elapsedTime)}</h2>

                <Input
                    type="textarea"
                    name="observation"
                    id="observation"
                    placeholder="Observações sobre a entrevista"
                    onChange={handleObservationChange}
                    value={observation}
                />


                <Button color="danger" onClick={stopTimer} disabled={!isRunning}>
                    Terminar entrevista
                </Button>
            </div>

        </Form>
    );
};

export default CandidateForm;