<template>
    <div>
        <v-container>
            <v-row>
                <div class="text-center">
                    <h1><b>SUSUNAN PCNU KOTA BATAM</b></h1>
                    <P>Masa Khidmat: 2022 - 2027</P>
                </div>
            </v-row>
            <v-row>

                <v-card>
                    <v-card-title class="">MUSTASYAR</v-card-title>
                    <v-container>
                        <table class="table">
                            <tr>
                                <td>H. Muhammad Rudi, SE.,MM.</td>
                                <td>KH. Muhaimin</td>
                            </tr>
                            <tr>
                                <td>Nuryanto, SH.,MH.</td>
                                <td>KH. Rusli Abdul Wahid, S.Ag.</td>
                            </tr>
                            <tr>
                                <td>Dr. H. Zulkarnain Umar, S.Ag., M.H.</td>
                                <td>H. Hairul Saleh</td>
                            </tr>
                            <tr>
                                <td>Drs. KH. A Nabhan, M.Sy.</td>
                                <td>KH. Muhammad Sholeh</td>
                            </tr>
                            <tr>
                                <td>KH. Usman Ahmad</td>
                                <td></td>
                            </tr>
                        </table>
                    </v-container>
                    <v-card-title>SYURIYAH</v-card-title>
                    <v-container>
                        <table class="table" width="100%">
                            <tr v-for="(data, index) in listRais" :key="index">
                                <td :style="{ fontWeight: data.jabatan === 'Rais' ? 'bold' : 'normal' }" width="40%">{{ data.jabatan }}</td>
                                <td width="1%">:</td>
                                <td :style="{ fontWeight: data.jabatan === 'Rais' ? 'bold' : 'normal' }">{{ data.nama }}</td>
                            </tr>
                        </table>
                        <table class="table" width="100%">
                            <tr v-for="(data, index) in listKatib" :key="index">
                                <td :style="{ fontWeight: data.jabatan === 'Katib' ? 'bold' : 'normal' }" width="40%">{{ data.jabatan }}</td>
                                <td width="1%">:</td>
                                <td :style="{ fontWeight: data.jabatan === 'Katib' ? 'bold' : 'normal' }">{{ data.nama }}</td>
                            </tr>
                        </table>
                    </v-container>
                    <v-card-title class="">A'WAN</v-card-title>
                    <v-container>
                        <table class="table">
                            <tr>
                                <td>K Nasuha</td>
                                <td>H. M Sholeh</td>
                            </tr>
                            <tr>
                                <td>KH. Mahfudz Shidiq</td>
                                <td>Moh Rusdi Syafi'i, S.Kom.</td>
                            </tr>
                            <tr>
                                <td>K Nur Syahid</td>
                                <td>H. Unggul Pahmi Hasibuan, S.Ag., M.Sy</td>
                            </tr>
                        </table>
                    </v-container>
                    <v-card-title>TANFIDZIYAH</v-card-title>
                    <v-container>
                        <table class="table" width="100%">
                            <tr v-for="(data, index) in listKetua" :key="index">
                                <td :style="{ fontWeight: data.jabatan === 'Ketua' ? 'bold' : 'normal' }" width="40%">{{ data.jabatan }}</td>
                                <td width="1%">:</td>
                                <td :style="{ fontWeight: data.jabatan === 'Ketua' ? 'bold' : 'normal' }">{{ data.nama }}</td>
                            </tr>
                        </table>
                        <table class="table" width="100%">
                            <tr v-for="(data, index) in listSekretaris" :key="index">
                                <td :style="{ fontWeight: data.jabatan === 'Sekretaris' ? 'bold' : 'normal' }" width="40%">{{ data.jabatan }}</td>
                                <td width="1%">:</td>
                                <td :style="{ fontWeight: data.jabatan === 'Sekretaris' ? 'bold' : 'normal' }">{{ data.nama }}</td>
                            </tr>
                        </table>
                        <table class="table" width="100%">
                            <tr v-for="(data, index) in listBendahara" :key="index">
                                <td :style="{ fontWeight: data.jabatan === 'Bendahara' ? 'bold' : 'normal' }" width="40%">{{ data.jabatan }}</td>
                                <td width="1%">:</td>
                                <td :style="{ fontWeight: data.jabatan === 'Bendahara' ? 'bold' : 'normal' }">{{ data.nama }}</td>
                            </tr>
                        </table>
                    </v-container>
                </v-card>
            </v-row>
        </v-container>
    </div>
</template>
<script>
export default {
    data () {
        return {
            listRais: [
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
            ],
            listKatib: [
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
            listKetua: [
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
                    nama: "Habis Soleh, M.Pd.I"
                },
            ],
            listSekretaris: [
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
            ],
            listBendahara: [
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