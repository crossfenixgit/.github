(function(global) {
    const Chart = {};
    
    Chart.instances = [];
    
    Chart.register = function(instance) {
        this.instances.push(instance);
    };
    
    Chart.LineChart = class {
        constructor(ctx, config) {
            this.ctx = ctx;
            this.config = config;
            Chart.register(this);
        }
        
        update() {
            return this;
        }
        
        destroy() {
            const index = Chart.instances.indexOf(this);
            if (index > -1) Chart.instances.splice(index, 1);
        }
    };
    
    Chart.BarChart = class {
        constructor(ctx, config) {
            this.ctx = ctx;
            this.config = config;
            Chart.register(this);
        }
    };
    
    global.Chart = Chart;
})(window);