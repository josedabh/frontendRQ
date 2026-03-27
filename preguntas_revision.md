# Preguntas pendientes para continuar implementación

Dejé solo lo que todavía falta definir para evitar ambigüedad.

---

## 1) Convención de comentarios

### ¿Confirmas esta convención?
- Código (nombres de variables, funciones, clases y métodos): **inglés**
- Comentarios explicativos: **español**
- Comentarios solo cuando agreguen contexto no obvio

**Respuesta (sí/no o ajustes):**  
- 

---

## 2) Tipado de navegación (Admin y rutas con `any`)

### Para avanzar sin bloquear, ¿autorizas que proceda así?
- Crear tipos de navegación por stack/screen
- Eliminar `any` en params y props de navegación
- Corregir errores de tipado asociados en pantallas Admin

**Respuesta (sí/no):**  
- 

---

## 3) Manejo de errores backend (pendiente por contrato)

### Mientras backend define el formato final de errores, ¿qué prefieres temporalmente?
- A) Mantener el manejo actual hasta que backend entregue contrato
- B) Implementar una capa provisional con fallback amigable y luego ajustarla

**Respuesta (A/B):**  
- 

---

## 4) Estrategia offline mínima (lo que sí quieres que vea el usuario)

### ¿Qué datos quieres disponibles sin internet en esta primera fase?
- A) Solo Home básico (último estado cacheado)
- B) Home + Lista de retos
- C) Home + Retos + Tienda

**Respuesta (A/B/C):**  
- 

---

## 5) Rendimiento inicial (pedido de análisis previo)

### ¿Quieres que en la siguiente iteración te entregue primero?
- A) Solo diagnóstico detallado (sin cambios de código)
- B) Diagnóstico + primera optimización visible en el mismo PR

**Respuesta (A/B):**  
- 

---

## Prioridad de implementación confirmada hasta ahora

- [x] Arquitectura y configuración API
- [x] Navegación y tipado
- [x] Rendimiento inicial
- [x] Limpieza/estilo de código
- [ ] Seguridad y manejo de errores (parcial pendiente por backend)

---

## Forma de trabajo confirmada

- Cambios por fases iterativas
- Empezar por mejoras visibles (UX/navegación)
- Sin restricciones de módulos a tocar
