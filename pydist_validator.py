from urllib.parse import urlparse
import socket

class Validator:
    def validate_url(self, url):
        try:
            p = urlparse(url)
            if p.scheme not in ['http','https']:
                return False, 'invalid scheme'
            if not p.netloc:
                return False, 'no hostname'
            return True, p.netloc
        except:
            return False, 'malformed'
    
    def resolve(self, hostname):
        try:
            return socket.gethostbyname(hostname)
        except:
            return None

validator = Validator()