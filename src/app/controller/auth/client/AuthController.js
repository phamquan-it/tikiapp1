import connection from "../../../../service/connectDB.js"
const AuthController = {
    login : (req,res)=>{
        return res.render("app/template/auth/login.ejs",{title:"Đăng nhập với tikiApp"})
    },
    form_login : (req,res)=>{
        return res.redirect("/")
    }
}
export default AuthController