import { Upload } from 'lucide-react';
import { useCallback, useRef } from 'react';

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
  isLoading?: boolean;
}

export const ImageUpload = ({ onImageUpload, isLoading = false }: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const processFiles = useCallback((files: File[]) => {
    const imageFile = files.find(file => file.type.startsWith('image/'));
    if (!imageFile) return;

    const reader = new FileReader();
    
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        onImageUpload(result);
      }
    };

    reader.onerror = (error) => {
      console.error('FileReader error:', error);
    };

    reader.readAsDataURL(imageFile);
  }, [onImageUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      processFiles(files);
    }
    // 重置 input，允许再次选择同一文件
    setTimeout(() => {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }, 0);
  }, [processFiles]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (isLoading) return;
    
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  }, [isLoading, processFiles]);

  const handleClick = useCallback(() => {
    if (isLoading) return;
    fileInputRef.current?.click();
  }, [isLoading]);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="上传图片"
      className="border-2 border-dashed border-slate-300 rounded-2xl p-6 sm:p-8 md:p-12 text-center transition-all duration-300 hover:border-blue-500 hover:bg-blue-50/50 active:bg-blue-100/50 cursor-pointer relative"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        className="absolute inset-0 opacity-0 cursor-pointer"
        disabled={isLoading}
      />
      <div className="flex flex-col items-center gap-3 sm:gap-4 pointer-events-none">
        <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-blue-100 flex items-center justify-center transition-transform duration-300 ${isLoading ? 'animate-pulse' : ''}`}>
          <Upload className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-600" />
        </div>
        <div className="space-y-1 sm:space-y-2">
          <p className="text-base sm:text-lg font-semibold text-slate-700">
            {isLoading ? '分析中...' : '点击或拖拽上传图片'}
          </p>
          <p className="text-xs sm:text-sm text-slate-500">支持 JPG、PNG、GIF 等格式</p>
        </div>
      </div>
    </div>
  );
};
