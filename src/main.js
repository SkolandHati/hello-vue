import {createApp} from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import {initAPIproducts, initAPIinfoBrends} from './services/APIbackend.js'

initAPIproducts(store)
initAPIinfoBrends(store)

createApp(App)
    .use(router)
    .use(store)
    .mount('#app');
