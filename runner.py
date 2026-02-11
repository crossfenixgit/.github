#!/usr/bin/env python3
import sys
import json
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from pydist_redirector import redirector
from pydist_metrics import metrics
from pydist_cache import cache

def main():
    try:
        content_length = int(os.environ.get('CONTENT_LENGTH', 0))
        post_data = sys.stdin.read(content_length) if content_length > 0 else ''
        
        if post_data:
            try:
                data = json.loads(post_data)
                source = data.get('source')
            except:
                source = None
        else:
            source = None
        
        if not source:
            print('Content-Type: application/json\n')
            print(json.dumps({'error': 'no source'}))
            return
        
        metrics.inc('fetch_attempt')
        
        cached = cache.get(source)
        if cached:
            print('Content-Type: application/json\n')
            print(json.dumps({'url': cached, 'cached': True}))
            return
        
        url = redirector.resolve(source)
        
        if url:
            cache.set(source, url)
            metrics.inc('fetch_success')
            print('Content-Type: application/json\n')
            print(json.dumps({'url': url, 'cached': False}))
        else:
            metrics.inc('fetch_failed')
            print('Content-Type: application/json\n')
            print(json.dumps({'error': 'resolve failed'}))
            
    except Exception as e:
        print('Content-Type: application/json\n')
        print(json.dumps({'error': str(e)}))

if __name__ == '__main__':
    main()