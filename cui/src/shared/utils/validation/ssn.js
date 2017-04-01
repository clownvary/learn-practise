//******************************************************************
//
//  Validate a social security number
//
//******************************************************************
export default function validSSN (ssn, msg) {
  let error = '';
  const {ssn_numeric_only,ssn_label,ssn_valid_length} = window.__permitDetail__.__initialState__;
  if(ssn_numeric_only == "true") {
    for(var i=0;i<ssn.length;i++) {
      var c = ssn.charAt(i);
      if(isNaN(parseInt(c,10))){
        // alert("The ssn_label contains invalid characters.");
        // return false;
        error = msg +" contains invalid characters.";
        return error;
      }
    }
  }

  if(ssn.length == 0){
      ssn="";
      return "";
  }

  if(ssn.length > ssn_valid_length){
      // alert("The ssn_label should not be longer than ssn_valid_length digits.");
      // return false;
      error = msg + "should not be longer than " + ssn_valid_length + " digits.";
      return error;
  }

  return "";
}
