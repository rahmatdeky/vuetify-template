<template>
    <div>
        <div class="container mt-4">
            <div class="row">
                <div class="col-12">
                    <div id="carouselExampleDark" class="carousel slide">
                        <div class="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        </div>
                        <div class="carousel-inner">
                            <div class="carousel-item active" data-bs-interval="10000">
                            <img height="400px" src="@/assets/Seragam.png" class="d-block w-100" alt="...">
                            <div class="carousel-caption d-none d-md-block">
                            </div>
                            </div>
                            <div class="carousel-item" data-bs-interval="2000">
                            <img height="400px" src="@/assets/Seragam-2.jpg" class="d-block w-100" alt="...">
                            <div class="carousel-caption d-none d-md-block">
                            </div>
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-12">
                    <h4 style="background-color: green; color: white;">Arsip Berita</h4>
                    <div class="row">
                        <div class="col-4">
                            <div>
                                <b>
                                    <a href="">link berita 1</a>
                                </b>
                                <br>
                                <span style="font-size: 11px;">tanggal</span>
                                <p>
                                    <img class="float-start mt-2 me-1" style="width: 75px; height: 50px;" src="@/assets/Seragam.png" alt="">
                                </p>
                                <p> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto perferendis alias tempore possimus quaerat quasi? Omnis voluptatum delectus, aut quidem minus cumque facilis iste rem necessitatibus amet. Sit, blanditiis fuga!</p>
                            </div>
                        </div>
                        <div class="col-4">
                            <div>
                                <b>
                                    <a href="">link berita 2</a>
                                </b>
                                <br>
                                <span style="font-size: 11px;">tanggal</span>
                                <p>
                                    <img class="float-start mt-2 me-1" style="width: 75px; height: 50px;" src="@/assets/Seragam-2.jpg" alt="">
                                </p>
                                <p> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto perferendis alias tempore possimus quaerat quasi? Omnis voluptatum delectus, aut quidem minus cumque facilis iste rem necessitatibus amet. Sit, blanditiis fuga!</p>
                            </div>
                        </div>
                        <div class="col-4">
                            <div>
                                <b>
                                    <a href="">link berita 3</a>
                                </b>
                                <br>
                                <span style="font-size: 11px;">tanggal</span>
                                <p>
                                    <img class="float-start mt-2 me-1" style="width: 75px; height: 50px;" src="@/assets/Seragam-2.jpg" alt="">
                                </p>
                                <p> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto perferendis alias tempore possimus quaerat quasi? Omnis voluptatum delectus, aut quidem minus cumque facilis iste rem necessitatibus amet. Sit, blanditiis fuga!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-12">
                    <h4 style="background-color: green; color: white;">Grafik</h4>
                    <!-- <img src="../assets/Diagram-batang.png" alt=""> -->
                    <ejs-chart id="container" :primaryXAxis='primaryXAxis'>
                        <e-series-collection>
                            <e-series :dataSource='seriesData' type='Line' xName='month' yName='sales' name='Sales'> </e-series>
                            <e-series :dataSource='seriesData2' type='Line' xName='month' yName='sales' name='Sales'> </e-series>
                        </e-series-collection>
                    </ejs-chart>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-6">
                    <LineChartGenerator :chart-options="chartOptions3" :chart-data="chartData3" :chart-id="chartId"
                    :dataset-id-key="datasetIdKey" :css-classes="cssClasses" :styles="styles" :width="width" :height="height" />
                  </div>
                  <div class="col-6">
                    <LineChartGenerator :chart-options="chartOptions2" :chart-data="chartData2" :chart-id="chartId"
                    :dataset-id-key="datasetIdKey" :css-classes="cssClasses" :styles="styles" :width="width" :height="height" />
              </div>
            </div>
            <div class="row mt-3">
                <div class="col-12">
                    <h4 style="background-color: green; color: white;">data table</h4>
                    <div class="row">
                        <div class="col-6">
                            <p>Data Pengurus Organisasi</p>
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>no</th>
                                        <th>nama</th>
                                        <th>alamat</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>aris</td>
                                        <td>batam</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>aris</td>
                                        <td>batam</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="col-6">
                            <p>Data Lembaga Pendidikan</p>
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>no</th>
                                        <th>nama</th>
                                        <th>alamat</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>tpq</td>
                                        <td>batam</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>masjid</td>
                                        <td>batam</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from "vue";
import { ChartPlugin, LineSeries, Category } from "@syncfusion/ej2-vue-charts";
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

Vue.use(ChartPlugin);
export default {
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
  name: 'App',
  data() {
    return {
      seriesData: [
            { month: 'Jan', sales: 35 }, { month: 'Feb', sales: 28 },
            { month: 'Mar', sales: 34 }, { month: 'Apr', sales: 32 },
            { month: 'May', sales: 40 }, { month: 'Jun', sales: 32 },
            { month: 'Jul', sales: 35 }, { month: 'Aug', sales: 55 },
            { month: 'Sep', sales: 38 }, { month: 'Oct', sales: 30 },
            { month: 'Nov', sales: 25 }, { month: 'Dec', sales: 32 }
              ],
      seriesData2: [
            { month: 'Jan', sales: 30 }, { month: 'Feb', sales: 20 },
            { month: 'Mar', sales: 30 }, { month: 'Apr', sales: 30 },
            { month: 'May', sales: 40 }, { month: 'Jun', sales: 30 },
            { month: 'Jul', sales: 30 }, { month: 'Aug', sales: 50 },
            { month: 'Sep', sales: 30 }, { month: 'Oct', sales: 30 },
            { month: 'Nov', sales: 20 }, { month: 'Dec', sales: 30 }
              ],
        primaryXAxis: {
           valueType: 'Category'
        },
        chartData: {
        labels: ['Label 1', 'Label 2', 'Label 3'],
        datasets: [
          {
            label: 'Data 1',
            backgroundColor: '#f87979',
            data: [30, 40, 20],
          },
          {
            label: 'Data 2',
            backgroundColor: '#7fb2f0',
            data: [50, 10, 35],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
      chartData2: {
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
        chartOptions2: {
          legend: {
            display: true
          },
          responsive: true,
          maintainAspectRatio: false
        },
      chartData3: {
          labels: ["Babol", "Cabanatuan", "Daegu", "Jerusalem", "Fairfield", "New York", "Gangtok", "Buenos Aires", "Hafar Al-Batin", "Idlib"],
          datasets: [
            {
              label: 'Line Chart',
              data: [610, 1250, 312, 6150, 2122, 3141, 1159, 117, 1145, 9141],
              fill: false,
              borderColor: '#2554FF',
              backgroundColor: '#2554FF',
              borderWidth: 1
            }
          ]
        },
        chartOptions3: {
          legend: {
            display: true
          },
          responsive: true,
          maintainAspectRatio: false
        }
    };
  },
  provide: {
    chart: [LineSeries, Category]
  }
};
</script>