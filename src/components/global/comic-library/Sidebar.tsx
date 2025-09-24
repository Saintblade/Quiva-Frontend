'use client'

import { Button } from '@/components/ui/button'
import { QuivaLogo } from '@/components/utils/function'
import { X } from 'lucide-react'
import { useState } from 'react'

export function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-[280px] h-screen fixed bg-[#1A1A1A] border-r border-dashed border-white/80 px-4 py-6 flex-col z-40">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8 pt-2">
          <QuivaLogo showText className='invert' />
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-2 mb-8">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-white hover:bg-gray-800 font-medium"
          >
            Explore
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-gray-400 hover:bg-gray-800 hover:text-white"
          >   
            My Library
          </Button>
        </nav>

        {/* Become a Creator Button */}
        <Button className="bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-full">
          Become a Creator
        </Button>
      </aside>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Mobile Sidebar */}
      <aside className={`lg:hidden fixed top-0 left-0 h-full w-[280px] bg-[#1A1A1A] border-r border-dashed border-white/80 px-4 py-6 flex flex-col z-50 transform transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Logo and Close Button */}
        <div className="flex justify-between items-center mb-8">
          <QuivaLogo showText className='invert' />
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-2 mb-8">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-white hover:bg-gray-800 font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Explore
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-gray-400 hover:bg-gray-800 hover:text-white"
            onClick={() => setIsMobileMenuOpen(false)}
          >   
            My Library
          </Button>
        </nav>

        {/* Become a Creator Button */}
        <Button 
          className="bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-full"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Become a Creator
        </Button>
      </aside>

      {/* Mobile Menu State Hook for Parent Component */}
      <script dangerouslySetInnerHTML={{
        __html: `
          window.isMobileMenuOpen = ${isMobileMenuOpen};
        `
      }} />
    </>
  )
}