import { useState, useEffect } from 'react';
import fetch from '../../services/config';
import { Card, CardHeader, CardBody, CardText, Col, Row } from 'reactstrap';

import SkillsAccordion from './SkillsAccordion'
import CreateSkill from './createSkill'
import AlertComponent from '../../components/AlertComponent';


const AppSkills = () => {

  const [showAlert, setShowAlert] = useState(false);
  const [alertColor, setAlertColor] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const [skills, setSkills] = useState([]);
  // console.log(skills);
  const getSkills = async () => {
    try {
      const response = await fetch.get("/skill");
      const data = response.data;
      setSkills(data);
    } catch (error) {
      console.log(error);
    }
  }

  const addSkill = (id, name, type) => {
    const newSkill = [...skills, {
      id,
      name,
      type,
    },
    ];
    setSkills(newSkill);
  }

  const removeSkill = (id) => {

    fetch.delete(`/skill/${id}`).then((response) => {
      alert("Skill removida com sucesso!")
      if (response.request.status === 200) {
        // console.log(response.data);
        setAlertColor('success');
        setAlertMessage('Skill excluída com sucesso!');
        setShowAlert(true);
      }
    }).catch((error) => {
      console.log(error.response.status)
    });

    const newSkill = [...skills];
    const filteredSkills = newSkill.filter((skill) =>
      skill.id !== id ? skill : null
    );
    setSkills(filteredSkills);
  };

  useEffect(() => {
    getSkills();
  }, []);

  return (

    <Row>

      <Col xs={12} md={12}>
        <Card
          className="p-0"
          color="secondary"
          outline
          style={{
            width: '100%'
          }}
        >
          <CardHeader tag={'h4'}>
            Insira uma nova Competência
          </CardHeader>
          <CardBody className='d-flex justify-content-center'>
            <CardText
              style={{
                width: '100%'
              }}
              className='d-flex flex-column'>
              <CreateSkill addSkill={addSkill} />
            </CardText>
          </CardBody>
        </Card>
      </Col>

      <Col md={12} className='my-3'>

        <Card
          className="p-0"
          color="secondary"
          outline
          style={{
            width: '100%'
          }}>
          <CardHeader tag={'h4'} >
            Relação de Competências
          </CardHeader>

          <CardBody>
            {showAlert && (
              <AlertComponent color={alertColor} message={alertMessage} />
            )}
            <SkillsAccordion skills={skills} removeSkill={removeSkill} />
          </CardBody>
        </Card>

      </Col>

    </Row>

  )
}

export default AppSkills