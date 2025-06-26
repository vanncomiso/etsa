"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { 
  SearchIcon,
  PlusIcon,
  FileTextIcon,
  AlertTriangleIcon,
  MessageSquareIcon,
  PackageIcon,
  MoreHorizontalIcon,
  CalendarIcon,
  UserIcon,
  ArrowUpIcon,
  MessageCircleIcon,
  ShareIcon,
  ClockIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  TagIcon,
  DollarSignIcon
} from "lucide-react"

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useData } from '@/hooks/use-data'
import { useProjects } from '@/hooks/use-projects'
import type { Database } from '@/lib/supabase'

type DataItem = Database['public']['Tables']['data']['Row']
type DataType = 'context' | 'issue' | 'inquiry' | 'product'

const dataTypes = [
  { id: 'context', name: 'Context', icon: FileTextIcon },
  { id: 'issues', name: 'Issues', icon: AlertTriangleIcon },
  { id: 'inquiries', name: 'Inquiries', icon: MessageSquareIcon },
  { id: 'products', name: 'Products', icon: PackageIcon },
]

export function KnowledgeBase() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeType, setActiveType] = useState<DataType | 'all'>('context')
  const [selectedProject, setSelectedProject] = useState<string>('all')
  
  const { projects } = useProjects()
  const { data, loading, error } = useData()

  // Filter data based on active type and search term
  const filteredData = React.useMemo(() => {
    let filtered = data

    // Filter by type
    if (activeType !== 'all') {
      filtered = filtered.filter(item => item.type === activeType)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    return filtered
  }, [data, activeType, searchTerm])

  // Type-specific skeleton loaders
  const renderSkeletonByType = (type: DataType) => {
    const baseSkeletonClasses = "animate-pulse space-y-4"
    
    switch (type) {
      case 'context':
        return (
          <Card className="bg-sidebar-accent border-sidebar-border p-6 h-72">
            <div className={baseSkeletonClasses}>
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-sidebar-border rounded-lg"></div>
                  <div>
                    <div className="h-4 w-20 bg-sidebar-border rounded mb-2"></div>
                    <div className="h-3 w-16 bg-sidebar-border rounded"></div>
                  </div>
                </div>
                <div className="w-6 h-6 bg-sidebar-border rounded"></div>
              </div>
              
              {/* Title */}
              <div className="h-6 w-3/4 bg-sidebar-border rounded"></div>
              
              {/* Content */}
              <div className="space-y-2">
                <div className="h-4 w-full bg-sidebar-border rounded"></div>
                <div className="h-4 w-5/6 bg-sidebar-border rounded"></div>
                <div className="h-4 w-4/5 bg-sidebar-border rounded"></div>
              </div>
              
              {/* Tags */}
              <div className="flex gap-2">
                <div className="h-6 w-16 bg-sidebar-border rounded-full"></div>
                <div className="h-6 w-20 bg-sidebar-border rounded-full"></div>
              </div>
              
              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-sidebar-border">
                <div className="h-4 w-24 bg-sidebar-border rounded"></div>
                <div className="h-4 w-20 bg-sidebar-border rounded"></div>
              </div>
            </div>
          </Card>
        )
      
      case 'issue':
        return (
          <Card className="bg-sidebar-accent border-sidebar-border p-4 h-44">
            <div className={baseSkeletonClasses}>
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-sidebar-border rounded"></div>
                  <div className="h-5 w-12 bg-sidebar-border rounded-full"></div>
                  <div className="h-5 w-16 bg-sidebar-border rounded-full"></div>
                </div>
                <div className="h-4 w-16 bg-sidebar-border rounded"></div>
              </div>
              
              {/* Title */}
              <div className="h-5 w-2/3 bg-sidebar-border rounded"></div>
              
              {/* Description */}
              <div className="space-y-2">
                <div className="h-4 w-full bg-sidebar-border rounded"></div>
                <div className="h-4 w-3/4 bg-sidebar-border rounded"></div>
              </div>
              
              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="h-4 w-24 bg-sidebar-border rounded"></div>
                <div className="h-4 w-16 bg-sidebar-border rounded"></div>
              </div>
            </div>
          </Card>
        )
      
      case 'inquiry':
        return (
          <Card className="bg-sidebar-accent border-sidebar-border p-4 h-48">
            <div className={baseSkeletonClasses}>
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-sidebar-border rounded-full"></div>
                  <div>
                    <div className="h-4 w-20 bg-sidebar-border rounded mb-1"></div>
                    <div className="h-3 w-16 bg-sidebar-border rounded"></div>
                  </div>
                </div>
                <div className="h-5 w-20 bg-sidebar-border rounded-full"></div>
              </div>
              
              {/* Title */}
              <div className="h-5 w-3/4 bg-sidebar-border rounded"></div>
              
              {/* Content */}
              <div className="space-y-2">
                <div className="h-4 w-full bg-sidebar-border rounded"></div>
                <div className="h-4 w-4/5 bg-sidebar-border rounded"></div>
              </div>
              
              {/* Actions */}
              <div className="flex items-center gap-4">
                <div className="h-8 w-16 bg-sidebar-border rounded"></div>
                <div className="h-8 w-16 bg-sidebar-border rounded"></div>
                <div className="h-8 w-16 bg-sidebar-border rounded"></div>
              </div>
            </div>
          </Card>
        )
      
      case 'product':
        return (
          <Card className="bg-sidebar-accent border-sidebar-border p-6 h-80">
            <div className={baseSkeletonClasses}>
              {/* Image */}
              <div className="w-full h-32 bg-sidebar-border rounded-lg"></div>
              
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="h-6 w-3/4 bg-sidebar-border rounded mb-2"></div>
                  <div className="h-4 w-1/2 bg-sidebar-border rounded"></div>
                </div>
                <div className="w-6 h-6 bg-sidebar-border rounded"></div>
              </div>
              
              {/* Price */}
              <div className="h-8 w-24 bg-sidebar-border rounded"></div>
              
              {/* Tags */}
              <div className="flex gap-2">
                <div className="h-6 w-16 bg-sidebar-border rounded-full"></div>
                <div className="h-6 w-20 bg-sidebar-border rounded-full"></div>
              </div>
              
              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="h-4 w-20 bg-sidebar-border rounded"></div>
                <div className="h-4 w-16 bg-sidebar-border rounded"></div>
              </div>
            </div>
          </Card>
        )
      
      default:
        return null
    }
  }

  const renderDataCard = (item: DataItem) => {
    const formatDate = (dateString: string) => {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      })
    }

    switch (item.type) {
      case 'context':
        return (
          <Card key={item.id} className="bg-sidebar-accent border-sidebar-border hover:border-sidebar-foreground/20 transition-all duration-200 cursor-pointer p-6 h-72">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-10 h-10 bg-sidebar-foreground/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileTextIcon className="h-5 w-5 text-sidebar-foreground/70" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-medium text-sidebar-foreground/70 uppercase tracking-wide">
                    Knowledge Base
                  </div>
                  <div className="text-xs text-sidebar-foreground/50 mt-0.5">
                    Document
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6 text-sidebar-foreground/40 hover:text-sidebar-foreground flex-shrink-0">
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-sidebar-foreground mb-3 line-clamp-2 leading-tight">
              {item.title}
            </h3>

            {/* Content */}
            <div className="text-sm text-sidebar-foreground/70 mb-4 line-clamp-3 leading-relaxed flex-1">
              {item.description || item.content || 'No description available'}
            </div>

            {/* Tags */}
            {item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-4">
                {item.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs bg-sidebar-foreground/5 text-sidebar-foreground/60 border-sidebar-foreground/10">
                    {tag}
                  </Badge>
                ))}
                {item.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs bg-sidebar-foreground/5 text-sidebar-foreground/60 border-sidebar-foreground/10">
                    +{item.tags.length - 3}
                  </Badge>
                )}
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-sidebar-border text-xs text-sidebar-foreground/50">
              <div className="flex items-center gap-1">
                <CalendarIcon className="h-3 w-3" />
                <span>{formatDate(item.created_at)}</span>
              </div>
              <div className="flex items-center gap-1">
                <TagIcon className="h-3 w-3" />
                <span>{item.file_name ? 'File' : 'Text'}</span>
              </div>
            </div>
          </Card>
        )

      case 'issue':
        const reportCount = Math.floor(Math.random() * 100) + 1
        const priority = ['low', 'medium', 'high'][Math.floor(Math.random() * 3)]
        const status = ['active', 'resolved'][Math.floor(Math.random() * 2)]
        
        return (
          <Card key={item.id} className={`bg-sidebar-accent border-sidebar-border hover:border-sidebar-foreground/20 transition-all duration-200 cursor-pointer p-4 h-44 border-l-4 ${
            priority === 'high' ? 'border-l-red-500' : 
            priority === 'medium' ? 'border-l-yellow-500' : 
            'border-l-blue-500'
          }`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <AlertTriangleIcon className="h-4 w-4 text-sidebar-foreground/70 flex-shrink-0" />
                <Badge variant="outline" className="text-xs bg-sidebar-foreground/5 text-sidebar-foreground/70 border-sidebar-foreground/10 flex-shrink-0">
                  Issue
                </Badge>
                <Badge variant="outline" className={`text-xs flex-shrink-0 ${
                  priority === 'high' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                  priority === 'medium' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                  'bg-blue-500/10 text-blue-500 border-blue-500/20'
                }`}>
                  {priority}
                </Badge>
              </div>
              <div className="text-xs text-sidebar-foreground/50 flex-shrink-0">
                {reportCount} reports
              </div>
            </div>

            {/* Title */}
            <h3 className="text-base font-semibold text-sidebar-foreground mb-2 line-clamp-1">
              {item.title}
            </h3>

            {/* Description */}
            <div className="text-sm text-sidebar-foreground/70 mb-4 line-clamp-2 leading-relaxed flex-1">
              {item.description || 'No description available'}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-sidebar-foreground/50">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <ClockIcon className="h-3 w-3" />
                  <span>Reported {formatDate(item.created_at)}</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {status === 'active' ? (
                  <>
                    <AlertCircleIcon className="h-3 w-3 text-orange-500" />
                    <span>Active</span>
                  </>
                ) : (
                  <>
                    <CheckCircleIcon className="h-3 w-3 text-green-500" />
                    <span>Resolved</span>
                  </>
                )}
              </div>
            </div>
          </Card>
        )

      case 'inquiry':
        const upvotes = Math.floor(Math.random() * 50) + 1
        
        return (
          <Card key={item.id} className="bg-sidebar-accent border-sidebar-border hover:border-sidebar-foreground/20 transition-all duration-200 cursor-pointer p-4 h-48">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <div className="w-8 h-8 bg-sidebar-foreground/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <UserIcon className="h-4 w-4 text-sidebar-foreground/70" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-sidebar-foreground/80 truncate">
                    community
                  </div>
                  <div className="text-xs text-sidebar-foreground/50">
                    {formatDate(item.created_at)}
                  </div>
                </div>
              </div>
              <Badge variant="outline" className="text-xs bg-sidebar-foreground/5 text-sidebar-foreground/70 border-sidebar-foreground/10 flex-shrink-0">
                Discussion
              </Badge>
            </div>

            {/* Title */}
            <h3 className="text-base font-semibold text-sidebar-foreground mb-2 line-clamp-2 leading-tight">
              {item.title}
            </h3>

            {/* Content */}
            <div className="text-sm text-sidebar-foreground/70 mb-4 line-clamp-2 leading-relaxed flex-1">
              {item.description || item.content || 'No content available'}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 text-xs text-sidebar-foreground/60">
              <Button variant="ghost" size="sm" className="h-8 px-2 text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-foreground/5">
                <ArrowUpIcon className="h-3 w-3 mr-1" />
                Upvote
              </Button>
              <Button variant="ghost" size="sm" className="h-8 px-2 text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-foreground/5">
                <MessageCircleIcon className="h-3 w-3 mr-1" />
                Reply
              </Button>
              <Button variant="ghost" size="sm" className="h-8 px-2 text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-foreground/5">
                <ShareIcon className="h-3 w-3 mr-1" />
                Share
              </Button>
              {item.tags.length > 0 && (
                <Badge variant="outline" className="text-xs bg-sidebar-foreground/5 text-sidebar-foreground/60 border-sidebar-foreground/10 ml-auto">
                  {item.tags[0]}
                </Badge>
              )}
            </div>
          </Card>
        )

      case 'product':
        const price = Math.floor(Math.random() * 500) + 50
        
        return (
          <Card key={item.id} className="bg-sidebar-accent border-sidebar-border hover:border-sidebar-foreground/20 transition-all duration-200 cursor-pointer p-6 h-80">
            {/* Product Image Placeholder */}
            <div className="w-full h-32 bg-sidebar-foreground/5 rounded-lg mb-4 flex items-center justify-center">
              <PackageIcon className="h-12 w-12 text-sidebar-foreground/30" />
            </div>

            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-semibold text-sidebar-foreground mb-1 line-clamp-2 leading-tight">
                  {item.title}
                </h3>
                <div className="text-sm text-sidebar-foreground/70 line-clamp-1">
                  {item.description || 'No description available'}
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6 text-sidebar-foreground/40 hover:text-sidebar-foreground flex-shrink-0 ml-2">
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2 mb-4">
              <DollarSignIcon className="h-4 w-4 text-sidebar-foreground/70" />
              <span className="text-xl font-bold text-sidebar-foreground">
                ${price}
              </span>
            </div>

            {/* Tags */}
            {item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-4">
                {item.tags.slice(0, 2).map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs bg-sidebar-foreground/5 text-sidebar-foreground/60 border-sidebar-foreground/10">
                    {tag}
                  </Badge>
                ))}
                {item.tags.length > 2 && (
                  <Badge variant="outline" className="text-xs bg-sidebar-foreground/5 text-sidebar-foreground/60 border-sidebar-foreground/10">
                    +{item.tags.length - 2}
                  </Badge>
                )}
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-sidebar-foreground/50 mt-auto">
              <div className="flex items-center gap-1">
                <CalendarIcon className="h-3 w-3" />
                <span>Listed {formatDate(item.created_at)}</span>
              </div>
              <div className="text-sidebar-foreground/60 font-medium">
                Product
              </div>
            </div>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <div className="flex flex-col h-full w-full max-w-full overflow-hidden bg-background">
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-base font-semibold text-sidebar-foreground mb-2">
                    Data Library
                  </h1>
                  <p className="text-sidebar-foreground/70">
                    Manage your knowledge base, issues, inquiries, and product information
                  </p>
                </div>
                <Button
                  className="bg-sidebar-foreground text-sidebar hover:bg-sidebar-foreground/90 flex-shrink-0"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Data
                </Button>
              </div>

              {/* Search */}
              <div className="relative mb-6">
                <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-sidebar-foreground/40" />
                <Input
                  placeholder="Search data..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-3 bg-sidebar border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/40 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Type Filters */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {dataTypes.map((type) => (
                  <Button
                    key={type.id}
                    variant={activeType === type.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveType(type.id as DataType)}
                    className={`whitespace-nowrap flex-shrink-0 ${
                      activeType === type.id
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index}>
                    {renderSkeletonByType(activeType as DataType)}
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="text-red-500 mb-2">Error loading data</div>
                <div className="text-sidebar-foreground/70 text-sm">{error}</div>
              </div>
            ) : filteredData.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredData.map(renderDataCard)}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-sidebar-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  {activeType === 'context' && <FileTextIcon className="h-8 w-8 text-sidebar-foreground/40" />}
                  {activeType === 'issues' && <AlertTriangleIcon className="h-8 w-8 text-sidebar-foreground/40" />}
                  {activeType === 'inquiries' && <MessageSquareIcon className="h-8 w-8 text-sidebar-foreground/40" />}
                  {activeType === 'products' && <PackageIcon className="h-8 w-8 text-sidebar-foreground/40" />}
                </div>
                <h3 className="text-sidebar-foreground font-medium mb-2">
                  No {dataTypes.find(t => t.id === activeType)?.name.toLowerCase()} found
                </h3>
                <p className="text-sidebar-foreground/70 mb-6">
                  {searchTerm 
                    ? `No ${dataTypes.find(t => t.id === activeType)?.name.toLowerCase()} match your search criteria.`
                    : `Start by adding your first ${dataTypes.find(t => t.id === activeType)?.name.toLowerCase().slice(0, -1)} item.`
                  }
                </p>
                <Button
                  className="bg-sidebar-foreground text-sidebar hover:bg-sidebar-foreground/90"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add {dataTypes.find(t => t.id === activeType)?.name.slice(0, -1)}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}