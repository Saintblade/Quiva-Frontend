'use client'

import { Button } from '@/components/ui/button'
import { QuivaLogo } from '@/components/utils/function'
import { X } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'

export function ComicPadSideNav({ isMobileMenuOpen, onMobileMenuClose }) {
  const router = useRouter()
  const pathname = usePathname()

  // Navigation items
  const navigationItems = [
    {
      label: 'Home',
      path: '/comic-pad',
      isActive: pathname === '/comic-pad'
    },
    {
      label: 'My Comics', 
      path: '/comic-pad/my-comics',
      isActive: pathname === '/comic-pad/my-comics'
    },
    {
      label: 'Earnings',
      path: '/comic-pad/earnings',
      isActive: pathname === '/comic-pad/earnings'
    }
  ]

  const handleNavigation = (path) => {
    router.push(path)
    if (onMobileMenuClose) {
      onMobileMenuClose()
    }
  }

  const handleCreateNewComic = () => {
    router.push('/comic-pad/script-builder')
    if (onMobileMenuClose) {
      onMobileMenuClose()
    }
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-[15%] h-screen fixed bg-black-200 border-r border-dashed border-white/30 py-10 px-1 lg:pl-3 xl:pl-10 flex-col z-40">
        {/* Logo */}
        <div className="flex items-center justify-left mb-12">
          <QuivaLogo 
            showText 
            className="invert !text-xl" 
            logoClassName="!w-8 lg:!w-8 xl:!w-12"
          />
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-6 mb-8">
          {navigationItems.map((item) => (
            <Button 
              key={item.path}
              variant="ghost" 
              className={`w-full justify-start font-semibold text-sm xl:text-lg transition-colors hover:text-white ${
                item.isActive 
                  ? 'text-white' 
                  : 'text-white/40 hover:bg-transparent'
              }`}
              onClick={() => handleNavigation(item.path)}
            >
              {item.label}
            </Button>
          ))}
        </nav>

        {/* Create New Comic Button */}
        <Button
          onClick={handleCreateNewComic}
          className="bg-secondary-300 hover:bg-secondary-300/90 text-black-200 font-medium rounded-full transition-all hover:scale-105 px-5 py-2 text-sm xl:text-base"
        >
          Create New Comic
        </Button>
      </aside>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-50 bg-black/50" 
          onClick={onMobileMenuClose} 
        />
      )}

      {/* Mobile Sidebar */}
      <aside className={`lg:hidden fixed top-0 left-0 h-full w-[280px] bg-black-200 border-r border-dashed border-white/30 px-4 py-6 flex flex-col z-50 transform transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Logo and Close Button */}
        <div className="flex justify-between items-center mb-12">
          <QuivaLogo showText className="invert" />
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-black-400"
            onClick={onMobileMenuClose}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-6 mb-8">
          {navigationItems.map((item) => (
            <Button 
              key={item.path}
              variant="ghost" 
              className={`w-full justify-start font-semibold transition-colors hover:text-white ${
                item.isActive 
                  ? 'text-white bg-black-400 hover:bg-black-300' 
                  : 'text-white/40 hover:bg-black-400'
              }`}
              onClick={() => handleNavigation(item.path)}
            >
              {item.label}
            </Button>
          ))}
        </nav>

        {/* Create New Comic Button */}
        <Button 
          className="bg-secondary-300 hover:bg-secondary-300/90 text-black-200 font-medium rounded-full transition-all hover:scale-105"
          onClick={handleCreateNewComic}
        >
          Create New Comic
        </Button>
      </aside>
    </>
  )
}