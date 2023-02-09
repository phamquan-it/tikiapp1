import express from "express"
import * as dotenv from "dotenv";
import session from "express-session";
import path from "path";
dotenv.config();
import adminRoutes from "./src/routes/AdminRoutes.js";
import routes from "./src/routes/route.js"
const app = express()
//use session
app.use(session({
    resave: true, 
    saveUninitialized: true, 
    secret: 'somesecret', 
    cookie: { maxAge: 1260000 }}));
//use body-parser 
app.use(express.urlencoded({extended:true}))
app.use(express.json())
//set view engine
app.set("view engine","ejs")
app.set("views","./src/views")
app.use(express.static(path.join("./","src/public")))
app.use('/',routes)
app.use('/admin',adminRoutes)
app.use(function (req,res) {
    res.send("404 not found")
})

//set session

const port = process.env.PORT

app.listen(port, () => console.log(`Server running at http://localhost:${port}`))