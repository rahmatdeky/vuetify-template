<template>
    <LineChartGenerator :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId"
      :dataset-id-key="datasetIdKey" :css-classes="cssClasses" :styles="styles" :width="width" :height="height" />
  </template>
  <script>
  import { Line as LineChartGenerator } from 'vue-chartjs/legacy'
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    CategoryScale,
    PointElement
  } from 'chart.js'
  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    CategoryScale,
    PointElement
  )
  export default {
    name: 'LineChart',
    components: {
      LineChartGenerator
    },
    props: {
      chartId: {
        type: String,
        default: 'line-chart'
      },
      datasetIdKey: {
        type: String,
        default: 'label'
      },
      width: {
        type: Number,
        default: 400
      },
      height: {
        type: Number,
        default: 400
      },
      cssClasses: {
        default: '',
        type: String
      },
      styles: {
        type: Object,
        default: () => { }
      },
      plugins: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        chartData: {
          labels: ["Babol", "Cabanatuan", "Daegu", "Jerusalem", "Fairfield", "New York", "Gangtok", "Buenos Aires", "Hafar Al-Batin", "Idlib"],
          datasets: [
            {
              label: 'Line Chart',
              data: [600, 1150, 342, 6050, 2522, 3241, 1259, 157, 1545, 9841],
              fill: false,
              borderColor: '#2554FF',
              backgroundColor: '#2554FF',
              borderWidth: 1
            }
          ]
        },
        chartOptions: {
          legend: {
            display: true
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    }
  }
  </script>