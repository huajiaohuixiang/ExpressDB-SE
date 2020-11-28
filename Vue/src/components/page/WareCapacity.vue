<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 仓库容量查询
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            
            <el-tag  
            size="medium"
            effect="plain"
            v-for="i in warelist"
            v-bind:todo="i"
            v-bind:key="i"
            >
            仓库{{i}}   剩余容量：1000
            </el-tag>
            
        </div>
       


        <div class="container">
            <div class="handle-box">
                <el-button
                    type="primary"
                    icon="el-icon-delete"
                    class="handle-del mr10"
                    @click="delAllSelection"
                >批量删除</el-button>
                <el-select v-model="query.address" placeholder="仓库选择" class="handle-select mr10">
                    <el-option key="1" label="仓库1" value="1"></el-option>
                    <el-option key="2" label="仓库2" value="2"></el-option>
                     <el-option key="3" label="仓库3" value="3"></el-option>
                  <el-option key="4" label="仓库4" value="4"></el-option>
                </el-select>
                <el-input v-model="query.name" placeholder="包裹编号" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                :data="tableData.slice((query.pageIndex-1)*query.pageSize,query.pageIndex*query.pageSize)"
                stripe
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="warehouse_ID" label="仓库编号"  align="center"></el-table-column>
                <el-table-column prop="package_id" label="包裹编号"  align="center"></el-table-column>
                <el-table-column prop="name" label="发件人" align="center"></el-table-column>
                <el-table-column prop="phone" label="发件人手机"  align="center"> </el-table-column>
               
                <el-table-column prop="receivename" label="收件人"  align="center">
                 
                    <!-- <template slot-scope="scope">{{scope.row.toname}}</template> -->
                </el-table-column>
                 <el-table-column prop="receivephone" label="收件人手机" ></el-table-column> 
               
                <el-table-column prop="company" label="快递公司"  align="center">
                    <template slot-scope="scope">
                        {{scope.row.company}}
                    </template>
                </el-table-column>
                

                           
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pagesize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="订单编号">
                    <el-input v-model="form.order_id"></el-input>
                </el-form-item>
                <el-form-item label="发件人">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="发件人手机号">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="收件人">
                    <el-input v-model="form.receivename"></el-input>
                </el-form-item>
                <el-form-item label="收件人手机号">
                    <el-input v-model="form.receivephone"></el-input>
                </el-form-item>
                <el-form-item label="收件地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="快递公司">
                    <el-input v-model="form.company"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-input v-model="form.state"></el-input>
                </el-form-item>


            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { fetchData } from '../../api/index';
export default {
    name: 'basetable',
    data() {
        return {
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            warelist:[1,2,3,4],
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            fetchData(this.query).then(res => {
                console.log(res);
                this.tableData = res.list;
                this.pageTotal = res.pageTotal || 50;
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$message.success('删除成功');
                    this.tableData.splice(index, 1);
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
