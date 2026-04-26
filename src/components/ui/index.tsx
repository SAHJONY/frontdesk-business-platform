import { type ComponentPropsWithoutRef, forwardRef } from 'react'
import { clsx } from 'clsx'

const Button = forwardRef<HTMLButtonElement, ComponentPropsWithoutRef<'button'>>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={clsx(
        'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
)
Button.displayName = 'Button'

const Input = forwardRef<HTMLInputElement, ComponentPropsWithoutRef<'input'>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={clsx(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
)
Input.displayName = 'Input'

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from './card'
import { Badge } from './badge'
import { Progress } from './progress'

export { Card, CardHeader, CardTitle, CardContent, CardDescription, Button, Input, Badge, Progress }