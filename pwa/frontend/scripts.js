if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(function() {
            console.log('service worker registered');
        })
        .catch(function(error) {
            console.warn('service worker failed');
            console.error(error);
        });
}