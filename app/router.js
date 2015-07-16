import express from 'express'

const router = express.Router()

router.get('/users/:id', (req, res) => {
  setTimeout(() => {
    let user, title
    let id = parseInt(req.params.id, 10)
    if (id === 1) {
      user = 'Bob'
    } else if (id === 2) {
      user = 'Batman'
    } else {
      user = 'NotFound'
    }
    title = `${user}'s Profile`
    res.sendPayload({ user, title })
  }, 1000) // simulating long server response
})

export default router
