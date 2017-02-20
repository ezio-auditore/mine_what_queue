var util = require("./util");

 util.getListFromCSV(process.argv[2],function(data){
     util.sortAccordingtoTime(data,function(Jobs){
         util.sortAccordingToPriority(Jobs,function(finalJobs){
             var date = new Date(process.argv[3]);
            for(key in finalJobs){
                setTimeout(doJob,dateDiff(new Date(key),date),finalJobs[key],key);
            }
         });
     });
     
 });

function dateDiff(date1,date2){
    return (Date.parse(date1)-Date.parse(date2));
}

function doJob(event,time){
    event.forEach(function(data){
    console.log("Current time :["+ new Date(time).toLocaleString() +" ] , Event " + data + " Processed");
    });

}