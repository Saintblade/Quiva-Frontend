'use client'

import { Search, Bell, User, Menu } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { QuivaLogo } from '@/components/utils/function'
import { useState } from 'react'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="bg-[#1A1A1A] border-b border-dashed border-white/30 px-4 lg:px-6 py-3 flex items-center justify-between">
        {/* Mobile Menu Button + Logo */}
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden text-white"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>
          <div className="flex items-center space-x-3">
            <QuivaLogo showText className='invert' />
          </div>
        </div>

        {/* Search Bar - Hidden on mobile, shown on tablet+ */}
        <div className="hidden md:flex flex-1 max-w-md mx-4 lg:mx-8 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input 
            placeholder="Search comics, creators..."
            className="!bg-transparent border-[#242424] text-white pl-10 focus:border-white/50"
          />
        </div>

        {/* Mobile Search Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Search className="w-5 h-5" />
          </Button>
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-2 lg:space-x-3">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Bell className="w-4 h-4 lg:w-5 lg:h-5" />
          </Button>
          <div className="w-7 h-7 lg:w-8 lg:h-8 bg-orange-500 rounded-full flex items-center justify-center">
            <User className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
          </div>
        </div>
      </header>

      {/* Mobile Search Bar - Shows below header on mobile */}
      <div className="md:hidden bg-[#1A1A1A] border-b border-dashed border-white/30 px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input 
            placeholder="Search comics, creators..."
            className="!bg-transparent border-[#242424] text-white pl-10 focus:border-white/50"
          />
        </div>
      </div>
    </>
  )
}