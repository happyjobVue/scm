import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login/Login.vue';
import DashBoard from '../views/DashBoard/DashBoard.vue';
import Notice from '../views/Management/Notice.vue';

import ShoppingOrders from '../views/Trade/ShoppingOrders.vue';
import Shopping from '../views/Tasks/Shopping.vue';
import Orders from '../views/Tasks/Orders.vue';
import ShoppingReturn from '../views/Tasks/ShoppingReturn.vue';

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
                ],
            },
            {
                path: 'trade',
                name: 'trade',
                children: [
                    {
                        path: 'shopping-orders',
                        name: 'shopping-orders',
                        component: ShoppingOrders,
                    },
                ],
            },
            {
                path: 'tasks',
                name: 'tasks',
                children: [
                    {
                        path: 'shopping',
                        name: 'shopping',
                        component: Shopping,
                    },
                    {
                        path: 'orders',
                        name: 'orders',
                        component: Orders,
                    },
                    {
                        path: 'shopping-return',
                        name: 'shopping-return',
                        component: ShoppingReturn,
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
