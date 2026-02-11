import time
from collections import defaultdict

class Metrics:
    def __init__(self):
        self.counters = defaultdict(int)
        self.timers = {}
    
    def inc(self, metric):
        self.counters[metric] += 1
    
    def start(self, metric):
        self.timers[metric] = time.time()
    
    def end(self, metric):
        if metric in self.timers:
            d = time.time() - self.timers[metric]
            del self.timers[metric]
            return d
        return None
    
    def dump(self):
        return {
            'counters': dict(self.counters),
            'timestamp': time.time()
        }

metrics = Metrics()