import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { useInView } from 'framer-motion'

export default function ProductCard({ item, add }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedSize, setSelectedSize] = useState('small')
  
  const isPizza = item.prices && typeof item.prices === 'object'
  const price = isPizza ? item.prices[selectedSize] : item.price
  
  const sizeLabels = {
    small: 'Pequeña',
    medium: 'Mediana',
    large: 'Grande'
  }
  
  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      whileHover={{ scale: 1.05, y: -10 }}
      className='card'
    >
      <img src={item.image} alt={item.name} loading="lazy" />
      <div className='content'>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        {isPizza && (
          <div className='size-selector'>
            {Object.keys(item.prices).map(size => (
              <motion.button
                key={size}
                className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                onClick={() => setSelectedSize(size)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {sizeLabels[size]}
              </motion.button>
            ))}
          </div>
        )}
        <div className='footer'>
          <strong>${price.toLocaleString()}</strong>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => add(item, isPizza ? selectedSize : null)}
          >
            Agregar
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
