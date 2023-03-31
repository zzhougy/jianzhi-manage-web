<template>
<section class="personnel-list">
  <!-- start form search -->
  <el-form :inline="true" :model="formInline" label-width="80px" size="small" class="search-form" label-suffix="：">
    <el-form-item label="编号">
      <el-input v-model="formInline.name" placeholder="请输入" style="width:200px;"></el-input>
    </el-form-item>
    <el-form-item label="用户名">
      <el-input v-model="formInline.code" placeholder="请输入" style="width:200px;"></el-input>
    </el-form-item>
    <el-form-item label="企业">
      <el-input v-model="formInline.code" placeholder="请输入" style="width:200px;"></el-input>
    </el-form-item>
<!--    <el-form-item label="部门" prop="deptId">-->
<!--              <el-select-->
<!--                v-model="formInline.deptId"-->
<!--                filterable-->
<!--                remote-->
<!--                clearable-->
<!--                reserve-keyword-->
<!--                placeholder="请输入关键词"-->
<!--                :remote-method="queryDept"-->
<!--                :loading="loadingDept"-->
<!--                @change="getDeptName"-->
<!--                >-->
<!--                <el-option-->
<!--                  v-for="item in deptOptions"-->
<!--                  :key="item.value"-->
<!--                  :label="item.label"-->
<!--                  :value="item.value">-->
<!--                </el-option>-->
<!--              </el-select>-->
<!--            </el-form-item>-->
    <el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="clickFormSearch">查询</el-button>
    </el-form-item>
  </el-form>
  <!-- end form search -->
  <!-- start btn group -->
  <el-row class="table-control">
    <el-col :span="18">
      <el-button icon="el-icon-plus" size="small" type="primary" plain @click="clickAdd">新增HR</el-button>
    </el-col>
    <el-col :span="6"></el-col>
  </el-row>
  <!-- end btn group -->
  <!-- start table -->
  <article class="table-data">
    <el-table :data="tableData" border style="width: 100%" :fit="true">
<!--      <el-table-column prop="id" label="hrid" ></el-table-column>-->
      <el-table-column prop="userId" label="编号" ></el-table-column>
      <el-table-column prop="username" label="用户名" ></el-table-column>
      <el-table-column prop="name" label="姓名" ></el-table-column>
      <el-table-column prop="sex" label="性别"  :formatter="sexFormatter"></el-table-column>
      <el-table-column prop="unitName" label="所属单位" ></el-table-column>
      <el-table-column prop="createTime" label="注册时间" ></el-table-column>
<!--      <el-table-column prop="status" label="状态" >-->
<!--        <template slot-scope="scope">-->
<!--          <el-tag effect="dark"  size="mini">{{scope.row.status | changeToText1}}</el-tag>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="操作" >
        <template slot-scope="scope">
<!--          <el-button type="danger" @click="clickDelete(scope.row)" size="mini" plain icon="el-icon-delete" circle title="删除"></el-button>-->
<!--          <el-button size="mini" @click="clickEdit(scope.row)" circle icon="el-icon-edit" title="编辑"></el-button>-->
<!--          <el-tooltip class="item" effect="dark" content="分配角色" placement="top" :enterable="false">-->
<!--            <el-button-->
<!--                    type="text"-->
<!--                    size="mini"-->
<!--                    icon="el-icon-s-tools"-->
<!--                    @click="assignRoles(scope.row.id)"-->
<!--            >分配角色</el-button>-->
<!--          </el-tooltip>-->

          <el-button
                  @click="clickDelete(scope.row)"
                  type="text"
                  icon="el-icon-delete"
                  size="small"
          >删除</el-button>
          <el-button
                  @click="clickEdit(scope.row)"
                  type="text"
                  icon="el-icon-edit"
                  size="small"
          >编辑</el-button>
          <el-button
                  @click="assignRoles(scope.row)"
                  type="text"
                  icon="el-icon-s-tools"
                  size="small"
          >分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>
  </article>
  <!-- end table -->
  <!-- start pagination -->
  <el-pagination :current-page="1" :page-sizes="[10, 20, 30, 40]" :page-size="1" layout="total, sizes, prev, pager, next, jumper" :total="4" class="table-pagination">
  </el-pagination>
  <!-- end pagination -->
  <!-- start 新增模态窗 -->
  <el-dialog title="职员信息" :visible.sync="modalAdd" width="1100px" :append-to-body="true" :close-on-click-modal="false">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm" label-suffix="：">
      <el-row :gutter="24">
        <el-col :span="8">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username" placeholder="请输入用户名" :disabled="dialogType=== 'add' ? false :true "></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :hidden="dialogType=== 'add' ? false :true">
          <el-form-item label="密码" prop="password" >
            <el-input v-model="ruleForm.password" placeholder="请输入密码"  ></el-input>
          </el-form-item>
        </el-col>
        <!--        <el-col :span="8">-->
        <!--          <el-form-item label="状态" prop="status">-->
        <!--            <el-radio-group v-model="ruleForm.status">-->
        <!--              <el-radio :label="1">有效</el-radio>-->
        <!--              <el-radio :label="0">停用</el-radio>-->
        <!--            </el-radio-group>-->
        <!--          </el-form-item>-->
        <!--        </el-col>-->
      </el-row>
    </el-form>


    <el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" label-width="130px" class="demo-ruleForm" label-suffix="：">
      <el-row :gutter="24">
        <el-col :span="8">
          <el-form-item label="编号" prop="id">
            <el-input v-model="ruleForm2.id" placeholder="" disabled="true"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm2.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="ruleForm2.sex">
              <el-radio label="0">男</el-radio>
              <el-radio label="1">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="电话" prop="phone">
            <el-input v-model="ruleForm2.phone" placeholder="请输入电话"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm2.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="QQ" prop="qq">
            <el-input v-model="ruleForm2.qq" placeholder="请输入QQ"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="wechat" prop="wechat">
            <el-input v-model="ruleForm2.wechat" placeholder="请输入微信"></el-input>
          </el-form-item>
        </el-col>
        <!--        <el-col :span="8">-->
        <!--          <el-form-item label="入职时间" prop="hiredate">-->
        <!--           <el-date-picker v-model="ruleForm.hiredate"  value-format="yyyy-MM-dd" type="date" placeholder="选择日期"> </el-date-picker>-->
        <!--          </el-form-item>-->
        <!--        </el-col>-->

<!--                <el-col :span="8">-->
<!--                  <el-form-item label="部门" prop="deptId">-->
<!--                    <el-select v-model="ruleForm.deptId" placeholder="请选择">-->
<!--                      <el-option-->
<!--                          v-for="item in deptOptions"-->
<!--                          :key="item.value"-->
<!--                          :label="item.label"-->
<!--                          :value="item.value">-->
<!--                        </el-option>-->
<!--                    </el-select>-->

        <!--          </el-form-item>-->
        <!--        </el-col>-->
        <!--        <el-col :span="8">-->
        <!--          <el-form-item label="角色" prop="roleId">-->
        <!--            <el-select v-model="ruleForm.roleId" placeholder="请选择">-->
        <!--              <el-option-->
        <!--                  v-for="item in roleOptions"-->
        <!--                  :key="item.value"-->
        <!--                  :label="item.label"-->
        <!--                  :value="item.value">-->
        <!--                </el-option>-->
        <!--            </el-select>-->
        <!--          </el-form-item>-->
        <!--        </el-col>-->
        <!-- <el-col :span="8">
          <el-form-item label="允许登录" prop="isUser">
            <el-radio-group v-model="ruleForm.isUser">
              <el-radio label="0">允许</el-radio>
              <el-radio label="1">不允许</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col> -->
        <!--        <el-col :span="8">-->
        <!--          <el-form-item label="创建人" prop="createdBy">-->
        <!--            {{ruleForm.createdBy}}-->
        <!--          </el-form-item>-->
        <!--        </el-col>-->
        <!--        <el-col :span="8">-->
        <!--          <el-form-item label="创建时间" prop="creationtime">-->
        <!--            {{ruleForm.creationtime}}-->
        <!--          </el-form-item>-->
        <!--        </el-col>-->
        <!--        <el-col :span="8">-->
        <!--          <el-form-item label="更新人" prop="updatedBy">-->
        <!--            {{ruleForm.updatedBy}}-->
        <!--          </el-form-item>-->
        <!--        </el-col>-->
        <!--        <el-col :span="8">-->
        <!--          <el-form-item label="更新时间" prop="updatedDate">-->
        <!--            {{ruleForm.updatedDate}}-->
        <!--          </el-form-item>-->
        <!--        </el-col>-->
        <!--        <el-col :span="24">-->
        <!--          <el-form-item label="备注" prop="remark">-->
        <!--            <el-input type="textarea" v-model="ruleForm.remark" placeholder="请输入备注"></el-input>-->
        <!--          </el-form-item>-->
        <!--        </el-col>-->
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary"  @click=" dialogType === 'add' ? addPerson('ruleForm') : updatePerson('ruleForm') ">确 定</el-button>
    </span>
  </el-dialog>
  <!-- end 新增模态窗 -->


  <!--start role set 角色分配模态窗-->
  <el-dialog center title="分配角色" @close="closeAssignDialog" :visible.sync="assignDialogVisible" width="800px" :append-to-body="true" :close-on-click-modal="false">
      <span>
        <template>
          <el-transfer
                  class="transfer"
                  filterable
                  :titles="['未拥有','已拥有']"
                  :button-texts="['到左边', '到右边']"
                  v-model="value"
                  :data="roles"
          ></el-transfer>
        </template>
      </span>
    <span slot="footer" class="dialog-footer">
        <el-button @click="assignDialogVisible = false" class="el-icon-close">取消分配</el-button>
        <el-button
                v-hasPermission="'user:assign'"
                type="primary"
                @click="doAssignRoles"
                class="el-icon-check"
                :loading="btnLoading"
                :disabled="btnDisabled"
        >确定分配</el-button>
      </span>
  </el-dialog>
  <!--end role set-->
</section>
</template>

<script>
export default {
  name: 'PersonnelList', //人员管理
  data() {
    return {
      modalAdd: false,
      pageCurrent: 1,//默认页码
      pageSize: 50,//默认页的尺寸
      count: 0,//数据的总记录数
      loadingDept:false,
      deptOptions:[],
      roleOptions:[],
      formInline: {
        name: '',
        code: '',
        deptId: '',
      },
      ruleForm: {
        code:'',
        name: '',
        idcard:'',
        phone:'',
        email:'',
        address:'',
        qq:'',
        wechat:'',
        hiredate:'',
        status:'',
        deptId:'',
        roleId:'',

        remark: '',
        createdBy: '',
        creationtime: '',
        updatedBy: '',
        updatedDate: '',
      },
      ruleForm2: {
        code:'',
        name: '',
        sex:'0',
        idcard:'',
        phone:'',
        email:'',
        address:'',
        qq:'',
        wechat:'',
        hiredate:'',
        status:'',
        deptId:'',
        roleId:'',

        sno:'',
        remark: '',
        createdBy: '',
        creationtime: '',
        updatedBy: '',
        updatedDate: '',
      },
      rules: {
        hiredate:[
          {
          required: true,
          message: '请选择',
          trigger: 'blur'
          }
        ],
        status:[
          {
          required: true,
          message: '请选择',
          trigger: 'blur'
          }
        ],

        name: [{
          required: true,
          message: '请输入姓名',
          trigger: 'blur'
        }],
        idcard:[{
          required: true,
          message: '请输入身份证',
          trigger: 'blur'
        }],
        phone: [{
          required: true,
          message: '请输入手机号码',
          trigger: 'blur'
        }],
        deptId: [{
          required: true,
          message: '请选择部门',
          trigger: 'change'
        }],
        roleId: [{
          required: true,
          message: '请选择角色',
          trigger: 'change'
        }],

      },
      tableData: [],
      dialogType:true,//弹窗是编辑还是新增
      assignDialogVisible: false, //分配角色对话框
      roles: [], //角色
      value: [], //用户拥有的角色
      btnLoading: false,
      btnDisabled: false,
      uid: "",//记录userid
      zzid:'',//记录当前操作的用户id
    }
  },
  methods: {
    roleFormatter(row){
        var a = this.roleOptions
        var role = a.filter((p)=>{
           return p.value == row.roleId;
        });
        return role[0].label;
    },
    deptFormatter(row){
        var a = this.deptOptions
        console.log('000000000000'+JSON.stringify(row));
        var dept = a.filter((p)=>{
           return p.value == row.deptId;
        });
        return dept[0].label;
    },
    sexFormatter(row) {
      console.log(row.sex+'33333');
      if(row.sex==0){
        return '男';
      }else{
        return '女';
      }
    },
    clickAdd() {
      this.dialogType = "add";
      this.modalAdd = true;
    },
    addPerson(formName){
      this.$refs[formName].validate((valid) => {
        console.log('5555555'+JSON.stringify(this.ruleForm));

        if (valid) {
          this.$axios.post("/proStaff/add", this.ruleForm).then((res) => {


            if (res.code == 10000) {
              this.$message.error(res.msg);
            } else if (res.code == 200) {
              this.$message.success("添加成功");
              this.initForm();
              this.queryList({
                code: this.ruleForm.code,
                name: this.ruleForm.name,
                sex: this.ruleForm.sex,
                idcard: this.ruleForm.idcard,
                phone: this.ruleForm.phone,
                email: this.ruleForm.email,
              });
            } else {
              this.$message.error("添加失败,请联系管理员");
            }
          });
        } else {
          return false;
        }
      });
    },

     clickEdit(params) {
      console.log("点击编辑按钮");
      this.dialogType = "edit";
      this.modalAdd = true; //显示对话框
      console.log("编辑传入的参数", params);
       Object.assign(this.ruleForm, params); //数据的回显
       Object.assign(this.ruleForm2, params); //数据的回显
      console.log("点击编辑", this.ruleForm);
    },

     updatePerson(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post("/hrInfo/edit", this.ruleForm2).then((res) => {
            if (res.code == 10000) {
              this.$message.error(res.msg);
            } else if (res.code == 200) {
              this.$message.success("更新成功");
              this.initForm();
              this.queryList({
                // code: this.ruleForm.code,
                // name: this.ruleForm.name,
                // sex: this.ruleForm.sex,
                // idcard: this.ruleForm.idcard,
                // phone: this.ruleForm.phone,
                // email: this.ruleForm.email,

              });
              this.closeDialog()
            } else {
              this.$message.error("添加失败,请联系管理员");
            }
          });
        } else {
          return false;
        }
      });
    },

    //重置
    initForm() {
      //this.modalAdd = false;
      this.resetEdit();
    },
    closeDialog(){
      this.modalAdd = false;
    },
    resetEdit(){
      return (this.ruleForm = {
      code:'',
        name: '',
        sex:'',
        idcard:'',
        phone:'',
        email:'',
        address:'',
        qq:'',
        wechat:'',
        hiredate:'',
        status:'',
        deptId:'',
        roleId:'',

        remark: '',
        createdBy: '',
        creationtime: '',
        updatedBy: '',
        updatedDate: '',
      });
    },

    //搜索
    clickFormSearch() {
      this.queryList({
        pageSize: this.pageSize,
        pageCurrent: this.pageCurrent,
        code: this.formInline.code,
        name: this.formInline.name,
        deptId: this.formInline.deptId,
      });
    },
    queryList(data) {
      this.$axios.post("/hrInfo/list", data).then((res) => {
        if (res.code == 200) {
          this.tableData = res.data.records;
          console.log('eeeeeeeeeeeeeee'+JSON.stringify(this.tableData));
           this.count = res.total;
          //填充页码
          this.pageCurrent = res.current;
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
          this.deletePerson(row);
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },

    deletePerson(data){
        this.$axios.delete("/proStaff/delete/" + data.id).then((res) => {
        if (res.code == 200) {
          this.$message.success("删除成功");
          if (
            (this.pageCurrent * this.pageSize - this.count) % this.pageSize ==
            this.pageSize - 1
          ) {
            this.pageCurrent -= 1;
          }
          this.queryList({
            pageSize: this.pageSize,
            pageCurrent: this.pageCurrent,
          });
        }else{
          this.$message.error("删除失败请联系管理员");
        }
      });
    },


    queryDept(){
      var list = [];//接收返回的数据
      var states = [];
      console.log("222222222")
      let a ={};
          this.loadingDept = true;//从远程获取数据
          this.$axios.post("/proDept/list",a).then((res) => {
            if (res.code == 200) {



              states = res.data.records;

              list = states.map(item => {
                console.log('33333344'+item.name);

                return {
                   value: `${item.id}`,
                    label: `${item.name}` };
              });
              setTimeout(() => {
                this.loadingDept = false;
                this.deptOptions = list;
              }, 200);
              console.log(list);

            }
          });


    },

    queryRole(params){
      console.log('ppppp'+params);
      if(params == null){
        params={}
      }
      var list = [];//接收返回的数据
      var states = [];
       console.log("222222222")
      // let a ={};
          //this.loadingDept = true;//从远程获取数据
          this.$axios.post("/proRole/list",params).then((res) => {
            if (res.code == 200) {
              states = res.data.records;
              list = states.map(item => {
                return {
                   value: `${item.id}`,
                    label: `${item.name}` };
              });
              setTimeout(() => {
                //this.loadingDept = false;
                this.roleOptions = list;
              }, 200);

            }
          });
    },
    getDeptName(deptName){
      let deptOption = {};
      deptOption = this.deptOptions.find((item) => {
        return item.value == deptName;
      });
      this.ruleForm.deptName = deptOption.label;
    },
    /**
     * 弹出用户分配角色
     */
    async assignRoles(val) {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      console.log('this.$store.state.config.userInfo;' , this.$store.state.config.userInfo)

      this.zzid = val.userId
      let res = await this.$axios.get("user/" + val.userId + "/roles").catch(err=>{
        loading.close();
      });
      console.log(res)
      if (res.code == 200) {
        this.roles = res.data.roles;
        this.value = res.data.values;
        this.uid = this.$store.state.config.userInfo.id;

        setTimeout(() => {
          loading.close();
          this.assignDialogVisible = true;
        }, 400);
      }else{
        loading.close();
      }
    },

    /**
     * 确定分配角色
     */
    async doAssignRoles() {
      this.assignDialogVisible = true;
      this.btnLoading = true;
      this.btnDisabled = true;
      let res = await this.$axios.post(
          "user/" + this.zzid + "/assignRoles",
          this.value
      );
      if (res.code == 200) {
        this.$message({
          message: "用户分配角色成功",
          type: "success",
        });
      } else {
        this.$message.error("分配角色失败:" + res.msg);
      }
      this.assignDialogVisible = false;
      this.btnLoading = false;
      this.btnDisabled = false;
    },

  },


  filters: {
    changeToText1(value) {
      if (value == '0')
        return '正常'
      else if (value == '1') {
        return '停用'
      }
    },
    changeToText2(value) {
      if (value == '0')
        return '超级管理员'
      else if (value == '1') {
        return '文员'
      }else if (value == '2') {
        return '报价员'
      }else if (value == '3') {
        return '采购员'
      }else if (value == '4') {
        return '仓管员'
      }else if (value == '5') {
        return '生产主管'
      }else if (value == '6') {
        return '工程师'
      }else if (value == '7') {
        return '工序员工'
      }else if (value == '8') {
        return '送货员'
      }
    },
    changeToText3(value) {
      if (value == '0')
        return '销售部'
      else if (value == '1') {
        return '设计部'
      }else if (value == '2') {
        return '生产部'
      }
      else if (value == '3') {
        return '财务部'
      }
      else if (value == '4') {
        return '总经办'
      }
    },
  },
  mounted() {
    this.queryList({
      pageSize: this.pageSize,
      pageCurrent: this.pageCurrent,
    });
    this.queryDept();
    this.queryRole();

  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.personnel-list {}
</style>
