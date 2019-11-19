
const router = require('express').Router();
const Firebaseconfig = require('../Firebaseconfig')
const dbRef = Firebaseconfig.database().ref()
const moment = require('moment')
const key = Date.now()

/* Route /api/auth/:uid/projects/:projectID/tasks  */

//Get all tasks for a project
router.get('/:uid/projects/:projectID/tasks', async (req, res) => {

    let uid = req.params.uid
    let projectID = req.params.projectID

    const tasksRef = dbRef.child(`/${uid}/projects/${projectID}/tasks`)

    tasksRef.on("value", tasksObj => {
        //  console.log(templateObj.val())
        let tasks = tasksObj.val();
        try {
            if (tasks) {
                res.status(200).json(tasks);
            }
        }
        catch (err) {
            res.status(500).json({ message: err });
        }
    })})

// Get tasks by filter 
// router.get('/:uid/projects/:projectID/tasks/:filter', async (req, res) => {
//     let filter = req.params.filter
//     let uid = req.params.uid
//     let projectID = req.params.projectID

//     const tasksRef = dbRef.child(`/${uid}/projects/${projectID}/tasks`);

//     await tasksRef.orderByChild(`/tasks/${filter}`)
//         .on("value", tasksObj => {

//             //  console.log(templateObj.val())

//             let tasks = tasksObj.val()
//             try {
//                 if (tasks) {
//                     res.status(200).json(tasks)
//                 }
//             } catch (err) {
//                 res.status(500).json({
//                     message: err.message
//                 }
//                 )
//             }



//         })

// })
router.put('/:uid/projects/:projectID/tasks/:taskID', async (req, res) => {
    console.log(req.body)
    let uid = req.params.uid
    let updates = req.body  
    let projectID = req.params.projectID
    let taskID = req.params.taskID
    let tasksRef =  dbRef.child(`/${uid}/projects/${projectID}`).child('/tasks/').child(`${taskID}`)
    let taskRef =  dbRef.child(`/${uid}/tasks/${taskID}/`)

    tasksRef.update(updates).then(
    tasksRef.update({lastUpdated:moment().format('LLL')}))

     taskRef.update(updates)
     taskRef.update({lastUpdated:moment().format('LLL')})
   taskRef.once("value",updatedTasks =>{return updatedTasks})
   .then(tasksRef.once("value",updateTasks=>{res.status(200).json(updateTasks.val())}))
   .catch(error =>{ res.status(500).json(error.message)})
})
// Get all tasks for all projects for user

router.get('/:uid/tasks', async (req, res) => {

    let uid = req.params.uid


    const tasksRef = dbRef.child(`/${uid}/tasks`).orderByChild('task_name').on("value", tasksObj => {
        let tasks = tasksObj.val()
try {if (tasks) {
                res.status(200).json(tasks)     
            }
            } catch
               (err) {res.status(500).json(
                    {
                        message: err.message
                    })}})})
router.get('/:uid/projects/:projectID/tasks', async (req, res) => {

    let uid = req.params.uid
    let projectID = req.params.projectID

    const tasksRef = dbRef.child(`/${uid}/projects/${projectID}/tasks`).orderByChild('/id');

    await tasksRef.once("value", tasksObj => {
        console.log(tasksObj.val())
        //  console.log(templateObj.val())

        let tasks = tasksObj.val()
        try {if (tasks) 
            { res.status(200).json(tasks)}
       } catch
    (err) {
            res.status(500).json({message: err.message})
        }



    })

})

router.post('/:uid/projects/:projectID/tasks', async (req, res) => {

    let body = req.body
    let uid = req.params.uid
    let projectID = req.params.projectID
    let task_name = body.task_name
    let due_date = req.body.due_date
    let task_description = req.body.task_description
  
     let isComplete = false
     let createdAT = moment().format("LLL")
     let lastUpdated = moment().format("LLL")
     let key = Date.now()
     if(projectID,task_name,due_date){
    let newDataRef = await dbRef.child(`/${uid}/projects/${projectID}/tasks`).child(`${key}`).set({
             taskID:key,
            due_date:due_date,
            projectID: projectID,
            task_description: task_description,
            task_name: task_name,
            isComplete:  isComplete,
            lastUpdated:lastUpdated,
            createdAT:createdAT
        })
    dbRef.child(`/${uid}/projects/${projectID}/tasks`).once("value", tasksObj => {

        let tasks = tasksObj.val()
        let keys = tasksObj.key
        dbRef.child(`/${uid}`).child(`${keys}`).set(tasks)
        try {
            if (tasks) {
                res.status(201).json({ message: `Task createdAT: ${moment().format('LLL')}`, tasksObj: tasksObj, })
                dbRef.child(`/${uid}/projects/${projectID}/tasks`).orderByChild(`key`)
            }


        } catch (err) { res.status(500).json({ message: err.message }) }
    })
    .catch(err =>{res.status(500).json(err.message)})
}else(err=>{res.status(400).json({error:`${err}`+'Please Check Your Inputs'})})
})

//Delete Tasks

router.delete('/:uid/projects/:projectID/tasks/:taskID', async (req, res) => {
    let uid = req.params.uid
    let body = req.body

    let projectID = req.params.projectID
    let taskID = req.params.taskID
    let tasksRef = dbRef.child(`/${uid}/projects/${projectID}/tasks/${taskID}`)
    let taskRef = dbRef.child(`/${uid}/tasks/${taskID}`)


      
        //  let updates= {...body,lastUpdated}
    tasksRef.remove()
    taskRef.remove()
        .then(delObj => {
            res.status(200).json({ message: `${taskID} deleted ${moment().format('LLL')}`, delObj })
        })
})

=======
const router = require('express').Router()
const Firebaseconfig = require('../Firebaseconfig')
const dbRef = Firebaseconfig.database()
const moment = require('moment')
  

// api/auth/:uid/projects

router.get('/tasks', async (req, res,next) => {
    let uid = req.params.uid
    let projectID = req.params.projectID
    const tasksRef = dbRef.ref(`${uid}/projects/`).child(`/${projectID}/tasks/`);
    await tasksRef.on("value", tasksObj => {
       let tasks = tasksObj.val()
  try { 
       if (tasks) {
           res.status(200).json(tasks)}
        } 
        catch(err) {
            res.status(500).json({message: err.message})}})})


           


router.post('/:projectID/tasks',async(req,res)=>{
    let uid = req.header.uid
    let projectID = req.params.projectID
    let key = Date.now(moment().format('LT'))
    let body = {
           key:key,
        due_date:req.body.due_date,
        isComplete:false,
        projectID:req.params.projectID,
        task_description:req.body.task_description,
        task_name:req.body.task_name,
        createdAt:moment().format('LLL'),
        lastUpdated:moment().format('LLL')
        
              }
  


    if(body){
  
     Firebaseconfig.database().ref(`${uid}/projects/${projectID}`).child('tasks').child(key).set(body)
      .then(response =>{console.log(response)})
      .then(Firebaseconfig.database().ref(`${uid}/projects`).child('tasks').child(key).set(body))
     
   .then( res.status(201).json({message:body}))
    }else{res.status(400).json({message:'Please Make Sure All Fields Are Entered'})}


})
router.put('/:projectID/tasks/:taskID', async (req, res,next) => {

    let uid = req.params.uid
    let updates = req.body  
    let projectID = req.params.projectID
    let taskID = req.params.taskID
    let tasksRef =  dbRef.child(`/${uid}/projects/${projectID}`).child('/tasks/').child(`${taskID}`)
    let taskRef =  dbRef.child(`/${uid}/tasks/${taskID}/`)

    tasksRef.update(updates);
    tasksRef.update({lastUpdated:moment().format('LLL')});

     taskRef.update(updates);
     taskRef.update({lastUpdated:moment().format('LLL')});
   taskRef.once("value",updatedTasks =>{return updatedTasks})
   .then(tasksRef.once("value",updateTasks=>{res.status(200).json(updateTasks.val())}))
   .catch(error =>{ res.status(500).json(error.message)})
})
router.delete('/:projectID/tasks/:taskID', async (req, res) => {
    let uid = req.params.uid
   let taskID = req.params.taskID

    let projectID = req.params.projectID

     let tasksRef =await dbRef.ref(`/${uid}/projects/`).child(`${projectID}/tasks/${taskID}`).remove(onComplete=>{console.log('FINISHED')})
    let taskRef =await dbRef.ref(`/${uid}/tasks/`).child(`${taskID}`).remove(onComplete=>{console.log('FINISHED')})


      
  
  if(!taskRef || !tasksRef){
  return  res.status(200).json({message:'deleted'})
  }
    return (err)=>{err.message},next()
    
})  

module.exports = router