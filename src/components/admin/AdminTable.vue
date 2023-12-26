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
			:key="itemKey"
			:data="tableDataList"
			max-height="520"
			:border="true"  
			:stripe="true"
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
							:disable-transitions="true"
						>
							{{ scope.row.state }}
						</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="220" align="center">
					<template #default="scope">
						<el-button text :icon="Edit" @click="handleEdit(scope.row)">
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
		<el-dialog title ="申诉" v-model="appealListVisible" width="65%">
			<el-form label-width="80px" :model="form" label-position="top">
				<el-form-item label="用户名">
					<span> {{ form.name }}</span>
				</el-form-item>
				<el-form-item label="邮箱">
					<span>{{ form.email }}</span>
				</el-form-item>
				<el-form-item label="邮箱是否为机构邮箱">
					<span> {{ form.email_commom }}</span>
				</el-form-item>
				<el-form-item label="申诉内容">
					<span> {{ form.text }}</span>
				</el-form-item>
				<el-form-item label="申诉文件">
					<el-link :underline="false" :href="form.file">点此下载</el-link>
				</el-form-item>
				<el-form-item label="被申诉学者名称">
					<span> {{ form.be_name }}</span>
				</el-form-item>
				<el-form-item label="处理理由">
      				<el-input v-model="handle_reason" type="textarea" />
    			</el-form-item>
				<el-form-item label="处理结果">
					<el-radio-group v-model="descion">
        				<el-radio label="0" size="small">不处理</el-radio>
      					<el-radio label="1" size="small">取消被申诉者身份</el-radio>
						<el-radio label="2" size="small">取消并允许替换被申诉者身份</el-radio>
      				</el-radio-group>
				</el-form-item>
				<el-form-item label="申请邮箱状态">
					<el-radio-group v-model="appeal_email_special">
        				<el-radio label="0" size="small">不评判</el-radio>
      					<el-radio label="1" size="small">普通邮箱</el-radio>
						<el-radio label="2" size="small">机构专属邮箱</el-radio>
      				</el-radio-group>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="undoEdit">取 消</el-button>
					<el-button type="primary" @click="saveEdit">确 定</el-button>
				</span>
			</template>
		</el-dialog>

		<el-dialog title ="认证申请" v-model="claimListVisible" width="65%">
			<el-form label-width="80px" :model="form" label-position="top">
				<el-form-item label="用户名">
					<span> {{ form.name }}</span>
				</el-form-item>
				<el-form-item label="邮箱">
					<span>{{ form.email }}</span>
				</el-form-item>
				<el-form-item label="邮箱是否为机构邮箱">
					<span> {{ form.email_commom }}</span>
				</el-form-item>
				<el-form-item label="申请内容">
					<span> {{ form.text }}</span>
				</el-form-item>
				<el-form-item label="申请文件">
					<el-link :underline="false" :href="form.file">点此下载</el-link>
				</el-form-item>
				<el-form-item label="申请认证的学者名称">
					<span> {{ form.be_name }}</span>
				</el-form-item>
				<el-form-item label="处理理由">
      				<el-input v-model="handle_reason" type="textarea" />
    			</el-form-item>
				<el-form-item label="处理结果">
					<el-radio-group v-model="descion">
        				<el-radio label="0" size="small">不通过</el-radio>
      					<el-radio label="1" size="small">通过</el-radio>
      				</el-radio-group>
				</el-form-item>
				<el-form-item label="申请邮箱状态">
					<el-radio-group v-model="appeal_email_special">
        				<el-radio label="0" size="small">不评判</el-radio>
      					<el-radio label="1" size="small">普通邮箱</el-radio>
						<el-radio label="2" size="small">机构专属邮箱</el-radio>
      				</el-radio-group>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="undoEdit">取 消</el-button>
					<el-button type="primary" @click="saveEdit">确 定</el-button>
				</span>
			</template>
		</el-dialog>

		<el-dialog title ="举报" v-model="reportListVisible" width="65%">
			<el-form label-width="80px" :model="form" label-position="top">
				<el-form-item label="用户名">
					<span> {{ form.name }}</span>
				</el-form-item>
				<el-form-item label="举报类型">
					<span> {{ form.type }}</span>
				</el-form-item>
				<el-form-item label="举报内容">
					<span> {{ form.text }}</span>
				</el-form-item>
				<el-form-item label="举报文件">
					<el-link :underline="false" :href="form.file">点此下载</el-link>
				</el-form-item>
				<el-form-item label="论文标题">
					<span> {{ form.paper_name }}</span>
				</el-form-item>
				<el-form-item v-show="comment" label="评论时间">
					<span> {{ form.type }}</span>
				</el-form-item>
				<el-form-item v-show="comment" label="评论用户">
					<span> {{ form.type }}</span>
				</el-form-item>
				<el-form-item v-show="comment" label="评论内容">
					<span> {{ form.type }}</span>
				</el-form-item>
				<el-form-item label="处理理由">
      				<el-input v-model="handle_reason" type="textarea"> </el-input>
    			</el-form-item>
				<el-form-item label="处理结果">
					<el-radio-group v-model="descion">
        				<el-radio label="0" size="small">不处理</el-radio>
      					<el-radio v-show="comment" label="1" size="small">删除评论</el-radio>
						<el-radio v-show="!comment" label="2" size="small">删除文章</el-radio>
      				</el-radio-group>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="undoEdit">取 消</el-button>
					<el-button type="primary" @click="saveEdit">确 定</el-button>
				</span>
			</template>
		</el-dialog>

	</div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { Edit, Search } from '@element-plus/icons-vue';
import axios from 'axios';

import store from '../../store';


let handle_reason = ref('');
let descion = ref(10);
let appeal_email_special = ref(10);

let comment = ref(false)
let itemKey = ref()
let state = "";
let affair_id = -10;

let dataList = store.getters.getAffairList
let tableDataList = reactive(store.getters.getAffairList)

let query = reactive({
	type: '全部',
	state: '全部',
	name: '',
});


// 查询操作
const handleSearch = () => {
	//console.log("筛选")
	//console.log(query)
	tableDataList = dataList.filter(item => {
        if (query.type !== "全部" && item.type !== query.type) {
            return false;
        }
        if (query.state !== "全部" && item.state !== query.state) {
            return false;
        }
        if (query.name && !item.name.includes(query.name)) {
            return false;
        }
		
        return true;
    });
	itemKey.value = Math.random()
	console.log(tableDataList)
};
// 分页导航
// const handlePageChange = (val: number) => {

// };

// 表格编辑时弹窗和保存
let appealListVisible = ref(false);
let claimListVisible = ref(false);
let reportListVisible = ref(false);

let form = reactive({
	id: '',
	name: '',
	email: '',
	email_commom: '',
	text: '',
	file: '',
	paper_name: '',
	type: '',
	comment_text: '',
	comment_user: '',
	comment_time: '',
	be_name: '',
});

const handleEdit = (row: any) => {
	if(row.state == "已处理"){
		alert("已经处理过啦")
	}
	else{
		switch(row.type){
			case "举报":
				state = "举报";
				affair_id = row.id;
				store.commit('getReport', row.id)
				//console.log(store.getters.getTheList)
				let list = store.getters.getTheList;
				//console.log(list);
				if(list[0].comment_id == -1){
					console.log(comment)
					form.type = "举报论文"
					comment.value = false;
				}
				else{
					form.type = "举报评论"
					form.comment_text = list[0].comment_content
					form.comment_user = list[0].comment_user
					form.comment_time = list[0].comment_time
					comment.value = true;
				}
				form.name = list[0].username;
				form.paper_name = list[0].paper_title;
				form.text = list[0].report_text;
				form.file = list[0].report_file;
				if(form.text == ''){
					form.text = "用户未填写举报理由"
				}
				if(form.file == ''){
					form.file = "用户未上传举报文件"
				}
				reportListVisible.value = true;
				break;
			case "申诉":
				state = "申诉";
				affair_id = row.id;
				store.commit('getAppeal', row.id)
				
				let list1 = store.getters.getTheList;
				console.log(list1)

				form.name = list1[0].username;
				form.email = list1[0].appeal_email;
				if(list1[0].appeal_email_common == false){
					form.email_commom = "非机构邮箱";
				}
				else{
					form.email_commom = "机构邮箱";
				}
				form.be_name = list1[0].scholar_name;
				form.text = list1[0].report_text;
				form.file = list1[0].report_file;
				if(form.text == ''){
					form.text = "用户未填写申诉理由"
				}
				if(form.file == ''){
					form.file = "用户未上传申诉文件"
				}
				appealListVisible.value = true;
				break;
			case "认证申请":
				affair_id = row.id;
				state = "认证申请";
				store.commit('getClaim', row.id)
				let list2 = store.getters.getTheList;
				console.log(list2)
				form.name = list2[0].username;
				form.email = list2[0].claim_email;
				if(list2[0].appeal_email_common == false){
					form.email_commom = "非机构邮箱";
				}
				else{
					form.email_commom = "机构邮箱";
				}
				form.text = list2[0].claim_text;
				form.file = list2[0].claim_file;
				if(form.text == ''){
					form.text = "用户未填写申诉理由"
				}
				if(form.file == ''){
					form.file = "用户未上传申诉文件"
				}
				form.be_name = list2[0].scholar_name;
				claimListVisible.value = true;
				break;
			default:
				break;
		}
	}
};
const saveEdit = () => {
	switch (state){
		case "举报":
			console.log("begin report")
    		axios({
        		url: 'http://122.9.5.156:8000/api/v1/admin/handle_report',
        		method: 'post',
        		data: JSON.stringify({
            		"token": store.getters.getUserinfo.token,
					"affair_id": affair_id,
					"handle_reason": handle_reason.value,
					"decision": descion,
        		})
    		}).then(res => {
        		console.log(res.data)
    		}).catch(err => {
        		console.log(err)
    		})
			reportListVisible.value = false;
			break;
		case "申诉":
		console.log("begin appeal")
			axios({
        		url: 'http://122.9.5.156:8000/api/v1/admin/handle_appeal',
        		method: 'post',
        		data: JSON.stringify({
            		"token": store.getters.getUserinfo.token,
					"affair_id": affair_id,
					"handle_reason": handle_reason.value,
					"decision": descion,
					"appeal_email_special": appeal_email_special,
        		})
    		}).then(res => {
        		console.log(res.data)
    		}).catch(err => {
        		console.log(err)
    		})
			appealListVisible.value = false;
			break;
		case "认证申请":
			console.log("begin claim")
			axios({
        		url: 'http://122.9.5.156:8000/api/v1/admin/handle_claim',
        		method: 'post',
        		data: JSON.stringify({
            		"token": store.getters.getUserinfo.token,
					"affair_id": affair_id,
					"handle_reason": handle_reason.value,
					"decision": descion,
					"appeal_email_special": appeal_email_special,
        		})
    		}).then(res => {
        		console.log(res.data)
    		}).catch(err => {
        		console.log(err)
    		})
			claimListVisible.value = false;
			break;
		default:
		console.log("begin get the data")
    	axios({
        	url: 'http://122.9.5.156:8000/api/v1/admin/get_affairs',
        	method: 'post',
        	data: JSON.stringify({
            	"token": store.getters.getUserinfo.token
        	})
    	}).then(res => {
        	console.log(res.data)
        	store.commit('initAffairList', res.data.data)
			
        	//console.log(store.getters.getAppealList)
        	//console.log(store.getters.getAffairList)
    	}).catch(err => {
        	console.log(err)
    	})
			dataList = store.getters.getAffairList
			tableDataList = reactive(store.getters.getAffairList)
			itemKey.value = Math.random()
			break;
	}
};

const undoEdit = () => {
	appealListVisible.value = false;
	claimListVisible.value = false;
	reportListVisible.value = false;
	descion.value = 10;
	appeal_email_special.value = 10;
}
</script>

<style scoped>
.textArea {
	height: auto;
	width: auto;
	resize:none
}
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