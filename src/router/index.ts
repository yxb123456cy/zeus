import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/dashboard',
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../views/Dashboard/Dashboard.vue'),
        redirect: '/dashboard/home',
        children: [
            {
                path: '/dashboard/home',
                name: 'Home',
                component: () => import('../views/Home/Home.vue'),
            },
            {
                path: '/dashboard/userManagement',
                name: 'UserManagement',
                component: () => import('../views/Management/user/UserManagement.vue'),
            },
            {
                path: '/dashboard/settings',
                name: 'Settings',
                component: () => import('../views/Settings/Settings.vue'),
            },
            {
                path: '/dashboard/profile',
                name: 'Profile',
                component: () => import('../views/Profile/Profile.vue'),
            },
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login/Login.vue'),
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Register/Register.vue'),
    },
    {
        path: '/forgot-password',
        name: 'Forgot-password',
        component: () => import('../views/Forgot-password/Forgotpassword.vue'),
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
