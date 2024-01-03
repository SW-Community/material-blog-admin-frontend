<script setup>
import { ref, onMounted, computed, watch, inject, provide } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
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
import '@material/web/textfield/filled-text-field.js';
import '@material/web/textfield/outlined-text-field.js';
import '@material/web/dialog/dialog.js';

import ImgDigVue from './ImgDig.vue';

import axios from 'axios';
axios.defaults.withCredentials = true;
let currentAdminID = inject('currentAdminID');
let currentAdminName = inject('currentAdminName');

let props=defineProps({
    iList:{
        type:Array,
        default:[]
    }
});


let isOpen=ref(false);
let currentUrl=ref('');
let currentWhich=ref(-1);

function open(url,which)
{
    currentUrl.value=url;
    currentWhich.value=which;
    isOpen.value=true;
}

function close()
{
    //alert('WTF?')
    isOpen.value=false;
    currentUrl.value='';
    currentWhich.value=-1;
}

function delMedia(id)
{
    if(confirm('删除此图片或视频？'))
    {
        axios.post('http://localhost:8080/admin/postimg/delete',{

        },{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(res=>{
            let payload = res.data;
            if (payload.state == 200) {
                alert("success!");
                location.reload();
            }
            else {
                alert(payload.message);
            }
        }).catch(error=>{
            alert('OOPS!');
        })
    }
}

</script>
<template>
    <div id="item-contianer" class="on-surface-text">
        <table id="tab-image">
            <tr>
                <th>选择</th>
                <th>ID</th>
                <th>类型</th>
                <th>帖子标题</th>
                <th>主题</th>
                <th>发帖人</th>
                <th>操作</th>
            </tr>
            <tr v-for="img in iList">
                <td>
                    <md-checkbox></md-checkbox>
                </td>
                <td>{{ img.imgID }}</td>
                <td>{{ img.type==0?'图片':'视频' }}</td>
                <td>{{ img.mpostTitle }}</td>
                <td>{{ img.topicName }}</td>
                <td>{{ img.userName }}</td>
                <td>
                    <div class="opt-area">
                        <md-text-button @click="open(img.img,img.type)">查看</md-text-button>
                        <md-text-button @click="delMedia(img.imgID)">删除</md-text-button>
                    </div>
                    <div style="clear: both;"></div>
                </td>
            </tr>
        </table>
    </div>
    <div>
        <ImgDigVue @on-close="close" :is-open="isOpen" :url="currentUrl" :which="currentWhich"></ImgDigVue>
    </div>
</template>
<style scoped>
#tab-image{
    width: 90%;
}
.opt-area{
    float: right;
}
</style>