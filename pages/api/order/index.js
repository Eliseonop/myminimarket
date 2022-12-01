import { prisma } from '../../../config/prisma'

export default async function handler (req, res) {
  switch (req.method) {
    case 'GET':
      try {
        const orders = await prisma.order.findMany({
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                document: true,
                typeUser: true,
                password: false
              }
            },
            products: true,
          }
        })
        res.status(200).json(orders)
      } catch (error) {
        res.status(500).json({ error: error })
      }

      break
    case 'POST':
      try {
        const { userId, products, quantity, total, direction } = req.body
        const productsFind = await prisma.product.findMany({
          where: {
            id: {
              in: products
            }
          }
        })

        const order = await prisma.order.create({
          data: {
            userId,
            quantity,
            direction,
            total,
            products: {
              connect: productsFind.map(product => {
                return {
                  id: product.id
                }
              })
            }
          },
          // incluir el usuario sin la contraseña
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                document: true,
                typeUser: true,
                password: false
              }
            },
            products: true
          }
        })

        res.status(200).json(order)
      } catch (error) {
        res.status(500).json({ error: error })
      }
      break

    default:
      res.status(405).json({ error: 'Method not allowed.' })
      break
  }
}
