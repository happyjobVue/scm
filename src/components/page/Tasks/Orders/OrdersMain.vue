<script setup>
import axios from 'axios';
import { onMounted, watch } from 'vue';
import Pagination from '../../../common/Pagination.vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const orderList = ref({});

const cPage = ref(1);
const searchOrderList = () => {
    const param = new URLSearchParams({
        ...route.query,
        currentPage: cPage.value,
        pageSize: 5,
    });
    axios.post('/api/tasks/orderListBody.do', param).then(res => {
        orderList.value = res.data;
    });
};
55;

onMounted(() => {
    searchOrderList();
});

watch(() => route.query, searchOrderList);
</script>
<template>
    <div class="divOrderList">
        <table>
            <colgroup>
                <col width="20%" />
                <col width="30%" />
                <col width="20%" />
                <col width="20%" />
                <col width="10%" />
            </colgroup>
            <thead>
                <tr>
                    <th>제품번호</th>
                    <th>제품명</th>
                    <th>발주업체명</th>
                    <th>날짜</th>
                    <th>개수</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="orderList">
                    <template v-if="orderList.orderCnt > 0">
                        <tr
                            v-for="order in orderList.orderList"
                            :key="order.orderId"
                        >
                            <td>{{ order.productNumber }}</td>
                            <td>{{ order.productName }}</td>
                            <td>{{ order.supplyName }}</td>
                            <td>{{ order.orderDate }}</td>
                            <td>{{ order.count }}</td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr>
                            <td colspan="5">데이터가 존재하지 않습니다.</td>
                        </tr>
                    </template>
                </template>
            </tbody>
        </table>
        <Pagination
            :totalItems="orderList?.orderCnt || 0"
            :itemsPerPage="5"
            :maxPagesShown="5"
            :onclick="searchOrderList"
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
        cursor: pointer;
    }
}
</style>
