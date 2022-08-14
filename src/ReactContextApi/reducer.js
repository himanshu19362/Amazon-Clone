export const initialState = {
    cart : [] ,
    user : null 
}

export const getPrice = (cart)=>{
   let sum = 0
   for(let i = 0 ; i < cart.length ; i++){
     sum += cart[i].price
   }
   return sum
}
export const reducer = (state , action) => {
    switch(action.type){
        case 'ADD_TO_CART':
            return {
                ...state , 
                cart : [...state.cart , action.item]
            }
        case 'REMOVE_FROM_CART':
            let index = -1;
            for(let i = 0 ; i < state.cart.length ; i++){
                if(state.cart[i].id === action.id){
                    index = i;
                    break;
                }
            }
            let newCart = [...state.cart]
            if(index === -1)    console.log('This element is not present in Cart')
            else{
                newCart.splice(index , 1)
            }
            return {
                ...state , 
                cart : newCart
            }
        case 'SET_USER':
            return {
                ...state , 
                user: action.user
            }
        case 'EMPTY_CART':
            return {
                ...state , 
                cart: [] 
            }
        default:
            return state
    }
}