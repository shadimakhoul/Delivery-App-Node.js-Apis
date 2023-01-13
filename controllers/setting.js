module.exports = (app,con,encrypt,decrypt)=>{
  app.get("/setting/:id",(req,res)=>{
    var id = req.params.id;
    var user_details = []
    con.connect((err)=>{
      con.query("SELECT email,fullName,phoneNumber,accountType FROM accounts where idaccount = ?",id,(err,result)=>{
        user_details.push({email : result[0].email, fullName:result[0].fullName})
        if (result[0].accountType == "doctor"){
          con.query("SELECT * FROM location WHERE doctorid = ?",id,(err,result)=>{
            loc = result[0]
            user_details.push({city: loc.City, area: loc.street, building: loc.building, floor: loc.floor, description: loc.description});

            return res.json({user_details})
          })
        }
        else {
          return res.json({user_details})
        }
      })
  })
  })


  app.put("/setting-update/:id",(req,res)=>{
    var id = req.params.id;
    var body = req.body;
    var new_name = body.new_name;
    var new_email = body.new_email;
    var new_phone = body.new_phone;
    var values = [new_name,new_email,new_phone,id]
    try {
      con.connect((err)=>{
        con.query("UPDATE mydb.accounts SET fullName = ?, email = ?, phoneNumber = ? WHERE idaccount = ?",values,(ree,result)=>{
          if (ree){
            //email is already exist
            res.json({result:0})
          }
          //update done well
          res.json({result:1})
        })
      })
    } catch (err) {
      if (err instanceof Errors.BadRequest)
        return res.status(HttpStatus.BAD_REQUEST).send({ message: err.message }); // 400
      if (err instanceof Errors.Forbidden)
        return res.status(HttpStatus.FORBIDDEN).send({ message: err.message }); // 403
      if (err instanceof Errors.NotFound)
        return res.status(HttpStatus.NOT_FOUND).send({ message: err.message }); // 404
      if (err instanceof Errors.UnprocessableEntity)
        return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({ message: err.message }); // 422
      if(err instanceof Errors.Duplicate_entry)
        return res.status(HttpStatus.Duplicate_entry).send({ message: err.message });
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
    }

  })


  app.put("/setting-update/password/:id",(req,res)=>{
    var id = req.params.id;
    var body = req.body;
    var old_password = body.old_password;
    var new_password = body.new_password;
    con.connect((err)=>{
      con.query("SELECT password,salt FROM accounts where idaccount = ?",id,(err,result)=>{
        console.log("as",result);
        salt = result[0].salt;
        password_data = decrypt(old_password,salt);
        //if old password is right edit it else return 0
        if (password_data.passwordHash == result[0].password){
          var new_password_data = encrypt(new_password)
          var new_salt = new_password_data.salt;
          var password_hash = new_password_data.passwordHash;
          con.query("UPDATE mydb.accounts SET password = ?, salt = ? WHERE idaccount = ?",[password_hash,new_salt,id],(ree,result)=>{
            return res.status(200).json({result:1})
          })
        }
        else {
          return res.status(200).json({result:0})
        }
      })
    })
  })
}
