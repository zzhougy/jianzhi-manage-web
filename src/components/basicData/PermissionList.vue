<!--<template>-->
<!--&lt;!&ndash; 角色管理 &ndash;&gt;-->
<!--<section class="permission">-->
<!--  &lt;!&ndash; start btn group &ndash;&gt;-->
<!--  <el-row class="table-control">-->
<!--    <el-col :span="18">-->
<!--      <el-button icon="el-icon-plus" size="small" type="primary" plain @click="clickAdd">新增角色</el-button>-->
<!--    </el-col>-->
<!--    <el-col :span="6"></el-col>-->
<!--  </el-row>-->
<!--  &lt;!&ndash; end btn group &ndash;&gt;-->
<!--  &lt;!&ndash; start table &ndash;&gt;-->
<!--  <article class="table-data">-->
<!--    <el-table :data="data" border style="width: 80%">-->
<!--      <el-table-column type="index" width="100" label="ID" align="center"></el-table-column>-->
<!--      <el-table-column width="200" prop="code" label="角色编号"></el-table-column>-->
<!--      <el-table-column width="200" prop="name" label="角色名称"></el-table-column>-->
<!--      <el-table-column  prop="remark" label="备注"></el-table-column>-->
<!--      <el-table-column width="200" prop="createdBy" label="创建人"  align="center"></el-table-column>-->
<!--      <el-table-column width="200" prop="creationtime" label="创建时间" align="center" ></el-table-column>-->
<!--      &lt;!&ndash; <el-table-column prop="isEable" label="是否启用" align="center" width="100">-->
<!--        <template slot-scope="scope">-->
<!--          <el-tag effect="dark" :type="scope.row.isEable === '0' ? 'success' : 'warning'" size="mini">{{scope.row.isEable | changeToText}}</el-tag>-->
<!--        </template>-->
<!--      </el-table-column> &ndash;&gt;-->
<!--      <el-table-column label="操作" width="180" fixed="right">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button type="danger" @click="clickDelete(scope.row)" size="mini" plain icon="el-icon-delete" circle title="删除"></el-button>-->
<!--          <el-button size="mini" @click="clickEdit(scope.row)" circle icon="el-icon-edit" title="编辑"></el-button>-->
<!--          <el-button size="mini" @click="grant(scope.row)" circle icon="el-icon-present" title="授权"></el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--    </el-table>-->
<!--  </article>-->
<!--  &lt;!&ndash; end table &ndash;&gt;-->

<!--  <el-pagination  -->
<!--                :current-page="pageCurrent" :page-sizes="[50, 100, 200]" :page-size="pageSize" -->
<!--                layout="total, sizes, prev, pager, next, jumper" :total="count"-->
<!--                class="table-pagination">-->
<!--  </el-pagination>-->
<!-- -->
<!--  <el-dialog title="角色信息" :visible.sync="modalAdd" width="1100px" :append-to-body="true" :close-on-click-modal="false">-->
<!--    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" label-suffix="：">-->
<!--      <el-row :gutter="24">-->
<!--        <el-col :span="12">-->
<!--          <el-form-item label="角色编码" prop="code">-->
<!--            <el-input v-model="ruleForm.code" placeholder="请输入编号"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="角色名称" prop="name">-->
<!--            <el-input v-model="ruleForm.name" placeholder="请输入名称"></el-input>-->
<!--          </el-form-item>-->
<!--          &lt;!&ndash; <el-form-item label="是否启用" prop="isEnable">-->
<!--            <el-radio-group v-model="ruleForm.isEnable">-->
<!--              <el-radio label="0">启用</el-radio>-->
<!--              <el-radio label="1">禁用</el-radio>-->
<!--            </el-radio-group>-->
<!--          </el-form-item> &ndash;&gt;-->
<!--          <el-form-item label="创建人" prop="createdBy">-->
<!--            {{ruleForm.createdBy}}-->
<!--          </el-form-item>-->
<!--          <el-form-item label="创建时间" prop="creationTime">-->
<!--            {{ruleForm.createdTime}}-->
<!--          </el-form-item>-->
<!--          <el-form-item label="更新人" prop="updatedBy">-->
<!--            {{ruleForm.updatedBy}}-->
<!--          </el-form-item>-->
<!--          <el-form-item label="更新时间" prop="updatedTime">-->
<!--            {{ruleForm.updatedDate}}-->
<!--          </el-form-item>-->
<!--          <el-form-item label="备注" prop="remarks">-->
<!--            <el-input type="textarea" v-model="ruleForm.remarks" placeholder="请输入备注"></el-input>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--      </el-row>-->
<!--    </el-form>-->
<!--    <span slot="footer" class="dialog-footer">-->
<!--      <el-button @click="initForm">取 消</el-button>-->
<!--      <el-button type="primary"  @click=" dialogType === 'add' ? addRole('ruleForm') : updateRole('ruleForm') ">确 定</el-button>-->
<!--    </span>-->
<!--  </el-dialog>-->
<!--  &lt;!&ndash; end 编辑角色 &ndash;&gt;-->
<!--</section>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: 'Permission',-->
<!--  data() {-->
<!--    return {-->
<!--      modalAdd: false,-->
<!--      -->
<!--      pageCurrent: 1,//默认页码-->
<!--      pageSize: 50,//默认页的尺寸-->
<!--      count: 0,//数据的总记录数-->
<!--      ruleForm: {-->
<!--        code:'',-->
<!--        name:'',-->
<!--        remarks: '',-->
<!--        createdBy: '',-->
<!--        creationtime: '',-->
<!--        updatedBy: '',-->
<!--        updatedDate: '',-->
<!--      },-->
<!--      rules: {-->
<!--        name: [{-->
<!--            required: true,-->
<!--            message: '请输入角色名称',-->
<!--            trigger: 'blur'-->
<!--          },-->
<!--          {-->
<!--            min: 1,-->
<!--            max: 4,-->
<!--            message: '长度在 1 到 10 个字符',-->
<!--            trigger: 'blur'-->
<!--          }-->
<!--        ],-->
<!--        code: [{-->
<!--            required: true,-->
<!--            message: '请输入编号',-->
<!--            trigger: 'blur'-->
<!--          },-->
<!--        ],-->
<!--        -->
<!--      },-->
<!--      data: []-->
<!--    }-->
<!--  },-->
<!--  methods: {-->

<!--     clickAdd() {-->
<!--      this.dialogType = "add";-->
<!--      this.modalAdd = true;-->
<!--      },-->

<!--     addRole(formName){-->
<!--      this.$refs[formName].validate((valid) => {-->
<!--        if (valid) {-->
<!--          this.$axios.post("/proRole/add", this.ruleForm).then((res) => {-->
<!--            if (res.code == 10000) {-->
<!--              this.$message.error(res.msg);-->
<!--            } else if (res.code == 200) {-->
<!--              this.$message.success("添加成功");-->
<!--              this.initForm();-->
<!--              this.queryList({-->
<!--                 code: this.ruleForm.code,-->
<!--                name: this.ruleForm.name,-->
<!--                //其他属性省略-->
<!--              }); -->
<!--            } else {-->
<!--              this.$message.error("添加失败,请联系管理员");-->
<!--            }-->
<!--          });-->
<!--        } else {-->
<!--          return false;-->
<!--        }-->
<!--       });-->
<!--      },-->

<!--     clickEdit(params) {-->
<!--      console.log("点击编辑按钮");-->
<!--      this.dialogType = "edit";-->
<!--      this.modalAdd = true; //显示对话框-->
<!--      console.log("编辑传入的参数", params);-->
<!--      Object.assign(this.ruleForm, params); //数据的回显-->
<!--      console.log("点击编辑", this.ruleForm);-->
<!--    },-->

<!--     updateRole(formName){-->
<!--      this.$refs[formName].validate((valid) => {-->
<!--        if (valid) {-->
<!--          this.$axios.post("/proRole/edit", this.ruleForm).then((res) => {-->
<!--            if (res.code == 10000) {-->
<!--              this.$message.error(res.msg);-->
<!--            } else if (res.code == 200) {-->
<!--              this.$message.success("更新成功");-->
<!--              this.initForm();-->
<!--              this.queryList({-->
<!--                code: this.ruleForm.code,-->
<!--                name: this.ruleForm.name,-->
<!--                -->
<!--              });-->
<!--            } else {-->
<!--              this.$message.error("添加失败,请联系管理员");-->
<!--            }-->
<!--          });-->
<!--        } else {-->
<!--          return false;-->
<!--        }-->
<!--      });-->
<!--    },-->

<!--    grant(params) {-->
<!--      this.$message.success("未实现"+params.name+"的授权功能");-->
<!--    },-->

<!--    //重置-->
<!--    initForm() {-->
<!--      this.modalAdd = false;-->
<!--      this.resetEdit();    -->
<!--    },-->
<!--    resetEdit(){-->
<!--      return (this.ruleForm = {-->
<!--        code:'',-->
<!--        name:'',-->
<!--         remarks: '',-->
<!--        createdBy: '',-->
<!--        creationtime: '',-->
<!--        updatedBy: '',-->
<!--        updatedDate: '',-->
<!--      });-->
<!--    },-->

<!--    queryList(data) {-->
<!--      this.$axios.post("/proRole/list", data).then((res) => {-->
<!--        console.log('rrrrrrrrrr'+JSON.stringify(res));-->
<!--        -->
<!--        if (res.code == 200) {-->
<!--          this.data = res.data.records;-->
<!--          this.count = res.total;-->
<!--          this.pageCurrent = res.current;-->
<!--        }else{-->
<!--          this.$message({-->
<!--            type: 'erro',-->
<!--            message: '查询失败!'-->
<!--          });-->
<!--        }-->
<!--      });-->
<!--    },-->

<!--    clickDelete(row) {-->
<!--      this.$confirm('此操作将永久删除此项, 是否继续?', '提示', {-->
<!--          confirmButtonText: '确定',-->
<!--          cancelButtonText: '取消',-->
<!--          type: 'warning'-->
<!--        })-->
<!--        .then(() => {-->
<!--          console.log(row);-->
<!--          this.deleteRole(row);-->
<!--        })-->
<!--        .catch(() => {-->
<!--          this.$message({-->
<!--            type: 'info',-->
<!--            message: '已取消删除'-->
<!--          });-->
<!--        });-->
<!--    },-->
<!--    deleteRole(data){-->
<!--        this.$axios.delete("/proRole/delete/" + data.id).then((res) => {-->
<!--        if (res.code == 200) {-->
<!--          this.$message.success("删除成功");-->
<!--          if (-->
<!--            (this.pageCurrent * this.pageSize - this.count) % this.pageSize ==-->
<!--            this.pageSize - 1-->
<!--          ) {-->
<!--            this.pageCurrent -= 1;-->
<!--          }-->
<!--          this.queryList({-->
<!--            pageSize: this.pageSize,-->
<!--            pageCurrent: this.pageCurrent,-->
<!--          });-->
<!--        }else {-->
<!--              this.$message.error("删除失败");-->
<!--            }-->
<!--      });-->
<!--    },-->
<!--  },-->
<!--  mounted() {-->
<!--    this.queryList({-->
<!--      pageSize: this.pageSize,-->
<!--      pageCurrent: this.pageCurrent,-->
<!--    });-->
<!--  },-->
<!--};-->
<!--</script>-->

<!--<style scoped lang="less">-->
<!--.permission{}-->
<!--</style>-->
