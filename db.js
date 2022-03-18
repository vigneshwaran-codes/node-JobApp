// async function insertJobSeeker (client, jobseeker) {
//   const result = await client.connect()
//   client.db('job-app').collection('jobseeker').insertOne([
//     {
//       id: '3',
//       'Full-name': 'micheal',
//       email: 'micheal@mail.com',
//       phone_no: '9000090000',
//       Degree: 'B.E',
//       Specialisation: 'ECE',
//       Experience: 'Fresher',
//       Skill: 'MERN Stack',
//       Location: 'Bangalore',
//       Resume_URL: 'resume@google.drive/url',
//       Linkedin_URL: 'www.linkedin.com/micheal',
//       Work_type: 'Full-Time',
//       Description: "Hi, i'm Micheal interested in Development, i have skillsets MERN Stack.I had done real time-projects,Looking forward for good opportunity"
//     }])
//   console.log('Inserted Successfully', result)
// }

// Insert Job
export async function insertJobs (client, job) {
  const result = await client
    .db('job-app')
    .collection('jobs')
    .insertMany(job)
  console.log('Inserted Successfully', result)
  return result
}

export async function insertUser (client, user) {
  const result = await client
    .db('job-app')
    .collection('users')
    .insertOne(user)
  console.log('Inserted Successfully', result)
  return result
}

// DeleteJobsById
export async function deleteJobsById (client, id) {
  const result = await client
    .db('job-app')
    .collection('jobs')
    .deleteOne({ id: id })
  console.log('Deleted Successfully', result)
  return result
}

// UpdateJobsById
export async function updateJobsById (client, id, newJob) {
  const result = await client
    .db('job-app')
    .collection('jobs')
    .UpdateOne({ id: id }, { $set: newJob })
  console.log('Successfully connected', result)
  return result
}

// get jobseekerById
export async function getJobSeekerById (client, id) {
  const result = await client
    .db('job-app')
    .collection('jobseeker')
    .findOne({ id: id })
  console.log('Successfully connected', result)
  return result
}

// get jobseeker
export async function getJobSeekers (client) {
  const result = await client
    .db('job-app')
    .collection('jobseeker')
    .find({})
    .toArray()
  console.log('Successfully connected', result)
  return result
}

// put
export async function replaceJobsById (client, id, newJob) {
  const result = await client
    .db('job-app')
    .collection('jobs')
    .replaceOne({ id: id }, { $set: newJob })
  console.log('Successfully Put', result)
  return result
}
// get Recruiter
export async function getRecruiter (client) {
  const result = await client
    .db('job-app')
    .collection('recruiter')
    .find({})
    .toArray()
  console.log('Successfully Connected', result)
  return result
}

// get Jobs
export async function getJobs (client) {
  const result = await client
    .db('job-app')
    .collection('jobs')
    .find({})
    .toArray()
  console.log('Successfully Connected', result)
  return result
}

export async function getUsers (client) {
  const result = await client
    .db('job-app')
    .collection('users')
    .find({})
    .toArray()
  console.log('Successfully Connected', result)
  return result
}

export async function getUser (client, filter) {
  const result = await client
    .db('job-app')
    .collection('users')
    .findOne(filter)
  console.log('Successfully Connected', result)
  return result
}
