<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import ProductInfoModal from './ProductInfoModal.vue';
import { useModalStore } from '../../../../stores/modalState';

const modalState = useModalStore();
const productInfoList = ref({});
const route = useRoute();
const cPage = ref(1);

const searchList = () => {
    const {searchKeyword = '', searchOption = 'searchAll'} = route.query;
    const param = new URLSearchParams({
        searchKeyword: searchKeyword
        , searchOption: searchOption
        , currentPage: cPage.value
        , pageSize: 5
    });
    axios.post('/api/management/productListBody.do', param)
    .then(res => {
        productInfoList.value = res.data;
        console.log(productInfoList.value)
    });
};

const onPostSuccess = () =>{
    searchList();
}

onMounted(() => {
    searchList();
});

watch(() => route.query, searchList);

</script>

<template>
    <ProductInfoModal 
    v-if="modalState.modalState"
    @postSuccess="onPostSuccess()"
    />
    <div>
        <table style="width: 100%;">
            <colgroup>
                <col style="width: 15%;"> <!-- 제품번호 -->
                <col style="width: 25%;"> <!-- 제품명 -->
                <col style="width: 25%;"> <!-- 납품업체 -->
                <col style="width: 15%;"> <!-- 판매가 -->
            </colgroup>
            <thead>
                <tr>
                    <th scope="col">제품번호</th>
                    <th scope="col">제품명</th>
                    <th scope="col">납품업체</th>
                    <th scope="col">판매가</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="productInfoList">
                    <template v-if="productInfoList.productCnt > 0">
                        <tr v-for="productInfo in productInfoList.productList"
                        :key="productInfo.productId">
                            <td>{{ productInfo.productNumber }}</td>
                            <td>{{ productInfo.name }}</td>
                            <td>{{ productInfo.supplier }}</td>
                            <td>{{ productInfo.sellPrice }}</td>
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
        <!-- 페이징 처리  -->
        <Pagination 
            :totalItems = "productInfoList?.productCnt"
            :items-per-page="5"
            :max-pages-shown="5"
            :onClick="searchList"
            v-model="cPage"
        />   
    </div>

</template>

<style scoped>

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