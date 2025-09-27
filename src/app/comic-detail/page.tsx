'use client'
import {Button} from '@/components/ui/button'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {Badge} from '@/components/ui/badge'
import {Calendar, BookOpen, User, Building} from 'lucide-react'

interface Comic {
    id : string
    title : string
    issueNumber : number
    coverImage : string
    isFree?: boolean
    tags?: string[]
    description : string
    author : {
        name: string
        avatar?: string
    }
    pages : number
    publisher : string
    publicationDate : string
    relatedIssues?: RelatedIssue[]
}

interface RelatedIssue {
    id : string
    title : string
    coverImage : string
    publicationDate : string
    isFree?: boolean
}

interface ComicDetailPageProps {
    comic : Comic
}

const RelatedIssueCard = ({issue} : {
    issue: RelatedIssue
}) => (
    <div className="relative group cursor-pointer">
        <div
            className="relative overflow-hidden rounded-lg bg-gray-900 aspect-[3/4] border border-gray-700/50 hover:border-gray-600/60 transition-all duration-200">
            {/* Free Badge */}
            {issue.isFree && (
                <div
                    className="absolute top-2 left-2 z-10 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-md">
                    Free
                </div>
            )}

            {/* Cover Image */}
            <img
                src={issue.coverImage}
                alt={issue.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/> {/* Overlay */}
            <div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"/> {/* Issue Info */}
            <div
                className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
                <h4 className="text-white font-bold text-sm mb-1 line-clamp-2">
                    {issue.title}
                </h4>
                <p className="text-gray-400 text-xs">
                    {new Date(issue.publicationDate).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    })}
                </p>
            </div>
        </div>
    </div>
)



export function ComicDetailPage() {

    const comic: Comic = {
        id: 'into-the-fold-issue-2',
        title: 'Into the Fold',
        issueNumber: 2,
        coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
        isFree: true,
        tags: ['Sci-Fi', 'Adventure'],
        description: 'Spaceships! Twin beasts are better than one, but two hundred thousand beasts invading from space will encounter scavengers aiming to take them over and turn them into Earth Toomies and definitely worse. The horror/ comedy series follows Imperial Chuck as he stumbles his way through mind-bending alien conspiracies, black comedy terror and a post-space era wasteland they call home.',
        author: {
            name: 'Maya Lee',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9c2e20c?w=100&h=100&fit=crop&crop=face'
        },
        pages: 24,
        publisher: 'TOSHIES',
        publicationDate: '2023-12-18',
        relatedIssues: [
            {
            id: 'guardian-forgotten-temple-3',
            title: 'Guardian of the Forgotten Temple #3',
            coverImage: 'https://images.unsplash.com/photo-1578662015905-6a4c1d4e8f0a?w=300&h=400&fit=crop',
            publicationDate: '2025-06-12',
            isFree: true
            },
            {
            id: 'guardian-forgotten-temple-2',
            title: 'Guardian of the Forgotten Temple #2', 
            coverImage: 'https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?w=300&h=400&fit=crop',
            publicationDate: '2025-06-19',
            isFree: true
            },
            {
            id: 'into-the-fold-issue-1',
            title: 'Into the Fold: Issue #1',
            coverImage: 'https://images.unsplash.com/photo-1578662019011-c85d8b2b8b6d?w=300&h=400&fit=crop',
            publicationDate: '2023-11-15',
            isFree: false
            },
            {
            id: 'into-the-fold-issue-3',
            title: 'Into the Fold: Issue #3',
            coverImage: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=300&h=400&fit=crop',
            publicationDate: '2024-01-20',
            isFree: false
            }
        ]
    }
    const formatDate = (dateString : string) => {
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
    }

    return (
        <div className="min-h-screen bg-black-500 text-white">
            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">

                {/* Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">

                    {/* Cover Image */}
                    <div className="lg:col-span-1">
                        <div className="relative">
                            <div
                                className="relative overflow-hidden rounded-lg bg-gray-800 aspect-[3/4] border border-gray-700/50">
                                {/* Free Badge */}
                                {comic.isFree && (
                                    <div
                                        className="absolute top-4 left-4 z-10 bg-green-600 text-white text-sm font-bold px-3 py-1.5 rounded-md">
                                        Free
                                    </div>
                                )}

                                {/* Tags */}
                                {comic.tags && comic.tags.length > 0 && (
                                    <div className="absolute top-4 right-4 z-10 flex flex-wrap gap-2">
                                        {comic
                                            .tags
                                            .map((tag) => (
                                                <Badge
                                                    key={tag}
                                                    variant="secondary"
                                                    className="bg-gray-700/80 text-white text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                    </div>
                                )}

                                {/* Cover Image */}
                                <img
                                    src={comic.coverImage}
                                    alt={comic.title}
                                    className="w-full h-full object-cover"/>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-6 space-y-3">
                                <Button
                                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-lg">
                                    Read Issue
                                </Button>
                                <div className="grid grid-cols-2 gap-3">
                                    <Button
                                        variant="outline"
                                        className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white">
                                        Preview Issue
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white">
                                        Enlarge Cover
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Comic Info */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Title and Author */}
                        <div>
                            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                                {comic.title}: Issue #{comic.issueNumber}
                            </h1>

                            <div className="flex items-center space-x-3 mb-6">
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src={comic.author.avatar} alt={comic.author.name}/>
                                    <AvatarFallback className="bg-gray-700 text-white text-sm">
                                        {comic
                                            .author
                                            .name
                                            .split(' ')
                                            .map(n => n[0])
                                            .join('')
                                            .toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="text-gray-300">By {comic.author.name}</span>
                            </div>
                        </div>

                        {/* About This Comic */}
                        <div>
                            <h2 className="text-xl font-bold text-white mb-3">About This Comic</h2>
                            <p className="text-gray-300 leading-relaxed">
                                {comic.description}
                            </p>
                        </div>

                        {/* Issue Details */}
                        <div>
                            <h3 className="text-lg font-bold text-white mb-4">Issue Details</h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {/* Creator */}
                                <div className="flex items-start space-x-3">
                                    <div
                                        className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <User className="w-4 h-4 text-white"/>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">Creator</p>
                                        <p className="text-white font-medium">{comic.author.name}</p>
                                    </div>
                                </div>

                                {/* Issue Length */}
                                <div className="flex items-start space-x-3">
                                    <div
                                        className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <BookOpen className="w-4 h-4 text-white"/>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">Issue Length</p>
                                        <p className="text-white font-medium">{comic.pages}
                                            pages</p>
                                    </div>
                                </div>

                                {/* Publisher */}
                                <div className="flex items-start space-x-3">
                                    <div
                                        className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <Building className="w-4 h-4 text-white"/>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">Publisher</p>
                                        <p className="text-white font-medium">{comic.publisher}</p>
                                    </div>
                                </div>

                                {/* Publication Date */}
                                <div className="flex items-start space-x-3">
                                    <div
                                        className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <Calendar className="w-4 h-4 text-white"/>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">Publication Date</p>
                                        <p className="text-white font-medium">{formatDate(comic.publicationDate)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Other Issues Section */}
                {comic.relatedIssues && comic.relatedIssues.length > 0 && (
                    <div>
                        <h3 className="text-xl font-bold text-white mb-6">Other issues in this comic</h3>
                        <div
                            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                            {comic
                                .relatedIssues
                                .map((issue) => (<RelatedIssueCard key={issue.id} issue={issue}/>))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}


export default ComicDetailPage