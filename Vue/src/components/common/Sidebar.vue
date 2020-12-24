<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#ffd04b"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            collapse: false,
            items: [
               
                
                {
                    icon: 'el-icon-lx-home',
                    index: 'dashboard',
                    title: '系统主页'
                },
                 {
                    icon: 'el-icon-lx-people',
                    index: 'employeeManage',
                    title: '员工管理',
                 
                },
                {
                    icon: 'el-icon-lx-calendar',
                    index: '3',
                    title: '包裹入库出库',
                    subs: [
                        {
                            index: 'packageInWarehouse',
                            title: '包裹入库'
                        },
                        {
                            index: 'packageOutWare',
                            title: '包裹出库入柜'
                        },
                      
                       
                    ]
                },
               
               
                {
                    icon: 'el-icon-pie-chart',
                    index: '4',
                    title: '网点容量查询',
                    subs: [
                        {
                            index: 'WareCapacity',
                            title: '仓库容量查询'
                        },
                        {
                            index: 'CupboardCapacity',
                            title: '快递柜容量查询'
                        },   
                    ]
                },
                 {
                    icon: 'el-icon-lx-search',
                    index: 'packageManage',
                    title: '包裹信息管理'
                },{
                    icon:'el-icon-lx-search',
                    index: 'orderManage',
                    title: '寄件订单管理'
                },
                {
                    icon:'el-icon-lx-comment',
                    index:'messageManage',
                    title:'消息管理'
                },
               
            ]
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
