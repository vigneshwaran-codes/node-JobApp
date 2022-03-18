import express from 'express'
import { createConnection } from '../server.js'
import { getUser, getUsers, insertUser } from '../db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { auth } from '../middleware/auth.js'

const router = express.Router()

router
  .route('/signup')
  .post(async (request, response) => {
    const { username, password } = request.body
    const client = await createConnection()
    const hashedPassword = await genPassword(password)
    const newUser = await insertUser(client, { username: username, password: hashedPassword })
    console.log(hashedPassword, newUser)
    response.send(newUser)
  })

router.get('/candidate', auth, async (request, response) => {
  const client = await createConnection()
  const users = await getUsers(client)
  response.send(users)
})

router.post('/login', async (request, response) => {
  const { username, password } = request.body
  const client = await createConnection()
  const user = await getUser(client, { username: username })
  const inDbStorePassword = user.password
  const isPasswordMatch = await bcrypt.compare(password, inDbStorePassword)
  if (isPasswordMatch) {
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY)
    response.send({ message: 'Successfull Login', token: token })
  } else {
    response.send({ message: 'Invalid Login' })
  }
})

async function genPassword (password) {
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  return hashedPassword
}
export const userRouter = router
