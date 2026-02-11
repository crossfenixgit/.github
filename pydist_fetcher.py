from pydist_network import client
from urllib.parse import urlparse

class RemoteFetcher:
    def fetch(self, source):
        try:
            data = client.fetch_json(source)
            if data:
                for key in ['link','url','href','redirect','target']:
                    if key in data and data[key]:
                        url = data[key]
                        if self._validate(url):
                            return url
            text = client.fetch_text(source)
            if text and self._validate(text):
                return text
        except:
            return None
        return None
    
    def _validate(self, url):
        if not url or not isinstance(url, str):
            return False
        p = urlparse(url)
        return p.scheme in ['http','https'] and bool(p.netloc)

fetcher = RemoteFetcher()