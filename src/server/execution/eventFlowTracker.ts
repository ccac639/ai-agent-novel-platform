/**
 * Event Flow Tracker - 事件流追踪器
 * 
 * 职责：记录事件从生成到渲染的完整链路
 */

export interface EventFlowStep {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'completed' | 'error';
  startTime?: number;
  endTime?: number;
  data?: any;
  error?: string;
}

export interface EventFlow {
  id: string;
  chapterId: string;
  chapterNumber: number;
  startTime: number;
  endTime?: number;
  steps: EventFlowStep[];
  status: 'running' | 'completed' | 'error';
}

export class EventFlowTracker {
  private flows: Map<string, EventFlow> = new Map();

  /**
   * 开始一个新的事件流
   */
  startEventFlow(chapterId: string, chapterNumber: number): EventFlow {
    const flow: EventFlow = {
      id: `flow-${Date.now()}`,
      chapterId,
      chapterNumber,
      startTime: Date.now(),
      steps: this.createInitialSteps(),
      status: 'running',
    };

    this.flows.set(flow.id, flow);
    return flow;
  }

  /**
   * 更新步骤状态
   */
  updateStep(flowId: string, stepId: string, update: Partial<EventFlowStep>): void {
    const flow = this.flows.get(flowId);
    if (!flow) return;

    const step = flow.steps.find(s => s.id === stepId);
    if (step) {
      Object.assign(step, update);
    }
  }

  /**
   * 完成事件流
   */
  completeFlow(flowId: string): void {
    const flow = this.flows.get(flowId);
    if (flow) {
      flow.status = 'completed';
      flow.endTime = Date.now();
    }
  }

  /**
   * 获取事件流
   */
  getFlow(flowId: string): EventFlow | undefined {
    return this.flows.get(flowId);
  }

  /**
   * 创建初始步骤
   */
  private createInitialSteps(): EventFlowStep[] {
    return [
      { id: 'generate-events', name: '生成剧情事件', status: 'pending' },
      { id: 'select-skills', name: '选择技能', status: 'pending' },
      { id: 'execute-skills', name: '执行技能', status: 'pending' },
      { id: 'update-world', name: '更新世界状态', status: 'pending' },
      { id: 'generate-text', name: '生成小说正文', status: 'pending' },
      { id: 'save-memory', name: '保存记忆', status: 'pending' },
    ];
  }
}
