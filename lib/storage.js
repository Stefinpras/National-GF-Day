'use client';

export const Store = {
  get(key, fallback = null) {
    if (typeof window === 'undefined') return fallback;
    try {
      const v = window.localStorage.getItem(key);
      if (v === null) return fallback;
      return JSON.parse(v);
    } catch (e) {
      return fallback;
    }
  },
  set(key, value) {
    if (typeof window === 'undefined') return false;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  },
  remove(key) {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(key);
  },
};
