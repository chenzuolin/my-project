import request from '@/utils/request'
const group_name = 'department'
export default {
    getDepartMentList() {
        return new request({
            url: `/${group_name}/departmentList`,
            method: 'get'
        })
    }
}