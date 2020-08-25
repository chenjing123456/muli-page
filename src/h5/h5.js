import Vue from 'vue'
import 'amfe-flexible'
import fastClick from 'fastclick'

import Vant from 'vant'
import 'vant/lib/index.css'
import "../common/less/reset.less";
import App from './h5.vue'
import router from './router'


// 300ms延迟
fastClick.attach(document.body);
Vue.use(Vant);

Vue.config.productionTip = false
new Vue({
    router,
    
    render: h => h(App)
}).$mount('#app')
