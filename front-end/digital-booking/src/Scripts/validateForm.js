//Essa função verifica se o email digitado no input é válido
//Retorna true se for valido e false se for invalido
export function checkEmail(email) {
    if (email.includes('@') && email.includes('.')) {
        const user = email.slice(0, email.indexOf('@'));
        const domain = email.slice(email.indexOf('@') + 1, email.length);
        const point = domain.slice(domain.indexOf('.') + 1, domain.length)

        if (user.length < 1 || user.includes(' ')) {
            return false;
        } else if (domain.length < 1 || !domain.includes('.') || point.length < 1) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }

}

//Checa se o nome passado como parametro é um nome válido
// se for valido retorna true senão false
export function checkName(name) {
    name = name.trim(); // Retirando os espaços em branco das extremidades e transformando em um array
    console.log(name)
    if (name.length > 1) {
        if (name.search(/[0-9]/g) == -1) {
            return true
        } else {
            return false;
        }

    } else {
        return false;
    }
}

/* Certifica-se que a senha tem mais de 6 digitos */
// Retorna true se tiver mais que seis caracteres e false se não
export function checkPassword(password) {
    return password.length > 6 ? true : false;
}

//Recebe duas senhas e retorna true se forem iguais e false se não forem.
export function checkConfirmPassword(passwordA, passwordB) {
    return passwordA === passwordB ? true : false;
}
