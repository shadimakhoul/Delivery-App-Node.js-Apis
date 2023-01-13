const crypto = require('crypto');
var genRandomString=function(length){
    return crypto.randomBytes(Math.ceil(length/2))
    .toString('hex') //convert to hexa format
    .slice(0,length);//return the required number of characters
};


var sha512=function(password,salt){
    var hash=crypto.createHmac('sha512',salt);
    hash.update(password);
    var value=hash.digest('hex');
    return{
        salt:salt,
        passwordHash:value
    };
};


module.exports = {
  encrypt: function saltHashPassword(userPassword){
      var salt=genRandomString(16);
      var passwordData=sha512(userPassword,salt);
      return passwordData;
  },

  decrypt: function hashUserPassword(user_password,salt){
      var passwordData=sha512(user_password,salt);
      return passwordData;
  }
}
