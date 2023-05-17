import fetch from '../axios/config';
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { format } from 'date-fns';
import { Badge, ListGroup, ListGroupItem, Button, Form, FormGroup, Label, Input, Col, Card, CardBody, CardHeader, CardText, CardTitle, Row, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';
import { IoInformationCircleOutline } from 'react-icons/io5';


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

  //Toggle the visibility of content across your project with Collapse.
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    getJobOpportunityById();


  }, []);


  return (
    <Row>
      <Col lg='12'>
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
      </Col>
      <Col lg='12'>

        <Card
          className="d-flex align-items-stretch  my-2"
          style={{
            width: '100%'
          }}
        >
          <CardHeader className={'d-flex text-uppercase'} tag={'h5'} >

            (CÓDIGO DA VAGA) - {jobOpportunity.title}

            <Button
              id="PopoverFocus"
              type="button"
              color='black'
              size='sm'
              className=''
            >
              <IoInformationCircleOutline />
            </Button>

            <UncontrolledPopover
              placement="bottom-end"
              target="PopoverFocus"
              trigger="focus"
            >
              <PopoverHeader>
                Informações da oportunidade
              </PopoverHeader>
              <PopoverBody className='p-2'>

                <p className='lh-1'>Departamento: {department.name}</p>
                <p className='lh-1'>Nível: {jobOpportunity.level}</p>
                <p className='lh-1'>Gerente: {department.manager}</p>
                <p className='lh-1'>Abertura: {jobOpportunity.openingDate}</p>
                <p className='lh-1'>Conclusão: {jobOpportunity.expectedDate}</p>
                {/* {format(new Date(jobOpportunity.openingDate), 'dd/MM/yyyy')} */}

              </PopoverBody>
            </UncontrolledPopover>

          </CardHeader>

          <CardBody>
            {/* <p>Id: {jobOpportunity.id}</p>
            <p>Descrição: {jobOpportunity.title}</p>
            <p>Departamento ID: {department.id}
            </p>
            <p>------------------------------------------------------------------------------------------</p>*/}
            <p>JobOpportuntySkills: {JSON.stringify(skills)} </p>
            <p>Pontuação do candidato: {totalScore} </p>
            <p>------------------------------------------------------------------------------------------</p>
          </CardBody>
        </Card>
      </Col>

      <Col lg={12}>


        <div>
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
        </div>


      </Col>
    </ Row >
  )
}

export default getJobOpportunityById