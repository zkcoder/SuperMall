<template>
  <div class="detail-swiper">
      <swiper class="swiper-top">
          <swiper-item v-for="(item,index) in topImages" :key="index" ref="swiperItem">
              <img :src="item" alt="" @load="imageLoad">
          </swiper-item>
      </swiper>
  </div>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
    name: 'DetailSwiper',
    components: {
        Swiper,
        SwiperItem
    },
    props: {
        topImages: {
            type: Array,
            default(){
                return []
            }
        }
    },
    methods:{
        imageLoad(){
            this.$emit("imageLoad")
        }
    }
}
</script>

<style scoped>
    .swiper-top{
        height: 300px;
    }
</style>