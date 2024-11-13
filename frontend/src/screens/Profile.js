import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar"
const Profile = ({ userEmail }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    location: '' // Changed to location
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false); // State for edit mode
  const [newPassword, setNewPassword] = useState(''); // New password state
  const [updatedName, setUpdatedName] = useState(''); // Updated name state
  const [updatedLocation, setUpdatedLocation] = useState(''); // Updated location state
  const token=localStorage.getItem('token')
  // Fetch user profile when the component mounts
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:5000/viewprofiles/profile?email=${localStorage.getItem('userEmail')}` 
        , {
          method: 'GET',
          headers: {
              'Authorization': token // Include the token in the Authorization header
          }
      });
        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }
        const data = await response.json();
        setUser(data);
        setUpdatedName(data.name); // Set initial values for editing
        setUpdatedLocation(data.location); // Set initial values for location
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userEmail]);

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const updatedUser = { name: updatedName, location: updatedLocation }; // Changed to location

    try {
      const response = await fetch(`http://localhost:5000/viewprofiles/updateprofile?email=${localStorage.getItem('userEmail')}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token 
          
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      const data = await response.json();
      setUser(data); // Update the user state with the new data
      setEditing(false); // Exit edit mode
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/viewprofiles/updatepassword?email=${localStorage.getItem('userEmail')}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token 
        },
        body: JSON.stringify({ password: newPassword }),
      });

      if (!response.ok) {
        throw new Error('Failed to update password');
      }
      setNewPassword(''); // Clear password input after successful update
      alert('Password updated successfully!'); // Feedback to user
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center">{error}</div>;
  }

  return (
    <div style={{backgroundImage:'url("https://img.freepik.com/free-vector/abstract-blue-circle-black-background-technology_1142-12714.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1728086400&semt=ais_hybrid")',height:"93vh",backgroundSize:"cover"}}>
    <Navbar/>
    <div className="container mt-5 profile-container" style={{"position":"relative","top":"100px" }}>
      <div className="card profile-card shadow-lg">
        <div className="row g-0">
          <div className="col-md-5 profile-image">
            <img
              src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
              className="img-fluid rounded-start"
              alt="User Profile"
              style={{ objectFit: 'cover', height: '100%' }}
            />
          </div>
          <div className="col-md-7">
            <div className="card-body">
              <h2 className="card-title text-center">User Profile</h2>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Name:</strong> {editing ? 
                <input 
                  type="text" 
                  className="form-control" 
                  value={updatedName} 
                  onChange={(e) => setUpdatedName(e.target.value)} 
                />
              : user.name}</p>
              <p><strong>Location:</strong> {editing ? 
                <input 
                  type="text" 
                  className="form-control" 
                  value={updatedLocation} 
                  onChange={(e) => setUpdatedLocation(e.target.value)} 
                />
              : user.location}</p> {/* Changed to location */}

              <div className="text-center">
                {editing ? (
                  <div>
                    <button onClick={handleUpdateProfile} className="btn btn-primary">Save Changes</button>
                    <button onClick={handleEditToggle} className="btn btn-secondary ml-2">Cancel</button>
                  </div>
                ) : (
                  <button onClick={handleEditToggle} className="btn btn-warning">Edit Profile</button>
                )}
              </div>

              <hr />
              <h3>Update Password</h3>
              <form onSubmit={handleUpdatePassword} className="mt-3">
                <input 
                  type="password" 
                  className="form-control mb-2" 
                  placeholder="New Password" 
                  value={newPassword} 
                  onChange={(e) => setNewPassword(e.target.value)} 
                  required 
                />
                <button type="submit" className="btn btn-success">Update Password</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Profile;
