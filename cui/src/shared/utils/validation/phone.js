//******************************************************************
//
//  Validate a phone number
//
//******************************************************************

function wholeNumber (field,msg,field_name) {
    if(!isInteger(field)) {
        // alert(msg+" must be a whole number.");
        // field.focus();
        // return false;
        return field_name +  " must be a whole number ("+ msg +").";
    }
    return "";
}

function isInteger(elemVal){
     for (var i=0; i < elemVal.length; i++) {
         if(isNaN(parseInt(elemVal.charAt(i)))){
            return false;
         }
     }
     return true;
}

export default function validatePhone(area, phone, ext, field_name, country_code) {
    phone = phone || "";
    ext = ext || "";
    let number = "";
    let isNumber = "";
    leavePhone(area, phone);

    if (typeof(country_code) == "undefined") country_code = "";
    if (country_code.length > 2) country_code = country_code.substring(country_code.length - 2);
    if (country_code == "" || country_code == "US" || country_code == "CA") {
        if (ext) {
            isNumber = wholeNumber(ext, "Ext number" ,field_name);
            if ( isNumber == "") {
                if (ext.length == 4 && phone.length == 3){
                    number = phone + ext;
                    ext = "";
                }
            } else {
                // return false;
                return isNumber;
            }
        }

        if (area.length == 0) {
            if (phone.length == 0) return "";
            // alert(field_name + " is missing the area code.");
            // area.focus();
            // return false;
            return field_name + " is missing the area code.";
        }
        if (area.length != 3) {
            // alert("Area code for " + field_name + " is not 3-digits.");
            // area.focus();
            // return false;
            return field_name + " is not 3-digits (Area code).";
        }

        isNumber = wholeNumber(area, " Area code" ,field_name);
        if (isNumber != "") return isNumber;
        if (phone.length == 0) {
            // alert("The " + field_name + " is missing phone number.");
            // phone.focus();
            // return false;
            return  field_name + " is missing phone number.";
        }

        var number_digits = 0;
        for (var i = 0; i < phone.length; i++) {
            var c = phone.charAt(i);
            if (c == ' ' || c == "." || c == "-") continue;
            if (isNaN(parseInt(c, 10))) {
                // alert("The " + field_name + " contains invalid characters.");
                // phone.focus();
                // return false;
                return field_name + " contains invalid characters.";
            }

            number_digits++;
        }

        if (number_digits != 7) {
            // alert("The " + field_name + " must be 7 digits.");
            // phone.focus();
            // return false;
            return  field_name + " must be 7 digits.";
        }
    } else if (country_code == "AU") {
        // If it's a cell phone number
        // We just need check phone value
        if (phone.name.indexOf("c") > -1) {
            if (phone.length == 0) return "";

            var number_digits = 0;
            for (var i = 0; i < phone.length; i++) {
                var c = phone.charAt(i);
                if (c == ' ' || c == "." || c == "-") continue;
                if (isNaN(parseInt(c, 10))) {
                    // alert("The " + field_name + " contains invalid characters.");
                    // phone.focus();
                    // return false;
                    return field_name + " contains invalid characters.";
                }

                number_digits++;
            }

            if (number_digits != 10) {
                // alert("The " + field_name + " must be 10 digits.");
                // phone.focus();
                // return false;
                return field_name + " must be 10 digits.";
            }

        } else {
            if (ext) {
                isNumber = wholeNumber(ext, "Ext number" ,field_name);
                if (isNumber == "") {
                    if (ext.length == 4 && phone.length == 4){
                        // phone.value += ext.value;
                        number = phone + ext;
                        ext = "";
                    }
                } else {
                    // return false;
                    return isNumber;
                }
            }

            if (area.length == 0) {
                if (phone.length == 0) return "";
                // alert(field_name + " is missing the area code.");
                // area.focus();
                // return false;
                return field_name + " is missing the area code.";
            }
            if (area.length != 2) {
                // alert("Area code for " + field_name + " is not 2-digits.");
                // area.focus();
                // return false;
                return field_name + "  is not 2-digits (Area code).";
            }

            isNumber = wholeNumber(area, " Area code" ,field_name)
            if (isNumber != "") return isNumber;
            if (phone.length == 0) {
                // alert("The " + field_name + " is missing phone number.");
                // phone.focus();
                // return false;
                return field_name + " is missing phone number.";
            }

            var number_digits = 0;
            for (var i = 0; i < phone.length; i++) {
                var c = phone.charAt(i);
                if (c == ' ' || c == "." || c == "-") continue;
                if (isNaN(parseInt(c, 10))) {
                    // alert("The " + field_name + " contains invalid characters.");
                    // phone.focus();
                    // return false;
                    return field_name + " contains invalid characters.";
                }

                number_digits++;
            }

            if (number_digits != 8) {
                // alert("The " + field_name + " must be 8 digits.");
                // phone.focus();
                // return false;
                return field_name + " must be 8 digits.";
            }
        }
    } else if (country_code == "NZ") {
        // If it's a cell phone number
        // We just need check phone value
        if (phone.name.indexOf("c") > -1) {
            if (phone.length == 0) return "";

            var number_digits = 0;
            for (var i = 0; i < phone.length; i++) {
                var c = phone.charAt(i);
                if (c == ' ' || c == "." || c == "-") continue;
                if (isNaN(parseInt(c, 10))) {
                    // alert("The " + field_name + " contains invalid characters.");
                    // phone.focus();
                    // return false;
                    return field_name + " contains invalid characters.";
                }

                number_digits++;
            }

            if (number_digits > 11) {
                // alert("The " + field_name + " must be smaller than 11 digits.");
                // phone.focus();
                // return false;
                return field_name + " must be smaller than 11 digits.";
            }

        } else {
            if (ext) {
                isNumber = wholeNumber(ext, "Ext number" ,field_name);
                if (isNumber == "") {
                    if (ext.length == 4 && phone.length == 4){
                        // phone.value += ext.value;
                        number = phone + ext;
                        ext = "";
                    }
                } else {
                    return isNumber;
                }
            }

            if (area.length == 0) {
                if (phone.length == 0) return "";
                // alert(field_name + " is missing the area code.");
                // area.focus();
                // return false;
                return field_name + " is missing the area code.";
            }
            if (area.length != 2) {
                // alert("Area code for " + field_name + " is not 2-digits.");
                // area.focus();
                // return false;
                return field_name + "  is not 2-digits (Area code).";
            }

            isNumber = wholeNumber(area, "Area code" ,field_name);
            if (isNumber != "") return isNumber;
            if (phone.length == 0) {
                // alert("The " + field_name + " is missing phone number.");
                // phone.focus();
                // return false;
                return field_name + " is missing phone number.";
            }

            var number_digits = 0;
            for (var i = 0; i < phone.length; i++) {
                var c = phone.charAt(i);
                if (c == ' ' || c == "." || c == "-") continue;
                if (isNaN(parseInt(c, 10))) {
                    // alert("The " + field_name + " contains invalid characters.");
                    // phone.focus();
                    // return false;
                    return field_name + " contains invalid characters.";
                }

                number_digits++;
            }

            if (number_digits != 7) {
                // alert("The " + field_name + " must be 7 digits.");
                // phone.focus();
                // return false;
                return field_name + " must be 7 digits.";
            }
        }
    } else {
        if (phone.length == 0) return "";

        var number_digits = 0;
        for (var i = 0; i < phone.length; i++) {
            var c = phone.charAt(i);
            if (c == ' ' || c == "." || c == "-") continue;
            if (isNaN(parseInt(c, 10))) {
                // alert("The " + field_name + " contains invalid characters.");
                // phone.focus();
                // return false;
                return field_name + " contains invalid characters.";
            }

            number_digits++;
        }

        if (number_digits > 20) {
            // alert("The " + field_name + " must be smaller than 20 digits.");
            // phone.focus();
            // return false;
            return field_name + " must be smaller than 20 digits.";
        }

        isNumber = wholeNumber(ext, "Ext number" ,field_name);
        if (ext && isNumber != "") return isNumber;
    }

    return "";
}


const {country_code,area_code} = window.__permitDetail__.__initialState__;

var default_country_code = country_code;
var local_area_code = area_code;
function leavePhone(area_code,phone){
    if (typeof(area_code) == "undefined") return "";
    if (phone.length == 0) {
        if (local_area_code == null) {
           // iniLocalAreaCode();
        } else if (area_code == local_area_code) {
            // area_code.value = "";
            area_code = ""
        }
    }
}
