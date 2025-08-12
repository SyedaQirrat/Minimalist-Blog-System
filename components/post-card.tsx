"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

interface Post {
  id: number
  title: string
  content: string
  image: string
  authorId: string
  categoryId: string
  tags: string[]
}

interface PostCardProps {
  post: Post
  getAuthorName: (authorId: string) => string
  getCategoryName: (categoryId: string) => string
  onCategoryClick: (categoryId: string) => void
  onTagClick: (tag: string) => void
}

export default function PostCard({ post, getAuthorName, getCategoryName, onCategoryClick, onTagClick }: PostCardProps) {
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  const getFallbackImage = () => {
    const colors = ["f97316", "fbbf24", "10b981", "3b82f6", "8b5cf6", "ec4899"]
    const color = colors[post.id % colors.length]
    return `https://via.placeholder.com/800x400/${color}/ffffff?text=${encodeURIComponent(post.title)}`
  }

  return (
    <div className="break-inside-avoid mb-6">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group">
        {/* Post Image */}
        {post.image && (
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={imageError ? getFallbackImage() : post.image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              onError={handleImageError}
            />
          </div>
        )}

        {/* Content Block */}
        <div className="p-6 space-y-4">
          {/* Meta Information */}
          <div className="text-sm text-gray-500 font-light">
            {new Date().toLocaleDateString("en-US", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold uppercase tracking-wide leading-tight">
            <Link href={`/post/${post.id}`} className="hover:text-blue-600 transition-colors">
              {post.title}
            </Link>
          </h2>

          {/* Author and Category */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>by {getAuthorName(post.authorId)}</span>
            <span>•</span>
            <button onClick={() => onCategoryClick(post.categoryId)} className="hover:text-blue-600 transition-colors">
              {getCategoryName(post.categoryId)}
            </button>
          </div>

          {/* Content Preview */}
          <div className="text-gray-700 text-sm leading-relaxed">{post.content.substring(0, 150)}...</div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {post.tags.map((tag) => (
              <button
                key={tag}
                onClick={() => onTagClick(tag)}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
