import React from 'react'
import AdminNavbar from './AdminNavbar'
import { useState } from 'react'
import Selector from './Selector'
const DeleteProduct = () => {
    const [item, setItem] = useState({
         name: ""
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(item)
        const response = await fetch("http://localhost:5000/product/deleteproduct", {
            // credentials: 'include',
            // Origin:"http://localhost:3000/login",
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                
                name: item.name
            })

        });
        const json = await response.json()
        console.log(json);
        if (json.success) {

            alert("item deleted sucessfully")

        }
        else {
            alert("enter proper details")
        }

    }
    const onChange = (e) => {
        const { name, value } = e.target;

        if (name === 'regular' || name === 'large') {
            // Update the options array for regular and large price
            const updatedOptions = { ...item.options[0], [name]: value };
            setItem((prevState) => ({
                ...prevState,
                options: [updatedOptions],
            }));
        } else {
            // Update other fields
            setItem((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    }
  return (
    <div style={{"backgroundImage":"url(https://media.istockphoto.com/id/1465760198/vector/abstract-blue-background-with-space-for-text.jpg?s=612x612&w=0&k=20&c=fXbSkVB3MdZjkaYUIX-Q7liCtmG5cr6kqAAzX-cM3L8=)","height":"93vh","width":"99vw","backgroundSize":"cover"}}>
            <AdminNavbar />
            <Selector />
            <div className='container '
                style={{ "marginTop": "10.3vh" }}>
                <h2 style={{ 'textAlign': 'center', 'color': "black", 'marginTop': '-5vh' }}>Delete Product in the Menu</h2>



                <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
                    <div className="m-3">
                        <label className="form-label" style={{ 'color': 'white', "textAlign": 'center' }}>Name of the item</label>
                        <input type="text" className="form-control wclass1" name='name' value={item.name} onChange={onChange} />

                    </div>
                    
                    <button type="submit" className="m-3 btn btn-success">Submit</button>

                </form>

            </div>
        </div>
  )
}

export default DeleteProduct
