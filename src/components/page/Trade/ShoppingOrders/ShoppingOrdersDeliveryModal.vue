<script setup>
import { useModalStore } from '../../../../stores/modalState';


const { id } = defineProps(['id']);
const emit = defineEmits([`modalClose`, 'postSuccess']);
const modalState = useModalStore();
</script>

<template>
    <teleport to="body">
        <div class="backdrop">
            <div class="container">
                <table>
                    <colgroup>
                        <col width="10%" />
                        <col width="20%" />
                        <col width="15%" />
                        <col width="15%" />
                        <col width="10%" />
                        <col width="30%" />
                    </colgroup>
                    <thead>
                        <th scope="col">주문번호</th>
                        <th scope="col">주문일자</th>
                        <th scope="col">고객명</th>
                        <th scope="col">상품명</th>
                        <th scope="col">주문수량</th>
                        <th scope="col">배송담당자</th>
                    </thead>
                </table>
                <div class="button-box">
                    <button @click="modalState.setModalState()">나가기</button>
                </div>
            </div>
        </div>
    </teleport>
  
</template>

<style lang="scss" scoped>
.backdrop {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
  font-weight: bold;
}

.container {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  position: relative;
  width: 90%;
  max-width: 800px;
  z-index: 11;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

th {
  background: #f4f4f4;
  text-align: center;
}

.product-image {
  width: 100px;
  height: 100px;
  object-fit: contain;
  border: 1px solid #ddd;
  background: white;
}

.text-area {
  width: 100%;
  height: 60px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
  box-sizing: border-box;
}

.button-box {
  text-align: right;
  margin-top: 10px;
}

button {
  background-color: #3bb2ea;
  border: none;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 6px;
  box-shadow: 0 2px #999;
  transition: 0.3s;

  &:hover {
    background-color: #45a049;
  }

  &:active {
    background-color: #3e8e41;
    box-shadow: 0 2px #666;
    transform: translateY(2px);
  }
}

.font_red {
  color: #fe1414;
}
</style>
