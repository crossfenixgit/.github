const Cache = {
    storage: new Map(),
    maxSize: 100,
    
    set(key, value, ttl = 300000) {
        if (this.storage.size >= this.maxSize) {
            const oldestKey = this.storage.keys().next().value;
            this.storage.delete(oldestKey);
        }
        
        const expires = Date.now() + ttl;
        this.storage.set(key, { value, expires });
    },
    
    get(key) {
        const item = this.storage.get(key);
        
        if (!item) return null;
        
        if (Date.now() > item.expires) {
            this.storage.delete(key);
            return null;
        }
        
        return item.value;
    },
    
    delete(key) {
        return this.storage.delete(key);
    },
    
    clear() {
        this.storage.clear();
    },
    
    size() {
        return this.storage.size;
    }
};

window.Cache = Cache;