<template>
  <div id="profile">
    <nav-bar class="nav-bar"><div slot="center">supermall</div></nav-bar>
    <user-info></user-info>

    <section class="account">
      <div class="account-item">
        <div class="number">
          <span class="balance">0.00</span>元
        </div>
        <div class="info">我的余额</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>个
        </div>
        <div class="info">我的优惠</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>分
        </div>
        <div class="info">我的积分</div>
      </div>
    </section>
    <list-view :list-data="orderList" class="orderList"></list-view>
    <list-view :list-data="serviceList" class="serviceList"></list-view>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import UserInfo from "./childComps/UserInfo";
  import ListView from "./childComps/ListView";
  import TabControl from 'components/content/tabControl/TabControl.vue'
  import axios from 'axios'
  export default {
    name: "Profile",
    components:{
      NavBar,
      UserInfo,
      ListView,
      TabControl
    },
    created(){
      if (sessionStorage.getItem('uid')){
        axios({
          url:"http://152.136.185.210:8000/api/n3/supermall/public/admin/index/user",
          data:{
            uid:sessionStorage.getItem('uid')
          },
          method:"post"
        }).then(res =>{
          console.log(res);
        })
      }else {
        this.$router.replace('/login')
        console.log('aaa')
      }

    },
    data(){
      return {
        orderList: [
          {icon: '#order', iconColor: '#ff8198', info: '我的消息'},
          {icon: '#point', iconColor: '#fc7b53', info: '积分商城'},
          {icon: '#vip', iconColor: '#ffc636', info: '会员卡'},
        ],
        serviceList: [
          {icon: '#service', iconColor: '#ff8198', info: '我的购物车'},
          {icon: '#download', iconColor: '#ff8198', info: '下载购物APP'},
        ]
      }
    }
  }
</script>

<style scoped>
  #profile{
    background-color: #f2f2f2;
  }
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }
  .account{
    display: flex;
  }
  .account-item{
    flex: 1;
    text-align: center;
    padding: 18px;
    margin-right: 2px;
    background-color: #fff;
  }
  .number{
    font-size: 14px;
  }
  .balance{
    font-size: 24px;
    font-weight: 700;
    color: #ff5f3e;
  }
  .info{
    margin-top: 6px;
    font-size: 14px;
  }
  .orderList,.serviceList{
    margin-top: 12px;
  }
</style>
