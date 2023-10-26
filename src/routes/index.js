const express = require('express')
const router = express.Router()

const Task = require('../models/task')

// root
router.get('/', async (req, res) => {
  const tasks = await Task.find()
  res.render('index', {
    tasks
  })
})

// add
router.post('/add', async (req, res) => {
  const task = new Task(req.body)
  await task.save()
  res.redirect('/')
})

// done
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

// edit
router.get('/edit/:id', async (req, res) => {
  const {id} = req.params
  try {
    const task = await Task.findById(id)
    res.render('edit', {
      task
    })
  } catch (error) {
    console.error(error)
    res.status(500).send('Hubo un error al intentar editar la tarea')
  }
})

router.post('/edit/:id', async (req, res) => {
  const {id} = req.params
  await Task.updateOne({_id: id}, req.body)
  res.redirect('/')
})

// delete
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
