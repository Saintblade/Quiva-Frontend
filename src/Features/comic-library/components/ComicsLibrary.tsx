'use client'

import {ComicCard} from "@/components/cards/ComicCard"
import {ChevronDown} from "lucide-react"
import {useState} from "react"
import EmptyState from "../utils/EmptyState"

export function ComicsLibrary({
    comics,
    title = "All"
}) {
    const [filterBy,
        setFilterBy] = useState("All")
    const [sortBy,
        setSortBy] = useState("Recently Added")

    const filterOptions = ["All", "Premium", "Free", "Completed", "Reading"]
    const sortOptions = ["Recently Added", "Alphabetical", "Most Pages", "Oldest First"]

    // Filter and sort logic
    const filteredAndSortedComics = comics.filter(comic => {
        if (filterBy === "All") 
            return true
        if (filterBy === "Premium") 
            return comic.isPremium
        if (filterBy === "Free") 
            return !comic.isPremium
        return true
    }).sort((a, b) => {
        switch (sortBy) {
            case "Alphabetical":
                return a
                    .title
                    .localeCompare(b.title)
                case "Most Pages":
                return b.pages - a.pages
            case "Oldest First":
                return (a.dateAdded
                    ?.getTime() || 0) - (b.dateAdded
                    ?.getTime() || 0)
            default: // Recently Added
                return (b.dateAdded
                    ?.getTime() || 0) - (a.dateAdded
                    ?.getTime() || 0)
        }
    })

    return (
        <section className="space-y-6">
            {/* Header with Filters */}
            <div
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-white text-xl font-bold">{title}</h2>

                <div className="flex items-center space-x-4">
                    {/* Filter Dropdown */}
                    <div className="flex items-center space-x-2">
                        <span className="text-white text-sm">Filter By:</span>
                        <div className="relative">
                            <select
                                value={filterBy}
                                onChange={(e) => setFilterBy(e.target.value)}
                                className="bg-black-500 border border-gray-700 text-white text-sm rounded-md px-3 py-1.5 pr-8 focus:border-orange-500 focus:outline-none appearance-none cursor-pointer">
                                {filterOptions.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                            <ChevronDown
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white pointer-events-none"/>
                        </div>
                    </div>

                    {/* Sort Dropdown */}
                    <div className="flex items-center space-x-2">
                        <span className="text-white text-sm">Sort By:</span>
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-gray-800 border border-gray-700 text-white text-sm rounded-md px-3 py-1.5 pr-8 focus:border-orange-500 focus:outline-none appearance-none cursor-pointer">
                                {sortOptions.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                            <ChevronDown
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white pointer-events-none"/>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            {filteredAndSortedComics.length === 0
                ? (<EmptyState/>)
                : (
                    <div
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12">
                        {filteredAndSortedComics.map((comic) => (<ComicCard key={comic.id} {...comic}/>))}
                    </div>
                )}
        </section>
    )
}