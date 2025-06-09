import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://pffqlabvizaftmylfyhn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmZnFsYWJ2aXphZnRteWxmeWhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0NDM1NjIsImV4cCI6MjA2NTAxOTU2Mn0.2h_fBo1fxIYjy_7ThapZ2jduazvETSkxdiMDZ5BrKU4'

export const supabase = createClient(supabaseUrl, supabaseKey)