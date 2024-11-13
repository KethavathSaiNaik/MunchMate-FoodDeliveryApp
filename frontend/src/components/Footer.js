import React from 'react'

const Footer = () => {
    return (
        <div className='myfooter'>
            <div ><div className="container ">
               

                <footer style={{ backgroundColor: 'black', color: '#ECF0F1', padding: '40px 20px', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
                    <div style={{ marginBottom: '20px' }}>
                        <h4 style={{ color: '#2ECC71', fontSize: '18px', marginBottom: '10px' }}>About MunchMate</h4> {/* Changed color to green */}
                        <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
                            MunchMate is your go-to app for fast, reliable, and delicious food delivery. From your favorite local spots to new culinary experiences, we bring the flavors of the city to your doorstep.
                        </p>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <h4 style={{ color: '#2ECC71', fontSize: '18px', marginBottom: '10px' }}>Our Services</h4> {/* Changed color to green */}
                        <ul style={{ listStyleType: 'none', padding: 0, fontSize: '14px' }}>
                            <li style={{ marginBottom: '8px' }}>Food Delivery</li>
                          
                            <li style={{ marginBottom: '8px' }}>Exclusive Offers</li>
                            <li style={{ marginBottom: '8px' }}>Restaurant Partnerships</li>
                            <li>Customer Support</li>
                        </ul>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <h4 style={{ color: '#2ECC71', fontSize: '18px', marginBottom: '10px' }}>Connect with MunchMate</h4> {/* Changed color to green */}
                        <ul style={{ listStyleType: 'none', padding: 0, fontSize: '14px' }}>
                            <li style={{ marginBottom: '8px' }}>Facebook</li>
                            <li style={{ marginBottom: '8px' }}>Instagram</li>
                            <li style={{ marginBottom: '8px' }}>Twitter</li>
                            <li>LinkedIn</li>
                        </ul>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <h4 style={{ color: '#2ECC71', fontSize: '18px', marginBottom: '10px' }}>Download the MunchMate App</h4> {/* Changed color to green */}
                        <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
                            Get MunchMate on iOS and Android for seamless food ordering and exclusive offers.
                        </p>
                    </div>

                    <div style={{ borderTop: '1px solid #ECF0F1', paddingTop: '20px', fontSize: '12px' }}>
                        <p>&copy; 2024 MunchMate. All rights reserved.</p>
                        <p>
                            <a href="#" style={{ color: '#ECF0F1', textDecoration: 'none' }}>Terms of Service</a> |{' '}
                            <a href="#" style={{ color: '#ECF0F1', textDecoration: 'none' }}>Privacy Policy</a>
                        </p>
                    </div>
                </footer>

            </div>
            </div>
        </div>
    )
}

export default Footer
