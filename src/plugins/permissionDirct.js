export const hasPermission = {
    install (Vue) {
      Vue.directive('hasPermission', {
        bind (el, binding, vnode) {
          var flag=false;//默认不显示
          console.log('vnode.context.$store.state' ,vnode.context.$store.state )
          let userInfo = vnode.context.$store.state.config.userInfo;
          var value=binding.value;
          console.log('userInfo444444444' , userInfo)
          if(userInfo.isAdmin){
            //如果是超级管理员
            flag=true;
            console.log('3333'  )
          }else if(userInfo.perms.indexOf(value)!=-1){
            //如果有该权限按钮显示
            flag=true;
            console.log('22222'  )

          }
          if (!flag) {
            // if (!el.parentNode) {
            //   el.style.display = 'none'
            // } else {
            //   el.parentNode.removeChild(el);
            // }
            el.setAttribute("disabled",true);
            el.classList.add("is-disabled");
            console.log('331111133'  )

          }
        }
      })
    }
  }

export const hasRolePermission = {
    install (Vue) {
      Vue.directive('hasRolePermission', {
        bind (el, binding, vnode) {
          var flag=false;//默认不显示
          let userInfo = vnode.context.$store.state.config.userInfo;
          var value=binding.value;
          if(userInfo.isAdmin){
            //如果是超级管理员
            flag=true;
          }else if(userInfo.perms.indexOf(value.perm)!=-1&&userInfo.roleIds.indexOf(value.role)!==-1){
            //如果有该权限按钮显示
            flag=true;
          }
          if (!flag) {
            // if (!el.parentNode) {
            //   el.style.display = 'none'
            // } else {
            //   el.parentNode.removeChild(el);
            // }
            el.setAttribute("disabled",true);
            el.classList.add("is-disabled");
          }
        }
      })
    }
  }
export const hasRole={
  install (Vue) {
    Vue.directive('hasRole', {
      bind (el, binding, vnode) {
        var flag=false;//默认不显示
        let userInfo = vnode.context.$store.state.config.userInfo;
        var value=binding.value;
        if(userInfo.isAdmin){
          //如果是超级管理员
          flag=true;
        }else if(userInfo.roleIds.indexOf(value)!=-1){
          //如果有该橘色按钮显示
          flag=true;
        }
        if (!flag) {
          // if (!el.parentNode) {
          //   el.style.display = 'none'
          // } else {
          //   el.parentNode.removeChild(el);
          // }
          el.setAttribute("disabled",true);
          el.classList.add("is-disabled");
        }
      }
    })
  }
}
