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
            backgroundColor: ['#8B5CF6', '#2563EB', '#F59E0B'],
            hoverOffset: 4
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