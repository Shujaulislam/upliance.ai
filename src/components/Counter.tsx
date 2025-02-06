"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useStore } from "@/store/store"

const Counter = () => {
  const { count, increment, decrement, reset } = useStore()

  // Calculate the height percentage based on count (capped at 100%)
  const getHeightPercentage = () => {
    // We'll increase by for each count, max at 100%
    return  (count === 0 ? 0 : Math.min(Math.log(Math.abs(count) + 2) * 25, 100))
  }

  return (
    <div className="relative p-6 rounded-lg shadow-lg text-center h-[300px] overflow-hidden bg-white">
      {/* Background fill animation */}
      <motion.div
        className="absolute bottom-0 left-0 w-full bg-green-500"
        initial={{ height: "0%" }}
        animate={{
          height: `${getHeightPercentage()}%`,
          backgroundColor: count >= 0 ? "#22c55e" : "#ef4444"
        }}
        transition={{ 
          type: "tween",
          ease: [0.25, 1, 0.5, 1], 
          // ease: "easeInOut",
          duration: 0.5,
          // stiffness: 100,
          // damping: 15
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        <h2 className="text-2xl font-bold mb-4">Counter</h2>
        <p className="text-4xl font-bold mb-4">{count}</p>
        <div className="space-x-2">
          <Button 
            onClick={decrement}
            variant="outline"
            className="bg-white hover:bg-gray-100"
          >
            -
          </Button>
          <Button 
            onClick={reset}
            variant="outline"
            className="bg-white hover:bg-gray-100"
          >
            Reset
          </Button>
          <Button 
            onClick={increment}
            variant="outline"
            className="bg-white hover:bg-gray-100"
          >
            +
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Counter
