import { Dumbbell, Target, Utensils, Zap, ArrowRight } from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950">
      <nav className="px-6 py-4 flex justify-between items-center border-b border-blue-900/20">
        <div className="flex items-center gap-2">
          <Dumbbell className="w-8 h-8 text-blue-500" />
          <span className="text-2xl font-bold text-white">FitPro AI</span>
        </div>
        <button
          onClick={onGetStarted}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all"
        >
          Começar Agora
        </button>
      </nav>

      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
            Seu Treino Personalizado,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Powered by AI
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Transforme seu corpo com treinos e dietas personalizadas baseadas no
            seu biotipo e objetivos. Resultados reais, ciência aplicada.
          </p>
        </div>

        <button
          onClick={onGetStarted}
          className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 flex items-center gap-2 mx-auto"
        >
          Criar Meu Treino
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-blue-900/30 hover:border-blue-500/50 transition-all">
            <div className="w-14 h-14 bg-blue-600/20 rounded-xl flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Treinos Personalizados
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Treinos adaptados ao seu biotipo (ectomorfo, mesomorfo, endomorfo)
              e objetivos específicos na academia.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-blue-900/30 hover:border-blue-500/50 transition-all">
            <div className="w-14 h-14 bg-blue-600/20 rounded-xl flex items-center justify-center mb-6">
              <Utensils className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Dietas Personalizadas
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Planos alimentares completos calculados para atingir seus
              objetivos de forma saudável e sustentável.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-blue-900/30 hover:border-blue-500/50 transition-all">
            <div className="w-14 h-14 bg-blue-600/20 rounded-xl flex items-center justify-center mb-6">
              <Zap className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Vídeos e Instruções
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Cada exercício vem com vídeos demonstrativos e instruções
              detalhadas para execução perfeita.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-3xl p-12 text-center border border-blue-500/30">
          <h2 className="text-4xl font-bold text-white mb-6">
            Pronto para Transformar Seu Corpo?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de pessoas que já estão alcançando seus
            objetivos com treinos personalizados.
          </p>
          <button
            onClick={onGetStarted}
            className="px-10 py-4 bg-white text-gray-900 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-xl"
          >
            Começar Gratuitamente
          </button>
        </div>
      </section>

      <footer className="border-t border-blue-900/20 py-8">
        <p className="text-center text-gray-500">
          © 2024 FitPro AI. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}
