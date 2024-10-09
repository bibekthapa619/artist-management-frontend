import { handleAuthenticationFailure, notifyError } from "@/main";
import { AxiosError } from "axios";
import { useRouter } from "vue-router";

interface FieldErrors {
  [key: string]: string[];
}

type ErrorsType = { value: Record<string, string> } | { value: string[] };

export const useAxiosErrorHandler = (errors: ErrorsType) => {
  const router = useRouter();

  const handleError = (error: unknown) => {
    console.error(error);

    if (error instanceof AxiosError && error.response) {
      const fieldErrors: FieldErrors = error.response.data.errors || {};

      if (error.response?.status === 404) {
        router.push({ name: "not-found" });
        return;
      } else if (error.response?.status === 401) {
        handleAuthenticationFailure();
        router.push({ name: "login" });
        notifyError("Unauthorized access. Please log in.");
        return;
      }

      if (error.response.data) {
        if (Array.isArray(fieldErrors)) {
          errors.value = fieldErrors;
        } else {
          errors.value = {
            first_name: fieldErrors.first_name?.[0] || "",
            last_name: fieldErrors.last_name?.[0] || "",
            dob: fieldErrors.dob?.[0] || "",
            gender: fieldErrors.gender?.[0] || "",
            address: fieldErrors.address?.[0] || "",
            phone: fieldErrors.phone?.[0] || "",
            role: fieldErrors.role?.[0] || "",
            email: fieldErrors.email?.[0] || "",
            password: fieldErrors.password?.[0] || "",
            artist_name: fieldErrors.name?.[0] || "",
            first_release_year: fieldErrors.first_release_year?.[0] || "",
            no_of_albums_released: fieldErrors.no_of_albums_released?.[0] || "",
          };
        }
      }
      const message = error.response.data.message || "An error occurred.";
      notifyError(message);
    } else {
      notifyError("An unknown error occurred.");
    }
  };

  return { handleError };
};
