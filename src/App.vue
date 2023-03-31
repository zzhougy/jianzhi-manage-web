<template>
<router-view id="app" />
</template>

<script>
export default {
  name: 'app',
  created () {
    // --------start 解决vue刷新页面以后丢失store的数据--------------------------------------------
    // 在页面加载时读取sessionStorage
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
      sessionStorage.removeItem('store');
    }
    // 在页面刷新时将store保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
    // --------end 解决vue刷新页面以后丢失store的数据，--------------------------------------------
  }
}
</script>

<style lang="less">
#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
//解决table表格 表头与内容列不对齐问题
.el-table th.gutter{
  display: table-cell!important;
}
</style>
