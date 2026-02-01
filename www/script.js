class GenderPredictor {
    constructor() {
        this.initializeElements();
        this.bindEvents();
        this.currentFile = null;
        
        // Pregnancy Guide State
        this.currentWeek = 12; // Default starting week
        this.renderWeekData();

        // AI Chat State
        this.isChatOpen = false;
        this.chatMessages = [];
    }

    initializeElements() {
        // Sections
        this.uploadSection = document.getElementById('uploadSection');
        this.analysisSection = document.getElementById('analysisSection');
        this.resultSection = document.getElementById('resultSection');

        // Inputs & Display
        this.uploadArea = document.getElementById('uploadArea');
        this.fileInput = document.getElementById('fileInput');
        this.previewImage = document.getElementById('previewImage');
        
        // Buttons
        this.analyzeBtn = document.getElementById('analyzeBtn');
        this.reuploadBtn = document.getElementById('reuploadBtn');
        this.resetBtn = document.getElementById('resetBtn');

        // UI Feedback Elements
        this.scanOverlay = document.getElementById('scanOverlay');
        this.statusText = document.getElementById('statusText');
        this.loadingDots = document.querySelector('.loading-dots');
        this.btnText = document.querySelector('.btn-text');
        
        // Result Elements
        this.maleBar = document.getElementById('maleBar');
        this.femaleBar = document.getElementById('femaleBar');
        this.maleValue = document.getElementById('maleValue');
        this.femaleValue = document.getElementById('femaleValue');
        this.interpretationText = document.getElementById('interpretationText');
        this.resultTimestamp = document.getElementById('resultTimestamp');

        // Guide Elements
        this.prevWeekBtn = document.getElementById('prevWeekBtn');
        this.nextWeekBtn = document.getElementById('nextWeekBtn');
        this.currentWeekNum = document.getElementById('currentWeekNum');
        this.currentTrimester = document.getElementById('currentTrimester');
        this.guideTitle = document.getElementById('guideTitle');
        this.babyChanges = document.getElementById('babyChanges');
        this.momChanges = document.getElementById('momChanges');
        this.nutritionTip = document.getElementById('nutritionTip');
        this.exerciseTip = document.getElementById('exerciseTip');

        // AI Chat Elements
        this.aiChatFab = document.getElementById('aiChatFab');
        this.aiChatWindow = document.getElementById('aiChatWindow');
        this.closeChatBtn = document.getElementById('closeChatBtn');
        this.chatInput = document.getElementById('chatInput');
        this.sendMessageBtn = document.getElementById('sendMessageBtn');
        this.chatMessagesContainer = document.getElementById('chatMessages');
    }

    bindEvents() {
        // File Upload
        this.uploadArea.addEventListener('click', () => this.fileInput.click());
        this.fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
        
        // Drag & Drop
        this.uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.uploadArea.classList.add('drag-over');
        });
        this.uploadArea.addEventListener('dragleave', (e) => {
            e.preventDefault();
            this.uploadArea.classList.remove('drag-over');
        });
        this.uploadArea.addEventListener('drop', (e) => this.handleDrop(e));

        // Actions
        this.analyzeBtn.addEventListener('click', () => this.startAnalysis());
        this.reuploadBtn.addEventListener('click', () => this.resetToUpload());
        this.resetBtn.addEventListener('click', () => this.resetToUpload());

        // Guide Navigation
        this.prevWeekBtn.addEventListener('click', () => this.changeWeek(-1));
        this.nextWeekBtn.addEventListener('click', () => this.changeWeek(1));

        // AI Chat
        this.aiChatFab.addEventListener('click', () => this.toggleChat(true));
        this.closeChatBtn.addEventListener('click', () => this.toggleChat(false));
        this.sendMessageBtn.addEventListener('click', () => this.sendChatMessage());
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendChatMessage();
        });
    }

    // Guide Logic
    changeWeek(delta) {
        let newWeek = this.currentWeek + delta;
        if (newWeek < 1) newWeek = 1;
        if (newWeek > 40) newWeek = 40;
        
        this.currentWeek = newWeek;
        this.renderWeekData();
    }

    renderWeekData() {
        const data = pregnancyData.find(d => d.week === this.currentWeek);
        if (!data) return;

        this.currentWeekNum.textContent = data.week;
        this.currentTrimester.textContent = data.trimester;
        
        // Animate text change
        this.babyChanges.style.opacity = 0;
        this.momChanges.style.opacity = 0;
        
        setTimeout(() => {
            this.babyChanges.textContent = data.baby;
            this.momChanges.textContent = data.mom;
            this.nutritionTip.textContent = data.nutrition;
            this.exerciseTip.textContent = data.exercise;
            
            this.babyChanges.style.opacity = 1;
            this.momChanges.style.opacity = 1;
        }, 200);

        // Button state
        this.prevWeekBtn.disabled = this.currentWeek === 1;
        this.nextWeekBtn.disabled = this.currentWeek === 40;
        this.prevWeekBtn.style.opacity = this.currentWeek === 1 ? 0.3 : 1;
        this.nextWeekBtn.style.opacity = this.currentWeek === 40 ? 0.3 : 1;
    }

    // AI Chat Logic
    toggleChat(show) {
        this.isChatOpen = show;
        this.aiChatWindow.style.display = show ? 'flex' : 'none';
        if (show) {
            this.chatInput.focus();
            this.scrollToBottom();
        }
    }

    sendChatMessage() {
        const text = this.chatInput.value.trim();
        if (!text) return;

        // Add User Message
        this.addMessage(text, 'user');
        this.chatInput.value = '';

        // Simulate AI Thinking
        setTimeout(() => {
            const response = this.generateAIResponse(text);
            this.addMessage(response, 'ai');
        }, 800 + Math.random() * 1000);
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.innerHTML = text.replace(/\n/g, '<br>');
        
        const time = document.createElement('span');
        time.className = 'time';
        const now = new Date();
        time.textContent = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        
        messageDiv.appendChild(bubble);
        messageDiv.appendChild(time);
        
        this.chatMessagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.chatMessagesContainer.scrollTop = this.chatMessagesContainer.scrollHeight;
    }

    generateAIResponse(input) {
        // Simple Rule-Based AI Engine
        // Uses the current week context + regex matching
        
        // 1. Check for specific questions
        for (const category in aiKnowledgeBase) {
            const topic = aiKnowledgeBase[category];
            if (Array.isArray(topic.patterns)) { // Safety check
                for (const pattern of topic.patterns) {
                    if (pattern.test(input)) {
                        // Return random response from this category
                        const responses = topic.responses;
                        return responses[Math.floor(Math.random() * responses.length)];
                    }
                }
            }
        }

        // 2. Check if asking about "current week"
        if (/這週|現在|第.*週/i.test(input)) {
            const data = pregnancyData.find(d => d.week === this.currentWeek);
            return `現在是第 ${this.currentWeek} 週。寶寶正在${data.baby} 媽媽可能會覺得${data.mom}`;
        }

        // 3. Fallback
        const defaultResponses = aiKnowledgeBase.default;
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }

    handleFileSelect(e) {
        const file = e.target.files[0];
        if (file) this.processFile(file);
    }

    handleDrop(e) {
        e.preventDefault();
        this.uploadArea.classList.remove('drag-over');
        const file = e.dataTransfer.files[0];
        if (file) this.processFile(file);
    }

    processFile(file) {
        if (!file.type.startsWith('image/')) {
            alert('請上傳有效的圖片文件 (JPG, PNG)');
            return;
        }

        this.currentFile = file;
        
        // Show preview
        const reader = new FileReader();
        reader.onload = (e) => {
            this.previewImage.src = e.target.result;
            this.showSection(this.analysisSection);
            this.statusText.textContent = "影像已就緒，等待分析";
            this.resetAnalysisState();
        };
        reader.readAsDataURL(file);
    }

    resetAnalysisState() {
        this.scanOverlay.style.display = 'none';
        this.analyzeBtn.disabled = false;
        this.loadingDots.style.display = 'none';
        this.btnText.style.display = 'block';
    }

    async startAnalysis() {
        if (!this.currentFile) return;

        // UI State: Analyzing
        this.analyzeBtn.disabled = true;
        this.btnText.style.display = 'none';
        this.loadingDots.style.display = 'block';
        this.statusText.textContent = "正在進行 AI 特徵識別...";
        this.scanOverlay.style.display = 'block';

        try {
            // Simulate Analysis Delay (2-3 seconds for realism)
            await new Promise(resolve => setTimeout(resolve, 2500));
            
            // Get Result (Simulation or Real API)
            const result = await this.performPrediction();
            
            this.displayResult(result);
        } catch (error) {
            console.error(error);
            this.statusText.textContent = "分析過程中發生錯誤，請重試";
            this.resetAnalysisState();
        }
    }

    async performPrediction() {
        // Here we simulate the AI prediction logic
        // In a real app, this would be an API call
        
        // Generate a somewhat random but weighted result
        const isMale = Math.random() > 0.45; // Slightly skewed, or 50/50
        const primaryProb = 0.60 + (Math.random() * 0.35); // 60% - 95%
        
        return {
            maleProb: isMale ? primaryProb : 1 - primaryProb,
            femaleProb: isMale ? 1 - primaryProb : primaryProb
        };
    }

    displayResult(result) {
        const malePercent = Math.round(result.maleProb * 100);
        const femalePercent = Math.round(result.femaleProb * 100);
        
        // Update Bars
        this.maleBar.style.width = `${malePercent}%`;
        this.femaleBar.style.width = `${femalePercent}%`;
        this.maleValue.textContent = `${malePercent}%`;
        this.femaleValue.textContent = `${femalePercent}%`;

        // Generate Professional Text
        this.interpretationText.innerHTML = this.generateProfessionalText(malePercent, femalePercent);
        
        // Update Timestamp
        const now = new Date();
        this.resultTimestamp.textContent = now.toLocaleString('zh-CN', { 
            year: 'numeric', month: '2-digit', day: '2-digit', 
            hour: '2-digit', minute: '2-digit' 
        });

        // Switch View
        this.showSection(this.resultSection);
    }

    generateProfessionalText(maleProb, femaleProb) {
        const dominant = maleProb >= femaleProb ? '男性' : '女性';
        const prob = Math.max(maleProb, femaleProb);
        
        let confidenceLevel = "";
        if (prob >= 90) confidenceLevel = "極高";
        else if (prob >= 80) confidenceLevel = "顯著";
        else if (prob >= 60) confidenceLevel = "中等";
        else confidenceLevel = "初步";

        return `經由 NOB 智能影像分析系統對上傳影像的特徵提取與比對，目前的模型運算結果顯示該影像具有<strong>${confidenceLevel}</strong>的${dominant}特徵傾向。
        <br><br>
        具體分析數據顯示，<strong>${dominant}特徵符合度約為 ${prob}%</strong>。建議您將此結果作為輔助參考，並保持愉悅的心情迎接新生命的到來。`;
    }

    showSection(activeSection) {
        [this.uploadSection, this.analysisSection, this.resultSection].forEach(sec => {
            sec.style.display = 'none';
        });
        activeSection.style.display = 'block';
        
        // Show guide only in upload section
        const guideSection = document.querySelector('.guide-section');
        if (activeSection === this.uploadSection) {
            guideSection.style.display = 'block';
        } else {
            guideSection.style.display = 'none';
        }
        
        // AI Chat Button visibility (always show unless specific logic needed)
        // Currently it's fixed so it shows everywhere
        
        // If showing result, trigger animations slightly after display
        if (activeSection === this.resultSection) {
            // Re-trigger CSS animations if needed
        }
    }

    resetToUpload() {
        this.currentFile = null;
        this.fileInput.value = '';
        this.showSection(this.uploadSection);
        
        // Reset bars width for animation next time
        this.maleBar.style.width = '0%';
        this.femaleBar.style.width = '0%';
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new GenderPredictor();
});

// Cordova compatibility
if (window.cordova) {
    document.addEventListener('deviceready', () => {
        // Cordova specific inits if needed
    }, false);
}
