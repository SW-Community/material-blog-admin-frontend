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

let props = defineProps({
    fopsts: Array
});

let emit=defineEmits(['selected'])

function deleteF(fid) {
    if (confirm("Are you sure to delete this?")) {
        axios.post("http://localhost:8080/admin/fpost/delete", {
            id: fid
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

axios.defaults.withCredentials = true;
</script>
<template>
    <div id="item-container">
        <table id="tab">
            <tr>
                <th>选择</th>
                <th>ID</th>
                <th>主贴ID</th>
                <th>主贴标题</th>
                <th>发布人</th>
                <th>回复发表时间</th>
                <th>楼层</th>
                <th>引用楼层</th>
                <th>操作</th>
            </tr>
            <tr v-for="fpost in props.fopsts">
                <td>
                    <md-checkbox touch-target="wrapper"></md-checkbox>
                </td>
                <td>{{ fpost.fpostID }}</td>
                <td>{{ fpost.mpostID }}</td>
                <td>{{ fpost.mpostTitle }}</td>
                <td>{{ fpost.userName }}</td>
                <td>{{ fpost.fpostTime }}</td>
                <td>{{ fpost.ffloor }}</td>
                <td>{{ fpost.refloor }}</td>
                <td>
                    <md-text-button @click="emit('selected',fpost.fpostID)">查看详细信息</md-text-button>
                    <md-filled-button style="width: 60px;" @click="deleteF(fpost.fpostID)">删除</md-filled-button>
                </td>
            </tr>
        </table>
    </div>
</template>
<style scoped>
#table {
    width: 100%;
}
</style>