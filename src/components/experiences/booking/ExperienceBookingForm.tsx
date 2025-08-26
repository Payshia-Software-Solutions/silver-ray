
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

interface ExperienceBookingFormProps {
  experienceId: string;
  defaultAdults?: number;
}

const experienceBookingSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(10, "Phone number must be at least 10 digits.").optional(),
  preferredDate: z.date({ required_error: "Preferred date is required." }),
  preferredTime: z.string().min(1, "Preferred time is required."),
  adults: z.coerce.number().min(1, "At least 1 adult is required.").max(20, "Max 20 adults."),
  children: z.coerce.number().min(0).max(20, "Max 20 children.").optional(),
  specialRequests: z.string().max(500, "Special requests cannot exceed 500 characters.").optional(),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions.",
  }),
});

type ExperienceBookingValues = z.infer<typeof experienceBookingSchema>;

export function ExperienceBookingForm({ experienceId, defaultAdults = 1 }: ExperienceBookingFormProps) {
  const form = useForm<ExperienceBookingValues>({
    resolver: zodResolver(experienceBookingSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      preferredTime: "Morning", // Default or fetch available slots
      adults: defaultAdults,
      children: 0,
      specialRequests: "",
      agreeToTerms: false,
    },
  });

  function onSubmit(data: ExperienceBookingValues) {
    console.log("Experience Booking Data:", { experienceId, ...data });
    toast({
      title: "Booking Request Submitted!",
      description: "Thank you! We've received your request and will contact you shortly to confirm.",
      variant: "default",
    });
    form.reset({
        ...form.getValues(), // keep current values if needed or reset fully
        fullName: "",
        email: "",
        phone: "",
        specialRequests: "",
        agreeToTerms: false,
        // Reset date/time/guest counts if desired, or leave them for re-booking convenience
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
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
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email address" {...field} />
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
              <FormLabel>Phone Number <span className="text-muted-foreground text-xs">(Optional)</span></FormLabel>
              <FormControl>
                <Input type="tel" placeholder="Phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="preferredDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Preferred Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date(new Date().setHours(0,0,0,0)) }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="preferredTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Time</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Morning">Morning (9AM-12PM)</SelectItem>
                    <SelectItem value="Afternoon">Afternoon (1PM-4PM)</SelectItem>
                    <SelectItem value="Evening">Evening (5PM-8PM)</SelectItem>
                    <SelectItem value="Any">Any Time Available</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="adults"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Adults</FormLabel>
                <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={String(field.value)}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Adults" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[...Array(10).keys()].map(i => (
                      <SelectItem key={i + 1} value={String(i + 1)}>{i + 1}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="children"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Children</FormLabel>
                <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={String(field.value || 0)}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Children" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[...Array(6).keys()].map(i => (
                      <SelectItem key={i} value={String(i)}>{i}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription className="text-xs">Children (4-12 years)</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="specialRequests"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Special Requests / Notes <span className="text-muted-foreground text-xs">(Optional)</span></FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., Dietary restrictions, accessibility needs, specific preferences..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="agreeToTerms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm bg-secondary/20">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="font-normal">
                  I agree to the{" "}
                  <Link href="/privacy#terms" className="underline hover:text-primary">Terms & Conditions</Link> and{" "}
                  <Link href="/privacy#cancellation" className="underline hover:text-primary">Cancellation Policy</Link>.
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" size="lg" className="w-full font-body text-lg bg-primary text-primary-foreground hover:bg-primary/90">
          Confirm Booking
        </Button>
      </form>
    </Form>
  );
}

    