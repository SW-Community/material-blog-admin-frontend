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


import axios from 'axios';
axios.defaults.withCredentials = true;
let currentAdminID = inject('currentAdminID');
let currentAdminName = inject('currentAdminName');

let emit = defineEmits(['on-close']);

let props = defineProps({
    //todo: 开放更多自定义选项

    isOpen: Boolean,
    mpostID: String,
    //topicID: Number,
    userID: Number,
    //userName: String,
    //profile: String,
    mpostTitle: String,
    //mpostTime: Date,
    //mpostIP: String,
    mpostContent: String,
    //lastFoTime: Date,
    //likeNum: Number,
    //floorNum: Number,
})

let mpID = ref("props.mpostID");
let mpTitle = ref("props.mpostTitle");
let mpContent = ref("props.mpostContent");
let uid = ref("props.userID");


function send()
{
    axios.post("http://localhost:8080/admin/mpost/update",{
        userID:uid.value,
        mpostID:mpID.value,
        mpostTitle:mpTitle.value,
        mpostContent:mpContent.value
    },{
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(res=>{
        let payload=res.data;
        if(payload.state==200)
        {
            alert('DONE!')
        }
        else
        {
            alert(payload.message);
        }
    }).catch(error=>{
        alert('OOPS!')
    })
}

function ok() {
    send();
    emit("on-close");
}


function cancel() {

    emit("on-close");
}

onMounted(()=>{
    mpID.value=props.mpostID;
    mpTitle.value=props.mpostTitle;
    mpContent.value=props.mpostContent;
    uid.value=props.userID;
})

</script>
<template>
    <div id="item-container">
        <Teleport to="body">
            <md-dialog id="edit-dig" :open="props.isOpen" v-show="props.isOpen">
                
                <div slot="headline" class="surface-variant">
                    <div class="on-surface-variant-text" style="margin: 20px;">
                        编辑帖子
                    </div>
                    
                </div>
                <div slot='content' class="surface-variant" style="padding: 20px;">
                    <div class="surface-variant" style="height: 100%;">
                        <form id="form-id" method="dialog">
                            <md-outlined-text-field label="标题" maxlength="30" v-model="mpTitle" style="width: 100%;"></md-outlined-text-field>
                            <br>
                            <br>
                            <md-outlined-text-field label="内容" maxlength="500" type="textarea" v-model="mpContent" style="width: 100%;"></md-outlined-text-field>
                        </form>
                    </div>
                </div> 
                <div slot="actions" class="surface-variant" style="text-align: right;">
                    <div class="on-surface-variant-text" style="margin: 20px;">
                        <md-text-button form="form-id" @click="cancel()">取消</md-text-button>
                        <md-text-button form="form-id" @click="ok()">确认</md-text-button>
                    </div>
                </div>
            </md-dialog>
        </Teleport>

    </div>
</template>
<style scoped>
#item-container {
    margin: 10px;
    padding: 10px;
}

#edit-dig {
    padding: 30px;
    position : fixed;
	left : 50%;
	top : 50%;
    width: 80%;
    height: 80%;
	transform: translate(-50%, -50%);
    z-index: 9999999999;
}
</style>