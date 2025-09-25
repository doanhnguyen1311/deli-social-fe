/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef } from "react";
import ApexCharts, { ApexOptions } from "apexcharts";
import { getCSSVariableValue } from "@/_metronic/assets/ts/_utils";

type ChartData = {
  month: string;
  [key: string]: any;
};

type ChartConfig = {
  seriesName: string;
  dataKey: string;
  tooltipFields: Array<{
    label: string;
    key: string;
    color?: string;
    formatter?: (value: any) => string;
  }>;
};

type Props = {
  className?: string;
  chartColor: string;
  chartHeight: string;
  data: ChartData[];
  config?: ChartConfig;
};

const GenericChart: React.FC<Props> = ({
  className = "d-flex flex-column",
  chartColor,
  chartHeight,
  data,
  config,
}) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartInstance = useRef<ApexCharts | null>(null);

  const getChartOptions = (): ApexOptions => {
    const labelColor = getCSSVariableValue("--bs-gray-800");
    const strokeColor = getCSSVariableValue("--bs-gray-300");
    const baseColor = getCSSVariableValue("--bs-" + chartColor);
    const defaultCategories = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    const categories = data.length > 0 
      ? data.map(item => item.month) 
      : defaultCategories;

    return {
      series: [{
        name: config?.seriesName,
        data: data.length > 0 
          ? data.map(item => item[config?.dataKey as string])
          : Array(defaultCategories.length).fill(0),
      }],
      chart: {
        fontFamily: "inherit",
        type: "area",
        height: chartHeight,
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      xaxis: {
        categories,
        axisBorder: { show: false, color: strokeColor },
        axisTicks: { show: false, color: strokeColor },
        labels: {
          style: { colors: labelColor, fontSize: "12px" },
          rotate: -45,
        },
      },
      yaxis: { show: false },
      grid: { show: false },
      dataLabels: { enabled: false },
      tooltip: {
        enabled: true,
        custom: ({ series, seriesIndex, dataPointIndex }) => {
          const item = data[dataPointIndex];
          return `
            <div style="
              padding: 12px;
              background: white;
              border-radius: 20px;
              box-shadow: 0px 4px 12px 2px #00000014;
              backdrop-filter: blur(20px);"
              class="d-flex flex-column gap-8px"
            >
              <div style="margin-bottom: 8px;">
                <div style="
                  color: #434343;
                  font-size: 14px;
                  padding-bottom: 8px;
                  border-bottom: 1px solid #F1F1F4;"
                >
                  ${item?.month}
                </div>
              </div>
              <div class="d-flex flex-column gap-8px" style="width: 200px;">
                ${config?.tooltipFields.map(field => `
                  <div class="d-flex justify-content-between align-items-center">
                    <span style="font-size: 12px; color: #939393;">${field.label}</span>
                    <span style="
                      font-size: 14px;
                      font-weight: 500;
                      color: ${field.color || '#434343'};">
                      ${field.formatter 
                        ? field.formatter(item[field.key]) 
                        : item[field.key]}
                    </span>
                  </div>
                `).join('')}
              </div>
            </div>`;
        },
      },
      colors: [baseColor],
      stroke: {
        curve: "smooth",
        width: 3,
        colors: [baseColor],
      },
      markers: { size: 0 },
    };
  };

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const chart = new ApexCharts(chartRef.current, getChartOptions());
    chart.render();
    chartInstance.current = chart;

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartRef, data, chartColor, chartHeight, config]);

  return (
    <div className={className}>
      <div
        ref={chartRef}
        className="mixed-widget-5-chart card-rounded-top"
      />
    </div>
  );
};

// Usage examples:
export const StudentChart: React.FC<Props> = (props) => (
  <GenericChart
    {...props}
    config={{
      seriesName: "Completion Rate",
      dataKey: "total",
      tooltipFields: [
        { label: "Poor", key: "poor" },
        { label: "Fair", key: "fair" },
        { label: "Average", key: "average" },
        { label: "Good", key: "good" },
        { label: "Excellent", key: "excellent", color: "#748EFE" },
      ],
    }}
  />
);

export const FieldLine: React.FC<Props & { isSessionStatitics?: boolean }> = ({
  isSessionStatitics = true,
  ...props
}) => (
  <GenericChart
    {...props}
    config={{
      seriesName: "Completion Rate",
      dataKey: isSessionStatitics ? "sessions" : "total_client",
      tooltipFields: [{
        label: isSessionStatitics ? "Sessions" : "Clients",
        key: isSessionStatitics ? "sessions" : "total_client",
      }],
    }}
  />
);

export const ChartLine: React.FC<Props> = (props) => (
  <GenericChart
    {...props}
    config={{
      seriesName: "Companies",
      dataKey: "companies",
      tooltipFields: [
        { label: "Companies", key: "companies" },
      ],
    }}
  />
);