const Validator = {
    isValidUrl(url) {
        try {
            const parsed = new URL(url);
            return parsed.protocol === 'https:' || parsed.protocol === 'http:';
        } catch {
            return false;
        }
    },
    
    isPythonVersion(version) {
        return /^3\.(1[0-2]|[0-9])\.\d+$/.test(version);
    },
    
    sanitizeInput(input) {
        return input.replace(/[<>"'&]/g, (char) => {
            const map = { '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '&': '&amp;' };
            return map[char];
        });
    },
    
    validatePackageName(pkg) {
        return /^[a-zA-Z0-9\-_\.]+==\d+\.\d+\.\d+$/.test(pkg);
    },
    
    hashString(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 5) - hash) + str.charCodeAt(i);
            hash |= 0;
        }
        return Math.abs(hash).toString(16);
    }
};

window.Validator = Validator;