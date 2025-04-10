<script setup>
import { useModalStore } from '../../../stores/modalStore';


const modalStore = useModalStore();



</script>

<template>
    <div class="backdrop">
        <div class="container" style="width: 500px;">
		<dl>
			<dt>
				<strong>비밀번호 변경</strong>
			</dt>
			<dd>
				<table>
					<tbody>
                        <tr>
                            <th scope="row">아이디 </th>
                            <td colspan="4"><input type="text" disabled /></td> 
                        </tr> 	
                        <tr>
                            <th scope="row">비밀번호 <span class="font_red">*</span></th>
                            <td colspan="4">
                                <input type="password"
                                placeholder="숫자, 영문자, 특수문자 조합으로 8~15자리 " 
                                />
                            </td>
                        </tr>

                        <tr>
                            <th scope="row" style="padding: 0 0">비밀번호 확인<span
                                class="font_red">*</span></th>
                            <td colspan="4">
                                <input type="password"
                                    placeholder="숫자, 영문자, 특수문자 조합으로 8~15자리 "
                                />
                            </td>
                        </tr>
					</tbody>
				</table>
				<div class="btn_areaC mt30">
					<button>비밀번호 변경</button> 
					<button
                    @click="modalStore.close('changeInfo')"
                    >취소</button>
					<br>
				</div>
			</dd>
		</dl>
	</div>
    </div>
</template>

<style scoped>
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

dt{
    text-align: center;
    margin-bottom: 8px;
    font-size: 24px;
}

th, td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
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
    margin: 5px;

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