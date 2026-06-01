import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Sparkles } from 'lucide-react';
import { getEvaluationById } from '../utils/storage';
import { formatDate } from '../utils/evaluationGenerator';

export default function Detail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const evaluation = id ? getEvaluationById(id) : undefined;

  if (!evaluation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">评价不存在</h2>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  const datePart = evaluation.comment.split('：')[0];
  const commentPart = evaluation.comment.split('：')[1] || evaluation.comment;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-blue-600 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          返回
        </button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="aspect-video bg-slate-100">
            <img
              src={evaluation.imageUrl}
              alt="评价图片"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-blue-600" />
              <h1 className="text-2xl font-bold text-slate-800">评价详情</h1>
            </div>

            <div className="flex items-center gap-2 text-slate-500 mb-6">
              <Calendar className="w-5 h-5" />
              <span className="text-lg">{formatDate(datePart)}</span>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <p className="text-xl text-slate-700 leading-relaxed">
                {commentPart}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
