import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import 'chart.js/auto';
import { extractNodeIdAndValue, findVariableByNodeId } from "../function/variableUtils";

const initialData = {
  labels: [], // Inizializza labels come array vuoto
  datasets: [
    {
      label: "First dataset",
      data: [],
      fill: false,
      borderColor: "#88c1ea"
    },
    {
      label: "Second dataset",
      data: [],
      fill: false,
      borderColor: "#6ace3f"
    }
  ]
};

const options = {
  responsive: true,
  maintainAspectRatio: false
};

const TestChart = ({ variables }) => {
    const [data, setData] = useState(() => {
        const savedData = localStorage.getItem('chartData');
        return savedData ? JSON.parse(savedData) : initialData;
      });

  useEffect(() => {
    const insNewValLogging = () => {
      try {
        const newVal1 = extractNodeIdAndValue(findVariableByNodeId(variables, 'screen_amps')).value;
        const newVal2 = extractNodeIdAndValue(findVariableByNodeId(variables, 'bar_screen')).value;
        
        const currentDate = new Date().toLocaleString(); // Ottieni la data e l'ora corrente
        
        setData(prevData => {
            const updatedData = {
              ...prevData,
              labels: [...(prevData.labels || []), currentDate], // Utilizza un array vuoto se prevData.labels non è definito
              datasets: [
                {
                  ...prevData.datasets[0],
                  data: [...prevData.datasets[0].data, newVal1].slice(-300) // Limita a 10 valori
                },
                {
                  ...prevData.datasets[1],
                  data: [...prevData.datasets[1].data, newVal2].slice(-300) // Limita a 10 valori
                }
              ]
            };
  
            localStorage.setItem('chartData', JSON.stringify(updatedData));
            return updatedData;
          });

      } catch (error) {
        console.error(error);
      }
    };
    const intervalId = setInterval(insNewValLogging, 1000);
    return () => clearInterval(intervalId);
  }, [variables]);

  return (
    <div className="chart-container" style={{ position: "relative", width: "100%", height: "400px" }}>
      <Line data={data} options={options} />
    </div>
  );
}

export default TestChart;
