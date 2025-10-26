'use client'

import {Header} from '@/components/global/comic-library/Header'
import {Sidebar} from '@/components/global/comic-library/Sidebar'
import {useState} from 'react'

export default function MainPage({children}) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(prev => !prev)
    }

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false)
    }

    return (
        <div className="min-h-screen bg-black-500 w-full font-recursive">
            {/* Mobile Layout */}
            <div className="lg:hidden">
                <Header
                    onMobileMenuToggle={toggleMobileMenu}
                    isMobileMenuOpen={isMobileMenuOpen}
                />
                <Sidebar
                    isMobileMenuOpen={isMobileMenuOpen}
                    onMobileMenuClose={closeMobileMenu}
                />

                <main
                    className={`p-4 overflow-y-auto bg-black-500 w-full transition-all duration-300 ${isMobileMenuOpen
                        ? 'blur-sm'
                        : ''}`}
                >
                    {children}
                </main>
            </div>

            {/* Desktop Layout - FIXED: Improved grid structure */}
            <div className="hidden lg:grid lg:grid-cols-[200px_1fr] xl:grid-cols-[280px_1fr] min-h-screen w-full">
                {/* Sidebar Column */}
                <div className="relative">
                    <Sidebar isMobileMenuOpen={false} onMobileMenuClose={() => {}} />
                </div>

                {/* Main Content Column */}
                <div className="flex flex-col min-h-screen">
                    {/* Header - FIXED: Made sticky instead of relying on sidebar positioning */}
                    <div className="sticky top-0 z-30">
                        <Header onMobileMenuToggle={() => {}} isMobileMenuOpen={false} />
                    </div>

                    {/* Main Content - FIXED: Better overflow handling */}
                    <main className="flex-1 p-6 bg-black-500 w-full overflow-x-hidden">
                        <div className="w-full max-w-full">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}