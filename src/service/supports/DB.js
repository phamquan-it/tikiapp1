import connection from "../connectDB.js";
class supportDB{
    select(column,table,condition){
        let sql = "SELECT "
        if (typeof column == "object") {
            column.forEach(col => {
                sql +=col+',' 
            });
            sql=sql.slice(0,sql.length-1)
        } else {
            sql += column
        }
        sql += ' FROM '+table
        if (condition != undefined) {
            sql += ' WHERE '+condition
        }
        return sql
    }
    update(table, column,condition){
        let sql = `UPDATE ${table} SET `
        if (typeof column ==  "object") {
            Object.keys(column).forEach(function (key) {
                //console.log(val+":"+column[val]);
                let value = column[key]
                if (typeof value == "string") {
                    value = '"'+column[key]+'"'
                }
                sql += key +"="+value + ","
            })
        }
        sql = sql.slice(0,sql.length-1)
        if(condition != undefined){
            sql+= " WHERE " + condition
        }
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            console.log('Cập nhật dữ liệu thành công!');
          });
    }
    insert(table,column){
        let sql = "INSERT INTO "+table+" ("
        if(typeof column == "object"){
            Object.keys(column).forEach(function (key) {
                sql += key+","
            })
        }
        sql = sql.slice(0,sql.length-1)
        sql+= ') VALUES ('
        Object.keys(column).forEach(function (key) {
            //console.log(val+":"+column[val]);
            let value = column[key]
            if (typeof value == "string") {
                value = '"'+column[key]+'"'
            }
            sql += value+','
        })
        sql = sql.slice(0,sql.length-1)
        sql+= ')'
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            console.log('Thêm dữ  liệu thành công!');
          });
    }
    delete(table,condition){
        let sql = `DELETE FROM ${table} WHERE ${condition}`
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            console.log('Xóa dữ  liệu thành công!');
          });
    }
}
const DB = new supportDB();
//console.log(DB.select(["name","age"],"users"));
//console.log(DB.update('users',{name:"quan",age:23, birth:2000},"id = 1"));
//console.log(DB.insert('users',{id:1,name:"Quân"}));
//console.log(DB.delete('users',"id = 1"));
export default DB