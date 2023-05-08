import Image from "next/image";
import { motion } from "framer-motion";

export default function Avatar(){
  return (
    <motion.div
      transition={{ duration: 0.5 }}
      whileHover={{ rotate: 360 }}
    >
      <Image src="/avatar.png" alt="avatar" width={100} height={100} className="rounded-full" />
    </motion.div>
  )
}