<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import TopSalesChart from './TopSalesChart.vue';

const route = useRoute();
const topSalesList = ref();
const chartFlag = ref(false);
const chartData = ref();

const searchList = () => {
    chartFlag.value = false;
    axios
        .post('/api/sales/topSalesListBody.do', {
            ...route.query,
            pageSize: 10,
        })
        .then(res => {
            const startCount = res.data.topSalesList.length;
            if (res.data.topSalesList.length > 0) {
                chartData.value = [];
                for (let i = 0; i < startCount; i++) {
                    chartData.value.push({
                        supplierName: res.data.topSalesList[i].supplierName,
                        currentRank: res.data.topSalesList[i].currentRank,
                        performance: res.data.topSalesList[i].performance,
                        previousRank: res.data.topSalesList[i].previousRank,
                    });
                }
                chartFlag.value = true;
            }
            topSalesList.value = res.data;
            for (let i = 0; i < startCount; i++) {
                let changeLank = '-';
                let upDown = '';
                const cLank = topSalesList.value.topSalesList[i].currentRank;
                const pLank = topSalesList.value.topSalesList[i].previousRank;
                const change = Math.abs(pLank - cLank);
                if (pLank !== 0 && pLank > cLank) {
                    changeLank = `${change}↑`;
                    upDown = 'UP';
                } else if (pLank !== 0 && pLank < cLank) {
                    changeLank = `${change}↓`;
                    upDown = 'DOWN';
                }
                topSalesList.value.topSalesList[i] = {
                    ...topSalesList.value.topSalesList[i],
                    changeLank: changeLank,
                    upDown: upDown,
                };
            }
            for (let i = startCount; i < 10; i++) {
                topSalesList.value.topSalesList.push({
                    currentRank: '-',
                    supplierName: '-',
                    performance: '-',
                });
            }
        });
};

const addClass = flag => {
    let addClass = '';
    if (flag) {
        flag === 'UP' ? (addClass = 'up') : (addClass = 'down');
        return addClass;
    }
};

watch(() => route.query, searchList);
onMounted(() => {
    searchList();
});
</script>
<template>
    <div class="topsales">
        <table>
            <colgroup>
                <col width="20%" />
                <col width="40%" />
                <col width="40%" />
            </colgroup>
            <thead>
                <tr>
                    <th>순위</th>
                    <th>기업고객명</th>
                    <th>매출액</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="topSalesList">
                    <tr
                        v-for="(list, index) in topSalesList.topSalesList"
                        :key="index"
                        :class="{ even: index % 2 === 1 }"
                    >
                        <td>
                            {{ list.currentRank
                            }}<span
                                v-if="list.currentRank !== '-'"
                                :class="addClass(list.upDown)"
                            >
                                ({{ list.changeLank }})</span
                            >
                        </td>
                        <td>{{ list.supplierName }}</td>
                        <td>{{ list.performance.toLocaleString('ko-KR') }}</td>
                    </tr>
                </template>
            </tbody>
        </table>
        <div class="chart_div">
            <template v-if="chartFlag">
                <TopSalesChart v-if="chartFlag" :dataSet="chartData" />
            </template>
            <template v-else>
                <img src="../../../../assets/noSalesImg2.png" />
            </template>
        </div>
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
.topsales {
    width: 100%;
    display: flex;
}
.chart_div {
    width: 600px;
    margin-top: 55px;

    img {
        width: 100%;
        margin-left: 10px;
    }
}
.even {
    background-color: #f5f5f5;
}
.up {
    color: #2676bf;
}
.down {
    color: #d83f3f;
}
</style>
