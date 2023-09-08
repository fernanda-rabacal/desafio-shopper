import { Request, Response } from 'express';
import { parse } from 'papaparse'

export const validateProducts = (req: Request, res: Response) => {
    const { productsCSV } = req.body

    try {
        const parsedFile = parse(productsCSV, { header: true })

        console.log(parsedFile)
        
        const products = parsedFile.data.map(product => {
            
        })
    } catch(e) {
        console.log("deu merda")
    }
}