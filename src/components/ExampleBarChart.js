import React, { useEffect, useRef } from 'react';
import { Chart, BarController, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Registrare i controller e le scale
Chart.register(BarController, BarElement, CategoryScale, LinearScale);

const BarChart = () => {
    const chartRef = useRef(null);
    const myChartRef = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');

        // Distrugge il grafico esistente se presente
        if (myChartRef.current) {
            myChartRef.current.destroy();
        }

        // Crea un nuovo grafico
        myChartRef.current = new Chart(ctx, {
            type: 'line', // Tipo di grafico
            data: {
                labels: ['January', 'February', 'March', 'April'],
                datasets: [{
                    label: 'My First Dataset',
                    data: [65, 59, 80, 81],
                    backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                    borderColor: ['rgba(255, 99, 132, 1)'],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    x: {
                        type: 'category', // Tipo di scala
                        labels: ['January', 'February', 'March', 'April']
                    },
                    y: {
                        type: 'linear'
                    }
                }
            }
        });

        // Pulizia: distrugge il grafico al termine del componente
        return () => {
            if (myChartRef.current) {
                myChartRef.current.destroy();
            }
        };
    }, []);

    return <canvas ref={chartRef}></canvas>;
};

export default BarChart;
