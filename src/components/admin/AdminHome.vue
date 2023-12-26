<template>
	<div>
		<el-row :gutter="20">
			<el-col :span="8">
				<el-card shadow="hover" class="mgb20" style="height: 252px">
					<div class="user-info">
						<el-avatar :size="120" :src="imgurl" />
						<div class="user-info-cont">
							<div class="user-info-name">{{ name }}</div>
							<div>{{ role }}</div>
						</div>
					</div>
					<div class="user-info-list">
						上次登录时间：
						<span>{{ lastTime }}</span>
					</div>
					<div class="user-info-list">
						上次登录地点：
						<span>{{ lastLocation }}</span>
					</div>
				</el-card>
				<el-card shadow="hover" style="height: 252px">
					<template #header>
						<div class="clearfix">
							<span>事务</span>
						</div>
					</template>
					待处理
					<el-progress :percentage="100" color="#42b983"></el-progress>
					申诉
					<el-progress :percentage="appealNumPer" color="#f1e05a"></el-progress>
					举报
					<el-progress :percentage="reportNumPer"></el-progress>
					认证申请
					<el-progress :percentage="claimNumPer" color="#f56c6c"></el-progress>
				</el-card>
			</el-col>
			<el-col :span="16">
				<el-row :gutter="20" class="mgb20">
					<el-col :span="8">
						<el-card shadow="hover" :body-style="{ padding: '0px' }">
							<div class="grid-content grid-con-1">
								<el-icon class="grid-con-icon"><User /></el-icon>
								<div class="grid-cont-right">
									<div class="grid-num">{{appealNum}}</div>
									<div>申诉</div>
								</div>
							</div>
						</el-card>
					</el-col>
					<el-col :span="8">
						<el-card shadow="hover" :body-style="{ padding: '0px' }">
							<div class="grid-content grid-con-2">
								<el-icon class="grid-con-icon"><ChatDotRound /></el-icon>
								<div class="grid-cont-right">
									<div class="grid-num">{{reportNum}}</div>
									<div>举报</div>
								</div>
							</div>
						</el-card>
					</el-col>
					<el-col :span="8">
						<el-card shadow="hover" :body-style="{ padding: '0px' }">
							<div class="grid-content grid-con-3">
                                <el-icon class="grid-con-icon"><Stamp /></el-icon>
								<div class="grid-cont-right">
									<div class="grid-num">{{claimNum}}</div>
									<div>认证申请</div>
								</div>
							</div>
						</el-card>
					</el-col>
				</el-row>
				<el-card shadow="hover" style="height: 403px">
					<template #header>
						<div class="clearfix">
							<span>待办事项</span>
							<el-button style="float: right; padding: 3px 0" text @click="handleEdit()">添加</el-button>
						</div>
					</template>

					<el-table :show-header="false" :data="todoList" style="width: 100%">
						<el-table-column width="40">
							<template #default="scope">
								<el-checkbox v-model="scope.row.status"></el-checkbox>
							</template>
						</el-table-column>
						<el-table-column>
							<template #default="scope">
								<div
									class="todo-item"
									:class="{
										'todo-item-del': scope.row.status
									}"
								>
									{{ scope.row.title }}
								</div>
							</template>
						</el-table-column>
					</el-table>
				</el-card>
			</el-col>
		</el-row>
	</div>
	<el-dialog title="添加" v-model="editVisible" width="30%">
			<el-form label-width="70px">
				<el-form-item label="待办事项">
					<el-input v-model="toDoItem"></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="editVisible = false">取 消</el-button>
					<el-button type="primary" @click="saveEdit">确 定</el-button>
				</span>
			</template>
		</el-dialog>
</template>

<script setup>
import { onBeforeMount } from 'vue'
import { ref, reactive } from 'vue';
import imgurl from '../../assets/img.jpg';
import store from '../../store';

let name = store.getters.getName;
let role = store.getters.getRole;
let lastTime = store.getters.getLoginTime;
let lastLocation = store.getters.getLoginLocation;

let affairNum = store.getters.getAffairListLength;
let appealNum = store.getters.getAppealListLength;
let reportNum = store.getters.getReportListLength;
let claimNum = store.getters.getClaimListLength;

let appealNumPer = (appealNum / affairNum * 100).toFixed(2)
let reportNumPer = (reportNum / affairNum * 100).toFixed(2)
let claimNumPer = (claimNum / affairNum * 100).toFixed(2)

let todoList = ref(store.getters.getTodoList)

let editVisible = ref(false);

let toDoItem = ref("请输入待办事项");

const handleEdit = () => {
	editVisible.value = true;
};
const saveEdit = () => {
	//store.commit('DeleteTodoList', 3, 3)
	todoList = store.commit('AddTodoList', toDoItem)
	editVisible.value = false;
};
onBeforeMount(() => {	
	affairNum = store.getters.getAffairListLength;
	appealNum = store.getters.getAppealListLength;
	reportNum = store.getters.getReportListLength;
	claimNum = store.getters.getClaimListLength;
})
</script>

<style scoped>

.div {
    display: flex;
}
.el-row {
	margin-bottom: 20px;
}

.grid-content {
	display: flex;
	align-items: center;
	height: 100px;
}

.grid-cont-right {
	flex: 1;
	text-align: center;
	font-size: 14px;
	color: #999;
}

.grid-num {
	font-size: 30px;
	font-weight: bold;
}

.grid-con-icon {
	font-size: 50px;
	width: 100px;
	height: 100px;
	text-align: center;
	line-height: 100px;
	color: #fff;
}

.grid-con-1 .grid-con-icon {
	background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
	color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
	background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
	color: rgb(100, 213, 114);
}

.grid-con-3 .grid-con-icon {
	background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
	color: rgb(242, 94, 67);
}

.user-info {
	display: flex;
	align-items: center;
	padding-bottom: 20px;
	border-bottom: 2px solid #ccc;
	margin-bottom: 20px;
}

.user-info-cont {
	padding-left: 50px;
	flex: 1;
	font-size: 14px;
	color: #999;
}

.user-info-cont div:first-child {
	font-size: 30px;
	color: #222;
}

.user-info-list {
	font-size: 14px;
	color: #999;
	line-height: 25px;
}

.user-info-list span {
	margin-left: 70px;
}

.mgb20 {
	margin-bottom: 20px;
}

.todo-item {
	font-size: 14px;
}

.todo-item-del {
	text-decoration: line-through;
	color: #999;
}

.schart {
	width: 100%;
	height: 300px;
}
</style>