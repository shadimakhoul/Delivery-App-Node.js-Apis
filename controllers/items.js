module.exports = function (app,con) {
  //add items methode
  app.put("/add-items",function (req,res) {
    var body = req.body
    var itemName = body.itemName;
    var quantity = parseInt(body.quantity);
    var unit = body.unit;
    try {
      con.connect(function (err) {
        con.query("SELECT quantity FROM items WHERE itemName = ?",[itemName],function (err, result, filed) {
          if (!(result.length === 0)){
            quantity = result[0].quantity + quantity ;
            con.query("UPDATE items SET quantity = ? WHERE itemName = ?",[quantity,itemName],function (err, result, filed) {
              console.log(quantity);
              return res.status(200).json({quantity});
            })
          }
          else {
            var values = [
              [itemName,quantity,unit]
            ]
            con.query("INSERT INTO items (itemName, quantity, unit) VALUES ?",[values],function (err, result, filed) {
              return res.status(200).json({quantity});
            });
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
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
    }
  });


  app.get("/get-items",function (req,res) {
    try {
      con.connect(function(err){
        con.query("SELECT * From items",function (err, items, filed) {
          return res.status(200).json({items});
        })
      })
    } catch (e) {
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
  })


  app.put("/edit-items",(req,res)=>{
    var body = req.body;
    var action = body.action
    var itemid = body.itemid
    var itemName = body.itemName
    var unit = body.unit
    try {
      if (action == "update"){
        con.query("UPDATE items SET itemName= ?,unit=? WHERE itemid= ?",[itemName,unit,itemid],(err,result)=>{
          res.status(200).json({result: 1})
        })
      }
      else {
        con.query("DELETE FROM items WHERE itemid=?",[itemid],(err,result)=>{
          res.status(200).json({result: 1})
        });
      }
    } catch (e) {
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


  app.get("/get-itemid",function (req,res) {
    var body = req.body;
    var itemName = body.itemName;
    con.connect(function (err) {
      con.query("SELECT itemid FROM items WHERE itemName=?",[itemName],function (err,result,filed) {
        id = result[0].itemid;
        return res.status(200).json({id})
      })
    })
  })
}
