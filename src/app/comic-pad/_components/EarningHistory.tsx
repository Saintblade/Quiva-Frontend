import Picture from "@/components/picture/Index";
import React from "react";
import { image3 } from "../../../../public/dev_images";
import { StaticImageData } from "next/image";

type HistoryRow = {
	avatar: string | StaticImageData;
	name: string;
	book: string;
	status: "Pending" | "Received";
	date: string;
	amount: string;
};

const data: HistoryRow[] = [
	{
		avatar: image3,
		name: "Oladele Ewatomi",
		book: "Solo Leveling",
		status: "Pending",
		date: "Jan 2, 2025",
		amount: "$50",
	},
	{
		avatar: image3,
		name: "Olatunji Toluwani",
		book: "Darling",
		status: "Received",
		date: "Dec 9, 2024",
		amount: "$70",
	},
	{
		avatar: image3,
		name: "Eyebioklin Kikelomo",
		book: "Besteon",
		status: "Received",
		date: "Jan 2, 2025",
		amount: "$20",
	},
	{
		avatar: image3,
		name: "Akinlabi Busayo",
		book: "Solo Leveling",
		status: "Received",
		date: "Dec 9, 2024",
		amount: "$60",
	},
];

const EarningHistory = () => {
	return (
		<div className='bg-black text-white p-6 rounded-xl'>
			<h2 className='text-lg font-semibold mb-4 text-white/80'>History</h2>
			<table className='w-full border-separate border-spacing-y-3 border-primary-500'>
				<thead className=''>
					<tr className='text-left text-sm text-gray-50/80 border-b border-primary-500'>
						<th className='pb-2'>Reader</th>
						<th className='pb-2'>Books Read</th>
						<th className='pb-2'>Status</th>
						<th className='pb-2'>Date</th>
						<th className='pb-2'>Amount</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{data.map((row, i) => (
						<tr
							key={i}
							className='border border-b border-primary-500 text-sm text-white/70'
						>
							<td className='py-2 flex items-center gap-3 font-semibold'>
								<Picture
									src={row.avatar}
									alt={row.name}
									className='rounded-sm size-10'
								/>
								{row.name}
							</td>
							<td className='py-2 tracking-wide font-medium'>{row.book}</td>
							<td className='py-2'>
								<span
									className={`px-3 py-1 rounded-md text-xs font-semibold ${
										row.status === "Pending"
											? "bg-primary-100/40 text-primary-400"
											: "bg-amber-500"
									}`}
								>
									{row.status}
								</span>
							</td>
							<td className='py-2 font-medium'>{row.date}</td>
							<td className='py-2 font-medium'>{row.amount}</td>
							<td className='py-2'>
								<button className='px-4 font-medium py-1 text-primary-400 border border-primary-400 rounded-md hover:bg-primary-400 hover:text-white/90 transition-[.4]'>
									Details
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default EarningHistory;
