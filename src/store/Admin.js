const AdminMoudle = {
    state: {
        //isAdmin : false,
        isAdmin : true,
        collapse : true,
        name: 'Admin',
        role: '超级管理员',
        lastLoginTime : '2023-12-26',
        lastLoginLocation : '北京',

        affairList: [],
        //申诉
        appealList: [],
        //认证
        cliamList: [],
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

        initAffairList(state, affairList){
            store.affairList = affairList
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
        }
    },

};
export default AdminMoudle