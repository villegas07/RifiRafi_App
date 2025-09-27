import CryptoJS from 'crypto-js';

// Configuración de Wompi - REEMPLAZA CON TUS LLAVES REALES
export const WOMPI_CONFIG = {
    publicKey: 'pub_test_RFrhRXLzPp2KWw6AMwRaSygz59K4MSSL',
    privateKey: 'prv_test_MtIn1447UEErkRH1M9Rn1flnlHk4NSFZ', // Reemplazar con tu llave privada
    integritySecret: 'test_integrity_rPMCc5gmR4Y3P8L3plNaP1Ehs7IG0tOg' // Reemplazar con tu secreto de integridad
};

// Generar firma de integridad para Wompi
export const generateWompiSignature = (reference, amountInCents, currency) => {
    try {
        // Concatenar los valores según la documentación de Wompi
        const concatenatedString = `${reference}${amountInCents}${currency}${WOMPI_CONFIG.integritySecret}`;
        
        // Generar hash SHA256
        const signature = CryptoJS.SHA256(concatenatedString).toString();
        
        console.log('Generando firma:', {
            reference,
            amountInCents,
            currency,
            concatenatedString,
            signature
        });
        
        return signature;
    } catch (error) {
        console.error('Error generando firma Wompi:', error);
        return null;
    }
};

// Generar URL de pago con firma
export const generateWompiPaymentUrl = (amount, currency, email, reference) => {
    const amountInCents = amount * 100;
    const signature = generateWompiSignature(reference, amountInCents, currency);
    
    if (!signature) {
        console.error('No se pudo generar la firma');
        return null;
    }
    
    const url = `https://checkout.wompi.co/p/?public-key=${WOMPI_CONFIG.publicKey}&currency=${currency}&amount-in-cents=${amountInCents}&reference=${reference}&signature%3Aintegrity=${signature}&customer-data%5Bemail%5D=${encodeURIComponent(email)}`;
    
    console.log('URL generada:', url);
    return url;
};