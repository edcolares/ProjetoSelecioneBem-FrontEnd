import fetch from '../services/config';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Badge, Button, Input, Col, Card, CardBody, CardHeader, Row } from 'reactstrap';


const getJobOpportunityById = () => {

  /**
   * Busca a oportunidade conforme ID
   */
  const { idJobOpportunity } = useParams();
  const [skills, setSkills] = useState([]);
  const [totalScore, setTotalScore] = useState(0);

  const getJobOpportunityById = async () => {
    try {
      const response = await fetch.get(`/jobopportunity/${idJobOpportunity}`);
      const data = response.data;
      setSkills(data.jobopportunitySkills);
      setDepartment(data.department);

    } catch (error) {
      console.log(error)
    }
  }

  const changeWeightingFactor = (id, score) => {
    const updSkillList = skills.map(skill => {
      if (skill.id === id) {
        const result = skill.weightingFactor * score
        return { ...skill, score: score, totalScoreBySkill: result };
      }
      return skill;
    });
    setSkills(updSkillList);
    sumScoresFunction();
  }

  const sumScoresFunction = () => {
    let total = 0;
    for (let i = 0; i < skills.length; i++) {
      total = total + skills[i].totalScoreBySkill;
    }
    setTotalScore(total);
    // console.log("Valor de total: ", total);
    // console.log("Valor de state: ", totalScore);
  }

  //Toggle the visibility of content across your project with Collapse.
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    getJobOpportunityById();


  }, []);


  return (
    <Row>
      <Col lg='12'>
        <Card
          className="d-flex align-items-stretch  my-2"
          style={{
            width: '100%'
          }}
        >
          <CardHeader className={'d-flex'} tag={'h5'} >
            Defina a nota para skill
          </CardHeader>

          <CardBody>
            {skills.map(skill => (
              <div key={skill.id} className='list-item'>
                <h5 className="d-flex justify-content-between" >
                  <span>
                    {JSON.stringify(skill.skill.name).replace(/"/g, '') + ' '}

                    <Badge
                      color='primary'
                      className='align-self-center'>
                      {/* {skill.skill.type}
                       - Peso:  */}
                      {skill.weightingFactor}
                    </Badge>

                  </span>
                  {/* <span className="bg-secondary rounded px-2 text-light">{skill.weightingFactor}</span> */}
                  <Button className={
                    Number(skill.score) >= 8 ? 'btn-amarelo' :
                      Number(skill.score) <= 4 ? 'btn-vermelho' :
                        'btn-laranja'} >
                    {!skill.score ? changeWeightingFactor(skill.id, '0') : skill.score}
                  </Button>
                </h5>
                <Input
                  type="range"
                  min={1}
                  max={10}
                  step={1}
                  value={skill.score}
                  style={{
                    width: '100%'
                  }}
                  // value={peso.weightingFactor}
                  onChange={e => changeWeightingFactor(skill.id, e.target.value)}
                  name='skill.id'
                />
              </div>
            ))}
          </CardBody>
        </Card>
      </Col>
    </ Row >
  )
}

export default getJobOpportunityById