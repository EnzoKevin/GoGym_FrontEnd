import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  name: string;
  email: string;
  height: number;
  weight: number;
  body_type: "ectomorph" | "mesomorph" | "endomorph";
  gym_focus: "muscle_gain" | "weight_loss" | "endurance" | "general_fitness";
  created_at: string;
  updated_at: string;
};

export type Workout = {
  id: string;
  user_id: string;
  day_of_week:
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday";
  muscle_group: string;
  created_at: string;
};

export type Exercise = {
  id: string;
  workout_id: string;
  name: string;
  sets: number;
  reps: string;
  rest_time: string;
  image_url?: string;
  video_url?: string;
  instructions?: string;
  order_index: number;
};

export type DietPlan = {
  id: string;
  user_id: string;
  meal_type: "breakfast" | "lunch" | "dinner" | "snack";
  name: string;
  description?: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  created_at: string;
};
