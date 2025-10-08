"use client";
import React, { useEffect } from "react";
import ComicPadlayout from "./_components/ComicPadlayout";
import StartNewComicFast from "./_components/StartNewComicFast";
import RecentFile from "./_components/RecentFile";
import AppMenu from "@/components/global/AppMenu";
import { useDisclosure } from "@heroui/react";
import { UserProfileFlowModal } from "@/components/modals/UserProfile";
import GeneralModal from "@/components/modals/GeneralModal";
import { useAppSelector } from "@/redux/hook";

const page = () => {
	const { user } = useAppSelector((state) => state.wallet);

	const {
		isOpen: isUserProfileOpen,
		onOpen: onOpenUserProfile,
		onOpenChange: onOpenChangeUserProfile,
		onClose: onCloseUserProfile,
	} = useDisclosure();

	useEffect(() => {
		if (!user?.username) {
			onOpenUserProfile();
		}
	}, []);

	const handleProfileComplete = () => {
		// Close the user profile modal
		onCloseUserProfile();
	};

	return (
		<>
			<ComicPadlayout>
				<div className='px-2 sm:px-10 w-full'>
					<StartNewComicFast />
					<RecentFile />
				</div>
				<AppMenu />
			</ComicPadlayout>

			{/* User Profile Flow Modal */}
			<GeneralModal
				isOpen={isUserProfileOpen}
				onOpenChange={onOpenChangeUserProfile}
				onClose={onCloseUserProfile}
				backdrop='blur'
				size='xl'
			>
				<UserProfileFlowModal
					onClose={onCloseUserProfile}
					onComplete={handleProfileComplete}
				/>
			</GeneralModal>
		</>
	);
};

export default page;
