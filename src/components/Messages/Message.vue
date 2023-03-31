<template>
<section class="message">
  <el-page-header @back="goBack" :content="pageName"></el-page-header>
  <el-tabs tab-position="left" v-model="activeName" @tab-click="tabClick" class="main-tabs">
    <el-tab-pane label="个人资料" name="first">个人资料</el-tab-pane>
    <el-tab-pane label="设置" name="second">设置</el-tab-pane>
    <el-tab-pane label="消息管理" name="third">
      <el-tabs v-model="activeName2" type="card" class="tabs-sub">
        <el-tab-pane label="全部通知" name="first">
          <!-- start 消息列表 -->
          <ul class="message-list">
            <li v-for="item in 3" :key="item" class="no-read">
              <span class="message-type-icon"><img src="../../static/images/icon_message_order.png" alt="订单通知"></span>
              <div class="message-content">
                <h3>[订单通知]</h3>
                <p>您有一条来自报价员【张三丰】创建的订单，订单编号：<router-link to="/order-management/order-list">TC-ABB202010161534</router-link>，订单创建时间：2020年10月16日 下午15:21:44
                </p>
              </div>
            </li>
            <li class="has-read" v-for="item in 2" :key="item">
              <span class="message-type-icon"><img src="../../static/images/icon_message_system.png" alt="系统消息"></span>
              <div class="message-content">
                <h3>[系统消息]</h3>
                <p>您有一条来自报价员【张三丰】创建的订单，订单编号：<router-link to="/order-management/order-list">TC-ABB202010161534</router-link>，订单创建时间：2020年10月16日 下午15:21:44
                </p>
              </div>
            </li>
            <li class="has-read" v-for="item in 4" :key="item">
              <span class="message-type-icon"><img src="../../static/images/icon_message_finance.png" alt="财务通知"></span>
              <div class="message-content">
                <h3>[财务通知]</h3>
                <p>您有一条来自报价员【张三丰】创建的订单，订单编号：<router-link to="/order-management/order-list">TC-ABB202010161534</router-link>，订单创建时间：2020年10月16日 下午15:21:44
                </p>
              </div>
            </li>
            <li class="has-read" v-for="item in 2" :key="item">
              <span class="message-type-icon"><img src="../../static/images/icon_message_stock.png" alt="库管通知"></span>
              <div class="message-content">
                <h3>[库管通知]</h3>
                <p>您有一条来自报价员【张三丰】创建的订单，订单编号：<router-link to="/order-management/order-list">TC-ABB202010161534</router-link>，订单创建时间：2020年10月16日 下午15:21:44
                </p>
              </div>
            </li>
          </ul>
          <!-- end 消息列表 -->
          <!-- start 分页 -->
          <el-pagination background layout="prev, pager, next" :total="1000">
          </el-pagination>
          <!-- end 分页 -->
        </el-tab-pane>
        <el-tab-pane label="订单通知" name="second">订单通知</el-tab-pane>
        <el-tab-pane label="系统消息" name="third">系统消息</el-tab-pane>
        <el-tab-pane label="财务通知" name="fourth">财务通知</el-tab-pane>
        <el-tab-pane label="库管消息" name="five">库管消息</el-tab-pane>
      </el-tabs>
    </el-tab-pane>
  </el-tabs>
</section>
</template>

<script>
export default {
  name: 'Message',
  data() {
    return {
      activeName: 'third',
      activeName2: 'first',
      pageName: '消息管理'
    }
  },
  methods: {
    goBack() {
      this.$router.back(-1)
    },
    tabClick(tab, event) {
      // console.log(tab, event);
      console.log(tab.label, event);
      this.pageName = tab.label
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.message {
    // padding: 16px;

    flex-flow: column;
    display: flex;
    overflow: hidden;
    /deep/.main-tabs {
        flex: 1;
        display: flex;
        .el-tabs__header.is-left {
            width: 260px;
            margin-right: 0;
            background-color: #FFF;
            .el-tabs__nav-wrap.is-left {
                height: 100%;
            }
        }
        > .el-tabs__content {
            flex: 1;
            overflow-y: auto;
            > .el-tab-pane {
                background-color: #FFF;
                padding: 16px;
                overflow: hidden;
            }
            .el-tabs--top {}

        }
    }
    .message-list {
        list-style: none;
        > li {
            display: flex;
            align-items: center;
            margin-bottom: 16px;
            padding: 16px;
            border-radius: 4px;
            transition: all 0.2s;
            border-bottom: 1px dashed @color-border-lighter;
            &:hover {
                background-color: @color-body-bg;
            }
            .message-type-icon {
                width: 48px;
                height: 48px;
                overflow: hidden;
                margin-right: 16px;
                > img {
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
            .message-content {
                > h3 {
                    font-size: 16px;
                    margin-bottom: 5px;
                }

            }
            &.no-read {
                background-color: fade(@color-warning,5%);
                .message-content {
                    > h3 {
                        font-weight: 800;
                    }
                    > p {
                        opacity: 1;
                    }
                }
            }
            &.has-read {
                .message-content {
                    > h3 {
                        font-weight: lighter;
                    }
                    > p {
                        opacity: 0.6;
                    }
                }
            }
        }
    }
}
</style>
