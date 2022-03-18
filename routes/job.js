import express from 'express'
import { getJobs, insertJobs, deleteJobsById, updateJobsById, replaceJobsById } from '../db.js'
import { createConnection } from '../server.js'
import { auth } from '../middleware/auth.js'

const router = express.Router()

// Jobs ->(Listed)
router
  .route('/')
  .get(auth, async (request, response) => {
    const client = await createConnection()
    const opening = await getJobs(client, {})
    response.send(opening)
  }).post(auth, async (request, response) => {
    const client = await createConnection()
    const job = request.body
    const jobs = await insertJobs(client, job)
    response.send(jobs)
  })

// DeleteJobsById
router
  .route('/:id')
  .delete(auth, async (request, response) => {
    const id = request.params.id
    const client = await createConnection()
    const application = await deleteJobsById(client, +id)
    response.send(application)
  }).patch(auth, async (request, response) => {
    const id = request.params.id
    const client = await createConnection()
    const newJob = request.body
    const opening = await updateJobsById(client, +id, newJob)
    response.send(opening)
  }).put(auth, async (request, response) => {
    const id = request.params.id
    const client = await createConnection()
    const newJob = request.body
    const opening = await replaceJobsById(client, +id, newJob)
    response.send(opening)
  })

// Role
router.get('/Role/:search', auth, async (request, response) => {
  const search = request.params.search
  const client = await createConnection()
  const openings = await getJobs(client, {
    Role: { $regex: search, $options: 'i' }
  })
  response.send(openings)
})

export const jobsRouter = router
