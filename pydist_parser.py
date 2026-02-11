import json
import re

class ResponseParser:
    def extract(self, data):
        if isinstance(data, bytes):
            data = data.decode('utf-8', errors='ignore')
        if isinstance(data, str):
            data = data.strip()
            if data.startswith('{') or data.startswith('['):
                try:
                    obj = json.loads(data)
                    return self._from_dict(obj)
                except:
                    pass
            if data.startswith(('http://','https://')):
                return data
            m = re.search(r'https?://[^\s\'"<>]+', data)
            if m:
                return m.group(0)
        elif isinstance(data, dict):
            return self._from_dict(data)
        return None
    
    def _from_dict(self, obj):
        for k in ['link','url','href','redirect','target','location']:
            if k in obj and obj[k]:
                v = obj[k]
                if isinstance(v, str) and v.startswith(('http://','https://')):
                    return v
        return None

parser = ResponseParser()