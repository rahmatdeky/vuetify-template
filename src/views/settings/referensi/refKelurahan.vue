<template>
    <div>
        <v-card elevation="2" min-height="460px">
            <v-toolbar dense color="primary" dark>
                <v-app-bar-nav-icon></v-app-bar-nav-icon>
                Referensi Kelurahan
            </v-toolbar>
            <v-container>
                <v-row>
                    <v-col cols="3">
                        <v-text-field label="Pencarian"></v-text-field>
                    </v-col>
                    <v-col align-self="center" cols="1">
                        <v-btn icon>
                            <v-icon>mdi-magnify</v-icon>
                        </v-btn>
                    </v-col>
                    <v-col>
                        <v-btn @click="openModalAddKelurahan()" class="float-end" color="primary">
                            <v-icon>mdi-plus</v-icon> Tambah
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-simple-table>
                        <thead>
                            <tr>
                                <th>Id Kelurahan</th>
                                <th>Nama Kelurahan</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Tiban</td>
                                <td>
                                    <v-btn @click="openModalEditKelurahan()" class="float-end" color="warning" outlined>
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </v-simple-table>
                </v-row>
            </v-container>
        </v-card>
        <v-dialog v-model="modalAddKelurahan" width="500">
            <v-card>
                <v-toolbar color="primary" dark>Tambah Kelurahan</v-toolbar>
                <v-container>
                    <v-form>
                        <v-row>
                            <v-col>
                                <v-select label="Kecamatan" :items="listKecamatan" item-text="Kecamatan" item-value="id"></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-text-field label="Nama Kelurahan"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-btn class="float-end" color="primary" dark>Simpan</v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-container>
            </v-card>
        </v-dialog>
        <v-dialog v-model="modalEditKelurahan" width="500">
            <v-card>
                <v-toolbar color="primary" dark>Edit Kelurahan</v-toolbar>
                <v-container>
                    <v-form>
                        <v-row>
                            <v-col>
                                <v-select label="Kecamatan" :items="listKecamatan" item-text="Kecamatan" item-value="id"></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-text-field label="Nama Kelurahan"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-btn class="float-end" color="primary" dark>Simpan</v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-container>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            modalAddKelurahan: false,
            modalEditKelurahan: false,
            listKecamatan: [
                { id: 1, Kecamatan: 'Sekupang' },
            ]
        }
    },
    methods: {
        openModalAddKelurahan() {
            this.modalAddKelurahan = true
        },
        openModalEditKelurahan() {
            this.modalEditKelurahan = true
        }
    }
}
</script>