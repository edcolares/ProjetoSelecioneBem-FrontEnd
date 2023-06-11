import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Departamento", "Júnior", "Pleno", "Senior"],
  ["Ciencia de Dados", 6, 10, 8],
  ["Desenvolvimento", 8, 6, 6],
  ["Garantia de Qualidade", 4, 9, 12],
  ["Gestão de Produtos", 7, 5, 8],
  ["Infraestrutura", 10, 5, 3],
];

export const options = {
  chart: {
    title: "Média de entrevistas trabalhadas por departamento",
    //subtitle: "Sales, Expenses, and Profit: 2014-2017",
  },
};

export function ChartAverageOfInterviewByDeparment() {
  return (
    <Chart
      chartType="Bar"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}

export default ChartAverageOfInterviewByDeparment;