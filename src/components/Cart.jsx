export default function Cart(props){
  const {quantity = 0, handleBasketShow = Function.prototype} = props
  return(
    <div className="cart #c6ff00 lime accent-3" onClick={handleBasketShow}>
      <i style={{fontSize:"30px"}} class="material-icons">shopping_cart</i>
      {quantity ? <span className="cart-quantity">{quantity}</span> : null}
    </div>
  )
}