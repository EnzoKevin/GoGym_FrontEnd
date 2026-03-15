import { useState, useEffect } from "react";
import {
  Dumbbell,
  Calendar,
  Play,
  Image,
  Clock,
  Repeat,
  ChefHat,
  LogOut,
} from "lucide-react";
import { supabase, type Workout, type Exercise } from "@/SupaBase/supabase";

interface WorkoutDashboardProps {
  userId: string;
  onNavigateToDiet: () => void;
  onLogout: () => void;
}

const DAYS = [
  { key: "monday", label: "Segunda" },
  { key: "tuesday", label: "Terça" },
  { key: "wednesday", label: "Quarta" },
  { key: "thursday", label: "Quinta" },
  { key: "friday", label: "Sexta" },
  { key: "saturday", label: "Sábado" },
  { key: "sunday", label: "Domingo" },
];

interface WorkoutWithExercises extends Workout {
  exercises: Exercise[];
}

export default function WorkoutDashboard({
  userId,
  onNavigateToDiet,
  onLogout,
}: WorkoutDashboardProps) {
  const [selectedDay, setSelectedDay] = useState("monday");
  const [workouts, setWorkouts] = useState<WorkoutWithExercises[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWorkouts();
  }, [userId]);

  const loadWorkouts = async () => {
    try {
      const { data: workoutsData, error: workoutsError } = await supabase
        .from("workouts")
        .select("*")
        .eq("user_id", userId);

      if (workoutsError) throw workoutsError;

      const workoutsWithExercises = await Promise.all(
        (workoutsData || []).map(async (workout) => {
          const { data: exercisesData } = await supabase
            .from("exercises")
            .select("*")
            .eq("workout_id", workout.id)
            .order("order_index");

          return {
            ...workout,
            exercises: exercisesData || [],
          };
        }),
      );

      setWorkouts(workoutsWithExercises);
    } catch (error) {
      console.error("Error loading workouts:", error);
    } finally {
      setLoading(false);
    }
  };

  const selectedWorkout = workouts.find((w) => w.day_of_week === selectedDay);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950">
      <nav className="px-6 py-4 flex justify-between items-center border-b border-blue-900/20 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Dumbbell className="w-8 h-8 text-blue-500" />
          <span className="text-2xl font-bold text-white">FitPro AI</span>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onNavigateToDiet}
            className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold transition-all flex items-center gap-2"
          >
            <ChefHat className="w-4 h-4" />
            Dietas
          </button>
          <button
            onClick={onLogout}
            className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold transition-all flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Seus Treinos</h1>
          <p className="text-gray-400">
            Treino personalizado baseado no seu perfil e objetivos
          </p>
        </div>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {DAYS.map((day) => (
            <button
              key={day.key}
              onClick={() => setSelectedDay(day.key)}
              className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                selectedDay === day.key
                  ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              <Calendar className="w-4 h-4" />
              {day.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Carregando treinos...</p>
          </div>
        ) : selectedWorkout && selectedWorkout.exercises.length > 0 ? (
          <div>
            <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-xl p-6 mb-6 border border-blue-500/30">
              <h2 className="text-2xl font-bold text-white mb-2">
                {selectedWorkout.muscle_group}
              </h2>
              <p className="text-gray-300">
                {selectedWorkout.exercises.length} exercícios
              </p>
            </div>

            <div className="space-y-4">
              {selectedWorkout.exercises.map((exercise, index) => (
                <div
                  key={exercise.id}
                  className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-blue-900/30 hover:border-blue-500/50 transition-all"
                >
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                        <span className="text-xl font-bold text-blue-400">
                          {index + 1}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-3">
                        {exercise.name}
                      </h3>

                      <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex items-center gap-2 text-gray-300">
                          <Repeat className="w-4 h-4 text-blue-400" />
                          <span className="font-semibold">
                            {exercise.sets}
                          </span>{" "}
                          séries
                        </div>
                        <div className="flex items-center gap-2 text-gray-300">
                          <Dumbbell className="w-4 h-4 text-blue-400" />
                          <span className="font-semibold">
                            {exercise.reps}
                          </span>{" "}
                          repetições
                        </div>
                        <div className="flex items-center gap-2 text-gray-300">
                          <Clock className="w-4 h-4 text-blue-400" />
                          <span className="font-semibold">
                            {exercise.rest_time}
                          </span>{" "}
                          descanso
                        </div>
                      </div>

                      {exercise.instructions && (
                        <p className="text-gray-400 mb-4 leading-relaxed">
                          {exercise.instructions}
                        </p>
                      )}

                      <div className="flex gap-3">
                        {exercise.image_url && (
                          <a
                            href={exercise.image_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold transition-all flex items-center gap-2"
                          >
                            <Image className="w-4 h-4" />
                            Ver Imagem
                          </a>
                        )}
                        {exercise.video_url && (
                          <a
                            href={exercise.video_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all flex items-center gap-2"
                          >
                            <Play className="w-4 h-4" />
                            Ver Vídeo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <Dumbbell className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">
              Nenhum treino para este dia
            </h3>
            <p className="text-gray-400">
              Você pode descansar ou fazer um treino leve de sua escolha.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
