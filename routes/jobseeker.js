import express from 'express'
import { getJobSeekers, getJobSeekerById } from '../db.js'
import { createConnection } from '../server.js'
import { auth } from '../middleware/auth.js'

const router = express.Router()

// Jobseeker
router.get('/', auth, async (request, response) => {
  const client = await createConnection()
  const applications = await getJobSeekers(client)
  response.send(applications)
})
router.get('/:id', auth, async (request, response) => {
  const id = request.params.id
  const client = await createConnection()
  const application = await getJobSeekerById(client, +id)
  response.send(application)
})

export const jobseekerRouter = router
