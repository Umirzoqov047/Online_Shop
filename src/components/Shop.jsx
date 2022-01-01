import React, {useState, useEffect} from "react"
import {API_URL, API_KEY} from "../config"
import Loader from "./Loader";
import GoodList from "./GoodList";
import Cart from './Cart';
import BasketList from "./BasketList";
import { toast } from "react-toastify";


export default function Shop(){
  const [goods, setGoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);
  const [isBasketShow, setIsBasketShow] = useState(false)

  const addToBasket = (item)=> {
    
    const itemIndex = order.findIndex(orderItem => orderItem.id === item.id);
    if(itemIndex < 0){
      const newItem = {
        ...item,
        quantity: 1
      }
      setOrder([...order, newItem])
    }else{
      const newOrder = order.map((orderItem, index) => {
        if(index === itemIndex){
          return{
            ...orderItem,
            quantity: orderItem.quantity + 1
          }            
        }else{
          return item
        }
      })
      setOrder(newOrder);
    }
    toast.success("Add to Basket Successfuly!")
  }
  const handleBasketShow = () => {
    setIsBasketShow(!isBasketShow)
  }
  const removeFromBasket = (itemId)=>{
    const newOrder = order.filter(item => item.id !== itemId)
    toast.error("Remove To Basket!")
    setOrder(newOrder);
  }
  const incrementQuantity = (itemId) => {
    const newOrder2 = order.map(el => {
      if(el.id === itemId){
        const newQuantity = el.quantity + 1
        return {
          ...el,
          quantity: newQuantity
        }
      }else{
        return el
      }
    })
    toast.success("New toy add !")
    setOrder(newOrder2)
  }
  const decrementQuantity = (itemId) => {
    const newOrder2 = order.map(el => {
      if(el.id === itemId){
        const newQuantity = el.quantity - 1
        return {
          ...el,
          quantity: newQuantity >= 0 ? newQuantity : 0
        }
      }else{
        return el
      }
    })
    toast.info("Remove toy")
    setOrder(newOrder2)
  }
   
  useEffect (() => {
    fetch(API_URL, {
      headers:{
        Authorization: API_KEY,
      }
    }).then(response => response.json())
    .then(data => {
      data.featured && setGoods(data.featured);
      setLoading(false);
    })
  },[])

  return(
    <div className="container content">
      <Cart quantity={order.length} handleBasketShow={handleBasketShow} />
      {loading ? <Loader /> : <GoodList goods={goods} addToBasket={addToBasket} />}
      {isBasketShow && <BasketList handleBasketShow={handleBasketShow} order={order} removeFromBasket={removeFromBasket} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity}/>}
    </div>
  )
}