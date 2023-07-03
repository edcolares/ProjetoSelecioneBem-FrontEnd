import React, { useState } from 'react'
import {
  Badge, Button, Input, Col, Card, CardBody, CardHeader, Row, ListGroup, ListGroupItem
} from 'reactstrap';


const Rating = ({ skills, setSkills }) => {

  /**
   * Busca a oportunidade conforme ID
   */
  const [totalScore, setTotalScore] = useState(0);

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
      total += skills[i].totalScoreBySkill;
    }

    // setTotalScore(total);
    // console.log("Valor de total: ", total);
    // console.log("Valor de state: ", totalScore);
  }

  //Toggle the visibility of content across your project with Collapse.
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  // console.log('VALOR DE SKILLS: ', skills);

  return (
    <Row>
      {/* <div>VALOR DE TOTAL SCORE: {totalScore}</div>

      {JSON.stringify(skills)} */}
      <Col lg='12'>

        <Card
          className="d-flex align-items-stretch my-1 mb-4 p-0"
          color='light'
          style={{
            width: '100%'
          }}
        >
          <CardHeader tag={'h6'} >
            Etapa 3 - Defina a nota para cada competência
            <div className='mt-1 fw-light'>Baseado em sua avaliação, defina a pontuação para cada competência inserida para a oportunidade
              de emprego.
            </div>
          </CardHeader>

          <CardBody>
            {skills.map(skill => (
              <ListGroup key={skill.id} className='d-flex mb-2'>
                <ListGroupItem className="d-md-flex justify-content-between align-items-center gap-2" >
                  <Col md={7} xs={12} className='d-flex'>
                    <span>
                      {JSON.stringify(skill.skill.name).replace(/"/g, '') + ' '}

                      <Badge
                        color='info'
                      >
                        {skill.weightingFactor}
                      </Badge>
                    </span>
                  </Col>

                  <Col
                    md={5} xs={12}
                    className='d-flex justify-content-between align-items-center gap-3'>
                    <Input
                      type="range"
                      min={1}
                      max={10}
                      step={1}
                      value={skill.score}
                      onChange={e => changeWeightingFactor(skill.id, e.target.value)}
                      name='skill.id'
                    />
                    <Button className={
                      Number(skill.score) >= 8 ? 'btn-amarelo' :
                        Number(skill.score) <= 4 ? 'btn-vermelho' :
                          'btn-laranja'} >
                      {!skill.score ? changeWeightingFactor(skill.id, '0') : skill.score}
                    </Button>
                  </Col>

                </ListGroupItem>
              </ListGroup>
            ))}
          </CardBody>
        </Card>
      </Col>
    </ Row >
  )
}

export default Rating