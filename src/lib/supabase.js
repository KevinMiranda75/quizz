import { createClient } from "@supabase/supabase-js";

// 👇 Reemplaza con tus valores de Supabase Settings → API
const SUPABASE_URL = "https://uvbxanhdlstrowzhcmpn.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_m31ZBq9pU_g45hyEhKM1FA__inc7ft1";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function saveScore({ name, score, total, pct }) {
  const { error } = await supabase
    .from("scores")
    .insert([{ name, score, total, pct }]);
  if (error) throw error;
}

export async function getFullLeaderboard() {
  const { data, error } = await supabase
    .from("scores")
    .select("*")
    .order("pct", { ascending: false })
    .order("created_at", { ascending: true })
    .limit(50); // Puedes ajustar este límite según lo que necesites

  if (error) throw error;
  return data;
}

export async function getTop3() {
  const { data, error } = await supabase
    .from("scores")
    .select("*")
    .order("pct", { ascending: false }) // Prioriza el mayor puntaje
    .order("created_at", { ascending: true }) // Si empatan, el más antiguo primero
    .limit(3); // Solo los 3 mejores

  if (error) throw error;
  return data;
}
