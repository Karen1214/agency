import { useState } from 'react';
import { ContactFormType, AppointmentFormType, ApiResponseType } from '@/shared/types';

export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitContactForm = async (data: ContactFormType): Promise<ApiResponseType> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result: ApiResponseType = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit form');
      }

      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchContacts = async (): Promise<ApiResponseType> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/contacts');
      const result: ApiResponseType = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch contacts');
      }

      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const submitAppointment = async (data: AppointmentFormType): Promise<ApiResponseType> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result: ApiResponseType = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to schedule appointment');
      }

      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailability = async (date: string): Promise<ApiResponseType> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/appointments/availability/${date}`);
      const result: ApiResponseType = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch availability');
      }

      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    submitContactForm,
    fetchContacts,
    submitAppointment,
    fetchAvailability,
  };
}
