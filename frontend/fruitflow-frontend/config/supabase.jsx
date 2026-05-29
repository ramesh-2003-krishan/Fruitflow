import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://wycpdkrfcsqxsogeezjg.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5Y3Bka3JmY3NxeHNvZ2VlempnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5ODUzNTksImV4cCI6MjA5NTU2MTM1OX0.INRN9ttirjP0amB16Rum4Q8lE86zQPhAz-lfR5abS8k"

export const supabase = createClient(supabaseUrl, supabaseKey)