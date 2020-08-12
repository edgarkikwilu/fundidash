import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Dashboard from '@/components/Dashboard'

import Services from '@/components/services/Services'
import CreateService from '@/components/services/create'
import EditService from '@/components/services/edit'

import Companies from '@/components/company/index'
import CreateCompany from '@/components/company/create'
import EditCompany from '@/components/company/edit'

import Fundis from '@/components/fundi/index'
import FundiCreate from '@/components/fundi/create'
import FundiEdit from '@/components/fundi/edit'

import Login from '@/components/auth/Login'
import ResetPassword from '@/components/auth/resetPassword'

Vue.use(Router);

 var router = new Router({
  routes: [
    {
      path:'/',
      name:'home',
      component:Home,
      children:[
        {
          path:'/fundis',
          name:'fundis',
          component:Fundis
        },
        {
          path:'/fundi/create',
          name:'fundiCreate',
          component:FundiCreate
        },
        {
          path:'/fundi/edit',
          name:'fundiEdit',
          component:FundiEdit,
          props:(fundi)=>({fundi:fundi})
        },
        {
          path:'/services',
          name:"services",
          component:Services
        },
        {
          path:'/services/new',
          name:'create_service',
          component:CreateService
        },
        {
          path:'/services/edit',
          name:'edit_service',
          component:EditService
        },
        {
          path:'/companies',
          name:'companies',
          component:Companies
        },
        {
          path:'/companies/new',
          name:'create_company',
          component:CreateCompany
        },
        {
          path:'/company/edit',
          name:'edit_company',
          component:EditCompany,
          props:(company)=>({
            company:company
          })
        },
        {
          path:'index',
          name:"dashboard",
          component: Dashboard
        },
        {
          path:'',
          name:"dashboard",
          component: Dashboard
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/reset',
      name: 'resetpassword',
      component: ResetPassword
    }
  ]
});

router.beforeEach((to, from, next) => {
  console.log("ISAuth>> "+!localStorage.isAuth)
  console.log("ISAuth>> "+(localStorage.isAuth=='false'))
  console.log((to.name !== 'login'))
  if(to.name === 'resetPassword'){
    next()
  }
  else if (to.name !== 'login' && localStorage.isAuth=='false'){
    next({ name: 'login' })
  }else next()
})

export default router;