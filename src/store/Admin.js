const AdminMoudle = {
    state: {
        //isAdmin : false,
        isAdmin : true,
        collapse : true,
        name: 'Admin',
        role: '超级管理员',
        lastLoginTime : '2023-12-26',
        lastLoginLocation : '北京',
        list: [],

        affairList: [],
        //申诉
        appealList: [],
        //认证
        claimList: [],
        //举报
        reportList: [],

        todoList : [
            {
                title: '今天要修复100个bug',
                status: false
            },
            {
                title: '今天要写100行代码加几个bug吧',
                status: false
            },
            {
                title: '今天要修复100个bug',
                status: false
            },
            {
                title: '今天要修复100个bug',
                status: true
            },
            {
                title: '今天要写100行代码加几个bug吧',
                status: true
            },
        ]
    },

    mutations: {
        AdminLogin(state){
            state.isAdmin = true
        },
        AdminLogout(state){
            state.isAdmin = false
        },
        CollapseChange(state){
            state.collapse = !state.collapse
        },
        AddTodoList(state, toDoItem){
            state.todoList.push({title: toDoItem.value, status: false})
	        state.todoList = state.todoList.sort((a, b) =>{
		        if(a.status == b.status){
			        return a.title.localeCompare(b.title)
                }
		        else{
			        return a.status - b.status
		        }
	        }
	        )
            return state.todoList
        },
        DeleteTodoList(state, index, num){
            state.todoList.splice(index, num)
        },

        initAffairList(state, data){
            state.appealList = data.appeal
            state.claimList = data.claim
            state.reportList = data.report
            state.affairList = []
            for(let i = 0; i < state.appealList.length; i ++){
                state.affairList.push({
                    "id" : state.appealList[i].affair_id,
                    "name" : state.appealList[i].username,
                    "type" : "申诉",
                    "date" : state.appealList[i].submit_time,
                    "state" : "未处理",
                })
            }
            for(let i = 0; i < state.claimList.length; i ++){
                state.affairList.push({
                    "id" : state.claimList[i].affair_id,
                    "name" : state.claimList[i].username,
                    "type" : "认证申请",
                    "date" : state.claimList[i].submit_time,
                    "state" : "未处理",
                })
            }
            for(let i = 0; i < state.reportList.length; i ++){
                state.affairList.push({
                    "id" : state.reportList[i].affair_id,
                    "name" : state.reportList[i].username,
                    "type" : "举报",
                    "date" : state.reportList[i].submit_time,
                    "state" : "未处理",
                })
            }

            state.affairList = state.affairList.sort((a, b) =>{
		        if(a.date == b.date){
			        return a.id - b.id
                }
		        else{
			        return Date.parse(a.date) - Date.parse(b.date);
		        }
	        }
	        )
        },

        getAppeal(state, id){
            state.list = []
            state.list = state.appealList.filter(item => item.affair_id == id)
        },

        getClaim(state, id){
            state.list = []
            state.list = state.claimList.filter(item => item.affair_id == id)
        },

        getReport(state, id){
            state.list = []
            state.list = state.reportList.filter(item => item.affair_id == id)
        },
    },

    actions: {
        
    },

    getters: {
        getCollapse(state){
            return state.collapse
        },

        getIsAdmin(state){
            return state.isAdmin
        },

        getLoginTime(state){
            return state.lastLoginTime
        },

        getLoginLocation(state){
            return state.lastLoginLocation
        },

        getName(state){
            return state.name
        },

        getRole(state){
            return state.role
        },

        getTodoList(state){
            return state.todoList
        },

        getAffairList(state){
            return state.affairList
        },

        getAppealList(state){
            return state.appealList
        },

        getClaimList(state){
            return state.claimList
        },

        getTheList(state){
            return state.list
        },

        getReportList(state){
            return state.reportList
        },

        getAffairListLength(state){
            return state.affairList.length
        },

        getAppealListLength(state){
            return state.appealList.length
        },

        getClaimListLength(state){
            return state.claimList.length
        },

        getReportListLength(state){
            return state.reportList.length
        },

    },

};
export default AdminMoudle