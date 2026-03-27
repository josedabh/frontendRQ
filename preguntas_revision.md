# Preguntas de revisión (inconsistencias, ineficiencias y buenas prácticas)

Este documento es para que respondas y, con base en tus respuestas, yo implemente cambios en iteraciones.

---

## 1) Arquitectura y organización

### 1. ¿Quieres centralizar todas las URL de API por entorno (dev/staging/prod) usando variables de entorno en lugar de IPs fijas en código?
**¿Por qué importa?**  
Evita errores al desplegar, facilita cambios de backend y mejora seguridad/mantenibilidad.

**Tu respuesta:**  
- Quiero que haya tres entornos de desarrollos: Para evotar que no choquen incosistencia o grabar datos en el lugar equivocado. Tambien quiero que creas un perfil para estos entornos y asegurarnos de que no estamos poniendo en el lugar equivocado.

### 2. ¿Prefieres eliminar importaciones/variables no usadas y estandarizar nombres (por ejemplo, consistencia entre `Datauser` y `DataUser`)?
**¿Por qué importa?**  
Reduce ruido, evita confusión y facilita mantenimiento del código.

**Tu respuesta:**  
- Si, hazlo.

### 3. ¿Deseas una convención clara para comentarios (español/inglés, cuándo usar comentarios y cuándo no)?
**¿Por qué importa?**  
Mejora legibilidad del equipo y evita comentarios desactualizados o ambiguos.

**Tu respuesta:**  
- Ingles para los métodos y barras si se puede en español.

---

## 2) Estado global y navegación

### 4. ¿Quieres que el flujo de login/registro dependa solo del estado de autenticación (`isAuthenticated`) y no haga navegación manual redundante (`navigation.replace`)?
**¿Por qué importa?**  
Evita rutas inconsistentes, simplifica flujo y reduce errores de navegación.

**Tu respuesta:**  
- Si, hazlo

### 5. ¿Deseas estandarizar el tipado de parámetros de navegación para evitar `any` en rutas como Admin?
**¿Por qué importa?**  
Mejora seguridad de tipos y previene errores en tiempo de ejecución.

**Tu respuesta:**  
- Si, hazlo si tienes una pregunta dila como lo vas a proceder

---

## 3) Red, errores y UX

### 6. ¿Quieres evitar `Alert` dentro de interceptores de Axios y manejar errores de red desde UI/capas de pantalla?
**¿Por qué importa?**  
Evita alertas repetidas, desacopla red de UI y mejora experiencia de usuario.

**Tu respuesta:**  
-  Si mejora esa parte ya que era ineficiente.

### 7. ¿Prefieres normalizar el manejo de errores (mensajes de backend + fallback amigable) para que no se muestre solo `error.message` genérico?
**¿Por qué importa?**  
Entrega mensajes más claros al usuario y facilita debugging.

**Tu respuesta:**  
- Eso te lo dare despues ya que el backend va a crear uno y tu pornto lo mapeara.

### 8. ¿Quieres definir una estrategia para estado offline (cache local mínima, cola de acciones o solo pantalla sin conexión)?
**¿Por qué importa?**  
Da una experiencia más robusta cuando falla internet.

**Tu respuesta:**  
- Si, hazlo para que el ususario pueda ver algunas cosas.

---

## 4) Rendimiento y experiencia

### 9. ¿Deseas revisar cargas iniciales para evitar trabajo extra al arrancar app (tema, token, estado de red, interceptores)?
**¿Por qué importa?**  
Reduce tiempo de arranque y mejora percepción de fluidez.

**Tu respuesta:**  
- Dame un análisis detallados de como quieres proceder en la próxima.

### 10. ¿Quieres definir un patrón de “loading + empty + error” en pantallas con datos remotos (ej. Home)?
**¿Por qué importa?**  
Evita pantallas ambiguas y da feedback claro al usuario.

**Tu respuesta:**  
- Si, hazlo.

---

## 5) Seguridad y calidad de código

### 11. ¿Quieres eliminar logs sensibles en desarrollo que imprimen headers/request completos?
**¿Por qué importa?**  
Reduce riesgo de exponer tokens/datos sensibles en consola.

**Tu respuesta:**  
- Sis, hazlo

### 12. ¿Deseas reforzar validaciones de formulario (registro/login) y sanitización antes de enviar al backend?
**¿Por qué importa?**  
Mejora calidad de datos, seguridad y reduce errores evitables.

**Tu respuesta:**  
- Si, toma las medidas necesarias para que no falle.

### 13. ¿Prefieres activar una política de lint estricta y corregirla de forma gradual por módulos?
**¿Por qué importa?**  
Aumenta consistencia técnica y evita deuda de estilo/código.

**Tu respuesta:**  
- Si, hazlo.

---

## Prioridades para implementar (marca con X)

- [X ] Prioridad alta: Arquitectura y configuración API
- [ ] Prioridad alta: Seguridad y manejo de errores
- [ X] Prioridad media: Navegación y tipado
- [ X] Prioridad media: Rendimiento inicial
- [ X] Prioridad baja: Limpieza/estilo de código

---

## Cómo quieres que implemente

1. ¿Prefieres cambios pequeños por PR/commit (iterativo) o un solo bloque grande?  
**Tu respuesta:**  
- Por fases que crea convenientes

2. ¿Quieres que empiece por lo crítico (seguridad/errores) o por lo visible (UX/navegación)?  
**Tu respuesta:**  
- Por lo visible ya que lo cirtico aun bo tegno foto de como hacerlo

3. ¿Hay restricciones que no deba tocar (pantallas, servicios o flujos específicos)?  
**Tu respuesta:**  
- No, puedes hacerlo como tu quieras
