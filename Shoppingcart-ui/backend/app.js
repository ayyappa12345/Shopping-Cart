const config=require("./config/config");
const db=require("./model/db");
const userRouter=require("./routes/user.routes");
const userItemsrouter=require("./routes/user.items.routes");
const productsRouter=require("./routes/products.routes");
const ordersRoute=require("./routes/myorder.routes");
const addressroute=require("./routes/address.routes");
const bodyparser=require("body-parser");
const cors=require("cors")


const express=require("express");
const app=express();

app.use(bodyparser.json());
app.use(cors());

app.use("/api",userRouter);
app.use("/api", userItemsrouter);
app.use("/api", productsRouter);
app.use("/api", ordersRoute);
app.use("/api", addressroute);
app.use("/uploads", express.static("uploads"))
app.listen(process.env.PORT, ()=>
{console.log("Mongo db connected with the port of"+process.env.PORT)})


