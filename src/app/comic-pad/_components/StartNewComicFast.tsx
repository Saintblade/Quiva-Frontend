"use client";
import React from "react";
import { useRouter } from "next/navigation";
import CreateComicCard from "./CreateComicCard";
import { envelopeImg, toolOne } from "../../../../public/dev_images";
import UploadModal from "../upload-comics/_components/UploadModal";
import { useDisclosure } from "@heroui/react";
import GeneralModal from "@/components/modals/GeneralModal";

const StartNewComicFast = () => {
	const router = useRouter();
	const {
		isOpen: isOpenUploadModal,
		onOpen: onOpenUploadModal,
		onOpenChange: onOpenChangeUploadModal,
		onClose: onCloseUploadModal,
	} = useDisclosure();

	const handleStartNewProject = () => {
		// router.push("/comic-pad/script-builder");
	};

	return (
		<div className='bg-black-200 flex flex-col gap-8 w-full items-center py-8 lg:py-12'>
			<h4 className='text-white text-base lg:text-2xl tracking-wider'>
				Start a new comic fast
			</h4>
			<div className='grid grid-cols-2 gap-3 lg:gap-8 px-2 lg:px-0'>
				<CreateComicCard
					imageSrc={toolOne}
					title='Start New Project'
					description='Begin your creative journey with a blank canvas.'
					className='!cursor-not-allowed'
					onClick={handleStartNewProject}
				/>
				<CreateComicCard
					imageSrc={envelopeImg}
					title='Upload Comic Files'
					description='Already have pages ready? Upload and mint them into NFTs.'
					onClick={onOpenUploadModal}
				/>
			</div>

			{/* Upload Modal */}

			{/* White paper */}
			<GeneralModal
				isOpen={isOpenUploadModal}
				onOpenChange={onOpenChangeUploadModal}
				onClose={onCloseUploadModal}
				backdrop='blur'
				size='xl'
			>
				<UploadModal onClose={onCloseUploadModal} />
			</GeneralModal>
		</div>
	);
};

export default StartNewComicFast;
