import fetch from '../axios/config';
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FormGroup, Button, Badge, Col, Input } from 'reactstrap';
import { colorBadgeSkills } from './codeUtils.jsx';
import '../css/style.css';


function App() {


    const navigate = useNavigate();
    const { id } = useParams();

    const changeWeightingFactor = (id, newFactor) => {
        const updSkillList = jobOpportunitySkill.map(skill => {
            if (skill.id === id) {
                return { ...skill, weightingFactor: newFactor };
            }
            return skill;
        });
        setJobOpportunitySkill(updSkillList);
    }

    const [jobOpportunitySkill, setJobOpportunitySkill] = useState([]);
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

    useEffect(() => {
        getJobOpportunitySkill();
    }, []);

    return (
        <FormGroup>
            <h1>Habilidades</h1>

            <div className="list-divider">{jobOpportunitySkill.map(peso => (
                <div key={peso.id} className='list-item'>
                    <h5 className="d-flex justify-content-between">
                        <span>
                            {JSON.stringify(peso.skill.name).replace(/"/g, '') + ' '}

                            <Badge
                                color={colorBadgeSkills(peso.skill.type)}
                                className='align-self-center'>
                                {peso.skill.type}
                            </Badge>
                        </span>
                        <span className="bg-secondary rounded px-2 text-light">{peso.weightingFactor}</span>
                    </h5>
                    <Input
                        type="range"
                        min={0}
                        max={10}
                        step={1}
                        value={peso.weightingFactor}
                        onChange={e => changeWeightingFactor(peso.id, e.target.value)}
                        name='peso'
                        list='tickmarks'
                    />
                </div>
            ))}
                {/* <p>{JSON.stringify(jobOpportunitySkill)}</p> */}
            </div>
            <FormGroup check row>
                <Col lg={12}>
                    <Button color='success' size='lg'>
                        Salvar
                    </Button>
                </Col>
            </FormGroup>
        </FormGroup>
    );
}

export default App;
