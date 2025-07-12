document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');
    const loadingText = document.querySelector('.loader-text');
    const loadingPhrases = [
        "Loading sustainable fashion items...",
        "Preparing your eco-friendly experience...",
        "Connecting with like-minded fashion lovers...",
        "Almost there..."
    ];
    
    let currentPhrase = 0;
    const phraseInterval = setInterval(function() {
        currentPhrase = (currentPhrase + 1) % loadingPhrases.length;
        if (loadingText) {
            loadingText.textContent = loadingPhrases[currentPhrase];
        }
    }, 2000);
    
    // Start timing when DOM is loaded
    const domLoadedTime = Date.now();
    
    function hideLoader() {
        const minDisplayTime = 3000; // 3 seconds minimum
        const elapsed = Date.now() - domLoadedTime;
        const remaining = Math.max(0, minDisplayTime - elapsed);
        
        setTimeout(function() {
            if (loader) {
                loader.classList.add('fade-out');
                setTimeout(function() {
                    loader.style.display = 'none';
                    clearInterval(phraseInterval);
                }, 500); // Match this with CSS transition duration
            }
        }, remaining);
    }
    
    // Wait for both DOM content and all assets to load,
    // but ensure it shows for at least 3 seconds
    window.addEventListener('load', hideLoader);
    
    // Fallback in case load event doesn't fire
    setTimeout(hideLoader, 5000); // Max 5 seconds as fallback
});