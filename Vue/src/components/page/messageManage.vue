<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-cascades"></i> 消息管理 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">批量删除</el-button>
                <el-select v-model="query.ms_type" placeholder="消息类型" class="handle-select mr10">
                    <el-option key="1" label="寄件消息" value="寄件消息"></el-option>
                    <el-option key="2" label="取件消息" value="取件消息"></el-option>
                </el-select>
                <el-input v-model="query.id" placeholder="用户id" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="messageId" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="userId" label="用户id" align="center" width="120"></el-table-column>
                <el-table-column prop="messageType" label="消息类型" align="center"></el-table-column>

                <el-table-column prop="content" label="内容" align="center" width="300"></el-table-column>
                <el-table-column label="状态" align="center" width="110">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.status === '已重发' ? 'success' : scope.row.status === '已发送' ? 'danger' : ''">{{
                            scope.row.status
                        }}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column prop="sendDate" label="发送时间" align="center" width="120"></el-table-column>
                <el-table-column label="操作" width="160" align="center">
                    <template slot-scope="scope">
                        <!-- <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button> -->
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">重新发送</el-button>
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
        <el-dialog title="重新发送消息" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="用户id">
                    <el-input v-model="form.userId"></el-input>
                </el-form-item>
                <el-form-item label="内容">
                    <el-input v-model="form.content"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit()">确 定</el-button>
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
            pageTotal: 0,
            form: {},
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
            this.$axios.get('https://www.csystd.cn:9999/worker/getMessage',{
               
                params:{
                    token:localStorage.getItem('token')
                }
            }).then(function (response) {
                console.log(response.data);
                that.tableData = response.data;
                that.pageTotal = response.data.length;
            });
        },
        // 触发搜索按钮
        handleSearch() {
            let that = this;
            console.log(this.query);
            that.$axios
                .get('https://www.csystd.cn:9999/worker/searchMessage?user_id=' + that.query.id + '&message_type=' + that.query.ms_type,{
               
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
                    that.$axios.post('https://www.csystd.cn:9999/worker/deleteMessage?message_id=' + row.messageId,{
               
                params:{
                    token:localStorage.getItem('token')
                }
            }).then(function (response) {
                        console.log(response);
                    });
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            console.log(this.multipleSelection);
             this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$message.success('删除成功');
                    let that = this;
                    for (let i = 0; i < length; i++) {
                         that.$axios.post('https://www.csystd.cn:9999/worker/deleteMessage?message_id=' + that.multipleSelection[i].messageId,{
               
                params:{
                    token:localStorage.getItem('token')
                }
            }).then(function (response) {
                        console.log(response);
                    });
               
            }
                   
                })
                .catch(() => {});
            // let str = '';
            // this.delList = this.delList.concat(this.multipleSelection);
            // for (let i = 0; i < length; i++) {
            //     str += this.multipleSelection[i].name + ' ';
            // }
            // this.$message.error(`删除了${str}`);
            // this.multipleSelection = [];
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

            that.form.status = '已重发';
            that.$axios
                .post('https://www.csystd.cn:9999/worker/updateMessage', that.form,{
               
                params:{
                    token:localStorage.getItem('token')
                }
            })
                .then(function (response) {
                    console.log(response);
                    that.$axios.get('https://www.csystd.cn:9999/worker/lastMessage',{
               
                params:{
                    token:localStorage.getItem('token')
                }
            }).then(function (response) {
                        console.log(response.data);
                        that.maxid = (parseInt(response.data.messageId) + 1).toString();
                        console.log(that.maxid);
                        that.form.messageId = that.maxid;
                        console.log(that.form);
                        that.$axios
                            .post('https://www.csystd.cn:9999/worker/resendMessage', that.form,{
               
                params:{
                    token:localStorage.getItem('token')
                }
            })
                            .then(function (response) {
                                console.log(response);
                                that.getData();
                            })
                            .catch(function (error) {
                                console.log('错误');
                            });
                    });
                })
                .catch(function (error) {
                    console.log('错误');
                });

            // this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            // this.$set(this.tableData, this.idx, this.form);
            this.editVisible = false;
            this.$message.success('重新发送消息成功');
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
