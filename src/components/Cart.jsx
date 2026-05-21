import { motion } from 'framer-motion'

export default function Cart({ cart, add, remove, clearCart, total, totalItems, isMinimized, onToggleMinimize }) {
  const sizeToEnglish = { 'Pequeña': 'small', 'Mediana': 'medium', 'Grande': 'large' }
  
  const orderItems = cart.map(i => `• ${i.name}${i.size ? ` (${i.size})` : ''} x${i.quantity} - $${(i.price * i.quantity).toLocaleString()}`).join('\n')
  const msg = encodeURIComponent(
    `🍕 *PIZZA TRUk* - Pedido en Línea\n\n` +
    `¡Hola! Me gustaría realizar el siguiente pedido:\n\n` +
    `${orderItems}\n\n` +
    `💰 *Total: $${total.toLocaleString()}*\n\n` +
    `📍 Por favor, indícame el tiempo de entrega y el método de pago.\n\n` +
    `¡Gracias! 🚗`
  )
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={`cart ${isMinimized ? 'cart-minimized' : ''}`}
    >
      <div className='cart-head'>
        <div className='cart-head-left'>
          🛒 {totalItems} productos
        </div>
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={onToggleMinimize}
          className='toggle-cart-btn'
          title={isMinimized ? 'Expandir carrito' : 'Minimizar carrito'}
        >
          {isMinimized ? '▲' : '▼'}
        </motion.button>
      </div>
      {!isMinimized && (
        <>
          {cart.map((item, index) => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className='cart-item' 
              key={index}
            >
              <div className='cart-item-info'>
                <span>{item.name}{item.size && <small> ({item.size})</small>}</span>
                <strong>${(item.price * item.quantity).toLocaleString()}</strong>
              </div>
              <div className='cart-item-controls'>
                <motion.button whileTap={{ scale: 0.9 }} onClick={() => remove(item.cartId)} className='cart-control-btn'>
                  −
                </motion.button>
                <span>{item.quantity}</span>
                <motion.button whileTap={{ scale: 0.9 }} onClick={() => add(item, item.size ? sizeToEnglish[item.size] : null)} className='cart-control-btn'>
                  +
                </motion.button>
              </div>
            </motion.div>
          ))}
          <h3>Total: ${total.toLocaleString()}</h3>
          <div className='cart-actions'>
            <a 
              className='wa' 
              href={`https://wa.me/584247079800?text=${msg}`} 
              target='_blank'
              rel='noopener noreferrer'
            >
              Pedir por WhatsApp
            </a>
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }} 
              onClick={clearCart} 
              className='clear-btn'
            >
              🗑️
            </motion.button>
          </div>
        </>
      )}
      {isMinimized && (
        <div className='cart-minimized-content'>
          <h3>Total: ${total.toLocaleString()}</h3>
        </div>
      )}
    </motion.div>
  )
}
