const AuthAdminController = {
    AdminFormLogin:function (req,res) {
        return res.render("admin/templateAdmin/auth/AdminFormLogin.ejs")
    },
    processAdminLogin:function (req,res) {
        console.log(req.body);
        res.send("admin đăng nhập")
    }
}
export default AuthAdminController