import connection from "../../../../service/connectDB.js"
const AuthController = {
    login : (req,res)=>{
        return res.render("app/template/auth/login.ejs",{title:"Đăng nhập với tikiApp"})
    },
    form_login : (req,res)=>{
       connection.query(`SELECT * FROM users WHERE email = "${req.body.email}"`,function (error,results,fields) {
        if (error) {
            throw error 
        }else{
            if (results[0].password == req.body.password){
                req.session.User = results[0]
                return res.status(200).redirect("/");
            }
            return res.render("app/template/auth/login.ejs",{nofilication:"Email hoặc mật khẩu không chính xác"})
        }
       })
    },
    logout:function (req,res) {
        delete req.session.User
        return res.redirect("/")
    }
}
export default AuthController