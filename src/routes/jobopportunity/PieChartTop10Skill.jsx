import fetch from '../../axios/config';
import React, { useState, useEffect } from 'react'
import { Chart } from 'react-google-charts'

const teste = () => {

    const [skills, setSkills] = useState([]);
    const getTop10Skills = async () => {
        try {
            const response = await fetch.get(`/jobopportunity_skill`);
            const data = response.data;
            console.log(data);
            setSkills(data)
        } catch (error) {
            console.log(error);
        }
    }

    let data = [
        ["Nome", "Frequência"],
    ];

    for (let i = 0; i < skills.length; i++) {
        const skill = skills[i];
        data.push([String(skill.name), Number(skill.count)])
    }



    const options = {
        title: "Top 10 Skills",
        legend: true, //Remove a legenda do canot superior direito
        pieSliceText: "%", // "label" "value" aparece o titulo
        chartArea: { width: "100%" },
        is3D: true, // Gráfico 3D (Em alguns gráficos 3D tem que ser false)
        //pieHole: 0.2,
        //sliceVisibilityThreshold: 0.2, // 20% - Gráfico mostra um dado e other

        // hAxis: {
        //     title: "Frequência",
        //     minValue: 0,
        // },
        // vAxis: {
        //     title: "City",
        // },
    };

    useEffect(() => {
        getTop10Skills();
    }, []);


    return (
        <Chart
            chartType="PieChart" //BarChart, ColumnChart, PieChart,LineChart
            width="100%
            "
            height="400px"
            // legendToggle
            options={options}
            data={data}
        // data={[["Age", "Weight"], [4, 5.5], [8, 12]]}
        />
    )
}

export default teste