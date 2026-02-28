import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Это создание "клиента" - через него ты будешь делать всё: 
// и логин Геннадия, и добавление заказов, и удаление.
export const supabase = createClient(supabaseUrl, supabaseAnonKey)