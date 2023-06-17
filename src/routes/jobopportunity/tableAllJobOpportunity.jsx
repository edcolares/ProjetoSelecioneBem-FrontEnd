import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fetch from '../../services/config';
import { format } from 'date-fns';
import AlertComponent from '../../components/AlertComponent';
import '../../css/style.css'
import { BsFillTrash3Fill, BsPlusCircleFill, BsFileTextFill, BsFillCaretDownFill, BsFillCaretUpFill } from 'react-icons/bs'
import TotalInterviewByJobOpportunity from './getTotalInterviewByJobOpportunity';


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
  Input,
  FormGroup,
  Label,
} from 'reactstrap';

const AllJobOpportunityByUser = ({ idUser }) => {

  const [showAlert, setShowAlert] = useState(false);
  const [alertColor, setAlertColor] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [jobopportunities, setJobOpportunities] = useState([]);
  const navigate = new useNavigate();


  // Controle de ordenação das três primeiras colunas
  const [sortColumn, setSortColumn] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  // Função para controle da ordenação conforme o nome da coluna passada
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };


  /**
   * Busca todas as oportunidades com data de fechamento em aberto
   */
  const getAllJobOpportunityBy = async () => {
    try {
      const response = await fetch.get(`/jobopportunity/user/${idUser}`);
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
    getAllJobOpportunityBy();
  }, []);

  let i = 0


  /**
     * Código para executar o FILTER dentro de SKILLS
     */
  const [query, setQuery] = useState("");
  console.log(query);
  console.log(jobopportunities.filter(opportunity => opportunity.title.toLowerCase().includes(query)));


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
          <CardHeader color='danger' className='d-flex justify-content-between'>
            Oportunidades em aberto
          </CardHeader>
          <CardBody>
            <CardText className='m-0 p-0'>
              {jobopportunities.length === 0 ? <Spinner color="danger" >
                Loading...
              </Spinner> : (

                <div>
                  <Col md={12}>
                    <Card className='mb-2'>
                      <CardBody className='d-flex gap-4'>
                        <Col md={6}>
                          <FormGroup>
                            <Label>
                              Pesquisa global
                            </Label>

                            <Input
                              id='search'
                              name='search'
                              placeholder='Pesquisa'
                              type='search'
                              onChange={e => setQuery(e.target.value)}
                            >

                            </Input>
                          </FormGroup>
                        </Col>
                        <Col md={6} className='flex-fill justify-content-between'>
                          <FormGroup className='gap-2'>
                            <Label>
                              Pesquisa período
                            </Label>
                            <FormGroup className='d-flex gap-2'>
                              <Input
                                id='searchDataInicial'
                                name='searchDataInicial'
                                placeholder='Pesquisa'
                                type='date'
                                onChange={e => setQuery(e.target.value)}
                              >

                              </Input>

                              <Input
                                id='searchDataFinal'
                                name='searchDataFinal'
                                placeholder='Pesquisa'
                                type='date'
                                onChange={e => setQuery(e.target.value)}
                              >

                              </Input>

                            </FormGroup>
                          </FormGroup>
                        </Col>
                      </CardBody>
                    </Card>
                  </Col>
                  <Table
                    // bordered
                    // hover
                    responsive
                    size="sm"
                    style={{
                      width: '100%',
                      fontSize: '13px',

                    }}
                  >
                    <thead>
                      <tr className='text-uppercase fw-bold'>
                        <th class="table-secondary d-flex align-items-center" onClick={() => handleSort('title')}>
                          Descrição da oportunidade
                          {sortColumn === 'title' && (
                            <span className="ms-1 ">
                              {sortOrder === 'asc' ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />}
                            </span>
                          )}
                        </th>
                        <th class="table-secondary" onClick={() => handleSort('level')}>
                          Nível
                          {sortColumn === 'level' && (
                            <span className="ms-1">
                              {sortOrder === 'asc' ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />}
                            </span>
                          )}
                        </th>
                        <th class="table-secondary" onClick={() => handleSort('department')}>
                          Departamento
                          {sortColumn === 'department' && (
                            <span className="ms-1">
                              {sortOrder === 'asc' ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />}
                            </span>
                          )}
                        </th>
                        <th class="table-secondary" onClick={() => handleSort('openingDate')}>
                          Abertura
                          {sortColumn === 'openingDate' && (
                            <span className="ms-1">
                              {sortOrder === 'asc' ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />}
                            </span>
                          )}
                        </th>
                        <th class="table-secondary">
                          Fechamento
                        </th>
                        <th class="table-secondary">
                          Ações
                        </th>

                      </tr>
                    </thead >
                    <tbody>

                      {/* INICIO DO MAP COM FILTRO */}
                      {jobopportunities.filter(opportunity =>
                        opportunity.title.toLowerCase().includes(query) ||
                        opportunity.level.toLowerCase().includes(query) ||
                        opportunity.department.name.toLowerCase().includes(query)
                      )
                        .sort((a, b) => {
                          if (sortColumn === 'title') {
                            return sortOrder === 'asc'
                              ? a.title.localeCompare(b.title)
                              : b.title.localeCompare(a.title);
                          } else if (sortColumn === 'level') {
                            return sortOrder === 'asc'
                              ? a.level.localeCompare(b.level)
                              : b.level.localeCompare(a.level);
                          } else if (sortColumn === 'department') {
                            return sortOrder === 'asc'
                              ? a.department.name.localeCompare(b.department.name)
                              : b.department.name.localeCompare(a.department.name);
                          } else if (sortColumn === 'openingDate') {
                            return sortOrder === 'asc'
                              ? new Date(a.openingDate.localeCompare(b.openingDate))
                              : new Date(b.openingDate.localeCompare(a.openingDate));
                          } else {
                            return 0;
                          }
                        })
                        .map((opportunity) => (
                          <tr key={opportunity.id} className='align-middle'>
                            {/* className={Number(i++) % 2 === 0 ? 'align-middle text-secondary' : 'align-middle text-success'}> */}

                            <td className='align-middle gap-2'>
                              {opportunity.title} <TotalInterviewByJobOpportunity idJobOpportunity={opportunity.id} />
                            </td>
                            <td className='align-middle'>
                              {opportunity.level}
                            </td>
                            <td className='align-middle'>
                              {opportunity.department.name}
                            </td>
                            <td className='align-middle text-center'>
                              {format(new Date(opportunity.openingDate), 'dd/MM/yyyy')}
                            </td>
                            <td className='align-middle text-center'>
                              {opportunity.closingDate === null ? '' : format(new Date(opportunity.closingDate), 'dd/MM/yyyy')}
                            </td>
                            <td className='d-flex align-middle gap-1'>

                              {/* Button nova entrevista */}
                              {opportunity.closingDate === null ? (
                                <Button
                                  className='btn-default-action p-1 my-0 mx-0'
                                  size="sm"
                                  style={{
                                    fontSize: '10px'
                                  }}
                                  onClick={() => newInterviewByJobOpportunity(opportunity.id)}
                                >
                                  <BsPlusCircleFill /> Entrevistar
                                </Button>
                              ) : null}

                              {/* Button relatório */}
                              <Button
                                className='btn-default-action p-1 my-0 mx-0'
                                size="sm"
                                style={{
                                  fontSize: '10px'
                                }}
                                onClick={() => reportJobOpportunity(opportunity.id)}
                              >
                                <BsFileTextFill /> Detalhes
                              </Button>

                              {/* Button excluir entrevista */}
                              {opportunity.closingDate === null ? (
                                <Button
                                  className='btn-default-action p-1 my-0 mx-0'
                                  size="sm"
                                  style={{
                                    fontSize: '10px'
                                  }}
                                  onClick={() => deleteJobOpportunity(opportunity.id)}
                                >
                                  <BsFillTrash3Fill /> Excluir
                                </Button>
                              ) : null}
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

export default AllJobOpportunityByUser