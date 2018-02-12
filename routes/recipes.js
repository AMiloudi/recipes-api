const router = require('express').Router()
const { Recipe } = require('../models')

router.get('/recipes', (req, res, next) => {
  Recipe.find()
  // Newest recipes first
  .sort({ createdAt: -1 })
  .then((recipes) => res.json(recipes))
  .catch((error) => next(error))
})

.get('/recipes/:id', (req, res, next) => {
  const id = req.params.id
  Recipe.findById(id)
  .then((recipe) => {
    if (!recipe) { return next() }
    res.json(recipe)
  })
  .catch((error) => next(error))
})

.post('/recipes', (req, res, next) => {
  let newRecipe = req.body

  Recipe.create(newRecipe)
  .then((recipe) => res.json(recipe))
  .catch((error) => next(error))
})

.put('/recipes/:id', (req, res, next) => {
  const id = req.params.id
  Recipe.findById(id)
  .then((recipe) => {
    if (!recipe) { return next() }

    const newData = req.body

    recipe.update(newData)
    .then((updatedRecipe) => {
      res.json(updatedRecipe)
    })
    .catch((error) => next(error))
  })
  .catch((error) => next(error))
})

.put('/recipes/:id', (req, res, next) => {
  const id = req.params.id
  const updatedRecipe = req.body

  Recipe.findByIdAndUpdate(id, { $set: updatedRecipe }, { new: true })
    .then((recipe) => res.json(recipe))
    .catch((error) => next(error))
})

.patch('/recipes/:id', (req, res, next) => {
   const id = req.params.id
   const patchForRecipe = req.body

   Recipe.findById(id)
     .then((recipe) => {
       if (!recipe) { return next() }

       const updatedRecipe = { ...recipe, ...patchForRecipe }

       Recipe.findByIdAndUpdate(id, { $set: updatedRecipe }, { new: true })
         .then((recipe) => res.json(recipe))
         .catch((error) => next(error))
     })
     .catch((error) => next(error))
 })
 .delete('/recipes/:id', (req, res, next) => {
   const id = req.params.id
   Recipe.findByIdAndRemove(id)
     .then(() => {
       res.status = 200
       res.json({
         message: 'Removed',
         _id: id
       })
     })
     .catch((error) => next(error))
 })

module.exports = router
