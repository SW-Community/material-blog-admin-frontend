<script setup>
import { ref, onMounted, computed, watch, inject, provide } from 'vue'
import { RouterLink, RouterView, useLink, useRoute, useRouter } from 'vue-router'
import axios from 'axios';
import PostCard from '@/components/PostCard.vue';
import EditPost from '@/components/EditPost.vue';

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

let amid=route.params.mid;

let mpost=ref({});
let imgList=ref([]);

let open=ref(false);

function fetch()
{
    //alert(amid)
    axios.get("http://localhost:8080/admin/mpost/get_one",{
        params:{
            mid:amid
        }
    }).then(res=>{
        let payload=res.data;
        if(payload.state==200)
        {
            //alert("???")
            mpost.value=payload.data
            //加载图像
            axios.get("http://localhost:8080/admin/postimg/get_by_pid",{
                params:{
                    pid:amid
                }
            }).then(res=>{
                let payload=res.data;
                if(payload.state==200)
                {
                    imgList.value=payload.data;
                }
            }).catch(error=>{
                alert('OOPS!')
            })
        }
        else{
            alert(payload.message);
        }
    }).catch(error=>{
        alert('oops')
    })
}
fetch();


function openEdit()
{
    //alert("")
    open.value=true;
}


onMounted(()=>{
    //fetch();
})

</script>
<template>
    <div id="item-container" class="on-surface-text">
        <PostCard 
            :mpost-i-d="mpost.mpostID"
            :topic-i-d="mpost.topicID"
            :user-i-d="mpost.userID"
            :user-name="mpost.userName"
            :profile="mpost.profile"
            :mpost-content="mpost.mpostContent"
            :mpost-time="mpost.mpostTime"
            :mpost-title="mpost.mpostTitle"
            :mpost-i-p="mpost.mpostIP"
            :like-num="mpost.likeNum"
            :last-fo-time="mpost.lastFoTime"
            :floor-num="mpost.floorNum"
            :img-list="imgList">
        </PostCard>
        <div id="eidt-controls">
            <md-filled-button @click="openEdit()">编辑</md-filled-button>
            <md-text-button>删除</md-text-button>
        </div>
        <EditPost 
            :is-open="open"
            :mpost-i-d="mpost.mpostID"
            :user-i-d="mpost.userID"
            :mpost-content="mpost.mpostContent"
            :mpost-title="mpost.mpostTitle"
            @on-close="open=false">
        </EditPost>
    </div>
</template>
<style scoped>
#item-container{
    margin: 5px;
}
#eidt-controls{
    text-align: center;
}
.img-control-panel {
    float: right;
}

#del-popup {
    float: right;
}

#mid-area {
    margin: 10px;
}

.img-frame {
    width: 85%;
}
</style>