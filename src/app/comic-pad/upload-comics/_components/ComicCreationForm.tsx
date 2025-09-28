import { useState } from "react";
import { Upload, X } from "lucide-react";
import OnboardingPage from "./OnboardingPage";

const genres = [
	"Science Fiction",
	"Fantasy",
	"Romance",
	"Horror",
	"Action & Adventure",
	"Slice of Life",
	"Comedy",
	"Drama",
	"Mystery & Thriller",
	"Historical",
	"Superhero",
	"Sports",
];

export function ComicCreationForm() {
	const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
	const [ageRating, setAgeRating] = useState("all-ages");
	const [formData, setFormData] = useState({
		seriesTitle: "",
		episodeTitle: "",
		description: "",
	});
	const [coverImage, setCoverImage] = useState<string | null>(null);
	const [showForm, setShowForm] = useState(false);

	const toggleGenre = (genre: string) => {
		if (selectedGenres.includes(genre)) {
			setSelectedGenres(selectedGenres.filter((g) => g !== genre));
		} else if (selectedGenres.length < 3) {
			setSelectedGenres([...selectedGenres, genre]);
		}
	};

	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setCoverImage(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const removeCoverImage = () => {
		setCoverImage(null);
	};

	return (
		<>
			{!showForm && (
				<div className='px-2 py-3 text-white space-y-4 overflow-y-auto max-h-[80vh]'>
					{/* Header */}
					<div className='text-center space-y-1'>
						<p className='text-white/80 text-xs font-medium tracking-widest uppercase mb-2'>
							PUBLISH YOUR COMIC: Step 2 of 4
						</p>
						<h1 className='text-2xl tracking-wider font-bold'>
							Tell the world about your story
						</h1>
						<p className='text-white/50 text-xs leading-relaxed'>
							Help readers discover your comic. The more details, the better!
						</p>
					</div>

					{/* Form Fields */}
					<div className='space-y-4'>
						<input
							type='text'
							placeholder='Comic Series Title'
							value={formData.seriesTitle}
							onChange={(e) => handleInputChange("seriesTitle", e.target.value)}
							className='w-full rounded-full border border-white/80 bg-transparent px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-orange-500'
						/>

						<input
							type='text'
							placeholder='Episode Title'
							value={formData.episodeTitle}
							onChange={(e) =>
								handleInputChange("episodeTitle", e.target.value)
							}
							className='w-full rounded-full border border-white/80 bg-transparent px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-orange-500'
						/>

						<textarea
							placeholder='Description'
							value={formData.description}
							onChange={(e) => handleInputChange("description", e.target.value)}
							className='w-full min-h-[100px] resize-none rounded-md border border-white/80 bg-transparent px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-orange-500'
						/>
					</div>

					{/* Genre Selection */}
					<div className='space-y-3'>
						<h3 className='text-base tracking-wider text-white/80 font-bold'>
							Select up to 3 genres
						</h3>
						<div className='flex items-center flex-wrap gap-2'>
							{genres.map((genre) => (
								<button
									key={genre}
									type='button'
									onClick={() => toggleGenre(genre)}
									className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm transition border ${
										selectedGenres.includes(genre)
											? "bg-orange-500 text-black hover:bg-orange-400"
											: "bg-gray-400 text-white/50 hover:bg-gray-600 border-light-200"
									}`}
								>
									{genre}
									{selectedGenres.includes(genre) && <X className='h-3 w-3' />}
								</button>
							))}
						</div>
					</div>

					{/* Age Rating */}
					<div className='space-y-3'>
						<h3 className='text-base tracking-wider text-white/80 font-bold'>
							Who is this comic for?
						</h3>
						<div className='flex flex-wrap gap-6'>
							{[
								{ value: "all-ages", label: "All Ages" },
								{ value: "teen", label: "Teen (13+)" },
								{ value: "mature", label: "Mature (18+)" },
							].map(({ value, label }) => (
								<label
									key={value}
									className='flex items-center gap-2 cursor-pointer'
								>
									<input
										type='radio'
										value={value}
										checked={ageRating === value}
										onChange={() => setAgeRating(value)}
										className='accent-orange-500'
									/>
									<span className='text-sm tracking-wider'>{label}</span>
								</label>
							))}
						</div>
					</div>

					{/* Cover Art */}
					<div className='space-y-3'>
						<div className='flex items-center justify-between'>
							<h3 className='text-sm font-medium'>Cover Art</h3>
							<span className='text-xs text-gray-400'>Thumbnail</span>
						</div>

						{!coverImage ? (
							<label className='block border-2 border-dashed border-light-200 bg-gray-400 p-10 rounded-lg text-center cursor-pointer hover:border-orange-500 transition'>
								<input
									type='file'
									accept='image/*'
									onChange={handleFileUpload}
									className='hidden'
								/>
								<button className='text-sm text-white/80 font-medium hover:bg-secondary-200/60 transition-[.3] py-2 px-4 rounded-full border border-light-200'>
									Choose file
								</button>
							</label>
						) : (
							<div className='relative'>
								<img
									src={coverImage}
									alt='Cover preview'
									className='w-full rounded-lg object-cover border border-gray-700'
								/>
								<button
									onClick={removeCoverImage}
									className='absolute top-2 right-2 bg-black/70 p-2 rounded-full hover:bg-black/90'
								>
									<X className='h-4 w-4 text-white' />
								</button>
							</div>
						)}
					</div>

					{/* Action Buttons */}
					<div className='flex gap-3 pt-2'>
						<button className='flex-1 rounded-full border border-light-200 bg-gray-400 py-3 text-white font-medium hover:bg-gray-700 transition'>
							Save Draft
						</button>
						<button
							onClick={() => setShowForm(true)}
							className='flex-1 rounded-full border border-gray-700 bg-secondary-200 py-3 text-gray-300 font-medium hover:bg-secondary-200/80 transition'
						>
							Publish
						</button>
					</div>
				</div>
			)}

			{/* If "Continue" clicked, show page instead */}
			{showForm && <OnboardingPage onclose={() => setShowForm(true)} />}
		</>
	);
}
