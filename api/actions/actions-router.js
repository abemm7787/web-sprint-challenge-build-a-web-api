const router = require('express').Router()
const actions = require('./actions-model');
const {vaildateActionId , validateActions} = require("./actions-middlware")

router.get('/', (req, res) => { 
      actions.get().then(actions => { res.json(actions)
    }) .catch (err => {
        res.send(err).json
    })
})


router.get('/:id', vaildateActionId, (req, res, next) => {
    res.status(200).json(req.action)
  })


router.post('/', validateActions,(req, res, next) => {
    actions.insert(req.body)
    .then(vaild => {
      res.status(200).json(vaild)
    })
    .catch(next)
})


router.put('/:id', vaildateActionId , validateActions,(req, res, next) => { //async??
  
    actions.update(req.params.id, req.body)
    .then(vaild => {
      res.status(200).json(vaild)
    })
    .catch(next)
    
})

router.delete('/:id', (req, res, next) => {

    actions.remove(req.params.id)
    .then(project =>{
        if(project) {
            res.status(200).json({message: `Action deleted: ${req.params.id} `})
        } else {
            res.status(404).json('Action is not longer with us')
        }
    })
    .catch(next)
})






module.exports = router