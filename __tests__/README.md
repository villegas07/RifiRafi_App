# Tests para RifiRafi App

## Estructura de Tests

### Tests Unitarios
- **components/**: Tests para componentes individuales
- **hooks/**: Tests para hooks personalizados
- **api/**: Tests para funciones de API
- **screens/**: Tests para pantallas

### Tests de Integración
- **integration/**: Tests que prueban múltiples componentes trabajando juntos

## Ejecutar Tests

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests en modo watch
npm run test:watch

# Ejecutar tests con coverage
npm run test:coverage

# Ejecutar tests para CI
npm run test:ci
```

## Coverage Objetivo

- Branches: 70%
- Functions: 70%
- Lines: 70%
- Statements: 70%

## Tests Implementados

### Componentes
- ✅ Avatar.test.js - Prueba iniciales y imágenes
- ✅ UserName.test.js - Prueba nombres de usuario
- ✅ PointsBar.test.js - Prueba puntos del usuario

### Hooks
- ✅ useUser.test.js - Prueba hook de usuario

### API
- ✅ users.test.js - Prueba APIs de usuario

### Integración
- ✅ userProfile.test.js - Flujo completo de perfil
- ✅ apiIntegration.test.js - Integración con APIs

### Pantallas
- ✅ QuestionsScreen.test.js - Pantalla de preguntas