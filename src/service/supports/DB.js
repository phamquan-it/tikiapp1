//import connection from "../connectDB";
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

    }
}
const DB = new supportDB();
//console.log(DB.select(["name","age"],"users"));
export default DB