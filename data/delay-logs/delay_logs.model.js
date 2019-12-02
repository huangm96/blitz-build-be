
const moment = require('moment')
const createdAt = moment().format("LLL")
const updatedAt = moment().format("LLL")
const db = require('../db.config')
module.exports={
    getLogs,
    addLogs,
    editLogs,
    deleteLogs
}
 
function getLogs(id){
    return db("delay_logs").where({id});
}

function addLogs(newLog){
    return db("delay_logs").insert(newLog);
}
function editLogs(id,changes){
  return db("delay_logs").where({id}).update({updatedAt:updatedAt},changes)
}
function deleteLogs(id){
    return db("delay_logs").where({id}).delete()
}