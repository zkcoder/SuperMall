<template>
  <div class="content-category">
    <div class="content-item" v-for="(i,index) in subCategory" :key="index">
      <a :href="i.link">
        <img class="item-img" :src="i.image" alt="" @load="imgLoad">
        <div class="item-text">{{i.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabContentCategory",
    props:{
      subCategory:{
        type:Array,
        default(){
          return []
        }
      }
    },
    methods:{
      imgLoad()
      {
        this.$bus.$emit('itemImageLoad')
      }
    }
  }
</script>

<style scoped>
  .content-category{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    padding: 10px 0 20px 10px;
    /*justify-content: space-around;*/
  }
  .content-item{
    width: 33%;
    text-align: center;
    font-size: 12px;
  }
  .item-img{
    width: 70%;
    margin-top: 10px;
  }
  .item-text{
    margin-top: 10px;
  }
</style>
