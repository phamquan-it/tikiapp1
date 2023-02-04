import * as mysql from "mysql";
import * as dotenv from "dotenv";
dotenv.config();
var connection = mysql.createConnection({
  host     : process.env.HOST,
  user     : process.env.USER,
  password : '',
  database : process.env.DATABASE
});
 
connection.connect();
 
export default connection
 
//connection.end();