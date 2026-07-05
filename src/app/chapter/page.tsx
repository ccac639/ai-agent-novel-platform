'use client';

import { useState } from 'react';
import { ChapterView } from '@/components/chapter/ChapterView';
import { MOCK_SNAPSHOT } from '@/lib/mockWorldState';

/**
 * Chapter Page - 章节生成主页面
 * 
 * 功能：
 * 1. 管理生成状态
 * 2. 调用 API 生成章节
 * 3. 展示生成的章节
 */
export default function ChapterPage() {
  const [chapterData, setChapterData] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [chapterNumber, setChapterNumber] = useState(1);

  /**
   * 生成章节
   */
  const handleGenerate = async () => {
    setIsGenerating(true);

    try {
      const response = await fetch('/api/generate-chapter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chapterNumber,
          worldState: MOCK_SNAPSHOT,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setChapterData(result.data);
        setChapterNumber(prev => prev + 1);
      } else {
        alert('生成失败：' + result.error);
      }
    } catch (error: any) {
      alert('生成失败：' + error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <ChapterView
      chapterData={chapterData}
      isGenerating={isGenerating}
      onGenerate={handleGenerate}
    />
  );
}
