<script setup>
import router from '@/router';
import UserInfoModal from './UserInfoModal.vue';
import { useModalStore } from '../../../../stores/modalState';

const modalState = useModalStore();

const groupCodeSelect = ref('name');
const searchTitle = ref('');
const deleteInfoCheck = ref(false);

const handleCheck = () => {
    deleteInfoCheck.value = !deleteInfoCheck.value;
    handlerSearch();
};
const handlerSearch = () => {
    const query = [];
    query.push(`inforAll=${deleteInfoCheck.value ? 1 : 0}`);
    !groupCodeSelect.value ||
        query.push(`groupCodeSelect=${groupCodeSelect.value}`);
    !searchTitle.value || query.push(`searchTitle=${searchTitle.value}`);
    const queryString = query.length > 0 ? `?${query.join('&')}` : '';

    router.push(queryString);
};

onMounted(() => {
    window.location.search && router.replace(window.location.pathname);
});
</script>
<template>
    <div class="search-box">
        <UserInfoModal v-if="modalState.modalState" />
        <!-- v-model을 이용하여 양방향 바인딩을 쉽게 할 수 있다. -->
        <select v-model="groupCodeSelect">
            <option value="name">직원명/성명</option>
            <option value="manager">담당자</option>
            <option value="userClass">담당업무</option>
        </select>
        <input v-model.lazy="searchTitle" />
        삭제된 정보 표시
        <input type="checkbox" @click="handleCheck" />
        <!-- v-on:click="" 또는 @click=""으로 이벤트를 설정한다. -->
        <button @click="handlerSearch">검색</button>
        <button @click="modalState.modalState = !modalState.modalState">
            등록
        </button>
    </div>
</template>
<style lang="scss" scoped>
.search-box {
    margin-bottom: 10px;
    display: block;
    float: inline-end;
}

input {
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
select {
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
    width: 120px;
    text-align: center;
}
</style>
