import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login/Login.vue';
import DashBoard from '../views/DashBoard/DashBoard.vue';
import Notice from '../views/Management/Notice.vue';
import UserInfo from '../views/Management/UserInfo.vue';
import SupplierInfo from '../views/Management/SupplierInfo.vue';
import Inquiry from '../views/Management/Inquiry.vue';

import ShoppingOrders from '../views/Trade/ShoppingOrders.vue';
import Shopping from '../views/Tasks/Shopping.vue';
import Orders from '../views/Tasks/Orders.vue';
import ShoppingReturnList from '../views/Trade/ShoppingReturnList.vue';
import Inventory from '../views/Trade/Inventory.vue';
import ShoppingReturn from '../views/Tasks/ShoppingReturn.vue';
import ShoppingList from '../views/Delivery/ShoppingList.vue';
import CommonCode from '../views/Management/CommonCode.vue';
import OrdersList from '../views/Tasks/OrdersList.vue';
import OrdersReturnList from '../views/Tasks/OrdersReturnList.vue';

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
                    {
                        path: 'common-code',
                        name: 'common-code',
                        component: CommonCode,
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
                    {
                        path: 'shopping-return-list',
                        name: 'shopping-return-list',
                        component: ShoppingReturnList,
                    },
                    {
                        path: 'inventory',
                        name: 'inventory',
                        component: Inventory,
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
                    {
                        path: 'orders-list',
                        name: 'orders-list',
                        component: OrdersList,
                    },
                    {
                        path: 'orders-return-list',
                        name: 'orders-return-list',
                        component: OrdersReturnList,
                    },
                ],
            },
            {
                path: 'delivery',
                name: 'delivery',
                children: [
                    {
                        path: 'shopping-list',
                        name: 'shopping-list',
                        component: ShoppingList,
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
