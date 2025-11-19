import React from 'react';

export type AppID = 
  | 'calculator' 
  | 'calendar' 
  | 'clock' 
  | 'music' 
  | 'notes' 
  | 'terminal' 
  | 'files' 
  | 'browser' 
  | 'settings';

export type LanguageID = 'en' | 'ru' | 'uk' | 'be';

export interface AppDefinition {
  id: AppID;
  name: string; // Fallback name
  iconColor: string; // Tailwind class
  iconComponent: React.ReactNode;
}

export interface Wallpaper {
  id: string;
  url: string;
  name: string;
}

export interface Note {
  id: string;
  content: string;
  date: Date;
}

export interface FileSystemItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: FileSystemItem[];
  content?: string;
  icon?: string;
}

export interface NotificationItem {
  id: string;
  app: string;
  title: string;
  message: string;
  time: string;
}