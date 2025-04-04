<script setup>
import axios from 'axios';
import { useModalStore } from '../../../../stores/modalStore';

const modalState = useModalStore();

const emit = defineEmits([`modalClose`, 'postSuccess']);
const { id } = defineProps(['id']);

const idCheck = ref(false);

const supplyDetail = ref({
    address: '',
    author: '',
    createdDate: '',
    detailAddress: '',
    groupCode: '',
    loginID: '',
    manager: '',
    name: '',
    password: '',
    phone: '',
    supplyId: '',
    tradeState: '',
    updatedDate: '',
    zipCode: '',
    tradeFlag: '',
    groupCode: 'S10000T1',
});

const searchDetail = () => {
    axios
        .post('/api/management/supplyDetailBody.do', { supplyId: id })
        .then(res => {
            supplyDetail.value = {
                ...res.data.detailValue,
                tradeFlag: res.data.detailValue.tradeState,
            };
            console.log(supplyDetail.value);
        });
};

const checkSupplyData = () => {
    let flag = true;
    const warningMessage = {
        loginID: 'ID를 입력해주세요!',
        name: '납품업체명을 입력해주세요!',
        manager: '담당자명을 입력해주세요!',
        password: '비밀번호를 입력해주세요!',
        phone: '전화번호를 입력해 주세요!',
        address: '주소를 입력해 주세요!',
        zipCode: '우편 번호를 입력해 주세요!',
        tradeState: '거래상태를 선택해 주세요!',
    };
    const fieldsToCheck = [
        'loginID',
        'name',
        'manager',
        'phone',
        'zipCode',
        'address',
        'password',
        'tradeState',
    ];
    for (let field of fieldsToCheck) {
        if (
            supplyDetail.value[field] === null ||
            supplyDetail.value[field] === undefined ||
            supplyDetail.value[field] === ''
        ) {
            alert(warningMessage[field]);
            flag = false;
            break;
        }
    }
    return flag;
};

const checkId = () => {
    const idRules = /^[a-z0-9]{6,20}$/g;
    if (!idRules.test(supplyDetail.value.loginID)) {
        alert('ID형식이 맞지 않습니다!');
        return;
    }

    axios
        .post('/api/management/checkLoginIDBody.do', {
            loginID: supplyDetail.value.loginID,
        })
        .then(res => {
            if (res.data === 0) {
                alert('사용가능한 ID 입니다.');
                idCheck.value = true;
            } else {
                alert('중복된 아이디가 있습니다!');
            }
        });
};

const saveSupply = () => {
    if (!checkSupplyData()) {
        return;
    }
    const hpRules = /^\d{2,3}-\d{3,4}-\d{4}$/;
    if (!idCheck.value) {
        alert('아이디 중복확인을 진행해 주세요!');
        return;
    }
    if (!hpRules.test(supplyDetail.value.phone)) {
        alert('전화번호 양식을 확인해 주세요!');
        return;
    }

    axios
        .post('/api/management/SupplySaveBody.do', {
            ...supplyDetail.value,
            supplyLoginID: supplyDetail.value.loginID,
        })
        .then(res => {
            if (res.data.result === 'success') {
                alert('등록 성공!');
                emit('postSuccess');
            } else {
                alert('등록 실패!');
            }
        });
};

const updateSupply = () => {
    if (!checkSupplyData()) {
        return;
    }
    const hpRules = /^\d{2,3}-\d{3,4}-\d{4}$/;
    if (!hpRules.test(supplyDetail.value.phone)) {
        alert('전화번호 양식을 확인해 주세요!');
        return;
    }

    axios
        .post('/api/management/supplyUpdateBody.do', supplyDetail.value)
        .then(res => {
            if (res.data.result === 'success') {
                alert('수정 성공!');
                emit('postSuccess');
            } else {
                alert('수정 실패!');
            }
        });
};

const deleteSupply = () => {
    axios
        .post('/api/management/supplyDeleteBody.do', { supplyId: id })
        .then(res => {
            if (res.data.result === 'success') {
                alert('삭제 되었습니다.');
                emit('postSuccess');
            } else {
                alert('삭제 실패!');
            }
        });
};

const recoverySupply = () => {
    axios
        .post('/api/management/supplyRecoveryBody.do', { supplyId: id })
        .then(res => {
            if (res.data.result === 'success') {
                alert('거래가 재개되었습니다.');
                emit('postSuccess');
            } else {
                alert('재개 실패!');
            }
        });
};

const searchPostcode = () => {
    new window.daum.Postcode({
        oncomplete: data => {
            supplyDetail.value.address = data.address;
            supplyDetail.value.zipCode = data.zonecode;
        },
    }).open();
};

onMounted(() => {
    id && searchDetail();
});
onUnmounted(() => {
    emit('modalClose', 0);
});
</script>
<template>
    <Teleport to="body">
        <div class="backdrop">
            <div class="container">
                <div>
                    <h3 style="text-align: center">납품 업체 등록</h3>
                    <table>
                        <colgroup>
                            <col width="20%" />
                            <col width="30%" />
                            <col width="20%" />
                            <col width="30%" />
                        </colgroup>
                        <tbody>
                            <tr v-if="id !== 0">
                                <th>작성자</th>
                                <td>
                                    <input
                                        type="text"
                                        class="small_input"
                                        readonly
                                        v-model="supplyDetail.author"
                                    />
                                </td>
                                <th>작성일</th>
                                <td>
                                    <input
                                        type="text"
                                        class="small_input"
                                        readonly
                                        v-model="supplyDetail.createdDate"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>아이디</th>
                                <td colspan="2" v-if="id === 0">
                                    <input
                                        type="text"
                                        class="middle_input"
                                        v-model="supplyDetail.loginID"
                                        placeholder="숫자, 영문자 조합 6~20자리"
                                    />
                                </td>
                                <td colspan="3" v-if="id !== 0">
                                    <input
                                        type="text"
                                        v-model="supplyDetail.loginID"
                                        readonly
                                    />
                                </td>
                                <td>
                                    <button
                                        class="Abutton"
                                        v-if="id === 0"
                                        @click="checkId"
                                    >
                                        중복확인
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <th>납품업체명</th>
                                <td colspan="3">
                                    <input
                                        type="text"
                                        v-model="supplyDetail.name"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>담당자명</th>
                                <td colspan="3">
                                    <input
                                        type="text"
                                        v-model="supplyDetail.manager"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>담당자 연락처</th>
                                <td colspan="3">
                                    <input
                                        type="text"
                                        v-model="supplyDetail.phone"
                                        placeholder="000-0000-0000"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>우편번호</th>
                                <td colspan="2">
                                    <input
                                        type="text"
                                        class="middle_input"
                                        readonly
                                        v-model="supplyDetail.zipCode"
                                    />
                                </td>
                                <td>
                                    <button
                                        class="Abutton"
                                        @click="searchPostcode"
                                    >
                                        우편번호 찾기
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <th>주소</th>
                                <td colspan="3">
                                    <input
                                        type="text"
                                        readonly
                                        v-model="supplyDetail.address"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>상세주소</th>
                                <td colspan="3">
                                    <input
                                        type="text"
                                        v-model="supplyDetail.detailAddress"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>패스워드</th>
                                <td colspan="3">
                                    <input
                                        type="password"
                                        v-model="supplyDetail.password"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>거래상태</th>
                                <td colspan="3">
                                    <div style="display: flex">
                                        <label>
                                            <input
                                                type="radio"
                                                name="choice"
                                                value="Y"
                                                v-model="
                                                    supplyDetail.tradeState
                                                "
                                            />
                                            Yes
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name="choice"
                                                value="N"
                                                v-model="
                                                    supplyDetail.tradeState
                                                "
                                            />
                                            No
                                        </label>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="button_area">
                        <button
                            class="button"
                            @click="saveSupply"
                            v-if="id === 0 && supplyDetail.tradeFlag !== 'N'"
                        >
                            저장
                        </button>
                        <button
                            class="button"
                            v-if="id !== 0 && supplyDetail.tradeFlag !== 'N'"
                            @click="updateSupply"
                        >
                            수정
                        </button>
                        <button
                            class="button"
                            v-if="id !== 0 && supplyDetail.tradeFlag !== 'N'"
                            @click="deleteSupply"
                        >
                            삭제
                        </button>
                        <button
                            class="button"
                            v-if="supplyDetail.tradeFlag === 'N'"
                            @click="recoverySupply"
                        >
                            거래 재개
                        </button>
                        <button
                            class="button"
                            @click="
                                modalState.modalState = !modalState.modalState
                            "
                        >
                            취소
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
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
    // flex-direction: column;
    width: 80px;
}
label input {
    width: 30px;
}

input[type='text'] {
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
}
input {
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
    width: 410px;
}
select {
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
    width: 230px;
}

.middle_input {
    width: 250px;
}

.small_input {
    width: 140px;
}

.Abutton {
    width: 120px;
    text-align: center;
    margin-left: 20px;
}

table {
    width: 550px;
}

.big_input {
    width: 450px;
}

.button_area {
    width: 100%;
    display: flex;
    justify-content: center;
}

.container {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
    position: relative;
    width: 600px;
    height: 600px;
    display: flex;
    justify-content: center;
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
.button {
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
