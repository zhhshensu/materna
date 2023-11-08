import React, { useState, useEffect } from 'react'
import { ProductService } from './service/ProductService'
import { Button } from 'primereact/button'
import { DataView } from 'primereact/dataview'
import { Rating } from 'primereact/rating'
import { Tag } from 'primereact/tag'

interface Product {
  id: string
  code: string
  name: string
  description: string
  image: string
  price: number
  category: string
  quantity: number
  inventoryStatus: string
  rating: number
}
const Workbench = () => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    ProductService.getProducts().then((data) => setProducts(data.slice(0, 12)))
  }, [])
  const itemTemplate = (product: Product) => {
    return (
      <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
        <div className="p-4 border-1 surface-border surface-card border-round">
          <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <div className="flex align-items-center gap-2">
              <i className="pi pi-tag"></i>
              <span className="font-semibold">{product.category}</span>
            </div>
            <Tag
              value={product.inventoryStatus}
              severity={getSeverity(product)}
            ></Tag>
          </div>
          <div className="flex flex-column align-items-center gap-3 py-5">
            <img
              className="w-9 shadow-2 border-round"
              src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`}
              alt={product.name}
            />
            <div className="text-2xl font-bold">{product.name}</div>
            <Rating value={product.rating} readOnly cancel={false}></Rating>
          </div>
          <div className="flex align-items-center justify-content-between">
            <span className="text-2xl font-semibold">${product.price}</span>
            <Button
              icon="pi pi-shopping-cart"
              className="p-button-rounded"
              disabled={product.inventoryStatus === 'OUTOFSTOCK'}
            ></Button>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="card">
      <DataView value={products} itemTemplate={itemTemplate} />
    </div>
  )
}

export default Workbench
