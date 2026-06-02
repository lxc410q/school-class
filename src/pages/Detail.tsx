import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Sparkles, Heart } from 'lucide-react';
import { getEvaluationById } from '../utils/storage';
import { formatDate } from '../utils/evaluationGenerator';

export default function Detail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const evaluation = id ? getEvaluationById(id) : undefined;

  if (!evaluation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4">评价不存在</h2>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  const datePart = evaluation.comment.split('：')[0];
  const commentPart = evaluation.comment.split('：')[1] || evaluation.comment;
  const isEvaluation = evaluation.type === 'evaluation';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-6 px-4 sm:py-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-blue-600 transition-colors mb-6 sm:mb-8 text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          返回
        </button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="aspect-video bg-slate-100 relative">
            <img
              src={evaluation.imageUrl}
              alt="评价图片"
              className="w-full h-full object-contain"
            />
            {/* 类型标签 */}
            <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 shadow-md ${
              isEvaluation 
                ? 'bg-blue-600 text-white' 
                : 'bg-pink-600 text-white'
            }`}>
              {isEvaluation ? (
                <Sparkles className="w-4 h-4" />
              ) : (
                <Heart className="w-4 h-4" />
              )}
              {isEvaluation ? '构图分析' : '励志语录'}
            </div>
          </div>

          <div className="p-5 sm:p-6 md:p-8">
            <div className="flex items-center gap-2.5 sm:gap-3 mb-5 sm:mb-6">
              {isEvaluation ? (
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              ) : (
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600" />
              )}
              <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
                {isEvaluation ? '构图评价详情' : '励志语录详情'}
              </h1>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 text-slate-500 mb-5 sm:mb-6">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-base sm:text-lg">{formatDate(datePart)}</span>
            </div>

            <div className={`rounded-xl p-4 sm:p-6 border ${
              isEvaluation 
                ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200' 
                : 'bg-gradient-to-r from-pink-50 to-rose-50 border-pink-200'
            }`}>
              <p className="text-base sm:text-xl text-slate-700 leading-relaxed">
                {commentPart}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
