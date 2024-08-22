'use client'
import React from 'react'
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

Chart.register(ArcElement, Tooltip, Legend)
const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
    const accountNames=accounts.map((ele)=>ele.name);
    const balance=accounts.map((ele)=>ele.currentBalance);

    const data = {
        datasets: [{
            label: 'Banks',
            data: balance,
            backgroundColor: ['#020a47', '#011185', '#273dd9'],
            hoverOffset: 6
        }],
        labels: accountNames,

    }
    return <Doughnut
        data={data}
        options={{
            cutout: '50%',
            plugins: {
                legend: {
                    display:false
                }
            }
        }}
    />
}

export default DoughnutChart