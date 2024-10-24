// Función para extraer la extensión de la imagen
export function getImageExtension(base64Data: string): string | null {
    const match = base64Data.match(/^data:image\/(png|jpeg|jpg|gif);base64,/);
    if (match) {
        return match[1]; // 'png', 'jpeg', 'jpg', 'gif'
    }
    return null;
}