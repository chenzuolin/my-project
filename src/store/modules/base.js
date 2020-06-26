const base = {
    state: {
        departmentLsit: [] //部门列表
    },
    mutations: {
        setdepartmentLsit(state, list) {
            state.departmentLsit = list;
        }
    },
    getters: {
        departmentList(state) {
            return state.departmentLsit;
        }
    },
    actions: {

    }
}

export default base