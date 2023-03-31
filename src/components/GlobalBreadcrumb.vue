<template>
<figure class="global-breadcrumb">
<!--  <el-tag type="success" @click="clickGoHome" effect="dark">首页</el-tag>-->
<!--  <el-tag type="info" effect="plain" closable>科目设置</el-tag>-->
<!--  <el-tag type="info" effect="plain" closable v-for="tag in dynamicTags" :key="tag">{{tag}}</el-tag>-->





    <el-tag  :type="activePath=='/index'?'info':'info'" :effect="activePath=='/index'?'dark':'plain'" @click="clickGoHome('/index')">系统首页</el-tag>
    <el-tag
            v-for="(item,index ) in dynamicTags"
            :key="index"
            :type="item.url==activePath?'info':'info'"
            @click="clickGoHome(item.url)"
            :effect="item.url==activePath?'dark':'plain'"
            @close="handleClose(index)"
            closable
    >{{item.menuName}}</el-tag>

</figure>


</template>

<script>
  import bus from "../plugins/eventBus";
export default {
  name: 'GlobalBreadcrumb',
  data() {
    return {
      effect: 1,
      dynamicTags: new Set(),
      activePath: "",
    }
  },
  mounted() {
    this.activePath= window.sessionStorage.getItem("activePath")?window.sessionStorage.getItem("activePath"):'/index'
    let tabs=JSON.parse(window.sessionStorage.getItem("tabs"))
    this.dynamicTags=tabs?tabs.rows:[];
    var self = this;
    bus.$on("tabsEvent", function () {
      self.activePath = window.sessionStorage.getItem("activePath");
      self.dynamicTags=JSON.parse(window.sessionStorage.getItem("tabs")).rows;
    });
  },
  methods: {
    clickGoHome(path) {
        console.log('123' )
        if (this.$route.path !== path) {
            this.$router.push(path);
        }

      this.activePath = path;
      //bus.$emit("tabsEvent")
      //bus.$emit("menusEvent", this.$route)
        console.log('this.$route' , this.$route)
      this.$emit('update_menu', this.$route)
    },
    handleClose(index) {
      this.dynamicTags.splice(index,1);
      let obj={
        rows:this.dynamicTags
      }
      window.sessionStorage.setItem("tabs",JSON.stringify(obj))
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.global-breadcrumb {
    padding: 12px 15px;
    background-color: #FFF;
    border-bottom: 1px solid @color-border-lighter;
    .el-tag {
        cursor: pointer;
        &+.el-tag {
            margin-left: 10px;
        }
    }
}
</style>
