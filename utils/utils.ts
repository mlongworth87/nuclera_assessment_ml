//Random String generator
export function generate_random_string(length: number): string {
    const charsToUse = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
    if (!Number.isInteger(length || length <= 0)) {
        throw new Error("generate_random_string:  Supplied length was not a positive number.")
    }

    let result : string = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charsToUse.length)
        result += charsToUse.charAt(randomIndex) 
    }
    
    return(result);
}