<script setup>
import { reactive, ref } from 'vue';

defineProps({
  menuList: {
    type: Array,
    default: () => []
  }
})

const selectedKeys = ref(['1']);

const iconMapList = reactive({
  feature: 'UserOutlined',
  system: 'MailOutlined'
})

</script>

<template>
  <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
    <a-sub-menu v-for="menu in menuList" :key="menu.funcId">
      <template #icon>
        <component :is="$antIcons[iconMapList[menu.funcId]]" />
      </template>
      <template #title>{{ menu.funcName }}</template>
      <a-menu-item v-for="child in menu.funcChild" :key="child.funcId">
        <router-link :to="`/${menu.funcId}/${child.funcId}`">{{ child.funcName }}</router-link>
      </a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>