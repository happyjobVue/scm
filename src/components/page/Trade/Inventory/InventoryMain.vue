<script setup>

</script>

<template>
  <div class="divInventory">
    <table>
        <colgroup>
            <col width="30%" />
            <col width="30%" />
            <col width="30%" />
            <col width="10%" />
        </colgroup>
        <thead>
            <tr>
                <th scope="col">제품명</th>
                <th scope="col">제조사명</th>
                <th scope="col">창고명</th>
                <th scope="col">현재재고</th>
            </tr>
        </thead>
        <tbody>
            <template>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </template>
        </tbody>
    </table>
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
