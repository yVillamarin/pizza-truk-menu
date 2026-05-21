import { useState } from 'react'
import { pizzas, pizzaExtras, drinks } from './data'
import Header from './components/Header'
import Tabs from './components/Tabs'
import ProductCard from './components/ProductCard'
import SimpleCard from './components/SimpleCard'
import Cart from './components/Cart'
import { motion } from 'framer-motion'

export default function App() {
  const [cart, setCart] = useState([])
  const [activeTab, setActiveTab] = useState('pizzas')
  const [isCartMinimized, setIsCartMinimized] = useState(false)

  const add = (item, size = null) => {
    setCart(prev => {
      const cartId = size ? `${item.id}-${size}` : item.id
      const existing = prev.find(i => i.cartId === cartId)
      if (existing) {
        return prev.map(i => i.cartId === cartId ? { ...i, quantity: i.quantity + 1 } : i)
      }
      const price = size ? item.prices[size] : item.price
      const sizeLabels = { small: 'Pequeña', medium: 'Mediana', large: 'Grande' }
      const sizeLabel = size ? sizeLabels[size] : ''
      return [...prev, { ...item, cartId, price, size: sizeLabel, quantity: 1 }]
    })
  }

  const remove = (cartId) => {
    setCart(prev => {
      const item = prev.find(i => i.cartId === cartId)
      if (item && item.quantity > 1) {
        return prev.map(i => i.cartId === cartId ? { ...i, quantity: i.quantity - 1 } : i)
      }
      return prev.filter(i => i.cartId !== cartId)
    })
  }

  const clearCart = () => setCart([])

  const total = cart.reduce((a, b) => a + (b.price * b.quantity), 0)
  const totalItems = cart.reduce((a, b) => a + b.quantity, 0)

  const tabs = [
    { id: 'pizzas', label: 'Pizzas', items: pizzas },
    { id: 'adicionales', label: 'Adicionales', items: pizzaExtras },
    { id: 'bebidas', label: 'Bebidas', items: drinks }
  ]

  const activeItems = tabs.find(t => t.id === activeTab)?.items || []

  return (
    <div>
      <Header />
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <section className='section'>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          key={activeTab}
          className='grid'
        >
          {activeItems.map(item => (
            item.image 
              ? <ProductCard key={item.id} item={item} add={add} />
              : <SimpleCard key={item.id} item={item} add={add} />
          ))}
        </motion.div>
      </section>
      <Cart 
        cart={cart} 
        add={add} 
        remove={remove} 
        clearCart={clearCart} 
        total={total} 
        totalItems={totalItems}
        isMinimized={isCartMinimized}
        onToggleMinimize={() => setIsCartMinimized(!isCartMinimized)}
      />
    </div>
  )
}
