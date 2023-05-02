import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import fetch from '../../axios/config';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Col,
    Button,
    Collapse,
    Alert,
} from 'reactstrap';

const createInterview = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const navigate = new useNavigate();

    const [startDate, setStartDate] = new useState();
    const [finishDate, setFinishDate] = new useState();
    const [delay, setDelay] = new useState();
    const [duration, setDuration] = new useState();
    const [totalScore, setTotalScore] = new useState();
    const [note, setNote] = new useState();
    const [candidateId, setCandidateId] = new useState();
    const [useId, setUseId] = new useState();
    const [jobopportunityId, setJobOpportunityId] = new useState();


    const createInterview = async (e) => {
        e.preventDefault();

        await fetch.post("/interview", {
            startDate, finishDate, delay, duration, totalScore, note, candidateId, useId, jobopportunityId
        }).then(() => { alert("Entrevista cadastrada com sucesso!") });

        navigate("/dashboard");
    };

    return (
        <div></div>
        // <Form color='light' rounded shadow-lg onSubmit={(e) => createInterview(e)}>


        //     <Button
        //         color="primary"
        //         onClick={toggle}
        //         style={{
        //             marginBottom: '1rem'
        //         }}
        //     >
        //         Toggle
        //     </Button>
        //     <Collapse horizontal isOpen={isOpen}>
        //         <Alert
        //             style={{
        //                 width: '500px'
        //             }}
        //         >
        //             Anim pariatur cliche reprehenderit, enim eiulgod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
        //         </Alert>
        //     </Collapse>


        //     <FormGroup id="form-group-id">
        //         <Label>
        //             <div><h4>Entrevista</h4></div>
        //         </Label>
        //     </FormGroup>

        //     <FormGroup row>
        //         <Label for="startDate" lg={2}>
        //             Hora de início
        //         </Label>
        //         <Col lg={4}>
        //             <Input id="startDate" name="startDate" placeholder="Início da entrevista" type="datetime-local"
        //                 onChange={(e) => setStartDate(e.target.value)} />
        //         </Col>
        //         <Label for="duration" lg={2}>
        //             Duração
        //         </Label>
        //         <Col lg={4}>
        //             <Input id="duration" name="duration" placeholder="Início da entrevista" type="time"
        //                 onChange={(e) => setDuration(e.target.value)} />
        //         </Col>
        //     </FormGroup>

        //     <FormGroup row>
        //         <Label for="note" lg={2}>
        //             Tipo
        //         </Label>
        //         <Col lg={10}>
        //             <Input id="note" name="note" placeholder="Observações" type="textarea"
        //                 onChange={(e) => setNote(e.target.value)} />
        //         </Col>
        //     </FormGroup>

        //     <FormGroup check row >
        //         <Col lg={{
        //             offset: 2,
        //             size: 10
        //         }}>
        //             <Button>
        //                 Submit
        //             </Button>
        //         </Col>
        //     </FormGroup>
        // </Form>
    )
}

export default createInterview