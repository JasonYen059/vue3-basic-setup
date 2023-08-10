<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const breadcrumbList = ref([])

const isHome = () => {
    return route.name === 'home'
}

const getBreadcrumbs = () => {
    let matched = route.matched
    console.log(matched);
    if (matched.some(p => p.name === 'ErrorPage')) breadcrumbList.value = [];
    else {
        if (!isHome()) {
            let filtPath = matched.filter(p => p.name);
            matched = [{ path: '/', meta: { title: '首頁' } }].concat(filtPath)
        }
        breadcrumbList.value = matched
    }
}
watch(route, () => {
    getBreadcrumbs()
})
onMounted(() => {
    getBreadcrumbs()
})
</script>

<template>
    <a-breadcrumb>
        <a-breadcrumb-item v-for="bread in breadcrumbList" :key="bread.name">
            <a :href="bread.path">{{ bread.meta.title }}</a>
        </a-breadcrumb-item>
    </a-breadcrumb>
</template>
