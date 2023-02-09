import connection from "../../service/connectDB.js"
import formidable from "formidable";
import fs from "fs";
const AdminController = {
    adminHome:function(req,res){
        connection.query("SELECT * FROM products",function (error,results,fields) {
            if(error) throw error;
            res.render("admin/AdminHome.ejs",{products:results})
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
                fs.rename(oldpath, newpath, function (err) {
                    if (err) throw err;
                  //  res.write('File uploaded and moved!');
                    res.json({ fields, files });
                  });
            }  
          });
    }
}
export default AdminController