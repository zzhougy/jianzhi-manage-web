<template>
<section class="index">

  <!-- start 快捷入口 -->
  <figure class="quick-port">
    <el-row :gutter="24">
      <el-col :span="2.5">
        <router-link class="item" :style="{'background-color':quikPortSetting.color1}" to="/basicData/menus-management">
<!--          <img src="../static/images/icon_quick_port_3.png" alt="">-->
          <h2>权限管理</h2>
        </router-link>
      </el-col>
      <el-col :span="2.5">
        <router-link class="item" :style="{'background-color':quikPortSetting.color2}" to="/basicData/permission">
<!--          <img src="../static/images/icon_quick_port_3.png" alt="">-->
          <h2>角色管理</h2>
        </router-link>
      </el-col>
      <el-col :span="2.7">
        <router-link class="item" :style="{'background-color':quikPortSetting.color3}" to="/basicData/personnel-list">
<!--          <img src="../static/images/icon_quick_port_3.png" alt="">-->
          <h2>后台人员管理</h2>
        </router-link>
      </el-col>
      <el-col :span="2.7">
        <router-link class="item" :style="{'background-color':quikPortSetting.color4}" to="/basicData/jobSeeker">
<!--          <img src="../static/images/icon_quick_port_3.png" alt="">-->
          <h2>求职者管理</h2>
        </router-link>
      </el-col>
      <el-col :span="2.7">
        <router-link class="item" :style="{'background-color':quikPortSetting.color5}" to="/basicData/hrList">
<!--          <img src="../static/images/icon_quick_port_3.png" alt="">-->
          <h2>招聘人员管理</h2>
        </router-link>
      </el-col>
      <el-col :span="2.7">
        <router-link class="item" :style="{'background-color':quikPortSetting.color6}" to="/basicData/recruitmentUnit">
<!--          <img src="../static/images/icon_quick_port_3.png" alt="">-->
          <h2>企业信息管理</h2>
        </router-link>
      </el-col>
      <el-col :span="2.7">
        <router-link class="item" :style="{'background-color':quikPortSetting.color7}" to="/jobManagement/jobInfo-list">
<!--          <img src="../static/images/icon_quick_port_3.png" alt="">-->
          <h2>岗位信息管理</h2>
        </router-link>
      </el-col>
      <el-col :span="2.7">
        <router-link class="item" :style="{'background-color':quikPortSetting.color8}" to="/jobManagement/label-list">
<!--          <img src="../static/images/icon_quick_port_3.png" alt="">-->
          <h2>岗位标签管理</h2>
        </router-link>
      </el-col>
      <el-col :span="2.7">
        <router-link class="item" :style="{'background-color':quikPortSetting.color9}" to="/jobManagement/label-list">
          <!--          <img src="../static/images/icon_quick_port_3.png" alt="">-->
          <h2>意见与反馈管理</h2>
        </router-link>
      </el-col>

    </el-row>
  </figure>
  <!-- end 快捷入口 -->



  <!-- start 全局统计卡片展示 -->
  <el-row :gutter="10" class="cards-group">
    <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6" style="margin-right:-200px;">
      <el-card class="box-card" :class="countDict['userCount'].style" style="width: 150px;">
<!--        <h2 class="number">{{baseCount.userCount?baseCount.userCount:0}}</h2>-->
        <p class="title">{{countDict['userCount'].name}}</p>
        <p>_________</p>
        <h2 class="number">164</h2>
      </el-card>
    </el-col>
    <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6" >
      <el-card class="box-card" :class="countDict['supplierCount'].style" style="width: 150px;margin-left: 10px">
<!--        <h2 class="number">{{baseCount.supplierCount}}</h2>-->
        <p class="title">{{countDict['supplierCount'].name}}</p>
        <p>_________</p>
        <h2 class="number">8</h2>
      </el-card>
    </el-col>
<!--    <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6" >-->
<!--      <el-card class="box-card" :class="countDict['productCount'].style">-->
<!--&lt;!&ndash;        <h2 class="number">{{baseCount.productCount}}</h2>&ndash;&gt;-->
<!--        <h2 class="number">544</h2>-->
<!--        <p class="title">{{countDict['productCount'].name}}</p>-->
<!--      </el-card>-->
<!--    </el-col>-->
<!--    <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6" >-->
<!--      <el-card class="box-card" :class="countDict['rechargeCount'].style">-->
<!--&lt;!&ndash;        <h2 class="number">{{baseCount.rechargeCount}}</h2>&ndash;&gt;-->
<!--        <h2 class="number">656</h2>-->
<!--        <p class="title">{{countDict['rechargeCount'].name}}</p>-->
<!--      </el-card>-->
<!--    </el-col>-->
  </el-row>
  <!-- end 全局统计卡片展示 -->



  <!-- start 自定义快捷入口 -->
  <el-dialog title="自定义快捷入口" :visible.sync="dialogQuickPort" width="1000px" :append-to-body="true" :close-on-click-modal="false">
    <!-- start 菜单树列表 -->
    <el-row :gutter="24">
      <el-col :span="10">
        <h4 class="title-text">待选菜单</h4>
        <figure style="height:400px;overflow:hidden;overflow-y:auto;border:1px solid #DCDFE6;">
          <el-tree :data="data" show-checkbox node-key="id" default-expand-all :expand-on-click-node="false" :check-on-click-node="true"></el-tree>
        </figure>
      </el-col>
      <el-col :span="14">
        <h4 class="title-text">已选菜单（最多15个）</h4>
        <figure style="height:400px;overflow:hidden;overflow-y:auto;border:1px solid #DCDFE6;">
          <ul class="menu-list">
            <li>
              <span class="menu-name" :style="{'color':quikPortSetting.color1}">新增报价单</span>
              <span>
                <el-button icon="el-icon-bottom" size="mini" title="下移一位" circle></el-button>
              </span>
              <span>
                <el-color-picker v-model="quikPortSetting.color1" size="mini" :predefine="predefineColors"></el-color-picker>
              </span>
              <span>
                <el-button icon="el-icon-delete" size="mini" title="删除" circle></el-button>
              </span>
            </li>
            <li>
              <span class="menu-name" :style="{'color':quikPortSetting.color2}">新增订单</span>
              <span>
                <el-button icon="el-icon-top" size="mini" title="上移一位" circle></el-button>
              </span>
              <span>
                <el-button icon="el-icon-bottom" size="mini" title="下移一位" circle></el-button>
              </span>
              <span>
                <el-color-picker v-model="quikPortSetting.color2" size="mini" :predefine="predefineColors"></el-color-picker>
              </span>
              <span>
                <el-button icon="el-icon-delete" size="mini" title="删除" circle></el-button>
              </span>
            </li>
            <li>
              <span class="menu-name" :style="{'color':quikPortSetting.color3}">标准件管理</span>
              <span>
                <el-button icon="el-icon-top" size="mini" title="上移一位" circle></el-button>
              </span>
              <span>
                <el-button icon="el-icon-bottom" size="mini" title="下移一位" circle></el-button>
              </span>
              <span>
                <el-color-picker v-model="quikPortSetting.color3" size="mini" :predefine="predefineColors"></el-color-picker>
              </span>
              <span>
                <el-button icon="el-icon-delete" size="mini" title="删除" circle></el-button>
              </span>
            </li>
            <li>
              <span class="menu-name" :style="{'color':quikPortSetting.color4}">库存管理</span>
              <span>
                <el-button icon="el-icon-top" size="mini" title="上移一位" circle></el-button>
              </span>
              <span>
                <el-button icon="el-icon-bottom" size="mini" title="下移一位" circle></el-button>
              </span>
              <span>
                <el-color-picker v-model="quikPortSetting.color4" size="mini" :predefine="predefineColors"></el-color-picker>
              </span>
              <span>
                <el-button icon="el-icon-delete" size="mini" title="删除" circle></el-button>
              </span>
            </li>
            <li>
              <span class="menu-name" :style="{'color':quikPortSetting.color5}">财务管理</span>
              <span>
                <el-button icon="el-icon-top" size="mini" title="上移一位" circle></el-button>
              </span>
              <span>
                <el-button icon="el-icon-bottom" size="mini" title="下移一位" circle></el-button>
              </span>
              <span>
                <el-color-picker v-model="quikPortSetting.color5" size="mini" :predefine="predefineColors"></el-color-picker>
              </span>
              <span>
                <el-button icon="el-icon-delete" size="mini" title="删除" circle></el-button>
              </span>
            </li>
            <li>
              <span class="menu-name" :style="{'color':quikPortSetting.color6}">客户管理</span>
              <span>
                <el-button icon="el-icon-top" size="mini" title="上移一位" circle></el-button>
              </span>
              <span>
                <el-button icon="el-icon-bottom" size="mini" title="下移一位" circle></el-button>
              </span>
              <span>
                <el-color-picker v-model="quikPortSetting.color6" size="mini" :predefine="predefineColors"></el-color-picker>
              </span>
              <span>
                <el-button icon="el-icon-delete" size="mini" title="删除" circle></el-button>
              </span>
            </li>
            <li>
              <span class="menu-name" :style="{'color':quikPortSetting.color7}">图文档</span>
              <span>
                <el-button icon="el-icon-top" size="mini" title="上移一位" circle></el-button>
              </span>
              <span>
                <el-button icon="el-icon-bottom" size="mini" title="下移一位" circle></el-button>
              </span>
              <span>
                <el-color-picker v-model="quikPortSetting.color7" size="mini" :predefine="predefineColors"></el-color-picker>
              </span>
              <span>
                <el-button icon="el-icon-delete" size="mini" title="删除" circle></el-button>
              </span>
            </li>
            <li>
              <span class="menu-name" :style="{'color':quikPortSetting.color8}">设备管理</span>
              <span>
                <el-button icon="el-icon-top" size="mini" title="上移一位" circle></el-button>
              </span>
              <span>
                <el-color-picker v-model="quikPortSetting.color8" size="mini" :predefine="predefineColors"></el-color-picker>
              </span>
              <span>
                <el-button icon="el-icon-delete" size="mini" title="删除" circle></el-button>
              </span>
            </li>
            <li>
              <span class="menu-name" :style="{'color':quikPortSetting.color9}">设备管理</span>
              <span>
                <el-button icon="el-icon-top" size="mini" title="上移一位" circle></el-button>
              </span>
              <span>
                <el-color-picker v-model="quikPortSetting.color9" size="mini" :predefine="predefineColors"></el-color-picker>
              </span>
              <span>
                <el-button icon="el-icon-delete" size="mini" title="删除" circle></el-button>
              </span>
            </li>
          </ul>
        </figure>
      </el-col>
    </el-row>
    <!-- end 菜单树列表 -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogQuickPort = false">取 消</el-button>
      <el-button type="primary" @click="confirmQuickPortSetting">确 定</el-button>
    </span>
  </el-dialog>
  <!-- end 自定义快捷入口 -->
<!--  &lt;!&ndash; start 设备详情 &ndash;&gt;-->
<!--  <el-dialog title="【激光切割机】排单详情" :visible.sync="dialogEquipment" width="1500px" :append-to-body="true" :close-on-click-modal="false">-->
<!--    &lt;!&ndash; start 设备生产的列表 &ndash;&gt;-->
<!--    <el-table :data="tableData" style="width: 100%" border>-->
<!--      <el-table-column prop="name" label="品名" width="180"></el-table-column>-->
<!--      <el-table-column prop="isStandard" label="是否标准件" width="120">-->
<!--        <template slot-scope="scope">-->
<!--          <i :class="scope.row.isStandard === '0' ? 'el-icon-s-opportunity text-success' : 'el-icon-s-flag'"></i>{{scope.row.isStandard | changeToText}}-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column prop="material" label="材料" width="100"></el-table-column>-->
<!--      <el-table-column prop="count1" label="已完成数量" width="100" align="center"></el-table-column>-->
<!--      <el-table-column prop="count2" label="计划数量" width="100" align="center"></el-table-column>-->
<!--      <el-table-column prop="date" label="计划完成日期" width="120" align="center"></el-table-column>-->
<!--      <el-table-column prop="orderName" label="所属订单">-->
<!--        <template slot-scope="scope">-->
<!--          {{scope.row.orderName}}-->
<!--          <el-button type="text" size="mini" @click="linkToMoreOrders">查看</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column prop="technician" label="技师" width="100" align="center"></el-table-column>-->
<!--      <el-table-column prop="technicianPhone" label="技师电话" width="150"></el-table-column>-->
<!--    </el-table>-->
<!--    &lt;!&ndash; end 设备生产的列表 &ndash;&gt;-->
<!--    <span slot="footer" class="dialog-footer">-->
<!--      <el-button type="primary" @click="dialogEquipment = false">确 定</el-button>-->
<!--    </span>-->
<!--  </el-dialog>-->
<!--  &lt;!&ndash; end 设备详情 &ndash;&gt;-->
</section>
</template>

<script>
import ChartsLine from '@/components/ChartsLine.vue'
import Radar from '@/components/Radar.vue'

import {countDict} from "@/static/countDict"

export default {
  name: 'index',
  components: {
    // ChartsLine,
    // Radar
  },
  data() {
    const data = [{
        id: 1,
        label: '基础数据维护',
        children: [{
          id: 4,
          label: '报价单',
          children: [{
            id: 41,
            label: '新增报价单'
          }, {
            id: 42,
            label: '报价单历史记录'
          }, {
            id: 43,
            label: '其他菜单'
          }, {
            id: 44,
            label: '其他菜单二'
          }]
        }]
      },
      {
        id: 2,
        label: '客户管理',
        children: [{
          id: 21,
          label: '客户列表'
        }]
      }, {
        id: 3,
        label: '设备管理',
        children: [{
          id: 31,
          label: '设备资料'
        }, {
          id: 32,
          label: '设备管理'
        }]
      }, {
        id: 4,
        label: '清单打印',
        children: [{
          id: 41,
          label: '清单录入'
        }, {
          id: 42,
          label: '清单查询'
        }]
      }, {
        id: 5,
        label: '采购管理',
        children: [{
          id: 51,
          label: '申请单列表'
        }, {
          id: 52,
          label: '申请单审批'
        }]
      }, {
        id: 6,
        label: '财务管理',
        children: [{
          id: 61,
          label: '申请单列表'
        }, {
          id: 62,
          label: '申请单审批'
        }]
      }, {
        id: 7,
        label: '财务分析',
        children: [{
          id: 71,
          label: '申请单列表'
        }, {
          id: 72,
          label: '申请单审批'
        }]
      }
    ];
    return {

      countDict:countDict,
      cards: [
        {
          name: "供应商数量",
          count: "892,752",
          increase: true,
          increaseNumber: "25%",
          style: "bg1",
        },
        {
          name: "新增申请",
          count: "52",
          increase: true,
          increaseNumber: "5%",
          style: "bg2",
        },
        {
          name: "总产品数量",
          count: "1,892,752",
          increase: true,
          increaseNumber: "25%",
          style: "bg3",
        },
        {
          name: "新增产品数量",
          count: "2,784",
          increase: false,
          increaseNumber: "-5%",
          style: "bg4",
        },
      ],
      quickLinks: [
        {
          name: "功能名称",
          desc: "功能描述文字",
          path: "/",
          // icon: require("@/assets/icon_user.png"),
        },
        {
          name: "功能名称",
          desc: "功能描述文字",
          path: "/",
          // icon: require("@/assets/icon_msg.png"),
        },
        {
          name: "功能名称",
          desc: "功能描述文字",
          path: "/",
          // icon: require("@/assets/icon_chart.png"),
        },
        {
          name: "功能名称",
          desc: "功能描述文字",
          path: "/",
          // icon: require("@/assets/icon_heart.png"),
        },
        {
          name: "功能名称",
          desc: "功能描述文字",
          path: "/",
          // icon: require("@/assets/icon_circle.png"),
        },
        {
          name: "功能名称",
          desc: "功能描述文字",
          path: "/",
          // icon: require("@/assets/icon_menu.png"),
        },
      ],
      percentage: 10,
      percentage2: 40,
      percentage3: 80,
      colors: [
        {
          color: "#f56c6c",
          percentage: 20,
        },
        {
          color: "#e6a23c",
          percentage: 40,
        },
        {
          color: "#5cb87a",
          percentage: 60,
        },
        {
          color: "#1989fa",
          percentage: 80,
        },
        {
          color: "#6f7ad3",
          percentage: 100,
        },
      ],
      valueDate: "",
      valueDate2: "2020-02",
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      toDoData: {},
      baseCount:{},






      dialogQuickPort: false,
      dialogEquipment: false,
      data: JSON.parse(JSON.stringify(data)),
      predefineColors: [
        '#29CE8B',
        '#3E82EE',
        '#C77BE6',
        '#FD9E8A',
        '#FCA713',
        '#05C3EE',
        '#729FFF',
        '#13c2c2',
        '#faad14',
        '#9254de',
        '#f759ab',
        '#bfbfbf',
        '#bae637',
        '#ff9c6e'
      ],
      quikPortSetting: {
        color0: '#29CE8B',
        color1: '#29CE8B',
        color2: '#3E82EE',
        color3: '#C77BE6',
        color4: '#FD9E8A',
        color5: '#FCA713',
        color6: '#05C3EE',
        color7: '#729FFF',
        color8: '#13c2c2',
        color9: '#c27200',
      },
      orderBrief: '按月度',
      tableData: [{ //设备的排单详情列表
          name: '螺丝母头4寸',
          isStandard: '1', //0表示标准件，1表示是定制件
          count1: '50',
          count2: '62',
          date: '2020.10.15',
          orderName: '衣食无忧餐饮店20200930',
          technician: '张无忌',
          technicianPhone: '121212121221',
          material: '不锈钢',
        }
      ],
    }
  },
  methods: {
    linkToMoreOrders() {
      this.$router.push('/production-management/production-schedule-list');
    },
    confirmQuickPortSetting() { //快捷入口模态窗确认按钮事件
      this.$message({
        type: 'success',
        message: '设置完成!'
      });
      this.dialogQuickPort = false
    },

  },
  filters: {
    changeToText(value) {
      if (value == 0)
        return '标准件'
      else {
        return '定制件'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.index {
    padding: 16px;
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
    background-color: @color-body-bg;
    .box-card {
        margin-bottom: 16px;
    }
    .order-charts-list {
        h3 {
            margin-top: 12px;
            font-weight: 800;
            margin-bottom: 6px;
            white-space: nowrap;
            overflow: hidden;
            width: 100%;
            text-overflow: ellipsis;
        }
    }
    .quick-port {
        margin-bottom: 16px;
        .item {
            background-color: #FFF;
            padding: 22px 16px;
            display: flex;
            align-items: center;
            border-radius: 4px;
            transition: all 0.2s;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            &::before {
                content: "";
                position: absolute;
                transition: all 0.2s;
                width: 100%;
                left: 0;
                top: 95%;
                height: 100%;
                background-color: rgba(0,0,0,.15);
            }
            &:hover {
                box-shadow: 0 5px 15px rgba(0,0,0,.15);
                > img {
                    transform: scale(.65);
                }
                &::before {
                    top: 0;
                    z-index: 0;
                }

            }
            &:active {
                box-shadow: 0 5px 0 rgba(0,0,0,.15);
            }
            > img {
                margin-right: 12px;
                width: 56px;
                height: 56px;
                transition: all 0.2s;
                position: relative;
                z-index: 5;
            }
            > h2 {
                font-size: 17px;
                font-weight: 800;
                color: #FFF;
                flex: 1;
                position: relative;
                z-index: 5;
            }
            &.item_plus {}
            &.color1 {
                background-color: #29CE8B;
            }
            &.color2 {
                background-color: #3E82EE;
            }
            &.color3 {
                background-color: #C77BE6;
            }
            &.color4 {
                background-color: #FD9E8A;
            }
            &.color5 {
                background-color: #FCA713;
            }
            &.color6 {
                background-color: #05C3EE;
            }
            &.color7 {
                background-color: #729FFF;
            }
            &.color8 {
                background-color: #606266;
            }
        }
    }
}
// 首页的快捷入口管理
.menu-list {
    > li {
        display: flex;
        align-items: center;
        padding: 12px 16px;
        position: relative;
        &::after {
            content: "";
            position: absolute;
            left: 16px;
            bottom: 0;
            border-bottom: 1px solid @color-border-lighter;
            right: 0;
        }
        &:last-child::after {
            display: none;
        }
        &:hover {
            background-color: #f5f7fa;
        }
        > span {
            margin-left: 12px;
            &.menu-name {
                margin-left: 0;
                flex: 1;
                font-size: 16px;
                font-weight: 800;
            }
        }
    }
}



.index {
  height: 100%;
  .cards-group {
    .box-card {
      height: 104px;
    }
  }
  .quick-links-group {
    /deep/.box-card {
      .el-card__body {
        display: flex;
        align-items: center;
        .el-avatar {
          margin-right: 10px;
          background-color: #fff;
        }
        .item-content {
          h2 {
            font-weight: 800;
            margin-bottom: 5px;
          }
          p {
            font-size: 12px;
            color: @color-placeholder;
          }
        }
      }
    }
  }
}

.box-card {
  line-height: 1;
  margin-bottom: 15px;
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      color: @color-primary;
    }
  }
  .sub-text {
    i {
      margin-left: 5px;
    }
  }
  .number {
    font-size: 24px;
    font-weight: 800;
    padding: 5px 0;
  }
  &.bg1 {
    color: #fff;
    /*background-image: linear-gradient(120deg, #3e82ee 0, #00c8ee 100%);*/
    background-color: #8c939d;
  }
  &.bg2 {
    color: #fff;
    /*background-image: linear-gradient(120deg, #6cdeb0 0, #b9f39c 100%);*/
    background-color: #8c939d;
  }
  &.bg3 {
    color: #fff;
    background-image: linear-gradient(120deg, #c77be6 0, #ea9aff 100%);
  }
  &.bg4 {
    color: #fff;
    background-image: linear-gradient(120deg, #fd9e8a 0, #ffecca 100%);
  }
}

</style>
