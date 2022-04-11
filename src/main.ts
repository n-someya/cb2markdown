import { createApp } from 'vue'
import { createGtm } from "@gtm-support/vue-gtm";

import App from './App.vue'

const app = createApp(App)

app.use(
    createGtm({
        id: 'GTM-WR2QSQR',
        // debug: true,
    })
)

app.mount('#app')
