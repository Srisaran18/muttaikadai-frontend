import React, { useEffect, useState } from "react";
import API_URL from "../../Config";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SalesGraph = () => {
  const [period, setPeriod] = useState("month");
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSalesData = async selectedPeriod => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_URL}/admin/sales-graph?period=${selectedPeriod}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch sales data");
      }
      const data = await response.json();
      setSalesData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(
    () => {
      fetchSalesData(period);
      // eslint-disable-next-line
    },
    [period]
  );

  const chartData = {
    labels: salesData.map(item => item.period),
    datasets: [
      {
        label: "Total Sales (₹)",
        data: salesData.map(item => item.totalSales),
        fill: false,
        borderColor: "#007bff",
        backgroundColor: "#007bff",
        tension: 0.2
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top"
      },
      title: {
        display: true,
        text: `Sales Graph (${period.charAt(0).toUpperCase() +
          period.slice(1)})`
      }
    }
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Sales Graph</h4>
        <select
          className="form-select w-auto"
          value={period}
          onChange={e => setPeriod(e.target.value)}
        >
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
        </select>
      </div>
      {loading
        ? <div>Loading sales data...</div>
        : error
          ? <div className="text-danger">
              Error: {error}
            </div>
          : <Line data={chartData} options={options} />}
    </div>
  );
};

export default SalesGraph;
