import { prisma } from '../../../config/prisma'

export default async function handler (req, res) {
  switch (req.method) {
    case 'GET':
      try {
        const { id } = req.query
        const order = await prisma.order.findUnique({
          where: {
            id: Number(id)
          }
        })
        res.status(200).json(order)
      } catch (error) {
        res.status(500).json({ error: error })
      }

      break
    case 'PUT':
      try {
        const { id } = req.query
        const { status } = req.body
        const order = await prisma.order.update({
          where: {
            id: Number(id)
          },
          data: {
            status
          }
        })

        res.status(200).json(order)
      } catch (error) {
        res.status(500).json({ error: error })
      }

      break
    case 'DELETE':
      try {
        const { id } = req.query
        const order = await prisma.order.delete({
          where: {
            id: Number(id)
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
