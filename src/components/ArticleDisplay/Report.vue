<template>
    <el-dialog title="" v-model="reportDialog" width="40%" :before-close="handleClose">
        <el-form :model="reportInfo" :rules="rules" ref="updateInfo" label-width="150px">
            <div class="update-content">
                <div class="left">
                    <el-form-item label="举报说明" prop="description">
                        <el-input v-model="reportInfo.description" :rows="4" type="textarea" placeholder="请输入举报理由" />
                    </el-form-item>
                    <el-form-item label="详细材料" prop="details">
                        <el-upload
                                ref="upLoads"
                                class="upload-demo"
                                drag
                                :limit="1"
                                :auto-upload="false"
                                :on-change="handleChange"
                                :show-file-list="true"
                        >
                            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                            <div class="el-upload__text">
                                Drop file here or <em>click to upload</em>
                            </div>
                        </el-upload>
                    </el-form-item>
                </div>
            </div>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
              <el-button @click="handleClose()">取消</el-button>
              <el-button type="primary" @click="editP()">
                保存
              </el-button>
            </span>
        </template>
    </el-dialog>
</template>


<script setup>
import {reactive, ref, watch} from "vue";
import { UploadFilled} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
import store from "../../store/index.js";
import axios from "axios";



const reportInfo = reactive({
    description: "",
})
const rules = {
    description: [
        { required: true, message: "举报说明不能为空", trigger: "blur" },
    ]
}
const reportDialog = ref(props.com.isVisible)


const comment_id = ref(1)
const file = ref(null)
const reportUrl = ref("http://122.9.5.156:8000/api/v1/paper/report_comment_or_paper")
const handleChange = (file) => {
    file.value = file.raw
    console.log(file.value)
};
function handleClose() {
    reportDialog.value = false
    reportInfo.description = ""
    file.value = null
}
const handleUploadSuccess = (response) => {
    ElMessage.success("Report successful, please wait for the administrator to process！")
};

const handleUploadError = (err) => {
    // 上传失败的回调函数
    console.log(err);
};
function editP() {
    // console.log(userInfo)
    // uploadFile(userImage)
    const formData = new FormData();
    formData.append("token", store.state.User.token);
    formData.append("paper_id", store.state.Article.id);
    formData.append("reportText", reportInfo.description);
    formData.append("report_file", file.value);
    formData.append("comment_id", props.com.comment_id);
    // 发送上传请求
    axios.post(reportUrl.value, formData)
        .then(response => {
            handleUploadSuccess(response.data);
        })
        .catch(error => {
            handleUploadError(error);
        });
    reportDialog.value = false
}
</script>


<style scoped>
.update-content {
    max-height: 680px;
    overflow: auto;
}

.left {
    width: 80%;
}

.upload-demo{
    width: 660px;
}
</style>
