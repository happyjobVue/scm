<script setup>
import { onMounted, ref } from 'vue';
import { useModalStore } from '../../../../stores/modalState';
import axios from 'axios';


const selectedFileName = ref('');
const imageUrl = ref('');
const fileData = ref('');
const modalState = useModalStore();
const productInfoDetail = ref({
    supplyId: 0,
    categoryCode: 0
});
const supplierList = ref({});
const categoryList = ref({});
const emit = defineEmits(['postSuccess']);

const searchSupplierList = () => {
    axios.get('/api/management/supplierNameListBody.do')
    .then(res => {
        supplierList.value = res.data;
    });
}

const searchCategoryList = () => {
    axios.get('/api/management/categoryListBody.do')
    .then(res => {
        categoryList.value = res.data;
    });
}

/* ===================== handler ===================== */

const handleFile = (e) => {
    const file = e.target.files[0];
    const fileInfo = e.target.files;
    const fileInfoSplit = fileInfo[0].name.split('.');
    const fileExtension = fileInfoSplit[1].toLowerCase();
    selectedFileName.value = file ? file.name : '';

    if(fileExtension === 'jpg' || fileExtension === 'gif' || fileExtension === 'png') {
        imageUrl.value = URL.createObjectURL(fileInfo[0]);
    }
    fileData.value = fileInfo[0];
};

const handlerSave = () => {
    if(productInfoDetail.value.supplyId == 0) return alert("납품업체를 선택해주세요.");
    if(productInfoDetail.value.categoryCode == 0) return alert("카테고리를 선택해주세요.");

    const formData = new FormData();
    for (const key in productInfoDetail.value) {
        formData.append(key, productInfoDetail.value[key]);
    }
    if(fileData.value) formData.append('file', fileData.value);

    console.log(formData)
    axios.post('/api/management/productSave.do', formData)
    .then(res => {
        if(res.data.result != "success") return alert("제품 등록에 실패하였습니다.");
        
        alert("제품정보 등록에 성공하였습니다.");
        emit('postSuccess');
        modalState.setModalState();
    });
}

onMounted(() => {
    searchSupplierList();
    searchCategoryList();
})

</script>

<template>
    <div class="backdrop">
        <dl class="container">
            <dt>
                <strong>제품 상세정보</strong>
            </dt>
            <dd>
                <table>
                    <colgroup>
                        <col width="120px">
                        <col width="*">
                        <col width="120px">
                        <col width="*">
                    </colgroup>
                <tbody>
                    <tr>
                        <th scope="row">제품명 <span class="font_red">*</span></th>
                        <td colspan="3">
                            <input 
                            type="text"
                            v-model="productInfoDetail.name"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">제품번호 <span class="font_red">*</span></th>
                        <td colspan="3">
                            <input 
                            type="text"
                            v-model="productInfoDetail.productNumber"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">제품가격<span class="font_red">*</span></th>
                        <td colspan="3">
                            <input 
                            type="text" 
                            v-model="productInfoDetail.sellPrice"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">상세정보<span class="font_red">*</span></th>
                        <td colspan="3">
                            <input 
                            type="text"
                            v-model="productInfoDetail.description"
                             />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">납품업체<span class="font_red">*</span></th>
                        <td colspan="3">
                            <select v-model="productInfoDetail.supplyId">
                                <option value="0" disabled>-- 납품업체 선택 --</option>
                                <option
                                    v-for="supplier in supplierList"
                                    :key="supplier.supplyId"
                                    :value="supplier.supplyId"
                                >
                                    {{ supplier.name }}
                                </option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">카테고리<span class="font_red">*</span></th>
                        <td colspan="3">
                            <select v-model="productInfoDetail.categoryCode">
                                <option value="0" disabled>-- 카테고리 선택 --</option>
                                <option
                                    v-for="category in categoryList"
                                    :key="category.categoryCode"
                                    :value="category.categoryCode"
                                >
                                    {{ category.category }}
                                </option>
                            </select>
                        </td>
                    </tr>
                    <tr id="fileNo">
                        <th scope="row">파일</th>
                        <td colspan="2">
                            <input type="text" :value="selectedFileName" disabled />
                        </td>
                        <td colspan="1">

                            <label class="custom-upload-btn" >
                                파일 선택
                                <input type="file" @change="handleFile" hidden />
                            </label>

                        </td>
                    </tr>
                    <tr id="fileYes">
                        <th scope="row">파일</th>
                        <td colspan="2">
                            
                        </td>
                        <td colspan="1"><button>파일 삭제</button></td>
                    </tr> 
                    <tr>
                        <th scope="row">미리보기</th>
                        <td colspan="3" id="preview"></td>
                    </tr>
                </tbody>
                </table>
                
                <div class="button-box">
                    <button @click="handlerSave">저장</button>
                    <button>수정</button>
                    <button style="margin-left: 16px;">삭제</button>
                    <button style="margin-left: 16px;" @click="modalState.setModalState()">취소</button>
                </div>
            </dd>
        </dl>
    </div>
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
    width: 30%;
    max-width: 800px;
    z-index: 11;
}

table {
    width: 100%;
    border-collapse: collapse;
}
dt{
    text-align: center;
    margin-bottom: 8px;
    font-size: 24px;
}
th,
td {
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
    text-align: center;
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

.custom-upload-btn {
    display: inline-block;
    background-color: #3bb2ea;
    border: none;
    color: white;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 6px;
    box-shadow: 0 2px #999;
    transition: 0.3s;
    font-family: sans-serif;
    font-weight: normal;

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
