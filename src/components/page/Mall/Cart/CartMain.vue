<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';


const cartList = ref({});

const searchList = () => {
    axios.post('/api/mall/cartDetailList.do',{}).then(res => {
        console.log(res.data)
        cartList.value = res.data;
    })
}

onMounted(() => {
    searchList();
})

</script>

<template>
    <div>
        <div>
            <table class="col">
                <colgroup>
                    <col width="10%">
                    <col width="10%">
                    <col width="20%">
                    <col width="10%">
                    <col width="10%">
                    <col width="10%">
                    <col width="20%">
                    <col width="10%">
                </colgroup>

                <!-- 리스트 제목행 -->
                <thead>
                    <tr>
                        <th scope="col">선택</th>
                        <th scope="col">제품 사진</th>
                        <th scope="col">제품명</th>
                        <th scope="col">가격</th>
                        <th scope="col">수량</th>
                        <th scope="col">총금액</th>
                        <th scope="col">납품 희망일자</th>
                        <th scope="col">삭제</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="cartList">
                        <template v-if="cartList.cartCnt > 0">
                            <tr
                            v-for="cart in cartList.cartDetailWithImage"
                            :key="cart.cartDetail.cartdetailId"
                            >
                                <td>
                                    <input type="checkbox">
                                </td>
                                <td></td>
                                <td>{{ cart.cartDetail.name }}</td>
                                <td>{{ cart.cartDetail.price }}</td>
                                <td>
                                    <input type="number"
                                    v-model="cart.cartDetail.count"
                                    min="1"
                                    style="width: 36px;"
                                    >
                                </td>
                                <td>{{ cart.cartDetail.price*cart.cartDetail.count }}</td>
                                <td>
                                    <input type="date"
                                            v-model="cart.cartDetail.requestedDeliveryDate"
										    />
                                </td>
                                <td><button>삭제</button></td>
                            </tr>
                        </template>
                        <template v-else>
                            <td colspan="8">장바구니에 담긴 제품이 없습니다</td>
                        </template>
                    </template>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
.td-hover {
    cursor: pointer;
    transition: color 0.3s ease;
    font-weight: bold;
}
.td-hover:hover {
  text-decoration: underline;
  color: #fe1414;
}

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