import { motion, AnimatePresence } from "framer-motion";

const MotionFrame = ({ children, key, lineY }) => {
	return (
		<AnimatePresence mode="wait">
			<motion.div
				key={key}
				initial={{ y: lineY, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				exit={{ y: -lineY, opacity: 0 }}
				transition={{ duration: 0.4 }}
			>
				{children}
			</motion.div>
		</AnimatePresence>
	);
}

export default MotionFrame