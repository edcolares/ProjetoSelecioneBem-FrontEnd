import fetch from '../../axios/config';
import React, { useState, useEffect } from 'react'
import { Chart } from "react-google-charts";

export const data = [
  ["Area", "Nível", "Qtde Entrevista"],
  ["Desenvolvimento", "Senior", 12],
  ["Qualidade de Software", "Senior", 20],
  ["BI", "Senior", 22],
  ["BI", "Pleno", 3],
  ["Desenvolvimento", "Junior", 42],
  ["BI", "Junior", 32],
  ["Qualidade de Software", "Junior", 32],
  ["Desenvolvimento", "Pleno", 32],
];

export const options = {
  legend: "none",
  chartArea: { left: 130, top: 50, right: 0, bottom: 50 },
  pieSliceText: "label",
};

export function ChartsFilterControl() {
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


export default ChartsFilterControl
