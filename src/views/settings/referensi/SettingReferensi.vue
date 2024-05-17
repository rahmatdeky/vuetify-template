<template>
    <div>
        <v-container>
            <v-row>
                <div class="col-md-3">
                    <v-card elevation="2" min-height="460px">
                        <v-toolbar dense color="primary" dark>
                            <v-app-bar-nav-icon></v-app-bar-nav-icon>
                            Navigasi
                        </v-toolbar>
                        <v-container>
                            <v-row>
                                <v-col>
                                    <v-btn :disabled="currentMenu == item.title" class="mb-2" v-for="item in menu" :key="item.title" block color="primary" outlined @click="currentMenu = item.title">{{ item.title }}</v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card>
                </div>
                <div class="col-md-9">
                    <transition name="fade" mode="out-in">
                        <template v-for="item in menu">
                            <component :is="item.komponen" v-if="currentMenu == item.title" :key="item.title" />
                        </template>                    
                    </transition>
                </div>
            </v-row>
        </v-container>
    </div>
</template>
<script>
import KategoriBerita from '@/views/settings/referensi/refKategoriBerita'
import Kecamatan from '@/views/settings/referensi/refKecamatan'
import Kelurahan from '@/views/settings/referensi/refKelurahan'
import Organisasi from '@/views/settings/referensi/refOrganisasi'
export default {
    data () {
        return {
            menu: [
                { title: 'Kategori Berita', komponen: 'KategoriBerita' },
                { title: 'Kecamatan', komponen: 'Kecamatan' },
                { title: 'Kelurahan', komponen: 'Kelurahan' },
                { title: 'Organisasi', komponen: 'Organisasi' }
            ],
            currentMenu: 'Kategori Berita'
        }
    },
    components: {
        KategoriBerita, Kecamatan, Kelurahan, Organisasi
    }
}
</script>