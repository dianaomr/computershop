"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function SalesChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      new Chart(chartRef.current, {
        type: "line",
        data: {
          labels: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد"],
          datasets: [
            {
              label: "فروش",
              data: [500, 700, 800, 600, 900],
              borderColor: "#000",
              backgroundColor: "rgba(0,0,0,0.1) opacity-10",
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                color: "#000",
              },
            },
          },
          scales: {
            x: {
              ticks: {
                color: "#000",
              },
            },
            y: {
              ticks: {
                color: "#000",
              },
            },
          },
        },
      });
    }
  }, []);

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md h-[300px] sm:h-[400px] md:h-[400px]">
      <canvas ref={chartRef} className="w-[100px] " />
    </div>
  );
}
