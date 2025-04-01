<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useModalStore } from '../../../../stores/modalState';
import axios from 'axios';

const { id } = defineProps(['id']);
const emit = defineEmits([`modalClose`, 'postSuccess']);
const noticeDetail = ref({});

const searchDetail = () => {
    axios.post('/api/management/noticeDetailJson.do', {noticeId: id}).then(res => {
        noticeDetail.value = res.data.detailValue;
    })
};

const noticeSave = () => {
    const param = new URLSearchParams(noticeDetail.value);    
    axios.post('/api/management/noticeSave.do', param).then(res => {
        if(res.data.result === "success") {
            emit('postSuccess');
        }
    });
};

const noticeUpdate = () => {
    const param = new URLSearchParams(noticeDetail.value);
    param.append("noticeId", id);
    axios.post('/api/management/noticeUpdate.do', param).then(res => {
        if(res.data.result === "success") {
            emit('postSuccess');
        }
    });
};

const noticeDelete = () => {
    axios.post('/api/management/noticeDeleteJson.do', {noticeId: id}).then(res => {
        if(res.data.result === "success") {
            emit('postSuccess');
        }
    });
}

onMounted(() => {
    id && searchDetail();
});

onUnmounted(() => {
    emit('modalClose', 0);
});

const modalState = useModalStore();
</script>

<template>
    <teleport to="body">
        <div class="backdrop">
            <div class="container">
                <label> 제목 :<input type="text" v-model="noticeDetail.title"/> </label>
                <label>
                    내용 :
                    <input type="text" v-model="noticeDetail.content"/>
                </label>
                파일 :<input type="file" style="display: none" id="fileInput" />
                <label class="img-label" htmlFor="fileInput">
                    파일 첨부하기
                </label>
                <div>
                    <div>
                        <label>미리보기</label>
                        <img />
                    </div>
                </div>
                <div class="button-box">
                    <button @click="id ? noticeUpdate() : noticeSave()">
                        {{ id ? '수정': '저장' }}
                    </button>
                    <button v-if="id" @click="noticeDelete">삭제</button>
                    <button @click="modalState.setModalState()">나가기</button>
                </div>
            </div>
        </div>
    </teleport>
</template>



<style lang="scss" scoped>
.backdrop {
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    flex-flow: row wrep;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
    font-weight: bold;
}

label {
    display: flex;
    flex-direction: column;
}

input[type='text'] {
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
}

.container {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
    position: relative;
    width: 400px;
}

img {
    width: 100px;
    height: 100px;
}

.img-label {
    margin-top: 10px;
    padding: 6px 25px;
    background-color: #ccc;
    border-radius: 4px;
    color: rgba(0, 0, 0, 0.9);
    cursor: pointer;

    &:hover {
        background-color: #45a049;
        color: white;
    }

    &:active {
        background-color: #3e8e41;
        box-shadow: 0 2px #666;
        transform: translateY(2px);
    }
}

.button-box {
    text-align: right;
    margin-top: 10px;
}
button {
    background-color: #3bb2ea;
    border: none;
    color: white;
    padding: 10px 22px;
    text-align: right;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 12px;
    box-shadow: 0 4px #999;
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
</style>
