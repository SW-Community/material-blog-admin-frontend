<script setup>
import { ref, onMounted, computed, watch, inject, provide } from 'vue'
import { RouterLink, RouterView, useLink, useRoute, useRouter } from 'vue-router'
import PostPreviewCard from '@/components/PostPreviewCard.vue';

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

let currentAdminID = inject('currentAdminID');
let currentAdminName = inject('currentAdminName');



let mpList = ref([]);


let loadedPage = ref(0);
let pageCount = ref(0);


function loadAllPageCount() {
    axios.get("http://localhost:8080/admin/mpost/get_mp_page_count").then(res => {
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

function loadAll(pgn) {
    axios.get("http://localhost:8080/admin/mpost/get_mp_by_page", {
        params: {
            pageNo: pgn
        }
    }).then(res => {
        let payload = res.data;
        if (payload.state == 200) {
            let data = payload.data;
            let arr = mpList.value;
            arr.push.apply(arr, data);
            mpList.value = arr;
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
function loadAllMore() {
    if (loadedPage.value + 1 > pageCount.value) {
        //没有了  
        alert('矮油，没有更多了捏~');
        return;
    }
    loadAll(loadedPage.value+1)
    loadedPage.value = loadedPage.value + 1;

}

//============================================

//todo:增加视图
function loadAUserPageCount() {}
function loadAUser(pgn) {}
function loadAUserMore() {}

onMounted(() => {
    let uid = route.params.uid;
    if (uid != null && uid.length != 0) {
        //todo：按用户筛选
    }
    else {
        //alert("没有");

        axios.get("http://localhost:8080/admin/mpost/get_mp_page_count").then(res => {
            let payload = res.data;
            if (payload.state == 200) {
                //alert(payload.data)
                pageCount.value = payload.data;
                //alert(pageCount.value)
            }
            else {
                alert('!')
                return
            }
        }).catch(error => {

            alert('OOPS');
            return;
        });

        loadAll(1);
        loadedPage.value=1;
    }
})

</script>
<template>
    <div id="#item-container" class="on-surface-text">
        <PostPreviewCard :mposts="mpList"></PostPreviewCard>
        <div class="load-more">
            <md-filled-button v-show="loadedPage + 1 <= pageCount" @click="loadMore">撩我加载更多哟~mua！</md-filled-button>
            <div v-show="loadedPage + 1 > pageCount">矮油，没有更多内容内~</div>
        </div>
    </div>
</template>
<style scoped>
#item-container{
    margin:5px;
}
.load-more{
    text-align: center;
    margin: 10px;
}
</style>