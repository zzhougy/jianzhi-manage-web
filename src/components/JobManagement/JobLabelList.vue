<template>
<section class="department-list">
  <!-- start btn group -->
  <el-row class="table-control">
    <el-col :span="18">
      <el-button icon="el-icon-plus" size="small" type="primary" plain @click="clickAdd">新增</el-button>
    </el-col>
    <el-col :span="6"></el-col>
  </el-row>
  <!-- end btn group -->
  <!-- start table -->
  <article class="table-data">
    <el-table :data="data" border style="width: 100%">
<!--      <el-table-column type="index" label="序号" width="150"></el-table-column>-->
      <el-table-column prop="id" label="id" width="220"></el-table-column>
      <el-table-column prop="name" label="名称" width="220"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="danger" @click="clickDelete(scope.row)" size="mini" plain icon="el-icon-delete" circle title="删除"></el-button>
          <el-button size="mini" @click="clickEdit(scope.row)" circle icon="el-icon-edit" title="编辑"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </article>
  <!-- end table -->
  <!-- start pagination 分页-->
  <el-pagination
                :current-page="pageCurrent" :page-sizes="[50, 100, 200]" :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="count"
                class="table-pagination">
  </el-pagination>
  <!-- end pagination -->
  <!-- start 新增模态窗 -->
  <el-dialog title="标签信息" :visible.sync="modalAdd" width="480px" :append-to-body="true" :close-on-click-modal="false">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm" label-suffix="：">
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入标签名称" style="width:280px;" maxlength="20" show-word-limit></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="initForm">取 消</el-button>
      <el-button type="primary"  @click=" dialogType === 'add' ? addDept() : updateDept() ">确 定</el-button>
    </span>
  </el-dialog>
  <!-- end 新增模态窗 -->
</section>
</template>

<script>
export default {
  name: 'DepartmentList', //部门管理
  data() {
    return {
      modalAdd: false,
      pageCurrent: 1,//默认页码
      pageSize: 50,//默认页的尺寸
      count: 0,//数据的总记录数
      ruleForm: {
        name:'',
      },
      rules: {
        name: [{
            required: true,
            message: '请输入部门名称',
            trigger: 'blur'
        }],
      },
      data: []
    }
  },
  methods: {

     clickAdd() {
      this.dialogType = "add";
      this.modalAdd = true;
      },

     addDept(){
       console.log('val' , this.ruleForm)
       this.$axios.post("/jobLabel/add", this.ruleForm).then((res) => {
         if (res.code == 200){
           this.modalAdd = false;
           this.$message.success("操作成功");
           this.queryJobLabelList({
             pageSize: this.pageSize,
             pageCurrent: this.pageCurrent,
           });
           this.ruleForm = {
             name:'',
           };
         }else {
           this.$message.error("操作失败");
         }
       });
     },

     clickEdit(params) {
      console.log("点击编辑按钮");
      this.dialogType = "edit";
      this.modalAdd = true; //显示对话框
      console.log("编辑传入的参数", params);
      Object.assign(this.ruleForm, params); //数据的回显
      console.log("点击编辑", this.ruleForm);
    },

     updateDept(){
       console.log('this.ddddd' ,this.ruleForm )
       this.$axios.post("/jobLabel/edit", this.ruleForm).then((res) => {
         if (res.code == 200){
           this.modalAdd = false;
           this.$message.success("操作成功");
           this.queryJobLabelList({
             pageSize: this.pageSize,
             pageCurrent: this.pageCurrent,
           });
           this.ruleForm = {
             name:'',
           };
         }else {
           this.$message.error("操作失败");
         }
       });
    },

    //重置
    initForm() {
      this.modalAdd = false;
      this.resetEdit();
    },
    resetEdit(){
      return (this.ruleForm = {
       code:'',
        name:'',
        leader:'',
        parentId:'',
        remarks: '',
        createdBy: '',
        creationtime: '',
        updatedBy: '',
        updatedDate: '',
      });
    },

    queryJobLabelList(data) {
      this.$axios.post("/jobLabel/list", data).then((res) => {
        if (res.code == 200) {
          this.data = res.data.records;
          //this.count = res.total;
          console.log("查找成功");
        }else{
          this.$message({
            type: 'erro',
            message: '查询失败!'
          });
        }
      });
    },

    clickDelete(row) {
      this.$confirm('此操作将永久删除此项, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          console.log(row);
          this.deleteRole(row);
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    deleteRole(val){
       console.log('val' , val)
      this.$axios.delete("/jobLabel/delete/"+val.id).then((res) => {
        if (res.code == 200) {
          this.queryJobLabelList({
            pageSize: this.pageSize,
            pageCurrent: this.pageCurrent,
          });
          this.$message.success("操作成功");
        }else{
          this.$message.error("操作失败");
        }
      });
    },
  },
  mounted() {
    this.queryJobLabelList({
      pageSize: this.pageSize,
      pageCurrent: this.pageCurrent,
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.department-list {}
</style>
