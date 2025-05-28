import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://gaojwilavmullvnglpwp.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdhb2p3aWxhdm11bGx2bmdscHdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyNzM1NzcsImV4cCI6MjA2MTg0OTU3N30.kAJhkZVOnKXsXV3nmRsKcZ1EPNjYWTRLG4Do4v-VO4I";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
