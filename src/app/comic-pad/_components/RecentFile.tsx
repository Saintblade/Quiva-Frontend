"use client";
import React, { useState } from "react";
import RecentCard from "./RecentCard";
import { theNorthFace } from "../../../../public/dev_images";
import { Listbox } from "@headlessui/react";

const RecentFile = () => {
	const [sortBy, setSortBy] = useState("");
	const options = [
		{ key: "size", label: "Size" },
		{ key: "name", label: "Name" },
		{ key: "date", label: "Date" },
		{ key: "type", label: "Type" },
	];

	const selectedOption = options.find((option) => option.key === sortBy) || {
		label: "Sort by",
	};

	return (
		<div className='mt-8'>
			<h5 className={`text-white text-sm lg:text-xl font-medium`}>Recent</h5>
			<div className='mt-2 flex items-center gap-4'>
				<h6 className='text-sm text-white'>Sort By:</h6>

				<Listbox
					value={sortBy}
					onChange={(value) => {
						setSortBy(value);
						console.log("Selected sort:", value);
					}}
				>
					<div className='relative w-32'>
						<Listbox.Button
							className={`w-full rounded-full border-2 border-gray-300 dark:border-gray-600 px-4 py-2 text-sm text-white dark:text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200`}
							aria-label='Sort By'
						>
							{selectedOption.label}
						</Listbox.Button>

						<Listbox.Options
							className={`absolute z-10 mt-1 w-full rounded-md bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 focus:outline-none`}
						>
							{options.map((option) => (
								<Listbox.Option
									key={option.key}
									value={option.key}
									className={({
										active,
										selected,
									}) => `cursor-pointer select-none px-4 py-2 text-sm ${
										active
											? "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100"
											: ""
									}
                ${
									selected
										? "bg-blue-500 text-white"
										: "text-gray-900 dark:text-gray-100"
								}
              `}
								>
									{option.label}
								</Listbox.Option>
							))}
						</Listbox.Options>
					</div>
				</Listbox>
			</div>
			<div className='mt-4'>
				<RecentCard title='The North Face' imageSrc={theNorthFace} />
			</div>
		</div>
	);
};

export default RecentFile;
