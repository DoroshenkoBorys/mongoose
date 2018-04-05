var mongoose=require('mongoose')
mongoose.connect('mongodb://MrDoroshenko:hardcore4me@ds129156.mlab.com:29156/mydb')
console.log('mongodb connect...');
module.exports=mongoose;