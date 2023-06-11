import fetch from '../../services/config';
import React, { useState, useEffect } from 'react'
import { Chart } from "react-google-charts";

export const options = {
  legend: "none",
  chartArea: { left: 130, top: 20, right: 10, bottom: 20 },
  pieSliceText: "label",
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
