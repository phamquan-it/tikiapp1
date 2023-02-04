import connection from "../../service/connectDB.js"
const HomeController = {
    homepage : (req,res)=>{
        connection.query('SELECT * FROM products', function (error, results, fields) {
            if (error) throw error;
            return res.render("app/home.ejs",{title:"Trang chủ",products:results})
          });
    }
}
export default HomeController