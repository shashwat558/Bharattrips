"use client"

import React from 'react'
import AdminSidebar from '@/components/admin/admin-sidebar'
import AdminHeader from '@/components/admin/admin-header'

interface AdminLayoutProps {
  children: React.ReactNode
  title: string
  description?: string
}

const AdminLayout = ({ children, title, description }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen flex bg-muted/40">
      {/* Sidebar */}
      <AdminSidebar />
      
      {/* Main Content */}
      <div className="flex-1">
        <AdminHeader title={title} description={description} />
        
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout