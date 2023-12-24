<template>
	<div>
		<el-row :gutter="20">
			<el-col :span="12">
				<el-card shadow="hover">
					<template #header>
						<div class="clearfix">
							<span>基础信息</span>
						</div>
					</template>
					<div class="info">
						<div class="info-image">
							<el-avatar :size="100" :src="avatarImg" />
							<span class="info-edit">
								<i class="el-icon-lx-camerafill"></i>
							</span>
						</div>
						<div class="info-name">{{ name }}</div>
						<div class="info-desc">不可能！我的代码怎么可能会有bug！</div>
					</div>
				</el-card>
			</el-col>
			<el-col :span="12">
				<el-card shadow="hover">
					<template #header>
						<div class="clearfix">
							<span>添加管理员</span>
						</div>
					</template>
					<el-form label-width="90px">
						<el-form-item label="用户名："> 
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
						<el-form-item label="密码：">
							<el-input type="password" v-model="form.first"></el-input>
						</el-form-item>
						<el-form-item label="确认密码：">
							<el-input type="password" v-model="form.second"></el-input>
						</el-form-item>
						<el-form-item label="个人简介：">
							<el-input v-model="form.desc"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="onSubmit">保存</el-button>
						</el-form-item>
					</el-form>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script setup>
import { reactive, ref } from 'vue';

import avatar from '../../assets/img.jpg';
import store from '../../store';
import axios from 'axios';

const name = store.getters.getName;
const form = reactive({
    name: '',
	first: '',
	second: '',
	desc: '不可能！我的代码怎么可能会有bug！'
});
const onSubmit = () => {
	if(form.first != form.second){
		alert("密码不一致")
	}
	else{
		console.log("begin submit")
    	axios({
            url: 'http://122.9.5.156:8000/api/v1/admin/add_admin',
            method: 'post',
            data: JSON.stringify({
                "token": "eyJ0eXAiOiJqd3QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJhZG1pbjEiLCJ0eXBlIjoiYWRtaW4iLCJleHAiOjE3MDMyNDQwMzYuMzIyNDAwNn0.4TLKpJcX3V9YIM4Ht287xFzcJTrjoAYKb04PFZVgt5k",
				"username": form.name,
				"password": form.second,
            })
    	}).then(res =>{
        	console.log(res.data)
    	}).catch(err => {
        	console.log(err)
			alert("未知错误，请联系超级管理员")
    	})
	}
};

const avatarImg = ref(avatar);

</script>

<style scoped>
.info {
	text-align: center;
	padding: 35px 0;
}
.info-image {
	position: relative;
	margin: auto;
	width: 100px;
	height: 100px;
	background: #f8f8f8;
	border: 1px solid #eee;
	border-radius: 50px;
	overflow: hidden;
}

.info-edit {
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	opacity: 0;
	transition: opacity 0.3s ease;
}
.info-edit i {
	color: #eee;
	font-size: 25px;
}
.info-image:hover .info-edit {
	opacity: 1;
}
.info-name {
	margin: 15px 0 10px;
	font-size: 24px;
	font-weight: 500;
	color: #262626;
}
.crop-demo-btn {
	position: relative;
}
.crop-input {
	position: absolute;
	width: 100px;
	height: 40px;
	left: 0;
	top: 0;
	opacity: 0;
	cursor: pointer;
}
</style>