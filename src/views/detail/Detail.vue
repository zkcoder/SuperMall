<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" 
      ref="scroll"
      @scroll="contentScroll"  
      :probe-type="3">
        <!-- <ul>
          <li v-for="(item,index) in $store.state.cartList" :key="index">{{item}}</li>
        </ul> -->
        <detail-swiper :top-images="topImages" @imageLoad="imageLoad"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :images-info="detailInfo" @imgLoad="imageLoad"></detail-goods-info>
        <detail-param-info ref="param" :paramInfo="paramInfo"></detail-param-info>
        <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
        <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'
// import Toast from 'components/common/toast/Toast'

import {getDetail,Goods,Shop,GoodsParam,getRecommed} from 'network/detail'

import {debounce} from 'common/utils'
import {itemListenerMixin,backTopMixin} from 'common/mixin'

import {mapActions} from 'vuex'
export default {
    name: 'Detail',
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        DetailBottomBar,
        Scroll,
        GoodsList,
    },
    mixins: [itemListenerMixin,backTopMixin],
    data(){
        return {
            iid: null,
            topImages: [],
            goods:{},
            shop: {},
            detailInfo: {},
            paramInfo: {},
            commentInfo: {},
            recommends:[],
            themeTopYs: [] ,
            getThemeTopYs: null,
            currentIndex: 0,
            isShowBackTop: false
        }
    },
    created(){
        // 1、保存传入的iid
        this.iid = this.$route.params.iid

        // 2、根据iid请求详情数据
        getDetail(this.iid).then(res => {
        //    1、获取顶部的图片
            // console.log(res);
            const data = res.result;
            this.topImages = data.itemInfo.topImages;
            // 2、获取商品信息
            this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
            // console.log(this.goods);

            // 3、创建店铺信息
            this.shop = new Shop(data.shopInfo)
            // 4、保存商品的详情数据
            this.detailInfo = data.detailInfo;
            // 5、获取参数信息
            this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

            // 6、取出评论信息
            if(data.rate.cRate !== 0){
                this.commentInfo = data.rate.list[0]
            }
            // 7、请求推荐数据
            getRecommed().then(res => {
                // console.log(res)
                this.recommends = res.data.list
            })
            this.$nextTick(() => {
              // 根据最新的数据，对应的Dom是已经被渲染出来了，但是图片依然没有加载完
            })
            // console.log(this.$refs.param.$el.offsetTop);
            // 使用防抖函数，减少更新次数
            this.getThemeTopYs = debounce(() => {
              this.themeTopYs = [];
              this.themeTopYs.push(0)
              this.themeTopYs.push(this.$refs.param.$el.offsetTop);
              this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
              this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
              // console.log(this.themeTopYs);
            },300)
        })
    },
    destroyed(){
      this.$bus.$off('itemImageLoad',this.detailItemListener)
    },
    methods: {
        ...mapActions(['addCart']),
        imageLoad(){
            this.$refs.scroll.refresh();
            this.getThemeTopYs();
        },
        titleClick(index){
          // console.log(index);
          this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],300);
        },
        contentScroll(position){
          // 1、获取y值
          // console.log(position.y)
          const positionY = -position.y
          this.isShowBackTop = -(position.y) > 1000
          // 2、positionY与主题中值进行对比
          // 主题中的值：[ 0, 6604, 7532, 7748 ]
          // 0-6604 index=0；
          // 6604-7532 ，index=1
          // 。。。。
          var length = this.themeTopYs.length
          for(var i=0; i<length; i++){
            if(this.currentIndex !== i && ((i<length - 1 && positionY >= this.themeTopYs[i] 
            && positionY < this.themeTopYs[i+1]) || (i === length-1 && positionY >= this.themeTopYs[i] )))
              this.currentIndex = i;
              this.$refs.nav.currentIndex = this.currentIndex;;
          }
        },
        addToCart(){
          // 1、获取购物车需要展示的信息
          const product = {}
          product.image = this.topImages[0];
          product.title = this.goods.title;
          product.desc = this.goods.desc;
          product.price = this.goods.realPrice;
          product.iid = this.iid;

          // 2、将商品添加到购物车
        //   this.$store.dispatch('addCart',product).then(res => {
        //     console.log(res)
        //   });
        this.addCart(product).then(res => {
          // this.show = true;
          // this.message = res;
          // setTimeout(() => {
          //   this.show = false;
          //   this.message = '';
          // }, 1500);
          this.$toast.show(res)
        })
        }
    }
}
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content{
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 49px;
    background-color: #fff;
  }
</style>