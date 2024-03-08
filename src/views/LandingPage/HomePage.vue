<template>
  <div>
    <v-carousel height="800" hide-delimiters>
      <v-carousel-item v-for="(item, index) in usedCarouselImage" :key="index" :src="UrlGambarBerita + item.url_gambar"
        @click="goTo(item.id_berita)" class="carousel-item" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
        <div class="carousel-text">
          <small style="font-weight: bold; color: yellow;">{{ item.tanggal_berita }}</small>
          <h2 style="font-weight: bold; color: white;">{{ item.judul_berita }}</h2>
        </div>
      </v-carousel-item>
    </v-carousel>
    <v-row>
      <v-col>
        <h2 class="display-6 mb-5 text-center mt-5 delimiter">Berita Terkini </h2>
      </v-col>
    </v-row>
    <v-container>
      <v-row>
        <v-col cols="4">
          <v-row>
            <v-col cols="12">
              <v-card @click="goTo(seri1.id_berita)" elevation="2">
                <v-img :src="UrlGambarBerita + seri1.url_gambar" height="505px" class="white--text align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
                  <v-row>
                    <v-col>
                      <v-container class="align-end">
                        <v-card-subtitle class="m-0 p-0" style="color: yellow;">{{ seri1.tanggal_berita
                          }}</v-card-subtitle>
                        <v-card-title class="m-0 p-0" style="word-wrap: break-word;">{{ seri1.judul_berita }}</v-card-title>
                      </v-container>
                    </v-col>
                  </v-row>
                </v-img>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="4">
          <v-row>
            <v-col cols="12">
              <v-card @click="goTo(seri2.id_berita)" elevation="2">
                <v-img :src="UrlGambarBerita + seri2.url_gambar" height="505px" class="white--text align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
                  <v-row>
                    <v-col>
                      <v-container class="align-end">
                        <v-card-subtitle class="m-0 p-0" style="color: yellow;">{{ seri2.tanggal_berita
                          }}</v-card-subtitle>
                        <v-card-title class="m-0 p-0">{{ seri2.judul_berita }}</v-card-title>
                      </v-container>
                    </v-col>
                  </v-row>
                </v-img>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="4">
          <v-row>
            <v-col cols="12">
              <v-card @click="goTo(seri3.id_berita)" elevation="2">
                <v-img :src="UrlGambarBerita + seri3.url_gambar" height="240px" class="white--text align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
                  <v-row>
                    <v-col>
                      <v-container class="align-end">
                        <v-card-subtitle class="m-0 p-0" style="color: yellow;">{{ seri3.tanggal_berita
                          }}</v-card-subtitle>
                        <v-card-title class="m-0 p-0">{{ seri3.judul_berita }}</v-card-title>
                      </v-container>
                    </v-col>
                  </v-row>
                </v-img>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-card @click="goTo(seri3.id_berita)" elevation="2">
                <v-img :src="UrlGambarBerita + seri3.url_gambar" height="240px" class="white--text align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
                  <v-row>
                    <v-col>
                      <v-container class="align-end">
                        <v-card-subtitle class="m-0 p-0" style="color: yellow;">{{ seri3.tanggal_berita
                          }}</v-card-subtitle>
                        <v-card-title class="m-0 p-0">{{ seri3.judul_berita }}</v-card-title>
                      </v-container>
                    </v-col>
                  </v-row>
                </v-img>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex justify-center mt-5">
          <v-btn outlined color="success">Lihat Berita Lainnya <v-icon>mdi-arrow-right</v-icon> </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-row>
      <v-col>
        <h2 class="display-6 mb-5 text-center mt-5 delimiter">Kontak Kami</h2>
      </v-col>
    </v-row>
    <v-container>
      <v-row>
        <v-col>
          <v-card>
            <v-row>
              <v-col>
                <v-container>
                  <h4>Alamat Redaksi</h4>
                  <h5>Komplek NU Center, Jalan Abuyaltama 01 Belian</h5>
                  <h5>Kec. Batam Kota, Kota Batam, Kepulauan Riau</h5>
                  <h5>Telepon</h5>
                  <h5>081372400043</h5>
                  <br>
                  <h4>Email</h4>
                  <h5>Redaksi@nu.or.id</h5>
                  <br>
                  <h4 class="text-center">Media Sosial</h4>
                  <div class="text-center">
                    <v-btn class="" dark text icon color="#1D9BF0">
                      <v-icon large>mdi-twitter</v-icon>
                    </v-btn>
                    <v-btn class="" text dark icon color="#1867c0">
                      <v-icon large>mdi-facebook</v-icon>
                    </v-btn>
                    <v-btn class="" text dark icon color="#0AC507">
                      <v-icon large>mdi-whatsapp</v-icon>
                    </v-btn>
                    <v-btn class="" text dark icon color="#bc2a8d">
                      <v-icon large>mdi-instagram</v-icon>
                    </v-btn>
                  </div>
                </v-container>
              </v-col>
              <v-col>
                <v-container>
                  <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.068105451998!2d104.0799982758933!3d1.1111193622947746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d989744afde9d5%3A0x233d79c042d15a9f!2sMasjid%20An-Nahdlah%20NU%20Center%20Kepri!5e0!3m2!1sid!2sid!4v1709365426433!5m2!1sid!2sid"
                        width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"></iframe>
                </v-container>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>



    <v-row>
      <v-col>
        <h2 class="display-6 mb-5 text-center mt-5 delimiter">Daftar / Login</h2>
      </v-col>
    </v-row>

          <v-container>
            <v-row justify="center">
              <v-col cols="6">
                <!-- Tombol Daftar -->
                <v-btn outlined block x-large color="success">DAFTAR &nbsp; <v-icon>mdi-account-plus</v-icon> </v-btn>
              </v-col>
              <v-col cols="6">
                <!-- Tombol Login -->
                <v-btn link to="/login" block outlined x-large color="secondary">LOGIN &nbsp; <v-icon>mdi-login</v-icon> </v-btn>
              </v-col>
            </v-row>
          </v-container>

    <!-- <v-row>
      <footer class="container-fluid" style="padding:10px">
        <div class="text-center">
            <p class="text-white"> <img src="" class="navbar-brand" alt=""> Copyright &copy; PCNU Kota Batam</p>
        </div>
    </footer>
    </v-row> -->


    <!-- <v-container>
      <v-row>
        <v-col cols="4">
          <v-card @click="goTo(seri1.id_berita)" elevation="2">
            <v-img :src="UrlGambarBerita + seri1.url_gambar" height="200px" class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
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
            <v-img :src="UrlGambarBerita + seri2.url_gambar" height="200px" class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
              <v-row>
                <v-col>
                  <v-container class="align-end">
                    <v-card-subtitle class="m-0 p-0" style="color: yellow;">{{ seri2.tanggal_berita }}</v-card-subtitle>
                    <v-card-title class="m-0 p-0">{{ seri2.judul_berita }}</v-card-title>
                  </v-container>
                </v-col>
              </v-row>
            </v-img>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card @click="goTo(seri3.id_berita)" elevation="2">
            <v-img :src="UrlGambarBerita + seri3.url_gambar" height="200px" class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
              <v-row>
                <v-col>
                  <v-container class="align-end">
                    <v-card-subtitle class="m-0 p-0" style="color: yellow;">{{ seri3.tanggal_berita }}</v-card-subtitle>
                    <v-card-title class="m-0 p-0">{{ seri3.judul_berita }}</v-card-title>
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
              :dataset-id-key="datasetIdKey" :css-classes="cssClasses" :styles="styles" :width="width"
              :height="height" />
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card elevation="2" class="card-top bgreen">
            <v-card-title>
              <v-icon class="mr-2">mdi-chart-line</v-icon> Grafik Jumlah Anggota Pengurus
            </v-card-title>
            <LineChartGenerator :chart-options="chartOptionsPengurus" :chart-data="chartDataPengurus"
              :chart-id="chartId" :dataset-id-key="datasetIdKey" :css-classes="cssClasses" :styles="styles"
              :width="width" :height="height" />
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
              <v-btn @click="browsePengurus(dataPengurus.prev_page_url)" :disabled="!dataPengurus.prev_page_url"
                color="primary">
                prev
              </v-btn>
              <v-btn>
                {{ dataPengurus.current_page + '/' + dataPengurus.last_page }}
              </v-btn>
              <v-btn @click="browsePengurus(dataPengurus.next_page_url)" :disabled="!dataPengurus.next_page_url"
                color="primary">
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
              <v-btn @click="browseLembaga(dataLembaga.prev_page_url)" :disabled="!dataLembaga.prev_page_url"
                color="primary">
                prev
              </v-btn>
              <v-btn>
                {{ dataLembaga.current_page + '/' + dataLembaga.last_page }}
              </v-btn>
              <v-btn @click="browseLembaga(dataLembaga.next_page_url)" :disabled="!dataLembaga.next_page_url"
                color="primary">
                next
              </v-btn>
            </v-btn-toggle>
          </v-card>
        </v-col>
      </v-row>
    </v-container> -->
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
// import { Line as LineChartGenerator } from 'vue-chartjs/legacy'
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
  // components: {
  //   LineChartGenerator
  // },
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
      seri1: [],
      seri2: [],
      seri3: [],
      dataPengurus: [],
      dataLembaga: [],
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
  created() {
    this.getCarouselImg()
    this.getHighlight()
    this.browsePengurus()
    this.browseLembaga()
    this.getLembaga()
    this.getPengurus()
    this.getKecamatan()
  },
  methods: {
    getCarouselImg() {
      this.$http.get('/page/landing/carousel/image/used').then((response) => {
        this.usedCarouselImage = response.data
      })
    },
    goTo(id) {
      this.$router.push(`/berita/detail/${id}`)
    },
    getHighlight() {
      // this.$http.get('/page/landing/highlihgt/get').then((response) => {
      //     console.log(response.data)
      // })
      this.$http.get('/page/landing/highlihgt/get').then((response) => {
        this.seri1 = response.data.seri1
        this.seri2 = response.data.seri2
        this.seri3 = response.data.seri3
      })
    },
    browsePengurus(page) {
      if (typeof page === 'undefined') {
        page = '/pengurus/browse?page=1'
      }
      var data = {
        search: this.search
      }
      this.$http.post(page, data).then((response) => {
        this.dataPengurus = response.data
      })
    },
    browseLembaga(page) {
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
    getLembaga() {
      this.$http.get('get/lembaga').then((response) => {
        this.chartDataLembaga.datasets[0].data = response.data.jumlah
      })
    },
    getPengurus() {
      this.$http.get('get/pengurus').then((response) => {
        this.chartDataPengurus.datasets[0].data = response.data.jumlah
      })
    },
    getKecamatan() {
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

<style>
.delimiter:before,
.delimiter:after {
  background-color: black;
  content: "";
  display: inline-block;
  height: 3px;
  margin-left: 10px;
  margin-right: 10px;
  vertical-align: middle;
  width: 25%;
}
</style>