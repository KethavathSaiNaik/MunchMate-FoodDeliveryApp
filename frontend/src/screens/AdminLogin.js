import React from 'react'
import { useState } from 'react'
import Navbar from '../components/Navbar';
import { useNavigate, Link } from 'react-router-dom'

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" ,admin_key:""})
    let navigate = useNavigate()
    const admin_keyvalue="munchmateadmin"

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(credentials.admin_key)
        if (admin_keyvalue == credentials.admin_key){
            const response = await fetch("http://localhost:5000/api/adminlogin", {
        
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
          
              });
              const json = await response.json()
              console.log(json);
              if (json.success) {
                //save the auth toke to local storage and redirect
                localStorage.setItem('userEmail', credentials.email)
                localStorage.setItem('token', json.authToken)
                console.log("hello")
                navigate("/admindashboard");
          
              }
              else {
                alert("Enter Valid Credentials")
              }
        }
        else{
            console.log("wrong")
            alert("login as admin")
        }
        
        
      }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
      }
  return (
    
    <div style={{backgroundImage: 'url("https://thumbs.dreamstime.com/b/salad-tomatoes-greens-dressing-oil-feta-cheese-blue-plate-white-wooden-background-top-view-banner-website-52717635.jpg")', height: '100vh', backgroundSize: 'cover' }}>
        
      <Navbar/>
      <div className='container ' style={{"marginTop":"20vh"}}>
        <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
          <div className="m-3">
            <label htmlFor="exampleInputEmail1" className="form-label" style={{'color':'white'}}>Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
            <div id="emailHelp" style={{"color":"white"}}  className="form-text">We'll never share your email with anyone.</div>
          </div>
          <div className="m-3">
            <label htmlFor="exampleInputPassword1" className="form-label" style={{'color':'white'}}>Password</label>
            <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' />
          </div>
          <div className="m-3">
            <label htmlFor="exampleInputPassword1" className="form-label" style={{'color':'white'}}>Admin-Key</label>
            <input type="password" className="form-control" value={credentials.admin_key} onChange={onChange} name='admin_key' />
          </div>
          <button type="submit" className="m-3 btn btn-success">Submit</button>
          
        </form>
        
      </div>
    </div>
  )
}

export default AdminLogin
