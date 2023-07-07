import fetch from '../../services/config';
import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthProvider/useAuth';
import { Chart } from "react-google-charts";

export const options = {
  // legend: { position: "right"},
  chartArea: { left: 20, top: 20, right: 10, bottom: 10 },
  pieSliceText: "percentual",
  fontName: 'Inter',
  fontSize: 12,
  colors: [
    '#FF6767',
    '#FF1493',
    '#00BFFF',
    '#63BC85', // Verde claro
    '#FF8C00',

    '#E38F51',
    '#FF69B4',
    '#D68EDB',
    '#5FA8D3',
    '#BA55D3',
    '#63BC85',

    '#CD4C7D', // Rosa
    '#FFAD5C', // Laranja
    '#8F70A6', // Lilás
    '#5FA8D3', // Azul
    '#D68EDB', // Rosa claro
    '#FF6767', // Vermelho claro
    '#E38F51', // Laranja claro
    '#84C17D', // Verde
    '#F3B87B', // Amarelo
    '#7FBEEB', // Azul claro
  ],
  hAxis: {
    title: 'Quantidade'
  }
};

export function ChartsFilterControl() {

  const [departments, setDepartments] = useState([]);
  const auth = useAuth();
  const useId = auth.id;

  const departmentStatistics = async () => {
    try {
      const response = await fetch.get(`/department/statistics/${useId}`);
      const data = response.data;
      console.log("Department Statistics: ", data);
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
    console.log();
    data.push([String(department.name), String(department.nivel), Number(department.qtde_oportunidades)])
  }

  useEffect(() => {
    departmentStatistics();
  }, []);


  return (
    <Chart
      chartType="PieChart"
      width="100%"
      height="400px"
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
              labelStacking: "vertical",
              label: "Escolha o nível: ",
              allowTyping: true,
              allowMultiple: true,
            },
          },
        },
      ]}
    />
  );
}


export default ChartsFilterControl
