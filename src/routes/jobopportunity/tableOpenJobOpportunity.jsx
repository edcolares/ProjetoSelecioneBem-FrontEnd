import React from 'react';
import { useState, useEffect } from 'react';
import fetch from '../../axios/config';
import { format } from 'date-fns';
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

const tableOpenJobOpportunity = () => {

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

  useEffect(() => {
    getJobOpportunityByClosingDateOpen();
  }, []);

  let i = 0

  return (
    <div>

      <Row>
        <Col md={12}>

          <Card
            className="my-2"
            color="danger"
            outline
            style={{
              width: '100%'
            }}
          >
            <CardHeader tag="h5">
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
                              <Button color='danger opacity-80' className='p-1 my-0 mx-0 opacity-75 rounded' size="sm"><BsFillTrash3Fill /></Button>
                              <Button color='success opacity-80' className='p-1 my-0 mx-1 opacity-75 bordered' size="sm"><BsPlusCircleFill /></Button>
                              <Button color='secondary opacity-80' className='p-1 my-0 mx-0 opacity-75 bordered' size="sm"><BsFileTextFill /></Button>
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
    </div >
  )
}

export default tableOpenJobOpportunity