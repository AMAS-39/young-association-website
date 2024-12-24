// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zswbwbwgeyjmeebqoecg.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpzd2J3YndnZXlqbWVlYnFvZWNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ4NTA5NjUsImV4cCI6MjA1MDQyNjk2NX0.9mklH-wsskSCr8IZqkmRJ7gHCUIMw7XOm1Y4EuSpKJA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
