import React from 'react';

const NoAccess = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center p-5 shadow rounded bg-light">
        <i className="bi bi-lock-fill text-danger mb-4" style={{ fontSize: '4rem' }}></i>
        <h2 className="text-danger">Access Denied</h2>
        <p className="text-muted mb-4">
          You don't have permission to access this page. 
        </p>
        <button className="btn btn-primary" onClick={() => window.history.back()}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NoAccess;
