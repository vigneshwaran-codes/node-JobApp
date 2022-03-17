import express from 'express'
import { getJobs, insertJobs, deleteJobsById, updateJobsById, replaceJobsById } from '../db.js'
import { createConnection } from '../server.js'

const router = express.Router()

// Jobs ->(Listed)
router
  .route('/')
  .get(async (request, response) => {
    const client = await createConnection()
    const opening = await getJobs(client, {})
    response.send(opening)
  }).post(async (request, response) => {
    const client = await createConnection()
    const job = request.body
    const jobs = await insertJobs(client, job)
    response.send(jobs)
  }).patch(async (request, response) => {
    const id = request.params.id
    const client = await createConnection()
    const newJob = request.body
    const opening = await updateJobsById(client, +id, newJob)
    response.send(opening)
  }).put(async (request, response) => {
    const id = request.params.id
    const client = await createConnection()
    const newJob = request.body
    const opening = await replaceJobsById(client, +id, newJob)
    response.send(opening)
  })

// DeleteJobsById
router.delete('/:id', async (request, response) => {
  const id = request.params.id
  const client = await createConnection()
  const application = await deleteJobsById(client, +id)
  response.send(application)
})

// Role
router.get('/Role/:search', async (request, response) => {
  const search = request.params.search
  const client = await createConnection()
  const openings = await getJobs(client, {
    Role: { $regex: search, $options: 'i' }
  })
  response.send(openings)
})

export const jobsRouter = router
