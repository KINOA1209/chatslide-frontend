'use client'

import React from "react";

export default class SessionStorage extends React.Component {
  static getItem(key: string, defaultValue: string=""): string {
    if (typeof window === 'undefined') {
      return defaultValue;
    }
    return sessionStorage.getItem(key) || defaultValue;
  }

  static setItem(key: string, value: string): void {
    if (typeof window === 'undefined') {
      return;
    }
    sessionStorage.setItem(key, value);
  }
}