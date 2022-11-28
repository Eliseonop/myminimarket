import { prisma } from '../../../config/prisma'
import { compareSync } from 'bcrypt'

export default async function (req, res) {
  switch (req.method) {
    case 'POST':
      try {
        const { email, password } = req.body
        const user = await prisma.user.findUnique({
          where: {
            email: email
          }
        })

        if (user) {
          const isMatch = compareSync(password, user.password)
          if (isMatch) {
            return res.status(200).json(
              {
                id: user.id,
                name: user.name,
                email: user.email,
                typeUser: user.typeUser,
              }
            )
          } else {
            return res.status(400).json({ error: 'Contraseña incorrecta' })
          }
        } else {
          return res.status(400).json({ error: 'Usuario no encontrado' })
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
