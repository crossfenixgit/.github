import threading
import time
import random

class WorkerPool:
    def __init__(self, size=3):
        self.size = size
        self.workers = []
        self.tasks = []
        self.running = False
    
    def start(self):
        self.running = True
        for i in range(self.size):
            t = threading.Thread(target=self._run)
            t.daemon = True
            t.start()
            self.workers.append(t)
    
    def _run(self):
        while self.running:
            if self.tasks:
                task = self.tasks.pop(0)
                time.sleep(random.uniform(0.01, 0.05))
            else:
                time.sleep(0.1)
    
    def submit(self, task):
        self.tasks.append(task)
    
    def stop(self):
        self.running = False

pool = WorkerPool()