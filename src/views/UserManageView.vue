<script setup>
import { ref, onMounted, computed, watch, inject, provide } from 'vue'
import { RouterLink, RouterView, useLink, useRoute, useRouter } from 'vue-router'
import axios from 'axios';

import '@material/web/icon/icon.js';
import '@material/web/button/filled-button.js';
import '@material/web/iconbutton/filled-icon-button.js';
import '@material/web/iconbutton/filled-tonal-icon-button.js';
import '@material/web/iconbutton/outlined-icon-button.js';
import '@material/web/iconbutton/icon-button.js';
import '@material/web/menu/menu-item.js';
import '@material/web/menu/sub-menu.js';
import '@material/web/menu/menu.js';
import '@material/web/dialog/dialog.js';
import '@material/web/divider/divider.js';
import '@material/web/radio/radio.js';
import '@material/web/button/outlined-button.js';
import '@material/web/button/text-button.js';
import '@material/web/iconbutton/icon-button.js';
import '@material/web/textfield/filled-text-field.js';
import '@material/web/textfield/outlined-text-field.js';
import '@material/web/checkbox/checkbox.js';

let route = useRoute();
let router = useRouter();

axios.defaults.withCredentials = true;

let currentAdminID = inject('currentAdminID');
let currentAdminName = inject('currentAdminName');

let userList = ref([]);
let loadedPage = ref(0);
let pageCount = ref(0);

//let uid=ref(-1);

let user = ref({});

let open = ref(false);

function openEdit(auser) {

    user.value = auser;
    if (user.value.gender == 0) {
        document.getElementById('girl-radio').checked = true;
    }
    else {
        document.getElementById('boy-radio').checked = true;
    }
    open.value = true;
}

function resetPwd(id) {
    alert(id)
    axios.post("http://localhost:8080/admin/users/reset_password", {
        uid: id
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(res => {
        let payload = res.data;
        if (payload.state == 200) {
            if (payload.state == 200) {
                alert("重置密码成功，下次可用默认密码登录")
            }
            else {
                alert('!' + payload.message)
            }
        }
    }).catch(error => {
        alert('OOPS!')
    })
}

function load(pgn) {
    axios.get("http://localhost:8080/admin/users/get_user_by_page", {
        params: {
            pageNo: pgn
        }
    }).then(res => {
        let payload = res.data;
        if (payload.state == 200) {
            let data = payload.data;
            let arr = userList.value;
            arr.push.apply(arr, data);
            userList.value = arr;
        }
        else {
            alert(payload.state);
            return false;
        }
    }).catch(error => {
        alert("OOPS");
    });
}

function submitF() {
    let id = user.value.userID;
    let name = document.getElementById('name').value;
    let agender = 0;
    if (document.getElementById('boy-radio').checked) {
        agender = 1;
    }
    let eml = document.getElementById('eml').value;

    axios.post("http://localhost:8080/admin/users/update_user", {
        uid: id,
        userName: name,
        gender: agender,
        email: eml
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'

        }
    }).then(res => {
        if (payload.state == 200) {
            alert("修改成功！")
        }
        else {
            alert('!' + payload.message)
        }

    }).catch(error => {
        alert("OOPS");
        return false;
    });
}


function delA(id)
{
    axios.post("http://localhost:8080/admin/users/reset_avatar",{
        uid:id
    },{
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'

        }
    }).then(res => {
        if (payload.state == 200) {
            alert("重置头像成功！")
        }
        else {
            alert('!' + payload.message)
        }

    }).catch(error => {
        alert("OOPS");
        return false;
    });
}

function loadMore() {
    if (loadedPage.value + 1 > pageCount.value) {
        //没有了  
        alert('矮油，没有更多了捏~');
        return;
    }

    load(loadedPage.value + 1)
    loadedPage.value = loadedPage.value + 1;

}

//todo:批量删除
function del_real(id)
{
    axios.post("http://localhost:8080/admin/users/ban_user",{
        uid:id
    },{
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'

        }
    }).then(res => {
        if (payload.state == 200) {
            alert("删除成功！")
        }
        else {
            alert('!' + payload.message)
        }

    }).catch(error => {
        alert("OOPS");
        return false;
    });
}

function delU(id)
{
    if(confirm("确认删除用户？此操作不可逆！仅超级管理员可恢复"))
    {
        del_real(id);
    }
}

onMounted(() => {
    //获取页数
    axios.get("http://localhost:8080/admin/users/get_user_page_count").then(res => {
        let payload = res.data;
        if (payload.state == 200) {
            //alert(payload.data)
            pageCount.value = payload.data;
        }
        else {
            alert('!')
            return
        }
    }).catch(error => {

        alert('OOPS');
        return;
    });

    //加载第一页
    load(1)
    loadedPage.value = 1;


})

</script>
<template>
    <div class="on-surface-text" id="container">
        <div>
            <h2>全部用户</h2>
        </div>
        <div>
            <table class="display-sec">
                <tr style="height: 50px;">
                    <th>选择</th>
                    <th>ID</th>
                    <th>用户名</th>
                    <th>电子邮件地址</th>
                    <th>性别</th>
                    <th>操作</th>
                </tr>
                <tr v-for="usera in userList" style="height: 50px; text-align: center;">
                    <td>
                        <md-checkbox touch-target="wrapper" v-model="usera.checked"></md-checkbox>
                    </td>
                    <td>{{ usera.userID }}</td>
                    <td>{{ usera.userName }}</td>
                    <td>{{ usera.email }}</td>
                    <td>{{ usera.gender }}</td>
                    <td>
                        <div class="opt-area">
                            <md-text-button @click="openEdit(usera)">编辑</md-text-button>
                            <md-filled-button style="width: 60px;" @click="delU(usera.userID)">删除</md-filled-button>
                        </div>
                        <div style="clear: both;"></div>
                    </td>
                </tr>
            </table>
            <div class="load-more">
                <md-filled-button v-show="loadedPage + 1 <= pageCount" @click="loadMore">撩我加载更多哟~mua！</md-filled-button>
                <div v-show="loadedPage + 1 > pageCount">矮油，没有更多内容内~</div>
            </div>
        </div>
    </div>

    <md-dialog class="secondary-container" id="select-dialog" :open="open" v-show="open">
        <div style="padding: 10px;" slot="headline" class="on-secondary-container-text">
            <h3>编辑用户信息</h3>
        </div>
        <div style="padding: 10px;" slot="content" id="list-con">
            <form id="form-id" method="dialog">
                <div style="float: right;">
                    <img id="user-img" alt="暂无头像">
                    <md-filled-button @click="delA(user.userID)">删除</md-filled-button>
                </div>
                <div style="clear: both;"></div>
                <md-outlined-text-field label="用户ID（不可修改）" v-model="user.userID"></md-outlined-text-field>
                <br>
                <br>
                <md-outlined-text-field id="name" label="用户名" v-model="user.userName"></md-outlined-text-field>
                <br>
                <br>
                <div>
                    <div class="radio-label">
                        <md-radio id="girl-radio" name="with-labels" value='女'>
                        </md-radio>
                        <label for="girl-radio" class="on-surface-text">这是女生</label>
                    </div>
                    <br>
                    <div class="radio-label">
                        <md-radio id="boy-radio" name="with-labels" value='男'>
                        </md-radio>
                        <label for="boy-radio" class="on-surface-text">这是男生</label>
                    </div>
                </div>
                <br>
                <br>
                <md-outlined-text-field id="eml" label="电子邮件地址" v-model="user.email"></md-outlined-text-field>
            </form>
            <md-filled-button @click="resetPwd(user.userID)">重置密码</md-filled-button>
        </div>
        <div slot="actions" style="text-align: right;">
            <md-text-button form="form-id" @click="open = false">取消</md-text-button>
            <md-text-button form="form-id" @click="submitF">OK</md-text-button>
        </div>
    </md-dialog>
</template>
<style scoped>
.display-sec {
    width: 100%;
}

.opt-area {
    float: right;
}

.load-more {
    text-align: center;
}

#select-dialog {
    padding: 10px;
    margin: 5px;
    border-radius: 5px;
    position: fixed;
    top: 50%;
    left: 50%;
    width: 80%;
    transform: translate(-50%, -50%);
    z-index: 9999999999;
}

#user-img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
}
</style>