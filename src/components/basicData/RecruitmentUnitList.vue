<template>
<section class="personnel-list">
  <!-- start form search -->
  <el-form :inline="true" :model="formInline" label-width="80px" size="small" class="search-form" label-suffix="：">
    <el-form-item label="名称">
      <el-input v-model="formInline.name" placeholder="请输入" style="width:200px;"></el-input>
    </el-form-item>
    <el-form-item label="地址">
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
    <el-table :data="tableData" border style="width: 100%" :fit="true">
<!--      <el-table-column prop="id" label="id" ></el-table-column>-->
      <el-table-column prop="name" label="名称" ></el-table-column>
      <el-table-column prop="location" label="地址"  ></el-table-column>
      <el-table-column prop="field" label="领域" ></el-table-column>
      <el-table-column prop="scale" label="规模" ></el-table-column>
      <el-table-column prop="profile" label="简介"></el-table-column>
      <el-table-column prop="createTime" label="申请时间" ></el-table-column>
      <el-table-column prop="updateTime" label="修改时间" ></el-table-column>
      <el-table-column prop="status" label="状态" >
        <template slot-scope="scope">
          <el-tag effect="dark" v-if="scope.row.status === 0" type="info" size="mini">{{scope.row.status | changeToText1}}</el-tag>
          <el-tag effect="dark" v-else-if="scope.row.status === 1" type="danger" size="mini">{{scope.row.status | changeToText1}}</el-tag>
          <el-tag effect="dark" v-else-if="scope.row.status === 2" type="success" size="mini">{{scope.row.status | changeToText1}}</el-tag>
          <el-tag effect="dark" v-else-if="scope.row.status === 3" type="warning" size="mini">{{scope.row.status | changeToText1}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150"  fixed="right">
        <template slot-scope="scope">
          <el-button type="danger" @click="clickDelete(scope.row)" size="mini" plain icon="el-icon-delete" circle title="删除"></el-button>
          <el-button size="mini" @click="clickEdit(scope.row)" circle icon="el-icon-edit" title="编辑"></el-button>
          <el-button size="mini" @click="clickView(scope.row)" circle icon="el-icon-view" title="审核"></el-button>

        </template>
      </el-table-column>
    </el-table>
  </article>
  <!-- end table -->
  <!-- start pagination -->
  <el-pagination :current-page="1" :page-sizes="[10, 20, 30, 40]" :page-size="1" layout="total, sizes, prev, pager, next, jumper" :total="2" class="table-pagination">
  </el-pagination>
  <!-- end pagination -->
  <!-- start 新增模态窗 -->
<!--  <el-dialog title="职员信息" :visible.sync="modalAdd" width="1100px" :append-to-body="true" :close-on-click-modal="false">-->
<!--    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm" label-suffix="：">-->
<!--      <el-row :gutter="24">-->
<!--        <el-col :span="8">-->
<!--          <el-form-item label="编号" prop="code">-->
<!--            <el-input v-model="ruleForm.code" placeholder="请输入编号"></el-input>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--        <el-col :span="8">-->
<!--          <el-form-item label="姓名" prop="name">-->
<!--            <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--        <el-col :span="8">-->
<!--          <el-form-item label="性别" prop="sex">-->
<!--           &lt;!&ndash; <el-input v-model="ruleForm.sex" placeholder="请输入性别"></el-input> &ndash;&gt;-->
<!--            <el-radio-group v-model="ruleForm.sex">-->
<!--              <el-radio label="0">男</el-radio>-->
<!--              <el-radio label="1">女</el-radio>-->
<!--            </el-radio-group>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--        <el-col :span="8">-->
<!--          <el-form-item label="身份证号码" prop="idcard">-->
<!--            <el-input v-model="ruleForm.idcard" placeholder="请输入电话"></el-input>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--        <el-col :span="8">-->
<!--          <el-form-item label="电话" prop="phone">-->
<!--            <el-input v-model="ruleForm.phone" placeholder="请输入电话"></el-input>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--        <el-col :span="8">-->
<!--          <el-form-item label="邮箱" prop="email">-->
<!--            <el-input v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--        <el-col :span="8">-->
<!--          <el-form-item label="联系地址" prop="address">-->
<!--            <el-input v-model="ruleForm.address" placeholder="请输入地址"></el-input>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--        <el-col :span="8">-->
<!--          <el-form-item label="QQ" prop="qq">-->
<!--            <el-input v-model="ruleForm.qq" placeholder="请输入qq"></el-input>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--        <el-col :span="8">-->
<!--          <el-form-item label="wechat" prop="wechat">-->
<!--            <el-input v-model="ruleForm.wechat" placeholder="请输入微信"></el-input>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--        <el-col :span="8">-->
<!--          <el-form-item label="入职时间" prop="hiredate">-->
<!--           <el-date-picker v-model="ruleForm.hiredate"  value-format="yyyy-MM-dd" type="date" placeholder="选择日期"> </el-date-picker>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--        <el-col :span="8">-->
<!--          <el-form-item label="状态" prop="status">-->
<!--            <el-radio-group v-model="ruleForm.status">-->
<!--              <el-radio label="0">有效</el-radio>-->
<!--              <el-radio label="1">停用</el-radio>-->
<!--            </el-radio-group>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--        <el-col :span="8">-->
<!--          <el-form-item label="部门" prop="deptId">-->
<!--            <el-select v-model="ruleForm.deptId" placeholder="请选择">-->
<!--              <el-option-->
<!--                  v-for="item in deptOptions"-->
<!--                  :key="item.value"-->
<!--                  :label="item.label"-->
<!--                  :value="item.value">-->
<!--                </el-option>-->
<!--            </el-select>-->

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
<!--        &lt;!&ndash; <el-col :span="8">-->
<!--          <el-form-item label="允许登录" prop="isUser">-->
<!--            <el-radio-group v-model="ruleForm.isUser">-->
<!--              <el-radio label="0">允许</el-radio>-->
<!--              <el-radio label="1">不允许</el-radio>-->
<!--            </el-radio-group>-->
<!--          </el-form-item>-->
<!--        </el-col> &ndash;&gt;-->
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
<!--      </el-row>-->
<!--    </el-form>-->
<!--    <span slot="footer" class="dialog-footer">-->
<!--      <el-button @click="initForm">取 消</el-button>-->
<!--      <el-button type="primary"  @click=" dialogType === 'add' ? addPerson('ruleForm') : updatePerson('ruleForm') ">确 定</el-button>-->
<!--    </span>-->
<!--  </el-dialog>-->
  <!-- end 新增模态窗 -->


  <el-drawer
          title=""
          :visible.sync="drawer"
          direction="rtl"
          style="margin-left: 10px;">
    <h2 class="single-title">企业信息</h2>
    <el-form ref="formInfo" :model="formInfo" style="margin-left: 30px;">

      <div style="text-align: center; margin-bottom: 10px">
        <img width="80px" height="80px" style="border-radius: 40px" :src="formInfo.unitImageUrl">
        <div style="margin: 10px">
          <div>
            <p style="color: #20a0ff; font-size: 14px" v-if="formInfo.status == 2">已认证</p>
            <p style="color: #20a0ff; font-size: 14px" v-if="formInfo.status == 1">审核中</p>
            <p style="color: red; font-size: 14px" v-if="formInfo.status == 3">未认证</p>
            <p style="color: red; font-size: 14px" v-if="formInfo.status == 4">封禁</p>
          </div>
        </div>
      </div>

      <div class="form-item">
        <el-form-item label="名称" prop="name">
          {{formInfo.name}}
        </el-form-item>
      </div>
      <div class="form-item">
        <el-form-item label="地址" prop="location">
          {{formInfo.location}}
        </el-form-item>
      </div>
      <div class="form-item">
        <el-form-item label="领域" prop="field">
          {{formInfo.field}}
        </el-form-item>
      </div>
      <div class="form-item">
        <el-form-item label="规模" prop="scale">
          {{formInfo.scale}}
        </el-form-item>
      </div>
      <div class="form-item">
        <el-form-item label="简介" prop="profile">
          {{formInfo.profile}}
        </el-form-item>
      </div>
      <div class="form-item">
        <el-form-item label="营业执照" prop="profile">
          <div class="demo-image__preview">
            <el-image
                    style="width: 100px; height: 100px"

                    :src="require('../../../source/zhizhao.jpeg')"
                    :preview-src-list="srcList">
            </el-image>
          </div>
        </el-form-item>
      </div>
      <div style="text-align: center">
        <el-button type="info" round v-if="formInfo.status == 0 || formInfo.status == 1 || formInfo.status == 3" @click="clickShenhe(0)" >不通过</el-button>
        <el-button type="success" round v-if="formInfo.status == 0 || formInfo.status == 1 || formInfo.status == 3" @click="clickShenhe(2)">通过</el-button>
        <el-button type="danger" round v-if="formInfo.status == 2" @click="clickShenhe(4)">封禁</el-button>
      </div>
    </el-form>
  </el-drawer>
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
      tableData: [],
      drawer: false,//审核抽屉
      formInfo: {},//单位信息
      url: 'https://jianzhi-backet.oss-cn-shenzhen.aliyuncs.com/recruitUnit/0/zhizhao.jpeg',
      srcList: [
        'https://jianzhi-backet.oss-cn-shenzhen.aliyuncs.com/recruitUnit/0/zhizhao.jpeg'
      ]
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
        code: this.formInline.code,
        name: this.formInline.name,
        deptId: this.formInline.deptId,
      });
    },
    queryList(data) {
      this.$axios.post("/recruitUnit/list", data).then((res) => {
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

    //点击审核
    clickView(val){
console.log('val' ,val )
      this.drawer = true;

      this.formInfo = val
    },
    //点击审核通过
    clickShenhe(status){
      this.$confirm("是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(() => {
          this.$axios.post("/recruitUnit/edit",{id:this.formInfo.id,status:status}).then(res=>{
            if (res.code == 200){
              this.$message.success("操作成功")
              this.drawer = false;
            }
          })
        }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });

    },
  },


  filters: {
    changeToText1(value) {
      if (value == '0')
        return '未通过审核'
      else if (value == '1') {
        return '待审核'
      }else if (value == '2') {
        return '审核通过'
      }else if (value == '3') {
        return '不存在的情况'
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
