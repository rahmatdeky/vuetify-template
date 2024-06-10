<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>Dashboard</v-card-title>
            <v-container>
              <v-row>
                <v-col>
                  <v-card height="200px">
                    <v-container>
                      <v-row class="mb-0 pb-0">
                        <v-col class="d-flex align-center mb-0 pb-0">
                          <h5 align-self="center" class="mb-0 pb-0">{{ activeLabel }}</h5>
                          <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y
                            min-width="290px">
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn v-bind="attrs" v-on="on" icon>
                                <v-icon>mdi-calendar-range</v-icon>
                              </v-btn>
                            </template>
                            <v-card>
                              <v-date-picker v-model="dateRange" range></v-date-picker>
                              <v-card-actions>
                                <v-btn text color="primary" @click="updateSelectedPeriod">OK</v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-menu>
                          <v-spacer></v-spacer>
                          <v-menu>
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn icon v-bind="attrs" v-on="on">
                                <v-icon>mdi-dots-vertical</v-icon>
                              </v-btn>
                            </template>
                            <v-list>
                              <v-list-item class="menu-item" v-for="item in menuKoin" :key="item.title">
                                <v-list-item-title @click="item.click">{{ item.title }}</v-list-item-title>
                              </v-list-item>
                            </v-list>
                          </v-menu>
                        </v-col>
                      </v-row>
                      <v-row class="mt-0 pt-0">
                        <v-col class="mt-0 pt-0">
                          <small>{{ selectedPeriod }}</small>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <h1>{{ formatRupiah(activeLabelTotal) }}</h1>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card>
                </v-col>
                <v-col>
                  <v-card height="200px">
                    <v-container>
                      <v-row class="mb-0 pb-0">
                        <v-col class="d-flex align-center mb-0 pb-0">
                          <h5 align-self="center" class="mb-0 pb-0">{{ activeLabelWarga }}</h5>
                          <!-- <v-btn icon>
                            <v-icon>mdi-calendar-range</v-icon>
                          </v-btn> -->
                          <v-spacer></v-spacer>
                          <v-menu>
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn icon v-bind="attrs" v-on="on">
                                <v-icon>mdi-dots-vertical</v-icon>
                              </v-btn>
                            </template>
                            <v-list>
                              <v-list-item class="menu-item" v-for="item in menuWarga" :key="item.title">
                                <v-list-item-title @click="item.click">{{ item.title }}</v-list-item-title>
                              </v-list-item>
                            </v-list>
                          </v-menu>
                        </v-col>
                      </v-row>
                      <v-row class="mt-0 pt-0">
                        <v-col class="mt-0 pt-0">
                          <small>&nbsp;</small>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <h1>{{ wargaCount }}</h1>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card>
                </v-col>
                <v-col>
                  <v-card height="200px">
                    <v-container>
                      <v-row class="mb-0 pb-0">
                        <v-col class="d-flex align-center mb-0 pb-0">
                          <h5 align-self="center" class="mb-0 pb-0">Lembaga</h5>
                          <!-- <v-btn icon>
                            <v-icon>mdi-calendar-range</v-icon>
                          </v-btn> -->
                          <v-spacer></v-spacer>
                          <v-btn icon>
                            <v-icon color="white">mdi-dots-vertical</v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>
                      <v-row class="mt-0 pt-0">
                        <v-col class="mt-0 pt-0">
                          <small>&nbsp;</small>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <h1>{{ totalLembaga }}</h1>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="8">
                  <v-row>
                    <v-col>
                      <v-card>
                        <v-card-title>Warga</v-card-title>
                        <Bar :chart-options="chartOptionsWarga" :chart-data="chartDataWarga" :chart-id="chartIdWarga"
                          :dataset-id-key="datasetIdKeyWarga" :css-classes="cssClassesWarga" :styles="stylesWarga"
                          :width="widthWarga" :height="heightWarga" />
                      </v-card>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-card>
                        <v-card-title>Lembaga</v-card-title>
                        <Bar :chart-options="chartOptionsLembaga" :chart-data="chartDataLembaga"
                          :chart-id="chartIdLembaga" :dataset-id-key="datasetIdKeyLembaga"
                          :css-classes="cssClassesLembaga" :styles="stylesLembaga" :width="widthLembaga"
                          :height="heightLembaga" />
                      </v-card>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col>
                  <v-row>
                    <v-col>
                      <v-card height="652px">
                        <v-container>
                          <v-row class="mb-0 pb-0">
                            <v-col class="d-flex align-center mb-0 pb-0">
                              <h5 align-self="center" class="mb-0 pb-0">Koin NU</h5>
                            </v-col>
                          </v-row>
                          <v-row class="mt-0 pt-0">
                            <v-col class="mt-0 pt-0">
                              <small>{{ selectedPeriod }}</small>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col>
                              <h4 class="text-center">{{ activeLabel }} </h4>
                              <h4 class="text-center">{{ formatRupiah(activeLabelTotal) }}</h4>
                            </v-col>
                          </v-row>
                        </v-container>
                        <Doughnut :chart-options="chartOptionsKoin" :chart-data="chartDataKoin" :chart-id="chartIdKoin"
                          :dataset-id-key="datasetIdKeyKoin" :css-classes="cssClassesKoin" :styles="stylesKoin"
                          :width="widthKoin" :height="heightKoin" />
                      </v-card>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { Bar, Doughnut } from 'vue-chartjs/legacy'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement)

export default {
  components: {
    Bar,
    Doughnut
  },
  props: {
    chartIdWarga: {
      type: String,
      default: 'bar-chart'
    },
    datasetIdKeyWarga: {
      type: String,
      default: 'label'
    },
    widthWarga: {
      type: Number,
      default: 250
    },
    heightWarga: {
      type: Number,
      default: 250
    },
    cssClassesWarga: {
      default: '',
      type: String
    },
    stylesWarga: {
      type: Object,
      default: () => { }
    },
    chartIdLembaga: {
      type: String,
      default: 'bar-chart'
    },
    datasetIdKeyLembaga: {
      type: String,
      default: 'label'
    },
    widthLembaga: {
      type: Number,
      default: 250
    },
    heightLembaga: {
      type: Number,
      default: 250
    },
    cssClassesLembaga: {
      default: '',
      type: String
    },
    stylesLembaga: {
      type: Object,
      default: () => { }
    },
    chartIdKoin: {
      type: String,
      default: 'doughnut-chart'
    },
    datasetIdKeyKoin: {
      type: String,
      default: 'label'
    },
    widthKoin: {
      type: Number,
      default: 400
    },
    heightKoin: {
      type: Number,
      default: 400
    },
    cssClassesKoin: {
      default: '',
      type: String
    },
    stylesKoin: {
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
      chartDataWarga: {
        labels: [],
        datasets: [{
          label: 'Bar Chart',
          borderWidth: 1,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          pointBorderColor: '#2554FF',
          data: []
        }]
      },
      chartOptionsWarga: {
        responsive: true,
        maintainAspectRatio: false
      },
      chartDataLembaga: {
        labels: [],
        datasets: [{
          label: 'Bar Chart',
          borderWidth: 1,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          pointBorderColor: '#2554FF',
          data: []
        }]
      },
      chartOptionsLembaga: {
        responsive: true,
        maintainAspectRatio: false
      },
      chartDataKoin: {
        labels: ["Pemasukan", "Pengeluaran"],
        datasets: [{
          borderWidth: 1,
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255,99,132,1)',
          ],
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 99, 132, 0.2)',
          ],
          data: []
        }]
      },
      chartOptionsKoin: {
        responsive: true,
        maintainAspectRatio: false
      },
      legend: {
        display: true
      },
      menuKoin: [
        { title: 'Jumlah Saldo', click: () => this.setView('JumlahSaldo') },
        { title: 'Pemasukan', click: () => this.setView('Pemasukan') },
        { title: 'Pengeluaran', click: () => this.setView('Pengeluaran') },
      ],
      menuWarga: [
        { title: 'Warga', click: () => this.setViewWarga('Warga') },
        { title: 'Pengurus', click: () => this.setViewWarga('Pengurus') },
      ],
      Pemasukan: false,
      Pengeluaran: false,
      JumlahSaldo: true,
      Warga: true,
      Pengurus: false,
      totalPemasukan: 0,
      totalPengeluaran: 0,
      saldo: 0,
      menu: false,
      dateRange: [new Date().getFullYear() + '-01-01', new Date().toISOString().substr(0, 10)],
      selectedPeriod: '',
      wargaCount: 0,
      totalLembaga: 0
    }
  },
  methods: {
    getDashboardWarga() {
      this.$http.get('dashboard/warga').then((response) => {
        const kecamatanData = response.data;

        const labels = kecamatanData.map(item => item.nama_kecamatan);
        const data = kecamatanData.map(item => item.warga_count);

        this.chartDataWarga.labels = labels;
        this.chartDataWarga.datasets[0].data = data;
      })
    },
    getDashboardLembaga() {
      this.$http.get('dashboard/lembaga').then((response) => {
        const kecamatanData = response.data;

        const labels = kecamatanData.map(item => item.nama_kecamatan);
        const data = kecamatanData.map(item => item.lembaga_count);

        const totalLembaga = kecamatanData.reduce((sum, kecamatan) => sum + kecamatan.lembaga_count, 0);

        this.chartDataLembaga.labels = labels;
        this.chartDataLembaga.datasets[0].data = data;

        this.totalLembaga = totalLembaga;
      })
    },
    setView(view) {
      this.Pemasukan = false;
      this.Pengeluaran = false;
      this.JumlahSaldo = false;

      if (view === 'JumlahSaldo') {
        this.JumlahSaldo = true;
      } else if (view === 'Pemasukan') {
        this.Pemasukan = true;
      } else if (view === 'Pengeluaran') {
        this.Pengeluaran = true;
      }
    },
    setViewWarga(view) {
      this.Warga = false;
      this.Pengurus = false;

      if (view === 'Warga') {
        this.Warga = true;
        this.getTotalWarga('Warga');
      } else if (view === 'Pengurus') {
        this.Pengurus = true;
        this.getTotalWarga('Pengurus');
      }
    },
    getTotal() {
      const data = {
        fromSaldo: this.dateRange[0],
        toSaldo: this.dateRange[1]
      };

      this.$http.post('koin/total', data).then((response) => {
        this.totalPemasukan = response.data.total_pemasukan;
        this.totalPengeluaran = response.data.total_pengeluaran;
        this.saldo = response.data.saldo;

        this.chartDataKoin = {
          ...this.chartDataKoin, datasets: [{
            ...this.chartDataKoin.datasets[0],
            data: [this.totalPemasukan, this.totalPengeluaran]
          }]
        }
      });
    },
    updateSelectedPeriod() {
      const [startDate, endDate] = this.dateRange;
      this.selectedPeriod = `${this.formatDate(startDate)} - ${this.formatDate(endDate)}`;
      if (this.dateRange.length === 2) {
        this.getTotal();
      }
      this.menu = false;
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('id-ID', options);
    },
    formatRupiah(value) {
        if (!value) return 'Rp. 0';
        let val = (value / 1).toFixed(0).replace('.', ',');
        return 'Rp. ' + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    getTotalWarga(type) {
      this.$http.get('dashboard/warga/total', {params: {type}}).then((response) => {
        this.wargaCount = response.data.length
      })
    }
  },
  mounted() {
    this.getDashboardWarga()
    this.getDashboardLembaga()
    this.updateSelectedPeriod()
    this.getTotalWarga('Warga')
  },
  computed: {
    activeLabel() {
      if (this.Pemasukan) {
        return 'Pemasukan';
      } else if (this.Pengeluaran) {
        return 'Pengeluaran';
      } else if (this.JumlahSaldo) {
        return 'Jumlah Saldo';
      }
      return '';
    },
    activeLabelWarga() {
      if (this.Warga) {
        return 'Warga';
      } else if (this.Pengurus) {
        return 'Pengurus';
      }
      return '';
    },
    activeLabelTotal() {
      if (this.JumlahSaldo) {
        return this.saldo;
      } else if (this.Pemasukan) {
        return this.totalPemasukan;
      } else if (this.Pengeluaran) {
        return this.totalPengeluaran;
      }
      return '';
    }
  }
}
</script>
<style>
.menu-item {
  cursor: pointer;
}

.menu-item:hover {
  background-color: rgb(228, 228, 228);
}
</style>