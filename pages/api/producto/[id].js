import { prisma } from '../../../config/prisma'

export default async function handler (req, res) {
  switch (req.method) {
    case 'GET':
      try {
        const { id } = req.query
        const product = await prisma.product.findUnique({
          where: {
            id: Number(id)
          }
        })
        res.status(200).json(product)
      } catch (error) {
        res.status(500).json({ error: error })
      }

      break
    case 'PUT':
      try {
        const { id } = req.query
        const { name, price, description, image, stock } = req.body
        const product = await prisma.product.update({
          where: {
            id: Number(id)
          },
          data: {
            name,
            price,
            description,
            image,
            stock
          }
        })
        res.status(200).json(product)
      } catch (error) {
        res.status(500).json({ error: error })
      }

      break
    case 'DELETE':
      try {
        const { id } = req.query
        const product = await prisma.product.delete({
          where: {
            id: Number(id)
          }
        })
        res.status(200).json(product)
      } catch (error) {
        res.status(500).json({ error: error })
      }

      break
    default:
      res.status(405).json({ error: 'Method not allowed.' })
      break
  }
}
