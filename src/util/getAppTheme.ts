import storage from './storage';

export enum AppTheme {
  Dark = 'dark',
  Light = 'light',
}

function getUserTheme(): AppTheme {
  const theme = storage.get('theme');

  if (!theme || theme === 'light') {
    return AppTheme.Light;
  }

  return AppTheme.Dark;
}

export default getUserTheme;
