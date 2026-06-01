import { Calendar, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Evaluation } from '../types';
import { formatDate } from '../utils/evaluationGenerator';

interface EvaluationCardProps {
  evaluation: Evaluation;
}

export const EvaluationCard = ({ evaluation }: EvaluationCardProps) => {
  const datePart = evaluation.comment.split('：')[0];
  const commentPart = evaluation.comment.split('：')[1] || evaluation.comment;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-300 group">
      <div className="relative aspect-video bg-slate-100 overflow-hidden">
        <img
          src={evaluation.imageUrl}
          alt="评价图片"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <Link
          to={`/detail/${evaluation.id}`}
          className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100"
        >
          <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-full flex items-center gap-2">
            <Eye className="w-4 h-4 text-slate-700" />
            <span className="text-sm font-medium text-slate-700">查看详情</span>
          </div>
        </Link>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(datePart)}</span>
        </div>
        <p className="text-slate-700 line-clamp-2">{commentPart}</p>
      </div>
    </div>
  );
};
