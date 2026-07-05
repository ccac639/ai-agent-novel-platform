'use client';

import { useState } from 'react';
import { ChapterView } from '@/components/chapter/ChapterView';
import { MOCK_SNAPSHOT } from '@/lib/mockWorldState';
import { AuditResult } from '@/server/audit/fanqieSkill';

type FlowStep = 'idle' | 'generating' | 'audit' | 'confirmed' | 'rejected';

/**
 * Chapter Page - 章节生成主页面（集成审计流程）
 * 
 * 新流程：
 * 1. 生成章节
 * 2. 🔥 审计章节（fanqie-novel-skill）
 * 3. 用户确认/修改/拒绝
 * 4. 更新世界状态和记忆
 */
export default function ChapterPage() {
  const [chapterData, setChapterData] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [chapterNumber, setChapterNumber] = useState(1);
  const [flowStep, setFlowStep] = useState<FlowStep>('idle');
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);

  /**
   * 生成章节
   */
  const handleGenerate = async () => {
    setIsGenerating(true);
    setFlowStep('generating');

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
        
        // 🔥 检查审计结果
        if (result.data.audit) {
          setAuditResult(result.data.audit);
          setFlowStep('audit'); // 进入审计步骤
        } else {
          // 无审计结果（兼容旧版本）
          setFlowStep('confirmed');
          setChapterNumber(prev => prev + 1);
        }
      } else {
        alert('生成失败：' + result.error);
        setFlowStep('idle');
      }
    } catch (error: any) {
      alert('生成失败：' + error.message);
      setFlowStep('idle');
    } finally {
      setIsGenerating(false);
    }
  };

  /**
   * 处理审计确认
   */
  const handleAuditConfirm = () => {
    setFlowStep('confirmed');
    setChapterNumber(prev => prev + 1);
    alert('✅ 审计通过！世界状态已更新');
  };

  /**
   * 处理请求修改
   */
  const handleRequestFix = (suggestions: string[]) => {
    setFlowStep('generating');
    alert(`🔄 根据 ${suggestions.length} 条建议重新生成...`);
    // 重新生成
    handleGenerate();
  };

  /**
   * 处理拒绝
   */
  const handleReject = () => {
    setFlowStep('rejected');
    setAuditResult(null);
    setChapterData(null);
    alert('❌ 已拒绝，可以重新生成');
  };

  return (
    <ChapterView
      chapterData={chapterData}
      isGenerating={isGenerating}
      onGenerate={handleGenerate}
      flowStep={flowStep}
      auditResult={auditResult}
      onAuditConfirm={handleAuditConfirm}
      onRequestFix={handleRequestFix}
      onReject={handleReject}
    />
  );
}
