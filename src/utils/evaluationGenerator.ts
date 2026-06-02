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

const quoteTemplates = [
  "每一道光线都在指引你前进的方向。",
  "色彩是生活最好的调味料，让每一天都绚烂多彩。",
  "此刻的定格，是未来最美的回忆。",
  "用心发现，平凡中藏着无限光芒。",
  "每一步都算数，每一刻都珍贵。",
  "阳光总在风雨后，美好就在眼前。",
  "梦想如星辰，虽遥远却照亮前路。",
  "简单的美好，最能温暖人心。",
  "今天的努力，是明天的底气。",
  "微笑面对，生活处处是风景。",
  "坚持你所热爱的，热爱你所坚持的。",
  "每一天都是新的开始，充满无限可能。"
];

export const generateEvaluation = (): string => {
  const today = new Date();
  const dateStr = today.toISOString().split('T')[0];
  const randomTemplate = evaluationTemplates[Math.floor(Math.random() * evaluationTemplates.length)];
  return `${dateStr}：${randomTemplate}`;
};

export const generateInspirationalQuote = (): string => {
  const today = new Date();
  const dateStr = today.toISOString().split('T')[0];
  const randomQuote = quoteTemplates[Math.floor(Math.random() * quoteTemplates.length)];
  return `${dateStr}：${randomQuote}`;
};

export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatFullDateTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};
