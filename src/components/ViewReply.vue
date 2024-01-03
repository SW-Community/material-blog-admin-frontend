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
import '@material/web/dialog/dialog.js';
import '@material/web/checkbox/checkbox.js';

import axios from 'axios'
axios.defaults.withCredentials = true;

let props=defineProps({
    isOpen:Boolean,
    fopst:Object
});

let emit=defineEmits(['on-close']);


let fpc=ref('');

function ok()
{
    emit('on-close');
}
</script>
<template>
    <div id="item-container">
        <Teleport to="body">
            <md-dialog id="edit-dig" :open="props.isOpen" v-show="props.isOpen">
                <div slot="headline" class="surface-variant">
                    <div class="on-surface-variant-text" style="margin: 20px;">
                        查看回复内容
                    </div>
                </div>
                <div slot='content' class="surface-variant" style="padding: 20px;">
                    <div class="surface-variant" style="height: 100%;">
                        <form id="form-id" method="dialog">
                            {{ props.fopst.fpostContent }}
                        </form>
                    </div>
                </div>

                <div slot="actions" class="surface-variant" style="text-align: right;">
                    <div class="on-surface-variant-text" style="margin: 20px;">
                        <md-text-button form="form-id" @click="ok()">关闭</md-text-button>
                    </div>
                </div>
            </md-dialog>
        </Teleport>
    </div>

</template>
<style scoped>
#item-container{
    text-align: center;
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