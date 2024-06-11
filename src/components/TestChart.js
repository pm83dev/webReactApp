import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import 'chart.js/auto';
import { extractNodeIdAndValue, findVariableByNodeId } from "../function/variableUtils";
import 'bootstrap/dist/css/bootstrap.min.css';

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
          const newLabels = [...prevData.labels, currentDate];
          const newData1 = [...prevData.datasets[0].data, newVal1];
          const newData2 = [...prevData.datasets[1].data, newVal2];

          // Se ci sono più di 60 punti, rimuovi il primo punto
          if (newLabels.length > 60) {
            newLabels.shift();
            newData1.shift();
            newData2.shift();
          }

          const updatedData = {
            ...prevData,
            labels: newLabels,
            datasets: [
              {
                ...prevData.datasets[0],
                data: newData1
              },
              {
                ...prevData.datasets[1],
                data: newData2
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

  const resetCache = () => {
    try {
      window.localStorage.clear();
      setData(initialData); // Usa initialData direttamente
    } catch (error) {
      console.error('Error resetting cache:', error);
    }
  };


  return (
    <div className="chart-container" style={{ position: "relative", width: "100%", height: "400px" }}>
      <Line data={data} options={options} />
      <section>
      <button  type="button" className="btn btn-primary" onClick={resetCache} >Reset Chart</button>
      </section>
      
    </div>
  );
}

export default TestChart;
