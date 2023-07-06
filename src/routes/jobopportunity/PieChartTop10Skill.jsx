import fetch from '../../services/config';
import React, { useState, useEffect } from 'react'
import { Chart } from 'react-google-charts'
import { string } from 'yup';

const teste = () => {

    const [skills, setSkills] = useState([]);

    const getTop10Skills = async () => {
        try {
            const response = await fetch.get(`/jobopportunity_skill`);
            const data = response.data;
            // console.log(data);
            setSkills(data)
        } catch (error) {
            console.log(error);
        }
    }

    let data = [
        ["Nome", "Frequência", { role: "style" }],
    ];

    const colors = [
        '#FF6767', // Vermelho claro
        '#CD4C7D', // Rosa
        '#FFAD5C', // Laranja
        '#63BC85', // Verde claro
        '#8F70A6', // Lilás
        '#5FA8D3', // Azul
        '#E38F51', // Laranja claro
        '#D68EDB', // Rosa claro
        '#F3B87B', // Amarelo
        '#7FBEEB', // Azul claro
        '#84C17D', // Verde
    ];

    for (let i = 0; i < skills.length; i++) {
        const skill = skills[i];
        data.push([String(skill.name), Number(skill.count), 'color:  #8F70A6'])
        console.log(`'color: `+colors[i]+`'`);
    }

    const options = {
        // title: "As 10 mais utilizadas",
        legend: "none", //Remove a legenda do canot superior direito
        pieSliceText: "label", // "label" "value" aparece o titulo
        chartArea: { left: 150, top: 20, right: 20, bottom: 20 },
        fontName: 'Inter',
        fontSize: 10,
    };

    useEffect(() => {
        getTop10Skills();
    }, []);


    return (
        <Chart
            chartType="BarChart" //BarChart, ColumnChart, PieChart,LineChart
            width="100%"
            height="400px"
            loader={<div>Carregando gráfico...</div>}
            data={data}
            options={options}
        />
    )
}

export default teste