import TitleText from "@/components/text/TitleText";
import { OVERVIEW_CARDS } from "@/components/utils/constant";
import React from "react";
import {
	FiArrowUpRight,
	FiArrowDownRight,
	FiRefreshCw,
	FiEyeOff,
} from "react-icons/fi";

const EarningOverview = () => {
	return (
		<div className='bg-black text-white p-6 rounded-xl flex-wrap gap-6 justify-between items-center grid grid-cols-10'>
			{/* Left: Overview boxes */}
			<div className='col-span-7'>
				<TitleText title='Welcome, Mary' className='text-white/70 !text-lg' />
				<div className='flex items-center gap-2 my-4'>
					<div className='w-2 h-6 bg-amber-500 rounded'></div>
					<h2 className='text-lg font-semibold'>Overview</h2>
				</div>

				<div className='gap-6 grid grid-cols-2'>
					{OVERVIEW_CARDS.map(
						({ id, title, value, change, changeColor, changeBg, Icon }) => (
							<div
								key={id}
								className='border border-amber-500 rounded-lg px-6 py-4 flex flex-col'
							>
								<div className='flex items-center justify-between'>
									<span className='text-sm text-gray-50/70 font-medium tracking-wider'>
										{title}
									</span>
									<span
										className={`flex items-center text-xs rounded font-medium tracking-wider px-2 py-0.5 ${changeColor} ${changeBg}`}
									>
										<Icon className='w-4 h-4 mr-0.5' /> {change}
									</span>
								</div>
								<p className='text-2xl font-bold mt-1'>{value}</p>
							</div>
						),
					)}
				</div>
			</div>

			{/* Right: Account balance */}
			<div className='flex flex-col items-end space-y-4 col-span-3'>
				<div className='flex items-center gap-3 text-amber-400 text-xl font-semibold'>
					<FiRefreshCw className='w-5 h-5' />
					<span>$150,946.55</span>
					<FiEyeOff className='w-5 h-5 text-gray-400 cursor-pointer' />
				</div>
				<p className='text-gray-50 text-sm'>January 27, 2024 • 12:45pm</p>
				<div className='flex gap-4'>
					<button className='bg-amber-500 text-black px-5 py-2 rounded-lg font-medium hover:bg-amber-400 transition'>
						Send
					</button>
					<button className='bg-amber-500 text-black px-5 py-2 rounded-lg font-medium hover:bg-amber-400 transition'>
						Withdraw
					</button>
				</div>
			</div>
		</div>
	);
};

export default EarningOverview;
