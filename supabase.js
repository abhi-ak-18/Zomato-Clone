import { createClient } from "@supabase/supabase-js";

import "react-native-url-polyfill/auto";

const supabaseUrl = "https://mjwxxxmcrtghlydmvcpy.supabase.co";
const supabaseAnonKey =
  "YOUR_KEY_HERE";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
