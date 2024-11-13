import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useState,useEffect } from 'react'
import Donate from '../components/Donate'
import Card from '../components/Card'
const Home = () => {
  const [foodCat, setFoodCat] = useState([])
  const [foodItems, setFoodItems] = useState([])
  const [search, setSearch] = useState('')
  
  const loadFoodItems = async () => {
    let response = await fetch("https://munchmate-deploy-backend.onrender.com/api/fooddata", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }

    });
    response = await response.json()
    setFoodItems(response[0])
    setFoodCat(response[1])
    console.log(response);
    
    // console.log(response[1][0].CategoryName)
   
    
  }

  useEffect(() => {
    loadFoodItems()
  }, [])
  return (
    <>
      <Navbar />
      <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel" style={{marginTop:"60px"}}>
        <ol className="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
        </ol>
        <div className="carousel-inner">
          <div className=" carousel-caption  " style={{ zIndex: "9" }}>
            <div className=" d-flex justify-content-center">
              <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Search in here..." aria-label="Search"   value={search} onChange={(e) => { setSearch(e.target.value) }} />
              <button className="btn text-white bg-danger tgt" onClick={()=>{setSearch('')}}>X</button>
            </div>
          </div>
          <div className="carousel-item active">
            <img className="d-block w-100" src="https://franchiseindia.s3.ap-south-1.amazonaws.com/uploads/content/fi/art/5feb2c2f49aff.jpeg" alt="First slide"></img>

            
          </div>
          <div className="carousel-item ">
            <img className="d-block w-100" src="https://rajabhogam.co.in/images/rajabogam/home/slider/2.jpg" alt="Second slide"></img>
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="https://ftnnews.com/wp-content/uploads/2024/09/Margherita-pizza-with-cherry-tomatos.webp" alt="Third slide"></img>
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="https://media-cdn.grubhub.com/grubhub-marketing/image/upload/f_auto,fl_lossy/v1692270106/grubhubHomePage/sushi_homepage1.png" alt="Fourth slide"></img>
          </div>
          
        </div>
        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>

      </div>
      <center><h3 style={{"marginTop":"30px",color:"red"}}>Foodies' Choice</h3></center>
      
      <div className='container'> {/* boootstrap is mobile first */}
        {
          foodCat !== []
            ? foodCat.map((data) => {
              return (
                <>
                <div key={data.id} className='fs-3 m-4 newfont'>
                  <h2>{data.CategoryName}</h2>
                  </div>
                
                <div className='row mb-3'>
                  <br></br>
                  <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))" }} />

                  {foodItems !== [] ? foodItems.filter(
                    (items) => (items.CategoryName === data.CategoryName) && (items.name.toLowerCase().includes(search.toLowerCase())))
                    .map(filterItems => {
                      return (
                        <div key={filterItems.id} className='col-12 col-md-6 col-lg-4'>
                          {console.log(filterItems.url)}
                          <Card  foodItems={filterItems} options={filterItems.options[0]} ></Card>
                        </div>
                      )
                    }) : <div> No Such Data </div>}
                  
                </div></>
              )
            })
            : ""}
      </div> 

            <Donate/>
      <Footer />
    </>
  )
}



export default Home


