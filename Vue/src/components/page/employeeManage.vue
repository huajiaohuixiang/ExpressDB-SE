<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-cascades"></i> 员工管理 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="handleAdd()">添加员工</el-button>
                <!-- <el-select v-model="query.ms_type" placeholder="员工类型" class="handle-select mr10">
                    <el-option key="1" label="寄件消息" value="寄件消息"></el-option>
                    <el-option key="2" label="取件消息" value="取件消息"></el-option>
                </el-select> -->
                <el-input v-model="query.id" placeholder="员工id" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column prop="employeeId" label="员工ID" width="100" align="center"></el-table-column>
                <el-table-column prop="name" label="姓名" align="center" width="120"></el-table-column>
                <el-table-column prop="sex" label="性别" align="center" width="80"></el-table-column>

                <el-table-column prop="address" label="地址" align="center" width="200"></el-table-column>
                <el-table-column prop="cellPhone" label="联系电话" align="center" width="175"></el-table-column>
                <el-table-column prop="departmentId" label="部门id" align="center" width="120 "></el-table-column>
                <el-table-column prop="position" label="职位" align="center" width="120 "></el-table-column>
                <el-table-column label="状态" align="center" width="110">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.status === '空闲' ? 'success' : scope.row.status === '已接单' ? 'danger' : ''">{{
                            scope.row.status
                        }}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="160" align="center">
                    <template slot-scope="scope">
                        <!-- <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button> -->
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">修改信息</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)"
                            >删除</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="修改员工消息" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="用户id">
                    <el-input v-model="form.employeeId"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-input v-model="form.sex"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input v-model="form.cellPhone"></el-input>
                </el-form-item>
                <el-form-item label="部门id">
                    <el-input v-model="form.departmentId"></el-input>
                </el-form-item>
                <el-form-item label="职位">
                    <el-input v-model="form.position"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-input v-model="form.status"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit()">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 添加员工弹出框 -->
        <el-dialog title="添加员工" :visible.sync="addVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="用户id">
                    <el-input v-model="form.employeeId"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-input v-model="form.sex"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input v-model="form.cellPhone"></el-input>
                </el-form-item>
                <el-form-item label="部门id">
                    <el-input v-model="form.departmentId"></el-input>
                </el-form-item>
                <el-form-item label="职位">
                    <el-input v-model="form.position"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-input v-model="form.status"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="addEmployee()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'basetable',
    data() {
        return {
            query: {
                content: '',
                id: '',
                ms_type: '',
                pageIndex: 1,
                pageSize: 50
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            addVisible: false,
            pageTotal: 0,
            form: {
                employeeId: '',
                sex: '男',
                name: '匡爬爬',
                address: '上海嘉定',
                cellPhone: '19966665592',
                departmentId: '000003',
                position: '快递员',
                status: '空闲'
            },
            idx: -1,
            id: -1,
            maxid: 0
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            let that = this;
            this.$axios.get('https://www.csystd.cn:9999/worker/getEmployee',{
               
                params:{
                    token:localStorage.getItem('token')
                }
            }).then(function (response) {
                console.log(response.data);
                that.tableData = response.data;
                that.pageTotal = response.data.length;
            });
        },
        handleAdd() {
            this.addVisible = true;
        },
        addEmployee() {
            let that = this;
            console.log(that.form);
            this.$axios.post('https://www.csystd.cn:9999/worker/addEmployee', that.form,{
               
                params:{
                    token:localStorage.getItem('token')
                }
            }).then(function (response) {
                console.log(response);
                 if (response.data.code='400'){
                   that.$message.error(response.data.message);
               }else{ that.$message.success('添加成功！');}
            });
        },
        // 触发搜索按钮
        handleSearch() {
            let that = this;
            console.log(this.query);
            that.$axios
                .get('https://www.csystd.cn:9999/worker/searchEmployee?employee_id=' + that.query.id ,{
               
                params:{
                    token:localStorage.getItem('token')
                }
            })
                .then(function (response) {
                    console.log(response);
                    that.tableData = response.data;
                    that.pageTotal = response.data.length;
                    if (response.data.length != 0) {
                        that.$message.success('查询成功');
                    } else {
                        that.$message.error('查询失败，未找到相关消息！');
                    }
                });
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$message.success('删除成功');
                    let that = this;
                    console.log(row);
                    that.$axios.post('https://www.csystd.cn:9999/worker/deleteEmployee?employee_id=' + row.employeeId,{
               
                params:{
                    token:localStorage.getItem('token')
                }
            }).then(function (response) {
                        console.log(response);
                        that.getData();
                    });
                })
                .catch(() => {});
        },
     
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            console.log(this.form);
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            //
            let that = this;
            console.log(that.form);
            this.$confirm('确定要修改吗现在吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    that.$axios
                        .post('https://www.csystd.cn:9999/worker/updateEmployee', that.form,{
               
                params:{
                    token:localStorage.getItem('token')
                }
            })
                        .then(function (response) {
                            console.log(response);
                            that.$message.success('修改成功！');
                        })
                        .catch(function (error) {
                            console.log('错误');
                        });
                })
                .catch(() => {});
            this.editVisible = false;

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
