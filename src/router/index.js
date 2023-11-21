import Vue from 'vue'
import VueRouter from 'vue-router'

// HomePage
import TheContainer2 from '@/components/TheContainer2'
import HomePage from '@/views/LandingPage/HomePage'
import StrukturOrganisasi from '@/views/LandingPage/StrukturOrganisasi'

// Menu
import Container from '@/components/TheContainer'
import Home from '@/views/Home'
// import Browse from '@/views/Browse'
import About from '@/views/About'
import Login from '@/views/Login'
import ChangePassword from '@/views/ChangePassword'
import page404 from '@/views/404'
import page401 from '@/views/401'

// User Manager
import UserManager from '@/views/settings/users/UserManager'
import DetailUser from '@/views/settings/users/DetailUser'

// Manajemen Berita
import ManajemenBerita from '@/views/settings/berita/ManajemenBerita'
import TambahBerita from '@/views/settings/berita/TambahBerita'
import settingDetailBerita from '@/views/settings/berita/DetailBerita'

// Pengurus
import BrowsePengurus from '@/views/settings/pengurus/BrowsePengurus'
import DetailPengurus from '@/views/settings/pengurus/DetailPengurus'

// Lembaga
import BrowseLembaga from '@/views/settings/lembaga/BrowseLembaga'
import DetailLembaga from '@/views/settings/lembaga/DetailLembaga'

// Berita
import BrowseBerita from '@/views/LandingPage/BrowseBerita'
import DetailBerita from '@/views/LandingPage/DetailBerita'

// Setting Landing Page
import SetLandingPage from '@/views/settings/landingPage/SetLandingPage'
import SetCarousel from '@/views/settings/landingPage/SetCarousel'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      unrequiredAuth: true
    }
  },
  {
    path: '/unauthorize',
    component: page401
  },
  {
    path: '*',
    component: page404
  },
  {
    path: '/',
    redirect: '/page',
    name: 'NU',
    component: TheContainer2,
    children : [
      {
        path: '/page',
        name: 'Home Page',
        component: HomePage,
        meta: {
          unrequiredAuth: true
        }
      },
      {
        path: '/struktur',
        name: 'Struktur Organisasi',
        component: StrukturOrganisasi,
        meta: {
          unrequiredAuth: true
        }
      }
    ]
  },
  {
    path: '/home',
    redirect: '/home',
    name: 'Home',
    component: Container,
    children: [
      {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/about',
        name: 'About',
        component: About,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/changepassword',
        name: 'Change Password',
        component: ChangePassword,
        meta: {
          requiresAuth: true
        }
      },
    ]
  },
  {
    path: '/setting',
    redirect: '/setting/usermanager',
    component: Container,
    children: [
      {
        path: 'usermanager',
        name: 'User Manager',
        component: UserManager,
        meta: {
          requiresAuth: true,
          // access : 'manajemenUser'
          access : 'admin'
        }
      },
      {
        path: '/setting/detailuser/:id',
        name: 'Detail User',
        component: DetailUser,
        meta: {
          requiresAuth: true,
          // access : 'manajemenUser'
          access : 'admin'
        }
      },
      {
        path: '/setting/berita',
        name: 'Manajemen Berita',
        component: ManajemenBerita,
        meta: {
          requiresAuth: true,
          // access : 'settingBerita'
          access : 'admin'
        }
      },
      {
        path: '/setting/berita/tambah',
        name: 'Tambah Berita',
        component: TambahBerita,
        meta: {
          requiresAuth: true,
          // access : 'settingBerita'
          access : 'admin'
        }
      },
      {
        path: '/setting/berita/detail/:id',
        name: 'Setting Detail Berita',
        component: settingDetailBerita,
        meta: {
          requiresAuth: true,
          // access : 'settingBerita'
          access : 'admin'
        }
      },
      {
        path: '/setting/pengurus',
        name: 'Browse Pengurus',
        component: BrowsePengurus,
        meta: {
          requiresAuth: true,
          // access : 'settingPengurus'
          access : 'admin'
        }
      },
      {
        path: '/setting/pengurus/detail/:NIK',
        name: 'Detail Pengurus',
        component: DetailPengurus,
        meta: {
          requiresAuth: true,
          // access : 'settingPengurus'
          access : 'admin'
        }
      },
      {
        path: '/setting/lembaga',
        name: 'Browse Lembaga',
        component: BrowseLembaga,
        meta: {
          requiresAuth: true,
          // access : 'settingPengurus'
          access : 'admin'
        }
      },
      {
        path: '/setting/lembaga/detail/:id',
        name: 'Detail Lembaga',
        component: DetailLembaga,
        meta: {
          requiresAuth: true,
          // access : 'settingPengurus'
          access : 'admin'
        }
      },
      {
        path: '/setting/landingpage',
        name: 'Setting Landing page',
        component: SetLandingPage,
        meta: {
          requiresAuth: true,
          // access : 'settingLandingPage'
          access : 'admin'
        }
      },
      {
        path: '/setting/landingpage/carousel',
        name: 'Setting Carousel',
        component: SetCarousel,
        meta: {
          requiresAuth: true,
          // access : 'settingLandingPage'
          access : 'admin'
        }
      },
    ]
  },
  {
    path: '/berita',
    redirect: '/berita/browse',
    component: TheContainer2,
    children: [
      {
        path: '/berita/browse',
        name: 'Browse Berita',
        component: BrowseBerita
      },
      {
        path: '/berita/detail/:id',
        name: 'Detail Berita',
        component: DetailBerita
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
