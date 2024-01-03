<script setup>
import { ref, inject,provide,watch,computed } from 'vue'
import {useRoute,useRouter} from 'vue-router'
import '@material/web/textfield/filled-text-field.js';
import '@material/web/textfield/outlined-text-field.js';
import '@material/web/icon/icon.js';

import axios from 'axios';
axios.defaults.withCredentials = true;
let currentAdminID = inject('currentAdminID');
let currentAdminName = inject('currentAdminName');

const TAB_LOGIN=true;
const TAB_REG=false;

let open =ref(false);

let route = useRoute();
let router = useRouter();


let adminname=ref('');
let password=ref('');


let isLogin=ref(true);

function switchTab(login)
{
    isLogin.value=login;
}

function login()
{
    axios.post("http://localhost:8080/admin/admins/login",{
        adminName:adminname.value,
        password:password.value
    },{
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(res=>{
        let payload=res.data;
        if(payload.state==200)
        {
            alert("登录成功！");
            currentAdminID.value=payload.data.aid;
            currentAdminName.value=payload.data.adminName;

            sessionStorage.setItem('currentAdminID',currentAdminID.value);
            sessionStorage.setItem('currentAdminName',currentAdminName.value);
        }
        else{
            alert(payload.state+" "+payload.message)
        }
    }).catch(error=>{
        alert('oops!');
    });
}

function register()
{

}
</script>
<template id="container" class="on-surface">
    <md-tabs>
        <md-primary-tab>
            <md-icon slot="icon" @click="switchTab(TAB_LOGIN)">登录</md-icon>
        </md-primary-tab>
        <md-primary-tab>
            <md-icon slot="icon" @click="switchTab(TAB_REG)">注册</md-icon>
        </md-primary-tab>
    </md-tabs>

    <div v-if="isLogin">
        <h3 class="on-surface-text">登录</h3>
        <from>
            <md-outlined-text-field label="用户名" v-model="adminname"></md-outlined-text-field>&nbsp;
            <br>
            <md-outlined-text-field label="密码" v-model="password"></md-outlined-text-field>
            &nbsp;
            <br>
            <md-filled-button @click="login">登录</md-filled-button>
        </from>
    </div>
    
    <div v-else>
        <h3 class="on-surface-text">注册</h3>
        <form>
            <md-outlined-text-field label="用户名" v-model="adminname"></md-outlined-text-field>&nbsp;
            <br>
            <md-outlined-text-field label="密码" v-model="password"></md-outlined-text-field>&nbsp;
            <md-outlined-text-field id="confirm-pwd" label="确认密码"></md-outlined-text-field>&nbsp;
            <br>
            <md-filled-button @click="register">注册</md-filled-button>
        </form>
    </div>
</template>
<style scoped>


</style>