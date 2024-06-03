<template>
    <div>
        <v-container>
            <v-row>
                <v-col>
                    <v-card>
                        <!-- <v-card-title> KOIN NU </v-card-title> -->
                        <v-toolbar color="primary" dark>
                            <h5>Koin NU</h5> <v-spacer></v-spacer> <v-btn color="" dark><v-icon>mdi-plus</v-icon> Tambah
                                Transaksi</v-btn>
                        </v-toolbar>
                        <v-container class="px-5">
                            <v-row>
                                <v-col>
                                    <v-card>
                                        <v-container>
                                            <v-row>
                                                <v-col align-self="center">
                                                    <h5>Jumlah Saldo</h5>
                                                </v-col>
                                                <v-col>
                                                    <v-menu bottom left class="float-end">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-btn class="float-end" v-bind="attrs" v-on="on" icon>
                                                                <v-icon>mdi-dots-vertical</v-icon>
                                                            </v-btn>
                                                        </template>
                                                    </v-menu>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col colspan="2">
                                                    <h1>Rp. 0</h1>
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
                                                    <h5>Pemasukan</h5>
                                                </v-col>
                                                <v-col>
                                                    <v-menu bottom left class="float-end">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-btn class="float-end" v-bind="attrs" v-on="on" icon>
                                                                <v-icon>mdi-dots-vertical</v-icon>
                                                            </v-btn>
                                                        </template>
                                                    </v-menu>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col colspan="2">
                                                    <h1>Rp. 0</h1>
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
                                                    <h5>Pengeluaran</h5>
                                                </v-col>
                                                <v-col>
                                                    <v-menu bottom left class="float-end">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-btn class="float-end" v-bind="attrs" v-on="on" icon>
                                                                <v-icon>mdi-dots-vertical</v-icon>
                                                            </v-btn>
                                                        </template>
                                                    </v-menu>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col colspan="2">
                                                    <h1>Rp. 0</h1>
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
                                                    <v-text-field dense label="Pencarian"></v-text-field>
                                                </v-col>
                                                <v-col align-self="center" cols="1">
                                                    <v-btn type="submit" icon>
                                                        <v-icon>mdi-magnify</v-icon>
                                                    </v-btn>
                                                </v-col>
                                                <v-col cols="4"></v-col>
                                                <v-col cols="2">
                                                    <v-text-field label="from" type="date" dense></v-text-field>
                                                </v-col>
                                                <v-col cols="2">
                                                    <v-text-field label="to" type="date" dense></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col>
                                                    <v-simple-table>
                                                        <thead>
                                                            <tr>
                                                                <th>No</th>
                                                                <th>Jenis</th>
                                                                <th>Nominal</th>
                                                                <th>Keterangan</th>
                                                            </tr>
                                                        </thead>
                                                    </v-simple-table>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>