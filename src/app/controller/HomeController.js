import connection from "../../service/connectDB.js"
import DB from "../../service/supports/DB.js"
import sendEmail from "./sendEmail.js";
const HomeController = {
    homepage : (req,res)=>{
        connection.query('SELECT * FROM products', function (error, results, fields) {
            if (error) throw error;
            connection.query('SELECT * FROM categories', function (c_error, c_results, c_fields) {
                if(c_error) throw error;
                let Cart  = req.session.Cart;
                let products = results;
                let sessionUser = req.session.User
               // console.log(Cart);
                   // return res.status(200).json({status: 'success', session: req.session.User})
                return res.status(200).render("app/home.ejs",{title:"Trang chủ",products,sessionUser,Cart,c_results})
            })
          });
    },
    search : (req,res)=>{
        connection.query(`SELECT * FROM products WHERE pr_name LIKE "%${req.body.search}%"`, function (error, results, fields) {
            if (error) throw error;
            let Cart  = req.session.Cart;
            let products = results;
            let sessionUser = req.session.User
               // return res.status(200).json({status: 'success', session: req.session.User})
            return res.status(200).render("app/home.ejs",{title:"Trang chủ",products,sessionUser,Cart,c_results:[]})
          });
    },
    filter(req,res){
        connection.query(`SELECT * FROM products WHERE category_id = ${req.params.id}`, function (error, results, fields) {
            if (error) throw error;
            connection.query('SELECT * FROM categories', function (c_error, c_results, c_fields) {
                if(c_error) throw error;
                let Cart  = req.session.Cart;
                let products = results;
                let sessionUser = req.session.User
               // console.log(Cart);
                   // return res.status(200).json({status: 'success', session: req.session.User})
                return res.status(200).render("app/home.ejs",{title:"Trang chủ",products,sessionUser,Cart,c_results})
            })
        });
    }
    ,
    payment: (req,res)=>{
        if (req.session.User){
            let Cart = req.session.Cart
            let  qty = 0;
            Cart.forEach((value) => {
                qty+= value.amount*value.price
            });
            return res.status(200).render("payment.ejs",{User:req.session.User,qty});
        }
            return res.redirect("/login")
    },
    order(req,res){
        DB.insert('orders',{
            user_id:req.session.User.id,
            order_name:req.body.order_name,
            order_phone:req.body.order_phone,
            qty:parseFloat(req.body.qty),
            get_address:req.body.order_address
        })
        sendEmail(req.session.User.email);
        delete req.session.Cart
        return res.send("Đặt hàng thành công!")
    }
}
export default HomeController