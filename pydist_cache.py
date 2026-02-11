import time

class Cache:
    def __init__(self, ttl=300):
        self.ttl = ttl
        self.store = {}
    
    def set(self, key, value):
        self.store[key] = {
            'value': value,
            'expires': time.time() + self.ttl
        }
    
    def get(self, key):
        if key in self.store:
            if time.time() < self.store[key]['expires']:
                return self.store[key]['value']
            else:
                del self.store[key]
        return None
    
    def clear(self):
        self.store.clear()

cache = Cache()