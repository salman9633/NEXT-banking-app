'use client'
import React from 'react'
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

Chart.register(ArcElement, Tooltip, Legend)
const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
    const data = {
        datasets: [{
            label: 'Banks',
            data: [100, 200, 300],
            backgroundColor: ['#020a47', '#011185', '#273dd9'],
            hoverOffset: 6
        }],
        labels: [
            "Bank 1", "Bank 2", "Bank 3"
        ],

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