<template>
	<div>
		<div class="container">
			<div class="handle-box">
				<el-select v-model="query.type" placeholder="类型" class="handle-select mr10">
					<el-option key="0" label="全部" value="全部"></el-option>
					<el-option key="1" label="举报" value="举报"></el-option>
					<el-option key="2" label="申诉" value="申诉"></el-option>
					<el-option key="3" label="认证申请" value="认证申请"></el-option>
				</el-select>
				<el-select v-model="query.state" placeholder="状态" class="handle-select mr10">
					<el-option key="0" label="全部" value="全部"></el-option>
					<el-option key="11" label="未处理" value="未处理"></el-option>
					<el-option key="22" label="已处理" value="已处理"></el-option>
				</el-select>
				<el-input v-model="query.name" placeholder="关键词" class="handle-input mr10"></el-input>
				<el-button type="primary" :icon="Search" @click="handleSearch">筛选</el-button>
				<!--
					<el-button type="primary" :icon="Plus">新增</el-button>
				-->
			</div>
			<el-table 
			class="table"
			:data="tableDataList" 
			max-height="520"
			border="true"  
			stripe="true"
			header-cell-class-name="table-header"
			>
				<el-table-column prop="id" label="ID" width="90" align="center"></el-table-column>
				<el-table-column prop="name" label="用户名"></el-table-column>
				<el-table-column prop="type" label="类型"></el-table-column>
				<el-table-column prop="date" label="时间" sortable align="center"></el-table-column>
				<el-table-column label="状态" align="center">
					<template #default="scope">
						<el-tag
							:type="scope.row.state === '已处理' ? 'success' : scope.row.state === '未处理' ? 'danger' : ''"
							disable-transitions="true"
						>
							{{ scope.row.state }}
						</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="220" align="center">
					<template #default="scope">
						<el-button text :icon="Edit" @click="handleEdit(scope.$index, scope.row)">
							处理事务
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!--
				底部分页，先暂时取消
				<div class="pagination">
				<el-pagination
					background
					layout="total, prev, pager, next"
					:current-page="1"
					:page-size="1"
					:total="dataNum"
					@current-change="handlePageChange"
				></el-pagination>
				</div>
			-->
			
		</div>

		<!-- 编辑弹出框 -->
		<el-dialog title="编辑" v-model="editVisible" width="30%">
			<el-form label-width="70px">
				<el-form-item label="用户名">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="地址">
					<el-input v-model="form.address"></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="editVisible = false">取 消</el-button>
					<el-button type="primary" @click="saveEdit">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { Edit, Search } from '@element-plus/icons-vue';

class tableData {
	id: number;
	name: string;
	type: string;
	date: string;
	state: string;
}

let tableDataList : tableData[] = [
	{id: 1, name: "name1", type: "申诉", date: "2023-12-6", state:"未处理"},
	{id: 11, name: "name2", type: "申诉", date: "2023-12-5", state:"已处理"},
	{id: 2, name: "name3", type: "举报", date: "2023-12-6", state:"未处理"},
	{id: 22, name: "name4", type: "举报", date: "2023-12-5", state:"已处理"},
	{id: 3, name: "name5", type: "认证申请", date: "2023-12-6", state:"未处理"},
	{id: 33, name: "name6", type: "认证申请", date: "2023-12-5", state:"已处理"},
	{id: 1, name: "name1", type: "申诉", date: "2023-12-6", state:"未处理"},
	{id: 11, name: "name2", type: "申诉", date: "2023-12-5", state:"已处理"},
	{id: 2, name: "name3", type: "举报", date: "2023-12-6", state:"未处理"},
	{id: 22, name: "name4", type: "举报", date: "2023-12-5", state:"已处理"},
	{id: 3, name: "name5", type: "认证申请", date: "2023-12-6", state:"未处理"},
	{id: 33, name: "name6", type: "认证申请", date: "2023-12-5", state:"已处理"},
	{id: 1, name: "name1", type: "申诉", date: "2023-12-6", state:"未处理"},
	{id: 11, name: "name2", type: "申诉", date: "2023-12-5", state:"已处理"},
	{id: 2, name: "name3", type: "举报", date: "2023-12-6", state:"未处理"},
	{id: 22, name: "name4", type: "举报", date: "2023-12-5", state:"已处理"},
	{id: 3, name: "name5", type: "认证申请", date: "2023-12-6", state:"未处理"},
	{id: 33, name: "name6", type: "认证申请", date: "2023-12-5", state:"已处理"},
]

//let dataNum = ref(tableDataList.length)

const query = reactive({
	type: '',
	state: '',
	name: '',
});

// 查询操作
const handleSearch = () => {
	
};
// 分页导航
// const handlePageChange = (val: number) => {

// };

// 表格编辑时弹窗和保存
const editVisible = ref(false);
let form = reactive({
	name: '',
	address: ''
});

let idx: number = -1;
const handleEdit = (index: number, row: any) => {
	idx = index;
	form.name = row.name;
	form.address = row.address;
	editVisible.value = true;
};
const saveEdit = () => {
	
};
</script>

<style scoped>

.handle-box {
	margin-bottom: 20px;
}

.handle-select {
	width: 120px;
}

.handle-input {
	width: 300px;
}
.table {
	width: 100%;
	font-size: 14px;
}
.red {
	color: #F56C6C;
}
.mr10 {
	margin-right: 10px;
}
.table-td-thumb {
	display: block;
	margin: auto;
	width: 40px;
	height: 40px;
}
</style>