import { ThemeKeyType } from './slice/types';

/* istanbul ignore next line */
export const isSystemDark = window?.matchMedia
  ? window.matchMedia('(prefers-color-scheme: dark)')?.matches
  : undefined;

export function saveTheme(theme: ThemeKeyType) {
  window.localStorage && localStorage.setItem('selectedTheme', theme);
}

/* istanbul ignore next line */
export function getThemeFromStorage(): ThemeKeyType | null {
  return window.localStorage
    ? (localStorage.getItem('selectedTheme') as ThemeKeyType) || null
    : null;
}

//capitalize only the first letter of the string.
export function capitalizeFirstLetter(string?: string) {
  return string?.length ? string.charAt(0).toUpperCase() + string.slice(1) : '';
}

export function readTextFromFile(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onloadend = pr => {
      if (pr?.target?.result) {
        resolve(pr.target.result as string);
      } else {
        reject(new Error('FileReader failed to read file'));
      }
    };
  });
}
