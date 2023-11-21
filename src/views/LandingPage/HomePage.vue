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
      <v-row>
        <v-col cols="6">
          <v-card elevation="2" class="card-top bgreen">
            <v-card-title>
              <v-icon class="mr-2">mdi-chart-line</v-icon> Grafik Jumlah Lembaga Pendidikan
            </v-card-title>
            <LineChartGenerator :chart-options="chartOptionsLembaga" :chart-data="chartDataLembaga" :chart-id="chartId"
            :dataset-id-key="datasetIdKey" :css-classes="cssClasses" :styles="styles" :width="width" :height="height" />
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card elevation="2" class="card-top bgreen">
            <v-card-title>
              <v-icon class="mr-2">mdi-chart-line</v-icon> Grafik Jumlah Anggota Pengurus 
            </v-card-title>
            <LineChartGenerator :chart-options="chartOptionsPengurus" :chart-data="chartDataPengurus" :chart-id="chartId"
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
                <tr v-for="(data, index) in dataPengurus.data" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ data.nama_pengurus }}</td>
                  <td>{{ data.alamat_pengurus }}</td>
                </tr>
              </tbody>
            </table>
            <v-btn-toggle class="float-right" rounded dense>
                <v-btn @click="browsePengurus(dataPengurus.prev_page_url)" :disabled="!dataPengurus.prev_page_url" color="primary">
                    prev
                </v-btn>
                <v-btn>
                    {{ dataPengurus.current_page + '/' + dataPengurus.last_page }}
                </v-btn>
                <v-btn @click="browsePengurus(dataPengurus.next_page_url)" :disabled="!dataPengurus.next_page_url" color="primary">
                    next
                </v-btn>
            </v-btn-toggle>
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
                <tr v-for="(data, index) in dataLembaga.data" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ data.nama_lembaga }}</td>
                  <td>{{ data.alamat }}</td>
                </tr>
              </tbody>
            </table>
            <v-btn-toggle rounded dense class="float-right">
                <v-btn @click="browseLembaga(dataLembaga.prev_page_url)" :disabled="!dataLembaga.prev_page_url" color="primary">
                    prev
                </v-btn>
                <v-btn>
                    {{ dataLembaga.current_page + '/' + dataLembaga.last_page }}
                </v-btn>
                <v-btn @click="browseLembaga(dataLembaga.next_page_url)" :disabled="!dataLembaga.next_page_url" color="primary">
                    next
                </v-btn>
            </v-btn-toggle>
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
                    <LineChartGenerator :chart-options="chartOptionsLembaga" :chart-data="chartDataLembaga" :chart-id="chartId"
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
      dataPengurus:[],
      dataLembaga:[],
      dataKecamatan: [],
        primaryXAxis: {
           valueType: 'Category'
        },
      chartDataPengurus: {
          labels: [],
          datasets: [
            {
              label: 'Line Chart',
              data: [],
              fill: false,
              borderColor: '#2554FF',
              backgroundColor: '#2554FF',
              borderWidth: 1
            }
          ]
        },
        chartOptionsPengurus: {
          legend: {
            display: true
          },
          responsive: true,
          maintainAspectRatio: false
        },
      chartDataLembaga: {
          labels: [],
          datasets: [
            {
              label: 'Line Chart',
              data: [],
              fill: false,
              borderColor: '#2554FF',
              backgroundColor: '#2554FF',
              borderWidth: 1
            }
          ]
        },
        chartOptionsLembaga: {
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
      this.browsePengurus()
      this.browseLembaga()
      this.getLembaga()
      this.getPengurus()
      this.getKecamatan()
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
      },
      browsePengurus (page) {
          if (typeof page === 'undefined') {
              page = '/pengurus/browse?page=1'
          }
          var data = {
              search : this.search
          }
          this.$http.post(page, data).then((response) => {
              this.dataPengurus = response.data
          })
      },
      browseLembaga (page) {
          if (typeof page === 'undefined') {
              page = '/lembaga/browse?page=1'
          }
          var data = {
              search: this.search
          }
          this.$http.post(page, data).then((response) => {
              this.dataLembaga = response.data
          })
      },
      getLembaga () {
        this.$http.get('get/lembaga').then((response) => {
          this.chartDataLembaga.datasets[0].data = response.data.jumlah
        })
      },
      getPengurus () {
        this.$http.get('get/pengurus').then((response) => {
          this.chartDataPengurus.datasets[0].data = response.data.jumlah
        })
      },
      getKecamatan () {
        this.$http.get('get/kecamatan').then((response) => {
          this.chartDataLembaga.labels = response.data.kecamatan
          this.chartDataPengurus.labels = response.data.kecamatan
        })
      }
    },
  provide: {
    chart: [LineSeries, Category]
  }
};
</script>