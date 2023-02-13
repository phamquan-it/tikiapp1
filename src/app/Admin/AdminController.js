import connection from "../../service/connectDB.js"
import DB from "../../service/supports/DB.js";
import formidable from "formidable";
import fs from "fs";
import path from "path";
const AdminController = {
    adminHome:function(req,res){
        connection.query(DB.select("*","products"),function (error,results,fields) {
            if(error) throw error;
            connection.query(DB.select("*","categories"),function (error,categories,fields) {
              if(error) throw error;
              res.render("admin/AdminHome.ejs",{products:results,categories})
          })
        })
    },
    create_product:function (req,res) {
        const form = formidable({});
        form.parse(req, (err, fields, files) => {
            if (err) {
              next(err);
              return;
            }
            else{
                var oldpath = files.image.filepath;
                var newpath = './src/public/image/' + files.image.originalFilename;
                var imagepath = '/image/' + files.image.originalFilename;
                let sql = DB.insert("products",{
                  pr_name:fields.pr_name,
                  amount:fields.amount,
                  price:fields.price,
                  image:imagepath,
                  description:"do some thing",
                  category_id:fields.category
                })
                
                //console.log(sql);
                fs.rename(oldpath, newpath, function (err) {
                    if (err) throw err;
                  //  res.write('File uploaded and moved!');
                  //console.log(fields);
                    res.redirect("/admin");
                  });
            }  
          });
    },
    delete_product(req,res){
      DB.delete("products",`id = "${req.body.id}"`)
      fs.unlink(`src/public/${req.body.image}`, function (err) {
        if (err) throw err;
        console.log('File deleted!');
      });
      // let onlyPath = path.dirname(fs.realpathSync('\\src\\puclic\\image\\sam sung S4.jpg'));
      // console.log(onlyPath);
      res.redirect("/admin")
    },
    update_product(req,res){
      let data = {
        pr_name:req.body.pr_name,
        amount:parseFloat(req.body.amount),
        description:req.body.description,
        price:parseFloat(req.body.price),
        category_id:parseInt(req.body.category_id)
      }
      DB.update('products',data,`id = ${parseInt(req.body.id)}`)
      res.redirect("/admin")
    },
    form_update(req,res){
      connection.query(DB.select("*","products",`id = ${req.params.id}`),function (error,results,fields) {
        connection.query(DB.select("*","categories"),function (err,result,field) {
          return res.render("admin/templateAdmin/updateProducts.ejs",{data:results[0],categories:result})
        })
      })
     // res.send(DB.select("*","products",`id = ${req.params.id}`))
    }
}
export default AdminController