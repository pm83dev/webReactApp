import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import 'chart.js/auto';
import { extractNodeIdAndValue, findVariableByNodeId } from "../function/variableUtils";
import 'bootstrap/dist/css/bootstrap.min.css';

// Dati iniziali
const initialBarDataCons = {
  labels: [],
  datasets: [
    {
      label: "Total kWh",
      data: [],
      backgroundColor: "rgba(136,193,234,0.5)",
      borderColor: "#88c1ea",
      borderWidth: 1,
    },
    {
      label: "kw heaters",
      data: [],
      backgroundColor: "rgba(245,221,39,0.8)",
      borderColor: "#ffa500",
      borderWidth: 1,
    },
    {
      label: "kw Inverters",
      data: [],
      backgroundColor: "rgba(106,206,63,0.5)",
      borderColor: "#6ace3f",
      borderWidth: 1,
    }
  ]
};

// Opzioni grafico
const optionsBar = {
  responsive: true,
  maintainAspectRatio: false
};

// Funzione log a tempo e salvataggio dati in array con shift del primo valore
const ChartConsBar = ({ variables }) => {
  const [barData, setBarData] = useState(() => {
    const savedData = localStorage.getItem('barChartData');
    return savedData ? JSON.parse(savedData) : initialBarDataCons;
  });

  useEffect(() => {
    const insNewValLogging = () => {
      try {
        const newVal1 = extractNodeIdAndValue(findVariableByNodeId(variables, 'Total_kWh')).value;
        const newVal2 = extractNodeIdAndValue(findVariableByNodeId(variables, 'Total_kW_Heating')).value;
        const newVal3 = extractNodeIdAndValue(findVariableByNodeId(variables, 'Total_Kw_ist_inverter')).value;

        const currentDate = new Date().toLocaleString(); // Ottieni la data e l'ora corrente

        setBarData(prevData => {
          const newLabels = [...prevData.labels, currentDate];
          const newData1 = [...prevData.datasets[0].data, newVal1];
          const newData2 = [...prevData.datasets[1].data, newVal2];
          const newData3 = [...prevData.datasets[2].data, newVal3];

          // Se ci sono più di 60 punti, rimuovi il primo punto
          if (newLabels.length > 60) {
            newLabels.shift();
            newData1.shift();
            newData2.shift();
            newData3.shift();
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
              },
              {
                ...prevData.datasets[2],
                data: newData3
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
      setBarData(initialBarDataCons);
    } catch (error) {
      console.error('Error resetting cache:', error);
    }
  };

  return (
    <div>
      <section>
        <div className="chart-container" style={{ position: "relative", width: "100%", height: "400px" }}>
          <Bar data={barData} options={optionsBar} />
        </div>
      </section>
      <section>
        <button type="button" className="btn btn-info" style={{ marginLeft: '20px', marginTop: '10px' }} onClick={resetCache}>Reset Data Cache</button>
      </section>
    </div>
  );
};

export default ChartConsBar;
