import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../../lib/prisma'

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    const admin = await prisma.admin.findUnique({ where: { email } })
    if (!admin) return res.status(403).json({ message: 'Email does not exist' })

    const isMatch = await bcrypt.compare(password, admin.password)
    if (!isMatch) return res.status(401).json({ message: 'Wrong password' })

    const accessToken = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    )

    return res.status(200).json({
      message: 'Login successful',
      accessToken,
      admin: {
        id: admin.id,
        email: admin.email
      }
    })
  } catch (err) {
    next(err)
  }
}