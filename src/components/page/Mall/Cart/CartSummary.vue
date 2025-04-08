<script setup>

</script>

<template>
    <div class="summary-main">
        <div class="summary-container">
            <span class="totTitle">장바구니 총액</span><br>
            <hr>
            <div>
                <span >전체 금액: </span> 
                <label>0</label> <label>원</label> 
            </div>
            <div>
                <span>선택 금액: </span> 
                <label>0</label> <label>원</label>
            </div>
            <div>
                <button>주문</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.summary-main{
    margin-top: 32px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
} 

.summary-container{
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 5px;
    gap:4px;
}

hr{
    width: 100%;
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