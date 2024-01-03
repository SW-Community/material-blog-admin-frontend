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
import '@material/web/button/filled-button.js';
import '@material/web/divider/divider.js';
import '@material/web/dialog/dialog.js';
import '@material/web/list/list-item.js';
import '@material/web/list/list.js';
import '@material/web/textfield/filled-text-field.js';
import '@material/web/textfield/outlined-text-field.js';
import '@material/web/fab/branded-fab.js';
import '@material/web/fab/fab.js';

let route = useRoute();
let router = useRouter();

axios.defaults.withCredentials = true;

let topicList = ref([]);
let loadedPage = ref(1);
let pageCount = ref(0);

let tid = ref(-1);
let tName = ref('');
let tDisc = ref('');

let open = ref(false);
let open2 = ref(false);

function loadMore() {
    if (loadedPage.value + 1 > pageCount.value) {
        //没有了  
        alert('矮油，没有更多了捏~');
        return;
    }

    axios.get("http://localhost:8080/admin/topics/get_topic_by_page", {
        params: {
            pageNo: loadedPage.value + 1
        }
    }).then(res => {
        let payload = res.data;
        if (payload.state == 200) {
            let data = payload.data;
            let arr = topicList.value;
            arr.push.apply(arr, data);
            topicList.value = arr;
            loadedPage.value = loadedPage.value + 1
        }
        else {
            alert(payload.state);
        }
    }).catch(error => {
        alert("OOPS");
    });
}

function openNew() {
    open.value = true;
}

function openEdit(id, name, disc) {
    tid.value = id;
    tName.value = name;
    tDisc.value = disc;
    open2.value = true;
}


function deleteTopic(id) {
    axios.post("http://localhost:8080/admin/topics/delete", {
        tid: id
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(res => {
        let payload = res.data;
        if (payload.state == 200) {
            alert("删除成功");
            location.reload();
        }
    }).catch(error => {
        alert('oops!')
    })
}


function submitf() {
    let name = tName.value;
    let disc = tDisc.value;

    if (name == '' || disc == '') {
        alert("请填写内容")
        return;
    }

    axios.post("http://localhost:8080/admin/topics/add", {
        topicName: name,
        topicIntro: disc
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(res => {
        let payload = res.data;
        if (payload.state == 200) {
            alert("添加成功");

            location.reload();
        }
        else {
            alert(payload.message)
        }
    }).catch(error => {
        alert('oops!')
    })
    tName.value = '';
    tDisc.value = '';
    open.value = false;
}

function submita() {
    let id = tid.value;
    let name = tName.value;
    let disc = tDisc.value;

    if (id == -1) {
        alert("ERROR!");
        open2.value = false;
        return;
    }

    if (name == '' || disc == '') {
        alert("请填写内容")
        return;
    }

    axios.post("http://localhost:8080/admin/topics/update", {
        topicID: id,
        topicName: name,
        topicIntro: disc
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(res => {
        let payload = res.data;
        if (payload.state == 200) {
            alert("修改成功");

            location.reload();
        }
        else {
            alert(payload.message)
        }
    }).catch(error => {
        alert('oops!')
    })

    tid.value = -1;
    tName.value = '';
    tDisc.value = '';
    open.value = false;
}


onMounted(() => {
    //获取页数
    axios.get("http://localhost:8080/admin/topics/get_topic_page_count").then(res => {
        let payload = res.data;
        if (payload.state == 200) {
            pageCount.value = payload.data;
        }
        else {
            alert(payload.state);
            //todo:终止加载
            return;
        }

    }).catch(errror => {
        alert("FITAL ERROR!");
        return;
    });

    //加载第一页
    axios.get("http://localhost:8080/admin/topics/get_topic_by_page", {
        params: {
            pageNo: 1
        }
    }).then(res => {
        let payload = res.data;
        if (payload.state == 200) {
            let data = payload.data;
            let arr = topicList.value;
            arr.push.apply(arr, data);
            topicList.value = arr;
            loadedPage.value = 1;
        }
        else {
            alert(payload.state);
        }
    }).catch(error => {
        alert("OOPS");
    })
});


</script>
<template>
    <div class="on-surface-text" style="width: 98%;">
        <h1>全部主题</h1>
        <md-list>
            <md-list-item v-for="topic in topicList">
                <md-divider></md-divider>
                <div style="padding: 5px;">
                    <div class="edit-and-delete">
                        <md-text-button @click="openEdit(topic.topicID, topic.topicName, topic.topicIntro)">
                            🖊
                        </md-text-button>
                        <md-filled-button @click="deleteTopic(topic.topicID)" style="width:60px">
                            🗑️
                        </md-filled-button>
                    </div>
                    <h1 @click="">{{ topic.topicName }}</h1>
                    <div>{{ topic.topicIntro }}</div>
                </div>

            </md-list-item>
        </md-list>
        <div class="load-more">
            <md-filled-button v-show="loadedPage + 1 <= pageCount" @click="loadMore">撩我加载更多哟~mua！</md-filled-button>
            <div v-show="loadedPage + 1 > pageCount">矮油，没有更多内容内~</div>
        </div>

        <div id="fab-container">
            <md-fab @click="openNew">
                <md-icon slot="icon">🖊</md-icon>
            </md-fab>
        </div>
    </div>

    <md-dialog class="secondary-container" id="select-dialog" :open="open" v-show="open">
        <div slot="headline" class="on-secondary-container-text">
            添加主题
        </div>
        <div slot="content" id="list-con">
            <form id="form-id" method="dialog">
                <h3>名称</h3>
                <div style="text-align: center;">
                    <md-outlined-text-field style="width: 95%;" maxlength="20" v-model="tName"></md-outlined-text-field>
                </div>
                <md-divider></md-divider>
                <h3>描述</h3>
                <div style="text-align: center;">
                    <md-outlined-text-field style="width: 95%;" maxlength="45" v-model="tDisc"></md-outlined-text-field>

                </div>
            </form>
        </div>
        <div slot="actions" style="text-align: right;">
            <md-text-button form="form-id" @click="open = false">取消</md-text-button>
            <md-text-button form="form-id" @click="submitf">OK</md-text-button>
        </div>
    </md-dialog>

    <md-dialog class="secondary-container" id="select-dialog2" :open="open2" v-show="open2">
        <div slot="headline" class="on-secondary-container-text">
            修改{{ tid }}
        </div>
        <div slot="content" id="list-con">
            <form id="form-id2" method="dialog">
                <h3>名称</h3>
                <div style="text-align: center;">
                    <md-outlined-text-field style="width: 95%;" maxlength="20" v-model="tName"></md-outlined-text-field>
                </div>
                <md-divider></md-divider>
                <h3>描述</h3>
                <div style="text-align: center;">
                    <md-outlined-text-field style="width: 95%;" maxlength="45" v-model="tDisc"></md-outlined-text-field>
                </div>
            </form>
        </div>
        <div slot="actions" style="text-align: right;">
            <md-text-button form="form-id2" @click="open2 = false">取消</md-text-button>
            <md-text-button form="form-id2" @click="submita">OK</md-text-button>
        </div>
    </md-dialog>
</template>
<style scoped>
.load-more {
    width: 100%;
    padding: 10px;
    text-align: center;
}

.edit-and-delete {
    float: right;
}

#form-id {
    width: 98%;
}

#select-dialog,
#select-dialog2 {
    padding: 10px;
    margin: 5px;
    border-radius: 5px;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 80%;
    transform: translate(-50%, -50%);
    z-index: 9999999999;
}

#fab-container {
    margin: 5px;
    width: 30px;
    height: 30px;
    position: fixed;
    right: 30px;
    bottom: 90px;
}
</style>