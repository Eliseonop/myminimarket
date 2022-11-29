import { prisma } from '../../../config/prisma'
import bycrypt from 'bcrypt'

export default async function handler (req, res) {
  switch (req.method) {
    case 'POST':
      try {
        const { name, email, password, typeUser } = req.body
        const user = await prisma.user.findUnique({
          where: {
            email: email
          }
        })
        if (user) {
          return res.status(400).json({ error: 'El usuario ya existe' })
        } else {
          const salt = await bycrypt.genSalt(10)
          const hash = await bycrypt.hash(password, salt)

          const newUser = await prisma.user.create({
            data: {
              name,
              email,
              typeUser: typeUser || 'CLIENT',
              password: hash
            }
          })
          res.status(200).json({ message: 'Usuario creado correctamente' })
        }
      } catch (error) {
        res.status(400).json({ error: error.message })
      }

      break

    case 'GET':
      try {
        const users = await prisma.user.findMany()
        return res.status(200).json(users, { suscess: true })
      } catch (error) {
        return res.status(500).json({ error: error })
      }
      break

    case 'DELETE':
      try {
        const { id } = req.body
        const user = await prisma.user.findUnique({
          where: {
            id: id
          }
        })
        if (user) {
          const deleteUser = await prisma.user.delete({
            where: {
              id: id
            }
          })
          return res.status(200).json(deleteUser)
        } else {
          return res.status(400).json({ error: 'El usuario no existe' })
        }
      } catch (error) {
        return res.status(500).json({ error: error })
      }
      break

    default:
      res.status(405).json({ error: 'Method not allowed.' })
      break
  }
}
