<script setup>
import { ref } from 'vue';
import CommonCodeMain from '../../components/page/Management/CommonCode/CommonCodeMain.vue';
import CommonCodeSearch from '../../components/page/Management/CommonCode/CommonCodeSearch.vue';

const isClick = ref(false);
</script>

<template>
    <ContextBox>공통코드관리</ContextBox>
    <CommonCodeSearch />
    <CommonCodeMain />
    <div style="margin-top: 36px;">
        <ContextBox>상세코드관리</ContextBox>
        <CommonCodeSearch />
        <CommonCodeMain />
    </div>
</template>