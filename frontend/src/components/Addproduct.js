import React from 'react'
import { useState } from 'react'
import AdminNavbar from './AdminNavbar'
import Selector from './Selector'
const Addproduct = () => {
    const [item, setItem] = useState({
        CategoryName: "", name: "", img: "", description: "", options: [{
          'regular': '',
          'large': ''
        }]
      })
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(item)
        const response = await fetch("http://localhost:5000/product/addproduct", {
          // credentials: 'include',
          // Origin:"http://localhost:3000/login",
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ CategoryName: item.CategoryName, 
            img: item.img,
            description:item.description,
            name:item.name,
            options:item.options
           })
    
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
          
          alert("item added sucessfully")
          setItem({CategoryName: "", name: "", img: "", description: "", options: [{
            'regular': '',
            'large': ''
          }]})
    
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
    <div style={{"backgroundImage":"url(https://media.istockphoto.com/id/1465760198/vector/abstract-blue-background-with-space-for-text.jpg?s=612x612&w=0&k=20&c=fXbSkVB3MdZjkaYUIX-Q7liCtmG5cr6kqAAzX-cM3L8=)","width":"99vw","backgroundSize":"cover"}}>
        <AdminNavbar />
        <Selector/>
      <div className='container '
      style={{ "marginTop": "10.3vh"}}>
        <h2 style={{'textAlign':'center','color':"black",'marginTop':'-3vh'}}>Add Product to the Menu</h2>
      
      
     
        <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
          <div className="m-3">
            <label className="form-label" style={{ 'color': 'white' ,"textAlign":'center'}}>Category Name</label>
            <input type="text" className="form-control wclass1" name='CategoryName' value={item.CategoryName} placeholder='Starter or Biryani/Rice or Pizza' onChange={onChange}  />

          </div>
          <div className="m-3">
            <label className="form-label" style={{ 'color': 'white',"textAlign":'center' }} >Name</label>
            <input type="text" className="form-control wclass1" name='name' value={item.name} onChange={onChange} placeholder='item name' />
          </div>
         
          <div>
            <label className="form-label" style={{ 'color': 'white',"textAlign":'center' }}>ImageURL</label>
            <input type="text" className="form-control wclass" name='img' value={item.img} onChange={onChange}  placeholder='paste image url' />
          </div>
          <div>
            <label className="form-label" style={{ 'color': 'white',"textAlign":'center' }} >description</label>
            <input type="text" className="form-control wclass" name='description' placeholder='description about item' value={item.description} onChange={onChange} />
          </div>
          <div>
            <label className="form-label" style={{ 'color': 'white',"textAlign":'center' }}>regularPrice</label>
            <input placeholder='regular Quantity price' type="text" className="form-control wclass" name='regular' value={item.options[0].regular} onChange={onChange} />
            <label className="form-label" style={{ 'color': 'white',"textAlign":'center' }}>LargePrice</label>
            <input placeholder='Large Quantity price'  type="text" className="form-control wclass" name='large' value={item.options[0].large} onChange={onChange}  />
          </div>
          <button type="submit" className="m-3 btn btn-success">Submit</button>

        </form>

      </div>
    </div>
  )
}

export default Addproduct
