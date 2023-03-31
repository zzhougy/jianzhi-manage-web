<template>
<header class="header">
  <a class="btn-header-menu" @click="toggleMenuClick"><i class="el-icon-s-unfold"></i></a>
<!--  <h1 class="logo" @click="linkToHome">-->
<!--    <img src="../static/images/logo.png" alt="">-->
<!--  </h1>-->
    <h1 style=" margin-right: 20px;
        display: flex;
        align-items: center;
        cursor: pointer;" @click="linkToHome">
      兼职平台后台管理
    </h1>
<!--  <div class="location">广州新塘店<el-dropdown>-->
<!--      <span class="el-dropdown-link">-->
<!--        切换<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
<!--      </span>-->
<!--      <el-dropdown-menu slot="dropdown">-->
<!--        <el-dropdown-item>广州越秀店</el-dropdown-item>-->
<!--        <el-dropdown-item>广州新塘店</el-dropdown-item>-->
<!--        <el-dropdown-item>广州增城店</el-dropdown-item>-->
<!--        <el-dropdown-item divided>深圳福田店</el-dropdown-item>-->
<!--        <el-dropdown-item>深圳南山店</el-dropdown-item>-->
<!--      </el-dropdown-menu>-->
<!--    </el-dropdown>-->
<!--  </div>-->
  <div class="user-status">
<!--    <span>您好！管理员</span>-->
    <el-dropdown title="切换角色">
<!--      <span class="el-dropdown-link">-->
<!--        超级管理员<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
<!--      </span>-->
<!--      <el-dropdown-menu slot="dropdown">-->
<!--        <el-dropdown-item>超级管理员</el-dropdown-item>-->
<!--        <el-dropdown-item divided>财务</el-dropdown-item>-->
<!--        <el-dropdown-item>报价员</el-dropdown-item>-->
<!--        <el-dropdown-item>业务员</el-dropdown-item>-->
<!--        <el-dropdown-item divided>生产主管</el-dropdown-item>-->
<!--        <el-dropdown-item>工程师</el-dropdown-item>-->
<!--        <el-dropdown-item divided>送货员</el-dropdown-item>-->
<!--        <el-dropdown-item>工序员工</el-dropdown-item>-->
<!--      </el-dropdown-menu>-->
    </el-dropdown>
<!--    <el-badge :value="3" :max="10" style="margin-left:24px;">-->
<!--      <el-button type="text" @click="clickToMessage">消息</el-button>-->
<!--    </el-badge>-->
<!--    <el-button type="text" style="margin-left:24px;" @click="clickToMessage">设置</el-button>-->
    普通管理员
    <el-button type="info" style="margin-left:24px;" @click="clickLogout">退出</el-button>
  </div>
</header>
</template>

<script>
// import { config } from 'vue/types/umd';
export default {
  name: 'PageHeader',
  data() {
    return {
      user: "我当前的身份是超级管理员", //将当前的用户身份传递给菜单那边，这样因为身份的不同就会显示不同的菜单内容
    }
  },
  methods: {
    linkToHome() {
      this.$router.push('/');
    },
    clickToMessage() {
      this.$router.push('/messages/message');
    },
    toggleMenuClick() {
      this.$emit('toggleMenuClick', this.user)
    },
    async clickLogout() {
      let res = await this.$confirm("此操作将退出系统, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      });
      if (res == "confirm") {
        window.sessionStorage.clear();
        this.$router.push("/login");
      }
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.header {
    padding: 0 20px;
    display: flex;
    align-items: center;
    box-shadow: 0 1px 15px rgba(0, 0, 0, .10);
    position: relative;
    z-index: 500;
    height: 55px;
    .btn-header-menu {
        font-size: 24px;
        margin-left: -20px;
        margin-right: 16px;
        padding: 0 20px;
        height: 55px;
        display: flex;
        align-items: center;
        overflow: hidden;
        transition: all 0.15s;
        cursor: pointer;
        &:hover {
            background-color: @color-primary;
            color: #FFF;
        }
    }
    .logo {
        margin-right: 20px;
        display: flex;
        align-items: center;
        cursor: pointer;
    }
    .location {
        margin-right: 20px;
        .el-dropdown-link {
            color: @color-primary;
            margin-left: 16px;
            cursor: pointer;
            &::before {
                content: "[";
            }
            &::after {
                content: "]";
            }
        }
    }
    .user-status {
        margin-left: auto;
        .el-dropdown-link {
            color: @color-primary;
            margin-left: 16px;
            cursor: pointer;
            &::before {
                content: "[";
            }
            &::after {
                content: "]";
            }
        }
    }
}
</style>
