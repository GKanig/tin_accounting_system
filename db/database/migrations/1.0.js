"use strict";
const Promise = require("bluebird");
const sqlite3 = require("sqlite3");
const path = require('path');


module.exports = {
    up: function() {
      return new Promise(function(resolve, reject) {
        /* Here we write our migration function */
        let db = new sqlite3.Database('./database/AccountingApp.db');
        //   enabling foreign key constraints on sqlite db
        db.run(`PRAGMA foreign_keys = ON`);

        db.serialize(function() {
            
            db.run(`CREATE TABLE companies (
                id INTEGER PRIMARY KEY,
                name TEXT,
                adress TEXT,
                nip INTEGER,
                regon INTEGER
              )`);

            
            db.run(`CREATE TABLE users (
                id INTEGER PRIMARY KEY,
                name TEXT,
                email TEXT,
                companyId INTEGER,
                password TEXT,
                FOREIGN KEY(companyId) REFERENCES companies(id)
            )`);
            

            db.run(`CREATE TABLE invoices (
              id INTEGER PRIMARY KEY,
              invoiceNo TEXT,
              seller INTEGER,
              buyer INTEGER,
              user_id INTEGER,
              netPrice REAL,
              grossPrice REAL,
              taxAmount REAL,
              invoiceDate TEXT,
              FOREIGN KEY(user_id) REFERENCES users(id),
              FOREIGN KEY(seller) REFERENCES companies(id),
              FOREIGN KEY(buyer) REFERENCES companies(id)
            )`);

            db.run(`CREATE TABLE products (
              id INTEGER PRIMARY KEY,
              name TEXT,
              unit TEXT,
              netprice REAL,
              grossprice REAL,
              taxRate INTEGER
            )`);

            db.run(`CREATE TABLE invoice_positions (
                invoiceId INTEGER,
                productId INTEGER,
                amount INTEGER,
                discount INTEGER,
                FOREIGN KEY(invoiceId) REFERENCES invoices(id),
                FOREIGN KEY(productId) REFERENCES products(id),
                PRIMARY KEY(invoiceId, productId)
            )`);

          });
          db.close();
        });
      },
      down: function() {
        return new Promise(function(resolve, reject) {
          /* This runs if we decide to rollback. In that case we must revert the `up` function and bring our database to it's initial state */
          let db = new sqlite3.Database("./database/AccountingApp.db");
          db.serialize(function() {
            db.run(`DROP TABLE invoice_positions`);
            db.run(`DROP TABLE invoices`);
            db.run(`DROP TABLE products`);
            db.run(`DROP TABLE users`);
            db.run(`DROP TABLE companies`);
          });
          db.close();
        });
      }
    };