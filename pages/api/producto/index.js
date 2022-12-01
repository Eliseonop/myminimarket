import { prisma } from '../../../config/prisma'

export default async function handler (req, res) {
  console.log(req.params)
  switch (req.method) {
    case 'GET':
      try {
        const productos = await prisma.product.findMany()
        res.status(200).json(productos)
      } catch (error) {
        res.status(500).json({ error: error })
      }

      break
    case 'POST':
      try {
        const { name, price, description, image, stock } = req.body
        const product = await prisma.product.create({
          data: {
            name,
            price,
            description,
            image,
            stock
          }
        })
        console.log(product)
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
