const fs=require('fs');
const url=require('url');
const gbk=require('gbk');
//const JSDOM=require('jsdom').JSDOM;
const cheerio = require('cheerio');
const express=require('express');
const server=express();

server.listen(8230);


server.use('/getMsg',(req,res)=>{
	console.log(req.query);
	res.send({ok:1});
});

server.use(express.static('./'))

