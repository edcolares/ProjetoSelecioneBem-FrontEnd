import React from 'react'
import {
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
    Alert,
} from 'reactstrap';

const Home = () => {
    return (

        <Form>
            <Alert variant="primary">
                Alert.Heading, p, Alert.Link, hr, etc
            </Alert>

            <FormGroup>
                <Label for="exampleEmail">
                    <div><h4>Cadastro de nova oportunidade de emprego</h4></div>
                    <div><h6>Mensagem abaixo do título</h6></div>
                </Label>
                <Input
                    plaintext
                    value="Some plain text/ static value"
                />
            </FormGroup>
            <FormGroup>
                <Label for="exampleEmail">
                    Email
                </Label>
                <Input
                    id="exampleEmail"
                    name="email"
                    placeholder="with a placeholder"
                    type="email"
                />
            </FormGroup>
            <FormGroup>
                <Label for="examplePassword">
                    Password
                </Label>
                <Input
                    id="examplePassword"
                    name="password"
                    placeholder="password placeholder"
                    type="password"
                />
            </FormGroup>
            <FormGroup>
                <Label for="exampleUrl">
                    Url
                </Label>
                <Input
                    id="exampleUrl"
                    name="url"
                    placeholder="url placeholder"
                    type="url"
                />
            </FormGroup>
            <FormGroup>
                <Label for="exampleNumber">
                    Number
                </Label>
                <Input
                    id="exampleNumber"
                    name="number"
                    placeholder="number placeholder"
                    type="number"
                />
            </FormGroup>
            <FormGroup>
                <Label for="exampleDatetime">
                    Datetime
                </Label>
                <Input
                    id="exampleDatetime"
                    name="datetime"
                    placeholder="datetime placeholder"
                    type="datetime"
                />
            </FormGroup>
            <FormGroup>
                <Label for="exampleDate">
                    Date
                </Label>
                <Input
                    id="exampleDate"
                    name="date"
                    placeholder="date placeholder"
                    type="date"
                />
            </FormGroup>
            <FormGroup>
                <Label for="exampleTime">
                    Time
                </Label>
                <Input
                    id="exampleTime"
                    name="time"
                    placeholder="time placeholder"
                    type="time"
                />
            </FormGroup>
            <FormGroup>
                <Label for="exampleColor">
                    Color
                </Label>
                <Input
                    id="exampleColor"
                    name="color"
                    placeholder="color placeholder"
                    type="color"
                />
            </FormGroup>
            <FormGroup>
                <Label for="exampleSearch">
                    Search
                </Label>
                <Input
                    id="exampleSearch"
                    name="search"
                    placeholder="search placeholder"
                    type="search"
                />
            </FormGroup>
            <FormGroup>
                <Label for="exampleSelect">
                    Select
                </Label>
                <Input
                    id="exampleSelect"
                    name="select"
                    type="select"
                >
                    <option>
                        1
                    </option>
                    <option>
                        2
                    </option>
                    <option>
                        3
                    </option>
                    <option>
                        4
                    </option>
                    <option>
                        5
                    </option>
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="exampleSelectMulti">
                    Select Multiple
                </Label>
                <Input
                    id="exampleSelectMulti"
                    multiple
                    name="selectMulti"
                    type="select"
                >
                    <option>
                        1
                    </option>
                    <option>
                        2
                    </option>
                    <option>
                        3
                    </option>
                    <option>
                        4
                    </option>
                    <option>
                        5
                    </option>
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="exampleText">
                    Text Area
                </Label>
                <Input
                    id="exampleText"
                    name="text"
                    type="textarea"
                />
            </FormGroup>
            <FormGroup>
                <Label for="exampleFile">
                    File
                </Label>
                <Input
                    id="exampleFile"
                    name="file"
                    type="file"
                />
                <FormText>
                    This is some placeholder block-level help text for the above input. It‘s a bit lighter and easily wraps to a new line.
                </FormText>
            </FormGroup>
            <FormGroup>
                <Label for="exampleRange">
                    Range
                </Label>
                <Input
                    id="exampleRange"
                    name="range"
                    type="range"
                />
            </FormGroup>
            <FormGroup check>
                <Input type="radio" />
                {' '}Option one is this and that—be sure to
                <Label check>
                    include why it‘s great
                </Label>
            </FormGroup>
            <FormGroup check>
                <Input type="checkbox" />
                <Label check>
                    Check me out
                </Label>
            </FormGroup>
        </Form>

    )
}

export default Home

