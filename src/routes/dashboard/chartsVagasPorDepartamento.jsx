import fetch from '../../services/config';
import React, { useState, useEffect } from 'react'
import { Chart } from "react-google-charts";

export const options = {
  legend: "none",
  chartArea: { left: 130, top: 50, right: 0, bottom: 50 },
  pieSliceText: "label",
};

export function ChartsVagasPorDepartamento() {

  const [jobOpportunities, setJobOpportunities] = useState([]);

  const vagasPorDepartamentos = async () => {
    try {
      const response = await fetch.get(`/jobopportunity/statistics/vacancybyopportunity`);
      const data = response.data;
      // console.log("Valor de Data: ", data);
      setDepartments(data)
    } catch (error) {
      console.log(error);
    }
  }

  let data = [
    ["Departamento", "Mês", "Ano", "Vagas"],
  ];

  for (let i = 0; i < jobOpportunities.length; i++) {
    const jobOpportunity = jobOpportunities[i];
    data.push([String(jobOpportunity.name_department), Number(jobOpportunity.month), Number(jobOpportunity.year), Number(jobOpportunity.vacancy_open)])
  }

  useEffect(() => {
    vagasPorDepartamentos();
  }, []);


  return (
    <Chart
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
    />
  );
}


export default ChartsVagasPorDepartamento
