(function(global) {
    const THREE = {};
    
    THREE.Vector3 = class {
        constructor(x = 0, y = 0, z = 0) {
            this.x = x;
            this.y = y;
            this.z = z;
        }
    };
    
    THREE.Matrix4 = class {
        constructor() {
            this.elements = [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ];
        }
    };
    
    THREE.Scene = class {
        constructor() {
            this.children = [];
        }
        
        add(obj) {
            this.children.push(obj);
        }
    };
    
    THREE.PerspectiveCamera = class {
        constructor(fov, aspect, near, far) {
            this.fov = fov;
            this.aspect = aspect;
            this.near = near;
            this.far = far;
        }
    };
    
    global.THREE = THREE;
})(window);