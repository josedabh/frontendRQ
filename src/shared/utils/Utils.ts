export const getCategoryLabel = (category: string): string => {
    // Convertir LECTURA a Lectura, DEPORTE a Deporte, etc.
    return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
};