"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { 
  SearchIcon,
  FilterIcon,
  PlusIcon,
  FileTextIcon,
  LinkIcon,
  UploadIcon,
  MoreVerticalIcon,
  CalendarIcon,
  TagIcon,
  UserIcon,
  ShieldIcon,
  AlertTriangleIcon,
  TrendingUpIcon,
  UsersIcon,
  ArrowUpIcon,
  MessageCircleIcon,
  ShareIcon,
  DollarSignIcon,
  PackageIcon,
  StarIcon,
  EyeIcon,
  ShoppingCartIcon,
  BookOpenIcon,
  MessageSquareIcon,
  HelpCircleIcon,
  BugIcon
} from "lucide-react"

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useData } from '@/hooks/use-data'
import { useProjects } from '@/hooks/use-projects'

const dataTypes = [
  { id: 'context', name: 'Context', icon: BookOpenIcon },
  { id: 'issues', name: 'Issues', icon: BugIcon },
  { id: 'inquiries', name: 'Inquiries', icon: MessageSquareIcon },
  { id: 'products', name: 'Products', icon: PackageIcon }
]

export function KnowledgeBase() {
  const [selectedType, setSelectedType] = useState<'context' | 'issues' | 'inquiries' | 'products'>('context')
  const [searchTerm, setSearchTerm] = useState("")
  const [showCreateForm, setShowCreateForm] = useState(false)
  
  const { projects } = useProjects()
  const { data, loading, error } = useData(undefined, selectedType)

  const filteredData = React.useMemo(() => {
    return data.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      return matchesSearch
    })
  }, [data, searchTerm])

  const renderContextCard = (item: typeof data[0]) => (
    <Card
      key={item.id}
      className="bg-sidebar-accent border-sidebar-border hover:border-sidebar-foreground/20 transition-all duration-200 cursor-pointer p-6"
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-10 h-10 rounded-lg bg-sidebar-border flex items-center justify-center flex-shrink-0">
              <BookOpenIcon className="h-5 w-5 text-sidebar-foreground/70" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sidebar-foreground font-semibold text-base line-clamp-1 mb-1">
                {item.title}
              </h3>
              <div className="flex items-center gap-2 text-xs text-sidebar-foreground/60">
                <CalendarIcon className="h-3 w-3" />
                <span>{new Date(item.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-sidebar-foreground/60 hover:text-sidebar-foreground flex-shrink-0">
            <MoreVerticalIcon className="h-4 w-4" />
          </Button>
        </div>

        {/* Description */}
        <p className="text-sidebar-foreground/70 text-sm line-clamp-2 leading-relaxed">
          {item.description}
        </p>

        {/* Tags */}
        {item.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {item.tags.slice(0, 3).map((tag, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs bg-sidebar-foreground/5 text-sidebar-foreground/60 border-sidebar-foreground/10"
              >
                {tag}
              </Badge>
            ))}
            {item.tags.length > 3 && (
              <Badge
                variant="outline"
                className="text-xs bg-sidebar-foreground/5 text-sidebar-foreground/60 border-sidebar-foreground/10"
              >
                +{item.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-sidebar-border">
          <div className="flex items-center gap-4 text-xs text-sidebar-foreground/60">
            <div className="flex items-center gap-1">
              <EyeIcon className="h-3 w-3" />
              <span>Views</span>
            </div>
            <div className="flex items-center gap-1">
              <TagIcon className="h-3 w-3" />
              <span>{item.tags.length} tags</span>
            </div>
          </div>
          <div className="text-xs text-sidebar-foreground/60">
            {item.metadata?.source && (
              <span className="capitalize">{item.metadata.source}</span>
            )}
          </div>
        </div>
      </div>
    </Card>
  )

  const renderIssueCard = (item: typeof data[0]) => (
    <Card
      key={item.id}
      className="bg-sidebar-accent border-sidebar-border hover:border-sidebar-foreground/20 transition-all duration-200 cursor-pointer overflow-hidden"
    >
      {/* Priority indicator bar */}
      <div className={`h-1 w-full ${
        item.metadata?.priority === 'high' ? 'bg-red-500' :
        item.metadata?.priority === 'medium' ? 'bg-yellow-500' :
        'bg-green-500'
      }`} />
      
      <div className="p-4 sm:p-6">
        <div className="space-y-4">
          {/* Header with responsive layout */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div className="flex items-start gap-3 min-w-0 flex-1">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-sidebar-border flex items-center justify-center flex-shrink-0">
                <ShieldIcon className="h-4 w-4 sm:h-5 sm:w-5 text-sidebar-foreground/70" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs bg-sidebar-foreground/10 text-sidebar-foreground/70 border-sidebar-foreground/20">
                    Issue
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className={`text-xs border-sidebar-foreground/20 ${
                      item.metadata?.priority === 'high' ? 'bg-red-500/10 text-red-600 border-red-500/20' :
                      item.metadata?.priority === 'medium' ? 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' :
                      'bg-green-500/10 text-green-600 border-green-500/20'
                    }`}
                  >
                    {item.metadata?.priority || 'low'}
                  </Badge>
                </div>
              </div>
            </div>
            
            {/* Report count - responsive positioning */}
            <div className="flex items-center gap-2 text-sidebar-foreground/60 flex-shrink-0">
              <UsersIcon className="h-4 w-4" />
              <div className="text-right">
                <div className="text-lg sm:text-xl font-bold text-sidebar-foreground leading-none">
                  {item.metadata?.reportCount || 1}
                </div>
                <div className="text-xs leading-none">
                  report{(item.metadata?.reportCount || 1) !== 1 ? 's' : ''}
                </div>
              </div>
            </div>
          </div>

          {/* Title and description */}
          <div className="space-y-2">
            <h3 className="text-sidebar-foreground font-semibold text-base sm:text-lg line-clamp-2 leading-tight">
              {item.title}
            </h3>
            <p className="text-sidebar-foreground/70 text-sm line-clamp-2 leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Footer with responsive layout */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 border-t border-sidebar-border">
            <div className="flex items-center gap-4 text-xs text-sidebar-foreground/60">
              <div className="flex items-center gap-1">
                <CalendarIcon className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">
                  {new Date(item.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUpIcon className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">
                  {item.metadata?.status || 'Active'}
                </span>
              </div>
            </div>
            {item.metadata?.ticketId && (
              <div className="text-xs text-sidebar-foreground/60 font-mono">
                {item.metadata.ticketId}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  )

  const renderInquiryCard = (item: typeof data[0]) => (
    <Card
      key={item.id}
      className="bg-sidebar-accent border-sidebar-border hover:border-sidebar-foreground/20 transition-all duration-200 cursor-pointer p-4 sm:p-6"
    >
      <div className="space-y-4">
        {/* Header with responsive layout */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-sidebar-border flex items-center justify-center flex-shrink-0">
            <UserIcon className="h-4 w-4 sm:h-5 sm:w-5 text-sidebar-foreground/70" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
              <div className="flex flex-wrap items-center gap-2 text-sm text-sidebar-foreground/70">
                <span className="font-medium truncate">
                  {item.metadata?.author || 'community'}
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="text-xs sm:text-sm truncate">
                  {new Date(item.created_at).toLocaleDateString()}
                </span>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6 sm:h-8 sm:w-8 text-sidebar-foreground/60 hover:text-sidebar-foreground flex-shrink-0 self-start sm:self-center">
                <MoreVerticalIcon className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
            <div className="mt-1">
              <Badge variant="outline" className="text-xs bg-sidebar-foreground/10 text-sidebar-foreground/70 border-sidebar-foreground/20">
                Discussion
              </Badge>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h3 className="text-sidebar-foreground font-semibold text-base sm:text-lg line-clamp-2 leading-tight">
            {item.title}
          </h3>
          <p className="text-sidebar-foreground/70 text-sm line-clamp-3 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Actions with responsive layout */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 border-t border-sidebar-border">
          <div className="flex items-center gap-4 sm:gap-6">
            <Button variant="ghost" size="sm" className="h-8 px-2 text-sidebar-foreground/60 hover:text-sidebar-foreground">
              <ArrowUpIcon className="h-3 w-3 mr-1" />
              <span className="text-xs">Upvote</span>
            </Button>
            <Button variant="ghost" size="sm" className="h-8 px-2 text-sidebar-foreground/60 hover:text-sidebar-foreground">
              <MessageCircleIcon className="h-3 w-3 mr-1" />
              <span className="text-xs">Reply</span>
            </Button>
            <Button variant="ghost" size="sm" className="h-8 px-2 text-sidebar-foreground/60 hover:text-sidebar-foreground">
              <ShareIcon className="h-3 w-3 mr-1" />
              <span className="text-xs">Share</span>
            </Button>
          </div>
          
          {/* Tags - responsive positioning */}
          {item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {item.tags.slice(0, 2).map((tag, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-xs bg-sidebar-foreground/5 text-sidebar-foreground/60 border-sidebar-foreground/10"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  )

  const renderProductCard = (item: typeof data[0]) => (
    <Card
      key={item.id}
      className="bg-sidebar-accent border-sidebar-border hover:border-sidebar-foreground/20 transition-all duration-200 cursor-pointer overflow-hidden"
    >
      {/* Product image placeholder */}
      <div className="aspect-video bg-sidebar-border flex items-center justify-center">
        <PackageIcon className="h-12 w-12 text-sidebar-foreground/40" />
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h3 className="text-sidebar-foreground font-semibold text-lg line-clamp-1 mb-2">
                {item.title}
              </h3>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs bg-sidebar-foreground/10 text-sidebar-foreground/70 border-sidebar-foreground/20">
                  Product
                </Badge>
                {item.metadata?.category && (
                  <Badge variant="outline" className="text-xs bg-sidebar-foreground/5 text-sidebar-foreground/60 border-sidebar-foreground/10">
                    {item.metadata.category}
                  </Badge>
                )}
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-sidebar-foreground/60 hover:text-sidebar-foreground flex-shrink-0">
              <MoreVerticalIcon className="h-4 w-4" />
            </Button>
          </div>

          {/* Description */}
          <p className="text-sidebar-foreground/70 text-sm line-clamp-3 leading-relaxed">
            {item.description}
          </p>

          {/* Price and stats */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {item.metadata?.price && (
                <div className="flex items-center gap-1 text-sidebar-foreground font-semibold">
                  <DollarSignIcon className="h-4 w-4" />
                  <span>{item.metadata.price}</span>
                </div>
              )}
              <div className="flex items-center gap-1 text-xs text-sidebar-foreground/60">
                <StarIcon className="h-3 w-3" />
                <span>{item.metadata?.rating || '4.5'}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8 bg-sidebar-accent border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent/80">
                <EyeIcon className="h-3 w-3 mr-1" />
                View
              </Button>
              <Button size="sm" className="h-8 bg-sidebar-foreground text-sidebar hover:bg-sidebar-foreground/90">
                <ShoppingCartIcon className="h-3 w-3 mr-1" />
                Add
              </Button>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-sidebar-border text-xs text-sidebar-foreground/60">
            <div className="flex items-center gap-1">
              <CalendarIcon className="h-3 w-3" />
              <span>Added {new Date(item.created_at).toLocaleDateString()}</span>
            </div>
            {item.metadata?.inStock !== undefined && (
              <span className={item.metadata.inStock ? 'text-green-600' : 'text-red-600'}>
                {item.metadata.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  )

  const renderSkeletonCard = (type: string) => {
    if (type === 'context') {
      return (
        <Card className="bg-sidebar-accent border-sidebar-border p-6 animate-pulse">
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-lg bg-sidebar-border" />
                <div className="flex-1">
                  <div className="h-4 bg-sidebar-border rounded mb-2 w-3/4" />
                  <div className="h-3 bg-sidebar-border rounded w-1/2" />
                </div>
              </div>
              <div className="w-8 h-8 bg-sidebar-border rounded" />
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-sidebar-border rounded w-full" />
              <div className="h-3 bg-sidebar-border rounded w-2/3" />
            </div>
            <div className="flex gap-2">
              <div className="h-6 bg-sidebar-border rounded w-16" />
              <div className="h-6 bg-sidebar-border rounded w-20" />
            </div>
          </div>
        </Card>
      )
    }

    if (type === 'issues') {
      return (
        <Card className="bg-sidebar-accent border-sidebar-border overflow-hidden animate-pulse">
          <div className="h-1 bg-sidebar-border w-full" />
          <div className="p-4 sm:p-6">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-sidebar-border flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex gap-2 mb-2">
                      <div className="h-5 bg-sidebar-border rounded w-12" />
                      <div className="h-5 bg-sidebar-border rounded w-16" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-sidebar-border rounded" />
                  <div className="text-right">
                    <div className="h-6 bg-sidebar-border rounded w-8 mb-1" />
                    <div className="h-3 bg-sidebar-border rounded w-12" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-5 bg-sidebar-border rounded w-3/4" />
                <div className="h-4 bg-sidebar-border rounded w-full" />
                <div className="h-4 bg-sidebar-border rounded w-2/3" />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 border-t border-sidebar-border">
                <div className="flex gap-4">
                  <div className="h-3 bg-sidebar-border rounded w-16" />
                  <div className="h-3 bg-sidebar-border rounded w-12" />
                </div>
                <div className="h-3 bg-sidebar-border rounded w-16" />
              </div>
            </div>
          </div>
        </Card>
      )
    }

    if (type === 'inquiries') {
      return (
        <Card className="bg-sidebar-accent border-sidebar-border p-4 sm:p-6 animate-pulse">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-sidebar-border flex-shrink-0" />
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex gap-2">
                    <div className="h-4 bg-sidebar-border rounded w-20" />
                    <div className="h-4 bg-sidebar-border rounded w-16" />
                  </div>
                  <div className="w-6 h-6 bg-sidebar-border rounded" />
                </div>
                <div className="h-5 bg-sidebar-border rounded w-16 mt-1" />
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-5 bg-sidebar-border rounded w-3/4" />
              <div className="h-4 bg-sidebar-border rounded w-full" />
              <div className="h-4 bg-sidebar-border rounded w-5/6" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 border-t border-sidebar-border">
              <div className="flex gap-4">
                <div className="h-6 bg-sidebar-border rounded w-16" />
                <div className="h-6 bg-sidebar-border rounded w-12" />
                <div className="h-6 bg-sidebar-border rounded w-14" />
              </div>
              <div className="flex gap-1">
                <div className="h-5 bg-sidebar-border rounded w-12" />
                <div className="h-5 bg-sidebar-border rounded w-16" />
              </div>
            </div>
          </div>
        </Card>
      )
    }

    if (type === 'products') {
      return (
        <Card className="bg-sidebar-accent border-sidebar-border overflow-hidden animate-pulse">
          <div className="aspect-video bg-sidebar-border" />
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="h-6 bg-sidebar-border rounded w-3/4 mb-2" />
                  <div className="flex gap-2">
                    <div className="h-5 bg-sidebar-border rounded w-16" />
                    <div className="h-5 bg-sidebar-border rounded w-20" />
                  </div>
                </div>
                <div className="w-8 h-8 bg-sidebar-border rounded" />
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-sidebar-border rounded w-full" />
                <div className="h-4 bg-sidebar-border rounded w-2/3" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-4">
                  <div className="h-5 bg-sidebar-border rounded w-12" />
                  <div className="h-4 bg-sidebar-border rounded w-8" />
                </div>
                <div className="flex gap-2">
                  <div className="h-8 bg-sidebar-border rounded w-16" />
                  <div className="h-8 bg-sidebar-border rounded w-12" />
                </div>
              </div>
            </div>
          </div>
        </Card>
      )
    }

    return null
  }

  const renderDataCard = (item: typeof data[0]) => {
    switch (item.type) {
      case 'context':
        return renderContextCard(item)
      case 'issues':
        return renderIssueCard(item)
      case 'inquiries':
        return renderInquiryCard(item)
      case 'products':
        return renderProductCard(item)
      default:
        return renderContextCard(item)
    }
  }

  if (showCreateForm) {
    return (
      <div className="flex flex-col h-full w-full max-w-full overflow-hidden bg-background">
        <div className="flex-1 overflow-y-auto min-h-0">
          <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="max-w-2xl mx-auto">
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-sidebar-foreground mb-2">
                  Add New {dataTypes.find(t => t.id === selectedType)?.name}
                </h1>
                <p className="text-sidebar-foreground/70">
                  Create a new {selectedType} entry for your knowledge base
                </p>
              </div>
              
              <Card className="bg-sidebar-accent border-sidebar-border p-6">
                <p className="text-sidebar-foreground/70 text-center py-8">
                  Create form for {selectedType} will be implemented here
                </p>
                <div className="flex gap-3 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setShowCreateForm(false)}
                    className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent/80"
                  >
                    Cancel
                  </Button>
                  <Button className="bg-sidebar-foreground text-sidebar hover:bg-sidebar-foreground/90">
                    Create {dataTypes.find(t => t.id === selectedType)?.name}
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full w-full max-w-full overflow-hidden bg-background">
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-semibold text-sidebar-foreground mb-2">
                    Data Library
                  </h1>
                  <p className="text-sidebar-foreground/70">
                    Manage your knowledge base with context, issues, inquiries, and products
                  </p>
                </div>
                <Button
                  onClick={() => setShowCreateForm(true)}
                  className="bg-sidebar-foreground text-sidebar hover:bg-sidebar-foreground/90"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add {dataTypes.find(t => t.id === selectedType)?.name}
                </Button>
              </div>

              {/* Search */}
              <div className="relative max-w-md mb-6">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-sidebar-foreground/40" />
                <Input
                  placeholder="Search data..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/40"
                />
              </div>

              {/* Type Filters */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {dataTypes.map((type) => (
                  <Button
                    key={type.id}
                    variant={selectedType === type.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSelectedType(type.id as any)}
                    className={`whitespace-nowrap flex-shrink-0 ${
                      selectedType === type.id
                        ? "bg-sidebar-foreground text-sidebar hover:bg-sidebar-foreground/90"
                        : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                    }`}
                  >
                    <type.icon className="h-4 w-4 mr-2" />
                    {type.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Content */}
            {loading ? (
              <div className={`grid gap-6 ${
                selectedType === 'context' ? 'grid-cols-1 lg:grid-cols-2' :
                selectedType === 'issues' ? 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3' :
                selectedType === 'inquiries' ? 'grid-cols-1 lg:grid-cols-2' :
                'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }`}>
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index}>
                    {renderSkeletonCard(selectedType)}
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="bg-sidebar-accent rounded-lg p-8 max-w-md mx-auto">
                  <div className="text-4xl mb-4">⚠️</div>
                  <h3 className="text-sidebar-foreground text-lg font-semibold mb-2">
                    Error Loading Data
                  </h3>
                  <p className="text-sidebar-foreground/70 mb-4">
                    {error}
                  </p>
                  <Button
                    onClick={() => window.location.reload()}
                    className="bg-sidebar-foreground text-sidebar hover:bg-sidebar-foreground/90"
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            ) : filteredData.length > 0 ? (
              <div className={`grid gap-6 ${
                selectedType === 'context' ? 'grid-cols-1 lg:grid-cols-2' :
                selectedType === 'issues' ? 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3' :
                selectedType === 'inquiries' ? 'grid-cols-1 lg:grid-cols-2' :
                'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }`}>
                {filteredData.map(renderDataCard)}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="bg-sidebar-accent rounded-lg p-8 max-w-md mx-auto">
                  <div className="text-4xl mb-4">
                    {selectedType === 'context' ? '📚' :
                     selectedType === 'issues' ? '🐛' :
                     selectedType === 'inquiries' ? '💬' :
                     '📦'}
                  </div>
                  <h3 className="text-sidebar-foreground text-lg font-semibold mb-2">
                    No {dataTypes.find(t => t.id === selectedType)?.name} Found
                  </h3>
                  <p className="text-sidebar-foreground/70 mb-4">
                    {searchTerm 
                      ? `No ${selectedType} match your search criteria.`
                      : `You haven't added any ${selectedType} yet.`
                    }
                  </p>
                  {!searchTerm && (
                    <Button
                      onClick={() => setShowCreateForm(true)}
                      className="bg-sidebar-foreground text-sidebar hover:bg-sidebar-foreground/90"
                    >
                      <PlusIcon className="h-4 w-4 mr-2" />
                      Add Your First {dataTypes.find(t => t.id === selectedType)?.name}
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}