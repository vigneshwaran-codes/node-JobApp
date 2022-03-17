import express from 'express'
import { getRecruiter } from '../db.js'
import { createConnection } from '../server.js'

const router = express.Router()

// Recruiter
router.get('/', async (request, response) => {
  const client = await createConnection()
  const recruiter = await getRecruiter(client, {})
  response.send(recruiter)
})

export const recruiterRouter = router
