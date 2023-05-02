import { createClient } from "@supabase/supabase-js";

const URL = 'https://wkhuxbifphfntrikognl.supabase.co'

const API_KEY = import.meta.env.production.VITE_API_KEY

export const supabase = createClient(URL, API_KEY)