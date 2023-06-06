import fetch from '../../axios/config';
import React, { useState, useEffect } from 'react'
import { Chart } from "react-google-charts";

export const options = {
    legend: "label",
    chartArea: { left: 200, top: 50, right: 0, bottom: 50 },
    pieSliceText: "label",
};

export const month = (mes) => {
    const months = [
        { name: "Janeiro", number: 1 },
        { name: "Fevereiro", number: 2 },
        { name: "Março", number: 3 },
        { name: "Abril", number: 4 },
        { name: "Maio", number: 5 },
        { name: "Junho", number: 6 },
        { name: "Julho", number: 7 },
        { name: "Agosto", number: 8 },
        { name: "Setembro", number: 9 },
        { name: "Outubro", number: 10 },
        { name: "Novembro", number: 11 },
        { name: "Dezembro", number: 12 }
    ];

    const selectedMonth = months.find((month) => month.number === Number(mes));
    return selectedMonth ? selectedMonth.name : null;
};



export function ChartsVagasPorDepartamento() {

    const [jobOpportunities, setJobOpportunities] = useState([]);

    const vagasPorDepartamentos = async () => {
        try {
            const response = await fetch.get(`/jobopportunity/statistics/vacancybyopportunity`);
            const data = response.data;
            console.log("Valor de Data: ", data);
            setJobOpportunities(data)
        } catch (error) {
            console.log(error);
        }
    }

    let data = [
        ["Departamento", "Mês", "Ano", "Vagas"],
    ];

    for (let i = 0; i < jobOpportunities.length; i++) {
        const jobOpportunity = jobOpportunities[i];
        data.push([String(jobOpportunity.name_department), month(Number(jobOpportunity.month)), Number(jobOpportunity.year), Number(jobOpportunity.vacancy_open)])
    }

    const handleChartReady = (chartWrapper) => {
        const chart = chartWrapper.getChart();

        // Definir um valor no carregamento do gráfico
        chart.setSelection('selectedValue', 'Março');
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
            chartWrapperParams={{ view: { columns: [0, 3] } }}
            chartPackages={["corechart", "controls"]}
            // chartEvents={[
            //     {
            //         eventName: 'ready',
            //         callback: handleChartReady,
            //     },
            // ]}
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
                    controlID: "month-filter",
                    options: {
                        filterColumnIndex: 1,
                        ui: {
                            labelStacking: "horizontal",
                            controlID: "month-filter",
                            label: "Selecione o mês",
                            allowTyping: false,
                            allowMultiple: false,
                        },
                    },
                },
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
                    controlID: "year-filter",
                    options: {
                        filterColumnIndex: 2,
                        ui: {
                            labelStacking: "horizontal",
                            label: "",
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