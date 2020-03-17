 import List from '..\\src\\pages\\list.lugiad';  import Adduser from '..\\src\\pages\\addUser.lugiad'; 
  export default [
        {
          value: '/list',
          text: '用户列表',
          icon: 'lugia-icon-financial_editor',
          component: List,
         },
       
        {
          value: '/addUser',
          text: '新增用户',
          icon: 'lugia-icon-financial_editor',
          component: Adduser,
         },
       ]