import React from 'react'
import { useDispatchCart, useCart } from './ContextReducer'
import { useState,useRef,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Card = (props) => {
    let options = props.options;
    let priceOptions = Object.keys(options);
    let navigate = useNavigate();
    let data = useCart();
    const [qty, setQty] = useState(1)
    const [size, setSize] = useState("")
    const priceRef = useRef();
    const dispatch = useDispatchCart();
    const handleClick = () => {
        if (!localStorage.getItem("token")) {
          navigate("/login")
        }
      }
    useEffect(() => {
        setSize(priceRef.current.value)
      }, [])
      const handleQty = (e) => {
        setQty(e.target.value);
      }
      const handleOptions = (e) => {
        setSize(e.target.value);
      }

      const handleAddToCart = async () => {
        let food = []
        for (const item of data) {
          if (item.id === props.foodItems._id) {
            food = item;
            break;
          }
        }
        console.log(food)
        console.log(new Date())
        if (food !== []) {
          if (food.size === size) {
            await dispatch({ type: "UPDATE", id: props.foodItems._id, price: finalPrice, qty: qty })
            await console.log(data)
            return
          }
          else if (food.size !== size) {
            await dispatch({ type: "ADD", id: props.foodItems._id, name: props.foodItems.name, price: finalPrice, qty: qty, size: size,img: props.foodItems.img })
            console.log("Size different so simply ADD one more to the list")
            return
          }
          return
        }
    
        await dispatch({ type: "ADD", id: props.foodItems._id, name: props.foodItems.name, price: finalPrice, qty: qty, size: size })
    
    
        // setBtnEnable(true)
    
      }













     
    
      let finalPrice = qty * parseInt(options[size]); 
      
    return (
        <div>
            <div className="card mt-3 myclass" style={{ "width": "18rem", "height": "520px", }}>
                <img className="card-img-top" src={props.foodItems.img} alt="Card image cap" style={{ "height": "200px", width: "286px", "objectFit": "contain !important" }}></img>
                <div className="card-body">
                    <h5 className="card-title">{props.foodItems.name}</h5>
                    <p className="card-text">{props.foodItems.description}</p>
                    <div className='container w-100'>
                        <select className='m-2 h-100 bg-success rounded ' onClick={handleClick} onChange={handleQty}>
                            {
                                Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    )
                                })
                            }
                        </select>
                        <select className='m-2 h-100 bg-success rounded ' ref={priceRef} onClick={handleClick} onChange={handleOptions} >
                            {priceOptions.map((i) => {
                                return <option key={i} value={i}>{i}</option>
                            })}
                        </select>
                        <br></br>
                        <div className='d-inline h-100 fs-5' >
                            <h5 style={{"marginLeft":"5px "}}>$Total Price:{finalPrice}</h5>
                        </div>
                    </div>
                    <hr></hr>
                    <button className={`btn btn-success justify-center ms-2 `} onClick={handleAddToCart} style={{"marginLeft":"65px "}}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

export default Card
