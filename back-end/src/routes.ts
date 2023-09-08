import express from 'express'
import { Router } from 'express';
import * as productsController from './controllers/product'
import cors from 'cors'

const app = express();
const route = Router()
app.use(express.json())
app.use(cors())

route.post('/api/products', productsController.validateProducts)
route.get('/api/products', () => console.log("hey"))

app.use(route)

app.listen(80, () => 'server running on port 80')