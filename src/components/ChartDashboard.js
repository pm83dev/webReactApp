import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import 'chart.js/auto';
import { extractNodeIdAndValue, findVariableByNodeId } from "../function/variableUtils";
import 'bootstrap/dist/css/bootstrap.min.css';

const initialData = {
  labels: [],
  datasets: [
    {
      label: "First dataset",
      data: [],
      fill: false,
      borderColor: "#88c1ea",
      tension: 0.4 // Arrotonda le linee
    },
    {
      label: "Second dataset",
      data: [],
      fill: false,
      borderColor: "#6ace3f",
      tension: 0.4 // Arrotonda le linee
    }
  ]
};

const initialBarData = {
  labels: [],
  datasets: [
    {
      label: "First dataset",
      data: [],
      backgroundColor: "rgba(136,193,234,0.5)",
      borderColor: "#88c1ea",
      borderWidth: 1,
    },
    {
      label: "Second dataset",
      data: [],
      backgroundColor: "rgba(106,206,63,0.5)",
      borderColor: "#6ace3f",
      borderWidth: 1,
    }
  ]
};

const optionsLine = {
  responsive: true,
  maintainAspectRatio: false
};

const optionsBar = {
  responsive: true,
  maintainAspectRatio: false
};

const ChartDashboard = ({ variables }) => {
  const [lineData, setLineData] = useState(() => {
    const savedData = localStorage.getItem('lineChartData');
    return savedData ? JSON.parse(savedData) : initialData;
  });

  const [barData, setBarData] = useState(() => {
    const savedData = localStorage.getItem('barChartData');
    return savedData ? JSON.parse(savedData) : initialBarData;
  });

  useEffect(() => {
    const insNewValLogging = () => {
      try {
        const newVal1 = extractNodeIdAndValue(findVariableByNodeId(variables, 'screen_amps')).value;
        const newVal2 = extractNodeIdAndValue(findVariableByNodeId(variables, 'bar_screen')).value;

        const currentDate = new Date().toLocaleString(); // Ottieni la data e l'ora corrente

        setLineData(prevData => {
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

          localStorage.setItem('lineChartData', JSON.stringify(updatedData));
          return updatedData;
        });

        setBarData(prevData => {
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

          localStorage.setItem('barChartData', JSON.stringify(updatedData));
          return updatedData;
        });

      } catch (error) {
        console.error(error);
      }
    };

    const intervalId = setInterval(insNewValLogging, 5000);
    return () => clearInterval(intervalId);
  }, [variables]);

  const resetCache = () => {
    try {
      window.localStorage.clear();
      setLineData(initialData);
      setBarData(initialBarData);
    } catch (error) {
      console.error('Error resetting cache:', error);
    }
  };

  return (
    <div>
      <div className="chart-container" style={{ position: "relative", width: "100%", height: "400px" }}>
        <Line data={lineData} options={optionsLine} />
      </div>
      <section>
        <button type="button" className="btn btn-info" style={{ marginLeft: '20px', marginTop: '10px' }} onClick={resetCache}>Reset Data Cache</button>
      </section>
      <section>
        <div className="chart-container" style={{ position: "relative", width: "100%", height: "400px" }}>
          <Bar data={barData} options={optionsBar} />
        </div>
      </section>
    </div>
  );
};

export default ChartDashboard;
