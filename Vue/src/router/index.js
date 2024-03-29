import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [{
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () =>
                import ( /* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [{
                    path: '/dashboard',
                    component: () =>
                        import ( /* webpackChunkName: "dashboard" */ '../components/page/Dashboard/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/messageManage',
                    component: () =>
                        import ( /* webpackChunkName: "messageManage" */ '../components/page/messageManage.vue'),
                    meta: { title: '消息管理' }
                },
                {
                    path: '/employeeManage',
                    component: () =>
                        import ( /* webpackChunkName: "messageManage" */ '../components/page/employeeManage.vue'),
                    meta: { title: '员工管理' }
                },
                {
                    path: '/icon',
                    component: () =>
                        import ( /* webpackChunkName: "icon" */ '../components/page/useless/Icon.vue'),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/orderManage',
                    component: () =>
                        import ('../components/page/orderManage.vue'),
                    meta: { title: '寄件订单管理' }
                },
             
                {
                    path: '/packageInWarehouse',
                    component: () =>
                        import ( /* webpackChunkName: "dashboard" */ '../components/page/packageInWarehouse/index.vue'),
                    meta: { title: '包裹入库' }
                },
                {
                    path: '/packageManage',
                    component: () =>
                        import ( /* webpackChunkName: "icon" */ '../components/page/packageManage.vue'),
                    meta: { title: '包裹管理' }
                },

                {
                    path: '/packageOutWare',
                    component: () =>
                        import ( /* webpackChunkName: "icon" */ '../components/page/packageOutWare.vue'),
                    meta: { title: '包裹出库' }
                },
       
                {
                    path: '/CupboardCapacity',
                    component: () =>
                        import ( /* webpackChunkName: "icon" */ '../components/page/CupboardCapacity.vue'),
                    meta: { title: '快递柜容量' }
                },
                {
                    path: '/WareCapacity',
                    component: () =>
                        import ( /* webpackChunkName: "icon" */ '../components/page/WareCapacity.vue'),
                    meta: { title: '仓库容量' }
                },
                {
                    path: '/table',
                    component: () =>
                        import ( /* webpackChunkName: "table" */ '../components/page/useless/BaseTable.vue'),
                    meta: { title: '基础表格' }
                },
           
                {
                    path: '/form',
                    component: () =>
                        import ( /* webpackChunkName: "form" */ '../components/page/useless/BaseForm.vue'),
                    meta: { title: '基本表单' }
                },
               
               
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () =>
                        import ( /* webpackChunkName: "upload" */ '../components/page/useless/Upload.vue'),
                    meta: { title: '文件上传' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: () =>
                        import ( /* webpackChunkName: "chart" */ '../components/page/useless/BaseCharts.vue'),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: () =>
                        import ( /* webpackChunkName: "drag" */ '../components/page/useless/DragList.vue'),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: () =>
                        import ( /* webpackChunkName: "dragdialog" */ '../components/page/useless/DragDialog.vue'),
                    meta: { title: '拖拽弹框' }
                },
                
                  
               
                {
                    // 权限页面
                    path: '/permission',
                    component: () =>
                        import ( /* webpackChunkName: "permission" */ '../components/page/useless/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () =>
                        import ( /* webpackChunkName: "404" */ '../components/page/wrongpage/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () =>
                        import ( /* webpackChunkName: "403" */ '../components/page/wrongpage/403.vue'),
                    meta: { title: '403' }
                },
              
            ]
        },
        {
            path: '/login',
            component: () =>
                import ( /* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '/registry',
            component: () =>
                import ( /* webpackChunkName: "login" */ '../components/page/registry.vue'),
            meta: { title: '注册' }
        },
        // {
        //     path: '/tabs',
        //     component: () =>
        //         import ( /* webpackChunkName: "tabs" */ '../components/page/Message.vue'),
        //     meta: { title: '个人中心' }
        // },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});