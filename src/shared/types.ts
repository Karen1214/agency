import z from "zod";

/**
 * Types shared between the client and server go here.
 */

// Contact form schema
export const ContactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  services: z.array(z.string()).optional(),
  projectDetails: z.string().optional(),
});

export type ContactFormType = z.infer<typeof ContactFormSchema>;

// Contact record schema (with database fields)
export const ContactSchema = z.object({
  id: z.number(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  phone: z.string().nullable(),
  services: z.string().nullable(),
  project_details: z.string().nullable(),
  is_read: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type ContactType = z.infer<typeof ContactSchema>;

// API Response types
export const ApiResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.any().optional(),
});

export type ApiResponseType = z.infer<typeof ApiResponseSchema>;

// Appointment form schema
export const AppointmentFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  serviceType: z.string().min(1, "Please select a service"),
  appointmentDate: z.string().min(1, "Please select a date"),
  appointmentTime: z.string().min(1, "Please select a time"),
  message: z.string().optional(),
});

export type AppointmentFormType = z.infer<typeof AppointmentFormSchema>;

// Appointment record schema (with database fields)
export const AppointmentSchema = z.object({
  id: z.number(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  phone: z.string().nullable(),
  service_type: z.string(),
  appointment_date: z.string(),
  appointment_time: z.string(),
  message: z.string().nullable(),
  status: z.string(),
  is_confirmed: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type AppointmentType = z.infer<typeof AppointmentSchema>;
