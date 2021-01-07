import {ProductsContext,CartContext} from './context'

function ProductsCon(props){
    return(
        <ProductsContext.Provider value={{}}>
            {props.children}
        </ProductsContext.Provider>
    )
}
function CartCon(props){
    return(
        <CartContext.Provider value={[]}>
            {props.children}
        </CartContext.Provider>
    )
}

export {ProductsCon,CartCon}