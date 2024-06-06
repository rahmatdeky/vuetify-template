<template>
    <div>
        <v-container>
            <v-row>
                <v-col>
                    <v-card>
                        <v-toolbar color="primary" dark>
                            <h5>Koin NU</h5> <v-spacer></v-spacer> <v-btn @click="openModalAddTransaksi" color=""
                                dark><v-icon>mdi-plus</v-icon> Tambah
                                Transaksi</v-btn>
                        </v-toolbar>
                        <v-container class="px-5">
                            <v-row>
                                <v-col>
                                    <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition"
                                        offset-y min-width="290px">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn v-bind="attrs" v-on="on" icon>
                                                <v-icon>mdi-calendar-range</v-icon>
                                            </v-btn>
                                        </template>
                                        <v-card>
                                            <v-date-picker v-model="dateRange" range
                                                ></v-date-picker>
                                            <v-card-actions>
                                                <v-btn text color="primary" @click="updateSelectedPeriod">OK</v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-menu>
                                    <small class="mt-0">{{ selectedPeriod }}</small>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-card>
                                        <v-container>
                                            <v-row>
                                                <v-col align-self="center">
                                                    <h5 class="mb-0">Jumlah Saldo</h5>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col colspan="2">
                                                    <h1>{{ formatRupiah(saldo) }} </h1>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-card>
                                </v-col>
                                <v-col>
                                    <v-card>
                                        <v-container>
                                            <v-row>
                                                <v-col align-self="center">
                                                    <h5 class="mb-0">Pemasukan</h5>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col colspan="2">
                                                    <h1>{{ formatRupiah(totalPemasukan) }}</h1>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-card>
                                </v-col>
                                <v-col>
                                    <v-card>
                                        <v-container>
                                            <v-row>
                                                <v-col align-self="center">
                                                    <h5 class="mb-0">Pengeluaran</h5>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col colspan="2">
                                                    <h1>{{ formatRupiah(totalPengeluaran) }}</h1>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-card>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-card>
                                        <v-container>
                                            <v-row>
                                                <v-col>
                                                    <h5>Riwayat Transaksi</h5>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="3">
                                                    <v-text-field v-model="search" dense
                                                        label="Pencarian"></v-text-field>
                                                </v-col>
                                                <v-col align-self="center" cols="1">
                                                    <v-btn @click="getKoin()" type="submit" icon>
                                                        <v-icon>mdi-magnify</v-icon>
                                                    </v-btn>
                                                </v-col>
                                                <v-col cols="4"></v-col>
                                                <v-col cols="2">
                                                    <v-text-field v-model="from" label="from" type="date"
                                                        dense></v-text-field>
                                                </v-col>
                                                <v-col cols="2">
                                                    <v-text-field v-model="to" label="to" type="date"
                                                        dense></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="12">
                                                    <v-btn small dense :color="inActive ? 'primary' : 'secondary'"
                                                        :outlined="!inActive" rounded class="mr-2"
                                                        @click="toggleJenis('Pemasukan')">Pemasukan</v-btn>
                                                    <v-btn small dense :color="outActive ? 'primary' : 'secondary'"
                                                        :outlined="!outActive" rounded
                                                        @click="toggleJenis('Pengeluaran')">Pengeluaran</v-btn>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col>
                                                    <v-simple-table>
                                                        <thead>
                                                            <tr>
                                                                <th width="1%">No</th>
                                                                <th>Jenis</th>
                                                                <th>Tanggal</th>
                                                                <th>Nominal</th>
                                                                <th>Nama Penyetor</th>
                                                                <th>Keterangan</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr v-for="(data, index) in koinHistory.data" :key="index">
                                                                <td>{{ index + 1 }}</td>
                                                                <td>{{ data.jenis }}</td>
                                                                <td>{{ formatDate(data.tanggal) }}</td>
                                                                <td>{{ formatRupiah(data.nominal) }}</td>
                                                                <td>{{ data.warga ? data.warga.nama : 'N/A' }}</td>
                                                                <td>{{ data.keterangan }}</td>
                                                            </tr>
                                                        </tbody>
                                                    </v-simple-table>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col>
                                                    <v-btn-toggle rounded dense>
                                                        <v-btn @click="getKoin(koin.prev_page_url)"
                                                            :disabled="!koinHistory.prev_page_url" color="primary">
                                                            prev
                                                        </v-btn>
                                                        <v-btn>
                                                            {{ koinHistory.current_page + '/' + koinHistory.last_page }}
                                                        </v-btn>
                                                        <v-btn @click="getKoin(koin.next_page_url)"
                                                            :disabled="!koinHistory.next_page_url" color="primary">
                                                            next
                                                        </v-btn>
                                                    </v-btn-toggle>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card>
                </v-col>
                <v-dialog v-model="modalAddTransaksi" max-width="600">
                    <v-card min-height="">
                        <v-toolbar color="primary" dark>
                            <h4>Tambah Transaksi</h4>
                        </v-toolbar>
                        <v-container>
                            <v-form ref="formAddTransaksi" @submit.prevent="saveAddTransaksi()">
                                <v-row>
                                    <v-col cols="3">Jenis</v-col>
                                    <v-col>
                                        <v-btn dense :color="inActiveModal ? 'primary' : 'secondary'"
                                            :outlined="!inActiveModal" rounded class="mr-2"
                                            @click="inActiveModal = true, outActiveModal = false">Pemasukan</v-btn>
                                        <v-btn dense :color="outActiveModal ? 'primary' : 'secondary'"
                                            :outlined="!outActiveModal" rounded
                                            @click="inActiveModal = false, outActiveModal = true">Pengeluaran</v-btn>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="3">Nominal</v-col>
                                    <v-col>
                                        <v-text-field :rules="[rules.required]" v-model="addTransaksi.nominal"
                                            type="number" dense min="0"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row v-if="inActiveModal">
                                    <v-col cols="3">Nama Penyetor</v-col>
                                    <v-col>
                                        <model-list-select dense :rules="[rules.required]" :list="refWarga"
                                            option-value="nik" option-text="nama" placeholder="pilih warga"
                                            v-model="addTransaksi.nik">
                                        </model-list-select>
                                        <v-alert v-if="!addTransaksi.nik && showValidationError" type="error" dense>
                                            Nama penyetor harus dipilih
                                        </v-alert>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="3">Keterangan</v-col>
                                    <v-col>
                                        <v-text-field :rules="outActiveModal ? [rules.required] : []" dense
                                            v-model="addTransaksi.keterangan"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row class="mt-5">
                                    <v-col>
                                        <v-btn class="float-end" rounded color="primary"
                                            @click="tambahTransaksi">Simpan</v-btn>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-container>
                    </v-card>
                </v-dialog>
            </v-row>
        </v-container>
    </div>
</template>
<script>
import Swal from 'sweetalert2'
import { ModelListSelect } from 'vue-search-select'
export default {
    components: {
        'model-list-select': ModelListSelect
    },
    data() {
        return {
            menu: false,
            dateRange: [new Date().getFullYear() + '-01-01', new Date().toISOString().substr(0, 10)],
            selectedPeriod: '',
            inActive: true,
            outActive: true,
            inActiveModal: true,
            outActiveModal: false,
            modalAddTransaksi: false,
            refWarga: [],
            addTransaksi: {
                nominal: 0,
                keterangan: '',
                nik: ''
            },
            rules: {
                required: value => !!value || 'Required.',
                min: (v) => v.length >= 6 || "Min 6 characters",
            },
            showValidationError: false,
            koinHistory: {},
            search: '',
            from: '',
            to: '',
            totalPemasukan: 0,
            totalPengeluaran: 0,
            saldo: 0,
        };
    },
    methods: {
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
        openModalAddTransaksi() {
            this.modalAddTransaksi = true;
        },
        getRefWarga() {
            this.$http.get('ref/warga').then((response) => {
                this.refWarga = response.data
            })
        },
        tambahTransaksi() {
            if (!this.showValidationError && this.$refs.formAddTransaksi.validate()) {
                this.showValidationError = !this.addTransaksi.nik
                Swal.fire({
                    title: 'Apa Anda Yakin?',
                    text: "Anda Akan Menyimpan Data ini",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ya'
                }).then((result) => {
                    if (result.isConfirmed) {
                        const data = {
                            nominal: this.addTransaksi.nominal,
                            keterangan: this.addTransaksi.keterangan,
                            nik: this.inActiveModal ? this.addTransaksi.nik : null,
                            jenis: this.inActiveModal ? 'Pemasukan' : 'Pengeluaran'
                        }
                        this.$http.post('koin/tambah', data).then((response) => {
                            Swal.fire({
                                icon: response.data.icon,
                                title: response.data.title,
                                text: response.data.text
                            }).then(() => {
                                this.modalAddTransaksi = false
                                this.getKoin()
                                this.getTotal()
                            })
                        })
                    }
                })
            }
        },
        toggleJenis(jenis) {
            if (jenis === 'Pemasukan') {
                this.inActive = !this.inActive;
            } else if (jenis === 'Pengeluaran') {
                this.outActive = !this.outActive;
            }
            this.getKoin();
        },
        getKoin(page) {
            if (typeof page === 'undefined') {
                page = 'koin/browse?page=1'
            }
            let jenis = '';

            if (this.inActive && this.outActive) {
                jenis = 'Keduanya';
            } else if (this.inActive) {
                jenis = 'Pemasukan';
            } else if (this.outActive) {
                jenis = 'Pengeluaran';
            }

            const data = {
                tipe: jenis,
                search: this.search,
                from: this.from,
                to: this.to
            };

            this.$http.post(page, data).then((response) => {
                this.koinHistory = response.data
            })
        },
        formatRupiah(value) {
            if (!value) return 'Rp. 0';
            let val = (value / 1).toFixed(0).replace('.', ',');
            return 'Rp. ' + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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
            });
        }
    },
    mounted() {
        this.updateSelectedPeriod();
        this.getRefWarga();
        this.getKoin()
        this.getTotal()
    },
    watch: {
        from() {
            if (this.from && this.to) {
                this.getKoin();
            }
        },
        to() {
            if (this.from && this.to) {
                this.getKoin();
            }
        }
    }
};
</script>