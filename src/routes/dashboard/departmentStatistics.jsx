import fetch from '../../services/config';
import React, { useState, useEffect } from 'react'
import { Chart } from 'react-google-charts'

const ChartDepartmentStatistics = () => {

    const [departments, setDepartments] = useState([]);

    const ChartDepartmentStatistics = async () => {
        try {
            const response = await fetch.get(`/department/statistics`);
            const data = response.data;
            console.log(data);
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
        ChartDepartmentStatistics();
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

export default ChartDepartmentStatistics;