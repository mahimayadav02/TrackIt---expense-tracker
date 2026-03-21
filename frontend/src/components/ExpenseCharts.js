import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function ExpenseCharts({ expenses }) {

  const categoryMap = {};

  expenses.forEach((e) => {
    categoryMap[e.category] =
      (categoryMap[e.category] || 0) + e.amount;
  });

  const data = {
    labels: Object.keys(categoryMap),
    datasets: [
      {
        data: Object.values(categoryMap),
        backgroundColor: [
          "#A5B4FC",
          "#FBCFE8",
          "#99F6E4",
          "#FDE68A",
        ],
        borderWidth: 1,
        cutout: "65%", // 🔥 THIS MAKES IT DONUT
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "top",
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="w-full h-64 flex items-center justify-center">
      <div className="w-64 h-64">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}

export default ExpenseCharts;