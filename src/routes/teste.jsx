import fetch from '../axios/config';
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input, Col, Card, CardBody, CardHeader, CardText, CardTitle } from 'reactstrap';

const getJobOpportunityById = () => {

  /**
   * Busca a oportunidade conforme ID
   */
  const { idJobOpportunity } = useParams();
  const [jobOpportunity, setJobOpportunity] = useState([]);
  const [skills, setSkills] = useState([]);
  const [department, setDepartment] = useState([]);
  const [totalScore, setTotalScore] = useState(0);

  const getJobOpportunityById = async () => {
    try {
      const response = await fetch.get(`/jobopportunity/${idJobOpportunity}`);
      const data = response.data;
      setJobOpportunity(data);
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
    // const sumScores = skills.reduce((acumulador, item) => (item.score * item.weightingFactor) + acumulador, 0);
    // console.log(sumScores);
    // console.log(totalScore);
    // setTotalScore(sumScores);

  }

  const sumScoresFunction = () => {
    let total = 0;
    for (let i = 0; i < skills.length; i++) {
      total = total + skills[i].totalScoreBySkill;
    }
    setTotalScore(total);
    console.log("Valor de total: ", total);
    console.log("Valor de state: ", totalScore);
  }



  useEffect(() => {
    getJobOpportunityById();


  }, []);


  return (
    <div>
      <Form>
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
      </Form>

      {/* <p>Id: {jobOpportunity.id}</p>
      <p>Title: {jobOpportunity.title}</p>
      <p>Level: {jobOpportunity.level}</p>
      <p>OpeningDate: {jobOpportunity.openingDate}</p>
      <p>ExpectedDate: {jobOpportunity.expectedDate}</p>
      <p>ClosingDate: {jobOpportunity.closingDate}</p>
      <p>------------------------------------------------------------------------------------------</p>
      <p>Departamento: {JSON.stringify(department)} </p>
      <p>Departamento ID: {department.id}
      </p> */}
      <p>------------------------------------------------------------------------------------------</p>
      <p>JobOpportuntySkills: {JSON.stringify(skills)} </p>
      <p>Pontuação do candidato: {totalScore} </p>
      <p>------------------------------------------------------------------------------------------</p>
      <div>
        {
          skills.map((skill) => (
            <div key={skill.id}>
              <p>Id de Skills: {skill.id} - {skill.skill.name}</p>
              <p></p>
              <p>weightingFactor: {skill.weightingFactor}</p>
              <input
                type="range"
                min={1}
                max={10}
                step={1}
                // value={peso.weightingFactor}
                onChange={e => changeWeightingFactor(skill.id, e.target.value)}
                name='skill.id'
              />
              <p>Nota: {skill.score}</p>
              <p>Pontuação total da Skill: {skill.totalScoreBySkill}</p>

              <p>--------------------------------</p>
            </div>
          ))
        }
      </div>
    </div >
  )
}

export default getJobOpportunityById