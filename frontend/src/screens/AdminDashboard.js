import React from 'react'
import { useState } from 'react'
import AdminNavbar from '../components/AdminNavbar'
import Selector from '../components/Selector'
import Addproduct from '../components/Addproduct'
import NoAccess from '../components/NoAccess'
import AnalyticsDashboard from '../components/AnalyticsDashboard'
const AdminDashboard = () => {
  const emailFromLocalStorage = localStorage.getItem('userEmail');
  return (
    <div style={{"backgroundImage":"url(https://media.istockphoto.com/id/1465760198/vector/abstract-blue-background-with-space-for-text.jpg?s=612x612&w=0&k=20&c=fXbSkVB3MdZjkaYUIX-Q7liCtmG5cr6kqAAzX-cM3L8=)","width":"99vw","backgroundSize":"cover"}}>
      {emailFromLocalStorage === 'admin@admin.com' ? 
      <>
      <div >
      <AdminNavbar />
      <Selector/>
      <AnalyticsDashboard/>
      

    </div>
      </> : <NoAccess/>}
    </div>
    

  )
}

export default AdminDashboard


