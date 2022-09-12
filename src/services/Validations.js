
export const checkOnlySpaces=(text)=>{
    let expresion=/^\s*$/gim;
    return expresion.test(text);
  
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
const validatIncrementDecrement = (item1, item2) => {
    let result = item1 - item2;
    return result;
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
export const validateAlfaNumeric=(value)=>{
    let Response = {
        Result: null,
        message: null,
        resultValidation: false
    }; 
    let expresion = /^([A-Za-zÑñáéíóúÁÉÍÓÚ 0-9]+)$/gim;

    if (value.includes(" ")) {
        let tempData = value.split(" ");
        let resul = [];
        console.log(tempData)
        for (let i = 0; i < tempData.length; i++) {
            if (tempData[i].length > 0) {
                let expresion = /^([A-Za-zÑñáéíóúÁÉÍÓÚ 0-9]+)$/gim;
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
          
            Response.Result = true;
                Response.resultValidation = true;
                Response.message = "";
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