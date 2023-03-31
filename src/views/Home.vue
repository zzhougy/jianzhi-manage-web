<template>
<main class="home">
  <PageHeader @toggleMenuClick="toggleMenu" />
  <article class="main">
    <el-menu :default-active="activeMenu" class="main-menu-vertical-aside" active-text-color="#FFF" router :unique-opened="true" :collapse="isCollapse">
      <el-menu-item index="/index" style="font-size:16px;">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-document"></i>
          <span>基础数据</span></template>
        <el-menu-item index="/basicData/menus-management" @click="savePath('/basicData/menus-management','权限管理')">权限管理</el-menu-item>
        <el-menu-item index="/basicData/permission" @click="savePath('/basicData/permission','角色管理')">角色管理</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-s-custom"></i>
          <span>人员管理</span></template>
        <el-menu-item index="/basicData/personnel-list" @click="savePath('/basicData/personnel-list','后台人员管理')">后台人员管理</el-menu-item>
        <el-menu-item index="/basicData/jobSeeker" @click="savePath('/basicData/jobSeeker','求职者管理')">求职者管理</el-menu-item>
        <el-menu-item index="/basicData/hrList" @click="savePath('/basicData/hrList','招聘人员管理')">招聘人员管理</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-office-building"></i>
          <span>企业管理</span></template>
        <el-menu-item index="/basicData/recruitmentUnit" @click="savePath('/basicData/recruitmentUnit','企业信息管理')">企业信息管理</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title"><i class="el-icon-suitcase"></i>
          <span>岗位管理</span></template>
        <el-menu-item index="/jobManagement/jobInfo-list" @click="savePath('/jobManagement/jobInfo-list','岗位信息管理')">岗位信息管理</el-menu-item>
        <el-menu-item index="/jobManagement/label-list" @click="savePath('/jobManagement/label-list','岗位标签管理')">岗位标签管理</el-menu-item>
      </el-submenu>



    </el-menu>
    <section class="main-content">
      <GlobalBreadcrumb @update_menu="update_menu"/>
      <router-view id="mainContainer" />
    </section>
  </article>
</main>
</template>

<script>
// @ is an alias to /src
import PageHeader from '@/components/PageHeader.vue'
import GlobalBreadcrumb from '@/components/GlobalBreadcrumb.vue'
import bus from "../plugins/eventBus";

export default {
  name: 'home',
  components: {
    PageHeader,
    GlobalBreadcrumb
  },
  data() {
    return {
      isCollapse: false,
      activeMenu: '',
    };
  },
  methods: {
    toggleMenu(val) {
      this.isCollapse = !this.isCollapse;
      console.log(val);
    },
    savePath(url,menuName) {
      // if( item.url == null ) {
      //   this.$message.error('页面未配置')
      //   this.$router.go(-1)
      //   return;
      // }
      console.log('11111' )
      let item={
        url:url,
        menuName:menuName
      }
      window.sessionStorage.setItem("activePath", item.url);
      let jsonTabs=window.sessionStorage.getItem("tabs")
      let tabs=JSON.parse(jsonTabs)
      if(tabs==null)
        tabs={
          rows:[]
        }
      item.url=='/index'?'':tabs.rows.push(item)
      //去重
      let obj={
        rows:this.unqiueArr(tabs.rows)
      }
      window.sessionStorage.setItem("tabs",JSON.stringify(obj))
      bus.$emit("tabsEvent")
    },
    unqiueArr(arr){
      var tmp = new Set(arr.map(item => JSON.stringify(item)));
      return Array.from(tmp).map(item => JSON.parse(item));
    },
    // active(r){
    //
    // }
    update_menu(r){
      console.log('rrrrrrrrrrrr' , r)
      this.activeMenu = r.path
      //this.$refs.menulist.active(r)
    }
  },
  mounted() {
    console.log(this.$route.name + '加' + this.$route.path)
    this.activeMenu = this.$route.path
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.home {
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-flow: column;
    .main {
        display: flex;
        overflow: hidden;
        flex: 1;
        .main-menu-vertical-aside:not(.el-menu--collapse) {
            width: 240px;
          overflow:scroll;/*zhou左侧菜单栏滚动条*/
        }
    }
    .main-content {
        display: flex;
        flex-flow: column;
        overflow: hidden;
        flex: 1;
    }
    #mainContainer {
        flex: 1;
        /*overflow: hidden;*/
        background-color: @color-body-bg;
      overflow:scroll;/*zhou滚动条*/
    }

}
/deep/.main-menu-vertical-aside {
    .el-submenu__title {
        font-size: 16px;
        &:hover {
            background-color: fade(@color-deep-bg,5%);
        }
    }
    .el-menu-item.is-active,
    .el-menu-item.is-active:focus,
    .el-menu-item.is-active:hover {
        background-color: @color-primary;
    }
    .el-submenu {
        .el-menu-item {
            padding-left: 50px !important;
        }
    }
    .el-submenu.is-opened {
        .el-menu,
        .el-submenu__title {
            background-color: fade(@color-deep-bg,8%);

        }
    }
    .el-menu-item-group {
        .el-menu-item-group__title {
            background-color: rgba(255,255,255,.1);
            opacity: 0.5;
            padding-left: 50px !important;
        }
        .el-menu-item {
            padding-left: 60px !important;
        }
    }
    .el-menu-item:focus,
    .el-menu-item:hover {
        background-color: fade(@color-deep-bg,5%);
    }
}
</style>
