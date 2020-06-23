<template>
  <div class="bottom-bar">
      <div class="checkAll">
          <check-button class="check-btn" 
            :is-checked="isSelectAll"
            @click.native="checkClick"></check-button>
          <span>全选</span>
      </div>
      <div class="price">
          合计：{{totalPrice}}
      </div>
      <div class="calculate" @click="calcClick">
          去计算: {{checkLength}}
      </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

import {mapGetters} from 'vuex'
export default {
    name: 'CartBottomBar',
    components: {
        CheckButton
    },
    computed: {
        ...mapGetters(['totalPrice','checkLength','cartList']),
        isSelectAll(){
          if(this.cartList.length === 0) return false;
          return !this.cartList.find(item => !item.checked)
        }
    },
    methods: {
      checkClick(){
       if(this.isSelectAll){
         this.cartList.forEach(item => item.checked =  false);
       }
       else{
         this.cartList.forEach(item => item.checked = true);
       }
      },
      calcClick(){
        if(!this.cartList.find(item => item.checked)){
          this.$toast.show('请先选择商品');
        }
      }
    }
}
</script>

<style scoped>
  .bottom-bar{
    position: relative;
    background-color: #eee;
    height: 40px;
    display: flex;
    line-height: 40px;
    font-size: 14px;
  }
  .checkAll{
    display: flex;
    align-items: center;
    width: 60px;
    margin-left: 5%;
  }
  .check-btn{
    width: 20px;
    height: 20px;
    line-height: 20px;
  }
  .price{
    flex: 1;
    text-align: center;
  }
  .calculate{
    width: 80px;
    background-color: hotpink;
    color: #fff;
    border-radius: 50px;
    text-align: center;
    margin-right: 2%;
  }
</style>