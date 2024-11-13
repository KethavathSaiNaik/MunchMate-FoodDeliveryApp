import Home from "./screens/Home";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import {createBrowserRouter} from 'react-router-dom'
import MyOrder from "./screens/MyOrders";
import AdminLogin from "./screens/AdminLogin";
import AdminDashboard from "./screens/AdminDashboard"
import Addproduct from "./components/Addproduct";
import Updateproduct from "./components/Updateproduct";
import DeleteProduct from "./components/DeleteProduct";
import Feedback from "./screens/Feedback";
import CustomerReviews from "./screens/CustomerReviews";
import DonationForm from "./screens/DonationForm";
import ViewDonations from "./screens/ViewDonations";
import ThankYou from "./components/ThankYou";
import Profile from "./screens/Profile";
import Success from "./components/Success";
import Failure from "./components/Failure";
const router=createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/Signup',
    element:<Signup/>
  }
  ,
  {
    path:'/myorders',
    element:<MyOrder/>
  },
  {
    path:'/adminlogin',
    element:<AdminLogin/>
  }
  ,
  {
    path:'/admindashboard',
    element:<AdminDashboard/>
  },
  {
    path:'/addproduct',
    element:<Addproduct/>
  },
  {
    path:'/updateproduct',
    element:<Updateproduct/>
  },
  {
    path:'/deleteproduct',
    element:<DeleteProduct/>
  }
  ,
  {
    path:'/feedback/:item',
    element:<Feedback/>
  }
  ,
  {
    path:'/customerreviews',
    element:<CustomerReviews/>
  }
  ,
  {
    path:'/donate',
    element:<DonationForm/>
  }
  ,
  {
    path:'/customerdonations',
    element:<ViewDonations/>
  }
  ,
  {
    path:'/thankyou',
    element:<ThankYou/>
  },
  {
    path:'/profile',
    element:<Profile/>
  }
  ,
  {
    path:'/payment-success',
    element:<Success/>
  }
  ,
  {
    path:'/payment-failure',
    element:<Failure/>
  }
 
 
])
function App() {
  return (
    <>
    <Home/>
    </>
  );
}
export {router}
export default App;
