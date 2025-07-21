"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { 
  User, 
  Building2, 
  Hotel, 
  PlaneTakeoff, 
  Car, 
  MapPin,
  Menu,
  X,
  User2,
  DoorOpen
} from 'lucide-react'
import { ModeToggle } from '@/components/mode-toggle'
import { cn } from '@/lib/utils'
import { useAuth } from '@/stores/useAuth'
import { signOut } from '@/action'


const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const {user, setUser} = useAuth();
  const [shouldHideHeader, setShouldHideHeader] = useState(false);
  

  

  
  
  const isAdminPage = pathname.startsWith('/admin')
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const locationArray = window.location.href.split('/');
      if (locationArray.includes("list-property")) {
        setShouldHideHeader(true);
      }
    }
  }, [])

  if (shouldHideHeader) return null;

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled || isAdminPage || isMobileMenuOpen 
        ? "bg-background border-b shadow-sm" 
        : "bg-transparent "
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center dark:text-gray-300 text-gray-900">
            <Hotel className="w-6 h-6 mr-2" />
            <span className="font-playfair text-xl font-bold">BharatTrips</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink href="/" label="Home" isScrolled={isScrolled} isAdminPage={isAdminPage} />
            <NavLink href="/hotels" label="Hotels" isScrolled={isScrolled} isAdminPage={isAdminPage} />
            <NavLink href="/about" label="About" isScrolled={isScrolled} isAdminPage={isAdminPage} />
            <NavLink href="/contact" label="Contact" isScrolled={isScrolled} isAdminPage={isAdminPage} />
            {isAdminPage && (
              <NavLink href="/admin" label="Dashboard" isScrolled={isScrolled} isAdminPage={isAdminPage} />
            )}
          </nav>
          
          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <ModeToggle />
            {isAdminPage ? (
              <Link href="/">
                <Button variant="outline">View Site</Button>
              </Link>
            ) : (
              <>
                <Link href={user?"/user/profile" : "/login"}>
                  {user ? <Button>
                    <User2 className='w-5 h-4'/>
                  </Button>:<Button className={cn(
                    !isScrolled && !isAdminPage ? "bg-white text-primary hover:bg-white/90" : ""
                  )}>
                    Login
                  </Button>}
                </Link>
                
                  {user &&
                  <>
                  <Link href={"/list-property"} className=''>               
                  <Button variant={"default"}>
                    Become a partner?

                  </Button>
                  
                  </Link>
                  <Button className={cn(
                    !isScrolled && !isAdminPage ? "bg-white text-primary hover:bg-white/90" : ""
                  )} onClick={async () => {
                      try {
                        await signOut()
                        setUser(null)
                      } catch (error) {
                        console.error('Error during sign out:', error)
                      }
                    }}>
                    <DoorOpen className='w-5 h-5'/>
                  </Button>
                  </>}
                
              </>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <ModeToggle />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                !isScrolled && !isAdminPage && !isMobileMenuOpen ? "text-white hover:bg-white/10" : ""
              )}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <NavMobileLink href="/" label="Home" onClick={() => setIsMobileMenuOpen(false)} />
            <NavMobileLink href="/hotels" label="Hotels" onClick={() => setIsMobileMenuOpen(false)} />
            <NavMobileLink href="/about" label="About" onClick={() => setIsMobileMenuOpen(false)} />
            
            {isAdminPage && (
              <NavMobileLink href="/admin" label="Dashboard" onClick={() => setIsMobileMenuOpen(false)} />
            )}
            <div className="pt-4 border-t flex flex-col space-y-2">
              {isAdminPage ? (
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full">View Site</Button>
                </Link>
              ) : (
                <>
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">Login</Button>
                  </Link>
                  <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full">Register</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

interface NavLinkProps {
  href: string
  label: string
  isScrolled: boolean
  isAdminPage: boolean
}

const NavLink = ({ href, label, isScrolled, isAdminPage }: NavLinkProps) => {
  const pathname = usePathname()
  const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))

  return (
    <Link
      href={href}
      className={cn(
        "px-3 py-2 rounded-md text-sm font-medium transition-colors",
        isActive 
          ? "bg-primary/10 text-primary" 
          : isScrolled || isAdminPage 
            ? "text-zinc-900 dark:text-foreground hover:bg-muted" 
            : "dark:text-zinc-300 text-gray-900 hover:bg-white/10"
      )}
    >
      {label}
    </Link>
  )
}


interface NavMobileLinkProps {
  href: string
  label: string
  onClick: () => void
}

const NavMobileLink = ({ href, label, onClick }: NavMobileLinkProps) => {
  const pathname = usePathname()
  const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))
  
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "block px-3 py-2 rounded-md text-base font-medium transition-colors",
        isActive 
          ? "bg-primary/10 text-primary" 
          : "hover:bg-muted"
      )}
    >
      {label}
    </Link>
  )
}

export default Header