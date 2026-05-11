export const Colors = {
  light: {
    background: '#F8F9FA',
    surface: '#FFFFFF',
    text: '#1A1A1A',
    textSecondary: '#6C757D',
    primary: '#e6732bff',
    accent: '#3F37C9',
    border: '#E9ECEF',
    error: '#DC3545',
    card: '#FFFFFF',
  },
  dark: {
    background: '#121212',
    surface: '#1E1E1E',
    text: '#F8F9FA',
    textSecondary: '#ADB5BD',
    primary: '#4895EF',
    accent: '#4CC9F0',
    border: '#2C2C2C',
    error: '#E63946',
    card: '#252525',
  }
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const Typography = {
  h1: {
    fontSize: 28,
    fontWeight: 'bold' as const,
  },
  h2: {
    fontSize: 22,
    fontWeight: '600' as const,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
  }
};
