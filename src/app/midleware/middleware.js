class middlewareUser{
    checklogin(req, res, next) {
        if(req.session.User != undefined)
        next()
        else
        res.redirect("/")
      }
}
const middleware = new middlewareUser()
export default middleware