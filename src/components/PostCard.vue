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

let route = useRoute();
let router = useRouter();

axios.defaults.withCredentials = true;

let props=defineProps({
    mpostID: String,
    topicID: Number,
    userID: Number,
    userName: String,
    profile: String,
    mpostTitle: String,
    mpostTime: Date,
    mpostIP: String,
    mpostContent: String,
    lastFoTime: Date,
    likeNum: Number,
    floorNum:Number,
    imgList:{
        type:Array,
        default:[]
    }
});



</script>
<template>
    <div id="item-container">
        <div id="info-bar" class="secondary-container">
            <div style="text-align: center;">
                <h1>{{ props.mpostTitle }}</h1>
            </div>
           <div id="likes" class="primary">
            <div class="on-primary-text">
                {{ props.userName }} 发表于：{{ props.mpostTime }}，IP属地：{{ props.mpostIP==''? props.mpostIP:'未知' }}
                {{ props.likeNum }}点赞，最终回复于{{ props.lastFoTime }}
            </div>
           </div>
        </div>
        <md-divider></md-divider>
        <div id="article" class="on-surface-text">
            {{ props.mpostContent }}
        </div>
        <div id="img-area">
            <section v-if="imgList != null || imgList.length > 0" >
                <div v-for="img in imgList">
                    <div class="img-control-panel">
                        <md-text-button @click="">删除</md-text-button>
                    </div>
                    <div v-if="img.type == 0">
                        <img :src="'http://localhost:8080' + img.img" alt="解析图片出现问题" class="img-frame">
                    </div>
                    <div v-if="img.type == 1">
                        <video :src="'http://localhost:8080' + img.img" alt="解析视频出现问题" class="img-frame">
                        </video>
                    </div>
                </div>
            </section>
        </div>
        <div id="info-area">
            <table id="info-table">
                <tr>
                    <th>点赞</th>
                    <th>回复</th>
                    <th>发布时间</th>
                    <th>最终回复时间</th>
                </tr>
                <tr>
                    <td>{{ props.likeNum }}</td>
                    <td>{{ props.floorNum }}</td>
                    <td>{{ props.mpostTime }}</td>
                    <td>{{ props.lastFoTime }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>
<style scoped>
#item-container{
padding: 10px;
}
#info-bar{
    border-radius: 10px;
    padding: 15px;
}
#aritcle{
    margin: 10px;
    padding: 10px;
}
#info-area,#img-area{
    text-align: center;
    width: 100%;
    margin: 20px;
    padding: 20px;
}
#info-table{
    width: 80%;
}
</style>