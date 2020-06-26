import Vue from 'vue'
//导入路由插件
import VueRouter from 'vue-router'
//注入插件
Vue.use(VueRouter)
const route = new VueRouter({
    routes: [{
            path: '/',
            redirect: '/department'
        },
        {
            path: '/department',
            component: () => import('@/views/department'),
            meta: {
                title: '部门管理'
            }
        },
        {
            path: '/userlist',
            component: () => import('@/views/user-list'),
            meta: {
                title: '用户管理'
            }
        }
    ],
    mode: 'history',
    linkActiveClass: 'active'
})
route.beforeEach((to, from, next) => {
    window.document.title = to.meta.title;
    next()
})
export default route