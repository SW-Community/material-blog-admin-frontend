<script setup>
import { ref, onMounted, computed, watch, inject, provide } from 'vue'
import { RouterLink, RouterView, useLink, useRoute, useRouter } from 'vue-router'

import ReplyPreviewCard from '@/components/ReplyPreviewCard.vue';
import ViewReply from '@/components/ViewReply.vue';

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



let fpList=ref([])
let currentFpc=ref({});
let loadedPage = ref(0);
let pageCount = ref(0);

function loadPageCount() {
    axios.get("http://localhost:8080/admin/fpost/get_fp_page_count").then(res => {
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
    axios.get("http://localhost:8080/admin/fpost/get_fp_by_page", {
        params: {
            pageNo: pgn
        }
    }).then(res => {
        let payload = res.data;
        if (payload.state == 200) {
            let data = payload.data;
            let arr = fpList.value;
            arr.push.apply(arr, data);
            fpList.value = arr;
            return true;
        }
        else {
            alert(payload.state);
            return false;
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
    load(loadedPage.value+1)
    loadedPage.value = loadedPage.value + 1;

}



function disPlay(id)
{
    axios.get("http://localhost:8080/admin/fpost/get_one",{
        params:{
            fid:id
        }
    }).then(res=>{
        let payload=res.data;
        if(payload.state==200)
        {
            currentFpc.value=payload.data;
        }
        else
        {
            alert(payload.message)
        }
    }).catch(error=>{
        alert('OOPS!');
    })
}


onMounted(()=>{
    loadPageCount();
    load(1);
    loadedPage.value=1;
})

</script>
<template>
    <div id="item-container" class="on-surface-text">
        <ReplyPreviewCard :fopsts="fpList" @selected="disPlay(id)"></ReplyPreviewCard>
        <div class="load-more">
            <md-filled-button v-show="loadedPage + 1 <= pageCount" @click="loadMore">撩我加载更多哟~mua！</md-filled-button>
            <div v-show="loadedPage + 1 > pageCount">矮油，没有更多内容内~</div>
        </div>
        <ViewReply :fopst="currentFpc" @on-close="open=false"></ViewReply>
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