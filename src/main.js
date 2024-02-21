import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//PrimeVue
import PrimeVue from "primevue/config";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primevue/resources/themes/aura-light-green/theme.css";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Card from "primevue/card";
import FloatLabel from "primevue/floatlabel";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";

import Web3 from "web3";

const app = createApp(App);

const web3 = new Web3(window.ethereum);
app.config.globalProperties.$web3 = web3;

app.use(store).use(router).use(PrimeVue).use(ToastService).mount("#app");

app.component("Button", Button);
app.component("InputText", InputText);
app.component("Card", Card);
app.component("FloatLabel", FloatLabel);
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("Toast", Toast);
