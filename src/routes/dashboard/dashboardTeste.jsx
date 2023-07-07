import fetch from '../../services/config';
import React, { useState, useEffect } from 'react'
import { Chart } from "react-google-charts";
import { useAuth } from '../../context/AuthProvider/useAuth';
import '../../css/style.css'

export const options = {
    legend: 'bottom',
    chartArea: { left: 150, top: 25, right: 25, bottom: 75 },
    pieSliceText: "none",
    fontName: 'Inter',
    fontSize: 10,
    colors: ['#2196F3', '#4CAF50'],
    // hAxis: {
    //     title: 'Ano',
    // },
    vAxis: {
        title: 'Quantidade',
    },
};

export const month = (mes) => {
    const months = [
        { name: "Jan", number: 1 },
        { name: "Fev", number: 2 },
        { name: "Mar", number: 3 },
        { name: "Abr", number: 4 },
        { name: "Mai", number: 5 },
        { name: "Jun", number: 6 },
        { name: "Jul", number: 7 },
        { name: "Ago", number: 8 },
        { name: "Set", number: 9 },
        { name: "Out", number: 10 },
        { name: "Nov", number: 11 },
        { name: "Dez", number: 12 }
    ];

    const selectedMonth = months.find((month) => month.number === Number(mes));
    return selectedMonth ? selectedMonth.name : null;
};



export function JobOpportunitiesMonthByUser() {

    const [jobOpportunities, setJobOpportunities] = useState([]);
    const auth = useAuth();
    const useId = auth.id;

    const getJobOpportunitiesMonthByUser = async () => {
        try {
            const response = await fetch.get(`/jobopportunity/statistics/getJobOpportunitiesMonthByUser/${useId}`);
            const data = response.data;
            console.log("Valor de Data: ", data);
            setJobOpportunities(data)
        } catch (error) {
            console.log(error);
        }
    }

    let data = [
        ["Período", "Abertas", "Fechadas"],
    ];

    for (let i = 0; i < jobOpportunities.length; i++) {
        const jobOpportunity = jobOpportunities[i];
        // data.push([new Date(Number(jobOpportunity.year), Number(jobOpportunity.month), 1), Number(jobOpportunity.open_opportunities), Number(jobOpportunity.closed_opportunities)])
        data.push([month(Number(jobOpportunity.month)) + "/" + Number(jobOpportunity.year), Number(jobOpportunity.open_opportunities), Number(jobOpportunity.closed_opportunities)])
    }

    useEffect(() => {
        getJobOpportunitiesMonthByUser();
    }, []);


    return (
        <div>
            <Chart
                chartType="ColumnChart"
                width={'100%'}
                height={'400px'}
                loader={<div>Carregando gráfico...</div>}
                data={data}
                options={options}
                rootProps={{ 'data-testid': '1' }}
            />
        </div>
    );
}


export default JobOpportunitiesMonthByUser