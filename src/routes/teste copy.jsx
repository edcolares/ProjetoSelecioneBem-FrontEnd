import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fetch from '../axios/config';
import { format } from 'date-fns';
import AlertComponent from './AlertComponent';
import '../css/style.css'
import { BsFillTrash3Fill, BsPlusCircleFill, BsFileTextFill } from 'react-icons/bs'

import {
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  Row,
  Spinner,
  Table,
  Button,
} from 'reactstrap';

const Dashboard = () => {

  const [showAlert, setShowAlert] = useState(false);
  const [alertColor, setAlertColor] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const navigate = new useNavigate();

  const [skills, setSkills] = useState([]);
  const getSkills = async () => {
    try {
      const response = await fetch.get("/skill");
      const data = response.data;
      setSkills(data);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Busca todas as oportunidades com data de fechamento em aberto
   */
  const [jobopportunities, setJobOpportunities] = useState([]);
  const getJobOpportunityByClosingDateOpen = async () => {
    try {
      const idUser = 5;
      const response = await fetch.get(`/jobopportunity/find/${idUser}`);
      const data = response.data;
      setJobOpportunities(data);
    } catch (error) {
      console.log(error)
    }
  }

  const deleteJobOpportunity = async (idJobOpportunity) => {
    const response = await fetch.delete(`/jobopportunity/${idJobOpportunity}`)
      .then(response => {
        setJobOpportunities(prevOpportunities =>
          prevOpportunities.filter(opportunity => opportunity.id !== idJobOpportunity)
        );
        setAlertColor('success');
        setAlertMessage('Oportunidade de emprego excluída com sucesso!');
        setShowAlert(true);
      })
      .catch(error => {
        console.error(error);
        setAlertColor('danger');
        setAlertMessage('Erro ao excluir a oportunidade de emprego. Por favor, tente novamente.');
      });
  }

  const newInterviewByJobOpportunity = async (idJobOpportunity) => {
    alert('Nova entrevista para a oportunidade id=' + idJobOpportunity);
    navigate(`/interview/${idJobOpportunity}`);
  }

  const relatorioOfJobOpportunity = async (idJobOpportunity) => {
    alert('Relatório para a oportunidade de id=' + idJobOpportunity)
  }

  useEffect(() => {
    getSkills();
    getJobOpportunityByClosingDateOpen();
  }, []);

  let i = 0

  return (
    <div>

      <Row>
        <Col md={12}>
          {showAlert && (
            <AlertComponent color={alertColor} message={alertMessage} />
          )}
        </Col>
        <Col md={12}>

          <Card
            className="my-2"
            color="danger"
            outline
            style={{
              width: '100%'
            }}
          >
            <CardHeader color='danger'>
              Oportunidades em aberto
            </CardHeader>
            <CardBody>
              <CardText>
                {jobopportunities.length === 0 ? <Spinner color="danger" >
                  Loading...
                </Spinner> : (

                  <div>

                    <Table
                      bordered
                      hover
                      responsive
                      size="sm"
                      striped
                    >
                      <thead>
                        <tr>
                          <th class="table-secondary">
                            Nome da oportunidade
                          </th>
                          <th class="table-secondary">
                            Level
                          </th>
                          <th class="table-secondary">
                            Abertura
                          </th>
                          <th class="table-secondary">
                            Fechamento
                          </th>
                          <th class="table-secondary">

                          </th>

                        </tr>
                      </thead >
                      <tbody>

                        {jobopportunities.map((opportunity) => (
                          <tr key={opportunity.id} className='align-middle'>
                            {/* className={Number(i++) % 2 === 0 ? 'align-middle text-secondary' : 'align-middle text-success'}> */}

                            <td className='align-middle'>
                              {opportunity.title}
                            </td>
                            <td className='align-middle'>
                              {opportunity.level}
                            </td>
                            <td className='align-middle'>
                              {format(new Date(opportunity.openingDate), 'dd/MM/yyyy')}
                            </td>
                            <td className='align-middle'>
                              {format(new Date(opportunity.expectedDate), 'dd/MM/yyyy')}
                            </td>
                            <td className='d-flex align-middle'>
                              {/* Button excluir entrevista */}
                              <Button
                                color='danger opacity-80'
                                className='p-1 my-0 mx-0 opacity-75 rounded'
                                size="sm"
                                onClick={() => deleteJobOpportunity(opportunity.id)}
                              >
                                <BsFillTrash3Fill />
                              </Button>
                              {/* Button nova entrevista */}
                              <Button
                                color='success opacity-80'
                                className='p-1 my-0 mx-1 opacity-75 bordered'
                                size="sm"
                                onClick={() => newInterviewByJobOpportunity(opportunity.id)}
                              >
                                <BsPlusCircleFill />
                              </Button>
                              {/* Button relatório */}
                              <Button
                                color='secondary opacity-80'
                                className='p-1 my-0 mx-0 opacity-75 bordered'
                                size="sm"
                                onClick={() => relatorioOfJobOpportunity(opportunity.id)}
                              >
                                <BsFileTextFill />
                              </Button>

                            </td>
                          </tr>
                        ))
                        }
                      </tbody >
                    </Table >
                  </div >
                )}
              </CardText >
            </CardBody >
          </Card >
        </Col >

        <Col>
          <Card
            className="my-2"
            color="danger"
            outline
            style={{
              width: '100%'
            }}
          >
            <CardHeader>
              Relação de Skills
            </CardHeader>
            <CardBody>
              <CardText>
                {skills.length === 0 ? <Spinner
                  color="light"
                  size="sm"
                >
                  Loading...
                </Spinner> : (
                  skills.map((skill) => (
                    <div className='skill' key={skill.id}>

                      <div>{skill.name}</div>
                    </div>
                  ))
                )}


              </CardText >
            </CardBody >
          </Card >

        </Col >
        <Col>
          <Card
            className="my-2"
            color="danger"
            inverse
            style={{
              width: '100%'
            }}
          >
            <CardHeader>
              Oportunidades fora do prazo
            </CardHeader>
            <CardBody>
              <CardTitle tag="h5">
                Atrasadas
              </CardTitle>
              <CardText>
                Aqui iremos colocar um lista com todas as oportunidades que estão com prazo
                de término superadas, mas ainda estão em aberto. A partir daqui o profissional poderá
                clicar na oportunidade que será encaminhado para a tela com todos os dados da
                oportunidade de emprego.
              </CardText>
            </CardBody>
          </Card>
        </Col>
        <Col className="bg-light border">
          Column
        </Col>
        <Col className="bg-light border">
          oLÁ MUNDO
        </Col>
      </Row>
    </div >
  )
}

export default Dashboard