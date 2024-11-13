import React from 'react'
import { Link } from 'react-router-dom'
const Selector = () => {
    return (
        <div>
            <ul className='selectors' >
                        <li >
                            <Link className="nav-link" to="/addproduct" ><b>Add Product to the Menu</b> <span className="sr-only">(current)</span></Link>
                        </li>
                        <li >
                            <Link className="nav-link" to="/updateproduct" ><b>Update Product details in the Menu </b><span className="sr-only">(current)</span></Link>
                        </li>
                        <li >
                            <Link className="nav-link" to="/deleteproduct" ><b>Delete Product details in the Menu </b><span className="sr-only">(current)</span></Link>
                        </li>
                        
                    </ul>
        </div>
    )
}

export default Selector
