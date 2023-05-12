import fetch from '../../axios/config';
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Badge, Col, Form, FormGroup, Input, Label, Alert } from 'reactstrap';
import { colorBadgeSkills } from '../codeUtils.jsx';
import '../../css/style.css';


const factorJobOpportunitySkill = () => {

    const updateWeightingFactor = async (e) => {
        e.preventDefault();

        for (let i = 0; i < jobOpportunitySkill.length; i++) {

            console.log("Id : " + jobOpportunitySkill[i].id);
            console.log("Factor: " + jobOpportunitySkill[i].weightingFactor);

            const id = jobOpportunitySkill[i].id;
            const weightingFactor = jobOpportunitySkill[i].weightingFactor;
            await fetch.put(`/jobopportunity_skill/${id}`, {
                weightingFactor
            }).then(() => { Alert('Informações atualizadas com sucesso!') })
        }
        navigate("/jobopportunity/dashboard");
    }

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

        <Form name='form' id='name' color='light' onSubmit={(e) => updateWeightingFactor(e)}>

            <FormGroup name='FormTitulo' id='FormTitulo'>
                <Label name='LabelFormTitulo' id='LabelFormTitulo'>
                    <div className='titulo'>
                        <h4>
                            Fator de peso
                        </h4>
                    </div>
                    <div className='subtitulo'>
                        <h6 className='fw-light'>
                            A escolha cuidadosa dos pesos para cada habilidade deve ser feita
                            com base nas necessidades e prioridades da empresa e da vaga em questão,
                            levando em conta o perfil do candidato ideal. Dessa forma, o
                            ranqueamento dos candidatos poderá refletir com maior precisão as
                            habilidades e competências mais importantes para a vaga, auxiliando
                            o recrutador na escolha do candidato mais adequado.
                        </h6>
                    </div>
                </Label>
            </FormGroup>

            <FormGroup name='FormCard' id='FormCard'>
                <div>
                    {jobOpportunitySkill.map(peso => (
                        <div key={peso.id} className='list-item'>
                            <h6 className="d-flex justify-content-between">
                                <span>
                                    {JSON.stringify(peso.skill.name).replace(/"/g, '') + ' '}

                                    <Badge
                                        color={colorBadgeSkills(peso.skill.type)}
                                        className='align-self-center'>
                                        {peso.skill.type}
                                    </Badge>
                                </span>
                                <span className="bg-secondary rounded px-2 text-light">{peso.weightingFactor}</span>
                            </h6>
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
                </div>
                <FormGroup check row>
                    <Col lg={12} className='my-3 p-3 d-flex justify-content-end'>
                        <Button color='success' type='submit' size='md'>
                            Concluir Cadastro
                        </Button>
                    </Col>
                </FormGroup>
            </FormGroup>
        </Form>
    );
}

export default factorJobOpportunitySkill;
