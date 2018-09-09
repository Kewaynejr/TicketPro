var mysql = require("mysql");


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root"
});

con.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("mysql connected...");
});

app.get("/createdb", (req, res) => {
    let sql = "CREATE DATABASE tickets";
    con.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("database created...");
    });
});// JavaScript source code

app.listen(1000, process.env.IP, function () {
    console.log("server started");
});