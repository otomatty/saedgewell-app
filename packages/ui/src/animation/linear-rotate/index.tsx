import { motion } from "framer-motion";

export const LinearRotate = () => {
	// スピナーのアニメーション
	const spinnerVariants = {
		animate: {
			rotate: -360,
			transition: {
				duration: 10,
				ease: "linear",
				repeat: Number.POSITIVE_INFINITY,
				repeatType: "loop" as const,
				repeatDelay: 0,
			},
		},
	};

	return (
		<div className="absolute inset-0 -z-10 flex items-center justify-center">
			<div className="relative flex justify-center">
				{/* ハッチパターン（固定） */}
				<div className="absolute -top-36">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="220"
						height="844"
						fill="none"
						viewBox="0 0 220 844"
						aria-label="Background pattern"
						role="img"
					>
						<mask
							id="mask0_453_1771"
							width="220"
							height="844"
							x="0"
							y="0"
							maskUnits="userSpaceOnUse"
							style={{ maskType: "alpha" }}
						>
							<g clipPath="url(#clip0_453_1771)" opacity="0.15">
								<path
									stroke="hsl(var(--primary))"
									d="m-30.644 280.646 282.842 282.843M-30.644 272.646l282.842 282.843M-30.644 264.646l282.842 282.843M-30.644 256.646l282.842 282.843M-30.644 248.646l282.842 282.843M-30.644 240.646l282.842 282.843M-30.644 232.646l282.842 282.843m-282.84-290.843L252.2 507.489M-30.643 216.646 252.2 499.489M-30.643 208.646 252.2 491.489M-30.643 200.646 252.2 483.489M-30.643 192.646 252.2 475.489M-30.643 184.646 252.2 467.489M-30.643 176.646 252.2 459.489M-30.643 168.646 252.2 451.489M-30.643 160.646 252.2 443.489M-30.643 152.646 252.2 435.489M-30.643 144.646 252.2 427.489M-30.643 136.646 252.2 419.489M-30.643 128.646 252.2 411.489M-30.643 120.646 252.2 403.489M-30.643 112.646 252.2 395.489M-30.643 104.646 252.2 387.489M-30.643 96.647 252.2 379.489M-30.643 88.647 252.2 371.489M-30.643 80.647 252.2 363.489M-30.643 72.647 252.2 355.489M-30.643 64.647 252.2 347.489M-30.643 56.647 252.2 339.489M-30.643 48.647 252.2 331.489M-30.643 40.647 252.2 323.489M-30.643 32.647 252.2 315.489M-30.643 24.647 252.2 307.489M-30.643 16.647 252.2 299.489M-30.643 8.646 252.2 291.49M-30.643.646 252.2 283.49M-30.643-7.354 252.2 275.49M-30.643-15.353 252.2 267.489M-30.643-23.353 252.2 259.489M-30.643-31.353 252.2 251.489M-30.643-39.353 252.2 243.489M-30.643-47.353 252.2 235.489M-30.643-55.353 252.2 227.489M-30.643-63.353 252.2 219.489M-30.643-71.353 252.2 211.489M-30.643-79.353 252.2 203.489M-30.643-87.353 252.2 195.489M-30.643-95.353 252.2 187.489M-30.643-103.354 252.2 179.489M-30.643-111.354 252.2 171.489M-30.643-119.354 252.2 163.489M-30.643-127.354 252.2 155.489M-30.643-135.354 252.2 147.489M-30.643-143.354 252.2 139.489M-30.643-151.354 252.2 131.489M-30.643-159.354 252.2 123.489M-30.643-167.354 252.2 115.489M-30.643-175.354 252.2 107.489M-30.643-183.354 252.2 99.489M-30.643-191.354 252.2 91.489M-30.643-199.354 252.2 83.489M-30.643-207.354 252.2 75.489M-30.643-215.354 252.2 67.489M-30.643-223.354 252.2 59.489M-30.643-231.354 252.2 51.489M-30.643-239.354 252.2 43.489M-30.643-247.354 252.2 35.489M-30.643-255.354 252.2 27.489M-30.643-263.354 252.2 19.489M-30.643-271.354 252.2 11.489M-30.644 840.646l282.842 282.844M-30.644 832.646l282.842 282.844M-30.644 824.646l282.842 282.844M-30.644 816.646l282.842 282.844M-30.644 808.646l282.842 282.844M-30.644 800.646l282.842 282.844M-30.644 792.646l282.842 282.844m-282.84-290.844L252.2 1067.49M-30.643 776.646 252.2 1059.49M-30.643 768.646 252.2 1051.49M-30.643 760.646 252.2 1043.49M-30.643 752.646 252.2 1035.49M-30.643 744.646 252.2 1027.49M-30.643 736.646 252.2 1019.49M-30.643 728.646 252.2 1011.49M-30.643 720.646 252.2 1003.49M-30.643 712.646 252.2 995.489M-30.643 704.646 252.2 987.489M-30.643 696.646 252.2 979.489M-30.643 688.646 252.2 971.489M-30.643 680.646 252.2 963.489M-30.643 672.646 252.2 955.489M-30.643 664.646 252.2 947.489M-30.643 656.646 252.2 939.489M-30.643 648.646 252.2 931.489M-30.643 640.646 252.2 923.489M-30.643 632.646 252.2 915.489M-30.643 624.646 252.2 907.489M-30.643 616.646 252.2 899.489M-30.643 608.646 252.2 891.489M-30.643 600.646 252.2 883.489M-30.643 592.646 252.2 875.489M-30.643 584.646 252.2 867.489M-30.643 576.646 252.2 859.489M-30.643 568.646 252.2 851.489M-30.643 560.646 252.2 843.489M-30.643 552.646 252.2 835.489M-30.643 544.646 252.2 827.489M-30.643 536.646 252.2 819.489M-30.643 528.646 252.2 811.489M-30.643 520.646 252.2 803.489M-30.643 512.646 252.2 795.489M-30.643 504.646 252.2 787.489M-30.643 496.646 252.2 779.489M-30.643 488.646 252.2 771.489M-30.643 480.646 252.2 763.489M-30.643 472.646 252.2 755.489M-30.643 464.646 252.2 747.489M-30.643 456.646 252.2 739.489M-30.643 448.646 252.2 731.489M-30.643 440.646 252.2 723.489M-30.643 432.646 252.2 715.489M-30.643 424.646 252.2 707.489M-30.643 416.646 252.2 699.489M-30.643 408.646 252.2 691.489M-30.643 400.646 252.2 683.489M-30.643 392.646 252.2 675.489M-30.643 384.646 252.2 667.489M-30.643 376.646 252.2 659.489M-30.643 368.646 252.2 651.489M-30.643 360.646 252.2 643.489M-30.643 352.646 252.2 635.489M-30.643 344.646 252.2 627.489M-30.643 336.646 252.2 619.489M-30.643 328.646 252.2 611.489M-30.643 320.646 252.2 603.489M-30.643 312.646 252.2 595.489M-30.643 304.646 252.2 587.489M-30.643 296.646 252.2 579.489M-30.643 288.646 252.2 571.489"
								/>
							</g>
						</mask>
						<g mask="url(#mask0_453_1771)">
							<path
								fill="hsl(var(--primary))"
								d="M-2 423c0-89.219 43.265-168.334 110-217.509C174.735 254.666 218 333.781 218 423s-43.265 168.333-110 217.508C41.265 591.333-2 512.218-2 423"
							/>
						</g>
						<defs>
							<clipPath id="clip0_453_1771">
								<path fill="hsl(var(--primary))" d="M0 0h220v844H0z" />
							</clipPath>
						</defs>
					</svg>
				</div>

				{/* 左のスピナー */}
				<div className="aspect-square h-[560px] rounded-full translate-x-[21%] relative border border-dashed border-muted-foreground/30">
					<motion.div
						className="absolute inset-2 rounded-full z-10"
						variants={spinnerVariants}
						animate="animate"
						initial={{ rotate: 0 }}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="84"
							height="200"
							fill="none"
							viewBox="0 0 84 200"
							className="-ml-0.5 mt-[58px] rotate-[3.7deg]"
							aria-label="Left spinner"
							role="img"
						>
							<path
								stroke="url(#paint0_linear_116_21617)"
								strokeLinecap="round"
								strokeWidth="2"
								d="M.99 198.99A280 280 0 0 1 83 1"
							/>
							<defs>
								<linearGradient
									id="paint0_linear_116_21617"
									x1="0.988"
									x2="82.988"
									y1="189.99"
									y2="0.99"
									gradientUnits="userSpaceOnUse"
								>
									<stop stopColor="hsl(var(--primary))" />
									<stop
										offset="1"
										stopColor="hsl(var(--primary))"
										stopOpacity="0"
									/>
								</linearGradient>
							</defs>
						</svg>
					</motion.div>
				</div>

				{/* 右のスピナー */}
				<div className="aspect-square h-[560px] rounded-full -translate-x-[21%] rotate-180 relative border border-dashed border-muted-foreground/30">
					<motion.div
						className="absolute inset-2 rounded-full z-10"
						variants={spinnerVariants}
						animate="animate"
						initial={{ rotate: 0 }}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="84"
							height="200"
							fill="none"
							viewBox="0 0 84 200"
							className="-ml-0.5 mt-[58px] rotate-[3.7deg]"
							aria-label="Right spinner"
							role="img"
						>
							<path
								stroke="url(#paint0_linear_116_21617)"
								strokeLinecap="round"
								strokeWidth="2"
								d="M.99 198.99A280 280 0 0 1 83 1"
							/>
							<defs>
								<linearGradient
									id="paint0_linear_116_21617"
									x1="0.988"
									x2="82.988"
									y1="189.99"
									y2="0.99"
									gradientUnits="userSpaceOnUse"
								>
									<stop stopColor="hsl(var(--primary))" />
									<stop
										offset="1"
										stopColor="hsl(var(--primary))"
										stopOpacity="0"
									/>
								</linearGradient>
							</defs>
						</svg>
					</motion.div>
				</div>
			</div>
		</div>
	);
};
