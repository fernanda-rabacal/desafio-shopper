import styles from './App.module.scss'
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { api } from '../lib/axios';

interface IProduct {
  code: number;
  name: string;
  cost_price: number;
  sales_price: number;
  exception?: string;
}

interface IFormProps {
  products: FileList
}


function App() {
  const [isValidated, setIsValidated] = useState(true)
  const [products, setProducts] = useState<IProduct[]>([])
  const { register, handleSubmit } = useForm()

  const handleValidateProducts = async (data: IFormProps) => {
    if(!data.products[0]) {
       return;
     }

     const reader = new FileReader()

     reader.onload = () => {
        const productsCSV = reader.result

        api.post('/products', { productsCSV })
     }


     reader.readAsText(data.products[0])
  }

  return (
      <section className={styles.container}>

        <h1>Atualização de Preços</h1>
      
          <form className={styles.form} onSubmit={handleSubmit(handleValidateProducts)}>
            <div>
              <label>Subir csv</label>
              <input 
                type='file' 
                id='tabela_produtos' 
                accept='.csv' 
                {...register("products")}
                />
            </div>

            <div>
              <button>Validar produtos</button>
              <button type='button' disabled={isValidated}>Atualizar preços</button>
            </div>
          </form>

          <table 
            className={styles.products_table} 
            style={{ 
              display: products.length ? 'initial' : 'none' 
            }}>
            <thead>
              <tr>
                <th>Cod. Produto</th>
                <th>Nome</th>
                <th>Preço atual</th>
                <th>Preço novo</th>
                <th>Regras não validadas</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => {
                return (
                  <tr>
                    <td>{product.code}</td>
                    <td>{product.name}</td>
                    <td>{product.cost_price}</td>
                    <td>{product.sales_price}</td>
                    <td>{product.exception ? product.exception : '*'}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
      </section>
  )
}

export default App
