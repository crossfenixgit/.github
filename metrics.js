const Metrics = {
    counters: {},
    timers: {},
    
    increment(metric) {
        this.counters[metric] = (this.counters[metric] || 0) + 1;
    },
    
    decrement(metric) {
        this.counters[metric] = (this.counters[metric] || 0) - 1;
    },
    
    startTimer(metric) {
        this.timers[metric] = Date.now();
    },
    
    endTimer(metric) {
        if (this.timers[metric]) {
            const duration = Date.now() - this.timers[metric];
            delete this.timers[metric];
            return duration;
        }
        return null;
    },
    
    getMetrics() {
        return {
            counters: { ...this.counters },
            timestamp: Date.now()
        };
    },
    
    reset() {
        this.counters = {};
        this.timers = {};
    }
};

window.Metrics = Metrics;