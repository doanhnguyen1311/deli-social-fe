import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useMemo } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

interface GaugeChartProps {
  batchComplete: number;
  totalRecord: number;
}

const GaugeChart = ({ batchComplete, totalRecord }: GaugeChartProps) => {
  const value = batchComplete || 1;
  const maxValue = totalRecord || 1;

  const data = useMemo(
    () => ({
      labels: ["Current", "Remaining"],
      datasets: [
        {
          data: [value, maxValue - value],
          backgroundColor: ["#2EA5F5", "#A8D9F9"],
          cutout: "50%",
          borderWidth: 0,
          rotation: -90,
        },
      ],
    }),
    [value, maxValue]
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
      },
    }),
    []
  );

  return (
    <div className="w-130px h-130px w-2xxl-160px h-2xxl-160px position-relative">
      <Doughnut data={data} options={options}  className="w-130px h-130px w-2xxl-160px h-2xxl-160px"/>
    </div>
  );
};

export default GaugeChart;
