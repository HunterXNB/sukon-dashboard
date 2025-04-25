export type Registration = {
  id: number;
  first_name: string;
  last_name: string | null;
  email: string;
  mobile: string | null;
  title: string | null;
  role: string;
  registration_status: "pending" | "approved" | "rejected";
};
export type RegistrationFullData = Registration &
  (
    | {
        gender: "male" | "female";
        date_of_birth: string;
        nationality: string;
        country_of_residence: string;
        fluent_language: string;
        highest_degree: string;
        university: string;
        graduation_year: string;
        classification: string;
        specification: string;
        years_of_experience: string;
        licensing_area: string;
        licensing_number: string;
        work_on_clinic: 1 | 0;
        clinic_address: string;
        has_more_than_one_qualification: 1 | 0;
        qualifications: [];
        session_usd_price: string;
        session_egp_price: string;
        available_now: 1 | 0;
        rejection_reason: null;
        registration_status: "pending" | "approved";
      }
    | {
        registration_status: "rejected";
        gender: "male" | "female";
        date_of_birth: string;
        nationality: string;
        country_of_residence: string;
        fluent_language: string;
        highest_degree: string;
        university: string;
        graduation_year: string;
        classification: string;
        specification: string;
        years_of_experience: string;
        licensing_area: string;
        licensing_number: string;
        work_on_clinic: 1 | 0;
        clinic_address: string;
        has_more_than_one_qualification: 1 | 0;
        qualifications: [];
        session_usd_price: string;
        session_egp_price: string;
        available_now: 1 | 0;
        rejection_reason: string;
      }
  );
