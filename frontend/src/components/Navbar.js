import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart, useDispatchCart } from '../components/ContextReducer';
const Navbar = () => {
    let data = useCart();

    let navigate = useNavigate();
    const [cartView, setCartView] = useState(false)

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userEmail')
        navigate("/login")
    }
    const loadCart = () => {
        setCartView(true)
    }

    const items = useCart();
    return (
        // <div>
        //     <nav className="navbar navbar-expand-lg navbar-light bg-success">
        //         <Link to='/' className=' fs-1 fst-italic logoname' style={{ 'color': "black", "fontSize": "25px" }}>MunchMate</Link>
        //         {(localStorage.getItem('userEmail')=== 'admin@admin.com') ? <Link className="btn bg-white text-success mx-1 dashbtn" to="/admindashboard"  style={{"marginLeft":"150px"}}>Dashboard</Link>:<></>}
        //         <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        //             <span className="navbar-toggler-icon"></span>
        //         </button>
        //         {/* <div className="collapse navbar-collapse" id="#navbarNav">
        //             <div className="navbar-nav">
        //                 <button type="button " className="btn btnhome btn-light" ><Link className="nav-item nav-link" to="/login">Login</Link></button>
        //                 <button type="button" className="btn btnhome btn-light spc"><Link className="nav-item nav-link " to="/Signup">Sign up</Link></button>

        //             </div>

        //         </div> */}
        //         <div className="collapse navbar-collapse" id="navbarNav">
        //             <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
        //                 <li className="nav-item ">
        //                 </li>
                        
        //                 {(localStorage.getItem("token")) ?
        //                     <li className="nav-item d-flex">
        //                         {(localStorage.getItem("userEmail") !== 'admin@admin.com') ? 
        //                          <Link className="btn bg-white text-success mybtnss1" aria-current="page"  to="/profile" style={{marginRight:"15px",marginTop:'1px'}}>Profile
        //                          <i style={{marginLeft:"7px"}} className="fa-solid fa-user"></i>
        //                          </Link>
 
                                
        //                         :
        //                         <></>
                                
        //                         }
                               
        //                         <Link className="btn bg-white text-success mybtnss1" aria-current="page"  to="/myorders">MyOrders
        //                         </Link>

        //                         <Link className="btn bg-white text-success m-1 mybtnss2" aria-current="page"    onClick={loadCart} >MyCart
        //                             <span className="badge badge-success m-1 mybad">{data.length}</span>
        //                         </Link>  {/* index.css - nav-link color white */}
        //                     </li> : ""}
        //             </ul>

                




                    
        //             {(!localStorage.getItem("token")) ?
        //                 <form className="d-flex">
        //                     <Link className="btn bg-white text-success mx-1 " to="/login">Login</Link>
        //                     <Link className="btn bg-white text-success mx-1 " to="/signup">Signup</Link>
        //                 </form> :
        //                 <div>

        //                     {/* <div className="btn bg-white text-success mx-2 " onClick={loadCart}>
        //                             <Badge color="secondary" badgeContent={items.length} >
        //                                 <ShoppingCartIcon />
        //                             </Badge>
        //                             Cart
        //                         </div>

        //                         {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""} */}
        //                     {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}
                            
        //                     <button onClick={handleLogout} className="btn bg-danger text-white"  >Logout</button></div>}
        //         </div>

        //     </nav>




        // </div>
        <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-success" style={{ minHeight: "4em" }}>
        <Link to="/" className="fs-1 fst-italic logoname" style={{ color: "black", fontSize: "25px" }}>MunchMate</Link>

        {localStorage.getItem('userEmail') === 'admin@admin.com' && 
            <Link className="btn bg-white text-success mx-1 dashbtn" to="/admindashboard" style={{ marginLeft: "150px" }}>Dashboard</Link>
        }

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-start flex-lg-row flex-column" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ fontSize: "1rem" }}>
                {localStorage.getItem("token") && (
                    <li className="nav-item d-flex flex-lg-row flex-column">
                        {localStorage.getItem("userEmail") !== 'admin@admin.com' && 
                            <Link className="btn bg-white text-success mybtnss1 mb-lg-0 mb-2" aria-current="page" to="/profile" style={{ marginRight: "15px", marginTop: '1px', fontSize: "0.9em" }}>
                                Profile <i style={{ marginLeft: "7px" }} className="fa-solid fa-user"></i>
                            </Link>
                        }

                        <Link className="btn bg-white text-success mybtnss1 mb-lg-0 mb-2" aria-current="page" to="/myorders" style={{ fontSize: "0.9em" }}>
                            MyOrders
                        </Link>

                        <Link className="btn bg-white text-success m-1 mybtnss2" aria-current="page" onClick={loadCart} style={{ fontSize: "0.9em" }}>
                            MyCart <span className="badge badge-success m-1 mybad">{data.length}</span>
                        </Link>
                    </li>
                )}
            </ul>

            {(!localStorage.getItem("token")) ? (
                <form className="d-flex justify-content-start w-100 flex-lg-row flex-column">
                    <Link className="btn bg-white text-success mx-1 mb-lg-0 mb-2" to="/login" style={{ fontSize: "0.9em" }}>Login</Link>
                    <Link className="btn bg-white text-success mx-1 mb-lg-0 mb-2" to="/signup" style={{ fontSize: "0.9em" }}>Signup</Link>
                </form>
            ) : (
                <div className="d-flex justify-content-start w-100 flex-lg-row flex-column">
                    {cartView && <Modal onClose={() => setCartView(false)}><Cart /></Modal>}
                    <button onClick={handleLogout} className="btn bg-danger text-white mb-lg-0 mb-2" style={{ fontSize: "0.9em" }}>Logout</button>
                </div>
            )}
        </div>
    </nav>
</div>

    )
}

export default Navbar
