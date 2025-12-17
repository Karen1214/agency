import { Hono } from "hono";
import { cors } from "hono/cors";
import { zValidator } from "@hono/zod-validator";
import { ContactFormSchema, AppointmentFormSchema, type ContactFormType, type AppointmentFormType, type ApiResponseType } from "@/shared/types";

const app = new Hono<{ Bindings: Env }>();

// Enable CORS for frontend requests
app.use("/*", cors({
  origin: "*",
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type"],
}));

// Health check endpoint
app.get("/api/health", (c) => {
  return c.json({ success: true, message: "Backend is running" });
});

// Submit contact form
app.post("/api/contacts", zValidator("json", ContactFormSchema), async (c) => {
  try {
    const data: ContactFormType = c.req.valid("json");
    
    // Insert contact into database
    const result = await c.env.DB.prepare(`
      INSERT INTO contacts (first_name, last_name, email, phone, services, project_details, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
    `).bind(
      data.firstName,
      data.lastName,
      data.email,
      data.phone || null,
      data.services ? JSON.stringify(data.services) : null,
      data.projectDetails || null
    ).run();

    if (result.success) {
      const response: ApiResponseType = {
        success: true,
        message: "Contact form submitted successfully! We'll get back to you soon.",
        data: { id: result.meta.last_row_id }
      };
      return c.json(response, 201);
    } else {
      throw new Error("Failed to save contact");
    }
  } catch (error) {
    console.error("Error submitting contact form:", error);
    const response: ApiResponseType = {
      success: false,
      message: "Failed to submit contact form. Please try again later."
    };
    return c.json(response, 500);
  }
});

// Get all contacts (for admin dashboard - future feature)
app.get("/api/contacts", async (c) => {
  try {
    const { results } = await c.env.DB.prepare(`
      SELECT * FROM contacts 
      ORDER BY created_at DESC
    `).all();

    const response: ApiResponseType = {
      success: true,
      message: "Contacts retrieved successfully",
      data: results
    };
    return c.json(response);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    const response: ApiResponseType = {
      success: false,
      message: "Failed to retrieve contacts"
    };
    return c.json(response, 500);
  }
});

// Get contact by ID
app.get("/api/contacts/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const result = await c.env.DB.prepare(`
      SELECT * FROM contacts WHERE id = ?
    `).bind(id).first();

    if (result) {
      const response: ApiResponseType = {
        success: true,
        message: "Contact retrieved successfully",
        data: result
      };
      return c.json(response);
    } else {
      const response: ApiResponseType = {
        success: false,
        message: "Contact not found"
      };
      return c.json(response, 404);
    }
  } catch (error) {
    console.error("Error fetching contact:", error);
    const response: ApiResponseType = {
      success: false,
      message: "Failed to retrieve contact"
    };
    return c.json(response, 500);
  }
});

// Mark contact as read
app.put("/api/contacts/:id/read", async (c) => {
  try {
    const id = c.req.param("id");
    const result = await c.env.DB.prepare(`
      UPDATE contacts 
      SET is_read = TRUE, updated_at = datetime('now')
      WHERE id = ?
    `).bind(id).run();

    if (result.success) {
      const response: ApiResponseType = {
        success: true,
        message: "Contact marked as read"
      };
      return c.json(response);
    } else {
      const response: ApiResponseType = {
        success: false,
        message: "Contact not found"
      };
      return c.json(response, 404);
    }
  } catch (error) {
    console.error("Error updating contact:", error);
    const response: ApiResponseType = {
      success: false,
      message: "Failed to update contact"
    };
    return c.json(response, 500);
  }
});

// Submit appointment booking
app.post("/api/appointments", zValidator("json", AppointmentFormSchema), async (c) => {
  try {
    const data: AppointmentFormType = c.req.valid("json");
    
    // Check if the time slot is already booked
    const existingAppointment = await c.env.DB.prepare(`
      SELECT id FROM appointments 
      WHERE appointment_date = ? AND appointment_time = ? AND status != 'cancelled'
    `).bind(data.appointmentDate, data.appointmentTime).first();

    if (existingAppointment) {
      const response: ApiResponseType = {
        success: false,
        message: "This time slot is already booked. Please select a different time."
      };
      return c.json(response, 409);
    }
    
    // Insert appointment into database
    const result = await c.env.DB.prepare(`
      INSERT INTO appointments (first_name, last_name, email, phone, service_type, appointment_date, appointment_time, message, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
    `).bind(
      data.firstName,
      data.lastName,
      data.email,
      data.phone || null,
      data.serviceType,
      data.appointmentDate,
      data.appointmentTime,
      data.message || null
    ).run();

    if (result.success) {
      const response: ApiResponseType = {
        success: true,
        message: "Appointment scheduled successfully! We'll send you a confirmation email shortly.",
        data: { id: result.meta.last_row_id }
      };
      return c.json(response, 201);
    } else {
      throw new Error("Failed to schedule appointment");
    }
  } catch (error) {
    console.error("Error scheduling appointment:", error);
    const response: ApiResponseType = {
      success: false,
      message: "Failed to schedule appointment. Please try again later."
    };
    return c.json(response, 500);
  }
});

// Get available time slots for a specific date
app.get("/api/appointments/availability/:date", async (c) => {
  try {
    const date = c.req.param("date");
    
    // Get all booked appointments for the date
    const { results } = await c.env.DB.prepare(`
      SELECT appointment_time FROM appointments 
      WHERE appointment_date = ? AND status != 'cancelled'
    `).bind(date).all();

    const bookedTimes = results.map((row: any) => row.appointment_time);
    
    // Define available time slots (9 AM to 5 PM, excluding lunch 12-1 PM)
    const allTimeSlots = [
      "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
      "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
    ];
    
    const availableSlots = allTimeSlots.filter(slot => !bookedTimes.includes(slot));

    const response: ApiResponseType = {
      success: true,
      message: "Available time slots retrieved successfully",
      data: { availableSlots, bookedSlots: bookedTimes }
    };
    return c.json(response);
  } catch (error) {
    console.error("Error fetching availability:", error);
    const response: ApiResponseType = {
      success: false,
      message: "Failed to retrieve availability"
    };
    return c.json(response, 500);
  }
});

// Get all appointments (for admin dashboard - future feature)
app.get("/api/appointments", async (c) => {
  try {
    const { results } = await c.env.DB.prepare(`
      SELECT * FROM appointments 
      ORDER BY appointment_date DESC, appointment_time DESC
    `).all();

    const response: ApiResponseType = {
      success: true,
      message: "Appointments retrieved successfully",
      data: results
    };
    return c.json(response);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    const response: ApiResponseType = {
      success: false,
      message: "Failed to retrieve appointments"
    };
    return c.json(response, 500);
  }
});

// Confirm appointment
app.put("/api/appointments/:id/confirm", async (c) => {
  try {
    const id = c.req.param("id");
    const result = await c.env.DB.prepare(`
      UPDATE appointments 
      SET is_confirmed = TRUE, status = 'confirmed', updated_at = datetime('now')
      WHERE id = ?
    `).bind(id).run();

    if (result.success) {
      const response: ApiResponseType = {
        success: true,
        message: "Appointment confirmed successfully"
      };
      return c.json(response);
    } else {
      const response: ApiResponseType = {
        success: false,
        message: "Appointment not found"
      };
      return c.json(response, 404);
    }
  } catch (error) {
    console.error("Error confirming appointment:", error);
    const response: ApiResponseType = {
      success: false,
      message: "Failed to confirm appointment"
    };
    return c.json(response, 500);
  }
});

export default app;
