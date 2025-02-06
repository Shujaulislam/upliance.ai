"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { v4 as uuidv4 } from "uuid"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useStore } from "@/store/store"
import { useUnsavedChangesWarning } from "@/hooks/useUnsavedChangesWarning"

const formSchema = z.object({
  id: z.string(),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().regex(/^\d{10}$/, { message: "Phone number must be 10 digits." }),
})

const UserDataForm = () => {
  const { userData, setUserData } = useStore()
  const [successMessage, setSuccessMessage] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: userData?.id || uuidv4(),
      name: userData?.name || "",
      address: userData?.address || "",
      email: userData?.email || "",
      phone: userData?.phone || "",
    },
  })

  useUnsavedChangesWarning(form.formState.isDirty)

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setUserData(values)
    setSuccessMessage("User data saved successfully!")
    form.reset(values)
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  return (
    <div className="p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">User Data Form</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="123 Main St, City, Country" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john@example.com" {...field} />
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
                  <Input placeholder="1234567890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Save</Button>
        </form>
      </Form>
      {successMessage && <p className="mt-4 text-green-600 font-semibold">{successMessage}</p>}
    </div>
  )
}

export default UserDataForm

