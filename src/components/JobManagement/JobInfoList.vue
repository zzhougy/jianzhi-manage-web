<template>
<section class="personnel-list">
  <!-- start form search -->
  <el-form :inline="true" :model="formInline" label-width="100px" size="small" class="search-form" label-suffix="：">
    <el-form-item label="单位名称">
      <el-input v-model="formInline.name" placeholder="请输入" style="width:200px;"></el-input>
    </el-form-item>
    <el-form-item label="岗位名称">
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
<!--      <el-button icon="el-icon-plus" size="small" type="primary" plain @click="clickAdd">新增职员</el-button>-->
    </el-col>
    <el-col :span="6"></el-col>
  </el-row>
  <!-- end btn group -->
  <!-- start table -->
  <article class="table-data">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" label="序号" width="90"></el-table-column>
<!--      <el-table-column prop="id" label="id" width="90"></el-table-column>-->
      <el-table-column prop="recruitUnit.name" label="招聘单位" width="90"></el-table-column>
      <el-table-column prop="jobName" label="岗位名称" width="90"></el-table-column>
      <el-table-column prop="workTime" label="兼职时间" width="90"></el-table-column>
      <el-table-column prop="location" label="地点" width="90"></el-table-column>
      <el-table-column prop="label" label="兼职标签" width="120"></el-table-column>
      <el-table-column prop="detail" label="岗位描述" width="70"></el-table-column>
      <el-table-column prop="requirement" label="岗位要求" width="120"></el-table-column>
      <el-table-column prop="salaryTreatment" label="薪资待遇" width="100"></el-table-column>
      <el-table-column prop="status" label="岗位状态" width="200" :formatter="formatStatus"></el-table-column>
      <el-table-column prop="needResumeAttachment" label="是否需要简历附件" width="100"></el-table-column>
      <el-table-column prop="wechat" label="WeChat" width="100"></el-table-column>
      <el-table-column prop="creator" label="创建人" align="center" width="150"></el-table-column>
      <el-table-column prop="create_time" label="创建日期"  align="center" width="180" sortable></el-table-column>
      <el-table-column prop="updator" label="更新人" align="center" width="100"></el-table-column>
      <el-table-column prop="update_time" label="更新时间" align="center" width="180"></el-table-column>
<!--      <el-table-column prop="status" label="状态" width="90">-->
<!--        <template slot-scope="scope">-->
<!--          <el-tag effect="dark" :type="scope.row.status === '0' ? 'success' : 'warning'" size="mini">{{scope.row.status | changeToText1}}</el-tag>-->
<!--        </template>-->
<!--      </el-table-column>-->


      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="danger" @click="clickDelete(scope.row)" size="mini" plain icon="el-icon-delete" circle title="删除"></el-button>
          <el-button size="mini" @click="clickEdit(scope.row)" circle icon="el-icon-edit" title="编辑"></el-button>
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
          <el-form-item label="编号" prop="code">
            <el-input v-model="ruleForm.code" placeholder="请输入编号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="性别" prop="sex">
           <!-- <el-input v-model="ruleForm.sex" placeholder="请输入性别"></el-input> -->
            <el-radio-group v-model="ruleForm.sex">
              <el-radio label="0">男</el-radio>
              <el-radio label="1">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="身份证号码" prop="idcard">
            <el-input v-model="ruleForm.idcard" placeholder="请输入电话"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="电话" prop="phone">
            <el-input v-model="ruleForm.phone" placeholder="请输入电话"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系地址" prop="address">
            <el-input v-model="ruleForm.address" placeholder="请输入地址"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="QQ" prop="qq">
            <el-input v-model="ruleForm.qq" placeholder="请输入qq"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="wechat" prop="wechat">
            <el-input v-model="ruleForm.wechat" placeholder="请输入微信"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="入职时间" prop="hiredate">
           <el-date-picker v-model="ruleForm.hiredate"  value-format="yyyy-MM-dd" type="date" placeholder="选择日期"> </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="ruleForm.status">
              <el-radio label="0">有效</el-radio>
              <el-radio label="1">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="部门" prop="deptId">
            <el-select v-model="ruleForm.deptId" placeholder="请选择">
              <el-option
                  v-for="item in deptOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>

          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="角色" prop="roleId">
            <el-select v-model="ruleForm.roleId" placeholder="请选择">
              <el-option
                  v-for="item in roleOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="8">
          <el-form-item label="允许登录" prop="isUser">
            <el-radio-group v-model="ruleForm.isUser">
              <el-radio label="0">允许</el-radio>
              <el-radio label="1">不允许</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col> -->
        <el-col :span="8">
          <el-form-item label="创建人" prop="createdBy">
            {{ruleForm.createdBy}}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="creationtime">
            {{ruleForm.creationtime}}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="更新人" prop="updatedBy">
            {{ruleForm.updatedBy}}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="更新时间" prop="updatedDate">
            {{ruleForm.updatedDate}}
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" v-model="ruleForm.remark" placeholder="请输入备注"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="initForm">取 消</el-button>
      <el-button type="primary"  @click=" dialogType === 'add' ? addPerson('ruleForm') : updatePerson('ruleForm') ">确 定</el-button>
    </span>
  </el-dialog>
  <!-- end 新增模态窗 -->
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
      tableData: []
    }
  },
  methods: {
    formatStatus(row) {
      if (row.status === '1'){
        return '已发布';
      }else if (row.status === '2'){
        return '已关闭';
      }else if (row.status === '3'){
        return '已删除';
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
      console.log("点击编辑", this.ruleForm);
    },

     updatePerson(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post("/proStaff/edit", this.ruleForm).then((res) => {
            if (res.code == 10000) {
              this.$message.error(res.msg);
            } else if (res.code == 200) {
              this.$message.success("更新成功");
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

    //重置
    initForm() {
      this.modalAdd = false;
      this.resetEdit();
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
      });
    },
    queryList(data) {
      this.$axios.post("/jobInfo/list", data).then((res) => {
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

  },


  filters: {
    changeToText1(value) {
      if (value == '0')
        return '正常'
      else if (value == '1') {
        return '停用'
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
