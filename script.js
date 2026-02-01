class GenderPredictor {
    constructor() {
        this.initializeElements();
        this.bindEvents();
        this.currentFile = null;
    }

    initializeElements() {
        this.uploadArea = document.getElementById('uploadArea');
        this.fileInput = document.getElementById('fileInput');
        this.previewSection = document.getElementById('previewSection');
        this.previewImage = document.getElementById('previewImage');
        this.changeImageBtn = document.getElementById('changeImageBtn');
        this.actionSection = document.getElementById('actionSection');
        this.analyzeBtn = document.getElementById('analyzeBtn');
        this.resultSection = document.getElementById('resultSection');
        this.errorSection = document.getElementById('errorSection');
        this.resetBtn = document.getElementById('resetBtn');
        this.retryBtn = document.getElementById('retryBtn');
        
        // Result elements
        this.maleProgress = document.getElementById('maleProgress');
        this.femaleProgress = document.getElementById('femaleProgress');
        this.malePercentage = document.getElementById('malePercentage');
        this.femalePercentage = document.getElementById('femalePercentage');
        this.finalPrediction = document.getElementById('finalPrediction');
        this.confidence = document.getElementById('confidence');
        this.errorMessage = document.getElementById('errorMessage');
    }

    bindEvents() {
        // Upload area events
        this.uploadArea.addEventListener('click', () => this.fileInput.click());
        this.uploadArea.addEventListener('dragover', this.handleDragOver.bind(this));
        this.uploadArea.addEventListener('drop', this.handleDrop.bind(this));
        this.uploadArea.addEventListener('dragleave', this.handleDragLeave.bind(this));
        
        // File input change
        this.fileInput.addEventListener('change', this.handleFileSelect.bind(this));
        
        // Button events
        this.changeImageBtn.addEventListener('click', () => this.fileInput.click());
        this.analyzeBtn.addEventListener('click', this.analyzeImage.bind(this));
        this.resetBtn.addEventListener('click', this.resetAnalysis.bind(this));
        this.retryBtn.addEventListener('click', this.analyzeImage.bind(this));
    }

    handleDragOver(e) {
        e.preventDefault();
        this.uploadArea.classList.add('drag-over');
    }

    handleDragLeave(e) {
        e.preventDefault();
        this.uploadArea.classList.remove('drag-over');
    }

    handleDrop(e) {
        e.preventDefault();
        this.uploadArea.classList.remove('drag-over');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            this.handleFile(files[0]);
        }
    }

    handleFileSelect(e) {
        const file = e.target.files[0];
        if (file) {
            this.handleFile(file);
        }
    }

    handleFile(file) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            this.showError('请选择有效的图片文件');
            return;
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            this.showError('图片文件大小不能超过10MB');
            return;
        }

        this.currentFile = file;
        this.previewImage.src = URL.createObjectURL(file);
        this.showPreview();
    }

    showPreview() {
        this.hideAllSections();
        this.previewSection.style.display = 'block';
        this.actionSection.style.display = 'block';
    }

    async analyzeImage() {
        if (!this.currentFile) {
            this.showError('请先选择图片');
            return;
        }

        this.setLoading(true);
        this.hideError();

        try {
            const formData = new FormData();
            formData.append('image', this.currentFile);

            const response = await fetch('/api/predict', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            this.displayResult(result);
        } catch (error) {
            console.error('Analysis error:', error);
            this.showError('分析失败，请检查网络连接或稍后重试');
        } finally {
            this.setLoading(false);
        }
    }

    displayResult(result) {
        const maleProb = Math.round(result.male_probability * 100);
        const femaleProb = Math.round(result.female_probability * 100);
        const prediction = result.prediction;
        const confidence = Math.round(result.confidence * 100);

        // Update progress bars
        this.maleProgress.style.width = `${maleProb}%`;
        this.femaleProgress.style.width = `${femaleProb}%`;
        
        // Update percentages
        this.malePercentage.textContent = `${maleProb}%`;
        this.femalePercentage.textContent = `${femaleProb}%`;
        
        // Update prediction
        this.finalPrediction.textContent = prediction === 'male' ? '男性' : '女性';
        this.confidence.textContent = `${confidence}%`;
        
        // Add animation
        setTimeout(() => {
            this.maleProgress.style.transition = 'width 1s ease-in-out';
            this.femaleProgress.style.transition = 'width 1s ease-in-out';
        }, 100);

        this.hideAllSections();
        this.previewSection.style.display = 'block';
        this.resultSection.style.display = 'block';
    }

    setLoading(isLoading) {
        const btnText = this.analyzeBtn.querySelector('.btn-text');
        const spinner = this.analyzeBtn.querySelector('.loading-spinner');
        
        if (isLoading) {
            btnText.style.display = 'none';
            spinner.style.display = 'inline-block';
            this.analyzeBtn.disabled = true;
        } else {
            btnText.style.display = 'inline';
            spinner.style.display = 'none';
            this.analyzeBtn.disabled = false;
        }
    }

    showError(message) {
        this.errorMessage.textContent = message;
        this.hideAllSections();
        this.errorSection.style.display = 'block';
        if (this.currentFile) {
            this.previewSection.style.display = 'block';
        }
    }

    hideError() {
        this.errorSection.style.display = 'none';
    }

    hideAllSections() {
        this.previewSection.style.display = 'none';
        this.actionSection.style.display = 'none';
        this.resultSection.style.display = 'none';
        this.errorSection.style.display = 'none';
    }

    resetAnalysis() {
        this.currentFile = null;
        this.fileInput.value = '';
        this.hideAllSections();
        
        // Reset progress bars
        this.maleProgress.style.width = '0%';
        this.femaleProgress.style.width = '0%';
        this.maleProgress.style.transition = 'none';
        this.femaleProgress.style.transition = 'none';
    }
}

// Initialize the application
function initializeApp() {
    new GenderPredictor();
}

// Wait for Cordova to be ready
if (window.cordova) {
    document.addEventListener('deviceready', initializeApp, false);
} else {
    document.addEventListener('DOMContentLoaded', initializeApp, false);
}

// Add some utility functions for demo purposes
function simulateAnalysis() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const maleProb = Math.random();
            const femaleProb = 1 - maleProb;
            const prediction = maleProb > femaleProb ? 'male' : 'female';
            const confidence = Math.max(maleProb, femaleProb);
            
            resolve({
                male_probability: maleProb,
                female_probability: femaleProb,
                prediction: prediction,
                confidence: confidence
            });
        }, 2000);
    });
}

// Mobile app mode - always use simulation
console.log('移动应用模式：使用本地模拟分析');
const originalAnalyzeImage = GenderPredictor.prototype.analyzeImage;
GenderPredictor.prototype.analyzeImage = async function() {
    if (!this.currentFile) {
        this.showError('请先选择图片');
        return;
    }

    this.setLoading(true);
    this.hideError();

    try {
        // 模拟分析延迟
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // 使用模拟结果
        const result = await simulateAnalysis();
        this.displayResult(result);
        
    } catch (error) {
        console.error('分析失败:', error);
        this.showError('分析失败，请重试');
    } finally {
        this.setLoading(false);
    }
};