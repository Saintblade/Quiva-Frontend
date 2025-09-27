"use client"

import Link from "next/link"
import { Share2 } from "lucide-react"

export function ComicNotification() {
  return (
    <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-md mx-auto shadow-2xl">
      {/* Header with Quiva logo */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-gray-900 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
          <span className="text-white font-semibold text-lg">Quiva</span>
        </div>
      </div>

      {/* Comic panels grid */}
      <div className="mb-6">
        {/* Top row - 4 smaller panels */}
        <div className="grid grid-cols-4 gap-2 mb-2">
          <div className="aspect-square rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1590833059589-21b5ab6f6637?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fENvbWljJTIwcGFuZWx8ZW58MHx8MHx8fDA%3D"
              alt="Comic panel 1"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-square rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1633158106494-27c34f0b5768?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTl8fENvbWljJTIwcGFuZWwlMjBqb2tlcnxlbnwwfHwwfHx8MA%3D%3D"
              alt="Comic panel 2"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-square rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1663034297472-93c8127e9b9d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGRhcmslMjBoYWlyZWQlMjBhbmltZSUyMGNoYXJhY3Rlci5wbmd8ZW58MHx8MHx8fDA%3D"
              alt="Comic panel 3"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-square rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1705932461994-6fb2b07f27dd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFuaW1lJTIwY2hhcmFjdGVyJTIwd2l0aCUyMHllbGxvdyUyMGFjY2VudHN8ZW58MHx8MHx8fDA%3D"
              alt="Comic panel 4"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Bottom row - 2 larger panels */}
        <div className="grid grid-cols-2 gap-2">
          <div className="aspect-[4/3] rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1727428033763-ee801b92d570?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGFuaW1lJTIwY2hhcmFjdGVyJTIwd2l0aCUyMHJlZCUyMGNhcCUyMGluJTIwdXJiYW4lMjBzZXR0aW5nfGVufDB8fDB8fHww"
              alt="Comic panel 5"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-[4/3] rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1702138129392-364adea0ad00?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGNvbWl4JTIwc3VwZXJtYW58ZW58MHx8MHx8fDA%3D"
              alt="Comic panel 6"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Status text */}
      <div className="text-center mb-6">
        <p className="text-white text-lg font-medium">
          Your comic <span className="text-orange-400">&quot;Darling&quot;</span> is LIVE!
        </p>
      </div>

      {/* Action buttons */}
      <div className="space-y-3">
        <Link href="/comic-pad/my-comics">
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-full transition">
            View comic
          </button>
        </Link>

        <button className="w-full border border-gray-600 text-white hover:bg-gray-800 font-semibold py-3 rounded-full flex items-center justify-center gap-2 transition">
          <Share2 className="w-4 h-4" />
          Share comic
        </button>
      </div>
    </div>
  )
}
