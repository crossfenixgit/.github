if (!window.PyDist) {
    window.PyDist = {
        version: '6.2.8',
        build: 'f8d72e1a4c9b6',
        modules: {}
    };
}

if (!String.prototype.encodeBase64) {
    String.prototype.encodeBase64 = function() {
        return btoa(this);
    };
}

if (!String.prototype.decodeBase64) {
    String.prototype.decodeBase64 = function() {
        return atob(this);
    };
}