import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login/Login.vue';
import DashBoard from '../views/DashBoard/DashBoard.vue';
import Notice from '../views/Management/Notice.vue';
import UserInfo from '../views/Management/UserInfo.vue';
import SupplierInfo from '../views/Management/SupplierInfo.vue';
import Inquiry from '../views/Management/Inquiry.vue';

const routes = [
    {
        path: '/',
        name: 'login',
        component: Login,
    },
    {
        path: '/vue',
        name: 'vue',
        component: DashBoard,
        children: [
            {
                path: 'management',
                name: 'management',
                children: [
                    {
                        path: 'notice',
                        name: 'notice',
                        component: Notice,
                    },
                    {
                        path: 'user-info',
                        name: 'user-info',
                        component: UserInfo,
                    },
                    {
                        path: 'supplier-info',
                        name: 'supplier-info',
                        component: SupplierInfo,
                    },
                    {
                        path: 'inquiry',
                        name: 'inquiry',
                        component: Inquiry,
                    },
                ],
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory('/'),
    routes,
});

export default router;
