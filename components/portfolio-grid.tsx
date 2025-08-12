"use client"

import { useState } from "react"
import Link from "next/link"

interface Post {
  id: number
  title: string
  content: string
  image: string
  authorId: string
  categoryId: string
  tags: string[]
}

interface Author {
  authorId: string
  name: string
}

interface Category {
  categoryId: string
  name: string
}

interface BlogData {
  posts: Post[]
  authors: Author[]
  categories: Category[]
}

interface PortfolioGridProps {
  filteredPosts: Post[]
  authors: Author[]
  categories: Category[]
}

export function PortfolioGrid({ filteredPosts, authors, categories }: PortfolioGridProps) {
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({})

  const handleImageError = (postId: number) => {
    setImageErrors((prev) => ({ ...prev, [postId]: true }))
  }

  const getFallbackImage = (post: Post) => {
    const colors = ["f97316", "fbbf24", "10b981", "3b82f6", "8b5cf6", "ec4899"]
    const color = colors[post.id % colors.length]
    return `https://via.placeholder.com/400x${300 + (post.id % 3) * 100}/${color}/ffffff?text=${encodeURIComponent(post.title.substring(0, 20))}`
  }

  const getCardHeight = (index: number) => {
    const heights = [
      "h-[280px]", // Short
      "h-[480px]", // Tall
      "h-[220px]", // Very short
      "h-[420px]", // Medium-tall
      "h-[320px]", // Medium
      "h-[550px]", // Very tall
      "h-[180px]", // Extra short
      "h-[380px]", // Medium-short
      "h-[500px]", // Extra tall
      "h-[260px]", // Short-medium
    ]
    return heights[index % heights.length]
  }

  const getContentLength = (index: number, content: string) => {
    const lengths = [60, 120, 40, 100, 70, 150, 35, 90, 130, 50]
    const targetLength = lengths[index % lengths.length]
    return content.length > targetLength ? content.substring(0, targetLength) + "..." : content
  }

  return (
    <section className="bg-gray-50 py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 auto-rows-max">
          {filteredPosts.map((post, index) => {
            const author = authors.find((a) => a.authorId === post.authorId)
            const category = categories.find((c) => c.categoryId === post.categoryId)

            return (
              <Link href={`/post/${post.id}`} key={post.id}>
                <div
                  className={`bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer group transform hover:-translate-y-3 hover:scale-[1.02] ${getCardHeight(index)} flex flex-col`}
                >
                  <div className="flex-1 overflow-hidden relative">
                    <img
                      src={imageErrors[post.id] ? getFallbackImage(post) : post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={() => handleImageError(post.id)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-3 md:p-4 bg-white">
                    <p className="text-xs font-light text-gray-500 mb-2 tracking-wide">
                      {new Date().toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}{" "}
                      • {author?.name}
                    </p>
                    <h3 className="text-sm font-bold text-gray-900 leading-tight tracking-wide group-hover:text-gray-700 transition-colors duration-300 mb-2">
                      {post.title.toUpperCase()}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed mb-2">
                      {getContentLength(index, post.content)}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      <span
                        className="px-2 py-1 text-xs font-medium rounded-full text-white"
                        style={{ backgroundColor: "#aab8f7" }}
                      >
                        {category?.name}
                      </span>
                      {post.tags.slice(0, 1).map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
