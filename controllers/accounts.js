module.exports = function (app,con,encrypt,decrypt) {

  app.post("/signup", function (req,res) {
    var body = req.body;
    var fullName = body.fullName;
    var password = body.password;
    //password encryption
    var password_data = encrypt(password)
    var salt = password_data.salt;
    var password_hash = password_data.passwordHash;
    //end of encryption
    var email = body.email;
    var phone = body.phoneNumber;
    var accountType = body.accountType;
    var city = body.city;
    var area = body.area;
    var street = body.street;
    var floor = body.floor;
    var building = body.building;
    var des = body.description;
    var userName = spaces(fullName);
    var id = 0;
    try {
      con.connect(function (err) {
        //check Email exist
        con.query('Select email FROM mydb.accounts WHERE email =?',[email],function (err,result,filed) {
          if (result.length === 0) {
            //check UserName exist and generate one
            con.query('select userName FROM mydb.accounts WHERE userName =?',[userName],function (err,result,filed) {
              if (!(result.length === 0)) {
                con.query("SELECT idaccount FROM mydb.accounts ORDER BY idaccount DESC LIMIT 0,1",function(err, result, field){
                id = result[0].idaccount + 1;
                userName +=id;
                let sql = "INSERT INTO accounts (userName, fullName, email, password, phoneNumber,accountType, salt) VALUES ?"
                var values = [
                  [userName, fullName, email, password_hash, phone, accountType, salt ]
                ]
                con.query(sql,[values],function (ree,resault) {
                  if(accountType == "doctor"){
                      con.query('INSERT INTO mydb.location(City, area, street, building, floor, description, doctorid)'+'VALUES(?,?,?,?,?,?,?)',[city, area, street, building, floor, des, id],function (ree,result) {
                      return res.status(200).json({result: userName,id});
                      });
                    }
                  else {
                    return res.status(200).json({result: userName,id});
                  }
              });
            });
          }
              else{
                con.query("SELECT idaccount FROM mydb.accounts ORDER BY idaccount DESC LIMIT 0,1",function(err, result, field){
                id = result[0].idaccount + 1;
                  var sql = "INSERT INTO mydb.accounts (userName, fullName, email, password, phoneNumber, accountType, salt) VALUES ('"+userName+"','"+fullName+"','"+email+"','"+password_hash+"','"+phone+"','"+accountType+"','"+salt+"')";
                  con.query(sql,function (ree,resault) {
                    if(accountType == "doctor"){
                        con.query('INSERT INTO mydb.location(City, area, street, building, floor, description, doctorid)'+'VALUES(?,?,?,?,?,?,?)',[city, area, street, building, floor, des, id],function (ree,result) {
                        return res.status(200).json({result: userName,id});
                        });
                      }
                    else {
                      return res.status(200).json({result: userName,id});
                    }
              });
            });
              }
          });
        }
        else{
            return res.status(200).json({result: "exist"});
        }
      });
    });


  }catch (err) {
      if (err instanceof Errors.BadRequest)
        return res.status(HttpStatus.BAD_REQUEST).send({ message: err.message }); // 400
      if (err instanceof Errors.Forbidden)
        return res.status(HttpStatus.FORBIDDEN).send({ message: err.message }); // 403
      if (err instanceof Errors.NotFound)
        return res.status(HttpStatus.NOT_FOUND).send({ message: err.message }); // 404
      if (err instanceof Errors.UnprocessableEntity)
        return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({ message: err.message }); // 422
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
    }
  });


  app.get("/login",function (req,res) {
    var body = req.body;
    var log = body.log;
    var password = body.password;
    try {
      con.connect(function (err) {
        con.query("SELECT password,salt,idaccount FROM accounts WHERE email=? OR userName=?",[log,log],function (err, result, filed) {
          var salt = result[0].salt;
          passwordData = decrypt(password, salt)
          hash_pass = passwordData.passwordHash;
          if (hash_pass == result[0].password){
            return res.status(200).json({result:1, id:result[0].idaccount, userName: "sha"});
          }
          else {
            return res.status(200).json({result: 0})
          }
        });
      });
    } catch (e) {
      if (err instanceof Errors.BadRequest)
        return res.status(HttpStatus.BAD_REQUEST).send({ message: err.message }); // 400
      if (err instanceof Errors.Forbidden)
        return res.status(HttpStatus.FORBIDDEN).send({ message: err.message }); // 403
      if (err instanceof Errors.NotFound)
        return res.status(HttpStatus.NOT_FOUND).send({ message: err.message }); // 404
      if (err instanceof Errors.UnprocessableEntity)
        return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({ message: err.message }); // 422
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });  }
  });
}
function spaces(substring){
  let name = "";
  for (let i=0; i<substring.length;i++){
    if (substring[i] == " "){
      name+= ".";
    }
    else {
      name+=substring[i];
    }
  }
  return name;
}
