import Database from 'better-sqlite3';
import fs from 'node:fs';import path from 'node:path';import bcrypt from 'bcryptjs';
const dir=path.join(process.cwd(),'data');fs.mkdirSync(dir,{recursive:true});
const db=new Database(path.join(dir,'store.sqlite'));db.pragma('journal_mode = WAL');
db.exec(`CREATE TABLE IF NOT EXISTS admins(id INTEGER PRIMARY KEY,email TEXT UNIQUE,password_hash TEXT);
CREATE TABLE IF NOT EXISTS products(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT NOT NULL,description TEXT DEFAULT '',category TEXT DEFAULT 'Clothing',collection TEXT DEFAULT 'Essentials',price INTEGER NOT NULL,discount INTEGER DEFAULT 0,image TEXT DEFAULT '',sizes TEXT DEFAULT 'S,M,L,XL',colors TEXT DEFAULT 'Black',stock INTEGER DEFAULT 0,active INTEGER DEFAULT 1,created_at TEXT DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS events(id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT NOT NULL,description TEXT DEFAULT '',event_date TEXT DEFAULT '',location TEXT DEFAULT '',image TEXT DEFAULT '',active INTEGER DEFAULT 1);
CREATE TABLE IF NOT EXISTS coupons(id INTEGER PRIMARY KEY AUTOINCREMENT,code TEXT UNIQUE NOT NULL,kind TEXT DEFAULT 'manual',percent INTEGER NOT NULL,min_spend INTEGER DEFAULT 0,expires_at TEXT DEFAULT '',max_uses INTEGER DEFAULT 1,used_count INTEGER DEFAULT 0,active INTEGER DEFAULT 1,batch TEXT DEFAULT '',created_at TEXT DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS orders(id INTEGER PRIMARY KEY AUTOINCREMENT,reference TEXT UNIQUE,name TEXT,phone TEXT,address TEXT,city TEXT,payment TEXT,items TEXT,subtotal INTEGER,discount INTEGER,shipping INTEGER,total INTEGER,coupon_code TEXT,status TEXT DEFAULT 'Pending',created_at TEXT DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS order_items(id INTEGER PRIMARY KEY AUTOINCREMENT,order_id INTEGER,product_id INTEGER,variant TEXT,quantity INTEGER,unit_price INTEGER);
CREATE TABLE IF NOT EXISTS payment_methods(id INTEGER PRIMARY KEY AUTOINCREMENT,code TEXT UNIQUE NOT NULL,name TEXT NOT NULL,account_name TEXT DEFAULT '',account_number TEXT DEFAULT '',instructions TEXT DEFAULT '',qr_image TEXT DEFAULT '',active INTEGER DEFAULT 1,sort_order INTEGER DEFAULT 0);
CREATE TABLE IF NOT EXISTS settings(key TEXT PRIMARY KEY,value TEXT);`);
db.pragma('busy_timeout = 10000');
const adminEmail=process.env.ADMIN_EMAIL||'admin@seeker.local', adminPassword=process.env.ADMIN_PASSWORD||'ChangeMe123!';
db.prepare('INSERT OR IGNORE INTO admins(email,password_hash) VALUES (?,?)').run(adminEmail,bcrypt.hashSync(adminPassword,12));
if(db.prepare("INSERT OR IGNORE INTO settings(key,value) VALUES('seed_v1','1')").run().changes){
 const add=db.prepare('INSERT INTO products(name,description,category,collection,price,discount,image,sizes,colors,stock) VALUES (?,?,?,?,?,?,?,?,?,?)');
 const products=[['Obscure Hoodie','Oversized heavyweight premium cotton hoodie.','Hoodies','Chapter II',110000,20,'/images/product-hoodie.jpg','S,M,L,XL','Black,Stone',25],['Fragment Tee','Relaxed fit statement t-shirt.','T-Shirts','Essentials',58000,0,'/images/product-tee.jpg','S,M,L,XL','Black,White',40],['Void Jacket','Layered technical streetwear jacket.','Jackets','Chapter II',135000,0,'/images/product-jacket.jpg','M,L,XL','Black',12],['Dusk Cargo Pants','Utility fit cargo trousers.','Pants','Chapter II',92000,15,'/images/product-pants.jpg','S,M,L,XL','Charcoal,Black',18],['Signature Cap','Minimal embroidered signature cap.','Accessories','Essentials',42000,0,'/images/product-cap.jpg','One Size','Black',50],['Afterdark Tee','Limited edition oversized tee.','T-Shirts','Limited Drop',65000,0,'/images/product-tee2.jpg','S,M,L,XL','Black',14]];
 db.transaction(()=>{for(const x of products)add.run(...x);})();
 db.prepare('INSERT INTO events(title,description,event_date,location,image) VALUES (?,?,?,?,?)').run('ART MEETS FASHION','An immersive evening of clothing, culture and art.','2027-04-12','Yangon, Myanmar','/images/event.jpg');
 db.prepare('INSERT INTO coupons(code,kind,percent,min_spend,expires_at,max_uses) VALUES (?,?,?,?,?,?)').run('WELCOME10','manual',10,50000,'',100);
 const ins=db.prepare('INSERT INTO payment_methods(code,name,active,sort_order) VALUES (?,?,?,?)');
 [['COD','Cash on Delivery',1,0],['KBZPAY','KBZPay',0,1],['WAVEPAY','WavePay',0,2],['BANK','Bank Transfer',0,3]].forEach(x=>ins.run(...x));
}
export default db;
