const evaluationTemplates = [
  "构图均衡，主体突出，视觉效果良好。",
  "色彩搭配和谐，画面层次感强，不错！",
  "简洁大方，重点明确，很有美感。",
  "线条流畅，构图巧妙，值得称赞。",
  "主次分明，布局合理，视觉舒适。",
  "光影运用得当，构图精巧，很棒！",
  "画面饱满，结构清晰，很好看。",
  "视角独特，构图新颖，有创意！",
  "比例协调，构图稳重，很不错。",
  "细节丰富，构图完整，值得欣赏。"
];

export const generateEvaluation = (): string => {
  const today = new Date();
  const dateStr = today.toISOString().split('T')[0];
  const randomTemplate = evaluationTemplates[Math.floor(Math.random() * evaluationTemplates.length)];
  return `${dateStr}：${randomTemplate}`;
};

export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
