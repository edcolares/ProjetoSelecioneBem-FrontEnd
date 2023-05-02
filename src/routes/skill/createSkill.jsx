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
} from 'reactstrap';

const createSkill = () => {
    const navigate = new useNavigate()

    const [name, setName] = new useState();
    const [type, setType] = new useState();

    const createSkill = async (e) => {
        e.preventDefault();

        await fetch.post("/skill", {
            name, type,
        }).then(() => { alert("Skill incluída com sucesso") });

        navigate("/dashboard");
    };

    return (
        <Form color='light' rounded shadow-sm onSubmit={(e)=>createSkill(e)}>

            <FormGroup controlId="form-group-id">
                <Label>
                    <div className='titulo'><h4>Cadastro de nova skill</h4></div>                    
                </Label>
            </FormGroup>

            <FormGroup row>
                <Label for="name" sm={2}>
                    Nome
                </Label>
                <Col sm={10}>
                    <Input id="name" name="name" placeholder="with a placeholder" type="text"
                    onChange={(e)=> setName(e.target.value)} />
                </Col>
            </FormGroup>

            <FormGroup row>
                <Label for="type" sm={2}>
                    Tipo
                </Label>
                <Col sm={10}>
                    <Input id="type" name="type" placeholder="with a placeholder" type="text" 
                    onChange={(e)=> setType(e.target.value)}/>
                </Col>                
            </FormGroup>

            <FormGroup check row >
                <Col sm={{
                        offset: 2,
                        size: 10
                    }}>
                    <Button>
                        Submit
                    </Button>
                </Col>
            </FormGroup>
        </Form>
    )
}

export default createSkill