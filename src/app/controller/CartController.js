import connection from "../../service/connectDB.js";
const CartController = {
    
    addToCart:(req,res)=>{
        let isset = false;
        if(req.session.Cart == undefined){
            req.session.Cart = []
        }
        req.session.Cart.forEach((obj,index) => {
            if (obj.id == req.params.id) {
                req.session.Cart[index].amount+=1
                isset = true
            }
        });
        if(!isset){
        req.session.Cart.push({
            id: req.params.id,
            name: req.params.name,
            amount:1,
            price:req.params.price
        })}
        res.status(200).redirect("/")
    },
    clearAllCart(req,res){
        delete req.session.Cart
        return res.redirect("/")
    },
    removeCart(req,res){
        req.session.Cart.splice(req.params.id, 1);
        return res.redirect("/")
    }
    ,
    showCart(req,res){
        connection.query(`SELECT * FROM products WHERE id = 1`,function (err,results,fields) {
            if(err) throw err;
            return res.status(200).json({ status: 'success',results })
        })
    }
}
export default CartController