"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { 
  SearchIcon,
  FilterIcon,
  PlusIcon,
  FileTextIcon,
  LinkIcon,
  TagIcon,
  CalendarIcon,
  MoreVerticalIcon,
  EditIcon,
  TrashIcon,
  ExternalLinkIcon,
  PackageIcon,
  DollarSignIcon,
  AlertCircleIcon,
  MessageSquareIcon,
  InfoIcon,
  SaveIcon,
  XIcon,
  ChevronDownIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ClockIcon,
  UserIcon,
  UsersIcon
} from "lucide-react"

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useData } from '@/hooks/use-data'
import { useProjects } from '@/hooks/use-projects'
import { toast } from 'sonner'

const dataTypes = [
  { value: 'context', label: 'Context', icon: InfoIcon, description: 'Background information and knowledge' },
  { value: 'issue', label: 'Issue', icon: AlertCircleIcon, description: 'Problems and bug reports' },
  { value: 'inquiry', label: 'Inquiry', icon: MessageSquareIcon, description: 'Questions and requests' },
  { value: 'product', label: 'Product', icon: PackageIcon, description: 'Product information and details' }
]

const filterTabs = [
  { name: "Context", value: "context" },
  { name: "Issues", value: "issue" },
  { name: "Inquiries", value: "inquiry" },
  { name: "Products", value: "product" }
]

export function KnowledgeBase() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState("context")
  const [selectedProject, setSelectedProject] = useState<string>("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [addType, setAddType] = useState<'context' | 'issue' | 'inquiry' | 'product'>('context')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    tags: '',
    metadata: {} as Record<string, any>
  })

  const { projects } = useProjects()
  const { data, loading, createData, deleteData } = useData(
    selectedProject || undefined,
    activeFilter as any
  )

  const filteredData = React.useMemo(() => {
    return data.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.content?.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesSearch
    })
  }, [data, searchTerm])

  // Type-specific skeleton loaders with professional neutral designs
  const renderSkeletonByType = (type: string) => {
    const baseSkeletonClasses = "animate-pulse"
    
    switch (type) {
      case 'context':
        // Square design - Knowledge base style
        return (
          <Card className="bg-sidebar-accent border-sidebar-border p-6 h-64">
            <div className={baseSkeletonClasses}>
              {/* Header with icon and badge */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-sidebar-border rounded-lg"></div>
                  <div className="w-16 h-5 bg-sidebar-border rounded-full"></div>
                </div>
                <div className="w-6 h-6 bg-sidebar-border rounded"></div>
              </div>
              
              {/* Title */}
              <div className="h-5 bg-sidebar-border rounded w-4/5 mb-3"></div>
              
              {/* Description - longer for context */}
              <div className="space-y-2 mb-4">
                <div className="h-3 bg-sidebar-border rounded w-full"></div>
                <div className="h-3 bg-sidebar-border rounded w-full"></div>
                <div className="h-3 bg-sidebar-border rounded w-3/4"></div>
              </div>
              
              {/* Tags */}
              <div className="flex gap-1 mb-4">
                <div className="h-5 bg-sidebar-border rounded-full w-20"></div>
                <div className="h-5 bg-sidebar-border rounded-full w-16"></div>
              </div>
              
              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="h-3 bg-sidebar-border rounded w-20"></div>
                <div className="h-3 bg-sidebar-border rounded w-12"></div>
              </div>
            </div>
          </Card>
        )
      
      case 'issue':
        // Rectangle design - Issue tracker style
        return (
          <Card className="bg-sidebar-accent border-sidebar-border p-4 h-36">
            <div className={baseSkeletonClasses}>
              {/* Header with issue number and priority */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-sidebar-border rounded"></div>
                  <div className="w-12 h-4 bg-sidebar-border rounded-full"></div>
                  <div className="w-16 h-4 bg-sidebar-border rounded-full"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-4 bg-sidebar-border rounded"></div>
                  <div className="w-5 h-5 bg-sidebar-border rounded"></div>
                </div>
              </div>
              
              {/* Title */}
              <div className="h-4 bg-sidebar-border rounded w-3/4 mb-3"></div>
              
              {/* Description */}
              <div className="h-3 bg-sidebar-border rounded w-full mb-3"></div>
              
              {/* Footer with reports and date */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-sidebar-border rounded"></div>
                  <div className="h-3 bg-sidebar-border rounded w-16"></div>
                </div>
                <div className="h-3 bg-sidebar-border rounded w-16"></div>
              </div>
            </div>
          </Card>
        )
      
      case 'inquiry':
        // Reddit post style - Discussion format
        return (
          <Card className="bg-sidebar-accent border-sidebar-border border-l-4 border-l-sidebar-foreground/20 p-4 h-40">
            <div className={baseSkeletonClasses}>
              {/* Post header */}
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-sidebar-border rounded-full"></div>
                <div className="w-20 h-3 bg-sidebar-border rounded"></div>
                <div className="w-1 h-1 bg-sidebar-border rounded-full"></div>
                <div className="w-16 h-3 bg-sidebar-border rounded"></div>
              </div>
              
              {/* Title */}
              <div className="h-4 bg-sidebar-border rounded w-5/6 mb-3"></div>
              
              {/* Content preview */}
              <div className="space-y-2 mb-4">
                <div className="h-3 bg-sidebar-border rounded w-full"></div>
                <div className="h-3 bg-sidebar-border rounded w-4/5"></div>
              </div>
              
              {/* Interaction bar */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-sidebar-border rounded"></div>
                  <div className="w-8 h-3 bg-sidebar-border rounded"></div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-sidebar-border rounded"></div>
                  <div className="w-12 h-3 bg-sidebar-border rounded"></div>
                </div>
              </div>
            </div>
          </Card>
        )
      
      case 'product':
        // Bigger square - Product showcase style
        return (
          <Card className="bg-sidebar-accent border-sidebar-border p-6 h-80">
            <div className={baseSkeletonClasses}>
              {/* Product image placeholder */}
              <div className="w-full h-32 bg-sidebar-border rounded-lg mb-4"></div>
              
              {/* Header with product badge */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-sidebar-border rounded"></div>
                  <div className="w-16 h-4 bg-sidebar-border rounded-full"></div>
                </div>
                <div className="w-5 h-5 bg-sidebar-border rounded"></div>
              </div>
              
              {/* Product name */}
              <div className="h-5 bg-sidebar-border rounded w-2/3 mb-3"></div>
              
              {/* Description */}
              <div className="space-y-2 mb-4">
                <div className="h-3 bg-sidebar-border rounded w-full"></div>
                <div className="h-3 bg-sidebar-border rounded w-3/4"></div>
              </div>
              
              {/* Price and tags */}
              <div className="flex items-center justify-between mb-3">
                <div className="h-6 bg-sidebar-border rounded w-16"></div>
                <div className="flex gap-1">
                  <div className="h-4 bg-sidebar-border rounded-full w-12"></div>
                  <div className="h-4 bg-sidebar-border rounded-full w-14"></div>
                </div>
              </div>
              
              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="h-3 bg-sidebar-border rounded w-20"></div>
                <div className="h-3 bg-sidebar-border rounded w-10"></div>
              </div>
            </div>
          </Card>
        )
      
      default:
        return (
          <Card className="bg-sidebar-accent border-sidebar-border p-6 h-64">
            <div className={baseSkeletonClasses}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-sidebar-border rounded-lg"></div>
                  <div className="w-16 h-5 bg-sidebar-border rounded-full"></div>
                </div>
                <div className="w-6 h-6 bg-sidebar-border rounded"></div>
              </div>
              
              <div className="h-5 bg-sidebar-border rounded w-3/4 mb-3"></div>
              
              <div className="space-y-2 mb-4">
                <div className="h-3 bg-sidebar-border rounded w-full"></div>
                <div className="h-3 bg-sidebar-border rounded w-2/3"></div>
              </div>
              
              <div className="flex gap-1 mb-4">
                <div className="h-5 bg-sidebar-border rounded-full w-12"></div>
                <div className="h-5 bg-sidebar-border rounded-full w-16"></div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="h-3 bg-sidebar-border rounded w-20"></div>
                <div className="h-3 bg-sidebar-border rounded w-12"></div>
              </div>
            </div>
          </Card>
        )
    }
  }

  // Get skeleton types based on current filter
  const getSkeletonTypes = () => {
    return Array(6).fill(activeFilter) // All same type based on filter
  }

  // Generate random report count for issues
  const getReportCount = (itemId: string) => {
    // Use item ID to generate consistent random number
    const hash = itemId.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0)
      return a & a
    }, 0)
    return Math.abs(hash % 50) + 1 // 1-50 reports
  }

  // Render data items with professional neutral designs
  const renderDataItem = (item: any) => {
    const TypeIcon = getTypeIcon(item.type)
    
    switch (item.type) {
      case 'context':
        // Square design - Knowledge base style
        return (
          <Card
            key={item.id}
            className="bg-sidebar-accent border-sidebar-border hover:border-sidebar-foreground/30 transition-all duration-200 p-6 h-64 flex flex-col group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-sidebar-foreground/10 text-sidebar-foreground group-hover:bg-sidebar-foreground/15 transition-colors">
                  <TypeIcon className="h-4 w-4" />
                </div>
                <Badge variant="outline" className="text-xs bg-sidebar-foreground/5 text-sidebar-foreground/80 border-sidebar-foreground/20">
                  Context
                </Badge>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-sidebar-foreground/60 hover:text-sidebar-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVerticalIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <EditIcon className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDelete(item.id, item.title)}
                    className="text-red-600 focus:text-red-600"
                  >
                    <TrashIcon className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <h3 className="text-sidebar-foreground font-semibold mb-3 line-clamp-2 flex-shrink-0 leading-tight">
              {item.title}
            </h3>

            {item.description && (
              <p className="text-sidebar-foreground/70 text-sm mb-4 line-clamp-3 flex-1 leading-relaxed">
                {item.description}
              </p>
            )}

            {item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-4 flex-shrink-0">
                {item.tags.slice(0, 3).map((tag: string, index: number) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-xs bg-sidebar-foreground/5 text-sidebar-foreground/60 border-sidebar-foreground/15 hover:bg-sidebar-foreground/10 transition-colors"
                  >
                    {tag}
                  </Badge>
                ))}
                {item.tags.length > 3 && (
                  <Badge
                    variant="outline"
                    className="text-xs bg-sidebar-foreground/5 text-sidebar-foreground/60 border-sidebar-foreground/15"
                  >
                    +{item.tags.length - 3}
                  </Badge>
                )}
              </div>
            )}

            <div className="flex items-center justify-between text-xs text-sidebar-foreground/60 flex-shrink-0 pt-2 border-t border-sidebar-border">
              <div className="flex items-center gap-1">
                <CalendarIcon className="h-3 w-3" />
                <span>{formatDate(item.created_at)}</span>
              </div>
              <span className="text-sidebar-foreground/40">#{item.id.slice(-6)}</span>
            </div>
          </Card>
        )

      case 'issue':
        // Rectangle design - Issue tracker style
        const reportCount = getReportCount(item.id)
        return (
          <Card
            key={item.id}
            className="bg-sidebar-accent border-sidebar-border hover:border-sidebar-foreground/30 transition-all duration-200 p-4 h-36 flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="p-1 rounded bg-sidebar-foreground/10 text-sidebar-foreground group-hover:bg-sidebar-foreground/15 transition-colors">
                  <TypeIcon className="h-4 w-4" />
                </div>
                <Badge variant="outline" className="text-xs bg-sidebar-foreground/5 text-sidebar-foreground/80 border-sidebar-foreground/20">
                  Issue
                </Badge>
                {item.metadata.priority && (
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      item.metadata.priority === 'critical' ? 'bg-red-500/15 text-red-600 border-red-500/30' :
                      item.metadata.priority === 'high' ? 'bg-orange-500/15 text-orange-600 border-orange-500/30' :
                      item.metadata.priority === 'medium' ? 'bg-yellow-500/15 text-yellow-600 border-yellow-500/30' :
                      'bg-sidebar-foreground/10 text-sidebar-foreground/70 border-sidebar-foreground/20'
                    }`}
                  >
                    {item.metadata.priority}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-xs text-sidebar-foreground/60">
                  <UsersIcon className="h-3 w-3" />
                  <span>{reportCount}</span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-sidebar-foreground/60 hover:text-sidebar-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVerticalIcon className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <EditIcon className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(item.id, item.title)}
                      className="text-red-600 focus:text-red-600"
                    >
                      <TrashIcon className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <h3 className="text-sidebar-foreground font-semibold text-sm line-clamp-1 mb-2 leading-tight">
              {item.title}
            </h3>

            {item.description && (
              <p className="text-sidebar-foreground/70 text-xs line-clamp-2 mb-3 leading-relaxed flex-1">
                {item.description}
              </p>
            )}

            <div className="flex items-center justify-between text-xs text-sidebar-foreground/60 pt-2 border-t border-sidebar-border">
              <div className="flex items-center gap-1">
                <CalendarIcon className="h-3 w-3" />
                <span>{formatDate(item.created_at)}</span>
              </div>
              <span className="text-sidebar-foreground/40 font-mono">#{item.id.slice(-6)}</span>
            </div>
          </Card>
        )

      case 'inquiry':
        // Reddit post style - Discussion format
        return (
          <Card
            key={item.id}
            className="bg-sidebar-accent border-sidebar-border border-l-4 border-l-sidebar-foreground/20 hover:border-sidebar-foreground/30 hover:border-l-sidebar-foreground/40 transition-all duration-200 p-4 h-40 flex flex-col group"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-sidebar-foreground/10 rounded-full flex items-center justify-center group-hover:bg-sidebar-foreground/15 transition-colors">
                <UserIcon className="h-3 w-3 text-sidebar-foreground/70" />
              </div>
              <span className="text-xs text-sidebar-foreground/70 font-medium">inquiry</span>
              <span className="w-1 h-1 bg-sidebar-foreground/30 rounded-full"></span>
              <span className="text-xs text-sidebar-foreground/60">{formatDate(item.created_at)}</span>
              <div className="ml-auto">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-sidebar-foreground/60 hover:text-sidebar-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVerticalIcon className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <EditIcon className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(item.id, item.title)}
                      className="text-red-600 focus:text-red-600"
                    >
                      <TrashIcon className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <h3 className="text-sidebar-foreground font-semibold text-sm line-clamp-2 mb-2 flex-shrink-0 leading-tight">
              {item.title}
            </h3>

            {item.description && (
              <p className="text-sidebar-foreground/70 text-xs line-clamp-2 mb-3 flex-1 leading-relaxed">
                {item.description}
              </p>
            )}

            <div className="flex items-center gap-4 text-xs text-sidebar-foreground/60 flex-shrink-0 pt-2 border-t border-sidebar-border">
              <div className="flex items-center gap-1 hover:text-sidebar-foreground transition-colors cursor-pointer">
                <ArrowUpIcon className="h-3 w-3" />
                <span>Reply</span>
              </div>
              <div className="flex items-center gap-1 hover:text-sidebar-foreground transition-colors cursor-pointer">
                <MessageSquareIcon className="h-3 w-3" />
                <span>Discuss</span>
              </div>
              {item.tags.length > 0 && (
                <Badge variant="outline" className="text-xs bg-sidebar-foreground/5 text-sidebar-foreground/60 border-sidebar-foreground/15 ml-auto">
                  {item.tags[0]}
                </Badge>
              )}
            </div>
          </Card>
        )

      case 'product':
        // Bigger square - Product showcase style
        return (
          <Card
            key={item.id}
            className="bg-sidebar-accent border-sidebar-border hover:border-sidebar-foreground/30 transition-all duration-200 p-6 h-80 flex flex-col group"
          >
            {/* Product image placeholder */}
            <div className="w-full h-32 bg-sidebar-foreground/10 rounded-lg mb-4 flex items-center justify-center flex-shrink-0 group-hover:bg-sidebar-foreground/15 transition-colors">
              <PackageIcon className="h-8 w-8 text-sidebar-foreground/40" />
            </div>

            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-1 rounded bg-sidebar-foreground/10 text-sidebar-foreground group-hover:bg-sidebar-foreground/15 transition-colors">
                  <TypeIcon className="h-4 w-4" />
                </div>
                <Badge variant="outline" className="text-xs bg-sidebar-foreground/5 text-sidebar-foreground/80 border-sidebar-foreground/20">
                  Product
                </Badge>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-sidebar-foreground/60 hover:text-sidebar-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVerticalIcon className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <EditIcon className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDelete(item.id, item.title)}
                    className="text-red-600 focus:text-red-600"
                  >
                    <TrashIcon className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <h3 className="text-sidebar-foreground font-semibold mb-3 line-clamp-2 flex-shrink-0 leading-tight">
              {item.title}
            </h3>

            {item.description && (
              <p className="text-sidebar-foreground/70 text-sm mb-4 line-clamp-3 flex-1 leading-relaxed">
                {item.description}
              </p>
            )}

            <div className="flex items-center justify-between mb-3 flex-shrink-0">
              {item.metadata.price && (
                <div className="flex items-center gap-1 text-sidebar-foreground font-semibold">
                  <DollarSignIcon className="h-4 w-4" />
                  <span>${item.metadata.price}</span>
                </div>
              )}
              {item.tags.length > 0 && (
                <div className="flex gap-1">
                  {item.tags.slice(0, 2).map((tag: string, index: number) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs bg-sidebar-foreground/5 text-sidebar-foreground/60 border-sidebar-foreground/15"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-sidebar-foreground/60 flex-shrink-0 pt-2 border-t border-sidebar-border">
              <div className="flex items-center gap-1">
                <CalendarIcon className="h-3 w-3" />
                <span>{formatDate(item.created_at)}</span>
              </div>
              <span className="text-sidebar-foreground/40">#{item.id.slice(-6)}</span>
            </div>
          </Card>
        )

      default:
        return null
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      content: '',
      tags: '',
      metadata: {}
    })
    setAddType('context')
  }

  const handleOpenAddDialog = () => {
    resetForm()
    setIsAddDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title.trim()) {
      toast.error('Please enter a title')
      return
    }

    if (!selectedProject) {
      toast.error('Please select a project')
      return
    }

    setIsSubmitting(true)

    try {
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)

      let metadata = { ...formData.metadata }
      
      // Add type-specific metadata
      if (addType === 'product' && formData.metadata.price) {
        metadata.price = parseFloat(formData.metadata.price) || 0
      }
      if (addType === 'issue' && formData.metadata.priority) {
        metadata.priority = formData.metadata.priority
      }

      const { error } = await createData({
        title: formData.title,
        description: formData.description || null,
        content: formData.content || null,
        type: addType,
        tags: tagsArray,
        metadata,
        project_id: selectedProject,
      })

      if (error) {
        toast.error(error)
      } else {
        toast.success(`${dataTypes.find(t => t.value === addType)?.label} added successfully`)
        setIsAddDialogOpen(false)
        resetForm()
      }
    } catch (err) {
      toast.error('An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      const { error } = await deleteData(id)
      if (error) {
        toast.error(error)
      } else {
        toast.success('Item deleted successfully')
      }
    }
  }

  const getTypeIcon = (type: string) => {
    const typeConfig = dataTypes.find(t => t.value === type)
    return typeConfig?.icon || FileTextIcon
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  // Set default project if only one exists
  useEffect(() => {
    if (projects.length === 1 && !selectedProject) {
      setSelectedProject(projects[0].id)
    }
  }, [projects, selectedProject])

  const selectedProjectName = projects.find(p => p.id === selectedProject)?.name || 'Select Project'

  return (
    <div className="flex flex-col h-full w-full max-w-full overflow-hidden bg-background">
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              {/* Project Dropdown and Description */}
              <div className="mb-6">
                <div className="mb-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        className="p-0 h-auto text-left justify-start hover:bg-transparent"
                      >
                        <h1 className="text-xl font-semibold text-sidebar-foreground">
                          {selectedProjectName}
                        </h1>
                        <ChevronDownIcon className="h-5 w-5 ml-2 text-sidebar-foreground/60" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="min-w-[200px]">
                      {projects.map((project) => (
                        <DropdownMenuItem 
                          key={project.id} 
                          onClick={() => setSelectedProject(project.id)}
                          className={selectedProject === project.id ? "bg-sidebar-accent" : ""}
                        >
                          {project.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <p className="text-sidebar-foreground/70">
                  Manage your knowledge base, issues, inquiries, and product information
                </p>
              </div>

              {/* Search and Add Data Button */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1 max-w-md">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-sidebar-foreground/40" />
                  <Input
                    placeholder="Search data..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/40"
                  />
                </div>
                
                <Button
                  onClick={handleOpenAddDialog}
                  className="bg-sidebar-foreground text-sidebar hover:bg-sidebar-foreground/90 flex-shrink-0"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Data
                </Button>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto">
                {filterTabs.map((tab) => (
                  <Button
                    key={tab.value}
                    variant={activeFilter === tab.value ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveFilter(tab.value)}
                    className={`whitespace-nowrap flex-shrink-0 ${
                      activeFilter === tab.value
                        ? "bg-sidebar-foreground text-sidebar hover:bg-sidebar-foreground/90"
                        : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                    }`}
                  >
                    {tab.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Content */}
            {!selectedProject ? (
              <div className="text-center py-12">
                <div className="bg-sidebar-accent rounded-lg p-8 max-w-md mx-auto">
                  <div className="text-4xl mb-4">📚</div>
                  <h3 className="text-sidebar-foreground text-lg font-semibold mb-2">
                    Select a Project
                  </h3>
                  <p className="text-sidebar-foreground/70 mb-4">
                    Choose a project to view and manage its data library
                  </p>
                </div>
              </div>
            ) : loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getSkeletonTypes().map((type, index) => (
                  <div key={index}>
                    {renderSkeletonByType(type)}
                  </div>
                ))}
              </div>
            ) : filteredData.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredData.map((item) => renderDataItem(item))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="bg-sidebar-accent rounded-lg p-8 max-w-md mx-auto">
                  <div className="text-4xl mb-4">📝</div>
                  <h3 className="text-sidebar-foreground text-lg font-semibold mb-2">
                    No {activeFilter} found
                  </h3>
                  <p className="text-sidebar-foreground/70 mb-6">
                    {searchTerm
                      ? `No ${activeFilter} items match your search criteria.`
                      : `Start building your ${activeFilter} library by adding some content.`
                    }
                  </p>
                  {!searchTerm && (
                    <Button
                      onClick={() => {
                        setAddType(activeFilter as any)
                        handleOpenAddDialog()
                      }}
                      className="bg-sidebar-foreground text-sidebar hover:bg-sidebar-foreground/90"
                    >
                      <PlusIcon className="h-4 w-4 mr-2" />
                      Add {dataTypes.find(t => t.value === activeFilter)?.label}
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Data Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-sidebar border-sidebar-border max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-sidebar-foreground flex items-center gap-2">
              <PlusIcon className="h-5 w-5" />
              Add Data
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            {/* Type Selection */}
            <div className="space-y-2">
              <Label htmlFor="type" className="text-sidebar-foreground font-medium">
                Type *
              </Label>
              <Select value={addType} onValueChange={(value: any) => setAddType(value)}>
                <SelectTrigger className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground focus:ring-2 focus:ring-blue-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {dataTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        <type.icon className="h-4 w-4" />
                        <span>{type.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sidebar-foreground font-medium">
                Title *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder={`Enter ${addType} title...`}
                className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sidebar-foreground font-medium">
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder={`Brief description of this ${addType}...`}
                className="min-h-[80px] bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Content */}
            <div className="space-y-2">
              <Label htmlFor="content" className="text-sidebar-foreground font-medium">
                Content
              </Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder={`Detailed content for this ${addType}...`}
                className="min-h-[120px] bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label htmlFor="tags" className="text-sidebar-foreground font-medium">
                Tags
              </Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                placeholder="Enter tags separated by commas..."
                className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-sidebar-foreground/60">
                Separate multiple tags with commas (e.g., important, documentation, api)
              </p>
            </div>

            {/* Type-specific fields */}
            {addType === 'product' && (
              <div className="space-y-2">
                <Label htmlFor="price" className="text-sidebar-foreground font-medium">
                  Price
                </Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.metadata.price || ''}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    metadata: { ...prev.metadata, price: e.target.value }
                  }))}
                  placeholder="0.00"
                  className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}

            {addType === 'issue' && (
              <div className="space-y-2">
                <Label htmlFor="priority" className="text-sidebar-foreground font-medium">
                  Priority
                </Label>
                <Select
                  value={formData.metadata.priority || ''}
                  onValueChange={(value) => setFormData(prev => ({ 
                    ...prev, 
                    metadata: { ...prev.metadata, priority: value }
                  }))}
                >
                  <SelectTrigger className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-3 pt-6 border-t border-sidebar-border">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
                className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent/80"
              >
                <XIcon className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !formData.title.trim()}
                className="bg-sidebar-foreground text-sidebar hover:bg-sidebar-foreground/90 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-sidebar border-t-transparent rounded-full animate-spin mr-2"></div>
                    Adding...
                  </>
                ) : (
                  <>
                    <SaveIcon className="h-4 w-4 mr-2" />
                    Add {dataTypes.find(t => t.value === addType)?.label}
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}