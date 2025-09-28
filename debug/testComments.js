/**
 * Script de depuración para probar el envío de comentarios
 * Usa este script para ver exactamente qué error aparece
 */

import { createFormComment } from './api/forms/create-comment';

export async function testCommentSubmission() {
    console.log('🧪 Iniciando prueba de comentario...');
    
    // Datos de prueba
    const testData = {
        formId: 'test-form-id', // Reemplaza con un ID real si tienes uno
        content: 'Este es un comentario de prueba',
        rating: 5
    };
    
    try {
        console.log('📝 Enviando comentario con datos:', testData);
        
        const result = await createFormComment(testData.formId, {
            content: testData.content,
            rating: testData.rating
        });
        
        console.log('✅ Resultado:', result);
        
        if (result.success) {
            console.log('🎉 Comentario enviado exitosamente!');
        } else {
            console.log('❌ Error al enviar comentario:', result.message || result.error);
        }
        
        return result;
        
    } catch (error) {
        console.log('💥 Error capturado en catch:', error.message);
        console.log('📊 Detalles del error:', error);
        return { success: false, error: error.message };
    }
}

// Función para probar diferentes escenarios de error
export async function testErrorScenarios() {
    console.log('🔍 Probando diferentes escenarios de error...');
    
    const scenarios = [
        {
            name: 'Comentario vacío',
            formId: 'test-id',
            content: '',
            rating: 5
        },
        {
            name: 'Rating inválido',
            formId: 'test-id',
            content: 'Test comment',
            rating: 10
        },
        {
            name: 'FormId inválido',
            formId: 'invalid-form-id',
            content: 'Test comment',
            rating: 5
        }
    ];
    
    for (const scenario of scenarios) {
        console.log(`\n🧪 Probando: ${scenario.name}`);
        try {
            const result = await createFormComment(scenario.formId, {
                content: scenario.content,
                rating: scenario.rating
            });
            console.log(`📊 Resultado para "${scenario.name}":`, result);
        } catch (error) {
            console.log(`❌ Error en "${scenario.name}":`, error.message);
        }
    }
}