<script setup>
import { ref, provide, inject, watch, onMounted } from 'vue';
import { RouterLink, RouterView, useLink, useRoute, useRouter } from 'vue-router'

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
import '@material/web/icon/icon.js'

import '@material/web/checkbox/checkbox.js';

import axios from 'axios'
axios.defaults.withCredentials = true;


let route = useRoute();
let router = useRouter();

let props = defineProps({
    mposts: Array
    // mpostID: String,
    // userName: String,
    // mpostTitle: String,
    // topicName: String,
    // mpostTime: Date,
    // lastFoTime: Date,
    // likeNum: Number,
    // floorNum:Number
});

function openEdit(id) {
    //todo:路由
    router.replace('/mpostManage/edit/'+id)
}

function delM(aid) {

    if (confirm("Are you sure to delete this?")) {
        axios.post("http://localhost:8080/admin/mpost/delete", {
            id: aid
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(res => {
            let payload = res.data;
            if (payload.state == 200) {
                alert("删除成功！");
            }
            else {
                alert(payload.message)
            }
        }).catch(error => {
            alert("OOPS!");
        })
        //todo：优化重载流程
        location.reload();
    }

}


</script>
<template>
    <div id="item-container" class="surface">
        <div class="on-surface-text">
            <table style="width: 100%;">
                <tr>
                    <th>多选</th>
                    <th>帖子ID</th>
                    <th>标题</th>
                    <th>所属主题</th>
                    <th>发布于</th>
                    <th>最后回复于</th>
                    <th>点赞数</th>
                    <th>累计回复数</th>
                    <th>操作</th>
                </tr>
                <tr v-for="mpost in props.mposts">
                    <td>
                        <md-checkbox touch-target="wrapper"></md-checkbox>
                    </td>
                    <td>
                        {{ mpost.mpostID }}
                    </td>
                    <td>
                        {{ mpost.mpostTitle }}
                    </td>
                    <td>
                        {{ mpost.topicName }}
                    </td>
                    <td>
                        {{ mpost.mpostTime }}
                    </td>
                    <td>
                        {{ mpost.lastFoTime }}
                    </td>
                    <td>
                        {{ mpost.likeNum }}
                    </td>
                    <td>
                        {{ mpost.floorNum }}
                    </td>
                    <td>
                        <div>
                            <div class="opt-area">
                                <md-text-button @click="openEdit(mpost.mpostID)">编辑</md-text-button>
                                <md-filled-button style="width: 60px;" @click="delM(mpost.mpostID)">删除</md-filled-button>
                            </div>
                            <div style="clear: both;"></div>
                        </div>
                    </td>
                </tr>
            </table>
        </div>

    </div>
</template>
<style scoped>
#item-container {
    margin: 5px;
}

.opt-area {
    float: right;
}
</style>