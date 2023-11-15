<template>
    <div>
      <v-container>
        <v-row>
          <v-col>
            <v-carousel height="450" hide-delimiters>
                <v-carousel-item v-for="(item, index) in usedCarouselImage" :key="index" :src="UrlGambarBerita + item.url_gambar" @click="goTo(item.id_berita)" class="carousel-item" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
                  <div class="carousel-text">
                    <small style="font-weight: bold; color: yellow;">{{ item.tanggal_berita }}</small>
                    <h2 style="font-weight: bold; color: white;">{{item.judul_berita}}</h2>
                  </div>
                </v-carousel-item>
            </v-carousel>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <hr class="my-5">
          </v-col>
        </v-row>
        <!-- <v-row>
          <v-col cols="2">
            <v-toolbar color="rgb(0, 128, 0)" class="text-white" dense>
              <v-icon class="text-white">mdi-newspaper</v-icon>
              Highlihgt Berita
            </v-toolbar>
          </v-col>
        </v-row> -->
        <v-row>
          <v-col cols="4">
              <v-card @click="goTo(seri1.id_berita)" elevation="2">
                  <v-img :src="UrlGambarBerita + seri1.url_gambar" height="200px" class="white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
                      <v-row>
                          <v-col>
                              <v-container class="align-end">
                                  <v-card-subtitle class="m-0 p-0" style="color: yellow;">{{ seri1.tanggal_berita }}</v-card-subtitle>
                                  <v-card-title class="m-0 p-0">{{ seri1.judul_berita }}</v-card-title>
                              </v-container>
                          </v-col>
                      </v-row>
                  </v-img>
              </v-card>
          </v-col>
          <v-col cols="4">
              <v-card @click="goTo(seri2.id_berita)" elevation="2">
                  <v-img :src="UrlGambarBerita + seri2.url_gambar" height="200px" class="white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
                      <v-row>
                          <v-col>
                              <v-container class="align-end">
                                  <v-card-subtitle class="m-0 p-0" style="color: yellow;">{{ seri2.tanggal_berita }}</v-card-subtitle>
                                  <v-card-title class="m-0 p-0">{{seri2.judul_berita}}</v-card-title>
                              </v-container>
                          </v-col>
                      </v-row>
                  </v-img>
              </v-card>
          </v-col>
          <v-col cols="4">
              <v-card @click="goTo(seri3.id_berita)" elevation="2">
                  <v-img :src="UrlGambarBerita + seri3.url_gambar" height="200px" class="white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
                      <v-row>
                          <v-col>
                              <v-container class="align-end">
                                  <v-card-subtitle class="m-0 p-0" style="color: yellow;">{{ seri3.tanggal_berita }}</v-card-subtitle>
                                  <v-card-title class="m-0 p-0">{{seri3.judul_berita}}</v-card-title>
                              </v-container>
                          </v-col>
                      </v-row>
                  </v-img>
              </v-card>
          </v-col>
      </v-row>
      <v-row>
        <v-col>
          <hr class="my-5">
        </v-col>
      </v-row>
      <!-- <v-row>
        <v-col cols="2">
          <v-toolbar color="rgb(0, 128, 0)" dense dark>
            <v-icon class="mr-2">mdi-chart-line</v-icon>
            Grafik A
          </v-toolbar>
        </v-col>
        <v-col cols="4"></v-col>
        <v-col cols="2">
          <v-toolbar color="rgb(0, 128, 0)" dense dark>
            <v-icon class="mr-2">mdi-chart-line</v-icon>
            Grafik B
          </v-toolbar>
        </v-col>
        <v-col cols="4"></v-col>
      </v-row> -->
      <v-row>
        <v-col cols="6">
          <v-card elevation="2" class="card-top bgreen">
            <!-- <v-toolbar color="rgb(0, 128, 0)" dense dark>
              <v-icon class="mr-2">mdi-chart-ling</v-icon> Grafik A
            </v-toolbar> -->
            <v-card-title>
              <v-icon class="mr-2">mdi-chart-line</v-icon> Grafik Jumlah Anggota Pengurus
            </v-card-title>
            <LineChartGenerator :chart-options="chartOptions3" :chart-data="chartData3" :chart-id="chartId"
            :dataset-id-key="datasetIdKey" :css-classes="cssClasses" :styles="styles" :width="width" :height="height" />
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card elevation="2" class="card-top bgreen">
            <v-card-title>
              <v-icon class="mr-2">mdi-chart-line</v-icon> Grafik Jumlah Lembaga Pendidikan
            </v-card-title>
            <LineChartGenerator :chart-options="chartOptions3" :chart-data="chartData3" :chart-id="chartId"
            :dataset-id-key="datasetIdKey" :css-classes="cssClasses" :styles="styles" :width="width" :height="height" />
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <hr class="my-5">
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-card elevation="2" class="card-top bgreen">
            <v-card-title>Data Pengurus Organisasi</v-card-title>
            <table class="table">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Nama</th>
                  <th>Alamat</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>abi</td>
                  <td>batam</td>
                </tr>
              </tbody>
            </table>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card elevation="2" class="card-top bgreen">
            <v-card-title>Data Lembaga Pendidikan Terafiliasi</v-card-title>
            <table class="table">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Nama</th>
                  <th>Alamat</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>abi</td>
                  <td>batam</td>
                </tr>
              </tbody>
            </table>
          </v-card>
        </v-col>
      </v-row>
      </v-container>
        <!-- <div class="container mt-4">
            <div class="row">
                <div class="col-12">
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
        </div> -->
    </div>
</template>

<style scoped>
  .carousel-item:hover {
    cursor: pointer;
    background-color: #e0e0e0;
  }

  .carousel-text {
    position: absolute;
    bottom: 50px;
    left: 50px;
  }

.card-top {
  border-top: 3px solid;
}

.card-left {
  border-left: 3px solid
}

.bgreen {
  border-color: green;
}

.bred {
  border-color: red;
}

.bblue {
  border-color: blue;
}

.bpurple {
  border-color: purple
}
</style>

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
      UrlGambarBerita: window.UrlGambarBerita,
      usedCarouselImage: [],
      seri: '',
      dataBerita: [],
      seri1:[],
      seri2:[],
      seri3:[],
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
  created () {
      this.getCarouselImg()
      this.getHighlight()
    },
    methods: {
      getCarouselImg () {
          this.$http.get('/page/landing/carousel/image/used').then((response) => {
              this.usedCarouselImage = response.data
          })
      },
      goTo (id) {
        this.$router.push(`/berita/detail/${id}`)
      },
      getHighlight () {
        // this.$http.get('/page/landing/highlihgt/get').then((response) => {
        //     console.log(response.data)
        // })
        this.$http.get('/page/landing/highlihgt/get').then((response) => {
            this.seri1 = response.data.seri1
            this.seri2 = response.data.seri2
            this.seri3 = response.data.seri3
        })
      }
    },
  provide: {
    chart: [LineSeries, Category]
  }
};
</script>