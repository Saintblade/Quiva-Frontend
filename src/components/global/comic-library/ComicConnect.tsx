'use client'

import { MainButton } from '@/components/button'
import HashConnectButton from '@/components/button/HashConnectButton';
import { RainbowConnect } from '@/components/button/RainbowConnect';
import ComicModal from '@/components/modals/ComicModal';
import { useAppSelector } from '@/redux/hook';
import React from 'react'

function ComicConnect() {

    const { isAuthenticated } = useAppSelector((state) => state.wallet);
    const [isOpen, setIsOpen] = React.useState(false);

    const handleConnect = () => {
        setIsOpen(true);
    }
  return (
    <>
        {
            isAuthenticated === false ? (
                <>
                    <MainButton 
                    className='text-xxs sm:text-sm !px-2 sm:px-4'
                    onClick={() => handleConnect()}>
                        Connect Wallet
                    </MainButton>

                    {
                        isOpen && (
                            <ComicModal onClose={() => setIsOpen(false)} >
                                <div className='flex flex-col gap-4'>
                                    <h2 className='text-white text-2xl font-bold'>Connect Your Wallet</h2>
                                    <p className='text-white text-center'>To access all features of Quiva, please connect your wallet. This will allow you to manage your comics, view your collection, and make purchases securely.</p>
                                    <div className="flex flex-col gap-3 ">
                                        <HashConnectButton />
                                        <div className='flex items-center justify-center'>
                                            <RainbowConnect />
                                        </div>
                                    </div>
                                </div>
                            </ComicModal>
                        )
                    }
                </>
        ) : (
            <RainbowConnect />
        )
        }
    </>
  )
}

export default ComicConnect