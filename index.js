import express from "express"
import * as dotenv from "dotenv";
import path from "path";
dotenv.config();
import routes from "./src/routes/route.js"
const app = express()
//use body-parser 
app.use(express.urlencoded({extended:true}))
app.use(express.json())
//set view engine
app.set("view engine","ejs")
app.set("views","./src/views")
app.use(express.static(path.join("./","src/public")))
app.use('/',routes)
const port = process.env.PORT

app.listen(port, () => console.log(`Server running at http://localhost:${port}`))