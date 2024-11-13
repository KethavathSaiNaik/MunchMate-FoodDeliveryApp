


const express = require('express')
const app = express()
const dotEnv = require("dotenv");
dotEnv.config();

const port = process.env.PORT ||  5000
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000","http://localhost:3000/login","http://localhost:5000/api/auth/orderData","http://localhost:5000/product/updateproduct");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
  
//   next();
// });
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // Only one domain allowed here
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  
  // Add the Access-Control-Allow-Methods header to specify allowed methods
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type');

  // Handle preflight requests (OPTIONS method)
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);  // Respond OK to preflight requests
  }
  allowedHeaders: ['Content-Type', 'Authorization'],
  next();
});
// const allowedOrigins = [
//   "http://localhost:3000",
//   "http://localhost:3000/login",
//   "http://localhost:5000/api/auth/orderData",
//   "http://localhost:5000/product/updateproduct"
// ];

// app.use((req, res, next) => {
//   const origin = req.headers.origin;
//   if (allowedOrigins.includes(origin)) {
//     res.setHeader("Access-Control-Allow-Origin", origin);
//   }

//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");

//   if (req.method === 'OPTIONS') {
//     return res.sendStatus(200);
//   }

//   next();
// });


const mongoDB=require("./db")
mongoDB()


app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/api',require('./routes/CreateUser'))  

app.use('/product',require('./routes/Product'))  
app.use('/customer',require('./routes/Reviews')) 
app.use('/donations',require('./routes/Donations')) 
app.use('/analytics',require('./routes/Analytics'))
app.use("/viewprofiles",require('./routes/Profiles'))
app.use('/payment',require("./routes/Payment"))
app.use("/email",require("./routes/Email"))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})