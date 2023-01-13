const express = require("express");
const request = require("request");
const bodyparser = require("body-parser");
const promise = require("promise");
const multer = require("multer");
const connect = require("./connections/sqlConnection")
const accounts = require("./controllers/accounts")
const items = require("./controllers/items")
const categorys = require("./controllers/categories")
const orders = require("./controllers/orders")
const setting = require("./controllers/setting")
const cry = require("./controllers/crypto")
const encrypt = cry.encrypt;
const decrypt = cry.decrypt;


app = express();
app.use(express.json())
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use('/uploads', express.static('./uploads'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
      },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const uploadImg = multer({storage: storage, limits: { fileSize: 800 * 600 }})

var con = connect.con

accounts(app,con,encrypt,decrypt)
items(app,con)
categorys(app,con,uploadImg)
orders(app,con)
setting(app,con,encrypt,decrypt)


app.listen("3001", function () {
  console.log("server work on port:3000");
})
