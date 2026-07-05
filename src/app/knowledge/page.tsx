/**
 * 知识库 - 系统核心资料库
 * 
 * 功能：
 * 1. 小说设定（世界观/角色/势力）
 * 2. 写作技巧/模板
 * 3. 番茄小说规则
 * 4. 伏笔管理（Truth Files）
 * 5. AI写作去AI味指南
 */

'use client';

import { useState } from 'react';
import { 
  Library,
  Globe,
  Users,
  BookOpen,
  FileText,
  Search,
  Plus,
  Trash2,
  Edit3,
  Tag,
  Clock,
  ChevronRight,
  Filter,
  Download,
  Upload,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ==================== 类型定义 ====================

interface KnowledgeItem {
  id: string;
  title: string;
  category: KnowledgeCategory;
  content: string;
  tags: string[];
  createdAt: number;
  updatedAt: number;
}

type KnowledgeCategory = 
  | 'world-setting'   // 世界观设定
  | 'character'       // 角色档案
  | 'faction'         // 势力组织
  | 'writing-rule'    // 写作规则（番茄规则等）
  | 'template'        // 写作模板
  | 'foreshadowing'   // 伏笔记录
  | 'anti-ai';        // 去AI味指南

// ==================== 模拟数据 ====================

const MOCK_KNOWLEDGE: KnowledgeItem[] = [
  // 世界观设定
  {
    id: 'kw-1',
    title: '北境世界概览',
    category: 'world-setting',
    content: `# 北境世界

**地理环境：**
- 北境城：位于大陆最北方，终年寒冷
- 血影宗总部：位于黑风山脉深处
- 城主府：北境城的权力中心

**势力格局：**
- 北境城：由城主韩靖统治
- 血影宗：暗黑势力，修炼血术
- 正道联盟：对抗血影宗的联合力量

**灵力体系：**
- 灵力等级：1-9阶
- 特殊功法：血影宗的血术、正道的剑诀`,
    tags: ['世界观', '地理', '势力'],
    createdAt: Date.now() - 86400000,
    updatedAt: Date.now() - 3600000,
  },
  
  // 角色档案
  {
    id: 'kw-2',
    title: '林夜·角色档案',
    category: 'character',
    content: `# 林夜

**基本信息：**
- 年龄：22岁
- 身份：北境城的守护者
- 性格：沉稳、有责任感

**能力特点：**
- 攻击力：85
- 防御力：60
- 灵力：70

**成长轨迹：**
1. 初入北境城 → 2. 发现血影宗阴谋 → 3. 成为守护者 → 4. 对抗墨煞长老

**重要关系：**
- 苏清歌：盟友/暧昧关系
- 铁塔：并肩作战的战友
- 韩靖：尚未正式会面的城主`,
    tags: ['主角', '角色', '档案'],
    createdAt: Date.now() - 86400000 * 2,
    updatedAt: Date.now() - 7200000,
  },
  
  // 写作规则
  {
    id: 'kw-3',
    title: '番茄小说平台规则',
    category: 'writing-rule',
    content: `# 番茄小说平台规则（核心）

## ✅ 必须遵守

### 1. 主角出场规则
- **300字内必须出现主角**
- 让读者快速代入主角视角
- 避免"先写环境，后写人"

### 2. 钩子规则（1000字内）
- 必须制造冲突或悬念
- 可用关键词：突然、没想到、竟、原来
- 目的：让读者继续阅读

### 3. 字数建议
- 单章：4000-5000字最佳
- 过短：<3000字（读者不满）
- 过长：>6000字（建议拆分）

## ❌ 禁止事项
- 涉政内容
- 违法违规描写
- 低俗擦边内容`,
    tags: ['番茄', '平台规则', '写作'],
    createdAt: Date.now() - 86400000 * 3,
    updatedAt: Date.now() - 86400000,
  },
  
  // 伏笔记录
  {
    id: 'kw-4',
    title: '伏笔追踪表',
    category: 'foreshadowing',
    content: `# 伏笔追踪（Truth Files）

## 待解决伏笔

| 伏笔ID | 描述 | 设置章节 | 关键词 | 状态 |
|--------|------|----------|--------|------|
| FH-001 | 林夜的身世之谜 | 第5章 | "孤儿"、"神秘玉佩" | ⏳ 未解决 |
| FH-002 | 苏清歌的真实身份 | 第8章 | "隐藏实力" | ⏳ 未解决 |
| FH-003 | 血影宗的最终目的 | 第10章 | "大计划" | ⏳ 未解决 |

## 已解决伏笔

| 伏笔ID | 描述 | 设置章节 | 解决章节 |
|--------|------|----------|----------|
| FH-000 | 城门的异常关闭 | 第1章 | 第3章 |

## 新增伏笔
- **第12章**：墨煞提到"那个人"（可能是幕后黑手）`,
    tags: ['伏笔', '剧情', '追踪'],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  
  // 去AI味指南
  {
    id: 'kw-5',
    title: 'AI写作去AI味完整指南',
    category: 'anti-ai',
    content: `# 去AI味写作指南

## 🚫 禁止使用的套路词

### 连接词滥用
- ❌ 然而、事实上、毫无疑问、显而易见
- ❌ 总而言之、换言之、由此可见
- ❌ 尽管如此、与此同时、无独有偶

### 空洞表达
- ❌ 一种说不清道不明的感觉
- ❌ 心中涌起一股莫名的情绪
- ❌ 眼神中闪过一丝复杂的神色
- ❌ 空气中弥漫着一种诡异的安静
- ❌ 时间仿佛在这一刻静止了

### 排比句式
- ❌ 他...，他...，他...（连续3个以上）
- ❌ 她...，她...，她...

### AI典型句式
- ❌ 不得不承认...
- ❌ 从某种程度上来说...
- ❌ 在某种意义上...
- ❌ 可以说...
- ❌ 值得一提的是...

## ✅ 替代方案

### 直接叙述
- ✅ 直接描述动作和心理
- ✅ 用具体细节替代泛泛而谈
- ✅ 打破句式重复，增加变化

### 示例对比
**AI版：**
> 他不得不承认，从某种程度上来说，心中涌起一股莫名的情绪。

**人话版：**
> 他握紧了拳头。这感觉不对劲。

## 🎯 核心原则
1. **少用连接词**，直接说
2. **具体化**，不要泛泛而谈
3. **打破模式**，避免排比
4. **口语化**，像真人在说话`,
    tags: ['AI味', '写作', '去AI化', '指南'],
    createdAt: Date.now() - 86400000 * 5,
    updatedAt: Date.now() - 86400000 * 2,
  },
];

// ==================== 分类配置 ====================

const CATEGORY_CONFIG = {
  'world-setting': { label: '世界观设定', icon: Globe, color: 'purple' },
  'character': { label: '角色档案', icon: Users, color: 'blue' },
  'faction': { label: '势力组织', icon: BookOpen, color: 'green' },
  'writing-rule': { label: '写作规则', icon: FileText, color: 'orange' },
  'template': { label: '写作模板', icon: BookOpen, color: 'pink' },
  'foreshadowing': { label: '伏笔记录', icon: Tag, color: 'red' },
  'anti-ai': { label: '去AI味指南', icon: FileText, color: 'cyan' },
};

// ==================== 主组件 ====================

export default function KnowledgePage() {
  const [activeTab, setActiveTab] = useState<KnowledgeCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<KnowledgeItem | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');

  // 过滤知识项
  const filteredKnowledge = MOCK_KNOWLEDGE.filter(item => {
    const matchCategory = activeTab === 'all' || item.category === activeTab;
    const matchSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCategory && matchSearch;
  });

  return (
    <div className="flex flex-col h-full bg-gray-950 text-gray-100">
      {/* 顶部工具栏 */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Library className="w-7 h-7 text-purple-400" />
            知识库
          </h1>
          <button className="btn-primary flex items-center gap-2">
            <Plus size={18} />
            新建条目
          </button>
        </div>
        
        {/* 搜索框 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="搜索知识库..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>
      </div>

      {/* 内容区域 */}
      <div className="flex-1 overflow-hidden flex">
        {/* 左侧：分类 + 列表 */}
        <div className={cn(
          "border-r border-gray-800 flex flex-col",
          viewMode === 'detail' ? "w-96" : "flex-1"
        )}>
          {/* 分类标签 */}
          <div className="p-4 border-b border-gray-800">
            <div className="flex items-center gap-2 mb-3">
              <Filter size={16} className="text-gray-500" />
              <span className="text-sm text-gray-400">分类筛选</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <CategoryButton
                label="全部"
                active={activeTab === 'all'}
                onClick={() => setActiveTab('all')}
              />
              {(Object.entries(CATEGORY_CONFIG) as [KnowledgeCategory, typeof CATEGORY_CONFIG[keyof typeof CATEGORY_CONFIG]][]).map(([key, config]) => (
                <CategoryButton
                  key={key}
                  label={config.label}
                  active={activeTab === key}
                  onClick={() => setActiveTab(key as KnowledgeCategory)}
                  color={config.color}
                  icon={config.icon}
                />
              ))}
            </div>
          </div>

          {/* 知识列表 */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {filteredKnowledge.length > 0 ? (
              filteredKnowledge.map(item => (
                <KnowledgeCard
                  key={item.id}
                  item={item}
                  isSelected={selectedItem?.id === item.id}
                  onClick={() => {
                    setSelectedItem(item);
                    setViewMode('detail');
                  }}
                />
              ))
            ) : (
              <EmptyState searchQuery={searchQuery} />
            )}
            
            {/* 统计信息 */}
            <div className="pt-4 text-sm text-gray-600 text-center">
              共 {filteredKnowledge.length} 条知识
            </div>
          </div>
        </div>

        {/* 右侧：详情面板 */}
        {viewMode === 'detail' && selectedItem && (
          <div className="flex-1 overflow-y-auto p-6">
            <KnowledgeDetail 
              item={selectedItem} 
              onBack={() => setViewMode('list')} 
            />
          </div>
        )}
      </div>
    </div>
  );
}

// ==================== 子组件 ====================

/** 分类按钮 */
function CategoryButton({ 
  label, 
  active, 
  onClick, 
  color,
  icon: Icon,
}: { 
  label: string; 
  active: boolean; 
  onClick: () => void; 
  color?: string;
  icon?: any;
}) {
  const colorClasses = {
    purple: active ? 'bg-purple-500/20 text-purple-400 border-purple-500/50' : 'bg-gray-800 text-gray-400 border-gray-700 hover:border-purple-500/30',
    blue: active ? 'bg-blue-500/20 text-blue-400 border-blue-500/50' : 'bg-gray-800 text-gray-400 border-gray-700 hover:border-blue-500/30',
    green: active ? 'bg-green-500/20 text-green-400 border-green-500/50' : 'bg-gray-800 text-gray-400 border-gray-700 hover:border-green-500/30',
    orange: active ? 'bg-orange-500/20 text-orange-400 border-orange-500/50' : 'bg-gray-800 text-gray-400 border-gray-700 hover:border-orange-500/30',
    pink: active ? 'bg-pink-500/20 text-pink-400 border-pink-500/50' : 'bg-gray-800 text-gray-400 border-gray-700 hover:border-pink-500/30',
    red: active ? 'bg-red-500/20 text-red-400 border-red-500/50' : 'bg-gray-800 text-gray-400 border-gray-700 hover:border-red-500/30',
    cyan: active ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50' : 'bg-gray-800 text-gray-400 border-gray-700 hover:border-cyan-500/30',
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-1.5 rounded-lg border text-xs font-medium transition-all flex items-center gap-1.5",
        active ? (colorClasses[color as keyof typeof colorClasses] || colorClasses.purple) : 'bg-gray-800 text-gray-400 border-gray-700 hover:border-cyan-500/30'
      )}
    >
      {Icon && <Icon size={14} />}
      {label}
    </button>
  );
}

/** 知识卡片 */
function KnowledgeCard({
  item,
  isSelected,
  onClick,
}: {
  item: KnowledgeItem;
  isSelected: boolean;
  onClick: () => void;
}) {
  const config = CATEGORY_CONFIG[item.category];
  const Icon = config.icon;

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left p-4 rounded-lg border transition-all group",
        isSelected
          ? "bg-cyan-500/10 border-cyan-500/50"
          : "bg-gray-900 border-gray-800 hover:border-gray-700 hover:bg-gray-800/50"
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
          `bg-${config.color}-500/10`
        )}>
          <Icon size={20} className={`text-${config.color}-400`} style={{
            color: config.color === 'purple' ? '#a78bfa' :
                   config.color === 'blue' ? '#60a5fa' :
                   config.color === 'green' ? '#34d399' :
                   config.color === 'orange' ? '#fbbf24' :
                   config.color === 'pink' ? '#f472b6' :
                   config.color === 'red' ? '#f87171' :
                   '#22d3ee'
          }}/>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-medium text-white truncate">{item.title}</h3>
            <ChevronRight size={16} className="text-gray-600 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
            {item.content.substring(0, 80)}...
          </p>
          
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-400">
              {config.label}
            </span>
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <Clock size={12} />
              {new Date(item.updatedAt).toLocaleDateString('zh-CN')}
            </div>
          </div>
          
          {/* 标签 */}
          <div className="flex flex-wrap gap-1 mt-2">
            {item.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-xs px-1.5 py-0.5 rounded bg-gray-800/50 text-gray-500">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}

/** 详情面板 */
function KnowledgeDetail({ item, onBack }: { item: KnowledgeItem; onBack: () => void }) {
  const config = CATEGORY_CONFIG[item.category];
  const Icon = config.icon;

  return (
    <div className="space-y-6">
      {/* 头部 */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Icon size={24} className={`text-${config.color}-400`} style={{
              color: config.color === 'purple' ? '#a78bfa' :
                     config.color === 'blue' ? '#60a5fa' :
                     config.color === 'green' ? '#34d399' :
                     config.color === 'orange' ? '#fbbf24' :
                     config.color === 'pink' ? '#f472b6' :
                     config.color === 'red' ? '#f87171' :
                     '#22d3ee'
            }}/>
            <h2 className="text-2xl font-bold text-white">{item.title}</h2>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span className="px-2 py-1 rounded-md bg-gray-800 text-gray-400">
              {config.label}
            </span>
            <span>创建于 {new Date(item.createdAt).toLocaleString('zh-CN')}</span>
            <span>更新于 {new Date(item.updatedAt).toLocaleString('zh-CN')}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors">
            <Edit3 size={18} />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-800 text-red-400 hover:text-red-300 transition-colors">
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* 标签 */}
      <div className="flex flex-wrap gap-2">
        {item.tags.map(tag => (
          <span key={tag} className="px-3 py-1 rounded-full bg-gray-800 text-gray-300 text-sm flex items-center gap-1">
            <Tag size={14} className="text-cyan-400" />
            {tag}
          </span>
        ))}
      </div>

      {/* 内容 */}
      <div className="glass-panel p-6">
        <div className="prose prose-invert max-w-none">
          <pre className="whitespace-pre-wrap font-sans text-gray-200 leading-relaxed text-base">
            {item.content}
          </pre>
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="flex items-center gap-3 pt-4 border-t border-gray-800">
        <button className="btn-secondary flex items-center gap-2">
          <Download size={16} />
          导出
        </button>
        <button className="btn-secondary flex items-center gap-2">
          <Upload size={16} />
          导入
        </button>
        <button className="btn-secondary flex items-center gap-2 ml-auto">
          <Edit3 size={16} />
          编辑
        </button>
      </div>
    </div>
  );
}

/** 空状态 */
function EmptyState({ searchQuery }: { searchQuery: string }) {
  return (
    <div className="py-12 text-center">
      <Library size={48} className="mx-auto text-gray-700 mb-4" />
      <h3 className="text-lg font-medium text-gray-400 mb-2">
        未找到相关内容
      </h3>
      <p className="text-gray-500 text-sm">
        {searchQuery ? `未找到与"${searchQuery}"相关的知识` : '该分类暂无知识条目'}
      </p>
    </div>
  );
}
