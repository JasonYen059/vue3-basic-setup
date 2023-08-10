<script setup>
import { computed, ref } from 'vue';
import { RouterView } from 'vue-router'
import SideBar from '../components/SideBar.vue';
import Breadcrumb from '../components/Breadcrumb.vue';
import { getFunctions, getNoticeMessage } from '../api/base.js';

const collapsed = ref(false);

const noticeMsg = ref([]);
const menuList = ref([]);
const msgNum = computed(() => noticeMsg.value.length);
const visible = ref(false);
const modalType = ref('msg');

const handleMenuClick = (e) => {
    console.log('click', e);
    modalType.value = e.key;
    visible.value = true
}
const handleOk = () => {
    //do something
    visible.value = false
}

const loadFunc = async () => await getFunctions();
const loadNoticeMsg = async () => await getNoticeMessage();

const promises = [
    loadFunc(), loadNoticeMsg()
]

const iniStatus = () => {
    Promise.all(promises)
        .then(res => {
            menuList.value = res[0].data;
            noticeMsg.value = res[1].data;
        })
        .catch(err => console.log(err))
}
iniStatus();
</script>

<template>
    <a-layout class="layout">
        <a-layout-sider v-model:collapsed="collapsed" collapsedWidth="0" :trigger="null" collapsible>
            <div class="logo">
                <img src="/echouse-LOGO.png" alt="logo">
            </div>
            <SideBar :menuList="menuList" />
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0">
                <a-row type="flex" justify="space-between" align="middle" class="layout-header">
                    <a-col>
                        <menu-unfold-outlined v-if="collapsed" class="trigger" @click="collapsed = !collapsed" />
                        <menu-fold-outlined v-else class="trigger" @click="collapsed = !collapsed" />
                    </a-col>
                    <a-col>
                        <a-dropdown :trigger="['click']">
                            <a-row type="flex" @click.prevent style="cursor: pointer;">
                                <a-badge :count="msgNum">
                                    <a-avatar>
                                        <template #icon>
                                            <UserOutlined />
                                        </template>
                                    </a-avatar>
                                </a-badge>
                            </a-row>
                            <template #overlay>
                                <a-menu @click="handleMenuClick">
                                    <a-menu-item key="msg"><bell-outlined /> 訊息通知 <a-badge :count="msgNum" /></a-menu-item>
                                    <a-menu-divider />
                                    <a-menu-item key="setting"><setting-outlined /> 個人設定</a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </a-col>
                </a-row>
            </a-layout-header>
            <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff' }">
                <Breadcrumb />
                <router-view></router-view>
            </a-layout-content>
        </a-layout>
    </a-layout>
    <a-modal v-model:visible="visible" :title="modalType === 'msg' ? '訊息通知' : '個人設定'" centered
        :bodyStyle="{ maxHeight: '70vh', overflow: 'scroll' }" @ok="handleOk">
        <template v-if="modalType === 'msg'">
            <div v-for="msg in noticeMsg" :key="msg.title" class="msg-item">
                <h3>{{ msg.title }}</h3>
                <small>{{ msg.description }}</small>
            </div>
        </template>
        <template v-else>
            Setting stuff
        </template>

    </a-modal>
</template>

<style lang="less" scoped>
.layout-header {
    padding: 0 3em;
}

.logo {
    width: 100%;
    height: 64px;
    background: white;
    display: grid;
    place-items: center;
    padding: 10px;

    img {
        width: 100%;
        height: auto;
    }
}

.msg-item {
    border-bottom: 1px solid rgb(196, 192, 192);
    padding: 10px 0;

    h3 {
        margin-bottom: 0;
    }
}
</style>

