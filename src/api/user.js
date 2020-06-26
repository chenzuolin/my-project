import request from '@/utils/request'

const group_name = 'user'

export default {
    getById(id) {
        return new request({
            url: `/${group_name}/get/${id}`,
            method: 'get'
        })
    },
    save(user) {
        return new request({
            url: `/${group_name}/save`,
            method: 'post',
            data: user
        })
    },
    delById(id) {
        return new request({
            url: `/${group_name}/delete/${id}`,
            method: 'delete'
        })
    },
    updateById(user) {
        return new request({
            url: `/${group_name}/update`,
            method: 'update',
            data: user
        })
    },
    getByPage(page) {
        return new request({
            url: `/${group_name}/page`,
            method: 'post',
            data: page
        })
    }

}