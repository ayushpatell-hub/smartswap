'use client'

import * as React from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { toast } from '@/hooks/use-toast'

const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name is required')
    .max(100, 'Name is too long'),
  phone: z
    .string()
    .trim()
    .transform((v) => v.replace(/[^\d]/g, ''))
    .refine((digits) => digits.length >= 10 && digits.length <= 15, {
      message: 'Enter a valid phone number',
    }),
})

type LeadFormValues = z.infer<typeof leadSchema>

export function CtaLeadDialog({
  trigger,
  title,
  description,
}: {
  trigger: React.ReactNode
  title: string
  description?: string
}) {
  const [open, setOpen] = React.useState(false)

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: '',
      phone: '',
    },
    mode: 'onSubmit',
  })

  function onSubmit(values: LeadFormValues) {
    // SECURITY: Do not log or display phone/name in a way that could be
    // sensitive. Use generic confirmations only.
    toast({
      title: 'Request received',
      description: 'Thanks. We will contact you shortly.',
    })
    setOpen(false)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description ??
              'Enter your details to start. This is a placeholder form.'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your full name"
                      autoComplete="name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+91 98765 43210"
                      inputMode="tel"
                      autoComplete="tel"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

