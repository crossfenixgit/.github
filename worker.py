#!/usr/bin/env python3
import sys
import time
import random
import argparse
import threading
from queue import Queue

class BackgroundWorker:
    def __init__(self, worker_id=1):
        self.worker_id = worker_id
        self.running = False
        self.queue = Queue()
        self.results = []
        self.thread = None
    
    def start(self):
        self.running = True
        self.thread = threading.Thread(target=self._run)
        self.thread.daemon = True
        self.thread.start()
        print(f"Worker {self.worker_id} started")
    
    def _run(self):
        while self.running:
            if not self.queue.empty():
                task = self.queue.get()
                result = self.process_task(task)
                self.results.append(result)
            else:
                time.sleep(0.1)
    
    def process_task(self, task):
        time.sleep(random.uniform(0.01, 0.05))
        return f"processed_{task}"
    
    def submit(self, task):
        self.queue.put(task)
    
    def stop(self):
        self.running = False
        if self.thread:
            self.thread.join(timeout=1.0)

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--workers', type=int, default=2)
    parser.add_argument('--tasks', type=int, default=50)
    args = parser.parse_args()
    
    workers = [BackgroundWorker(i) for i in range(args.workers)]
    
    for w in workers:
        w.start()
    
    for i in range(args.tasks):
        w = random.choice(workers)
        w.submit(f"task_{i}")
    
    time.sleep(2)
    
    for w in workers:
        w.stop()
    
    print("Worker pool completed")

if __name__ == "__main__":
    main()