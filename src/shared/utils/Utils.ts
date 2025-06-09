export const getCategoryLabel = (category: string): string => {
    // Convertir LECTURA a Lectura, DEPORTE a Deporte, etc.
    return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
};

// Añadir esta función helper para obtener el texto en español
export const getStateLabel = (state: string) => {
    switch (state) {
        case 'CANCELLED':
            return 'CANCELADO';
        case 'PENDING':
            return 'PENDIENTE';
        case 'IN_PROGRESS':
            return 'EN PROGRESO';
        case 'FINISHED':
            return 'FINALIZADO';
        default:
            return state;
    }
};