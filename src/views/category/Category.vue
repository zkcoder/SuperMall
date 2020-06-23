<template>
  <div id="category">
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="content">
      <tab-menu :categories="categories" @selectItem="selectItem"></tab-menu>

      <scroll id="tab-content" ref="scroll" :probe-type="3" @scroll="contentScroll">
        <tab-control :titles="['综合','新品','销量',]" @tabClick="tabClick"></tab-control>
        <tab-content-category :sub-category="showSubCategory"></tab-content-category>
       
        <!-- <goods-list :goods="showCategoryDetail"></goods-list> -->
        
      </scroll>
      <back-top @click.native="backTop" v-show="isShowBackTop"/>
    </div>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import TabMenu from "./childComps/TabMenu";
  import TabContentCategory from "./childComps/TabContentCategory";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList"; 

  import Scroll from "components/common/scroll/Scroll";

  import {getCategory,getSubCategory,getCategoryDetail} from "network/category";

  import {itemListenerMixin,backTopMixin} from "common/mixin";

  export default {
    name: "Category",
    components:{
      NavBar,
      TabMenu,
      TabContentCategory,
      TabControl,
      GoodsList,
      Scroll
    },
    mixins:[itemListenerMixin,backTopMixin],
    created(){
      this.getCategory()
      // console.log(this.getCategory)
    },
    mounted(){

    },
    activated(){
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0,this.saveY,0)
    },
    beforeRouteLeave(to,from,next)
    {
      this.saveY=this.$refs.scroll.scroll.y;
      next()
    },
    data(){
      return{
        categories:[],
        categoryData:{},
        currentIndex:-1,
        currentType:'pop',
        saveY:0
      }
    },
    computed:{
      showSubCategory()
      {
        if (this.currentIndex==-1)return[]
        return this.categoryData[this.currentIndex].subCategory
      },
      showCategoryDetail()
      {
        if (this.currentIndex===-1)return[]
        return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
    },
    methods:{
      getCategory()
      {
        getCategory().then(res =>
        {
          this.categories=res.data.category.list
          for (let i in this.categories)
          {
            this.categoryData[i]={
              subCategory:[],
              categoryDetail:{
                'pop':[],
                'new':[],
                'sell':[]
              }
            }
          }
          this.getSubCategory(0)
        })
      },
      getSubCategory(index)
      {
        this.currentIndex=index
        const maitKey=this.categories[index].maitKey
        getSubCategory(maitKey).then(res =>
        {
          this.categoryData[index].subCategory=res.data.list
          this.categoryData={...this.categoryData}
        })
        this.getCategoryDetail('pop')
        this.getCategoryDetail('new')
        this.getCategoryDetail('sell')
      },
      getCategoryDetail(type)
      {
        const miniWallkey=this.categories[this.currentIndex].miniWallkey
        getCategoryDetail(miniWallkey,type).then(res =>
        {
          this.categoryData[this.currentIndex].categoryDetail[type]=res
          this.categoryData={...this.categoryData}
        })
      },
      selectItem(index)
      {
        this.getSubCategory(index)
      },
      tabClick(index)
      {
        switch (index) {
          case 0:this.currentType='pop'
            break
          case 1:this.currentType='new'
            break
          case 2:this.currentType='sell'
        }
      },
      contentScroll(position)
      {
        this.isShowBackTop=-(position.y) > 500


      }
    }
  }
</script>

<style scoped>
  #tab-content{
    height: calc(100% - 44px - 49px);
    width: 100%;
    background-color: #fff;
  }
  .nav-bar{
    position: relative;
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
    z-index: 9;
  }
  .content{
    display: flex;
    height: 100vh;
    width: 100%;
  }
</style>
