import { createClient } from '@supabase/supabase-js';

const URL = 'https://oggfcwwrajtfehoixeqv.supabase.co';

const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9nZ2Zjd3dyYWp0ZmVob2l4ZXF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIzNjg5NzIsImV4cCI6MjAzNzk0NDk3Mn0.a9rve4TzPxq8_g8eZTtcC0gyCNItzhCEDCuN_OP2teg';

const supabase = createClient(URL, API_KEY);

export default supabase;