import { useEffect, useState } from 'react';
import { ImageUpload } from '../components/ImageUpload';
import { EvaluationCard } from '../components/EvaluationCard';
import { Evaluation } from '../types';
import { getEvaluations, saveEvaluation, deleteEvaluation } from '../utils/storage';
import { generateEvaluation, generateInspirationalQuote, formatFullDateTime } from '../utils/evaluationGenerator';
import { Sparkles, Heart, History, Trash2, Clock } from 'lucide-react';

type Mode = 'evaluation' | 'inspiration';

export default function Home() {
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [currentEvaluation, setCurrentEvaluation] = useState<Evaluation | null>(null);
  const [mode, setMode] = useState<Mode>('evaluation');
  const [showHistory, setShowHistory] = useState(true);

  useEffect(() => {
    setEvaluations(getEvaluations());
  }, []);

  const handleImageUpload = (imageUrl: string) => {
    setIsLoading(true);
    setShowResult(false);

    setTimeout(() => {
      const comment = mode === 'evaluation' ? generateEvaluation() : generateInspirationalQuote();
      const evaluation: Evaluation = {
        id: Date.now().toString(),
        imageUrl,
        comment,
        date: new Date().toISOString().split('T')[0],
        timestamp: Date.now(),
        type: mode
      };

      saveEvaluation(evaluation);
      setCurrentEvaluation(evaluation);
      setEvaluations(getEvaluations());
      setShowResult(true);
      setIsLoading(false);
    }, 1500);
  };

  const handleDeleteEvaluation = (id: string) => {
    if (confirm('确定要删除这条记录吗？')) {
      deleteEvaluation(id);
      setEvaluations(getEvaluations());
      if (currentEvaluation?.id === id) {
        setShowResult(false);
        setCurrentEvaluation(null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-6 px-4 sm:py-8 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-3 sm:mb-4 flex items-center justify-center gap-2 sm:gap-3">
            {mode === 'evaluation' ? (
              <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-blue-600" />
            ) : (
              <Heart className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-pink-600" />
            )}
            {mode === 'evaluation' ? '图片评价系统' : '励志语录生成器'}
          </h1>
          <p className="text-slate-600 text-base sm:text-lg">
            {mode === 'evaluation' 
              ? '上传图片，获得专业构图评价' 
              : '上传图片，获得专属励志语录'}
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-4 sm:mt-6">
            <button
              onClick={() => setMode('evaluation')}
              className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-full font-medium transition-all ${
                mode === 'evaluation'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              构图评价
            </button>
            <button
              onClick={() => setMode('inspiration')}
              className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-full font-medium transition-all ${
                mode === 'inspiration'
                  ? 'bg-pink-600 text-white shadow-lg'
                  : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              励志语录
            </button>
          </div>
        </div>

        <div className="space-y-6 sm:space-y-8">
          <ImageUpload onImageUpload={handleImageUpload} isLoading={isLoading} />

          {showResult && currentEvaluation && (
            <div className={`bg-white rounded-2xl p-4 sm:p-6 shadow-lg border ${
              mode === 'evaluation' ? 'border-blue-200' : 'border-pink-200'
            }`}>
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-center gap-2">
                  {mode === 'evaluation' ? (
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  ) : (
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600" />
                  )}
                  <h2 className="text-lg sm:text-xl font-semibold text-slate-800">
                    {mode === 'evaluation' ? '评价结果' : '今日语录'}
                  </h2>
                </div>
                <button
                  onClick={() => handleDeleteEvaluation(currentEvaluation.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  aria-label="删除"
                >
                  <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
              <div className="flex items-center gap-2 mb-4 text-sm text-slate-500">
                <Clock className="w-4 h-4" />
                <span>{formatFullDateTime(currentEvaluation.timestamp)}</span>
              </div>
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="aspect-video rounded-xl overflow-hidden bg-slate-100">
                  <img
                    src={currentEvaluation.imageUrl}
                    alt="评价图片"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <p className={`text-base sm:text-lg leading-relaxed ${
                    mode === 'evaluation' ? 'text-slate-700' : 'text-slate-800'
                  }`}>
                    {currentEvaluation.comment}
                  </p>
                </div>
              </div>
            </div>
          )}

          {evaluations.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-2">
                  <History className="w-5 h-5 sm:w-6 sm:h-6" />
                  历史记录
                </h2>
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
                >
                  {showHistory ? '收起' : '展开'}
                </button>
              </div>
              {showHistory && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {evaluations.map(evaluation => (
                    <div key={evaluation.id} className="relative group">
                      <EvaluationCard evaluation={evaluation} />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteEvaluation(evaluation.id);
                        }}
                        className="absolute top-2 right-2 p-1.5 bg-white/90 hover:bg-red-50 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-sm"
                        aria-label="删除"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
