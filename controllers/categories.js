module.exports = function (app,con,uploadImg){
  //methode to add category
  app.post("/add-categories",uploadImg.single('image'),function (req,res) {
    var body = req.body;
    var categoryName = body.categoryName;
    var price = body.price;
    var desc = body.description;
    var isFavorit = body.isFavorit;
    let items1 = body.items;
    let items = JSON.parse(items1);
    let image = "http://localhost:3000/" + req.file.path;
    var arr = items.map(function (el) { return el.itemName; });
    try {
      con.connect(function (err) {
        //check if category already exist
        con.query("SELECT categoryid FROM category where categoryName = ?",[categoryName],function (err,result,field) {
          if (result.length === 0){
            var values = [
            [categoryName,price]
            ]
            console.log(values);
            //insert the category
            con.query("INSERT INTO category (categoryName, price) VALUES ?",[values],function (err,result,field) {
              //INSERT the items to the New category at the connection table
              con.query("SELECT categoryid FROM category ORDER BY categoryid DESC LIMIT 0,1",function (err,cat,field) {
                var categoryid = cat[0].categoryid;
                con.query("SELECT itemid FROM items WHERE itemName IN ("+con.escape(arr)+")",function (err,result,filed) {
                  console.log(result);
                  var ids = []
                  var elemnts = []
                  var len = result.length;
                  for (var i=0 ; i<len; i++){
                    ids = []
                    ids.push(result[i].itemid)
                    ids.push(categoryid)
                    ids.push(items[i].quantity)
                    elemnts.push(ids);
                  }
                  con.query("INSERT INTO itm_ctg (itemid,categoryid,quantity) VALUES ?",[elemnts],function (err,result5,filed) {
                    return res.status(200).json({result5})
                    })
                });
              })
            })
          }
          else {
            return res.status(200).json({result: 0});
          }
        });
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


  app.get("/get-categorys",(req,res)=>{
    try {
      //select the categorys that has an items
      con.query("SELECT DISTINCT categoryid FROM itm_ctg ORDER BY categoryid",(err,result)=>{
        var categorys = result.map(function (el) { return el.categoryid; });
        //delete categorys with no items
        con.query("DELETE FROM category WHERE categoryid NOT IN ("+[con.escape(categorys)]+")",(err,result)=>{
          con.query("SELECT * FROM category",(err,result)=>{
            for (var i=0; i<result.length; i++){
              let num = result[i].categoryid
              result[i].categoryid = num.toString();
            }
            res.json({result});
          })
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

  app.put("/edit-categories/:id",uploadImg.single('image'),(req,res)=>{
    var id = req.params.id;
    var body = req.body;
    var categoryName = body.categoryName;
    var price = body.price;
    var desc = body.description;
    var isFavorit = body.isFavorit;
    let items1 = body.items;
    let items = JSON.parse(items1);
    let image = "http://localhost:3000/" + req.file.path;
    var categoryid = 0
    var arr = items.map(function (el) { return el.itemName; });
    con.connect((err)=>{
      con.query("UPLOAD categories SET categoryName = ?, price = ? WHERE categoryid = ?",[categoryName,price,id],(err,result)=>{
        
      })
    })

  })

}
