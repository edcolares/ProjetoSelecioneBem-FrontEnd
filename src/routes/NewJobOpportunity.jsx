import React from 'react'
import {
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
    Col,
    Button,
    ButtonToolbar,
    ButtonGroup,
} from 'reactstrap';

const NewJobOpportunity = () => {
    return (

        // <div class="my-3 p-3 bg-light rounded shadow-sm">
        <Form color='light' rounded shadow-sm>
            <FormGroup controlId="form-group-id">
                <Label>
                    <div><h4>Cadastro de nova oportunidade de emprego</h4></div>
                    <div><h7>Mensagem abaixo do título</h7></div>
                </Label>
            </FormGroup>
            <ButtonToolbar>
                <ButtonGroup className="me-2">
                    <Button color="danger">
                        1
                    </Button>
                    <Button color="danger">
                        2
                    </Button>
                    <Button color="danger">
                        3
                    </Button>
                    <Button color="danger">
                        4
                    </Button>
                </ButtonGroup>
                <ButtonGroup className="me-2">
                    <Button color='warning'>
                        5
                    </Button>
                    <Button color='warning'>

                        6
                    </Button>
                    <Button color='warning'>
                        7
                    </Button>
                </ButtonGroup>
                <ButtonGroup>
                    <Button color="success">
                        8
                    </Button>
                    <Button color="success">
                        9
                    </Button>
                    <Button color="success">
                        10
                    </Button>
                </ButtonGroup>
            </ButtonToolbar>
            <FormGroup row>
                <Label for="exampleEmail" sm={2}>
                    Email
                </Label>
                <Col sm={10}>
                    <Input id="exampleEmail" name="email" placeholder="with a placeholder" type="email" />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="examplePassword" sm={2} >
                    Password
                </Label>
                <Col sm={10}>
                    <Input id="examplePassword" name="password" placeholder="password placeholder" type="password" />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="exampleSelect" sm={2} >
                    Select
                </Label>
                <Col sm={10}>
                    <Input id="exampleSelect" name="select" type="select" >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Input>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="exampleSelectMulti" sm={2} >
                    Select Multiple
                </Label>
                <Col sm={10}>
                    <Input id="exampleSelectMulti" multiple name="selectMulti" type="select" >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Input>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="exampleText" sm={2} >
                    Text Area
                </Label>
                <Col sm={10}>
                    <Input id="exampleText" name="text" type="textarea" />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="exampleFile" sm={2} >
                    File
                </Label>
                <Col sm={10}>
                    <Input id="exampleFile" name="file" type="file" />
                    <FormText>
                        This is some placeholder block-level help text for the above input. It‘s a bit lighter and easily wraps to a new line.
                    </FormText>
                </Col>
            </FormGroup>
            <FormGroup row tag="fieldset" >
                <legend className="col-form-label col-sm-2">
                    Radio Buttons
                </legend>
                <Col sm={10}>
                    <FormGroup check>
                        <Input name="radio2" type="radio" />
                        {' '}
                        <Label check>
                            Option one is this and that—be sure to include why it‘s great
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Input name="radio2" type="radio" />
                        {' '}
                        <Label check>
                            Option two can be something else and selecting it will deselect option one
                        </Label>
                    </FormGroup>
                    <FormGroup check disabled >
                        <Input disabled name="radio2" type="radio" />
                        {' '}
                        <Label check>
                            Option three is disabled
                        </Label>
                    </FormGroup>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="checkbox2" sm={2} >
                    Checkbox
                </Label>
                <Col sm={{
                    size: 10
                }}
                >
                    <FormGroup check>
                        <Input id="checkbox2" type="checkbox" />
                        {' '}
                        <Label check>
                            Check me out
                        </Label>
                    </FormGroup>
                </Col>
            </FormGroup>
            <FormGroup check row >
                <Col
                    sm={{
                        offset: 2,
                        size: 10
                    }}
                >
                    <Button>
                        Submit
                    </Button>
                </Col>
            </FormGroup>
        </Form>
        // </div>
    )
}

export default NewJobOpportunity