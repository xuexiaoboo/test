import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/2-2',
        name: 'axios请求方法',
        component: () =>
            import ('../views/2-2.vue')
    },
    {
        path: '/2-3',
        name: 'axios并发请求',
        component: () =>
            import ('../views/2-3.vue')
    },
    {
        path: '/',
        name: 'contactList',
        component: () =>
            import ('../views/ContactList.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router