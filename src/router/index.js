import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '/',
        component: () => import ('../components/Index.vue')
      },{
        path: '/index',
        component: () => import ('../components/Index.vue')
      },
      {
        path: '/messages/message', //消息
        component: () => import ('../components/Messages/Message.vue')
      },   {
        path: '/basicData/personnel-list', //基础数据：人员管理
        component: () => import ('../components/basicData/PersonnelList.vue')
      }, {
        path: '/basicData/permission-list', //基础数据：角色管理
        component: () => import ('../components/basicData/PermissionList.vue')
      },


        // ------start--------岗位管理-----------------------------------------------
      {
        path: '/jobManagement/jobInfo-list', //岗位管理：岗位信息管理
        component: () => import ('../components/JobManagement/JobInfoList.vue')
      },
      {
        path: '/jobManagement/label-list', //岗位管理：标签管理
        component: () => import ('../components/JobManagement/JobLabelList.vue')
      },
      // ------end--------岗位管理-----------------------------------------------




      {
        path: '/basicData/menus-management',
        name: 'menusManagement',
        component: () => import('../components/basicData/menusManagement.vue'), //#####基础数据维护：权限设置
      },
      {
        path: '/basicData/permission',
        name: 'Permission',
        component: () => import('../components/basicData/Permission.vue'), //#####基础数据维护：权限设置
      },
        {
        path: '/basicData/jobSeeker', //基础数据：求职者管理
        component: () => import ('../components/basicData/JobSeekerList.vue')
      }, {
        path: '/basicData/recruitmentUnit', //基础数据：招聘单位管理
        component: () => import ('../components/basicData/RecruitmentUnitList.vue')
      },{
        path: '/basicData/hrList', //基础数据：招聘人员管理
        component: () => import ('../components/basicData/HrList.vue')
      },
    ]
  }, {
    path: '/login',
    name: 'login',
    component: () => import ('../views/Login.vue')
  }
]

const router = new VueRouter({mode: 'history', routes})

export default router
