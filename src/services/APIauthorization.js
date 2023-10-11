import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hwrkbrnfkrgjkdrsbnwc.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3cmticm5ma3JnamtkcnNibndjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM1NjI5ODcsImV4cCI6MjAwOTEzODk4N30.E7mATKlOJpx_-MFYT8ao72Ihp749XD5nGQ-8VPht0iQ'
export const supabase = createClient(supabaseUrl, supabaseAnonKey)


