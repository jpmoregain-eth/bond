'use client';

import { useState } from 'react';

const translations = {
  en: {
    title: 'Bond Setup Wizard',
    subtitle: 'Configure your Crypto Agent in 5 minutes',
    subtitleReconfigure: 'Add new exchanges and APIs to your existing setup',
    newSetup: 'New Setup',
    reconfigure: 'Reconfigure',
    welcome: 'Welcome to Bond',
    welcomeBack: 'Welcome back, {name}! 👋',
    welcomeDesc: 'This wizard will guide you through setting up the Crypto Agent in just a few minutes.',
    youllNeed: "You'll need:",
    apiKey: 'API key from Claude (Anthropic)',
    binanceOptional: 'Binance API credentials (optional)',
    telegramToken: 'Telegram bot token',
    whatIsYourName: "What's your name?",
    namePlaceholder: 'e.g., Derek',
    whatIsAgentName: "What should we call your agent?",
    agentNamePlaceholder: 'e.g., Sentinel, Oracle, Ghost',
    chooseModel: 'Choose Your Model',
    claudeSonnet: 'Claude 3.5 Sonnet',
    recommended: '⭐ Recommended',
    cost: 'Cost: $3 per 1M tokens',
    speed: 'Speed: 3-5 seconds',
    toolSupport: 'Tool Support: ✓ Full',
    reasoning: 'Reasoning: ✓ Excellent',
    getApiKey: 'Get API Key',
    gpt4o: 'GPT-4o',
    alternative: 'Alternative',
    costGpt: 'Cost: $5 per 1M tokens',
    speedGpt: 'Speed: 2-4 seconds',
    configureExchanges: 'Configure Exchanges',
    binance: 'Binance',
    apiKeyLabel: 'API Key',
    apiSecretLabel: 'API Secret',
    validate: 'Validate',
    getKeys: 'Get Keys',
    credentialsValid: 'Credentials valid!',
    raydium: 'Raydium (Solana)',
    autoEnabled: 'Auto-enabled',
    noAuthRequired: 'No authentication required - public RPC',
    connectTelegram: 'Connect Telegram',
    createBot: '1. Create a Telegram Bot',
    openBotFather: 'Open @BotFather',
    pasteBotToken: '2. Paste Your Bot Token',
    enterTelegramToken: 'Enter your Telegram bot token',
    connected: 'Connected!',
    agentListening: 'Your agent is listening on Telegram',
    youreAllSet: "You're All Set!",
    agentReady: 'Your Bond Crypto Agent is ready to find opportunities',
    whatsNext: "What's next:",
    agentRunning: 'Agent is running on port 8080',
    chatBot: 'Chat with your bot on Telegram (@YourBondBot)',
    tryCommands: 'Try: "Find opportunities" or "Analyze BTC"',
    launchAgent: 'Launch Agent',
    viewDocs: 'View Docs',
    back: 'Back',
    next: 'Next',
    currentConfig: 'Current Configuration:',
    model: 'Model',
    exchanges: 'Exchanges',
    telegram: 'Telegram',
    whatWouldYouLikeToDo: 'What would you like to do?',
    addExchange: 'Add another exchange',
    addExchangeDesc: 'Connect Kraken, Bybit, or other CEX/DEX',
    addModel: 'Add backup model',
    addModelDesc: 'Set GPT-4o as fallback if Claude unavailable',
    addMonitoring: 'Add monitoring tools',
    addMonitoringDesc: 'Enable alerts for specific tokens or pairs',
    viewStats: 'View agent statistics',
    viewStatsDesc: 'Check memory, patterns found, uptime',
    configUpdated: 'Configuration Updated!',
    restartMessage: 'Your agent will restart in 30 seconds with the new settings',
    preserved: "What's been preserved:",
    conversations: 'All conversations (156 saved)',
    patterns: 'Market patterns (4 detected)',
    preferences: 'User preferences',
    history: 'Opportunity history',
    gotIt: 'Got It!',
  },
  zh: {
    title: 'Bond 设置向导',
    subtitle: '在 5 分钟内配置您的加密代理',
    subtitleReconfigure: '向现有设置添加新交易所和 API',
    newSetup: '新设置',
    reconfigure: '重新配置',
    welcome: '欢迎使用 Bond',
    welcomeBack: '欢迎回来，{name}! 👋',
    welcomeDesc: '此向导将在几分钟内引导您设置加密代理。',
    youllNeed: '您需要:',
    apiKey: 'Claude (Anthropic) 的 API 密钥',
    binanceOptional: 'Binance API 凭证 (可选)',
    telegramToken: 'Telegram 机器人令牌',
    whatIsYourName: '你叫什么名字?',
    namePlaceholder: '例如: Derek',
    whatIsAgentName: '我们应该如何称呼您的代理?',
    agentNamePlaceholder: '例如: Sentinel, Oracle, Ghost',
    chooseModel: '选择您的模型',
    claudeSonnet: 'Claude 3.5 Sonnet',
    recommended: '⭐ 推荐',
    cost: '成本: $3 每百万个令牌',
    speed: '速度: 3-5 秒',
    toolSupport: '工具支持: ✓ 完整',
    reasoning: '推理: ✓ 优秀',
    getApiKey: '获取 API 密钥',
    gpt4o: 'GPT-4o',
    alternative: '替代',
    costGpt: '成本: $5 每百万个令牌',
    speedGpt: '速度: 2-4 秒',
    configureExchanges: '配置交易所',
    binance: 'Binance',
    apiKeyLabel: 'API 密钥',
    apiSecretLabel: 'API 秘密',
    validate: '验证',
    getKeys: '获取密钥',
    credentialsValid: '凭证有效!',
    raydium: 'Raydium (Solana)',
    autoEnabled: '自动启用',
    noAuthRequired: '无需身份验证 - 公共 RPC',
    connectTelegram: '连接 Telegram',
    createBot: '1. 创建 Telegram 机器人',
    openBotFather: '打开 @BotFather',
    pasteBotToken: '2. 粘贴您的机器人令牌',
    enterTelegramToken: '输入您的 Telegram 机器人令牌',
    connected: '已连接!',
    agentListening: '您的代理正在监听 Telegram',
    youreAllSet: '全部设置完毕!',
    agentReady: '您的 Bond 加密代理已准备好发现机会',
    whatsNext: '下一步:',
    agentRunning: '代理在端口 8080 上运行',
    chatBot: '在 Telegram 上与您的机器人聊天 (@YourBondBot)',
    tryCommands: '尝试: "查找机会" 或 "分析 BTC"',
    launchAgent: '启动代理',
    viewDocs: '查看文档',
    back: '返回',
    next: '下一步',
    currentConfig: '当前配置:',
    model: '模型',
    exchanges: '交易所',
    telegram: 'Telegram',
    whatWouldYouLikeToDo: '你想做什么?',
    addExchange: '添加另一个交易所',
    addExchangeDesc: '连接 Kraken、Bybit 或其他 CEX/DEX',
    addModel: '添加备用模型',
    addModelDesc: '如果 Claude 不可用，将 GPT-4o 设置为备用',
    addMonitoring: '添加监控工具',
    addMonitoringDesc: '启用特定代币或交易对的警报',
    viewStats: '查看代理统计信息',
    viewStatsDesc: '检查内存、发现的模式、运行时间',
    configUpdated: '配置已更新!',
    restartMessage: '您的代理将在 30 秒内使用新设置重新启动',
    preserved: '保留内容:',
    conversations: '所有对话 (保存 156 条)',
    patterns: '市场模式 (检测到 4 个)',
    preferences: '用户偏好',
    history: '机会历史',
    gotIt: '明白了!',
  },
  ko: {
    title: 'Bond 설정 마법사',
    subtitle: '5분 내에 암호 에이전트 구성',
    subtitleReconfigure: '기존 설정에 새 거래소 및 API 추가',
    newSetup: '새 설정',
    reconfigure: '재구성',
    welcome: 'Bond에 오신 것을 환영합니다',
    welcomeBack: '돌아오신 것을 환영합니다, {name}! 👋',
    welcomeDesc: '이 마법사는 몇 분 안에 암호 에이전트를 설정하는 과정을 안내합니다.',
    youllNeed: '필요한 것:',
    apiKey: 'Claude (Anthropic)의 API 키',
    binanceOptional: 'Binance API 자격증명 (선택사항)',
    telegramToken: 'Telegram 봇 토큰',
    whatIsYourName: '당신의 이름이 무엇인가요?',
    namePlaceholder: '예: Derek',
    whatIsAgentName: '에이전트를 무엇이라고 부를까요?',
    agentNamePlaceholder: '예: Sentinel, Oracle, Ghost',
    chooseModel: '모델 선택',
    claudeSonnet: 'Claude 3.5 Sonnet',
    recommended: '⭐ 추천',
    cost: '비용: 100만 토큰당 $3',
    speed: '속도: 3-5초',
    toolSupport: '도구 지원: ✓ 전체',
    reasoning: '추론: ✓ 우수',
    getApiKey: 'API 키 받기',
    gpt4o: 'GPT-4o',
    alternative: '대안',
    costGpt: '비용: 100만 토큰당 $5',
    speedGpt: '속도: 2-4초',
    configureExchanges: '거래소 구성',
    binance: 'Binance',
    apiKeyLabel: 'API 키',
    apiSecretLabel: 'API 시크릿',
    validate: '검증',
    getKeys: '키 받기',
    credentialsValid: '자격증명이 유효합니다!',
    raydium: 'Raydium (Solana)',
    autoEnabled: '자동 활성화',
    noAuthRequired: '인증 불필요 - 공개 RPC',
    connectTelegram: 'Telegram 연결',
    createBot: '1. Telegram 봇 만들기',
    openBotFather: '@BotFather 열기',
    pasteBotToken: '2. 봇 토큰 붙여넣기',
    enterTelegramToken: 'Telegram 봇 토큰 입력',
    connected: '연결됨!',
    agentListening: '에이전트가 Telegram을 수신하고 있습니다',
    youreAllSet: '모두 설정되었습니다!',
    agentReady: '당신의 Bond 암호 에이전트가 기회를 찾을 준비가 되었습니다',
    whatsNext: '다음 단계:',
    agentRunning: '에이전트가 포트 8080에서 실행 중입니다',
    chatBot: 'Telegram에서 봇과 채팅 (@YourBondBot)',
    tryCommands: '시도: "기회 찾기" 또는 "BTC 분석"',
    launchAgent: '에이전트 실행',
    viewDocs: '문서 보기',
    back: '돌아가기',
    next: '다음',
    currentConfig: '현재 구성:',
    model: '모델',
    exchanges: '거래소',
    telegram: 'Telegram',
    whatWouldYouLikeToDo: '무엇을 하시겠습니까?',
    addExchange: '다른 거래소 추가',
    addExchangeDesc: 'Kraken, Bybit 또는 기타 CEX/DEX 연결',
    addModel: '백업 모델 추가',
    addModelDesc: 'Claude를 사용할 수 없는 경우 GPT-4o를 백업으로 설정',
    addMonitoring: '모니터링 도구 추가',
    addMonitoringDesc: '특정 토큰 또는 쌍에 대한 경고 활성화',
    viewStats: '에이전트 통계 보기',
    viewStatsDesc: '메모리, 감지된 패턴, 작동 시간 확인',
    configUpdated: '구성이 업데이트되었습니다!',
    restartMessage: '에이전트가 30초 내에 새 설정으로 다시 시작됩니다',
    preserved: '보존된 내용:',
    conversations: '모든 대화 (156개 저장)',
    patterns: '시장 패턴 (4개 감지)',
    preferences: '사용자 기본 설정',
    history: '기회 기록',
    gotIt: '알겠습니다!',
  },
  ja: {
    title: 'Bond セットアップウィザード',
    subtitle: '5 分以内に暗号エージェントを構成',
    subtitleReconfigure: '既存のセットアップに新しい交換所と API を追加',
    newSetup: '新規セットアップ',
    reconfigure: '再構成',
    welcome: 'Bond へようこそ',
    welcomeBack: 'おかえりなさい、{name}! 👋',
    welcomeDesc: 'このウィザードは、数分以内に暗号エージェントを設定するプロセスをガイドします。',
    youllNeed: '必要なもの:',
    apiKey: 'Claude (Anthropic) の API キー',
    binanceOptional: 'Binance API 認証情報 (オプション)',
    telegramToken: 'Telegram ボット トークン',
    whatIsYourName: 'お名前は?',
    namePlaceholder: '例: Derek',
    whatIsAgentName: 'エージェントを何と呼びますか?',
    agentNamePlaceholder: '例: Sentinel, Oracle, Ghost',
    chooseModel: 'モデルを選択',
    claudeSonnet: 'Claude 3.5 Sonnet',
    recommended: '⭐ 推奨',
    cost: 'コスト: 100 万トークンあたり $3',
    speed: '速度: 3-5 秒',
    toolSupport: 'ツール サポート: ✓ 完全',
    reasoning: '推論: ✓ 優秀',
    getApiKey: 'API キーを取得',
    gpt4o: 'GPT-4o',
    alternative: '代替',
    costGpt: 'コスト: 100 万トークンあたり $5',
    speedGpt: '速度: 2-4 秒',
    configureExchanges: '取引所を構成',
    binance: 'Binance',
    apiKeyLabel: 'API キー',
    apiSecretLabel: 'API シークレット',
    validate: '検証',
    getKeys: 'キーを取得',
    credentialsValid: '認証情報が有効です!',
    raydium: 'Raydium (Solana)',
    autoEnabled: '自動有効化',
    noAuthRequired: '認証不要 - パブリック RPC',
    connectTelegram: 'Telegram に接続',
    createBot: '1. Telegram ボットを作成',
    openBotFather: '@BotFather を開く',
    pasteBotToken: '2. ボット トークンを貼り付け',
    enterTelegramToken: 'Telegram ボット トークンを入力',
    connected: '接続済み!',
    agentListening: 'エージェントは Telegram をリッスンしています',
    youreAllSet: 'すべて設定完了です!',
    agentReady: 'Bond 暗号エージェントは機会を見つける準備ができています',
    whatsNext: '次のステップ:',
    agentRunning: 'エージェントがポート 8080 で実行中',
    chatBot: 'Telegram でボットとチャット (@YourBondBot)',
    tryCommands: '試す: 「機会を見つける」または「BTC を分析」',
    launchAgent: 'エージェントを起動',
    viewDocs: 'ドキュメントを表示',
    back: '戻る',
    next: '次へ',
    currentConfig: '現在の構成:',
    model: 'モデル',
    exchanges: '取引所',
    telegram: 'Telegram',
    whatWouldYouLikeToDo: '何をしたいですか?',
    addExchange: '別の取引所を追加',
    addExchangeDesc: 'Kraken、Bybit、または他の CEX/DEX を接続',
    addModel: 'バックアップ モデルを追加',
    addModelDesc: 'Claude が利用できない場合は GPT-4o をバックアップとして設定',
    addMonitoring: '監視ツールを追加',
    addMonitoringDesc: '特定のトークンまたはペアのアラートを有効化',
    viewStats: 'エージェント統計を表示',
    viewStatsDesc: 'メモリ、検出されたパターン、稼働時間を確認',
    configUpdated: '構成が更新されました!',
    restartMessage: 'エージェントは 30 秒以内に新しい設定で再起動します',
    preserved: '保持されたもの:',
    conversations: 'すべての会話 (156 件保存)',
    patterns: 'マーケット パターン (4 件検出)',
    preferences: 'ユーザー設定',
    history: '機会履歴',
    gotIt: 'わかりました!',
  },
  es: {
    title: 'Asistente de Configuración de Bond',
    subtitle: 'Configura tu Agente Crypto en 5 minutos',
    subtitleReconfigure: 'Agregue nuevos intercambios y APIs a su configuración existente',
    newSetup: 'Nueva Configuración',
    reconfigure: 'Reconfigurar',
    welcome: 'Bienvenido a Bond',
    welcomeBack: '¡Bienvenido, {name}! 👋',
    welcomeDesc: 'Este asistente te guiará a través de la configuración del Agente Crypto en solo unos minutos.',
    youllNeed: 'Necesitarás:',
    apiKey: 'Clave API de Claude (Anthropic)',
    binanceOptional: 'Credenciales API de Binance (opcional)',
    telegramToken: 'Token del bot de Telegram',
    whatIsYourName: '¿Cuál es tu nombre?',
    namePlaceholder: 'ej: Derek',
    whatIsAgentName: '¿Cómo deberíamos llamar a tu agente?',
    agentNamePlaceholder: 'ej: Sentinel, Oracle, Ghost',
    chooseModel: 'Elige tu Modelo',
    claudeSonnet: 'Claude 3.5 Sonnet',
    recommended: '⭐ Recomendado',
    cost: 'Costo: $3 por 1M tokens',
    speed: 'Velocidad: 3-5 segundos',
    toolSupport: 'Soporte de Herramientas: ✓ Completo',
    reasoning: 'Razonamiento: ✓ Excelente',
    getApiKey: 'Obtener Clave API',
    gpt4o: 'GPT-4o',
    alternative: 'Alternativa',
    costGpt: 'Costo: $5 por 1M tokens',
    speedGpt: 'Velocidad: 2-4 segundos',
    configureExchanges: 'Configurar Intercambios',
    binance: 'Binance',
    apiKeyLabel: 'Clave API',
    apiSecretLabel: 'Secreto API',
    validate: 'Validar',
    getKeys: 'Obtener Claves',
    credentialsValid: '¡Las credenciales son válidas!',
    raydium: 'Raydium (Solana)',
    autoEnabled: 'Habilitado Automáticamente',
    noAuthRequired: 'Sin autenticación requerida - RPC público',
    connectTelegram: 'Conectar Telegram',
    createBot: '1. Crear un Bot de Telegram',
    openBotFather: 'Abrir @BotFather',
    pasteBotToken: '2. Pega tu Token de Bot',
    enterTelegramToken: 'Ingresa tu token del bot de Telegram',
    connected: '¡Conectado!',
    agentListening: 'Tu agente está escuchando en Telegram',
    youreAllSet: '¡Estás listo!',
    agentReady: 'Tu Agente Crypto Bond está listo para encontrar oportunidades',
    whatsNext: 'Próximos pasos:',
    agentRunning: 'El agente se ejecuta en el puerto 8080',
    chatBot: 'Chatea con tu bot en Telegram (@YourBondBot)',
    tryCommands: 'Intenta: "Encontrar oportunidades" o "Analizar BTC"',
    launchAgent: 'Lanzar Agente',
    viewDocs: 'Ver Documentos',
    back: 'Atrás',
    next: 'Siguiente',
    currentConfig: 'Configuración Actual:',
    model: 'Modelo',
    exchanges: 'Intercambios',
    telegram: 'Telegram',
    whatWouldYouLikeToDo: '¿Qué te gustaría hacer?',
    addExchange: 'Agregar otro intercambio',
    addExchangeDesc: 'Conectar Kraken, Bybit u otros CEX/DEX',
    addModel: 'Agregar modelo de respaldo',
    addModelDesc: 'Establecer GPT-4o como respaldo si Claude no está disponible',
    addMonitoring: 'Agregar herramientas de monitoreo',
    addMonitoringDesc: 'Habilitar alertas para tokens o pares específicos',
    viewStats: 'Ver estadísticas del agente',
    viewStatsDesc: 'Verificar memoria, patrones encontrados, tiempo de actividad',
    configUpdated: '¡Configuración Actualizada!',
    restartMessage: 'Tu agente se reiniciará en 30 segundos con los nuevos ajustes',
    preserved: 'Lo que se ha conservado:',
    conversations: 'Todas las conversaciones (156 guardadas)',
    patterns: 'Patrones de mercado (4 detectados)',
    preferences: 'Preferencias del usuario',
    history: 'Historial de oportunidades',
    gotIt: '¡Entendido!',
  },
};

export default function SetupWizard() {
  const [language, setLanguage] = useState('en');
  const [mode, setMode] = useState(null);
  const [step, setStep] = useState(1);
  const [userName, setUserName] = useState('');
  const [agentName, setAgentName] = useState('');
  const [config, setConfig] = useState({
    model: 'claude',
    binanceKey: '',
    binanceSecret: '',
    telegramToken: '',
  });

  const [validated, setValidated] = useState({
    model: true,
    binance: false,
    telegram: false,
  });

  const t = translations[language];

  const setupSteps = [
    { number: 1, title: t.welcome, description: 'Name & Agent' },
    { number: 2, title: t.chooseModel, description: 'Model' },
    { number: 3, title: t.configureExchanges, description: 'Exchanges' },
    { number: 4, title: t.connectTelegram, description: 'Telegram' },
    { number: 5, title: t.youreAllSet, description: 'Complete' },
  ];

  const reconfigureSteps = [
    { number: 1, title: t.welcomeBack, description: 'Actions' },
    { number: 2, title: 'Select', description: 'Option' },
    { number: 3, title: 'Configure', description: 'Setup' },
    { number: 4, title: 'Merge', description: 'Complete' },
  ];

  const currentSteps = mode === 'setup' ? setupSteps : (mode === 'reconfigure' ? reconfigureSteps : []);

  const handleModeSelect = (newMode) => {
    setMode(newMode);
    setStep(1);
  };

  const handleNext = () => {
    const maxStep = mode === 'setup' ? 5 : 4;
    if (step < maxStep) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  // Language selection screen
  if (!mode) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{t.title}</h1>
              </div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold"
              >
                <option value="en">English</option>
                <option value="zh">中文</option>
                <option value="ko">한국어</option>
                <option value="ja">日本語</option>
                <option value="es">Español</option>
              </select>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="space-y-8">
            {/* Name Input */}
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <label className="block text-lg font-bold text-gray-900 mb-4">{t.whatIsYourName}</label>
              <input
                type="text"
                placeholder={t.namePlaceholder}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-lg"
              />
            </div>

            {/* Agent Name Input */}
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <label className="block text-lg font-bold text-gray-900 mb-4">{t.whatIsAgentName}</label>
              <input
                type="text"
                placeholder={t.agentNamePlaceholder}
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-lg"
              />
            </div>

            {/* Mode Selection */}
            <div className="bg-white rounded-xl border border-gray-200 p-8 space-y-4">
              <p className="text-lg font-bold text-gray-900">{t.whatWouldYouLikeToDo}</p>
              <button
                onClick={() => handleModeSelect('setup')}
                disabled={!userName || !agentName}
                className={`w-full px-6 py-4 rounded-lg font-semibold transition-colors text-lg ${
                  userName && agentName
                    ? 'bg-teal-600 text-white hover:bg-teal-700'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                {t.newSetup}
              </button>
              <button
                onClick={() => handleModeSelect('reconfigure')}
                disabled={!userName || !agentName}
                className={`w-full px-6 py-4 rounded-lg font-semibold transition-colors text-lg ${
                  userName && agentName
                    ? 'bg-teal-600 text-white hover:bg-teal-700'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                {t.reconfigure}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Setup/Reconfigure flow
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{t.title}</h1>
              <p className="text-gray-600 mt-2">
                {mode === 'setup' ? t.subtitle : t.subtitleReconfigure}
              </p>
              {userName && <p className="text-teal-600 font-semibold mt-2">{userName} • {agentName}</p>}
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold"
            >
              <option value="en">English</option>
              <option value="zh">中文</option>
              <option value="ko">한국어</option>
              <option value="ja">日本語</option>
              <option value="es">Español</option>
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center">
            {currentSteps.map((s, idx) => (
              <div key={s.number} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                    step >= s.number
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step > s.number ? '✓' : s.number}
                </div>
                {idx < currentSteps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition-colors ${
                      step > s.number ? 'bg-teal-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 min-h-96">
          {step === 1 && mode === 'setup' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.welcome}, {userName}!</h2>
                <p className="text-gray-600 mb-4">{t.welcomeDesc}</p>
                <p className="text-gray-600 mb-6">{t.youllNeed}</p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <span className="text-teal-600">✓</span>
                    <span className="text-gray-700">{t.apiKey}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-teal-600">✓</span>
                    <span className="text-gray-700">{t.binanceOptional}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-teal-600">✓</span>
                    <span className="text-gray-700">{t.telegramToken}</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {step === 1 && mode === 'reconfigure' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">{t.welcomeBack.replace('{name}', userName)}</h2>
              <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4">{t.currentConfig}</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">{t.model}</span>
                    <span className="font-semibold">Claude Sonnet ✓</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">{t.chooseModel}</h2>
              <div className="border-2 border-teal-600 rounded-lg p-6 bg-teal-50">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{t.claudeSonnet}</h3>
                    <p className="text-sm text-teal-700 font-semibold">{t.recommended}</p>
                  </div>
                  <input type="radio" name="model" value="claude" checked={config.model === 'claude'} onChange={(e) => setConfig({ ...config, model: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-700">
                  <div>{t.cost}</div>
                  <div>{t.speed}</div>
                  <div>{t.toolSupport}</div>
                  <div>{t.reasoning}</div>
                </div>
                <button onClick={() => window.open('https://console.anthropic.com', '_blank')} className="text-teal-600 hover:text-teal-700 font-semibold">
                  {t.getApiKey} 🔗
                </button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6 text-center">
              <div className="text-6xl">🎉</div>
              <h2 className="text-3xl font-bold text-gray-900">{t.youreAllSet}</h2>
              <p className="text-lg text-gray-600">{t.agentReady} ({agentName})</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className={`px-6 py-3 rounded-lg font-semibold ${step === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
          >
            {t.back}
          </button>
          <button
            onClick={handleNext}
            disabled={step === currentSteps.length}
            className={`px-6 py-3 rounded-lg font-semibold ${step === currentSteps.length ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-teal-600 text-white hover:bg-teal-700'}`}
          >
            {t.next} →
          </button>
        </div>
      </div>
    </div>
  );
}
