export const ValidateNumerOfCreditSimple = (number) => {
    /*let expresion = /^\d*[\.]?\d+[\.]?$/gim;
    let validateNum = expresion.test(number);
    return validateNum;*/
    //let reg = /^\d*(\.?\d{0,2})?$/;
    let response = {
        result: false,
        resultExpresion: false,
        message: "El monto solicitado debe ser multiplo de 500"
    }
    let expresion = /^\d+$/gim;
    let resultValidate = false;
    if (number.length <= 0) {
        resultValidate = true;
    } else {
        resultValidate = expresion.test(number);
    }
    let tempNumber = parseInt(number);
    console.log("values formated", tempNumber);
    if (resultValidate) {

        if ((tempNumber % 500 === 0)) {
            if (tempNumber != 0) {
                response.result = true;
                response.resultExpresion = true;

                return response;
            } else {
                response.result = false;
                response.resultExpresion = true;
                return response;
            }
        } else {
            response.resultExpresion = true;
            response.result = false;
            return response;
        }
    } else {
        response.resultExpresion = false;
        response.result = false;
        return response;
    }
};
export const checkOnlySpaces=(text)=>{
    let expresion=/^\s*$/gim;
    return expresion.test(text);
  
}
export const validatePassword1 = (ValueNum) => {
    let Response = {
        Result: null,
        message: null,
        resultValidation: false
    };
    let ExpresionValidateNum = /^(\d){6}$/gim;
    let ExpresionValidateNumRepit = /(\d)\1{4}/gim;
    let ResultValidate = ExpresionValidateNum.test(ValueNum);
    if (ValueNum.length >= 6) {
        let ResultValidateRepit = ExpresionValidateNumRepit.test(ValueNum);
        if (!ResultValidateRepit) {
            let ValidateIncrement = validateNumsequential(ValueNum);
            let ValidateDecrement = validateNumsequentialDecrement(ValueNum);
            let countIncremetn = ValidateIncrement.filter((item) => item == "true");
            let countDecrement = ValidateDecrement.filter((item) => item == "true");
            if (countIncremetn.length >= 4 || countDecrement.length >= 4) {
                Response.Result = false;
                Response.resultValidation = true;
                Response.message = "No números consecutivos";
                return Response;
            } else {
                Response.Result = true;
                Response.resultValidation = true;
                Response.message = "Número correcto";
                return Response;
            }
        } else {
            Response.Result = false;
            Response.resultValidation = true;
            Response.message = "No debe haber números repetidos";
            return Response;
        }
    } else {
        Response.Result = false;
        Response.resultValidation = true;
        Response.message = "Debe ingresar 6 dígitos";
        return Response;
    }
}
export const validatePassword = (ValueNum, ValueNum2) => {
    let Response = {
        Result: null,
        message: null,
        resultValidation: false
    };
    if (ValueNum == ValueNum2) {
        Response.resultValidation = true;
        Response.message = "";
        Response.Result = true;
        return Response;
    } else {
        Response.resultValidation = true;
        Response.message = "Las contraseñas no coinciden";
        Response.Result = false;
        return Response;
        //setText("Las contraseñas NO COINCIDEN, intenta de nuevo");
        // setPassword1(null);
        // setState(false);
        // setPassword2(null);
    }
};

export const validateName = (value) => {
    let Response = {
        Result: null,
        message: null,
        resultValidation: false
    };
    let expresion = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]*(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]*$/gim;
    console.log("nombres",value)
    if (value.includes(" ")) {
        let tempData = value.split(" ");
        let resul = [];
        console.log(tempData)
        for (let i = 0; i < tempData.length; i++) {
            if (tempData[i].length > 0) {
                let expresion = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]*(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]*$/gim;
                console.log(tempData[i]);
                let Resultr =expresion.test(tempData[i])
                console.log("Resultr",Resultr);
                resul.push(Resultr)
            }
        }
        console.log(resul)
        if (resul.includes(false)) {
            Response.Result = false;
            Response.resultValidation = true;
            Response.message = "Debe ingresar solo letras";
            return Response;
        } else {
            /*if(value.startsWith(" ")||value.endsWith(" ")){
                Response.Result = false;
                Response.resultValidation = true;
                Response.message = "No debe ingresar espacios al inicio y al final";
                return Response;
            }else{
                Response.Result = true;
                Response.resultValidation = true;
                Response.message = "Nombre correcto";
                return Response;
            }*/
            Response.Result = true;
                Response.resultValidation = true;
                Response.message = "Nombre correcto";
                return Response;
           
        }
    } else {
        let result = expresion.test(value.trim())
        if (result==false) {
            Response.Result = false;
            Response.resultValidation = true;
            Response.message = "Debe ingresar solo letras";
            return Response;
        } else {
            Response.Result = true;
            Response.resultValidation = true;
            Response.message = "Nombre correcto";
            return Response;
        }

    }

}
export const validateNumber = (ValueNum) => {
    let Response = {
        Result: null,
        message: null,
        resultValidation: false
    };
    let ExpresionValidateNum = /^(\d){10}$/gim;
    let expresionValidateOnlyNumber = /^\d+$/gim;
    let ExpresionValidateNumRepit = /(\d)\1{7}/gim;
    let ResultValidate = ExpresionValidateNum.test(ValueNum);
    let validationOnlyNumber = expresionValidateOnlyNumber.test(ValueNum);
    if (ResultValidate) {
        let ResultValidateRepit = ExpresionValidateNumRepit.test(ValueNum);
        if (!ResultValidateRepit) {
            let ValidateIncrement = validateNumsequential(ValueNum);
            let ValidateDecrement = validateNumsequentialDecrement(ValueNum);
            let countIncremetn = ValidateIncrement.filter((item) => item == "true");
            let countDecrement = ValidateDecrement.filter((item) => item == "true");
            if (countIncremetn.length >= 7 || countDecrement.length >= 7) {
                Response.Result = false;
                Response.resultValidation = true;
                Response.message = "No números consecutivos";
                return Response;
            } else {
                Response.Result = true;
                Response.resultValidation = true;
                Response.message = "Número correcto";
                return Response;
            }

        } else {
            Response.resultValidation = true;
            Response.Result = false;
            Response.message = "El celular ingresado es incorrecto";
            return Response;
        }
    } else if (!validationOnlyNumber) {
        Response.Result = false;
        Response.resultValidation = false;
        Response.message = "Solo numeros";
        return Response;
    } else {
        Response.resultValidation = true;
        Response.Result = false;
        Response.message = "Debe ingresar 10 dígitos";
        return Response;
    }
};
const validateNumsequential = (ValueNum) => {
    let verifySecuentialIncrement = [];
    for (let i = 0; i < ValueNum.length - 1; i++) {
        let item1 = ValueNum.substr(i, 1);
        let item2 = ValueNum.substr(i + 1, 1);
        let verify = validatIncrementDecrement(item1, item2);
        if (verify == -1) {
            verifySecuentialIncrement.push(
                "true" /* `om` is a function that is used to create a new object. */
                /* `om` is a function that is used to create a new object. */
            );
        } else {
            verifySecuentialIncrement.push("false");
        }
    }
    return verifySecuentialIncrement;
};
export const validateCode = (ValueNum) => {
    let Response = {
        Result: null,
        message: null,
    };
    let ExpresionValidateNum = /^(\d){6}$/gim;
    let ExpresionValidateNumRepit = /(\d)\1{4}/gim;
    let ResultValidate = ExpresionValidateNum.test(ValueNum);
    if (ResultValidate) {
        let ResultValidateRepit = ExpresionValidateNumRepit.test(ValueNum);
        if (!ResultValidateRepit) {
            let ValidateIncrement = validateNumsequential(ValueNum);
            let ValidateDecrement = validateNumsequentialDecrement(ValueNum);
            let countIncremetn = ValidateIncrement.filter((item) => item == "true");
            let countDecrement = ValidateDecrement.filter((item) => item == "true");
            if (countIncremetn.length >= 4 || countDecrement.length >= 4) {
                Response.Result = false;
                Response.message = "No números consecutivos";
                return Response;
            } else {
                Response.Result = true;
                Response.message = "Número correcto";
                return Response;
            }
        } else {
            Response.Result = false;
            Response.message = "No debe haber números repetidos";
            return Response;
        }
    } else {
        Response.Result = false;
        Response.message = "Debe ingresar 6 dígitos";
        return Response;
    }
};
const validateNumsequentialDecrement = (ValueNum) => {
    let verifySecuential = [];
    for (let i = 0; i < ValueNum.length - 1; i++) {
        let item1 = ValueNum.substr(i, 1);
        let item2 = ValueNum.substr(i + 1, 1);
        let verify = validatIncrementDecrement(item1, item2);
        if (verify == 1) {
            verifySecuential.push("true");
        } else {
            verifySecuential.push("false");
        }
    }
    return verifySecuential;
};
const validatIncrementDecrement = (item1, item2) => {
    let result = item1 - item2;
    return result;
};
export const validateEmail = (ValueEmail) => {
    let Response = {
        Result: null,
        message: null,
        resultValidation: false
    };
    let ExpresionValidate = /^\w+[-_\.0-9]?(\w+)?@\w+\.\w+\.?(\w+)?$/gim;
    console.log("email pasado:" + ValueEmail + "*")
    let ResultValidate = ExpresionValidate.test(ValueEmail);
    if (ResultValidate) {
        let TempResult = validateEmailDomains(ValueEmail);
        return TempResult;
    } else {
        Response.Result = false;
        Response.resultValidation = true;
        Response.message = "Ingrese un email correcto";
        return Response;
    }
};

const validateEmailDomains = (ValueEmail) => {
    let Response = {
        Result: null,
        message: null,
        resultValidation: false
    };
    let EmailSplit = ValueEmail.split("@");
    EmailSplit = EmailSplit[1];
    let domainsArray = EmailSplit.split(".");
    const tempArrayDuplicate = [];
    for (let i = 0; i < domainsArray.length; i++) {
        if (domainsArray[i + 1] === domainsArray[i]) {
            tempArrayDuplicate.push(domainsArray[i]);
        }
    }
    if (tempArrayDuplicate.length === 0) {
       /* if(ValueEmail.startsWith(" ")||ValueEmail.endsWith(" ")){
            Response.Result = false;
            Response.resultValidation = true;
            Response.message = "No debe ingresar espacios al inicio y al final";
            return Response;
        }else{
            Response.Result = true;
            Response.resultValidation = true;
            Response.message = "Email Correcto";
            return Response;
        }*/
        Response.Result = true;
        Response.resultValidation = true;
        Response.message = "Email Correcto";
        return Response;
       
    } else {
        alert("Ingrese un email correcto");
        Response.Result = false;
        Response.resultValidation = true;
        Response.message = "Ingrese un email correcto";
        return Response;
    }
};

export const validatePositiveNumber = (number) => {
    if (number < 0) {
        return false;
    } else {
        return true;
    }
};

export const validateNotNullNumber = (number) => {
    if (number == undefined || number == undefined) {
        return false;
    } else {
        return true;
    }
};
export const validateImputTextImage = (text) => {
    let Response = {
        Result: null,
        message: null,
        resultValidation: false,
    };
    let expresion = /^\w+$/gim;
    let result = expresion.test(text);
    if (result) {
        if (text.length >= 20) {
            Response.Result = false;
            Response.resultValidation = true;
            Response.message = "Máximo 20 caracteres";
            return Response;
        } else {
            Response.Result = true;
            Response.message = "";
            Response.resultValidation = true;
            return Response;
        }
    } else {
        if (text.includes(" ")) {
            Response.Result = false;
            Response.resultValidation = true;
            Response.message = "No debe ingresar espacios en blanco";
            return Response;
        } else if (text.length <= 0) {
            Response.Result = false;
            Response.resultValidation = true;
            Response.message = "Ingrese la frase";
            return Response;
        } else {
            Response.Result = false;
            Response.resultValidation = true;
            Response.message = "No caracteres especiales";
            return Response;
        }
    }
};
export const validateOcr = (ocr) => {
    let response = {
        result: null,
        message: null,
        resultExpresion: null,
    };
    let expressionCompare = /^\d+$/gim;
    let resulCompare = expressionCompare.test(ocr);
    if (resulCompare) {
        if (ocr.length == 13) {
            response.result = true;
            response.message = null;
            response.resultExpresion = true;
            return response;
        } else {
            response.result = false;
            response.resultExpresion = true;
            response.message = "El ocr debe tener 13 dígitos";
            return response;
        }
    } else {
        if (ocr.length == 0) {
            response.result = false;
            response.resultExpresion = true;
            response.message = "Se debe ingresar el Ocr";
        } else {
            response.result = false;
            response.resultExpresion = false;
            response.message = "El Ocr debe contener solo dígitos";
        }

        return response;
    }
};
export const validateKeyElector = (keyElector) => {
    let response = {
        result: null,
        resultExpresion: null,
        message: null,
    };
    let expressionCompare = /^\w+$/gim;
    let resulCompare = expressionCompare.test(keyElector);
    if (resulCompare) {
        if (keyElector.includes("_")) {
            response.result = true;
            response.message = null;
            response.resultExpresion = false;
            return response;
        } else {
            if (keyElector.length == 18) {
                response.result = true;
                response.message = null;
                response.resultExpresion = true;
                return response;
            } else {
                response.result = false;
                response.resultExpresion = true;
                response.message = "La clave de elector debe de tener 18 caracteres";
                return response;
            }
        }
    } else {
        if (keyElector.length == 0) {
            response.result = false;
            response.resultExpresion = true;
            response.message = "Se debe ingresar la Clave de Elector";
        } else {
            response.result = false;
            response.resultExpresion = false;
            response.message =
                "La clave de elector no debe de tener caracteres especiales";
        }

        return response;
    }
};
export const validateYearIssuer = (year) => {
    let response = {
        result: null,
        message: null,
        resultExpresion: false,
    };
    let expressionCompare = /^\d+$/gim;
    let resulCompare = expressionCompare.test(year);
    if (resulCompare) {
        if (year.length == 2) {
            response.result = true;
            response.message = null;
            response.resultExpresion = true;
            return response;
        } else {
            response.result = false;
            response.resultExpresion = true;
            response.message = "El año de emisión deben ser los dos ultimos dígitos ";
            return response;
        }
    } else {
        if (year.length == 0) {
            response.result = false;
            response.resultExpresion = true;
            response.message = "Se debe ingresar el Año de Emision";
        } else {
            response.result = false;
            response.resultExpresion = false;
            response.message = "El año de emisión debe de ser solo dígitos";
        }
        return response;
    }
};
export const validateCic = (cic) => {
    let response = {
        result: null,
        message: null,
        resultExpresion: null,
    };
    let expressionCompare = /^\d+_\d+$/gim;
    let expressionCompareNumber = /^\d+$/gim;
    let resulCompare = expressionCompare.test(cic);
    if (resulCompare) {
        if (cic.length >= 8 && cic.length <= 13) {
            response.result = true;
            response.resultExpresion = true;
            response.message = null;
            return response;
        } else {
            response.result = false;
            response.resultExpresion = true;
            response.message = "El cic debe contener 9 dígitos";
            return response;
        }
    } else {
        if (cic.includes("_")) {
            console.log("dentre de si contiene guin")
            let tempCic = cic.split("_");
            if (tempCic.length == 2) {
                let resultTemp = expressionCompareNumber.test(tempCic[1])
                if (resultTemp) {
                    response.result = false;
                    response.resultExpresion = true;
                    response.message = "";
                    return response;
                } else {
                    if (cic.endsWith("_")) {
                        response.result = false;
                        response.resultExpresion = true;
                        response.message = "";
                        return response;
                    } else {
                        response.result = false;
                        response.resultExpresion = false;
                        response.message = "";
                        return response;
                    }

                }

            }
            else {
                response.result = false;
                response.resultExpresion = true;
                response.message = "";
                return response;
            }

        } else {
            console.log("dentre de else")
            if (cic.length == 0) {
                response.result = false;
                response.resultExpresion = true;
                response.message = "Se debe ingresar el cic";
                return response;
            } else {
                let tempCic = cic.includes("_")
                if (!tempCic) {
                    let resultValidate = expressionCompareNumber.test(cic)
                    if (resultValidate) {
                        if (cic.length == 9) {
                            response.result = true;
                            response.resultExpresion = true;
                            response.message = " ";
                            return response;
                        } else {
                            response.result = false;
                            response.resultExpresion = true;
                            response.message = "El cic debe tener 9 dígitos ";
                            return response;
                        }
                    } else {
                        response.result = false;
                        response.resultExpresion = false;
                        response.message = "";
                        return response;
                    }
                } else {
                    response.result = false;
                    response.resultExpresion = false;
                    response.message = "El cic debe ser solo dígitos y un guion bajo";
                    return response;
                }


            }
        }
    }
};

export const validateStreet = (street) => {
    let response = {
        result: null,
        message: null,
    };
    let expressionCompare = /^\w+$/gim;
    let resulCompare = expressionCompare.test(street);
    if (resulCompare) {
        response.result = true;
        return response
    }
    else {
        if (street.length == 0) {
            response.result = true;
            return response
        } else {
            if (street.includes(" ")) {
                let tempStreet = street.split(" ")
                let resultValidates = "";

                for (let i = 0; i < tempStreet.length; i++) {
                    if (tempStreet[i].length > 0) {
                        resultValidates = resultValidates + tempStreet[i];
                    }
                }
                resultValidates = resultValidates.trim();
                let resultExpresion = expressionCompare.test(resultValidates);
                if (resultExpresion) {
                    response.result = true;
                    return response
                } else {
                    response.result = false;
                    return response
                }
            } else {
                response.result = false;
                return response
            }

        }

    }
}
export const validateNumberDirection = (number) => {
    let response = {
        result: null,
        message: null,
    };
    let expressionCompare = /^\d+$/gim;
    let resulCompare = expressionCompare.test(number);
    if (resulCompare) {
        response.result = true;
        return response
    }
    else {
        if (number.length == 0) {
            response.result = true;
            return response
        } else {
            response.result = false;
            return response
        }

    }
};