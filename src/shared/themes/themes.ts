import colors from './constants/colors';

interface ThemeColors {
    // Backgrounds
    background: string;
    backgroundAlt: string;
    backgroundCard: string;
    
    // Brand colors
    primary: string;
    secondary: string;
    accent: string;
    
    // Text colors
    text: string;
    textTitle: string;
    textSubtitle: string;
    textMuted: string;
    
    // UI Elements
    card: string;
    border: string;
    divider: string;
    empty: string;
    
    // Status colors
    success: string;
    error: string;
    warning: string;
    info: string;
    
    // Interactive elements
    buttonPrimary: string;
    buttonSecondary: string;
    buttonText: string;
    
    // Shadows
    shadowColor: string;
}

export const bermellon: ThemeColors = {
    // Backgrounds
    background: colors.bermellonBg,
    backgroundAlt: colors.backgroundLight,
    backgroundCard: colors.backgroundGray,
    
    // Brand colors
    primary: colors.bermellonPrimary,
    secondary: colors.secondary,
    accent: colors.bermellonAccent,
    
    // Text colors
    text: colors.bermellonText,
    textTitle: colors.shadow,
    textSubtitle: colors.bermellonPrimary,
    textMuted: colors.grisClaro,
    
    // UI Elements
    card: colors.bermellonCard,
    border: colors.beige,
    divider: colors.grisClaro,
    empty: colors.grisClaro,
    
    // Status colors
    success: colors.success,
    error: colors.danger,
    warning: colors.warning,
    info: colors.info,
    
    // Interactive elements
    buttonPrimary: colors.bermellonPrimary,
    buttonSecondary: colors.grisClaro,
    buttonText: colors.backgroundLight,
    
    // Shadows
    shadowColor: colors.shadow,
};

export const futurista: ThemeColors = {
    // Backgrounds
    background: colors.futuristaBg,
    backgroundAlt: colors.neonAzul,
    backgroundCard: colors.futuristaCard,
    
    // Brand colors
    primary: colors.futuristaPrimary,
    secondary: colors.neonAzul,
    accent: colors.futuristaAccent,
    
    // Text colors
    text: colors.futuristaText,
    textTitle: colors.neonAzul,
    textSubtitle: colors.celeste,
    textMuted: colors.grisClaro,
    
    // UI Elements
    card: colors.futuristaCard,
    border: colors.neonAzul,
    divider: colors.grisOscuro,
    empty: colors.grisClaro,
    
    // Status colors
    success: colors.neonVerde,
    error: colors.neonRosa,
    warning: colors.neonAmarillo,
    info: colors.neonAzul,
    
    // Interactive elements
    buttonPrimary: colors.futuristaPrimary,
    buttonSecondary: colors.azulCielo,
    buttonText: colors.shadow,
    
    // Shadows
    shadowColor: colors.negro,
};

export const naturaleza: ThemeColors = {
    // Backgrounds
    background: colors.verdePastel,
    backgroundAlt: colors.beige,
    backgroundCard: colors.blanco,
    
    // Brand colors
    primary: colors.verdeOscuro,
    secondary: colors.marron,
    accent: colors.verdeLima,
    
    // Text colors
    text: colors.shadow,
    textTitle: colors.verdeOscuro,
    textSubtitle: colors.marron,
    textMuted: colors.grisClaro,
    
    // UI Elements
    card: colors.blanco,
    border: colors.verdeClaro,
    divider: colors.beige,
    empty: colors.grisClaro,
    
    // Status colors
    success: colors.verdeMenta,
    error: colors.rojo,
    warning: colors.naranja,
    info: colors.azulCielo,
    
    // Interactive elements
    buttonPrimary: colors.verdeOscuro,
    buttonSecondary: colors.beige,
    buttonText: colors.shadow,
    
    // Shadows
    shadowColor: colors.shadow,
};

export const oscuro: ThemeColors = {
    // Backgrounds
    background: colors.negro,
    backgroundAlt: colors.grisOscuro,
    backgroundCard: colors.grisOscuro,
    
    // Brand colors
    primary: colors.azulCielo,
    secondary: colors.grisClaro,
    accent: colors.celeste,
    
    // Text colors
    text: colors.blanco,
    textTitle: colors.blanco,
    textSubtitle: colors.grisClaro,
    textMuted: colors.grisClaro,
    
    // UI Elements
    card: colors.grisOscuro,
    border: colors.grisClaro,
    divider: colors.grisClaro,
    empty: colors.grisClaro,
    
    // Status colors
    success: colors.verdeClaro,
    error: colors.rojo,
    warning: colors.naranja,
    info: colors.azulCielo,
    
    // Interactive elements
    buttonPrimary: colors.azulCielo,
    buttonSecondary: colors.grisClaro,
    buttonText: colors.negro,
    
    // Shadows
    shadowColor: colors.negro,
};

export const retro: ThemeColors = {
    // Backgrounds
    background: colors.beige,
    backgroundAlt: colors.marron,
    backgroundCard: colors.blanco,
    
    // Brand colors
    primary: colors.marron,
    secondary: colors.naranja,
    accent: colors.rojo,
    
    // Text colors
    text: colors.shadow,
    textTitle: colors.marron,
    textSubtitle: colors.grisOscuro,
    textMuted: colors.grisClaro,
    
    // UI Elements
    card: colors.blanco,
    border: colors.marron,
    divider: colors.beige,
    empty: colors.grisClaro,
    
    // Status colors
    success: colors.verdeOscuro,
    error: colors.rojo,
    warning: colors.naranja,
    info: colors.azulCielo,
    
    // Interactive elements
    buttonPrimary: colors.marron,
    buttonSecondary: colors.beige,
    buttonText: colors.blanco,
    
    // Shadows
    shadowColor: colors.shadow,
};

export type Theme = ThemeColors;
