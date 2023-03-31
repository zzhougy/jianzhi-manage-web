<template>
  <section class="menus-management">
    <!-- start btn group -->
    <el-row class="table-control">
      <el-col :span="18">
        <el-button
          icon="el-icon-plus"
          size="small"
          type="primary"
          plain
          v-hasPermission="'sysMenu:add'"
          @click="openParentAdd"
        >新增顶级菜单</el-button>
      </el-col>
      <el-col :span="6"></el-col>
    </el-row>
    <!-- end btn group -->

    <!-- start 菜单树列表 节点key是id,default-expanded-keys:默认勾选的节点的key的数组-->
    <el-tree
      :data="data"
      accordion
      :auto-expand-parent="false"
      node-key="id"
      :default-expanded-keys="open"
      :expand-on-click-node="false"
      :props="defaultProps"
      highlight-current
      :filter-node-method="filterNode"
      ref="tree"
    >
      <!-- 使用 scoped slot 进行树节点内容的自定义-->
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span class="menu-name">
          <!-- 节点的图标 -->
          <i :class="data.icon"></i>
          <!-- 节点的名称 -->
          &nbsp;&nbsp;&nbsp;{{ node.label }}
        </span>
        <span class="menu-enable">
          <el-tag style="margin-left:20px;" type="info" v-if="node.data.type==0" effect="plain" size="mini">菜单</el-tag>
          <el-tag
            style="margin-left:20px;"
            v-else
            type="info"
            effect="plain"
            size="mini"
          >权限[{{node.data.perms}}]</el-tag>
        </span>
        <!-- 功能按钮 -->
        <span class="menu-control">
          <el-button icon="el-icon-plus" circle v-hasPermission="'sysMenu:add'" @click="() => openAdd(data)"></el-button>
          <el-button icon="el-icon-edit" circle v-hasPermission="'sysMenu:edit'" @click="edit(data)"></el-button>
          <el-button icon="el-icon-delete" circle @click="() => delNode(node, data)"></el-button>
<!--          <el-button size="mini" v-hasPermission="'sysMenu:add'" icon="el-icon-plus" @click="() => openAdd(data)">新增</el-button>-->
<!--          <el-button size="mini" v-hasPermission="'sysMenu:edit'" icon="el-icon-edit" @click="edit(data)">编辑</el-button>-->
<!--          <el-button size="mini" icon="el-icon-delete" @click="() => delNode(node, data)">删除</el-button>-->
        </span>
      </span>
    </el-tree>
    <!-- end 菜单树列表 -->

    <!-- start 增加菜单 -->
    <el-dialog
      :title="addTitle"
      :visible.sync="addDialogVisible"
      width="800px"
      @close="addClose"
      :append-to-body="true"
      :close-on-click-modal="false"
    >
      <el-form
        size="mini"
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="120px"
        class="demo-ruleForm"
        label-suffix="："
      >
        <el-form-item label="节点名称" prop="menuName">
          <el-input v-model="addForm.menuName" placeholder="请输入菜单名称"></el-input>
        </el-form-item>
        <el-form-item label="URL" prop="url">
          <el-input v-model="addForm.url" placeholder="请输入菜单名称"></el-input>
        </el-form-item>
        <el-form-item label="权限编码">
          <el-input v-model="addForm.perms"></el-input>
        </el-form-item>
        <el-form-item label="图标名称" prop="icon">
          <el-input
            v-model="addForm.icon"
            placeholder="请输入菜单图标名称,如：el-icon-s-platform,多个class请用空格隔开"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否启用" prop="disabled">
          <template>
            <el-radio v-model="addForm.disabled" label="false">可用</el-radio>
            <el-radio v-model="addForm.disabled" label="true">禁用</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="是否展开" prop="open">
          <el-radio v-model="addForm.open" label="1">展开</el-radio>
          <el-radio v-model="addForm.open" label="0">关闭</el-radio>
        </el-form-item>
        <el-form-item label="排序" prop="orderNum">
          <el-input-number v-model="addForm.orderNum" :min="1" :max="20" label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-radio v-model="addForm.type" label="0">菜单</el-radio>
          <el-radio v-model="addForm.type" label="1">按钮</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary"  @click="addNode" :loading="btnLoading" :disabled="btnDisabled">确 定</el-button>
      </span>
    </el-dialog>
    <!-- end 增加菜单 -->

    <!-- start 编辑菜单 -->
    <el-dialog
      :title="editTitle"
      :visible.sync="editlogVisible"
      width="800px"
      @close="editClose"
      :append-to-body="true"
      :close-on-click-modal="false"
    >
      <el-form
        size="mini"
        :model="editForm"
        :rules="addFormRules"
        ref="editFormRef"
        label-width="120px"
        class="demo-ruleForm"
        label-suffix="："
      >
        <el-form-item label="节点名称" prop="menuName">
          <el-input v-model="editForm.menuName" placeholder="请输入菜单名称"></el-input>
        </el-form-item>
        <el-form-item label="URL" prop="url">
          <el-input v-model="editForm.url" placeholder="请输入菜单名称"></el-input>
        </el-form-item>
        <el-form-item label="权限编码">
          <el-input v-model="editForm.perms"></el-input>
        </el-form-item>
        <el-form-item label="图标名称" prop="icon">
          <el-input
            v-model="editForm.icon"
            placeholder="请输入菜单图标名称,如：el-icon-s-platform,多个class请用空格隔开"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否启用" prop="disabled">
          <template>
            <el-radio v-model="editForm.disabled" :label="false">可用</el-radio>
            <el-radio v-model="editForm.disabled" :label="true">禁用</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="是否展开" prop="open">
          <template>
            <el-radio v-model="editForm.open" :label="1">展开</el-radio>
            <el-radio v-model="editForm.open" :label="0">关闭</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="排序" prop="orderNum">
          <el-input-number v-model="editForm.orderNum" :min="1" :max="100" label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <template>
            <el-radio v-model="editForm.type" :label="0">菜单</el-radio>
            <el-radio v-model="editForm.type" :label="1">按钮</el-radio>
          </template>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editlogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="updateMenu"
          :loading="btnLoading"
          :disabled="btnDisabled"
        >确 定</el-button>
      </span>
    </el-dialog>
    <!-- end 编辑菜单 -->
  </section>
</template>

<script>
let id = 1000;
export default {
  name: "menusManagement",
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  data() {
    const data = [];
    return {
      btnLoading: false,
      btnDisabled: false,
      loading: true,
      open: [], //展开节点
      filterText: "", //节点过滤文本
      addDialogVisible: false, //新增节点弹出框
      editlogVisible: false, //编辑节点弹出框
      addTitle: "",
      editTitle: "",
      addForm: {
        parentId: "",
        menuName: "",
        url: "",
        type: "",
        orderNum: "",
        disabled: "",
        open: "",
        perms: "",
      }, //添加请求表单数据
      editForm: {}, //编辑节点表单数据
      addFormRules: {
        menuName: [
          { required: true, message: "节点名称不能为空", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        disabled: [
          { required: true, message: "节点状态不能为空", trigger: "blur" },
        ],

        orderNum: [
          { required: true, message: "排序不能为空", trigger: "blur" },
        ],
        type: [{ required: true, message: "类型不能为空", trigger: "blur" }],
        open: [
          { required: true, message: "是否展开不能为空", trigger: "blur" },
        ],
      }, //添加表单验证规则
      pNode: {}, //父节点
      data: JSON.parse(JSON.stringify(data)),
      //data: JSON.parse(JSON.stringify(data)),
      defaultProps: {
        children: "children",
        //节点的标签对应节点对象的menuName属性
        label: "menuName",
      },
    };
  },

  created() {
    this.getMenuTree();
    setTimeout(() => {
      this.loading = false;
    }, 500);
  },

  methods: {
    //更新菜单
    updateMenu() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) {
          return;
        } else {
          this.btnLoading = true;
          this.btnDisabled = true;
          this.$axios
            .put("sysMenu/update/" + this.editForm.id, this.editForm)
            .then((res) => {
              if (res.code == 200) {
                this.$message({
                  title: "成功",
                  message: "节点信息更新",
                  type: "success",
                });
                //清空编辑对象
                this.editForm = {};
                this.editlogVisible = false;
                this.btnLoading = false;
                this.btnDisabled = false;
                this.getMenuTree();
              } else {
                return this.$message.error(res.msg);
              }
            });
        }
      });
    },
    //点击编辑节点
    edit(data) {
      this.editTitle = "编辑：【" + data.menuName + "】";
      this.$axios.get("sysMenu/edit/" + data.id).then((res) => {
        if (res.code == 200) {
          //返回需要编辑的数据
          this.editForm = res.data;
          //打开编辑模态窗
          this.editlogVisible = true;
        } else {
          return this.$message.error("节点编辑失败:" + res.msg);
        }
      });
    },
    //过滤节点
    filterNode(value, data) {
      if (!value) return true;
      return data.menuName.indexOf(value) !== -1;
    },
    //关闭添加
    addClose() {
      this.$refs.addFormRef.clearValidate();
      this.addForm = {};
    },
    editClose() {
      this.$refs.editFormRef.clearValidate();
      this.editForm = {};
    },
    //加载菜单树
    getMenuTree() {
      this.$axios.get("sysMenu/tree").then((res) => {
        if (res.code == 200) {
          this.data = res.data.tree;
          //加载时需要打开的节点id,根节点打开时才能看到打开的子节点,子节点
          this.open = res.data.open;
          console.log('this.openttttttttttttt' ,this.open )
        }
      });
    },
    //打开添加框
    openAdd(data) {
      this.addTitle = "添加节点 ：当前【" + data.menuName + "】";
      this.addDialogVisible = true;
      //附上父节点的id
      this.addForm.parentId = data.id;
      //赋上父节点的数据
      this.pNode = data;
    },
    //添加最高父级节点
    openParentAdd(data) {
      this.addTitle = "添加第一父级";
      this.addDialogVisible = true;
      this.addForm.parentId = 0;
    },
    //点击删除按钮
    async delNode(node, data) {
      var res = await this.$confirm(
        "此操作将永久删除该节点, 是否继续?",
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
        this.$axios.delete("sysMenu/delete/" + node.data.id).then((res) => {
          if (res.code == 200) {
            this.$message.success("节点删除成功");
            this.getMenuTree();
          } else {
            this.$message.error("节点删除失败:" + res.msg);
          }
        });
      }
    },
    //发送添加节点请求
    addNode() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) {
          return;
        } else {
          this.btnLoading = true;
          this.btnDisabled = true;
          this.$axios.post("sysMenu/add", this.addForm).then((res) => {
            if (res.code == 200) {
              this.$message.success("节点添加成功");
              this.addDialogVisible = false;
              this.btnLoading = false;
              this.btnDisabled = false;
              this.getMenuTree();
            } else {
              this.$message.error(res.msg);
            }
          });
        }
      });
    },
    //前端添加节点
    // append(data, newChild) {
    //   //   var newChild = { id: 1231, label: "qqqqq", children: [] };
    //   if (!data.children) {
    //     this.$set(data, "children", []);
    //   }
    //   data.children.push(newChild);
    // },

    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.id === data.id);
      children.splice(index, 1);
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.menus-management {
  /deep/.el-tree-node__content {
    height: 36px;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 14px;
    .menu-name {
      margin-right: 16px;
    }
    .menu-enable {
      margin-right: 20px;
    }
    .menu-control {
      margin-left: auto;
      flex: 0 0 260px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
}
</style>
