/**
 * Storage utilities for local/session storage with type safety
 */
// Local storage with expiration
export const localStore = {
  set: <T,>(key: string, value: T, expirationMinutes?: number): void => {
    const item = {
      value,
      expiry: expirationMinutes ? new Date().getTime() + expirationMinutes * 60 * 1000 : null
    };
    localStorage.setItem(key, JSON.stringify(item));
  },
  get: <T,>(key: string): T | null => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;
    try {
      const item = JSON.parse(itemStr);
      // Check if the item has expired
      if (item.expiry && new Date().getTime() > item.expiry) {
        localStorage.removeItem(key);
        return null;
      }
      return item.value as T;
    } catch (error) {
      console.error('Error parsing stored item:', error);
      return null;
    }
  },
  remove: (key: string): void => {
    localStorage.removeItem(key);
  },
  clear: (): void => {
    localStorage.clear();
  }
};
// Session storage wrapper
export const sessionStore = {
  set: <T,>(key: string, value: T): void => {
    sessionStorage.setItem(key, JSON.stringify(value));
  },
  get: <T,>(key: string): T | null => {
    const item = sessionStorage.getItem(key);
    if (!item) return null;
    try {
      return JSON.parse(item) as T;
    } catch (error) {
      console.error('Error parsing stored item:', error);
      return null;
    }
  },
  remove: (key: string): void => {
    sessionStorage.removeItem(key);
  },
  clear: (): void => {
    sessionStorage.clear();
  }
};
// Cookie utilities
export const cookieStore = {
  set: (name: string, value: string, options: {
    days?: number;
    path?: string;
    domain?: string;
    secure?: boolean;
  } = {}): void => {
    const {
      days,
      path = '/',
      domain,
      secure
    } = options;
    let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      cookie += `; expires=${date.toUTCString()}`;
    }
    cookie += `; path=${path}`;
    if (domain) cookie += `; domain=${domain}`;
    if (secure) cookie += '; secure';
    document.cookie = cookie;
  },
  get: (name: string): string | null => {
    const nameEQ = `${encodeURIComponent(name)}=`;
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.indexOf(nameEQ) === 0) {
        return decodeURIComponent(cookie.substring(nameEQ.length));
      }
    }
    return null;
  },
  remove: (name: string, options: {
    path?: string;
    domain?: string;
  } = {}): void => {
    const {
      path = '/',
      domain
    } = options;
    cookieStore.set(name, '', {
      days: -1,
      path,
      domain
    });
  }
};