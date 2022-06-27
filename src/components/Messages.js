export const getMessage=(value)=>{
    return data[value]||"Ha ocurrido un error inseperado, intentelo mas tarde";
}
const data ={
    "auth/wrong-password":"Usuario y/o clave incorrectos",
    "auth/user-not-found":"Usuario no encontrado",
    "auth/invalid-email":"Email no valido",
    "auth/email-already-in-use":"Este nombre de usuario ya está en uso",
    "auth/weak-password":"La contraseña debe ser mínimo de 6 caracteres",
    "auth/too-many-requests":"Ha realizados varios intentos, espere unos minutos y vuelva a intentarlo",
    "min3musics":"Debe incluir mínimo tres canciones",
    "dataRequired":"Ingrese los campos requeridos",
}