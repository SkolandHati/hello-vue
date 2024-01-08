import {createApp} from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import {initAPIproducts, initAPIinfoBrends} from './services/APIbackend.js'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'

initAPIproducts(store)
initAPIinfoBrends(store)

createApp(App)
    .use(Quasar, quasarUserOptions)
    .use(router)
    .use(store)
    .mount('#app');
