"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { User, Mail, Lock, Hotel } from 'lucide-react'
import { signUpWithPassword } from '@/action'




const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

export default function RegisterPage() {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema)
  })

  const onSubmit = async (data: any) => {
    console.log(data)
    await signUpWithPassword({ email: data.email, password: data.password })

    router.push('/check-email');
  }

  return (
    <div className="min-h-screen flex">
      {/* Image Section */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image
          src="https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg"
          alt="Luxury Hotel"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center p-8">
            <Hotel className="w-16 h-16 mx-auto mb-4" />
            <h2 className="font-playfair text-4xl font-bold mb-4">Join BharatTrips</h2>
            <p className="text-lg text-white/90 max-w-md">
              Create an account to start booking luxury accommodations and enjoy exclusive member benefits.
            </p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-playfair text-3xl font-bold mb-2">Create Account</h1>
            <p className="text-muted-foreground">
              Sign up to start your luxury travel journey
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  {...register('name')}
                  id="name"
                  placeholder="Enter your name"
                  className="pl-10"
                />
              </div>
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message as string}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  {...register('email')}
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message as string}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  {...register('password')}
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  className="pl-10"
                />
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message as string}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  {...register('confirmPassword')}
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  className="pl-10"
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">{errors.confirmPassword.message as string}</p>
              )}
            </div>

            <Button type="submit" className="w-full">
              Create Account
            </Button>

            <div className="relative my-8">
              <Separator />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-4 text-muted-foreground text-sm">
                or sign up with
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" type="button" className="w-full">
                Google
              </Button>
              
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}