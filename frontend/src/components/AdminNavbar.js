import React from 'react'
import { Link } from 'react-router-dom'

const AdminNavbar = () => {
    return (
        <div>
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light adminnavbar">
                    <Link className="navbar-brand" to="/admindashboard"><b>MunchMate_Admin</b></Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup"  >
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="btn bg-white text-success mx-1 " to="/">Go to website</Link>
                            </li>
                            <li className="nav-item active">
                                <Link className="btn bg-white text-success mx-1 " to="/customerreviews">Customer Reviews</Link>
                            </li>
                            <li className="nav-item active">
                                <Link className="btn bg-white text-success mx-1 " to="/customerdonations" >Check Donations</Link>
                            </li>
                        </ul>
                    </div >
                </nav>
                <div>

                </div>
            </div>

        </div>
    )
}

export default AdminNavbar
