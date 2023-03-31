<template>
  <section class="permission">
    <!-- start btn group -->
    <el-row class="table-control">
      <el-col :span="8">
        <el-input
          clearable
          placeholder="请输入角色名查询"
          v-model="queryMap.roleName"
          class="input-with-select"
          @clear="getRoleList"
        >
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="2" style="margin-left:20px">
        <el-button
          v-hasPermission="'sysRole:add'"
          type="success"
          icon="el-icon-circle-plus-outline"
          @click="addDialogVisible=true"
        >添加</el-button>
      </el-col>
    </el-row>
    <!-- end btn group -->

    <!-- start table 数据展示-->
    <el-table :data="roleData" v-loading="loading" border style="width: 100%" height="650">
      <!-- <el-table-column prop="id" label="ID" width="180"></el-table-column> -->
      <el-table-column type="index" width="60" align="center"></el-table-column>
      <el-table-column prop="roleName" label="角色名" width="180" align="center"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="180" align="center" sortable></el-table-column>
      <el-table-column prop="isban" label="是否启用" width="180" align="center">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status" @change="changRoleStatus(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button
            v-hasPermission="'sysRole:authority'"
            @click="grant(scope.row.id)"
            type="text"
            icon="el-icon-present"
            size="small"
          >授权</el-button>
          <el-button
            @click="edit(scope.row.id)"
            v-hasPermission="'sysRole:edit'"
            type="text"
            icon="el-icon-edit"
            size="small"
          >编辑</el-button>
          <el-button
            v-hasPermission="'sysRole:delete'"
            @click="del(scope.row.id)"
            type="text"
            icon="el-icon-delete"
            size="small"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- end table -->

    <!-- start pagination -->
    <el-pagination
      background
      style="margin-top:10px;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryMap.pageCurrent"
      :page-sizes="[50,100]"
      :page-size="queryMap.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- end pagination -->

    <!-- start 编辑角色 -->
    <el-dialog
      title="编辑角色"
      :visible.sync="editDialogVisible"
      width="800px"
      @close="closeEdit"
      :append-to-body="true"
      :close-on-click-modal="false"
    >
      <el-form
        :model="editForm"
        :rules="addFormRoles"
        ref="editFormRef"
        label-width="120px"
        class="demo-ruleForm"
        label-suffix="："
      >
        <el-row :gutter="24">
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="editForm.roleName" placeholder="请输入角色名称"></el-input>
          </el-form-item>
          <el-form-item label="描述信息" prop="remark">
            <el-input type="textarea" v-model="editForm.remark"></el-input>
          </el-form-item>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button
          v-hasPermission="'sysRole:update'"
          type="primary"
          @click="updateRole"
          :loading="btnLoading"
          :disabled="btnDisabled"
        >确 定</el-button>
      </span>
    </el-dialog>

    <!-- start 添加角色 -->
    <el-dialog
      title="添加角色"
      :visible.sync="addDialogVisible"
      width="800px"
      @close="closeAdd"
      :append-to-body="true"
      :close-on-click-modal="false"
    >
      <el-form
        :model="addForm"
        :rules="addFormRoles"
        ref="addFormRef"
        label-width="120px"
        class="demo-ruleForm"
        label-suffix="："
      >
        <el-row :gutter="24">
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="addForm.roleName" placeholder="请输入角色名称"></el-input>
          </el-form-item>
          <el-form-item label="描述信息" prop="remark">
            <el-input type="textarea" v-model="addForm.remark"></el-input>
          </el-form-item>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRole" :loading="btnLoading" :disabled="btnDisabled">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 角色授权弹出框 -->
    <el-dialog title="分配菜单权限" :visible.sync="grantDialogVisible" width="38%">
      <span>
        <!-- show-checkbox是可以选择节点 -->
        <el-tree
          :auto-expand-parent="false"
          :data="data"
          show-checkbox
          node-key="id"
          :default-expanded-keys="open"
          :props="defaultProps"
          ref="tree"
          highlight-current
        ></el-tree>
        <!-- check-strictly -->
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="grantDialogVisible = false">取 消</el-button>
        <el-button
          v-hasPermission="'sysRole:authority'"
          type="primary"
          icon="el-icon-setting"
          @click="authority"
          :loading="btnLoading"
          :disabled="btnDisabled"
        >授 权</el-button>
      </span>
    </el-dialog>
    <!-- end 编辑角色 -->
  </section>
</template>

<script>
export default {
  name: "Permission",
  data() {
    return {
      btnLoading: false,
      btnDisabled: false,
      loading: true,
      total: 0,
      queryMap: { roleName: "", pageCurrent: 1, pageSize: 50 }, //查询条件
      roleData: [], //角色表格数据
      addForm: {}, //添加数据
      editForm: {}, //编辑数据
      addDialogVisible: false, //添加弹框的显示
      editDialogVisible: false, //编辑弹框
      grantDialogVisible: false, //授权弹出框
      data: [],
      open: [], //展开
      grantId: "",
      defaultProps: {
        children: "children",
        label: "menuName",
      },
      addFormRoles: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        // remark: [
        //   { required: true, message: "请输入角色描述信息", trigger: "blur" },
        //   { min: 5, max: 20, message: "长度在 5 到 20 个字符", trigger: "blur" }
        // ]
      }, //添加验证规则
    };
  },

  created() {
    this.getRoleList();
    setTimeout(() => {
      this.loading = false;
    }, 500);
  },

  methods: {
    //授权确定
    async authority() {
      this.btnDisabled = true;
      this.btnLoading = true;
      let res = await this.$axios.post(
        "sysRole/authority/" + this.grantId,
        [].concat(
          this.$refs.tree.getCheckedKeys(),
          this.$refs.tree.getHalfCheckedKeys()
        )
      );
      if (res.code == 200) {
        this.$message.success("角色授权成功");
      } else {
        this.$message.error("角色授权失败:" + res.msg);
      }
      this.btnDisabled = false;
      this.btnLoading = false;
      this.grantDialogVisible = false;

    },
    //点击授权按钮,在权限窗口打开之前勾选该角色已经拥有的权限以及某些权限的禁选
    async grant(id) {
      //加载所有菜单以及用户拥有的菜单权限id
      let res = await this.$axios.get("sysRole/findRoleMenu/" + id);
      console.log('this.$store.getters.userInfoggggggggggggggg' , this.$store.getters.userInfo)
      let isAdmin = this.$store.getters.userInfo.isAdmin;
      if (res.code == 200) {
        //默认选中的树的数据
        let that = this;
        setTimeout(function () {
          //遍历该角色拥有的菜单id
          res.data.mids.forEach((value) => {
            //勾选该角色已有的菜单
            that.$refs.tree.setChecked(value, true, false);
          });
        }, 100);
        if (isAdmin) {
          console.log('ggggggggggggg'  )
          //如果是管理员,对所有的菜单/按钮可以进行授权
          this.data = res.data.tree;
        } else {
          //不是管理员则无法对【基础数据维护】--> 【角色管理】下的【角色删除】/【状态更新】进行授权
          //遍历树形菜单/按钮
          for (let item of res.data.tree) {
            //遍历【基础数据维护】下的按钮/菜单
            if (item.id == 2) {
              for (let node of item.children) {
                //找到【基础数据维护】下的【角色管理】
                if (node.id == 4) {
                  //遍历角色管理里的按钮
                  for (let son of node.children) {
                    //找到【角色删除】/【状态更新按钮】,
                    if (son.id == 27|son.id == 28) {
                      //设置禁用
                      son.disabled = true;
                    }
                  }
                  //退出对基础数据维护的遍历
                  break;
                }
              }
              //退出对所有的菜单的遍历
              break;
            }
          }
          this.data = res.data.tree;
        }
        this.open = res.data.open;
        //记录需要授权的角色id
        this.grantId = id;
      }
      //打开分配权限的模态窗
      this.grantDialogVisible = true;
    },
    //加载角色列表
    async getRoleList() {
      let res = await this.$axios.get("/sysRole/findRoleList", {
        params: this.queryMap,
      });
      if (res.code == 200) {
        this.roleData = res.data.records;
        this.total = res.data.total;
      }
    },
    //搜索
    search() {
      this.queryMap.pageCurrent = 1;
      this.getRoleList();
    },
    //关闭添加弹框
    closeAdd() {
      this.$refs.addFormRef.clearValidate();
      this.addForm = {};
    },
    closeEdit() {
      this.$refs.editFormRef.clearValidate();
      this.editForm = {};
    },
    //添加
    async addRole() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) {
          return;
        } else {
          this.btnDisabled = true;
          this.btnLoading = true;
          let res = await this.$axios.post("sysRole/add", this.addForm);
          if (res.code == 200) {
            this.$message.success("添加成功");
            this.addDialogVisible = false;
            this.btnDisabled = false;
            this.btnLoading = false;
            this.addForm = {};
            this.getRoleList();
          } else {
            return this.$message.error("角色添加失败:" + res.msg);
          }
        }
      });
    },
    //编辑
    async edit(id) {
      let res = await this.$axios.get("sysRole/edit/" + id);
      if (res.code == 200) {
        this.editForm = res.data;
        this.editDialogVisible = true;
      } else {
        return this.$message.error("角色编辑失败:" + res.msg);
      }
    },
    //更新用户
    async updateRole() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) {
          return;
        } else {
          this.btnDisabled = true;
          this.btnLoading = true;
          let res = await this.$axios.put(
            "sysRole/update/" + this.editForm.id,
            this.editForm
          );
          if (res.code == 200) {
            this.$message.success("角色信息更新成功");
            this.getRoleList();
          } else {
            this.$message.error("角色信息更新失败:" + res.msg);
          }
          this.editDialogVisible = false;
          this.btnDisabled = false;
          this.btnLoading = false;
          this.editForm = {};
        }
      });
    },
    //删除
    async del(id) {
      var res = await this.$confirm(
        "此操作将永久删除该角色, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除",
        });
      });
      if (res == "confirm") {
        let res = await this.$axios.delete("sysRole/delete/" + id);
        if (res.code == 200) {
          this.$message.success("删除成功");
          this.getRoleList();
        } else {
          this.$message.error("删除失败:" + res.msg);
        }
      }
    },
    //改变用户禁用状态
    async changRoleStatus(row) {
      let res = await this.$axios.put(
        "sysRole/updateStatus/" + row.id + "/" + row.status
      );
      if (res.code !== 200) {
        this.$message.error("更新状态失败:" + res.msg);
        row.status = !row.status;
      } else {
        this.$message.success("更新状态成功");
      }
    },
    //改变页码
    handleSizeChange(newSize) {
      this.queryMap.pageSize = newSize;
      this.getRoleList();
    },
    //翻页
    handleCurrentChange(current) {
      this.queryMap.pageCurrent = current;
      this.getRoleList();
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.permission {
}
</style>
