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

let props = defineProps({
    isOpen: Boolean,
    url: {
        type: String,
        default: ''
    },
    which: {
        type: Number,
        default: -1
    }
});

let emit=defineEmits(['on-close'])

function ok() {
    emit('on-close');
}

</script>
<template>
    <div id="item-container">
        <Teleport to="body">
            <md-dialog id="edit-dig" :open="isOpen" v-show="props.isOpen">
                <div slot="headline" class="surface-variant">
                    <div class="on-surface-variant-text" style="margin: 20px;">
                        查看图片
                    </div>
                </div>
                <div slot='content' class="surface-variant" style="padding: 20px;">
                    <div class="surface-variant" style="height: 100%;">
                        <form id="form-id" method="dialog">
                            <div v-if="which == 0">
                                <img :src="'http://localhost:8080' + url" alt="解析图片出现问题" class="img-frame">
                            </div>
                            <div v-if="which == 1">
                                <video :src="'http://localhost:8080' + url" alt="解析视频出现问题" class="img-frame">
                                </video>
                            </div>
                        </form>
                    </div>
                </div>

                <div slot="actions" class="surface-variant" style="text-align: right;">
                    <div class="on-surface-variant-text" style="margin: 20px;">
                        <md-text-button @click="ok">关闭</md-text-button>
                    </div>
                </div>
            </md-dialog>
        </Teleport>
    </div>
</template>
<style scoped>
.img-frame{
    width: 80%;
}
</style>