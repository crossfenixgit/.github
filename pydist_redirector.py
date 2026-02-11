from pydist_fetcher import fetcher
from pydist_parser import parser
from pydist_validator import validator

class Redirector:
    def __init__(self):
        self.target = None
    
    def resolve(self, source):
        self.target = fetcher.fetch(source)
        if self.target:
            valid, host = validator.validate_url(self.target)
            if valid:
                return self.target
        return None
    
    def html(self, url):
        return f'''<!DOCTYPE html>
<html>
<head><meta charset="utf-8">
<meta http-equiv="refresh" content="0;url={url}">
<script>window.location.replace("{url}");</script></head>
<body></body>
</html>'''

redirector = Redirector()