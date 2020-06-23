<template>
  <scroll id="content">
    <div class="menu-list">
      <div class="menu-list-item"
           v-for="(i,index) in categories"
           :class="{active:index==currentIndex}"
           @click="itemClick(index)" :key="index">{{i.title}}
      </div>
    </div>
  </scroll>
</template>

<script>
  import Scroll from "../../../components/common/scroll/Scroll";
  export default {
    name: "TabMenu",
    components:{
      Scroll
    },
    props:{
      categories:{
        type:Array,
        default(){
          return []
        }
      },
    },
    data(){
      return{
        currentIndex:0
      }
    },
    methods:{
      itemClick(index)
      {
        this.currentIndex=index
        this.$emit('selectItem',index)
      }
    }
  }
</script>

<style scoped>
  #content{
    width: 100px;
    height: calc(100% - 44px - 49px);
    background-color: #f6f6f6;
  }
  .menu-list-item{
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
  }
  .menu-list-item.active{
    background-color: #fff;
    color: var(--color-high-text);
    font-weight: 700;
    border-left: 3px solid var(--color-high-text);
  }
</style>
