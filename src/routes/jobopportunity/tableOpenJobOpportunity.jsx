import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fetch from '../../services/config';
import { format } from 'date-fns';
import AlertComponent from '../../components/AlertComponent';
import '../../css/style.css'
import { BsFillTrash3Fill, BsPlusCircleFill, BsFileTextFill, BsBuilding } from 'react-icons/bs'
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import TotalInterviewByJobOpportunity from './getTotalInterviewByJobOpportunity';

import {
  Col,
  Card,
  CardHeader,
  CardBody,
  CardText,
  Row,
  Spinner,
  Button,
  Badge,
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

  const getJobOpportunityWithoutClosingDate = async () => {
    try {
      const response = await fetch.get(`/jobopportunity/find/${idUser}`);
      const data = response.data;
      setJobOpportunities(data);
    } catch (error) {
      console.log(error)
    }
  }

  const setJobOpportunityClosed = async (idJobOpportunity) => {
    try {
      const closingDate = new Date();
      const useId = idUser;

      window.alert(idJobOpportunity)

      const requestBody = {
        closingDate,
        useId
      }
      const response = await fetch.put(`/jobopportunity/${idJobOpportunity}`, {
        requestBody
      }).then(response => {
        setJobOpportunities(prevOpportunities =>
          prevOpportunities.filter(opportunity => opportunity.id !== idJobOpportunity)
        );
        const data = response.data;
        // console.log(data);
      })

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
        // console.error(error);
        setAlertColor('danger');
        setAlertMessage('Erro ao excluir a oportunidade de emprego. Por favor, tente novamente.');
        setShowAlert(true);
      });
  }

  const verificaJobOpportunityDelayed = (expectedDate) => {
    //Obtem a data atual
    const agora = new Date();

    // console.log(expectedDate);

    if (agora >= expectedDate) {
      return 'border-danger border'
    } else {
      return 'border-success'
    }

  }

  const newInterviewByJobOpportunity = async (idJobOpportunity) => {
    navigate(`/interview/${idJobOpportunity}`);
  }

  const reportJobOpportunity = async (idJobOpportunity) => {
    navigate(`/jobopportunity/report/${idJobOpportunity}`);
  }

  useEffect(() => {
    getJobOpportunityWithoutClosingDate();
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
          <CardBody className='m-0 p-2'>
            <CardText className='m-0 p-0'>
              {jobopportunities.length === 0 ? <Spinner color="danger" >
                Loading...
              </Spinner> : (

                <div className='d-flex flex-fill flex-wrap p-0'>


                  {/*  INICIO DO CARD*/}
                  {jobopportunities.map((opportunity) => (
                    <Col xxl={3} xl={3} lg={4} md={6} sm={6} xs={12} className='p-2'>
                      <Card
                        className={`p-1 d-flex justify-content-between align-items-center ${verificaJobOpportunityDelayed(new Date(opportunity.expectedDate))}`}
                        style={{ height: '100%' }}
                      >
                        <CardBody>
                          <CardText className='flex-nowrap' style={{ fontSize: '12px' }}>

                            <div className='d-flex justify-content-center align-items-center text-center fw-bold mb-0' style={{ fontSize: '14px', height: '60px' }}> {opportunity.title}</div>
                            <div className='d-flex justify-content-center align-items-center mb-2'>{opportunity.level}</div>
                            <div className='d-flex justify-content-center align-items-center gap-2 mb-2'><BsBuilding /> {opportunity.department.name}</div>
                            <div className='d-flex justify-content-center align-items-center gap-2'><FaCalendarAlt /> {format(new Date(opportunity.openingDate), 'dd/MM/yyyy')}</div>
                            <div className='d-flex justify-content-center align-items-center gap-2 mb-1'><FaClock />{format(new Date(opportunity.expectedDate), 'dd/MM/yyyy')}</div>
                            <div className='d-flex justify-content-center align-items-center gap-2 mb-3'>Entrevistas: <TotalInterviewByJobOpportunity idJobOpportunity={opportunity.id} /></div>


                            <div className='d-flex justify-content-center m-2'>
                              <Button
                                color='success'
                                size='sm'
                                block
                                onClick={() => setJobOpportunityClosed(opportunity.id)}
                                style={{
                                  fontSize: '12px'
                                }}
                              >
                                Finalizar
                              </Button>
                            </div>
                            <div className='d-flex justify-content-center m-2'>
                              {/* Button nova entrevista */}
                              <Button
                                color='primary'
                                size="sm"
                                block
                                onClick={() => newInterviewByJobOpportunity(opportunity.id)}
                                style={{
                                  fontSize: '12px'
                                }}
                              >
                                <BsPlusCircleFill /> Entrevistar
                              </Button>
                            </div>
                            <div className='d-flex justify-content-center m-2 gap-1'>
                              <Button
                                color='danger'
                                className='flex-fill p-1 my-0 mx-0 rounded'
                                size="sm"
                                style={{
                                  fontSize: '10px'
                                }}
                                onClick={() => deleteJobOpportunity(opportunity.id)}
                              >
                                <BsFillTrash3Fill /> Excluir
                              </Button>

                              {/* Button relatório */}
                              <Button
                                color='secondary'
                                className='flex-fill p-1 my-0 mx-0 rounded'
                                size="sm"
                                style={{
                                  fontSize: '10px'
                                }}
                                onClick={() => reportJobOpportunity(opportunity.id)}
                              >
                                <BsFileTextFill /> Detalhes
                              </Button>
                            </div>
                          </CardText>
                        </CardBody>
                      </Card>
                    </Col>
                  ))}
                  {/*  FIM DO CAR*/}

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