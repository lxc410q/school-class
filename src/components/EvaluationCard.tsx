import { Calendar, Eye, Sparkles, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Evaluation } from '../types';
import { formatDate } from '../utils/evaluationGenerator';

interface EvaluationCardProps {
  evaluation: Evaluation;
}

export const EvaluationCard = ({ evaluation }: EvaluationCardProps) => {
  const datePart = evaluation.comment.split('：')[0];
  const commentPart = evaluation.comment.split('：')[1] || evaluation.comment;
  const isEvaluation = evaluation.type === 'evaluation';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-300 group">
      <div className="relative aspect-video bg-slate-100 overflow-hidden">
        <img
          src={evaluation.imageUrl}
          alt="评价图片"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* 类型标签 */}
        <div className={`absolute top-2 left-2 px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1 shadow-sm ${
          isEvaluation 
            ? 'bg-blue-600 text-white' 
            : 'bg-pink-600 text-white'
        }`}>
          {isEvaluation ? (
            <Sparkles className="w-3 h-3" />
          ) : (
            <Heart className="w-3 h-3" />
          )}
          {isEvaluation ? '构图分析' : '励志语录'}
        </div>
        <Link
          to={`/detail/${evaluation.id}`}
          className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100"
        >
          <div className="bg-white/90 backdrop-blur px-3 sm:px-4 py-1.5 sm:py-2 rounded-full flex items-center gap-1.5 sm:gap-2">
            <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-700" />
            <span className="text-xs sm:text-sm font-medium text-slate-700">查看详情</span>
          </div>
        </Link>
      </div>
      <div className="p-3 sm:p-4">
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-slate-500 mb-1.5 sm:mb-2">
          <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>{formatDate(datePart)}</span>
        </div>
        <p className="text-sm sm:text-base text-slate-700 line-clamp-2">{commentPart}</p>
      </div>
    </div>
  );
};
