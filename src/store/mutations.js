export default {
    // mutations唯一的目的就是修改state中状态
    // mutations中的每个方法完成的事情比较单一一点
    // 方法一
    // addCart(state,payload){
    //     let oldProduct = null;
    //     for(let item of state.cartList){
    //         if(item.iid === payload.iid){
    //             oldProduct = item;
    //         }
    //     }
    //     if(oldProduct){
    //         oldProduct.count += 1;
    //     }else{
    //         payload.count = 1;
    //         state.cartList.push(payload);
    //     }
    // }
    addCounter(state,payload){
        payload.count++;
    },
    addToCart(state,payload){
        payload.checked = true
        state.cartList.push(payload)
    }
}