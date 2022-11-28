import { prisma } from '../../../config/prisma'

export default async function handler (req, res) {
  switch (req.method) {
    case 'GET':
      try {
        const { id } = req.query
        const producto = await prisma.producto.findUnique({
          where: {
            id: Number(id)
          }
        })
        res.status(200).json(producto)
      } catch (error) {
        res.status(500).json({ error: error })
      }

      break
    case 'PUT':
      try {
        const { id } = req.query
        const { nombre, precio, descripcion, imagen } = req.body
        const producto = await prisma.producto.update({
          where: {
            id: Number(id)
          },
          data: {
            nombre,
            precio,
            descripcion,
            imagen
          }
        })
        res.status(200).json(producto)
      } catch (error) {
        res.status(500).json({ error: error })
      }

      break
    case 'DELETE':
      try {
        const { id } = req.query
        const producto = await prisma.producto.delete({
          where: {
            id: Number(id)
          }
        })
        res.status(200).json(producto)
      } catch (error) {
        res.status(500).json({ error: error })
      }

      break
    default:
      res.status(405).json({ error: 'Method not allowed.' })
      break
  }
}
