export default {
    addCart(context,payload){
       return new Promise((resolve,reject) => {

            // 1、查找之前数组中是否有该商品
            let oldProduct = null;
            for(let item of context.state.cartList){
                if(item.iid === payload.iid){
                    oldProduct = item;
                }
            }

            // 2、判断oldProduct
            if(oldProduct){
                // oldProduct.count +=1;
                context.commit('addCounter',oldProduct)
                resolve('当前的商品数量加1');
            }else{
                payload.count = 1;
                context.commit('addToCart',payload)
                resolve('添加新的商品');
            }
        })
    }
}