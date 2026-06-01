import { useEffect, useState } from 'react';
import { ImageUpload } from '../components/ImageUpload';
import { EvaluationCard } from '../components/EvaluationCard';
import { Evaluation } from '../types';
import { getEvaluations, saveEvaluation } from '../utils/storage';
import { generateEvaluation } from '../utils/evaluationGenerator';
import { Sparkles } from 'lucide-react';

export default function Home() {
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [currentEvaluation, setCurrentEvaluation] = useState<Evaluation | null>(null);

  useEffect(() => {
    setEvaluations(getEvaluations());
  }, []);

  const handleImageUpload = (imageUrl: string) => {
    setIsLoading(true);
    setShowResult(false);

    setTimeout(() => {
      const evaluation: Evaluation = {
        id: Date.now().toString(),
        imageUrl,
        comment: generateEvaluation(),
        date: new Date().toISOString().split('T')[0],
        timestamp: Date.now()
      };

      saveEvaluation(evaluation);
      setCurrentEvaluation(evaluation);
      setEvaluations(getEvaluations());
      setShowResult(true);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4 flex items-center justify-center gap-3">
            <Sparkles className="w-10 h-10 text-blue-600" />
            图片评价系统
          </h1>
          <p className="text-slate-600 text-lg">上传图片，获得专业构图评价</p>
        </div>

        <div className="space-y-8">
          <ImageUpload onImageUpload={handleImageUpload} isLoading={isLoading} />

          {showResult && currentEvaluation && (
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-200 animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-slate-800">评价结果</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="aspect-video rounded-xl overflow-hidden bg-slate-100">
                  <img
                    src={currentEvaluation.imageUrl}
                    alt="评价图片"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-lg text-slate-700 leading-relaxed">
                    {currentEvaluation.comment}
                  </p>
                </div>
              </div>
            </div>
          )}

          {evaluations.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-6">历史评价</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {evaluations.map(evaluation => (
                  <EvaluationCard key={evaluation.id} evaluation={evaluation} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}