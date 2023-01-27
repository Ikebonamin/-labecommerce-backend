-- Active: 1673888414753@@127.0.0.1@3306



-- creating table for users --

CREATE TABLE users (
  id VARCHAR(255) PRIMARY KEY UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);


-- creating table for products --
CREATE TABLE products (
  id VARCHAR(255) PRIMARY KEY UNIQUE NOT NULL,
  category VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  price REAL NOT NULL,
  description VARCHAR(255) ,
  image VARCHAR(255) 

);


CREATE TABLE purchase (

Id TEXT PRIMARY KEY NOT NULL UNIQUE,
buyeriD TEXT NOT NULL,
totalPrice REAL NOT NULL,
created_at TEXT DEFAULT (DATETIME()) NOT NULL,
paid INTEGER DEFAULT 0,
FOREIGN Key (buyerId) REFERENCES users (id)
);


CREATE TABLE purchases_products (
purchases_id TEXT NOT NULL,
products_id TEXT NOT NULL,
quantity INTEGER NOT NULL,
FOREIGN KEY (purchases_id) REFERENCES purchase(id),
FOREIGN KEY (products_id) REFERENCES products(id)
 );

SELECT * FROM users;
SELECT * FROM purchase;
SELECT * FROM products;
SELECT * FROM purchases_products;

