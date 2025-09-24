"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CreateComicCard from "./CreateComicCard";
import { avatarImg, envelopeImg, toolOne } from "../../../../public/dev_images";
import UploadModal from "../upload-comics/_components/UploadModal";

const StartNewComicFast = () => {
	const router = useRouter();
	const [showUploadModal, setShowUploadModal] = useState(false);

	const handleStartNewProject = () => {
		router.push("/comic-pad/script-builder");
	};

	const handleUploadFiles = () => {
		setShowUploadModal(true); // 🔥 open modal
	};

	return (
		<div className='bg-black-200 flex flex-col gap-8 w-full items-center py-12'>
			<h4 className='text-white text-sm lg:text-2xl tracking-wider'>
				Start a new comic fast
			</h4>
			<div className='grid grid-cols-2 gap-8'>
				<CreateComicCard
					imageSrc={toolOne}
					title='Start New Project'
					description='Begin your creative journey with a blank canvas.'
					onClick={handleStartNewProject}
				/>
				<CreateComicCard
					imageSrc={envelopeImg}
					title='Upload Comic Files'
					description='Already have pages ready? Upload and mint them into NFTs.'
					onClick={handleUploadFiles}
				/>
			</div>

			{/* Upload Modal */}
      {showUploadModal && <UploadModal onClose={() => setShowUploadModal(false)} />}
		</div>
	);
};

export default StartNewComicFast;
