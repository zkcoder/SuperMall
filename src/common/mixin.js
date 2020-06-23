import {debounce} from './utils';
import BackTop from 'components/content/backTop/BackTop';
export const itemListenerMixin = {
    data(){
        return {
            itemListener: null
        }
    },
    mounted(){
      const refresh = debounce(this.$refs.scroll.refresh,200);
      this.itemListener = () => {
        refresh();
      }
      this.$bus.$on('itemImageLoad',this.itemListener);
      // console.log('我是混入的内容');
    }
}

export const backTopMixin = {
  data(){
   return{
    isShowBackTop: false
   }
  },
  components: {
    BackTop
  },
  methods: {
    backTop(){
      this.$refs.scroll.scrollTo(0,0)
    }
  }
}