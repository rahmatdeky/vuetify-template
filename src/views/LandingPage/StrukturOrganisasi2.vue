<template>
    <div>
        <v-container>
            <v-row class="my-5">
                <v-col>
                    <v-card class="py-5">
                        <v-row>
                            <v-col>
                                <div class="text-center">
                                    <h1><b>STRUKTUR ORGANISASI PCNU KOTA BATAM</b></h1>
                                    <P>Masa Khidmat: 2022 - 2027</P>
                                </div>
                            </v-col>
                        </v-row>
                        <v-row class="card-1">
                            <v-col cols="12" md="6" sm="12">
                                <v-card class="py-5" min-height="500">
                                    <h5 class="text-center">MUSTASYAR</h5>
                                    <ul class="mx-5 my-5" v-for="must in listMustasyar" :key="must">
                                        <li>{{ must.nama }}</li>
                                    </ul>
                                </v-card>
                            </v-col>
                            <v-col>
                                <v-card class="py-5" min-height="500">
                                    <h5 class="text-center">A'WAN</h5>
                                    <ul class="mx-5 my-5" v-for="awan in listAwan" :key="awan">
                                        <li>{{ awan.nama }}</li>
                                    </ul>
                                </v-card>
                            </v-col>
                        </v-row>
                        <v-row class="card-1">
                            <v-col>
                                <v-card class="py-5" min-height="950">
                                    <h5 class="text-center">SYURIAH</h5>
                                    <div class="mx-5 my-5">
                                        <table class="table table-borderless">
                                            <thead>
                                                <tr>
                                                    <th>Nama</th>
                                                    <th>Jabatan</th>
                                                </tr>
                                            </thead>
                                            <br>
                                            <tbody>
                                                <tr v-for="syur in listSyuriah" :key="syur">
                                                    <td :style="{ fontWeight: syur.jabatan === 'Rais' ? 'bold' : syur.jabatan === 'Katib' ? 'bold' : 'normal'}">{{ syur.nama }}</td>
                                                    <td :style="{ fontWeight: syur.jabatan === 'Rais' ? 'bold' : syur.jabatan === 'Katib' ? 'bold' : 'normal'}">{{ syur.jabatan }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </v-card>
                            </v-col>
                            <v-col>
                                <v-card class="py-5" min-height="950">
                                    <h5 class="text-center">TANFIDZIYAH</h5>
                                    <div class="mx-5 my-5">
                                        <table class="table table-borderless">
                                            <thead>
                                                <tr>
                                                    <th>Nama</th>
                                                    <th>Jabatan</th>
                                                </tr>
                                            </thead>
                                            <br>
                                            <tbody>
                                                <tr v-for="tanfidziyah in listTanfidziyah" :key="tanfidziyah">
                                                    <td :style="{ fontWeight: tanfidziyah.jabatan === 'Ketua' ? 'bold' : tanfidziyah.jabatan === 'Sekretaris' ? 'bold' : tanfidziyah.jabatan === 'Bendahara' ? 'bold' : 'normal'}">{{ tanfidziyah.nama }}</td>
                                                    <td :style="{ fontWeight: tanfidziyah.jabatan === 'Ketua' ? 'bold' : tanfidziyah.jabatan === 'Sekretaris' ? 'bold' : tanfidziyah.jabatan === 'Bendahara' ? 'bold' : 'normal'}">{{ tanfidziyah.jabatan }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<style>
    .card-1 {
        padding-left: 3.75rem;
        padding-right: 3.75rem;
    }
    @media screen and (max-width: 600px) {
        .card-1 {
            padding-left: 10px;
            padding-right: 10px;
        }
    }
</style>
<script>
export default {
    data() {
        return {
            listMustasyar: [
                {
                    nama: 'H. Muhammad Rudi, SE.,MM.'
                },
                {
                    nama: 'KH. Muhaimin'
                },
                {
                    nama: 'Nuryanto, SH.,MH.'
                },
                {
                    nama: 'KH. Rusli Abdul Wahid, S.Ag.'
                },
                {
                    nama: 'Dr. H. Zulkarnain Umar, S.Ag., M.H.'
                },
                {
                    nama: 'H. Hairul Saleh'
                },
                {
                    nama: 'Drs. KH. A Nabhan, M.Sy.'
                },
                {
                    nama: 'KH. Muhammad Sholeh'
                },
                {
                    nama: 'KH. Usman Ahmad'
                },
            ],
            listAwan: [
                {
                    nama: 'K Nasuha'
                },
                {
                    nama: 'H. M Sholeh'
                },
                {
                    nama: 'KH. Mahfudz Shidiq'
                },
                {
                    nama: `Moh Rusdi Syafi'i, S.Kom.`
                },
                {
                    nama: 'K Nur Syahid'
                },
                {
                    nama: 'H. Unggul Pahmi Hasibuan, S.Ag., M.Sy'
                },
            ],
            listSyuriah: [
            {
                    jabatan: "Rais",
                    nama: "KH. A Ridho Amir, S.Ag., M.HI."
                },
                {
                    jabatan: "Wakil Rais",
                    nama: "KH. Muhammad Yamin Al Hafizh"
                },
                {
                    jabatan: "Wakil Rais",
                    nama: "H. Muhammad Dirham, S.Ag., M.Sy."
                },
                {
                    jabatan: "Wakil Rais",
                    nama: "KH. M Khotib"
                },
                {
                    jabatan: "Wakil Rais",
                    nama: "Habib Sauqi bin Yahya"
                },
                {
                    jabatan: "Wakil Rais",
                    nama: "K Ahmad Junaidi"
                },
                {
                    jabatan: "Wakil Rais",
                    nama: "KH. Ali Mafazi"
                },
                {
                    jabatan: "Wakil Rais",
                    nama: "Drs. H. Sulaiman"
                },
                {
                    jabatan: "Wakil Rais",
                    nama: "KH. Agus Luqman Hakim, M.pd."
                },
                {
                    jabatan: "Katib",
                    nama: "Adib Masykuri, S.Ag."
                },
                {
                    jabatan: "Wakil Katib",
                    nama: "Mustafa Salim, S.pd.i."
                },
                {
                    jabatan: "Wakil Katib",
                    nama: "K A Jamzuri Saud, S.Pd.I"
                },
                {
                    jabatan: "Wakil Katib",
                    nama: "Muhith Marzuki, M.Ag."
                },
                {
                    jabatan: "Wakil Katib",
                    nama: "Ahmad Mujib, S.Sos."
                },
                {
                    jabatan: "Wakil Katib",
                    nama: "Bahrullah Shodiq, S.Pd.I"
                },
                {
                    jabatan: "Wakil Katib",
                    nama: "H. Deden Sirajudin, S.Pd.I"
                },
                {
                    jabatan: "Wakil Katib",
                    nama: "H. Adamrin, S.Ag., Mh."
                },
                {
                    jabatan: "Wakil Katib",
                    nama: "Mustofal Akhyar, S.Pd.I."
                },
            ],
            listTanfidziyah: [
            {
                    jabatan: "Ketua",
                    nama: "Dr. H. Muhammad Zaenuddin, S.Si., M.Sc."
                },
                {
                    jabatan: "Wakil Ketua",
                    nama: "Khoirul Anam"
                },
                {
                    jabatan: "Wakil Ketua",
                    nama: "H. Syaifudin, SH."
                },
                {
                    jabatan: "Wakil Ketua",
                    nama: "H. Ali Mansur, S.Ag."
                },
                {
                    jabatan: "Wakil Ketua",
                    nama: "Raja Azmansyah, S.Sos., MT."
                },
                {
                    jabatan: "Wakil Ketua",
                    nama: "Dr. Muhammad Juni Beddu, LC., MA."
                },
                {
                    jabatan: "Wakil Ketua",
                    nama: "Habib Soleh, M.Pd.I"
                },
                {
                    jabatan: "Sekretaris",
                    nama: "H. Riki Syolihin, S.Fil.I., M.Si"
                },
                {
                    jabatan: "Wakil Sekretaris",
                    nama: "Jamil, S.Ag."
                },
                {
                    jabatan: "Wakil Sekretaris",
                    nama: "Ahmad Hamim Thohari, S.ST., M.T."
                },
                {
                    jabatan: "Wakil Sekretaris",
                    nama: "Dukhorini Ali, S.Ag., M.Pd."
                },
                {
                    jabatan: "Wakil Sekretaris",
                    nama: "Taufiqur Rahman, ST., M.Pd."
                },
                {
                    jabatan: "Wakil Sekretaris",
                    nama: "M Imam Sofyan Santun, S.Pd.I"
                },
                {
                    jabatan: "Wakil Sekretaris",
                    nama: "Sularno, Se."
                },
                {
                    jabatan: "Bendahara",
                    nama: "Dwi Suryo, P., SS."
                },
                {
                    jabatan: "Wakil Bendahara",
                    nama: "Dendi Gustinandar, SE., MM."
                },
                {
                    jabatan: "Wakil Bendahara",
                    nama: "Ahmad Khalis Tontowi, S.Kom."
                },
                {
                    jabatan: "Wakil Bendahara",
                    nama: "Ir. Supriyanto"
                },
                {
                    jabatan: "Wakil Bendahara",
                    nama: "Wahyu Galih Saputro"
                },
            ]
        }
    }
}
</script>