<template>
  <section class="customer-list">
    <!-- start form search -->
    <el-form :inline="true" :model="searchForm" label-width="110px" size="small" class="search-form" label-suffix="：">
      <el-form-item label="客户名称">
        <el-input placeholder="请输入客户名称" style="width:150px;" v-model="searchForm.customerName"></el-input>
      </el-form-item>
      <el-form-item label="联系人">
        <el-input placeholder="请输入联系人" style="width:150px;" v-model="searchForm.contacts"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input placeholder="请输入手机号码" style="width:150px;" v-model="searchForm.contactNumber"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select placeholder="请选择" style="width:150px;" v-model="searchForm.status">
          <el-option label="全部" value="0"></el-option>
          <el-option label="启用" value="1"></el-option>
          <el-option label="停用" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="clickFormSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- end form search -->
    <!-- start btn group -->
    <el-row class="table-control">
      <el-col :span="18">
        <el-button icon="el-icon-plus" size="small" type="primary" plain @click="clickAdd">新增客户</el-button>
        <el-button icon="el-icon-price-tag" size="small" type="primary" plain @click="clickToPriceStrategy">设置价格策略</el-button>
      </el-col>
      <el-col :span="6" class="text-right">
        <!-- 备用区域 -->
      </el-col>
    </el-row>
    <!-- end btn group -->
    <article class="table-data">
      <!-- start table -->
      <el-table :data="data" border style="width: 100%" highlight-current-row @current-change="handleCurrentChange"
        @row-dblclick="rowDblclick" v-loading="loading" element-loading-text="玩命加载中" element-loading-background="rgba(0, 0, 0, 0.5)">
        <el-table-column prop="code" label="客户编码" width="150"></el-table-column>
        <el-table-column prop="customerName" label="客户名称" min-width="280"></el-table-column>
        <el-table-column prop="status" label="状态" width="70" align="center">
          <template slot-scope="scope">
            <el-tag effect="dark" :type="scope.row.status === 1 ? 'warning' : 'success'" size="mini">{{scope.row.status | changeToText}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="customerType" label="客户类型" width="80" align="center">
          <template slot-scope="scope">
            {{scope.row.customerType | changeToText2}}
          </template>
        </el-table-column>
        <el-table-column prop="contacts" label="联系人" width="100"></el-table-column>
        <el-table-column prop="contactNumber" label="联系电话" width="130"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="createdBy" label="创建人" width="130"></el-table-column>
        <el-table-column prop="creationDate" label="创建时间" width="180"></el-table-column>
        <el-table-column prop="historyOrder" label="历史订单" width="100" align="center">
          <template>
            <el-button @click="clickShowOrderHistory" size="mini" type="text">查看历史订单</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140">
          <template slot-scope="scope">
            <el-button type="danger" @click="clickDelete(scope.row)" size="mini" plain icon="el-icon-delete" circle
              title="删除"></el-button>
            <el-button size="mini" @click="clickEdit(scope.row)" circle icon="el-icon-edit" title="编辑"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- end table -->
      <!-- start pagination -->
      <el-pagination :current-page="1" :page-sizes="[10, 20, 30, 40, 50]" :page-size="60" layout="total, sizes, prev, pager, next, jumper"
        :total="80" class="table-pagination">
      </el-pagination>
      <!-- end pagination -->
    </article>
    <!-- start 新增模态窗 -->
    <el-dialog title="新增客户" :visible.sync="modalAdd" width="1100px" :append-to-body="true" :close-on-click-modal="false">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" label-suffix="：">
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="客户编码" prop="code">
              {{ruleForm.code}}<span style="opacity:.5;margin-left:16px;">（自动生成）</span>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="创建人" prop="createdBy">
              {{ruleForm.createdBy}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户名称" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请输入客户名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户类型" prop="customerType">
              <el-select v-model="ruleForm.customerType" placeholder="请选择客户类型" style="width:100%;display:block;">
                <el-option label="个人" value="0"></el-option>
                <el-option label="企业" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系人" prop="contacts">
              <el-input v-model="ruleForm.contacts" placeholder="请输入联系人姓名">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系人电话" prop="contactNumber">
              <el-input v-model="ruleForm.contactNumber" placeholder="请输入联系人电话"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="ruleForm.email" placeholder="请输入联系人电话"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="支付类型" prop="category">
              <el-select v-model="ruleForm.category" placeholder="请选择" style="width:100%;display:block;">
                <el-option label="现金用户" value="0"></el-option>
                <el-option label="月结客户" value="1"></el-option>
                <el-option label="充值用户" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开户行" prop="bankOfDeposit">
              <el-input v-model="ruleForm.bankOfDeposit" placeholder="请输入开户行"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="账号" prop="account">
              <el-input v-model="ruleForm.account" placeholder="请输入开户行账号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="省份/城市" prop="account">
              <el-cascader v-model="ruleForm.addressCity" :options="ruleForm.addressCityOptions"></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="详细地址" prop="address">
              <el-input v-model="ruleForm.address" placeholder="请输入地址"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="状态" prop="status">
              <el-radio-group v-model="ruleForm.status">
                <el-radio label="0">启用</el-radio>
                <el-radio label="1">停用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="modalAdd = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- end 新增模态窗 -->
    <!-- start 价格策略模态窗 -->
    <el-dialog title="价格策略" :visible.sync="modalPriceStrategy" width="65%" :append-to-body="true" :close-on-click-modal="false">
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane label="新增价格策略" name="xzcl">
          <el-form :model="priceStrategyForm" :rules="priceStrategyRules" ref="priceStrategyForm" label-width="130px"
            label-suffix="：">
            <el-row :gutter="24">
              <el-col :span="24">
                <el-form-item label="客户名称">
                  {{priceStrategyForm.customerName}}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="价格策略名称" prop="priceStrategyName">
                  <el-input v-model="priceStrategyForm.priceStrategyName" placeholder="请输入价格策略名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="产品名称" prop="productName">
                  <el-select v-model="priceStrategyForm.productName" placeholder="请选择产品" style="width:100%;display:block;">
                    <el-option label="不锈钢" value="0"></el-option>
                    <el-option label="铸铁" value="1"></el-option>
                    <el-option label="铁皮" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="主单位单价" prop="standardPricePrimary">
                  <el-input v-model="priceStrategyForm.standardPricePrimary" placeholder="0.00"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="次单位单价" prop="standardPriceSecondary">
                  <el-input v-model="priceStrategyForm.standardPriceSecondary" placeholder="0.00"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="次主单位比" prop="primarySecondaryProportion">
                  <el-input v-model="priceStrategyForm.primarySecondaryProportion" placeholder="1方=x公斤"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="开始时间" prop="startTime">
                  <el-date-picker v-model="priceStrategyForm.startTime" type="date" placeholder="选择日期" style="width:100%;">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="结束时间" prop="endTime">
                  <el-date-picker v-model="priceStrategyForm.endTime" type="date" placeholder="选择日期" style="width:100%;">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="适用" prop="status">
                  <el-radio-group v-model="priceStrategyForm.status">
                    <el-radio label="1">仅适用于此客户</el-radio>
                    <el-radio label="2">设为公共价格策略</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="备注" prop="remarks">
                  <el-input type="textarea" v-model="priceStrategyForm.remarks" placeholder="请输入备注"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="从已有策略中选择" name="yycl">
          <el-table :data="dataPriceStrategy" style="width: 100%;margin-bottom:24px;" border>
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="strategyName" label="策略名称"></el-table-column>
            <el-table-column prop="status" label="状态" width="80" align="center"></el-table-column>
            <el-table-column prop="status" label="适用" width="80" align="center"></el-table-column>
            <el-table-column prop="startTime" label="开始时间" width="160"></el-table-column>
            <el-table-column prop="endTime" label="结束时间" width="160"></el-table-column>
            <el-table-column prop="createdBy" label="创建人" width="150"></el-table-column>
            <el-table-column prop="creationDate" label="创建时间" width="160"></el-table-column>
            <el-table-column prop="remarks" label="备注"></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="modalPriceStrategy = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('priceStrategyForm')" v-if="activeName=='xzcl'">新增</el-button>
        <el-button type="primary" v-if="activeName=='yycl'">确 定</el-button>
      </span>
    </el-dialog>
    <!-- end 价格策略模态窗 -->
    <el-drawer title="****有限公司" :visible.sync="drawer" size="70%" custom-class="customer-info-detail-drawer">
      <figure class="drawer-content">
        <h2 class="single-title">客户信息</h2>
        <el-form label-width="130px" label-suffix="：" class="read-only-form">
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="编码">
                C41259665582
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="客户名称">
                ****有限公司
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="状态">
                有效
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系人">
                丁春秋
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系人电话">
                13800138000
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="邮箱">
                vvchuanqi@yb.tech
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开户行">
                中国建设银行
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="户头">
                ****有限公司
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="账号">
                56479816513213156546
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="地址">
                广东省*****
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <h2 class="single-title">价格策略</h2>
        <el-table :data="dataPriceStrategy" style="width: 100%;margin-bottom:24px;" border>
          <el-table-column prop="strategyName" label="策略名称"></el-table-column>
          <el-table-column prop="status" label="状态" width="80" align="center"></el-table-column>
          <el-table-column prop="startTime" label="开始时间" width="190"></el-table-column>
          <el-table-column prop="endTime" label="结束时间" width="190"></el-table-column>
          <el-table-column prop="createdBy" label="创建人" width="150"></el-table-column>
          <el-table-column prop="creationDate" label="创建时间" width="190"></el-table-column>
          <el-table-column prop="remarks" label="备注"></el-table-column>
        </el-table>
        <h2 class="single-title">历史订单</h2>
        <el-table style="width: 100%;margin-bottom:24px;" border>
          <el-table-column prop="orderCode" label="订单编号" width="150"></el-table-column>
          <el-table-column prop="strategyName" label="价格策略" width="150" align="center"></el-table-column>
          <el-table-column prop="personInCharge" label="负责人" width="100"></el-table-column>
          <el-table-column prop="startTime" label="开始时间" width="190"></el-table-column>
          <el-table-column prop="endTime" label="结束时间" width="190"></el-table-column>
          <el-table-column prop="remarks" label="备注"></el-table-column>
        </el-table>
      </figure>
    </el-drawer>
  </section>
</template>

<script>
  export default {
    name: 'CustomerList',
    data() {
      return {
        loading: false,
        searchForm: { //搜索
          customerName: '', //客户名称
          contacts: '', //联系人
          contactNumber: '', //联系电话
          status: '', //状态
        },
        drawer: false, //双击或者查看历史订单时显示在右侧的抽屉式窗口
        currentRow: null, //单击表格行所选中的那一行默认为空
        modalAdd: false, //新增客户模态窗显示/隐藏
        modalPriceStrategy: false, //模态窗显示/隐藏
        activeName: 'xzcl', //设置价格策略的模态窗tabs
        ruleForm: { //新增客户模态窗字段
          code: 'DV20070082', //编码:自动生成
          createdBy: 'admin', //创建人:自动填入
          creationDate: '2020.06.30', //创建时间
          name: '', //客户名称::::::::::::::必填
          category: '', //支付类型：现金、充值、月结::::::::::::::必填
          customerType: '', //客户类型:个人、企业::::::::::::::必填
          contacts: '', //联系人::::::::::::::必填
          contactNumber: '', //联系电话::::::::::::::必填
          email: '', //邮箱
          addressCity: [],
          addressCityOptions: [{
              value: 'beijing',
              label: '北京市',
              children: [{
                  value: 'dongcheng',
                  label: '东城区',
                },
                {
                  value: 'xicheng',
                  label: '西城区',
                },
                {
                  value: 'chaoyang',
                  label: '朝阳区',
                }
              ]
            },
            {
              value: 'tianjin',
              label: '天津市',
              children: [{
                value: 'heping',
                label: '和平区',
              }, {
                value: 'form',
                label: '河东区',
              }, {
                value: 'data',
                label: '河西区',
              }, {
                value: 'notice',
                label: '南开区',
              }, {
                value: 'navigation',
                label: '河北区',
              }, {
                value: 'others',
                label: '红桥区',
              }]
            }, {
              value: 'shanghai',
              label: '上海市',
              children: [{
                  value: 'axure',
                  label: '黄浦区'
                },
                {
                  value: 'sketch',
                  label: '徐汇区'
                }, {
                  value: 'jiaohu',
                  label: '长宁区'
                }, {
                  value: 'jiaohu',
                  label: '静安区'
                }
              ]
            }, {
              value: 'guangdong',
              label: '广东省',
              children: [{
                  value: 'guangzhou',
                  label: '广州市'
                },
                {
                  value: 'shenzhen',
                  label: '深圳市'
                }, {
                  value: 'zhuhai',
                  label: '珠海市',
                  children: [{
                      value: 'xiangzhou',
                      label: '香洲区'
                    },
                    {
                      value: 'jinwan',
                      label: '金湾区'
                    }, {
                      value: 'doumen',
                      label: '斗门区'
                    }
                  ]
                }
              ]
            }
          ],
          address: '', //地址
          bankOfDeposit: '', //开户行::::::::::::::必填
          account: '', //开户行账号::::::::::::::必填
          unitPriceSetting: '', //单价设置::::::::::::::必填
          status: '', //状态
        },
        rules: { //新增客户模态窗字段验证
          name: [{
            required: true,
            message: '请输入客户名称',
            trigger: 'blur'
          }],
          customerType: [{
            required: true,
            message: '请选择客户类型',
            trigger: 'change'
          }],
          contacts: [{
            required: true,
            message: '请输入联系人姓名',
            trigger: 'blur'
          }],
          contactNumber: [{
            required: true,
            message: '请输入联系电话',
            trigger: 'blur'
          }],
        },
        priceStrategyForm: { //设置价格策略的表单
          customerName: '', //客户名称
          priceStrategyName: '', //价格策略名称
          productName: '', //产品名称
          standardPricePrimary: '', //主单位单价
          standardPriceSecondary: '', //主单位单价
          primarySecondaryProportion: '', //次主单位比
          startTime: '', //开始时间
          endTime: '', //结束时间
          status: '', //状态1有效2停用
          remarks: '', //备注
        },
        priceStrategyRules: { //设置价格策略的表单验证：必填项等
          priceStrategyName: [{
            required: true,
            message: '请输入价格策略名称',
            trigger: 'blur'
          }],
          status: [{
            required: true,
            message: '请选择适用范围',
            trigger: 'change'
          }],
        },
        data: [{ //客户清单表格数据
            code: 'DZ2020070030',
            customerName: '****有限公司',
            category: '充值用户',
            customerType: 1,
            contactNumber: '13800138000',
            email: 'admin@dzkjy.com',
            contacts: '丁春秋',
            address: '广东省',
            bankOfDeposit: '中国建设银行999支行',
            account: '65685768579365',
            historyOrder: '/',
            status: 0,
            createdBy: 'admin',
            creationDate: '2020.08.01 02:48:35',
          }
        ],
        dataPriceStrategy: [{ //公共价格策略
            strategyName: '国庆优惠价8.5折',
            status: '0', //0无效，1有效
            createdBy: 'admin',
            creationDate: '2020.08.01 02:48:35',
            startTime: '2020.07.26 00:00:00',
            endTime: '2020.08.26 00:00:00',
            remarks: '-',
          },
          {
            strategyName: '元旦优惠价9.5折',
            status: '0', //0无效，1有效
            createdBy: 'admin',
            creationDate: '2020.08.01 02:48:35',
            startTime: '2020.07.26 00:00:00',
            endTime: '2020.08.26 00:00:00',
            remarks: '-',
          }, {
            strategyName: '新春优惠价7.5折',
            status: '0', //0无效，1有效
            createdBy: 'admin',
            creationDate: '2020.08.01 02:48:35',
            startTime: '2021.02.21 00:00:00',
            endTime: '2021.03.06 00:00:00',
            remarks: '-',
          }
        ],
      }
    },
    methods: {
      clickFormSearch() {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
        }, 2000);
      },
      rowDblclick() { //双击某一行
        this.drawer = true;
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      clickShowOrderHistory() { //查看历史订单
        this.drawer = true;
      },
      clickAdd() { //新增客户模态窗
        this.modalAdd = true;
      },
      clickToPriceStrategy() { //设置价格策略
        if (this.currentRow == null) {
          this.$message({
            type: 'info',
            message: '请选择一个客户'
          });

        } else {
          this.modalPriceStrategy = true;
          console.log(this.currentRow.customerName);
          this.priceStrategyForm.customerName = this.currentRow.customerName;
        }
      },
      handleTabClick(tab, event) { //设置价格策略模态窗中的tabs切换事件
        console.log(tab, event);
        // console.log(tab.label, event);
      },
      clickDelete(row) { //删除表格行按钮事件
        this.$confirm('此操作将永久删除该科目, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => {
            console.log(row);
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          })
          .catch(() => {});
      },
      clickEdit(row) { //编辑表格行按钮事件
        console.log(row);
      },
      submitForm(formName) { //新增客户提交时的验证事件
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('提交成功!');
          } else {
            console.log('提交失败!!');
            return false;
          }
        });
      },
    },
    filters: {
      changeToText(value) {
        if (value == 0)
          return '有效'
        else {
          return '停用'
        }
      },
      changeToText2(value) {
        if (value == 0)
          return '个人'
        else {
          return '企业'
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .customer-list {
    display: flex;
    flex-flow: column;

    .table-data {
      padding: 0 16px;
      flex: 1;
    }

    .customer-info-detail-drawer {
      .drawer-content {
        padding: 0 20px;
      }
    }
  }
</style>
