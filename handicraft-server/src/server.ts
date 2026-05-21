import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './modules/auth/authRoute'
import adminRoutes from './modules/admin/adminRoutes'
import shopRoutes from './modules/shop/shopRoutes'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/shop', shopRoutes)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

export default app