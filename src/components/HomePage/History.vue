<template>
  <div class="history-dialog" ref="showDialog">
    <div style="margin-top: 18px">
      <span style="margin-left: 20px; font-weight: 600">Browsing history</span>
      <el-button
        type="primary"
        @click="clearAll()"
        style="margin-right: 10px; float: right"
        >Clear All</el-button
      >
    </div>
    <el-table :data="history_list" max-height="500px">
      <el-table-column width="100px">
        <template #default="{ row, $index }">
          <span v-if="row.type == 0">Article</span>
          <span v-if="row.type == 1">Author</span>
          <span v-if="row.type == 2">Institution</span>
        </template>
      </el-table-column>
      <el-table-column>
        <template #default="{ row, $index }">
          <span v-if="row.type == 0">{{ row.data.title }}</span>
          <span v-if="row.type == 1">{{ row.data.display_name }}</span>
          <span v-if="row.type == 2">{{ row.data.display_name }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { defineEmits } from "vue";
import axios from "axios";
import { ElDialog, ElForm, ElInput, ElButton, ElMessage } from "element-plus";
import { useStore } from "vuex";
const Store = useStore();
const showDialog = ref();
let listener;
let firstTime = true;
onMounted(() => {
  //getHistory();
  listener = document.addEventListener("click", (e) => {
    if (showDialog.value) {
      if (firstTime) {
        firstTime = false;
        return;
      }
      let isSelf = showDialog.value.contains(e.target);
      if (!isSelf) {
        emit("refresh");
      }
    }
  });
});
onUnmounted(() => {
  document.removeEventListener("click", listener);
});
const emit = defineEmits(["refresh"]);
function hide() {
  emit("refresh");
}
const history_list = ref([
  {
    history_id: 6,
    time: "2023-12-08 15:40:56",
    type: 2,
    data: {
      display_name: "Sorbonne Paris Cité",
      id: "220871436",
      image_url:
        "https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Fa%C3%A7ade%20de%20la%20chapelle%20Sainte-Ursule%2C%20Sorbonne%2C%20Paris.jpg",
      ror: "https://ror.org/001z21q04",
      summary_stats: {
        cited_by_count: 3279,
        "2yr_i10_index": 0,
        h_index: 16,
        i10_index: 24,
        oa_percent: 1.82,
        "2yr_mean_citedness": 0.03,
        works_count: 1973,
        "2yr_works_count": 40,
        "2yr_h_index": 1,
        "2yr_cited_by_count": 592,
      },
    },
  },
  {
    history_id: 5,
    time: "2023-12-08 15:40:41",
    type: 1,
    data: {
      display_name: "R.S. Cheng",
      id: "5049524680",
      most_cited_work:
        "Multiuser OFDM with adaptive subcarrier, bit, and power allocation (1999)",
      cited_by_count: 9116,
      summary_stats: {
        cited_by_count: 9116,
        "2yr_i10_index": 0,
        h_index: 40,
        i10_index: 105,
        oa_percent: 12.15,
        "2yr_mean_citedness": 3.0,
        works_count: 321,
        "2yr_works_count": 3,
        "2yr_h_index": 1,
        "2yr_cited_by_count": 359,
      },
      orcid: "https://orcid.org/0000-0001-6677-8737",
    },
  },
  {
    history_id: 4,
    time: "2023-12-08 15:40:26",
    type: 2,
    data: {
      display_name: "Omega Piezo Technologies (United States)",
      id: "4210092899",
      image_url: null,
      ror: "https://ror.org/00jch3e54",
      summary_stats: {
        cited_by_count: 856,
        "2yr_i10_index": 0,
        h_index: 16,
        i10_index: 22,
        oa_percent: 8.97,
        "2yr_mean_citedness": 0.5,
        works_count: 78,
        "2yr_works_count": 2,
        "2yr_h_index": 0,
        "2yr_cited_by_count": 40,
      },
    },
  },
  {
    history_id: 3,
    time: "2023-12-08 15:39:51",
    type: 1,
    data: {
      display_name: "Cheong Yui Wong",
      id: "5054683990",
      most_cited_work:
        "Multiuser OFDM with adaptive subcarrier, bit, and power allocation (1999)",
      cited_by_count: 2680,
      summary_stats: {
        cited_by_count: 2680,
        "2yr_i10_index": 0,
        h_index: 3,
        i10_index: 3,
        oa_percent: 50.0,
        "2yr_mean_citedness": 0,
        works_count: 4,
        "2yr_works_count": 0,
        "2yr_h_index": 0,
        "2yr_cited_by_count": 40,
      },
      orcid: null,
    },
  },
  {
    history_id: 2,
    time: "2023-12-08 15:39:01",
    type: 0,
    data: {
      title:
        "Multiuser OFDM with adaptive subcarrier, bit, and power allocation",
      id: "2106749358",
      cited_count: 2550,
      author_all: [
        {
          name: "Cheong Yui Wong",
          id: "5054683990",
        },
        {
          name: "R.S. Cheng",
          id: "5049524680",
        },
        {
          name: "K.B. Lataief",
          id: "5036836941",
        },
        {
          name: "R.D. Murch",
          id: "5004541948",
        },
      ],
      publication_date: "1999-01-01",
    },
  },
  {
    history_id: 1,
    time: "2023-12-08 15:34:15",
    type: 0,
    data: {
      title: "Wireless mesh networks: a survey",
      id: "2150825860",
      cited_count: 3708,
      author_all: [
        {
          name: "Ian F. Akyildiz",
          id: "5044396726",
        },
        {
          name: "Xudong Wang",
          id: "5019290469",
        },
        {
          name: "Weilin Wang",
          id: "5024421837",
        },
      ],
      publication_date: "2005-03-01",
    },
  },
]);
function clearAll() {
  axios({
    url: "http://122.9.5.156:8000/api/v1/home/clear_history",
    method: "post",
    data: JSON.stringify({
      token: Store.getters.getUserinfo.token,
    }),
  })
    .then((res) => {
      if (res.data.errno == 0) {
        ElMessage.success("Clear successfully!");
        history_list.value = [];
      } else {
        ElMessage.error("Clear failed!");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
function getHistory() {
  let login = Store.getters.getLoginState;
  if (!login) {
    ElMessage.error("Please login first!");
    emit("refresh");
  } else {
    axios({
      url: "http://122.9.5.156:8000/api/v1/home/get_history",
      method: "post",
      data: JSON.stringify({
        token: Store.getters.getUserinfo.token,
      }),
    })
      .then((res) => {
        history_list.value = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
function handleClose() {
  emit("refresh");
}
</script>
<style scoped lang="scss">
.history-dialog {
  padding: 3px;
  border-radius: 10px;
  box-shadow: black 0px 0px 10px 0px;
  width: 300px;
  background-color: white;
  position: fixed;
  top: 65px;
  right: 120px;
  z-index: 999;
}
:deep(.el-button) {
  background-color: #f0f4ff;
  color: black;
}
:deep(.el-table) {
  background-color: #ffffff;
  color: black;
}
</style>
