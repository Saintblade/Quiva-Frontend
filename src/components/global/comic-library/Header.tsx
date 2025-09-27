import { Search, Bell, User } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="bg-black border-b border-gray-800 px-6 py-3 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <span className="text-black font-bold text-sm">Q</span>
        </div>
        <span className="text-white font-semibold text-lg">Quiva</span>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-md mx-8 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input 
          placeholder="Search comics, creators..."
          className="bg-gray-900 border-gray-700 text-white pl-10 focus:border-orange-500"
        />
      </div>

      {/* User Actions */}
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
          <Bell className="w-5 h-5" />
        </Button>
        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
      </div>
    </header>
  )
}