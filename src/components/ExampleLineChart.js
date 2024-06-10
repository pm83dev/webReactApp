import React from "react";
import { Line } from "react-chartjs-2";
import 'chart.js/auto';  // Import necessario per Chart.js v3 o superiore

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "First dataset",
      data: [33, 53, 85, 41, 44, 65],
      fill: true,
      backgroundColor: "#88c1ea",
      borderColor: "#88c1ea"
    },
    {
      label: "Second dataset",
      data: [33, 25, 35, 51, 54, 76],
      fill: false,
      borderColor: "#6ace3f"
    }
  ]
};

const options = {
  responsive: true,  // Rende il grafico responsivo
  maintainAspectRatio: false  // Non mantiene il rapporto d'aspetto
};

export default function TestChart() {
  return (
    <div className="chart-container" style={{ position: "relative", width: "100%", height: "400px" }}>
      <Line data={data} options={options} />
    </div>
  );
}
