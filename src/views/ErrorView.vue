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

let route = useRoute();
let router = useRouter();

function toLgoin()
{
    router.replace('/');
}

</script>
<template>
    <div id="item-container" class="on-surface-text">
        <img src="../assets/error.png" width="200px" height="200px">
        <h1>您还没有登陆，暂时不能使用此功能</h1>
        <md-filled-button @click="toLgoin">去登陆</md-filled-button>
    </div>
</template>
<style scoped>
#item-container{
    margin: 10px;
    text-align: center;
}
</style>