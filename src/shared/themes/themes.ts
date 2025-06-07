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

export type Theme = ThemeColors;
