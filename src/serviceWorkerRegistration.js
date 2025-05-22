/* global navigator, fetch */
// src/serviceWorkerRegistration.js

// ローカル環境かどうかを判定するフラグ
const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  window.location.hostname === '[::1]' ||
  window.location.hostname.match(
    /^127(?:\\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
  )
);

// register関数を外部から呼び出せるようにエクスポート
export function register(config) {
  if (
    typeof window === 'undefined' ||
    typeof navigator === 'undefined' ||
    !('serviceWorker' in navigator) ||
    process.env.NODE_ENV !== 'production'
  ) {
    return;
  }

  const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
  if (publicUrl.origin !== window.location.origin) {
    return;
  }

  window.addEventListener('load', () => {
    const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

    if (isLocalhost) {
      // ローカルの場合の検証
      checkValidServiceWorker(swUrl, config);
    } else {
      // 本番環境
      registerValidSW(swUrl, config);
    }
  });
}

// 有効なサービスワーカーを登録する関数
function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      if (registration.waiting) {
        if (config && config.onUpdate) {
          config.onUpdate(registration);
        }
      } else if (config && config.onSuccess) {
        config.onSuccess(registration);
      }
    })
    .catch((error) => {
      console.error('Service worker registration failed:', error);
    });
}

// サービスワーカーの正当性を検証する関数
function checkValidServiceWorker(swUrl, config) {
  fetch(swUrl, { headers: { 'Service-Worker': 'script' } })
    .then((response) => {
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType && !contentType.includes('javascript'))
      ) {
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log('No internet connection. App is running in offline mode.');
    });
}

// サービスワーカーを解除するための関数
export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister();
    });
  }
}
