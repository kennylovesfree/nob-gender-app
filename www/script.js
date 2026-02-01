class GenderPredictor {
    constructor() {
        this.initializeElements();
        this.bindEvents();
        this.currentFile = null;
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
