import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'

export default function SimpleCard({ item, add }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      whileHover={{ scale: 1.03, backgroundColor: '#2a2a2a' }}
      className='simple'
    >
      <div>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
      </div>
      <motion.button 
        whileHover={{ scale: 1.2, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => add(item)}
      >
        +
      </motion.button>
    </motion.div>
  )
}
