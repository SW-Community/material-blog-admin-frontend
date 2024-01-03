import './assets/theme.css'

import { createApp,ref,provide } from 'vue'
import App from './App.vue'
import router from './router'

let currentAdminID=ref(-1);
let currentAdminName=ref('请登录');

let id=sessionStorage.getItem('currentAdminID');
if(id)
{
    currentAdminID.value=id;
    let name=sessionStorage.getItem('currentAdminName');
    currentAdminName.value=name;
}

const app = createApp(App);

app.provide('currentAdminID',currentAdminID);
app.provide('currentAdminName',currentAdminName);
app.use(router);

app.mount('#app');
