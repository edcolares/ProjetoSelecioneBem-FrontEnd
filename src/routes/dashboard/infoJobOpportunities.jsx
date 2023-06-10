import fetch from '../../services/config';
import React, { useState, useEffect } from 'react'
import { Chart } from "react-google-charts";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
} from 'reactstrap';


export const optionsGreen = {
  legend: "bottom",
  pieSliceText: "percentage",
  pieHole: 0.4,
  fontName: 'Inter',
  pieStartAngle: 0,
  fontSize: 12,
  chartArea: {
    width: '100%',
    height: '75%',
  },
  //tooltip: { trigger: "none" },
  slices: {
    0: { color: "#53b002" },
    1: { color: "#175703" },
  },
};

export const optionsClosed = {
  legend: "bottom",
  pieSliceText: "percentage",
  pieHole: 0.4,
  fontName: 'Inter',
  pieStartAngle: 0,
  fontSize: 12,
  chartArea: {
    width: '100%',
    height: '75%',
  },
  slices: {
    0: { color: "red", offset: 0.1 },
    1: { color: "orange" },
  },
};

export const optionsGlobal = {
  legend: "bottom",
  pieSliceText: "percentage",
  pieHole: 0.4,
  fontName: 'Inter',
  pieStartAngle: 0,
  fontSize: 12,
  chartArea: {
    width: '100%',
    height: '75%',
  },
  slices: {
    0: { color: "#10002B" },
    1: { color: "#5A189A" },
    2: { color: "#C77DFF" }
  },
};

export function InfoJobOpportunities() {

  const [jobOpportunities, setJobOpportunities] = useState([]);
  const [jobOpportunitiesGlobal, setJobOpportunitiesGlobal] = useState([]);

  const getJobOpportunities = async () => {
    try {
      const response = await fetch.get(`/jobopportunity/statistics/allopportunities`);
      const data = response.data;
      setJobOpportunities(data)
    } catch (error) {
      console.log(error);
    }
  }

  // POPULA O ARRAY DE OPORTUNIDADES (ABERTAS E FECHADAS - 1º GRÁFICO)
  let dataJobOpportunities = [
    ["Status", "Qtde"],
  ];

  for (let i = 0; i < jobOpportunities.length; i++) {
    const jobOpportunity = jobOpportunities[i];
    dataJobOpportunities.push(["Abertas", Number(jobOpportunity.open_opportunities)])
    dataJobOpportunities.push(["Fechadas", Number(jobOpportunity.closed_opportunities)])
  }

  //POPULA O ARRAY DE OPORTUNIDADES FECHADAS (ATRASADAS E NO PRAZO)
  let dataClosedJobOpportunities = [
    ["Status", "Qtde"],
  ];

  for (let i = 0; i < jobOpportunities.length; i++) {
    const jobOpportunity = jobOpportunities[i];
    dataClosedJobOpportunities.push(["Atrasadas", Number(jobOpportunity.delayed_opportunities)]),
      dataClosedJobOpportunities.push(["No prazo", Number(jobOpportunity.closed_opportunities - jobOpportunity.delayed_opportunities)])
  }

  /**  Código para tratamento e criação do GRAFICO GLOBAL
   *  TODO TRATAMENTO PARA O GRÁFICO GLOBAL ESTÁ ABAIXO
  */
  const getJobOpportunitiesGlobal = async () => {
    try {
      const response = await fetch.get(`/jobopportunity/statistics/globaljobopportunities`);
      const data = response.data;
      console.log("GLOBAL: ", data);
      setJobOpportunitiesGlobal(data)
    } catch (error) {
      console.log(error);
    }
  }

  let dataJobOpportunitiesGlobal = [
    ["Status", "Qtde"],
  ];

  let total_opportunity_global_system;

  for (let i = 0; i < jobOpportunitiesGlobal.length; i++) {
    const jobOpportunityGlobal = jobOpportunitiesGlobal[i];
    dataJobOpportunitiesGlobal.push(["Abertas", Number(jobOpportunityGlobal.oportunidades_abertas_global)]),
      dataJobOpportunitiesGlobal.push(["Fechadas no prazo", Number(jobOpportunityGlobal.fechadas_prazo_global)]),
      dataJobOpportunitiesGlobal.push(["Fechadas com atraso", Number(jobOpportunityGlobal.fechadas_atraso_global)])
    total_opportunity_global_system = jobOpportunityGlobal.all_opportunities;
  }



  useEffect(() => {
    getJobOpportunities();
    getJobOpportunitiesGlobal();
  }, []);


  return (

    <Col md={12} className='my-3'>

      {
        jobOpportunities.map((info) => (
          <Row>

            {/* Primeira COLUNA */}
            <Col xs="4">
              <Card
                color='white'
              >
                <CardHeader className='d-flex text-center m-0 py-2 p-0'>
                  <Col xs="12">
                    Criadas
                  </Col>
                </CardHeader>
                <CardBody tag={'h1'} className='text-center m-0 py-2 p-0'>
                  <Col xs="12">
                    {info.all_opportunities}

                    <Chart
                      chartType="PieChart"
                      data={dataJobOpportunities}
                      options={optionsGreen}
                      width={"100%"}
                      height={"100%"}
                    />

                  </Col>
                </CardBody>
              </Card>
            </Col>

            {/* Segunda COLUNA */}
            <Col xs="4">
              <Card
                color='white'
              >
                <CardHeader className='d-flex text-center m-0 py-2 p-0'>
                  <Col xs="12">Fechadas</Col>
                </CardHeader>
                <CardBody tag={'h1'} className='text-center m-0 py-2 p-0'>
                  <Col xs="12">
                    {info.closed_opportunities}
                    <Chart
                      chartType="PieChart"
                      data={dataClosedJobOpportunities}
                      options={optionsClosed}
                      width={"100%"}
                      height={"100%"}
                    />
                  </Col>
                </CardBody>
              </Card>
            </Col>

            {/* Terceira COLUNA */}
            <Col xs="4">
              <Card
                color='white'
              >
                <CardHeader className='d-flex text-center m-0 py-2 p-0'>
                  <Col xs="12">Global</Col>
                </CardHeader>
                <CardBody tag={'h1'} className='text-center m-0 py-2 p-0'>
                  <Col xs="12">
                    {total_opportunity_global_system}
                    <Chart
                      chartType="PieChart"
                      data={dataJobOpportunitiesGlobal}
                      options={optionsGlobal}
                      width={"100%"}
                      height={"100%"}
                    />
                  </Col>
                </CardBody>
              </Card>
            </Col>


          </Row>
        ))
      }



      {/* <Chart
        chartType="BarChart"
        width="100%"
        height="100%"
        data={data}
        options={options}
        chartWrapperParams={{ view: { columns: [0, 2] } }}
        chartPackages={["corechart", "controls"]}
        controls={[
          {
            controlEvents: [
              {
                eventName: "statechange",
                callback: ({ chartWrapper, controlWrapper }) => {
                  console.log("State changed to", controlWrapper?.getState());
                },
              },
            ],
            controlType: "CategoryFilter",
            options: {
              filterColumnIndex: 1,
              ui: {
                labelStacking: "horizontal",
                label: "Filtro:",
                allowTyping: false,
                allowMultiple: false,
              },
            },
          },
        ]}
      /> */}
    </Col>

  );
}


export default InfoJobOpportunities
