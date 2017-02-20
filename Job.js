

module.exports= Job = function(event_name, time_to_expire , priority){
    this.event_name = event_name;
    this.time_to_expire = time_to_expire;
    this.priority= priority || 0;
}