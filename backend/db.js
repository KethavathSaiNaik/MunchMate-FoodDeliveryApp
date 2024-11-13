const mongoose = require("mongoose")
const dotEnv = require("dotenv");
dotEnv.config();
const mongoDB = async () => {
  try {
    await mongoose.connect(process.env.mongo_uri);
    console.log('Connected!');

    const fetched_data = await mongoose.connection.db.collection("fooditems");
    let data=await fetched_data.find({}).toArray();
    global.foodData=data
    console.log(global.foodData)
    

    const fetched_data1= await mongoose.connection.db.collection("foodcategory");
    let data1=await fetched_data1.find({}).toArray();
    global.foodCategory=data1
    console.log(global.foodCategory)
    

    // const fetched_data=await mongoose.connection.db.collection("fooditems");
    // fetched_data.find({}).toArray(async function(err,data){
    //   const foodCategory=await mongoose.connection.db.collection("foodcategory")
    //   foodCategory.find({}).toArray(function(err,catData){
    //     if (err){
    //       console.log(error)
    //     }
    //     else{
    //       global.foodData=data;
    //       global.foodCategory=catData
    //     }
    //   })
    // })

  } catch (error) {
    console.log('err: ', error);
  }
};
module.exports = mongoDB;