const express = require('express');
const server = express();

server.listen(8213);

var index = 0;
const fs = require('fs');
const url = require('url');
const gbk = require('gbk');
const JSDOM = require('jsdom').JSDOM;
const Segment = require('segment');
let seg = new Segment();
seg.useDefault();

server.use('/getMsg',(req,res)=>{
	console.log(req.query);
	//res.send({ok:1})
	GetUrl(req.query.str,(data)=>{

		//var html = gbk.toString('utf-8',data);

	//	console.log(data)
		//fs.writeFile('yq.html',data);
		//console.log(html)

		let DOM = new JSDOM(data);
		let document = DOM.window.document;

		var myHtml = document.querySelector('.read-content').innerHTML.replace(/<[^>]+>/g,'')
		//console.log(myHtml)
		var arr = seg.doSegment(myHtml);
		//console.log(arr);
		//去掉没用的
		var myarr = [];

		arr.forEach(data=>{
			if(data.p !=2048){
				myarr.push(data.w)
			}
		});
		//计算个数
		/*
			{
				'她':20,
				'呵呵':5
			}
		*/
		var myJson = {};
		//myJson['她']
		//{'她':1}
		myarr.forEach(data=>{
			if(!myJson[data]){
				myJson[data] = 1;
			}
			else{
				myJson[data]++;
			}
		});

		//console.log(myJson)
		//去掉只出现1次的 
		let arr2 = [];
		for(let word in myJson){
			if(myJson[word]<=1){
				continue;
			}
			arr2.push({
				w:word,
				c:myJson[word]
			})
		};

		arr2.sort((json1,json2)=>json2.c-json1.c);
		//console.log(arr2);

		res.send({'need':arr2});
		//console.log(arr2);

		//console.log(myarr);

		//console.log('终于我走出来了')
		//fs.writeFile('iponex.html',data);
		//console.log(str)
	})
})



function GetUrl(sUrl,success){
	index++;
	var urlObj = url.parse(sUrl);
	var http ='';
	if(urlObj.protocol == 'http:'){
		http = require('http');
	}
	else{
		http = require('https');
	}

	let req = http.request({
		'hostname':urlObj.hostname,
		'path':urlObj.path
	},res=>{
		if(res.statusCode == 200){
			//var arr = [];
			var str = '';
			res.on('data',buffer=>{
				//arr.push(buffer);
				str +=buffer;
			});
			res.on('end',()=>{
				//let b = Buffer.concat(arr);

				success && success(str);

			})
		}
		else if(res.statusCode == 302 || res.statusCode == 301){
			console.log(`我是第${index}次重定向`,res.headers.location);
			GetUrl(res.headers.location,success)
		}
		//console.log(res.statusCode,res.headers.location)
		
		
		
	});

	req.end();
	req.on('error',()=>{
		console.log('404了，哥们');
	})
}
server.use(express.static('./'))