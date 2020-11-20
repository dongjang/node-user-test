const exp = require('express');
const dbInfo = require('./db-config');
const oracleDb = require('oracledb');
const { STMT_TYPE_CALL, CQN_OPCODE_ALL_ROWS } = require('oracledb');
const { json } = require('express');
const port = 80;
var server = exp();

server.listen(port,function(){
    console.log('server started ${port} port');
})


var getNodeTests = async function(){
    var con = await oracleDb.getConnection(dbInfo);
    var sql = 'select * from node_test';
   var result = await con.execute(sql);

   var jsonArr=[];
   for(var i=0;i<result.rows.length;i++){
       var row = result.rows[i];
       var nt = {};
       for(var j=0;j<result.metaData.length;j++){
       var md = result.metaData[j];
       nt[md.name] = row[j];
       }
       jsonArr.push(nt);
       
   }
   return jsonArr;
};

server.get('/nodetests',function(req,res,next){
   var jsonArr =  await getNodeTests(req.query);
   res.json(jsonArr);
})

server.get('/views/*',function(req,res){
    console.log(__dirname);
    console.log(req.url);
})

server.listen(port,function(){
    console.log('server started ${port} port');
})