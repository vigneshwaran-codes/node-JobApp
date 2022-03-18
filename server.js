// const express = require('express')
// const { MongoClient } = require('mongodb')
import express from 'express'
import { MongoClient } from 'mongodb'
import bcrypt from 'bcrypt'
import { jobsRouter } from './routes/job.js'
import { jobseekerRouter } from './routes/jobseeker.js'
import { recruiterRouter } from './routes/recruiter.js'

import dotenv from 'dotenv'
dotenv.config()
// config-> loaded in process.env (dotenv)

const app = express()
const PORT = process.env.PORT

// Middleware
app.use(express.json())

export async function createConnection () {
  const MONGO_URL = process.env.MONGO_URI

  const client = new MongoClient(MONGO_URL)

  try {
    await client.connect()
    // getJobSeekerById(client, '3')
    // getJobSeekers(client)
    // getJobs(client)
    // getRecruiter(client)
    return client
  } catch (err) {
    console.log(err)
  }
}

app.use('/jobs', jobsRouter)
app.use('/jobseeker', jobseekerRouter)
app.use('/recruiter', recruiterRouter)

// Home
app.get('/', (request, response) => {
  response.send('Welcome to my App!')
})

app.listen(PORT, () => console.log('The Server is Started', PORT))

async function genPassword (password) {
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  console.log(hashedPassword)
}
genPassword('password@123')
