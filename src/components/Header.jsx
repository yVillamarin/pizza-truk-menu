import { motion } from 'framer-motion'
import logo from '/image/logo.png'

export default function Header() {
  return (
    <header className='hero'>
      <div className='overlay'></div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className='hero-logo'
      >
        <img src={logo} alt="PIZZA TRUk" />
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeInOut" }}
        className='hero-content'
      >
        <h1>PIZZA TRUCk</h1>
        <p>Somos tu pizzería en movimiento</p>
      </motion.div>
    </header>
  )
}
