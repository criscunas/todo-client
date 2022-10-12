import { createApp } from 'vue'
import axios from 'axios'
import App from './App.vue'
import './assets/main.css'

const app = createApp(App)

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        'Content-Type': 'application/json'
    },
})

app.config.globalProperties.$axios = axiosInstance

app.mount('#app')