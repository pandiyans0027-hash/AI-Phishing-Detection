// PWA Service Worker Registration (Optional Enhancement)

export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      // Service worker can be implemented for offline capabilities
      console.log('PWA Support: Service Worker API available');
      console.log('Install this app: Look for the install button in your browser');
    });
  }
}

// Install prompt handling
let deferredPrompt: any;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = e;
  console.log('PWA: Install prompt available');
});

window.addEventListener('appinstalled', () => {
  console.log('PWA: App installed successfully');
  deferredPrompt = null;
});
