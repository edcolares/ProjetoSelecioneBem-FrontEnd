import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fetch from '../../services/config';
import { format } from 'date-fns';
import AlertComponent from '../../components/AlertComponent';
import '../../css/style.css'
import { BsFillTrash3Fill, BsPlusCircleFill, BsFileTextFill } from 'react-icons/bs'

import {
  Col,
  Card,
  CardHeader,
  CardBody,
  CardText,
  Row,
  Spinner,
  Table,
  Button,
} from 'reactstrap';

const Dashboard = ({ idUser }) => {

  const [showAlert, setShowAlert] = useState(false);
  const [alertColor, setAlertColor] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [jobopportunities, setJobOpportunities] = useState([]);


  const navigate = new useNavigate();

  /**
   * Busca todas as oportunidades com data de fechamento em aberto
   */

  const getJobOpportunityByClosingDateOpen = async () => {
    try {
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
        setShowAlert(true);
      });
  }

  const newInterviewByJobOpportunity = async (idJobOpportunity) => {
    navigate(`/interview/${idJobOpportunity}`);
  }

  const reportJobOpportunity = async (idJobOpportunity) => {
    navigate(`/jobopportunity/report/${idJobOpportunity}`);
  }

  useEffect(() => {
    getJobOpportunityByClosingDateOpen();
  }, []);

  let i = 0

  return (
    <Row>
      <Col md={12}>
        {showAlert && (
          <AlertComponent color={alertColor} message={alertMessage} />
        )}
      </Col>

      <Col md={12}>

        <Card
          className="my-0"
          color="light"
          style={{
            width: '100%'
          }}
        >
          <CardHeader color='danger' tag="h5" className='d-flex justify-content-between'>
            Oportunidades em aberto
            <Button color='success' size='sm' onClick={(e) => navigate('/jobopportunity')}><BsPlusCircleFill className='me-2' />Nova Oportunidade</Button>
          </CardHeader>
          <CardBody>
            <CardText className='m-0 p-0'>
              {jobopportunities.length === 0 ? <Spinner color="danger" >
                Loading...
              </Spinner> : (

                <div>

                  <Table
                    // bordered
                    hover
                    responsive
                    size="sm"
                      striped
                      style={{
                        width: '100%'
                      }}
                  >
                    <thead>
                      <tr>
                        <th class="table-secondary">
                          Descrição da oportunidade
                        </th>
                        <th class="table-secondary">
                          Nível
                          </th>
                          <th class="table-secondary">
                          Departamento
                        </th>
                        <th class="table-secondary">
                          Período
                        </th>
                        {/* <th class="table-secondary">
                          Previsão
                        </th> */}
                        <th class="table-secondary">
                          Ações
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
                          {opportunity.department.name}
                          </td>
                          <td className='align-middle'>
                            {format(new Date(opportunity.openingDate), 'dd/MM/yyyy')} - 
                            {format(new Date(opportunity.expectedDate), 'dd/MM/yyyy')}
                          </td>
                          {/* <td className='align-middle'>
                            {format(new Date(opportunity.expectedDate), 'dd/MM/yyyy')}
                          </td> */}
                          <td className='d-flex align-middle'>
                            {/* Button excluir entrevista */}
                            <Button
                              color='danger opacity-50'
                              className='p-1 my-0 mx-0 opacity-100 rounded'
                              outline
                              size="sm"
                              style={{
                                fontSize: '10px'
                              }}
                              onClick={() => deleteJobOpportunity(opportunity.id)}
                            >
                              <BsFillTrash3Fill /> Excluir
                            </Button>
                            {/* Button nova entrevista */}
                            <Button
                              color='success opacity-100'
                              className='p-1 my-0 mx-1 opacity-100 rounded'
                              size="sm"
                              outline
                              style={{
                                fontSize: '10px'
                              }}
                              onClick={() => newInterviewByJobOpportunity(opportunity.id)}
                            >
                              <BsPlusCircleFill /> Entrevistar
                            </Button>
                            {/* Button relatório */}
                            <Button
                              color='primary opacity-100'
                              className='p-1 my-0 mx-0 opacity-100 rounded'
                              size="sm"
                              outline
                              style={{
                                fontSize: '10px'
                              }}
                              onClick={() => reportJobOpportunity(opportunity.id)}
                            >
                              <BsFileTextFill /> Detalhes
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
    </Row>
  )
}

export default Dashboard