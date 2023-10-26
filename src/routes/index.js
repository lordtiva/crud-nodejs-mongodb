const express = require('express')
const router = express.Router()

const Task = require('../models/task')

router.get('/', async (req, res) => {
  const tasks = await Task.find()
  res.render('index', {
    tasks
  })
})

router.post('/add', async (req, res) => {
  const task = new Task(req.body)
  await task.save()
  res.redirect('/')
})

router.get('/done/:id', async (req, res) => {
  const {id} = req.params
  try {
    const task = await Task.findById(id)
    task.status = !task.status
    await task.save()
    res.redirect('/')
  } catch (error) {
    console.error(error)
    res.status(500).send('Hubo un error al intentar actualizar la tarea')
  }
})

router.get('/delete/:id', async (req, res) => {
  const {id} = req.params
  try {
    await Task.deleteOne({_id: id})
    res.redirect('/')
  } catch (error) {
    console.error(error)
    res.status(500).send('Hubo un error al intentar eliminar la tarea')
  }
})

module.exports = router
