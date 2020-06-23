export default {
    cartLength(state){
        return state.cartList.length;
    },
    cartList(state){
        return state.cartList
    },
    totalPrice(state){
        return '￥'+ state.cartList.filter(item => {
        return item.checked
        }).reduce((preValue,item) => {
        return preValue + item.price * item.count
        },0).toFixed(2)
    },
    checkLength(state){
    return state.cartList.filter(i => i.checked).length
    }
}