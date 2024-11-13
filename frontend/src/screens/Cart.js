import React from 'react'
import { useCart, useDispatchCart } from '../components/ContextReducer';
import { useTotalPrice } from '../components/TotalPriceContext';
import axios from 'axios'
export default function Cart() {
  let data = useCart();
  const { totalPrice, setTotalPrice } = useTotalPrice();

  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <div className='m-4 w-100 text-center fs-3 ' style={{ 'color': "white" }}><h2>The Cart is Empty!</h2></div>
      </div>
    )
  }
  const handleRemove = (index) => {
    console.log(index)
    dispatch({ type: "REMOVE", index: index })
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    const copy=data
    localStorage.setItem('orderdata',copy)
    console.log(data)
    // const ress=await fetch(`https://munchmate-deploy-backend.onrender.com/api//getnameinfo?email=${userEmail}`)
    // console.log("response is ")
    // console.log(ress)

    const dataa = {
      name: "Person1",
      mobileNumber: 1234567890,
      amount: totalPrice,
    }
    try {
      

      
      const response = await axios.post('http://localhost:5000/payment/create-order', dataa)
      console.log(data, localStorage.getItem("userEmail"), new Date())
      
      window.location.href = response.data.url
      let response1 = await fetch("http://localhost:5000/api/orderData", {
        // credentials: 'include',
        // Origin:"http://localhost:3000/login",
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString()
        })
      });
      console.log("JSON RESPONSE:::::", response1.status)
      if (response1.status === 200) {
        dispatch({ type: "DROP" })
      }
      

      


    } catch (error) {
      console.log("error in payment", error)
    }













  }
  setTotalPrice(data.reduce((total, food) => total + food.price, 0))
  return (
    <div>

      {console.log(data)}
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md table_container' style={{ color: "white" }}>
        <table className='table table-hover '>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody style={{ color: "white" }}>
            {data.map((food, index) => (
              <tr className='tablerow'>
                <th scope='row' >{index + 1}   </th>
                <td  >{food.name}</td>
                <td >{food.qty}</td>
                <td >{food.size}</td>
                <td >{food.price}</td>
                <td  > <button style={{ 'colord': "red", "borderRadius": "15px" }} onClick={() => { dispatch({ type: "REMOVE", index: index }) }} >remove</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5 ' onClick={handleCheckOut}> Check Out </button>
        </div>
      </div>



    </div>
  )
}
