<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

const shoppingReturnList = ref({});

const searchShoppingReturn = () => {
    axios
        .post('/api/tasks/shoppingReturnOrderListBody.do', {
            searchKeyword: '',
            searchStDate: '',
            searchEdDate: '',
            currentPage: 1,
            pageSize: 5,
        })
        .then(res => {
            shoppingReturnList.value = res.data;
        });
};

onMounted(() => {
    searchShoppingReturn();
});
</script>
<template>
    <div class="divShoppingReturn">
        <table>
            <colgroup>
                <col width="14%" />
                <col width="15%" />
                <col width="14%" />
                <col width="14%" />
                <col width="14%" />
                <col width="15%" />
                <col width="14%" />
            </colgroup>
            <thead>
                <tr>
                    <th>번호</th>
                    <th>제품명</th>
                    <th>단가</th>
                    <th>개수</th>
                    <th>총 금액</th>
                    <th>처리상태</th>
                    <th>날짜</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{}}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<style></style>
