// const express = require('express')
import express from 'express'
// const { MongoClient } = require('mongodb')
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()
// config-> loaded in process.env (dotenv)

const app = express()
const PORT = process.env.PORT

async function createConnection () {
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

// async function insertJobSeeker (client, jobseeker) {
//   const result = await client.connect()

//   // client.db('job-app').collection('jobseeker').insertOne([
//   //   {
//   //     id: '3',
//   //     'Full-name': 'micheal',
//   //     email: 'micheal@mail.com',
//   //     phone_no: '9000090000',
//   //     Degree: 'B.E',
//   //     Specialisation: 'ECE',
//   //     Experience: 'Fresher',
//   //     Skill: 'MERN Stack',
//   //     Location: 'Bangalore',
//   //     Resume_URL: 'resume@google.drive/url',
//   //     Linkedin_URL: 'www.linkedin.com/micheal',
//   //     Work_type: 'Full-Time',
//   //     Description: "Hi, i'm Micheal interested in Development, i have skillsets MERN Stack.I had done real time-projects,Looking forward for good opportunity"
//   //   }])
//   console.log('Inserted Successfully', result)
// }

async function getJobSeekerById (client, id) {
  const result = await client
    .db('job-app')
    .collection('jobseeker')
    .findOne({ id: id })
  console.log('Successfully connected', result)
}

async function getJobSeekers (client) {
  const result = await client
    .db('job-app')
    .collection('jobseeker')
    .find({})
    .toArray()
  console.log('Successfully connected', result)
  return result
}

async function getRecruiter (client) {
  const result = await client
    .db('job-app')
    .collection('recruiter')
    .find({})
    .toArray()
  console.log('Successfully Connected', result)
  return result
}

async function getJobs (client) {
  const result = await client
    .db('job-app')
    .collection('jobs')
    .find({})
    .toArray()
  console.log('Successfully Connected', result)
  return result
}

createConnection()

// Home
app.get('/', (request, response) => {
  response.send('Welcome to my App!')
})

app.listen(PORT, () => console.log('The Server is Started', PORT))

// Jobs ->(Listed)
app.get('/jobs', async (request, response) => {
  const client = await createConnection()
  const opening = await getJobs(client)
  response.send(opening)
})

// Role
app.get('/jobs/Role/:search', async (request, response) => {
  const search = request.params.search
  const client = await createConnection()
  const openings = await getJobs(client, {
    Role: { $regex: search, $options: 'i' }
  })
  response.send(openings)
})

// Job seeker
app.get('/jobseeker', async (request, response) => {
  const client = await createConnection()
  const applications = await getJobSeekers(client)
  response.send(applications)
})

app.get('/jobseeker/:id', async (request, response) => {
  const id = request.params.id
  const client = await createConnection()
  const application = await getJobSeekerById(client, +id)
  response.send(application)
})
// Recruiter
app.get('/recruiter', async (request, response) => {
  const client = await createConnection()
  const recruiter = await getRecruiter(client)
  response.send(recruiter)
})
