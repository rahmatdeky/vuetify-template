import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
// import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
    theme: { 
      themes: {
        light:{
          background: '#e4e5e6', // Not automatically applied #E8F5E9
          primary: '#02275d',
          // primary: '#66BB6A'
        },
        dark: {
          // primary: colors.shades,
          primary: '#02275d',
          red: '#D32F2F',
          error: '#D32F2F'
        }
      },
      dark: false 
    }
  })
