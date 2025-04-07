<script setup>
import { useModalStore } from '../../../../stores/modalState';
import axios from 'axios';
const { id } = defineProps(['id']);
const emit = defineEmits([`modalClose`, 'postSuccess']);

const inquiryDetail = ref({});
const fileDetail = ref({});
const modalState = useModalStore();
const imageUrl = ref('');
const fileData = ref('');
const selectMenu = ref([
    '카테고리 선택',
    '이용문의',
    '구매',
    '환불/교환/반품',
    '제품',
    '개인정보',
    '기타',
]);

const searchDetail = () => {
    axios
        .post('/api/support/inquiryDetailBody.do', { inquiryId: id })
        .then(res => {
            inquiryDetail.value = res.data.detailValue;
            if (res.data.fileValue) {
                fileDetail.value = res.data.fileValue;
                const imageExtensions = [
                    'jpg',
                    'jpeg',
                    'png',
                    'gif',
                    'bmp',
                    'webp',
                ];
                if (
                    imageExtensions.some(
                        ext => ext === fileDetail.value.fileType
                    )
                ) {
                    getFileImage();
                }
            }
        });
};

const getFileImage = () => {
    const param = new URLSearchParams();
    param.append('inquiryId', id);
    axios
        .post('/api/support/inquiryDownload.do', param, {
            responseType: 'blob',
        })
        .then(res => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            imageUrl.value = url;
        });
};

const downloadFile = () => {
    const param = new URLSearchParams();
    param.append('inquiryId', id);

    axios
        .post('/api/support/inquiryDownload.do', param, {
            responseType: 'blob',
        })
        .then(res => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileDetail.value.fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();
        });
};

const fileRemove = () => {
    axios
        .post('/api/support/inquiryFileRemoveBody.do', { inquiryId: id })
        .then(res => {
            if (res.data.result === 'success') {
                searchDetail();
            }
        });
};

const answerSave = () => {
    if (!inquiryDetail.value.ansContent) {
        alert('답변을 입력해 주세요!');
        return;
    }
    const param = new URLSearchParams();
    param.append('inquiryId', id);
    param.append('fileAnsContent', inquiryDetail.value.ansContent);
    axios.post('/api/management/inquiryAnsSaveBody.do', param).then(res => {
        console.log(res.data);
        if (res.data.result === 'success') {
            alert('답변이 등록되었습니다.');
            emit('postSuccess');
        }
    });
};

const deleteInquiry = () => {
    axios
        .post('/api/support/inquiryFileDeleteBody.do', { inquiryId: id })
        .then(res => {
            if (res.data.result === 'success') {
                alert('삭제되었습니다.');
                emit('postSuccess');
            }
        });
};

onMounted(() => {
    id && searchDetail();
});
</script>
<template>
    <teleport to="body">
        <div class="backdrop">
            <div class="container">
                <h2 style="text-align: center">문의 상세</h2>
                <table>
                    <col width="20%" />
                    <col width="30%" />
                    <col width="20%" />
                    <col width="30%" />
                    <tr>
                        <th>작성자</th>
                        <td>{{ inquiryDetail.author }}</td>
                        <th>작성일시</th>
                        <td>{{ inquiryDetail.createdDate }}</td>
                    </tr>
                    <tr>
                        <th>카테고리</th>
                        <td colspan="3">
                            <select v-model="inquiryDetail.category">
                                <!-- <option>이용문의</option>
                                <option>구매</option>
                                <option>환불/교환/반품</option>
                                <option>제품</option>
                                <option>개인정보</option>
                                <option>기타</option> -->
                                <option
                                    v-for="(list, index) in selectMenu"
                                    :key="index"
                                    :disabled="inquiryDetail.category !== list"
                                >
                                    {{ list }}
                                </option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>제목</th>
                        <td colspan="3">
                            <input
                                type="text"
                                v-model="inquiryDetail.title"
                                class="long_input"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>내용</th>
                        <td colspan="3">
                            <textarea
                                rows="4"
                                v-model="inquiryDetail.content"
                                class="content"
                            ></textarea>
                        </td>
                    </tr>
                    <tr>
                        <th>문의 답변</th>
                        <td colspan="3">
                            <textarea
                                rows="4"
                                v-model="inquiryDetail.ansContent"
                                class="content"
                            ></textarea>
                        </td>
                    </tr>
                    <tr>
                        <th>파일</th>
                        <td colspan="2">
                            <template v-if="fileDetail.fileName">
                                <input
                                    type="text"
                                    v-model="fileDetail.fileName"
                                />
                            </template>
                            <template v-else> 파일이 없습니다. </template>
                        </td>
                        <td>
                            <template v-if="fileDetail.fileName">
                                <button @click="fileRemove">파일삭제</button>
                            </template>
                        </td>
                    </tr>
                    <tr>
                        <th>미리보기</th>
                        <td colspan="3">
                            <template v-if="fileDetail.fileName">
                                <img :src="imageUrl" @click="downloadFile" />
                            </template>
                        </td>
                    </tr>
                </table>
                <div class="button_area">
                    <button @click="answerSave">답변등록</button>
                    <button @click="deleteInquiry">삭제</button>
                    <button @click="modalState.setModalState()">닫기</button>
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
    width: 500px;
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
.button_area {
    width: 100%;
    display: flex;
    justify-content: center;
}

textarea {
    width: 345px;
    resize: none;
}
select {
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
    width: 350px;
}
.long_input {
    width: 332px;
}
</style>
