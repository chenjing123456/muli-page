import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import "../common/less/reset.less";

import App from './gov.vue'
import store from './store'
import router from './router/index.js'


Vue.config.productionTip = false;

Vue.use(ElementUI)
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
