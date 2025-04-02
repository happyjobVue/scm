<script setup>




</script>

<template>
    <teleport to="body">
        <div class="layerPosition layerPop layerType2" style="width: 600px;">
            <dl>
                <dt class="signtitle">		
                    <strong style="font-size:200%;">기업 회원가입</strong> 
                </dt>
                <dd class="content">
                    <div class="btn_areaC">
                    </div>
                    <!-- s : 여기에 내용입력 -->
                    <table class="row">
                        <colgroup>
                            <col width="120px"><!-- th 부분 -->
                            <col width="120px"><!-- td 1 부분 -->
                            <col width="120px"><!-- td 2 부분 -->			
                            <col width="80px"><!-- td 3 부분 -->
                        </colgroup>
                            <tbody>
                                <tr>
                                    <th scope="row">아이디<span class="font_red">*</span></th>
                                    <td colspan="3">
                                        <input type="text" class="inputTxt p100"
                                        name="loginID" placeholder="숫자, 영문자 조합으로 6~20자리 "
                                        id="registerId" />
                                        </td>
                                    <td colspan="1">
                                    <input type="button" value="중복확인"
                                        onclick="loginIdCheck()" style="width: 130px; height: 20px;" />
                                        </td>
                                </tr>
                                <tr>
                                    <th scope="row">비밀번호 <span class="font_red">*</span></th>
                                    <td colspan="4">
                                        <input type="password"
                                        placeholder="숫자, 영문자, 특수문자 조합으로 8~15자리 " class="inputTxt p100"
                                        name="password" id="registerPwd" />
                                        </td>
                                </tr>

                                <tr>
                                    <th scope="row" style="padding: 0 0">비밀번호 확인<span
                                        class="font_red">*</span></th>
                                    <td colspan="4">
                                        <input type="password"
                                            placeholder="숫자, 영문자, 특수문자 조합으로 8~15자리 "
                                            class="inputTxt p100" name="password1" id="registerPwdOk" />
                                        </td>
                                </tr>
                                
                                <tr>
                                    <th scope="row" id="registerName_th">회사명 <span class="font_red">*</span></th>
                                    <td colspan="4">
                                        <input type="text" class="inputTxt p100" name="name"
                                        id="registerName" />
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" id="registerManager_th">담당자명 <span class="font_red">*</span></th>
                                    <td colspan="4">
                                        <input type="text" class="inputTxt p100" name="manager"
                                        id="manager" />
                                    </td>
                                </tr>
                                <tr>

                                <th scope="row">전화번호<span class="font_red">*</span></th>
                                    <td colspan="4"><input class="inputTxt"
                                        style="width: 31%" maxlength="3" type="text" id="tel1"
                                        name="user_tel1"> - <input class="inputTxt"
                                        style="width: 31%" maxlength="4" type="text" id="tel2"
                                        name="user_tel2"> - <input class="inputTxt"
                                        style="width: 31%" maxlength="4" type="text" id="tel3"
                                        name="user_tel3"></td>
                                </tr>
                                
                                <tr>
                                    <th scope="row" id="rggender_th">성별<span class="font_red">*</span></th>
                                    <td colspan="4" id="rggender_td">
                                        <select  name="gender_cd" id="gender_cd">
                                                <option value="" selected="selected">선택</option>
                                                <option value="1">남자</option>
                                                <option value="2">여자</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr id="birthday1">
                                    <th scope="row">생년월일 <span class="font_red">*</span></th>
                                    <td colspan="4">
                                        <input type="date" class="inputTxt p100"
                                        name="birthday" id="birthday" style="font-size: 15px" />
                                    </td>
                                </tr>
                                
                                <tr>
                                    <th scope="row">이메일<span class="font_red">*</span></th>
                                        <td colspan="3">
                                            <input type="text" class="inputTxt p100"
                                            name="user_email" id="registerEmail" 
                                            placeholder="happyjob@happyjop.com"
                                            /> 
                                        </td>
                                        <td colspan="1">	
                                        <input type="button" value="중복확인"
                                        onclick="emailCheck()" style="width: 130px; height: 20px;" />
                                        </td>
                                </tr>
                                <tr>
                                    <th scope="row">우편번호<span class="font_red">*</span></th>
                                    <td colspan="3"><input type="text" class="inputTxt p100"
                                        name="user_zipcode" id="detailaddr" readonly/></td>

                                    <td><input type="button" value="우편번호 찾기"
                                        onclick="execDaumPostcode()"
                                        style="width: 130px; height: 20px;" /></td>
                                </tr>
                                <tr>
                                    <th scope="row">주소<span class="font_red">*</span></th>
                                    <td colspan="4"><input type="text" class="inputTxt p100"
                                        name="user_address" id="loginaddr" readonly/></td>
                                </tr>
                                <tr>
                                    <th scope="row">상세주소</th>
                                    <td colspan="4"><input type="text" class="inputTxt p100"
                                        name="user_dt_address" id="loginaddr1" /></td>
                                </tr>
                            </tbody>
                    </table>
                    <div class="btn_areaC mt30">
                        <a href="javascript:CompleteRegister();" class="btnType blue"
                            id="RegisterCom" name="btn"> <span>회원가입 완료</span></a> 
                        <a href="javascript:fcancleModal()" class="btnType gray" id="btnCloseLsmCod" name="btn"><span>취소</span></a>
                            <br>
                    </div>
                    <div class="btn_areaC mt30">
                    </div>
                </dd>
            </dl>
            <a href="" class="closePop"><span class="hidden">닫기</span></a>
        </div>
    </teleport> 
</template>

<style>

</style>