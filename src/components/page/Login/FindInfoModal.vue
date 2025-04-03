<script setup>
import emailjs from 'emailjs-com';
import { ref } from 'vue';
import { useModalStore } from '../../../stores/modalStore';

const findId = ref(true);
const findPwd = ref(false);
const generatedCode = ref('');
const userInputCode = ref('');

const modalStore = useModalStore();

/* ======================= handler: 아이디 찾기, 비밀번호 찾기 ==================== */
const handlerFindId = () =>{
    findId.value = true;
    findPwd.value = false;
}

const handlerFindPwd = () => {
    findId.value = false;
    findPwd.value = true;
}

/* ============================ function: 기능 구현============================== */

/* ======================= 난수 생성 ========================= */

const generateCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendVerificationCode = async () => {
  generatedCode.value = generateCode();

  const templateParams = {
    to_email: email.value,
    code: generatedCode.value,
  };

  try {
    await emailjs.send(
      'your_service_id',
      'your_template_id',
      templateParams,
      'your_user_public_key'
    );
    alert('인증번호가 전송되었습니다.');
  } catch (err) {
    console.error('메일 전송 실패:', err);
  }
};


</script>

<template>
    <div>
        <div class="container">
            <dl>
                <dt>
                    <strong>아이디/비밀번호 찾기</strong>
                </dt>
                <dd  style="padding: 30px 30px !important;">
                    <div class="init-style button-container" style="margin-top: 0px !important;">
                        <button @click="handlerFindId">
                            <span>아이디 찾기</span>
                        </button> 
                        <button @click="handlerFindPwd">
                            <span>비밀번호 찾기</span>
                        </button>
                    </div>
                </dd>

                <dd>
                    <!-- 아이디/비밀번호 찾기 폼 -->
                    <table v-if="findId" class="row" id="findForm">
                        <tbody>
                            <tr id="registerEmailId">
                                <th scope="row" style="width: 85px;" >
                                    이메일<span class="font_red">*</span>
                                </th>
                                <td >
                                <input type="text" id="emailText"
                                    data-code="I" placeholder="가입하신 이메일을 입력하세요" size="34"
                                    style="height: 30px;" /> 
                                    <a href=""
                                    class="btnType blue" id="findIdSubmit">
                                        <span id="timerBtn">이메일 전송</span></a>
                                    </td>
                            </tr>
                            <tr id="confirm">		
                                <th scope="row" style="width: 85px;" >
                                    인증번호<span class="font_red">*</span>
                                </th>
                                <td >
                                    <input type="text" id="emailNum" name="authnum"
                                    placeholder="전송된 인증번호를 입력하세요" size="34" style="height: 30px;" />
                                    <a href="javascript:SendComplete();" class="btnType blue"
                                    id="sendMail"><span>인증하기</span></a>
                                </td>
                            </tr>
                            <tr id="expirationTime">		
                                <th scope="row" style="width: 85px;" >
                                    유효시간<span class="font_red">*</span>
                                </th>
                                <td id="">
                                    <span id="timer"></span>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <table v-if="findPwd" class="row" id="findPwdForm">
                        <tbody>
                            <tr id="loginRegister">
                                <th scope="row" style="width: 85px;" >
                                    아이디<span class="font_red">*</span>
                                </th>
                                <td >
                                <input type="text" id="emailIdText"
                                    placeholder="가입하신 아이디를 입력하세요" size="34" style="height: 30px;" />
                                    <a href="javascript:RegisterIdCheck();" class="btnType blue" id="">
                                    <span>아이디 체크</span></a>
                                </td>
                            </tr>
                            <tr id="loginEmail">
                                <th scope="row" style="width: 85px;" >
                                    이메일<span class="font_red">*</span>
                                </th>
                                <td ><input type="text" id="emailPwdText"
                                    data-code="P" placeholder="가입하신 이메일을 입력하세요" size="34"
                                    style="height: 30px;" /> <a href="javascript:SendPwdEmail();"
                                    class="btnType blue" id=""><span>이메일 전송</span></a></td>
                        </tr>
                        <tr id="loginPwd">
                                <th scope="row" style="width: 85px;" >
                                    인증번호<span class="font_red">*</span>
                                </th>
                                <td ><input type="text" id="emailPwdNum"
                                    data-code="P" placeholder="인증번호를 입력하세요" size="34"
                                    style="height: 30px;" /> <a
                                    href="javascript:SendCompletePwd();" class="btnType blue"
                                    id="emailOk"><span>인증하기</span></a></td>
                            </tr>
                        </tbody>
                    </table>
                    <button @click="modalStore.close('findInfo')">닫기</button>
                </dd>
            </dl>
	    </div>
    </div>
</template>

<style scoped>
div {
        width: 100%;
        height: 100%;
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, 0.5);
        z-index: 10;
        font-weight: bold;

        .container {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
            width: auto;
            height: auto;
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

        .button-container {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
            flex-direction: row;
        }

        button {
            flex: 1;
            background-color: #3bb2ea;
            border: none;
            color: white;
            padding: 10px;
            margin: 0 5px;
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
            color:#fe1414;
        }
    }
.init-style {
    all: unset;
    display: flex;
    flex-direction: column;
}

</style>