import { motion } from 'framer-motion'

export default function Tabs({ tabs, activeTab, setActiveTab }) {
  return (
    <div className='tabs-container'>
      {tabs.map(tab => (
        <motion.button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {tab.label}
        </motion.button>
      ))}
    </div>
  )
}
