<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 入库出库
                </el-breadcrumb-item>
                <el-breadcrumb-item>包裹出库入柜</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="150px">
                   
                    <el-form-item label="仓库号：">
                       
                        <el-select v-model="form.region" placeholder="请选择仓库" class="handle-select mr10">
                            <el-option key="1" label="仓库1" value="1"></el-option>
                            <el-option key="2" label="仓库2" value="2"></el-option>
                            <el-option key="3" label="仓库3" value="3"></el-option>
                            <el-option key="4" label="仓库4" value="4"></el-option>
                        </el-select>
                    </el-form-item>
                     <el-form-item label="包裹编号：">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="快递柜号：">
                         <el-select v-model="form.cupboard" placeholder="请选择快递柜" class="handle-select mr10" >
                    
                            <el-option key="1" label="快递柜1" value="1"></el-option>
                            <el-option key="2" label="快递柜2" value="2"></el-option>
                            <el-option key="3" label="快递柜3" value="3"></el-option>
                            <el-option key="4" label="快递柜4" value="4"></el-option>
                        </el-select>
                    </el-form-item>
                    <label for="a"><br></label>
                     <el-form-item label="快递箱具体位置">
                    </el-form-item>
                    <el-form-item label="行数:">
                        <el-input v-model="form.row"></el-input>
                    </el-form-item>
                    <el-form-item label="列数:">
                        <el-input v-model="form.col"></el-input>
                    </el-form-item>
                    <label for="a"><br></label>
                    <el-form-item label="是否发送取件通知：">
                        <el-switch v-model="form.delivery"></el-switch>
                    </el-form-item>
                  
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">快递入柜</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'baseform',
    data() {
        return {
            options: [
                {
                    value: 'guangdong',
                    label: '广东省',
                    children: [
                        {
                            value: 'guangzhou',
                            label: '广州市',
                            children: [
                                {
                                    value: 'tianhe',
                                    label: '天河区'
                                },
                                {
                                    value: 'haizhu',
                                    label: '海珠区'
                                }
                            ]
                        },
                        {
                            value: 'dongguan',
                            label: '东莞市',
                            children: [
                                {
                                    value: 'changan',
                                    label: '长安镇'
                                },
                                {
                                    value: 'humen',
                                    label: '虎门镇'
                                }
                            ]
                        }
                    ]
                },
                {
                    value: 'hunan',
                    label: '湖南省',
                    children: [
                        {
                            value: 'changsha',
                            label: '长沙市',
                            children: [
                                {
                                    value: 'yuelu',
                                    label: '岳麓区'
                                }
                            ]
                        }
                    ]
                }
            ],
            form: {
                name: '',
                region: '',
                cupboard:'',
                col:'',
                row:'',
                date1: '',
                date2: '',
                delivery: true,
                type: ['步步高'],
                resource: '小天才',
                desc: '',
                options: []
            }
        };
    },
    methods: {
        onSubmit() {
            this.$message.success('提交成功！');
        }
    }
};
</script>