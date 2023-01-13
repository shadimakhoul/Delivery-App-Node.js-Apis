module.exports = function (app,con) {
  //done on server without wast categories
  app.post("/waste-category",(req,res)=>{
    var body = req.body;
    var categories = body.categories;
    var type = body.type;
    var desc = body.desc;
    var ctgid = categories.map(function (el){return el.ctgid});
    con.query("select * from itm_ctg where categoryid IN (?) order by iditm_ctg ",[ctgid],(err,result)=>{

      //need to take care of qunatity of each category...

      // console.log(result);
      // for (var i = 0; i<categories.length; i++){
      //   if (categories[i].quantity > 1){
      //     temp = result.map(function (el) { if (categories[i]) el.categoryid })
      //   }
      //   console.log(temp);
      // }

      s = result.map(function (el) { return el.itemid});
      s.sort();
      console.log(s);
      var i = 0;
      amount = 1;
      amounts = []
      var len = s.length;
      console.log(len);
      while (i < len-1) {
        if (s[i] == s[i+1]){
          amount++;
          i++;
        }
        else {
          amounts.push({itmid: s[i], amount: amount});
          amount = 1;
          i++;
        }
      }
      if (s[len-2] != s[len-1]){
        amounts.push({itmid: s[len-1], amount: 1});
      }
      console.log(amounts);
      con.query("INSERT INTO waste (type,description,time) VALUES ?",[[[type,desc,new Date]]],(err,result)=>{
        return res.json({result});
      });
    })
  })

  //this must be a one direction methode that means u can't edit it
  app.put("/waste-items",(req,res)=>{//on server
    var body = req.body;
    var items = body.items;
    var type = body.type;
    var desc = body.desc;
    var totalprice = 0;
    var wasteid;
    for (var i = 0; i<items.length; i++){
      totalprice += items[i].cost;
    }
    con.query("begin",(err,result)=>{
      if (err){
        return res.json(err.message);
      }
      con.query("INSERT INTO waste (type,description,time) VALUES ?",[[[type,desc,new Date]]],(err,result)=>{
        if(err){
          return res.json(err.message);
        }
        wasteid = result.insertId;
        var elemnts = []
        for (var i = 0; i<items.length; i++){
          var sta = [];
          sta.push(wasteid);
          sta.push(items[i].itmid);
          sta.push(items[i].quantity);
          sta.push(items[i].cost);
          elemnts.push(sta);
        }
        con.query("INSERT INTO itm_wst (wasteid, itemid, amount, cost) VALUES ?",[elemnts],(err,result)=>{
          if(err){
            return res.json(err.message);
          }
          con.query("update items inner join itm_wst on items.itemid = itm_wst.itemid set items.quantity = (items.quantity - itm_wst.amount) WHERE itm_wst.wasteid = ? ",wasteid,(err,result)=>{
            if (err){
              con.query("rollback",(err,result)=>{
                if(err){
                  return res.json(err.message)
                }
                //means that there is no enough amounts to waste
                return res.json({result:0});
              })
            }
            else {
              con.query("commit",(err,result)=>{
                if(err){
                  return res.json(err.message)
                }
                //means the waste proccess done well
                return res.json({result:1})
              });
            }
          });
        });
      });
    });
  });


  app.get("/get-waste",(req,res)=>{//on server
    con.query("SELECT * FROM waste",(err,result)=>{
      return res.json(result);
    });
  });


  app.get("/get-waste-info/:wasteid",(req,res)=>{//on server
    var wasteid = req.params.wasteid;
    con.query("SELECT (amount * cost) as costs,amount,cost,itemName FROM itm_wst inner join items on items.itemid = itm_wst.itemid WHERE wasteid = ?",wasteid,(err,wasteInfo)=>{
      var bill = 0;
      for (var i=0;i<wasteInfo.length;i++){
          bill += wasteInfo[i].costs;
          delete wasteInfo[i]["costs"]
      }
      return res.json({totalprice: bill, wasteInfo})
    })
  })

}
