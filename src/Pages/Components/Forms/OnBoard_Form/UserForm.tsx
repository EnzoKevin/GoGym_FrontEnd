import { useState } from "react";
import { User, Mail, Ruler, Weight, Users, Target } from "lucide-react";

interface OnboardingFormProps {
  onComplete: (data: FormData) => void;
}

export interface FormData {
  name: string;
  email: string;
  height: number;
  weight: number;
  bodyType: "ectomorph" | "mesomorph" | "endomorph";
  gymFocus: "muscle_gain" | "weight_loss" | "endurance" | "general_fitness";
}

export default function OnboardingForm({ onComplete }: OnboardingFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    height: 0,
    weight: 0,
    bodyType: "mesomorph",
    gymFocus: "muscle_gain",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-3">
            Vamos Conhecer Você
          </h1>
          <p className="text-gray-400 text-lg">
            Preencha suas informações para criar seu treino personalizado
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-blue-900/30 space-y-6"
        >
          <div>
            <label className="flex items-center gap-2 text-white font-semibold mb-2">
              <User className="w-5 h-5 text-blue-400" />
              Nome Completo
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Seu nome"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-white font-semibold mb-2">
              <Mail className="w-5 h-5 text-blue-400" />
              Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="seu@email.com"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-white font-semibold mb-2">
                <Ruler className="w-5 h-5 text-blue-400" />
                Altura (cm)
              </label>
              <input
                type="number"
                required
                min="100"
                max="250"
                value={formData.height || ""}
                onChange={(e) =>
                  setFormData({ ...formData, height: Number(e.target.value) })
                }
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="170"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-white font-semibold mb-2">
                <Weight className="w-5 h-5 text-blue-400" />
                Peso (kg)
              </label>
              <input
                type="number"
                required
                min="30"
                max="300"
                value={formData.weight || ""}
                onChange={(e) =>
                  setFormData({ ...formData, weight: Number(e.target.value) })
                }
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="70"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-white font-semibold mb-3">
              <Users className="w-5 h-5 text-blue-400" />
              Tipo Corporal
            </label>
            <div className="grid md:grid-cols-3 gap-3">
              {[
                {
                  value: "ectomorph",
                  label: "Ectomorfo",
                  desc: "Magro, dificuldade em ganhar peso",
                },
                {
                  value: "mesomorph",
                  label: "Mesomorfo",
                  desc: "Atlético, ganha músculos facilmente",
                },
                {
                  value: "endomorph",
                  label: "Endomorfo",
                  desc: "Corpo mais robusto, ganha peso facilmente",
                },
              ].map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      bodyType: type.value as FormData["bodyType"],
                    })
                  }
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    formData.bodyType === type.value
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-gray-700 bg-gray-800/30 hover:border-gray-600"
                  }`}
                >
                  <div className="font-semibold text-white mb-1">
                    {type.label}
                  </div>
                  <div className="text-sm text-gray-400">{type.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-white font-semibold mb-3">
              <Target className="w-5 h-5 text-blue-400" />
              Foco na Academia
            </label>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                { value: "muscle_gain", label: "Ganho de Massa Muscular" },
                { value: "weight_loss", label: "Perda de Peso" },
                { value: "endurance", label: "Resistência e Condicionamento" },
                { value: "general_fitness", label: "Fitness Geral" },
              ].map((focus) => (
                <button
                  key={focus.value}
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      gymFocus: focus.value as FormData["gymFocus"],
                    })
                  }
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.gymFocus === focus.value
                      ? "border-blue-500 bg-blue-500/10 text-white"
                      : "border-gray-700 bg-gray-800/30 hover:border-gray-600 text-gray-300"
                  }`}
                >
                  <div className="font-semibold">{focus.label}</div>
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-500/30"
          >
            Gerar Meu Treino
          </button>
        </form>
      </div>
    </div>
  );
}
