import fetch from '../../services/config';
import React, { useState, useEffect } from 'react'
import { Chart } from "react-google-charts";

export const options = {
  legend: "none",
  chartArea: { left: 200, top: 100, right: 5, bottom: 50 },
  pieSliceText: "label",
  fontName: 'Inter',
  fontSize: 10,
  colors: [
    '#4C83B7', // Azul claro
    '#CD4C7D', // Rosa
    '#FFAD5C', // Laranja
    '#63BC85', // Verde claro
    '#8F70A6', // Lilás
    '#FF6767', // Vermelho claro
    '#5FA8D3', // Azul
    '#E38F51', // Laranja claro
    '#84C17D', // Verde
    '#D68EDB', // Rosa claro
    '#F3B87B', // Amarelo
    '#7FBEEB', // Azul claro
  ],
  chartArea: {
    width: '70%',
    height: '60%',
  },
  hAxis: {
    title: 'Quantidade'
  }
};

export function ChartsFilterControl() {

  const [departments, setDepartments] = useState([]);

  const departmentStatistics = async () => {
    try {
      const response = await fetch.get(`/department/statistics`);
      const data = response.data;
      console.log("Valor de Data: ", data);
      setDepartments(data)
    } catch (error) {
      console.log(error);
    }
  }

  let data = [
    ["Departamento", "Nível", "Total Oportunidades"],
  ];

  for (let i = 0; i < departments.length; i++) {
    const department = departments[i];
    data.push([String(department.name), String(department.nivel), Number(department.qtde_oportunidades)])
  }

  useEffect(() => {
    departmentStatistics();
  }, []);


  return (
    <Chart
      chartType="BarChart"
      width="100%"
      height="300px"
      loader={<div>Carregando gráfico...</div>}
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
              label: "Escolha o nível: ",
              allowTyping: false,
              allowMultiple: false,
            },
          },
        },
      ]}
    />
  );
}


export default ChartsFilterControl
