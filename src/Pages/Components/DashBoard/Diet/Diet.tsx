import { useState, useEffect } from "react";
import {
  Dumbbell,
  Utensils,
  Coffee,
  Sun,
  Moon,
  Apple,
  Flame,
  Activity,
  ArrowLeft,
} from "lucide-react";
import { supabase, type DietPlan } from "@/SupaBase/supabase";

interface DietPlansProps {
  userId: string;
  onBack: () => void;
}

const MEAL_TYPES = [
  {
    key: "breakfast",
    label: "Café da Manhã",
    icon: Coffee,
    color: "from-orange-600 to-yellow-600",
  },
  {
    key: "lunch",
    label: "Almoço",
    icon: Sun,
    color: "from-green-600 to-emerald-600",
  },
  {
    key: "snack",
    label: "Lanche",
    icon: Apple,
    color: "from-purple-600 to-pink-600",
  },
  {
    key: "dinner",
    label: "Jantar",
    icon: Moon,
    color: "from-blue-600 to-indigo-600",
  },
];

export default function DietPlans({ userId, onBack }: DietPlansProps) {
  const [dietPlans, setDietPlans] = useState<DietPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDietPlans();
  }, [userId]);

  const loadDietPlans = async () => {
    try {
      const { data, error } = await supabase
        .from("diet_plans")
        .select("*")
        .eq("user_id", userId)
        .order("meal_type");

      if (error) throw error;
      setDietPlans(data || []);
    } catch (error) {
      console.error("Error loading diet plans:", error);
    } finally {
      setLoading(false);
    }
  };

  const getMealsByType = (mealType: string) => {
    return dietPlans.filter((plan) => plan.meal_type === mealType);
  };

  const getTotalCalories = () => {
    return dietPlans.reduce((sum, plan) => sum + plan.calories, 0);
  };

  const getTotalMacros = () => {
    return dietPlans.reduce(
      (acc, plan) => ({
        protein: acc.protein + Number(plan.protein),
        carbs: acc.carbs + Number(plan.carbs),
        fats: acc.fats + Number(plan.fats),
      }),
      { protein: 0, carbs: 0, fats: 0 },
    );
  };

  const macros = getTotalMacros();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950">
      <nav className="px-6 py-4 flex justify-between items-center border-b border-blue-900/20 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-800 rounded-lg transition-all"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <div className="flex items-center gap-2">
            <Dumbbell className="w-8 h-8 text-blue-500" />
            <span className="text-2xl font-bold text-white">FitPro AI</span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Plano Alimentar
          </h1>
          <p className="text-gray-400">
            Dieta personalizada para seus objetivos
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-blue-900/30">
            <div className="flex items-center gap-3 mb-2">
              <Flame className="w-6 h-6 text-orange-400" />
              <span className="text-gray-400 font-semibold">
                Calorias Totais
              </span>
            </div>
            <p className="text-3xl font-bold text-white">
              {getTotalCalories()} <span className="text-lg">kcal</span>
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-blue-900/30">
            <div className="flex items-center gap-3 mb-2">
              <Activity className="w-6 h-6 text-blue-400" />
              <span className="text-gray-400 font-semibold">Proteínas</span>
            </div>
            <p className="text-3xl font-bold text-white">
              {macros.protein.toFixed(0)}g
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-blue-900/30">
            <div className="flex items-center gap-3 mb-2">
              <Utensils className="w-6 h-6 text-green-400" />
              <span className="text-gray-400 font-semibold">
                Macros Diários
              </span>
            </div>
            <p className="text-sm text-gray-300">
              C: {macros.carbs.toFixed(0)}g | G: {macros.fats.toFixed(0)}g
            </p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Carregando plano alimentar...</p>
          </div>
        ) : dietPlans.length > 0 ? (
          <div className="space-y-8">
            {MEAL_TYPES.map((mealType) => {
              const meals = getMealsByType(mealType.key);
              if (meals.length === 0) return null;

              const Icon = mealType.icon;

              return (
                <div key={mealType.key}>
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`p-3 bg-gradient-to-r ${mealType.color} rounded-lg`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                      {mealType.label}
                    </h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {meals.map((meal) => (
                      <div
                        key={meal.id}
                        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-blue-900/30 hover:border-blue-500/50 transition-all"
                      >
                        <h3 className="text-xl font-bold text-white mb-2">
                          {meal.name}
                        </h3>
                        {meal.description && (
                          <p className="text-gray-400 mb-4 leading-relaxed">
                            {meal.description}
                          </p>
                        )}

                        <div className="bg-gray-800/50 rounded-lg p-4 space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Calorias</span>
                            <span className="text-white font-semibold">
                              {meal.calories} kcal
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Proteínas</span>
                            <span className="text-white font-semibold">
                              {meal.protein}g
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Carboidratos</span>
                            <span className="text-white font-semibold">
                              {meal.carbs}g
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Gorduras</span>
                            <span className="text-white font-semibold">
                              {meal.fats}g
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <Utensils className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">
              Nenhum plano alimentar criado ainda
            </h3>
            <p className="text-gray-400">
              Seus planos alimentares personalizados aparecerão aqui.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
