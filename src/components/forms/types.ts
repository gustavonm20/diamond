import type { UseFormReturn } from "react-hook-form";
import type { Lead, LeadInput } from "@/lib/lead-schema";

export type LeadFormApi = UseFormReturn<LeadInput, unknown, Lead>;
