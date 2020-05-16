const express = require('express')
const {spawn}=require('child_process')
const app=express()
const port=3000
app.get('/',(req,res)=>{

// var dataToSend;//for commandline data
var largeDataSet = []; //for json data

//spawn new child process to call the python script
// const python =spawn('python',['script1.py']);//for runing python script
// const python = spawn('python',['script2.py','node.js','python'])//for runing python script while sending commandline arguments
const python =spawn('python',['script3.py'])
//collect data from script
python.stdout.on('data',function(data){
	console.log('Pipe data from script ....');
	// dataToSend=data.toString();
	largeDataSet.push(data)//for getting json data
});
// in close event we are sure that stream from child process is closed
python.on('close',(code)=>{
	console.log(`child process clse all stdio with code ${code}`);
	//send data to browser
	// res.send(dataToSend)
	res.send(largeDataSet.join(""))//for sending json data
});
});
app.listen(port,()=>{
	console.log(`Example app listening on port ${port}!!`)
});