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

import ImgPreviewCard from '@/components/ImgPreviewCard.vue';

import axios from 'axios';
axios.defaults.withCredentials = true;
let currentAdminID = inject('currentAdminID');
let currentAdminName = inject('currentAdminName');

let imgPlist = ref([]);
let loadedPage = ref(0);
let pageCount = ref(0);

function loadPageCount() {
    axios.get("http://localhost:8080/admin/postimg/get_media_page_count").then(res => {
        let payload = res.data;
        if (payload.state == 200) {
            pageCount.value = payload.data;
        }
        else {
            alert(payload.message)
        }
    }).catch(error => {
        alert('OOPS')
    });
}

function load(pgn) {
    //alert("wow")
    axios.get("http://localhost:8080/admin/postimg/get_media_by_page", {
        params: {
            pageNo: pgn
        }
    }).then(res => {
        let payload = res.data;
        if (payload.state == 200) {
            //alert('HUH')
            let data = payload.data;
            let arr = imgPlist.value;
            arr.push.apply(arr, data);
            imgPlist.value = arr;
            //return true;
        }
        else {
            alert(payload.message);
            //return false;
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





onMounted(() => {
    loadPageCount();
    load(1);
    loadedPage.value = 1;
})


</script>
<template>
    <div id="item-container" class="on-surface-text">
        <div>
            <ImgPreviewCard :i-list="imgPlist"></ImgPreviewCard>
        </div>
        <div class="load-more">
            <md-filled-button v-show="loadedPage + 1 <= pageCount" @click="loadMore">撩我加载更多哟~mua！</md-filled-button>
            <div v-show="loadedPage + 1 > pageCount">矮油，没有更多内容内~</div>
        </div>
    </div>
</template>
<style scoped>
#item-container{
    margin: 10px;
}
.load-more{
    text-align: center;
    margin: 10px;
}
</style>