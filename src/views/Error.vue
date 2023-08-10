<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();

const statusMap = {
  401: { text: '登入逾時 / 錯誤', link: { text: '重新登入', href: '/login' } },
  403: { text: '該權限無法訪問網址', link: { text: '返回首頁', href: '/' } },
  404: { text: 'Oops, This Page Not Found!', link: { text: '返回首頁', href: '/' } }
}
const status = computed(() => statusMap[route.name])

</script>

<template>
  <main>
    <h2>{{ route.name }}</h2>
    <p>{{ status.text }}</p>
    <a-button type="primary" :href="status.link.href">{{ status.link.text }}</a-button>
  </main>
</template>

<style lang="less" scoped>
main{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2{
    font-size: 50px;
    font-weight: 700;
    line-height: 1;
    font-family:Verdana, Geneva, Tahoma, sans-serif;
  }
  p{
    font-size: 18px;
    color: gray;
  }
}
</style>
