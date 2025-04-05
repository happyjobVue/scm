<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useModalStore } from '../../../../stores/modalState';
import UserInfoModal from './UserInfoModal.vue';

const modalState = useModalStore();

const route = useRoute();
const userInfoList = ref();
const cPage = ref(1);
const loginId = ref(0);

const searchList = () => {
    const param = new URLSearchParams({
        ...route.query,
        pageSize: 8,
        currentPage: cPage.value,
        inforAll: route.query.inforAll === undefined ? 0 : route.query.inforAll,
    });

    axios.post('/api/management/userInfoListBody.do', param).then(res => {
        userInfoList.value = res.data;
    });
};

const openModal = id => {
    loginId.value = id;
    modalState.modalState = !modalState.modalState;
};

const onPostSuccess = () => {
    modalState.modalState = !modalState.modalState;
    searchList();
};

watch(
    () => route.query,
    () => {
        cPage.value = 1;
        searchList();
    }
);
onMounted(() => {
    searchList();
});
</script>
<template>
    <div>
        <UserInfoModal
            v-if="modalState.modalState"
            :id="loginId"
            @modalClose="loginId = $event"
            @postSuccess="onPostSuccess"
        />
        <table>
            <colgroup>
                <col width="15%" />
                <col width="15%" />
                <col width="15%" />
                <col width="15%" />
                <col width="20%" />
                <col width="10%" />
                <col width="10%" />
            </colgroup>
            <thead>
                <tr>
                    <th scope="col">구분</th>
                    <th scope="col">성명</th>
                    <th scope="col">담당업무</th>
                    <th scope="col">담당자명</th>
                    <th scope="col">연락처</th>
                    <th scope="col">회원상태</th>
                    <th scope="col">비고</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="userInfoList">
                    <template v-if="userInfoList.userInfoCnt > 0">
                        <tr
                            v-for="userInfo in userInfoList.userInfo"
                            :key="userInfo.loginID"
                        >
                            <td>{{ userInfo.detailCode }}</td>
                            <td>{{ userInfo.name }}</td>
                            <td>{{ userInfo.userClass }}</td>
                            <td>{{ userInfo.manager }}</td>
                            <td>{{ userInfo.hp }}</td>
                            <td>{{ userInfo.statusYn === '1' ? 'Y' : 'N' }}</td>
                            <td>
                                <button @click="openModal(userInfo.loginID)">
                                    수정
                                </button>
                            </td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr>
                            <td colspan="4">일치하는 검색 결과가 없습니다</td>
                        </tr>
                    </template>
                </template>
            </tbody>
        </table>
        <Pagination
            :totalItems="userInfoList?.userInfoCnt"
            :items-per-page="8"
            :max-pages-shown="5"
            :onClick="searchList"
            v-model="cPage"
        />
    </div>
</template>

<style lang="scss" scoped>
table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0px 0px 0px;
    font-size: 18px;
    text-align: left;

    th,
    td {
        padding: 8px;
        text-align: left;
        border-bottom: 1px solid #ddd;
        text-align: center;
    }

    th {
        background-color: #2676bf;
        color: #ddd;
    }

    /* 테이블 올렸을 때 */
    tbody tr:hover {
        background-color: #d3d3d3;
        opacity: 0.9;
        // cursor: pointer;
    }
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
