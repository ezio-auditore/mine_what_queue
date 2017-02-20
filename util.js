

var Job = require("./Job");
var fs = require("fs");



exports.getListFromCSV = function(filePath,callback){
    var Jobs = [];
    var data = parseCsv(filePath);
    
        for (var i=1;i<data.length ;i++) {
            Jobs.push(new Job(data[i][0],data[i][1],data[i][2]));
        }
         callback(Jobs);
   
   
};

exports.sortAccordingtoTime = function(Jobs,callback){
  var JobsList = Jobs.sort(function(a,b){
     var diff1 = parseInt(Date.parse(a.time_to_expire.toString())-Date.parse(b.time_to_expire.toString()),10);
     if(diff1>0){
         return 1;
     }
     if(diff1<0){
         return -1;
     }
     return 0;
     
  });
  
callback(JobsList);
};

exports.sortAccordingToPriority = function(Jobs,callback){
    var x ={};
    var i =0;
    while(i < Jobs.length) {
        var key = Jobs[i].time_to_expire;
        
        if (typeof(x[key]) == 'undefined') x[key] = [];
        x[key].push(Jobs[i].event_name);
        i++;
    }
       
       for(var key in x){
           if (x.hasOwnProperty(key)) {
            x[key].sort(function(a, b){return b.priority-a.priority});
  }
       }
        
        callback(x);
    }
    

var  parseCsv = function(filepath){
     var csv = fs.readFileSync(filepath,'UTF-8');
     
     var rows = csv.toString().split('\n');
     var array=[];
  for(var i =0;i<rows.length;i++){
      array.push(rows[i].split(',').map(function(data){
         return data.trim().replace(/['"]+/g, '');
      }));
  }

     return array;
 }
 