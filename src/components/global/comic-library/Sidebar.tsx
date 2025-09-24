import { Button } from '@/components/ui/button'

export function Sidebar() {
  return (
    <aside className="w-64 bg-black border-r border-gray-800 px-4 py-6 flex flex-col">
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
  )
}