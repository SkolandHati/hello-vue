import {createApp} from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import {initAPIinfoBrends} from './services/APIbackend.js'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'

initAPIinfoBrends(store)

createApp(App).use(Quasar, quasarUserOptions)
    .use(Quasar, quasarUserOptions)
    .use(router)
    .use(store)
    .mount('#app');
