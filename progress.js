const ProgressManager = {
    intervals: [],
    
    startIndeterminate(selector) {
        const el = document.querySelector(selector);
        if (!el) return;
        
        let width = 0;
        const interval = setInterval(() => {
            width = (width + 1) % 100;
            el.style.width = width + '%';
            el.style.background = `linear-gradient(90deg, 
                hsl(${width * 3.6}, 80%, 60%), 
                hsl(${width * 3.6 + 60}, 80%, 60%))`;
        }, 30);
        
        this.intervals.push(interval);
        return interval;
    },
    
    stopAll() {
        this.intervals.forEach(clearInterval);
        this.intervals = [];
    },
    
    createSmoothProgress(callback) {
        let progress = 0;
        const step = () => {
            if (progress < 90) {
                progress += (90 - progress) * 0.05;
                callback(progress);
                requestAnimationFrame(step);
            }
        };
        requestAnimationFrame(step);
        return () => progress;
    }
};

window.ProgressManager = ProgressManager;