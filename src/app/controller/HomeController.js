import connection from "../../service/connectDB.js"
const HomeController = {
    homepage : (req,res)=>{
        connection.query('SELECT * FROM products', function (error, results, fields) {
            if (error) throw error;
               // return res.status(200).json({status: 'success', session: req.session.User})
            return res.status(200).render("app/home.ejs",{title:"Trang chủ",products:results,sessionUser:req.session.User})
          });
    }
}
export default HomeController