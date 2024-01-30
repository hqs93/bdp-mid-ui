import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import '../style/bdp-antd.less'

const app = createApp(App)

app.use(Antd).use(router).mount('#app')
