"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function SalesChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    const ctx = chartRef.current?.getContext("2d");
    if (!ctx) return;

    // نابودی نمودار قبلی در صورت وجود
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // ایجاد نمودار جدید
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد"],
        datasets: [
          {
            label: "فروش",
            data: [500, 700, 800, 600, 900],
            borderColor: "#2563eb", // آبی حرفه‌ای Tailwind
            backgroundColor: "rgba(37, 99, 235, 0.1)", // آبی شفاف
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
              color: "#1f2937", // خاکستری تیره
              font: {
                family: "inherit",
                size: 14,
              },
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: "#4b5563",
              font: {
                family: "inherit",
                size: 12,
              },
            },
          },
          y: {
            ticks: {
              color: "#4b5563",
              font: {
                family: "inherit",
                size: 12,
              },
            },
          },
        },
      },
    });

    return () => {
      chartInstance.current?.destroy(); // پاک‌سازی موقع unmount
    };
  }, []);

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md h-[300px] sm:h-[400px] md:h-[400px]">
      <canvas ref={chartRef} className="w-full h-full" />
    </div>
  );
}
