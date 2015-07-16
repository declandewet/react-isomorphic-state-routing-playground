import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  res.sendPayload({
    title: 'Isomorphic State-Based Routing Test',
    meta: {
      description: 'Playing with isomorphic stateful routing.'
    }
  })
})

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
    res.sendPayload({
      user,
      title,
      meta: {
        description: `${user} is a loved member of our community. Why not join him?`
      }
    })
  }, 1000) // simulating long server response
})

router.get('*', (req, res) => {
  res.status(404).sendPayload({
    title: 'Page Not Found',
    meta: {
      description: 'Oops - it seems that page could not be found. Ew :('
    }
  })
})

export default router
