import React from 'react';
import { AppDefinition, Wallpaper, LanguageID } from './types';

// Simple SVG Icons component map
export const Icons = {
  Calculator: (
    <svg className="w-full h-full p-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  Calendar: (
    <svg className="w-full h-full p-2 text-red-600 bg-white rounded-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Clock: (
    <svg className="w-full h-full p-1 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <circle cx="12" cy="12" r="10" strokeWidth="2" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
    </svg>
  ),
  Music: (
    <svg className="w-full h-full p-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
    </svg>
  ),
  Notes: (
    <svg className="w-full h-full p-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  Terminal: (
    <svg className="w-full h-full p-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3" />
    </svg>
  ),
  Files: (
    <svg className="w-full h-full p-2 text-blue-500 bg-white rounded-lg" fill="currentColor" viewBox="0 0 24 24">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  ),
  Browser: (
    <svg className="w-full h-full p-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <circle cx="12" cy="12" r="10" strokeWidth="2" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  ),
  Settings: (
    <svg className="w-full h-full p-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
};

// Apps are ordered. The first 4 appear in the dock.
export const APPS: AppDefinition[] = [
  { id: 'browser', name: 'Safari', iconColor: 'bg-blue-400', iconComponent: Icons.Browser },
  { id: 'music', name: 'Music', iconColor: 'bg-red-500', iconComponent: Icons.Music },
  { id: 'notes', name: 'Notes', iconColor: 'bg-yellow-400', iconComponent: Icons.Notes },
  { id: 'files', name: 'Files', iconColor: 'bg-blue-100', iconComponent: Icons.Files },
  { id: 'calculator', name: 'Calculator', iconColor: 'bg-gray-800', iconComponent: Icons.Calculator },
  { id: 'calendar', name: 'Calendar', iconColor: 'bg-white', iconComponent: Icons.Calendar },
  { id: 'clock', name: 'Clock', iconColor: 'bg-black', iconComponent: Icons.Clock },
  { id: 'terminal', name: 'Terminal', iconColor: 'bg-gray-900', iconComponent: Icons.Terminal },
  { id: 'settings', name: 'Settings', iconColor: 'bg-gray-500', iconComponent: Icons.Settings },
];

export const WALLPAPERS: Wallpaper[] = [
  { id: 'ios18-8', name: 'Liquid Blue', url: 'https://images.unsplash.com/photo-1550063873-ab792950096b?q=80&w=1200&auto=format&fit=crop' },
  { id: 'ios18-1', name: 'Mountain', url: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1200&auto=format&fit=crop' },
  { id: 'ios18-2', name: 'Dark Waves', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop' },
  { id: 'ios18-3', name: 'Desert', url: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=1200&auto=format&fit=crop' },
  { id: 'ios18-4', name: 'Abstract', url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200&auto=format&fit=crop' },
  { id: 'ios18-5', name: 'Northern Lights', url: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=1200&auto=format&fit=crop' },
  { id: 'ios18-6', name: 'Neon Tokyo', url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1200&auto=format&fit=crop' },
  { id: 'ios18-7', name: 'Snowy Peaks', url: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1200&auto=format&fit=crop' },
  { id: 'ios18-9', name: 'Deep Forest', url: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=1200&auto=format&fit=crop' },
  { id: 'ios18-10', name: 'Mars Surface', url: 'https://images.unsplash.com/photo-1614728853911-00a21b43a838?q=80&w=1200&auto=format&fit=crop' },
  { id: 'ios18-11', name: 'Gradient Mesh', url: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=1200&auto=format&fit=crop' },
  { id: 'ios18-12', name: 'Rainy City', url: 'https://images.unsplash.com/photo-1508349083404-7d895de57eb9?q=80&w=1200&auto=format&fit=crop' },
  { id: 'ios18-13', name: 'Golden Hour', url: 'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?q=80&w=1200&auto=format&fit=crop' },
];

export const TRANSLATIONS: Record<LanguageID, any> = {
  en: {
    appName: {
      browser: 'Safari',
      music: 'Music',
      notes: 'Notes',
      files: 'Files',
      calculator: 'Calculator',
      calendar: 'Calendar',
      clock: 'Clock',
      terminal: 'Terminal',
      settings: 'Settings'
    },
    settings: {
      title: 'Settings',
      general: 'General',
      appearance: 'Appearance',
      language: 'System Language',
      about: 'About',
      light: 'Light',
      dark: 'Dark',
      auto: 'Automatic',
      wallpaper: 'Wallpaper',
      version: 'Software Version',
      build: 'Build Number',
      kernel: 'Kernel Version'
    },
    languages: {
      en: 'English',
      ru: 'Russian',
      uk: 'Ukrainian',
      be: 'Belarusian'
    }
  },
  ru: {
    appName: {
      browser: 'Safari',
      music: 'Музыка',
      notes: 'Заметки',
      files: 'Файлы',
      calculator: 'Калькулятор',
      calendar: 'Календарь',
      clock: 'Часы',
      terminal: 'Терминал',
      settings: 'Настройки'
    },
    settings: {
      title: 'Настройки',
      general: 'Основные',
      appearance: 'Оформление',
      language: 'Язык системы',
      about: 'Об этом устройстве',
      light: 'Светлое',
      dark: 'Тёмное',
      auto: 'Авто',
      wallpaper: 'Обои',
      version: 'Версия ПО',
      build: 'Номер сборки',
      kernel: 'Версия ядра'
    },
    languages: {
      en: 'Английский',
      ru: 'Русский',
      uk: 'Украинский',
      be: 'Белорусский'
    }
  },
  uk: {
    appName: {
      browser: 'Safari',
      music: 'Музика',
      notes: 'Нотатки',
      files: 'Файли',
      calculator: 'Калькулятор',
      calendar: 'Календар',
      clock: 'Годинник',
      terminal: 'Термінал',
      settings: 'Налаштування'
    },
    settings: {
      title: 'Налаштування',
      general: 'Загальні',
      appearance: 'Вигляд',
      language: 'Мова системи',
      about: 'Про цей пристрій',
      light: 'Світлий',
      dark: 'Темний',
      auto: 'Авто',
      wallpaper: 'Шпалери',
      version: 'Версія ПЗ',
      build: 'Номер збірки',
      kernel: 'Версія ядра'
    },
    languages: {
      en: 'Англійська',
      ru: 'Російська',
      uk: 'Українська',
      be: 'Білоруська'
    }
  },
  be: {
    appName: {
      browser: 'Safari',
      music: 'Музыка',
      notes: 'Нататкі',
      files: 'Файлы',
      calculator: 'Калькулятар',
      calendar: 'Каляндар',
      clock: 'Гадзіннік',
      terminal: 'Тэрмінал',
      settings: 'Налады'
    },
    settings: {
      title: 'Налады',
      general: 'Агульныя',
      appearance: 'Афармленне',
      language: 'Мова сістэмы',
      about: 'Пра гэта прылада',
      light: 'Светлае',
      dark: 'Цёмнае',
      auto: 'Аўта',
      wallpaper: 'Шпалеры',
      version: 'Версія ПЗ',
      build: 'Нумар зборкі',
      kernel: 'Версія ядра'
    },
    languages: {
      en: 'Англійская',
      ru: 'Руская',
      uk: 'Украінская',
      be: 'Беларуская'
    }
  }
};