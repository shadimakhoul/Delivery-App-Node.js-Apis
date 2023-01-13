module.exports = function (app,con) {
  app.post("/add-orders",(req,res)=>{
    var body = req.body;
    var category = body.ctg;
    var id = body.custid;
    var customerid = parseInt(id)
    var newLocation = body.nLoc;
    var dateTime = body.dateTime;//Trash for Ruba
    var status = 0 //the order have been registed only
    var t = 0
    values = [
      [customerid,new Date(),status,newLocation]
    ]
    try {
      con.query("INSERT INTO mydb.orders (customerId,time,status,newLocation) VALUES ?",[values],(err,result)=>{
        con.query("SELECT idorder FROM orders ORDER BY idorder DESC LIMIT 0,1",(err,orderid)=>{
          console.log(orderid);
          var elemnts = []
          var ordid = orderid[0].idorder
          for (var i=0; i<category.length; i++){
            sta = []
            sta.push(ordid)
            sta.push(parseInt(category[i].id))
            sta.push(category[i].amount)
            elemnts.push(sta);
          }
          con.query("INSERT INTO ord_ctg (orderid,categoryid,amount) VALUES ?",[elemnts],(err,result)=>{
              var query = "call sumpro("+ordid+",@price);"
              con.query(query,(err,result)=>{
                con.query("INSERT INTO bills (orderid,totalprice) VALUES ("+ordid+",@price)",(err,result)=>{
                  res.json({result:1})
              });
            });
          });
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


  //get all the orders that customer take it
  app.get("/get-cus-orders/:id",(req,res)=>{
    var id = req.params.id;
    var full_order = [];
    try {
        con.query("SELECT * FROM orders where customerId = ?",id,(err,ordres)=>{
          for (var i=0; i<ordres.length; i++){
            full_order.push({status : ordres[i].status,location : ordres[i].newLocation, time : ordres[i].time})
          }
          var orders = ordres.map(function (el) {return el.idorder;});
          con.query("SELECT categoryName,orderid,amount FROM category inner join ord_ctg on category.categoryid = ord_ctg.categoryid where ord_ctg.orderid IN ("+[con.escape(orders)]+")",(err,result)=>{
            var category = []
            for (var i=0; i<orders.length;i++){
              category.push(result.filter(function (el) {return el.orderid == orders[i]}));
            }
            var temp1 = []
            var temp2 = []
            for (var i=0; i<category.length;i++){
              var temp = []
              temp1 = category[i].map(function (el) {return el.categoryName;});
              temp2 = category[i].map(function (el) {return el.amount;});
              for (var j=0; j<temp1.length;j++){
                temp.push({name : temp1[j] , amount : temp2[j]})
              }
              full_order[i]["ctg"] = temp;
            }
            res.json({full_order})
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
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });    }
  })
}
