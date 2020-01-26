const express = require('express')
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const PORT = process.env.PORT || 3128;
const cors = require('cors');
const bcrypt = require('bcrypt')
const saltRounds = 10;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', function (req, res) {
    res.send("Welcome to Invoicing App");
});

app.listen(PORT, function () {
    console.log(`App running on localhost:${PORT}`);
});

app.post('/register', function (req, res) {
    // check to make sure none of the fields are empty
    if (req.body.name === undefined || req.body.email === undefined || req.body.companyId === undefined || req.body.password === undefined) {
        console.log(req)
        return res.json({
            'status': false,
            'message': 'All fields are required'
        });
    }

    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        let db = new sqlite3.Database("./database/AccountingApp.db");
        let sql = `INSERT INTO users(name,email,companyId,password) VALUES('${req.body.name}','${req.body.email}','${req.body.companyId}','${hash}')`;
        db.run(sql, function (err) {
            if (err) {
                throw err;
            } else {
                return res.json({
                    status: true,
                    message: "User Created"
                });
            }
        });
        db.close();
    });
});

app.post("/login", function (req, res) {
    let db = new sqlite3.Database("./database/AccountingApp.db");
    // let sql = `SELECT * from users where `;
    let sql = `SELECT users.id, users.name, users.email, users.companyId, companies.name companyName, users.password from users join companies on users.companyId = companies.id where users.name='${req.body.name}'`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        db.close();
        if (rows.length == 0) {
            return res.json({
                status: false,
                message: "Sorry, wrong name"
            });
        }
        console.log(rows)
        let user = rows[0];
        let authenticated = bcrypt.compareSync(req.body.password, user.password);
        delete user.password;
        if (authenticated) {
            return res.json({
                status: true,
                user: user
            });
        }
        return res.json({
            status: false,
            message: "Wrong Password, please retry"
        });
    });
});

app.get("/users", function(req, res) {
    let db = new sqlite3.Database("./database/AccountingApp.db");
    let sql = `SELECT * from users`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        db.close();
        let users = rows;
        return res.json({
            status: true,
            users: users
        });
    });
});

app.get("/companies", function(req, res) {
    let db = new sqlite3.Database("./database/AccountingApp.db");
    let sql = `SELECT * from companies`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        let companies = [];
        rows.forEach((row) => {
            companies.push(row.name);
        });
        return res.json({
            status: true,
            companies: rows
        });
    });
    db.close();
});

app.get("/invoices/:companyId", function(req, res) {
    let db = new sqlite3.Database("./database/AccountingApp.db");
    let sql = `SELECT invoices.id, invoiceNo, companies.name, netPrice, grossPrice, invoiceDate from invoices join companies on companies.id = invoices.buyer  where seller = ${req.params.companyId}`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        let invoices = rows
        return res.json({
            status: true,
            invoices: invoices
        });
    });
    db.close();
});

app.post("/invoice", function (req, res) {
    let db = new sqlite3.Database("./database/AccountingApp.db");
    let sql = `INSERT INTO invoices(invoiceNo, seller, buyer, user_id, netPrice, grossPrice, taxAmount, invoiceDate) VALUES('${req.body.invoiceNo}',${req.body.seller_id},${req.body.buyer_id},${req.body.user_id},${req.body.netPrice},${req.body.grossPrice},${req.body.taxAmount},'${req.body.invoiceDate}')`
    db.run(sql, function (err) {
        if (err) {
            throw err;
        } else {
            return res.json({
                status: true,
                message: "Invoice Created"
            });
        }
    });
    db.close();
});

app.get("/invoice/:invoiceId", function(req, res) {
    let db = new sqlite3.Database("./database/AccountingApp.db");
    let sql = `SELECT * from invoices where id = ${req.params.invoiceId}`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        let invoice = rows[0]
        return res.json({
            status: true,
            invoice: invoice
        });
    });
    db.close();
});

app.delete("/invoice/:invoiceId", function(req, res){
    console.log(`Usuwanie ${req.params.invoiceId} `)
    let db = new sqlite3.Database("./database/AccountingApp.db");
    let sql = `DELETE FROM invoices where id = ${req.params.invoiceId}`
    db.run(sql, function (err) {
        if (err) {
            throw err;
        } else {
            return res.json({
                status: true,
                message: "Invoice deleted"
            });
        }
    });
    db.close();
});

app.get("/invoicePositions/:invoiceId", function(req, res) {
    let db = new sqlite3.Database("./database/AccountingApp.db");
    let sql = ` SELECT products.name,
                       products.netprice,
                       invoice_positions.amount,
                       (products.netprice*invoice_positions.amount*products.taxRate)/100 taxAmount,
                       (products.netprice*invoice_positions.amount*(100+products.taxRate))/100 grossPrice
                FROM   invoice_positions
                       join products on products.id = invoice_positions.productId
                WHERE  id = ${req.params.invoiceId}`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        let invoicePositions = rows
        return res.json({
            status: true,
            invoicePositions: invoicePositions
        });
    });
    db.close();
});

app.post('/company', function (req, res) {
    // check to make sure none of the fields are empty
    if (req.body.name === undefined || req.body.adress === undefined || req.body.nip === undefined || req.body.regon === undefined) {
        return res.json({
            'status': false,
            'message': 'All fields are required'
        });
    }

    let db = new sqlite3.Database("./database/AccountingApp.db");
    let sql = `INSERT INTO companies(name,adress,nip,regon) VALUES('${req.body.name}','${req.body.adress}','${req.body.nip}','${req.body.regon}')`;
    db.run(sql, function (err) {
        if (err) {
            throw err;
        } else {
            return res.json({
                status: true,
                message: "Company Created"
            });
        }
    });
    db.close();
});

app.post("/product", function (req, res) {
    let db = new sqlite3.Database("./database/AccountingApp.db");
    let sql = `INSERT INTO products(name, unit, netprice, grossprice, taxRate) VALUES('${req.body.name}','${req.body.unit}',${req.body.netprice},${req.body.grossprice},${req.body.taxRate})`
    db.run(sql, function (err) {
        if (err) {
            throw err;
        } else {
            return res.json({
                status: true,
                message: "Product Created"
            });
        }
    });
    db.close();
});

app.get("/products", function(req, res) {
    let db = new sqlite3.Database("./database/AccountingApp.db");
    let sql = `SELECT * from products`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        let products = rows
        return res.json({
            status: true,
            products: products
        });
    });
    db.close();
});

app.post("/invoicePositions", function (req, res) {
    let db = new sqlite3.Database("./database/AccountingApp.db");
    let sql = `INSERT INTO invoice_positions(invoiceId, productId, amount, discount) VALUES(${req.body.invoiceId},${req.body.productId},${req.body.amount},${req.body.discount})`
    db.run(sql, function (err) {
        if (err) {
            return res.json({
                status: false,
                error: err
            });
        } else {
            return res.json({
                status: true,
                message: "Position Created"
            });
        }
    });
    db.close();
});

// app.post("/invoice", multipartMiddleware, function(req, res) {
//     // validate data
//     if (isEmpty(req.body.name)) {
//       return res.json({
//         status: false,
//         message: "Invoice needs a name"
//       });
//     }
//     // create invoice
//     let db = new sqlite3.Database("./database/InvoicingApp.db");
//     let sql = `INSERT INTO invoices(name,user_id,paid) VALUES(
//       '${req.body.name}',
//       '${req.body.user_id}',
//       0
//     )`;

//     db.serialize(function() {
//         db.run(sql, function(err) {
//           if (err) {
//             throw err;
//           }
//           let invoice_id = this.lastID;
//           for (let i = 0; i < req.body.txn_names.length; i++) {
//             let query = `INSERT INTO transactions(name,price,invoice_id) VALUES(
//                 '${req.body.txn_names[i]}',
//                 '${req.body.txn_prices[i]}',
//                 '${invoice_id}'
//             )`;
//             db.run(query);
//           }
//           return res.json({
//             status: true,
//             message: "Invoice created"
//           });
//         });
//       });
//     });