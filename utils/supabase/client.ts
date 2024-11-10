import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fokufbwnrpfoctnazgiz.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZva3VmYnducnBmb2N0bmF6Z2l6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEwOTI3OTQsImV4cCI6MjA0NjY2ODc5NH0.V-EaaL29MerKUsD6byX_dHcbulI14Wjd6t7DjTw-KQM'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;
