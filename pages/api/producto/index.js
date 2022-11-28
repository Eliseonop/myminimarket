import { prisma } from '../../../config/prisma'

export default async function handler (req, res) {
  console.log(req.params)
  switch (req.method) {
    case 'GET':
      try {
        const productos = await prisma.producto.findMany()
        res.status(200).json(productos)
      } catch (error) {
        res.status(500).json({ error: error })
      }

      break
    case 'POST':
      try {
        const { nombre, precio, descripcion, imagen } = req.body
        const producto = await prisma.producto.create({
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
    default:
      res.status(405).json({ error: 'Method not allowed.' })
      break
  }
}
