import fetch from '../axios/config'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert, FormGroup, Label, ListGroup, ListGroupItem, Row, ButtonGroup, Input, Col, Form, Button, Toast, ToastHeader, ToastBody } from 'reactstrap'


const addJobOpportunitySkill = (props) => {

    const navigate = useNavigate();
    const [jobOpportunitySkill, setJobOpportunitySkill] = useState([]);
    const { id } = useParams();

    const addWeightingFactor = async (e) => {
        e.preventDefault();

        await fetch.post(`/jobopportunity_skill/${id}`, {
            // weightingFactor
        }).then(() => { alert("Peso cadastrado com sucesso!") });
    }

    const getJobOpportunitySkill = async () => {
        try {
            const response = await fetch.get(`/jobopportunity_skill/${id}`);
            const data = response.data;
            console.log(data);

            setJobOpportunitySkill(data)
        } catch (error) {
            console.log(error);
        }
    }

    const [value, setValue] = useState(props.initialValue);

    const handleChange = (event) => {
        setValue(parseInt(event.target.value));
    };

    useEffect(() => {
        getJobOpportunitySkill();
    }, []);

    /**
     * Código para montagem da página
     */
    return (


        <Form color='light' onSubmit={(e) => addJobOpportunitySkill(e)}>

            <FormGroup>
                <Label>
                    <div className='titulo'>
                        <h4>
                            Fator de peso
                        </h4>
                    </div>
                    <div className='subtitulo'>
                        <h6 className='fw-light'>
                            { }
                        </h6>
                    </div>
                </Label>
            </FormGroup>

            {
                //  JSON.stringify(jobOpportunitySkill)
                jobOpportunitySkill.length === 0 ? <p>Sem oportunidades</p> : (
                    jobOpportunitySkill.map((jobSkills) => (

                        // <FormGroup row color='primary'>
                        //     <Label lg={6}>
                        //         {JSON.stringify(jobSkills.skill['name'])}
                        //     </Label>
                        //     <Col lg={4}>
                        //         <p key={jobSkills.id}> Id da JobOpportunitySkill: {jobSkills.id}</p>
                        //         <p key={jobSkills.id}> Fator atual: {jobSkills.weightingFactor}</p>
                        //     </Col>
                        // </FormGroup>
                        <ListGroup>
                            <ListGroupItem color="primary" className='my-1 rounded shadow-sm'>

                                <FormGroup>
                                    <Row
                                        md="2"
                                        sm="1"
                                        xs="1"
                                    >
                                        <Col lg={8} md={7}>
                                            {JSON.stringify(jobSkills.skill['name'])}
                                        </Col>
                                        <Col lg={1} md={1}>
                                            <div className="d-grid">
                                                <Button variant="dark" style={{
                                                    fontWeight: 'bold'
                                                }}>
                                                  {value}
                                                </Button>
                                            </div>
                                        </Col>
                                        <Col lg={3} md={4}>
                                            <input
                                                type="range"
                                                min="0"
                                                max="10"
                                                step="1"
                                                value={value}
                                                onChange={handleChange}
                                                list='tickmarks'
                                            />
                                            <datalist id="tickmarks" className='w-100'>
                                                <option value="0" label="0" />
                                                <option value="1" label="1" />
                                                <option value="2" label="2" />
                                                <option value="3" label="3" />
                                                <option value="4" label="4" />
                                                <option value="5" label="5" />
                                                <option value="6" label="6" />
                                                <option value="7" label="7" />
                                                <option value="8" label="8" />
                                                <option value="9" label="9" />
                                                <option value="10" label="10" />
                                            </datalist>
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </ListGroupItem>
                        </ListGroup>



                        // <Toast>
                        //     <ToastHeader icon="primary">
                        //         {JSON.stringify(jobSkills.skill['name'])}
                        //     </ToastHeader>
                        //     <ToastBody>
                        //         <p key={jobSkills.id}> Id da JobOpportunitySkill: {jobSkills.id}</p>
                        //         <p key={jobSkills.id}> Fato atual: {jobSkills.weightingFactor}</p>
                        //     </ToastBody>
                        // </Toast>
                    ))
                )
            }

            {/* Botão para salvar */}
            <FormGroup check row>
                <Col lg={12}>
                    <Button color='success' size='lg'>
                        Salvar
                    </Button>
                </Col>
            </FormGroup>

        </Form>
    )
}

export default addJobOpportunitySkill