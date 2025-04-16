<script setup>
import router from '@/router';
import axios from 'axios';
import { onMounted } from 'vue';

const searchYear = ref();
const searchMonth = ref();
const monthArray = ref([]);
const yearArray = ref([]);
const minYear = ref();

const today = new Date();

searchYear.value = today.getFullYear();
searchMonth.value = today.getMonth() + 1;

for (let i = 1; i < 13; i++) {
    monthArray.value.push(i);
}

const handlerSearch = () => {
    const query = [];
    !searchYear.value || query.push(`searchYear=${searchYear.value}`);
    !searchMonth.value || query.push(`searchMonth=${searchMonth.value}`);
    const queryString = query.length > 0 ? `?${query.join('&')}` : '';

    router.push(queryString);
};
onMounted(() => {
    axios.post('/api/sales/selectDateJson').then(res => {
        minYear.value = res.data.minYear;
        if (minYear.value === searchYear.value) {
            yearArray.value = [searchYear.value];
        } else {
            for (let i = 0; i <= searchYear.value - minYear.value; i++) {
                yearArray.value.push(i + minYear.value);
            }
        }
        handlerSearch();
    });
    window.location.search && router.replace(window.location.pathname);
});
</script>
<template>
    <div class="search-box">
        조회 년월:
        <template v-if="yearArray.length > 0">
            <select v-model="searchYear">
                <option>년도</option>
                <option v-for="year in yearArray" :key="year" :value="year">
                    {{ year }}년
                </option>
            </select>
        </template>
        <select v-model="searchMonth" v-if="monthArray">
            <option>년월</option>
            <option v-for="month in monthArray" :key="month" :value="month">
                {{ month }}월
            </option>
        </select>

        <button @click="handlerSearch">검색</button>
    </div>
</template>

<style lang="scss" scoped>
.search-box {
    margin-bottom: 10px;
    display: block;
    float: inline-end;
}

input,
select {
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 5px;
    margin-right: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
}

button {
    text-align: center;
    text-decoration: none;
    display: inline-block;
    border: none;
    color: white;
    width: 70px;
    padding-top: 8px;
    padding-bottom: 8px;
    font-size: 12px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 12px;
    box-shadow: 0 4px #999;
    background-color: #3bb2ea;

    &:hover {
        background-color: #45a049;
    }

    &:active {
        background-color: #3e8e41;
        box-shadow: 0 2px #666;
        transform: translateY(2px);
    }
}
</style>
