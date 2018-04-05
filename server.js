// var fs=require('fs');

// var users=[{
// first: 'Petro',
// last:'Petrenko'
// },
// {
// first: 'Petrmbddo',
// last:'Petbmmbrenko'
// },
// {
// first: 'mb',
// last:'kuykhjm'
// },
// {
// first: 'ghg',
// last:'hgfh'
// },
// {
// first: 'khlhl',
// last:'hf'
// },
// {
// first: 'fdgj',
// last:'dfg'
// },
// {
// first: 'fgfd',
// last:'dfgfd'
// },
// {
// first: 'ddsff',
// last:'hjk'
// },
// {
// first: 'kjjk',
// last:'Petrejhkhnko'
// },
// {
// first: 'dgd',
// last:'dfgdfgdfh'
// }]
var express=require('express');
var app=express();
app.use(express.static(__dirname));
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.get('/',function(req,res){
	res.sendFile(__dirname+'/index.html')
})


var User=require('./user');
app.post('/send',function(req,res){
	console.log(req.body);

	if(req.body.id){
		User.update({_id:req.body.id},{$set:{name:req.body.name, age:req.body.age, salary:req.body.salary}}, function(err,result){
			console.log(result);
			res.send('update')
		})
	}
	var user1=new User(req.body);
	user1.save(function(err,result){
		if(err)console.log(err);
		console.log(result);
		res.send(result)
	})

})

app.get('/allusers',function(req,res){
	User.find(function(err,result){
		console.log(result);
		res.send(result);
	})
})

app.post('/delete',function(req,res){
	var id=req.body.id;
	User.remove({_id:id},
		function(err,result){
			console.log(result);
			res.send('delete user');
		})
})

// app.post('/send', function(req,res){
// 	console.log(req.body);

// })
// app.get('/getajax', function(req,res){
// 	console.log(req.query);
// 	var p1=!isNaN(req.query.username);
// 	console.log(p1);
// 	var p2=!isNaN(req.query.password);
// 	console.log(p2);
// 	if(p1&&p2){
// 		var result=+req.query.username + +req.query.password;
// 		res.send(result+'');
// 	}
// 		else res.send('Введіть число');

// 	// res.send ('success!');
	
// })
// app.post('/postajax',function(req,res){
// 	console.log(req.body);
// 	res.send('test')
// })


// app.get('/getfile',function(req,res){
// 	fs.readFile('data.json','utf-8',function(err,data){
// 		if(err)
// 			console.log(err);
// 		else
// 			res.send(data);
// 	});
// });

// app.post('/adduser',function(req,res){
// 	console.log(req.body);
// 	var user=req.body;
// 	fs.readFile('data.json','utf-8',function(err,data){
// 		if(err)
// 			console.error(err);
// 		else{
// 			data=JSON.parse(data);
// 			data.push(user);
// 			data=JSON.stringify(data);
// 			fs.writeFile('data.json',data);
// 		}
// 	})
// 	res.send('adduser');
// })

// app.post('/rowindex',function(req,res){
// 	console.log(req.body);
// 	fs.readFile('data.json','utf-8',function(err,data){
// 		if(err) console.error(err);
// 		data=JSON.parse(data);
// 		data.splice(req.body.index,1);
// 		data=JSON.stringify(data);
// 		fs.writeFile('data.json',data);
// 	})
// 	res.send('deleteuser');
// })

// app.post('/send', function(req,res){
// 	console.log(req.body);
// 	// res.send('test');
// 	var text=req.body.prop.toLowerCase();
// 	var newuser=[];
// 	for(var i=0; i<users.length;i++){
// 		var first=users[i].first.toLowerCase();
// 		var last=users[i].last.toLowerCase();
// 		if(first.indexOf(text)>=0 || first.indexOf(text)>=0)
// 			newuser.push(users[i]);
// 	}
// 	// res.send(newuser)
// 	if(text=='')
// 		res.send([])
// 	else
// 		res.send(newuser)
// })

app.listen(process.env.PORT||8080);
console.log('Run Server!');

