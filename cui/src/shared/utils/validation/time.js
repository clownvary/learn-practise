
export  function timeFormat(value,msg,ampm_field) {
    if (value=="") return "";

    var is24hr = is24HR();

    var clean_string = "";
    var suffix="";
    var end_digits=false;
    for (var i = 0; i < value.length; i++) {
        var ch = value.charAt(i);
        if (ch == " "){
            end_digits = clean_string.length>0;
            continue;
        }

        if (!end_digits && (ch==":" || ((ch >= "0") && (ch <= "9")))) {
            clean_string += ch;
            continue;
        }
        end_digits=true;
        suffix+=ch;
    }

    if (suffix.length>0) {
        suffix=suffix.toLowerCase ();
        if ("am".indexOf(suffix)==0) suffix="am";
        else if ("pm".indexOf(suffix)==0) suffix="pm";
        else {
            // alert (msg+" time is invalid. The am/pm portion of the time is unrecognizable.");
            // return false;

            // return msg+" time is invalid. The am/pm portion of the time is unrecognizable.";
        }
    } else if (ampm_field!=null) {
        if (ampm_field[0].checked)suffix=ampm_field[0].value;
        else if (ampm_field[1].checked)suffix=ampm_field[1].value;
    }

    var hours = 0;
    var minutes = 0;
    var colon_index=clean_string.indexOf (":");
    if (colon_index >= 0){
        if (colon_index>0)hours = parseInt (clean_string.substring (0,colon_index), 10);
        minutes = parseInt (clean_string.substring (colon_index+1, clean_string.length), 10);
        if (isNaN(hours) || isNaN(minutes)) {
            // alert (msg+" time is invalid. Please use a value of the form 'HH:MM AM/PM'");
            // return false;

            // return msg+" time is invalid. Please use a value of the form 'HH:MM AM/PM'";
        }
    } else {
        var x = parseInt (clean_string, 10);
        if (isNaN (x)) {
            // alert (msg+" time is invalid. Please use a value of the form 'HH:MM AM/PM'");
            // return false;
            // return msg+" time is invalid. Please use a value of the form 'HH:MM AM/PM'";
        }

        hours=Math.floor(x/100);
        minutes=x-hours*100;
        if(hours==0&&minutes<24){
            hours=minutes;
            minutes=0
        }
    }

    if(hours==0 && !is24hr){
          hours=12;
          if(suffix.length==0)suffix="am";
    }

    if(hours==12 && suffix.length==0) {
        // When use 12hr format, am/pm is necessary
        // When use 24hr format, 0 for 12am and 12 for 12pm
        if (!is24hr) {
            // alert(msg+" time is invalid. Please specify am/pm.");
            // return false;
            // return msg+" time is invalid. Please specify am/pm.";
        } else {
            suffix = "pm";
        }
    }

    if (hours>12) {
        if (suffix.length>0){
            // alert(msg+" time is invalid. Military time does not need am/pm");
            // return false;
            // return msg+" time is invalid. Military time does not need am/pm";
        }
        hours -= 12;
        suffix="pm";
    }

    if (suffix.length==0) suffix="am";

    // ANE-1112, should not convert any number bigger than 23 to 12:XX am for time input
    if (minutes > 59) {
          // alert(msg + " time is invalid. Please use a value of the form 'HH:MM AM/PM'");
          // return false;
          // return msg + " time is invalid. Please use a value of the form 'HH:MM AM/PM'";
    }

    /*********
     * Using 24hr time format
     * No matter which format user input,
     * will change it to 24hr format.
     * Here treat 12 as 12 pm, 0 as 12 am.
     **/
    if (is24hr && ampm_field==null) {
        if (suffix == "pm" && hours < 12)
            hours += 12;
        if (suffix == "am" && hours == 12)
            hours = 0;
        suffix = "";
    }

    var s = hours.toString() + ":";
    if (minutes < 10)s+="0";
    s+=minutes.toString();

    var d=new Date("January 1, 1999 "+s+" "+suffix);
    if(isNaN (d)) {
        // alert (msg+" time is invalid. Please use a value of the form 'HH:MM AM/PM'");
        // return false;
        // return msg+" time is invalid. Please use a value of the form 'HH:MM AM/PM'";
    }

    if (ampm_field==null) {
        if (!is24hr) {
            value=s+" "+suffix;
        } else {
            value=s;
        }
    } else {
        value=s;
        if (ampm_field[0].value.toLowerCase() == suffix) {
            if (!ampm_field[0].checked) {
                ampm_field[1].checked=false;
                ampm_field[0].checked=true;
            }
        }
        else {
            if (!ampm_field[1].checked) {
                ampm_field[0].checked=false;
                ampm_field[1].checked=true;
            }
        }
    }

    return value;
}

export default function validTime(value,msg,ampm_field) {
    if (value=="")return "";

    var is24hr = is24HR();

    var clean_string = "";
    var suffix="";
    var end_digits=false;
    for (var i = 0; i < value.length; i++) {
        var ch = value.charAt(i);
        if (ch == " "){
            end_digits = clean_string.length>0;
            continue;
        }

        if (!end_digits && (ch==":" || ((ch >= "0") && (ch <= "9")))) {
            clean_string += ch;
            continue;
        }
        end_digits=true;
        suffix+=ch;
    }

    if (suffix.length>0) {
        suffix=suffix.toLowerCase ();
        if ("am".indexOf(suffix)==0) suffix="am";
        else if ("pm".indexOf(suffix)==0) suffix="pm";
        else {
            // alert (msg+" time is invalid. The am/pm portion of the time is unrecognizable.");
            // field.focus();
            // return false;
            return msg+" is invalid. The am/pm portion of the time is unrecognizable.";
        }
    } else if (ampm_field!=null) {
        if (ampm_field[0].checked)suffix=ampm_field[0].value;
        else if (ampm_field[1].checked)suffix=ampm_field[1].value;
    }

    var hours = 0;
    var minutes = 0;
    var colon_index=clean_string.indexOf (":");
    if (colon_index >= 0){
        if (colon_index>0)hours = parseInt (clean_string.substring (0,colon_index), 10);
        minutes = parseInt (clean_string.substring (colon_index+1, clean_string.length), 10);
        if (isNaN(hours) || isNaN(minutes)) {
            // alert (msg+" time is invalid. Please use a value of the form 'HH:MM AM/PM'");
            // field.focus();
            // return false;
            return msg+" is invalid. Please use a value of the form 'HH:MM AM/PM'.";
        }
    } else {
        var x = parseInt (clean_string, 10);
        if (isNaN (x)) {
            // alert (msg+" time is invalid. Please use a value of the form 'HH:MM AM/PM'");
            // field.focus();
            // return false;
            return msg+" is invalid. Please use a value of the form 'HH:MM AM/PM'.";
        }

        hours=Math.floor(x/100);
        minutes=x-hours*100;
        if(hours==0&&minutes<24){
            hours=minutes;
            minutes=0
        }
    }

    if(hours==0 && !is24hr){
          hours=12;
          if(suffix.length==0)suffix="am";
    }

    if(hours==12 && suffix.length==0) {
        // When use 12hr format, am/pm is necessary
        // When use 24hr format, 0 for 12am and 12 for 12pm
        if (!is24hr) {
            // alert(msg+" time is invalid. Please specify am/pm.");
            // field.focus();
            // return false;
            return msg+" is invalid. Please specify am/pm.";
        } else {
            suffix = "pm";
        }
    }

    if (hours>12) {
        if (suffix.length>0){
            // alert(msg+" time is invalid. Military time does not need am/pm");
            // field.focus();
            // return false;
            return msg+" is invalid. Military time does not need am/pm.";
        }
        hours -= 12;
        suffix="pm";
    }

    if (suffix.length==0) suffix="am";

    // ANE-1112, should not convert any number bigger than 23 to 12:XX am for time input
    if (minutes > 59) {
          // alert(msg + " time is invalid. Please use a value of the form 'HH:MM AM/PM'");
          // field.focus();
          // return false;
          return msg + " is invalid. Please use a value of the form 'HH:MM AM/PM'.";
    }

    /*********
     * Using 24hr time format
     * No matter which format user input,
     * will change it to 24hr format.
     * Here treat 12 as 12 pm, 0 as 12 am.
     **/
    if (is24hr && ampm_field==null) {
        if (suffix == "pm" && hours < 12)
            hours += 12;
        if (suffix == "am" && hours == 12)
            hours = 0;
        suffix = "";
    }

    var s = hours.toString() + ":";
    if (minutes < 10)s+="0";
    s+=minutes.toString();

    var d=new Date("January 1, 1999 "+s+" "+suffix);
    if(isNaN (d)) {
        // alert (msg+" time is invalid. Please use a value of the form 'HH:MM AM/PM'");
        // field.focus();
        // return false;
        return msg+" is invalid. Please use a value of the form 'HH:MM AM/PM'.";
    }

    if (ampm_field==null) {
        if (!is24hr) {
            value=s+" "+suffix;
        } else {
            value=s;
        }
    } else {
        value=s;
        if (ampm_field[0].value.toLowerCase() == suffix) {
            if (!ampm_field[0].checked) {
                ampm_field[1].checked=false;
                ampm_field[0].checked=true;
            }
        }
        else {
            if (!ampm_field[1].checked) {
                ampm_field[0].checked=false;
                ampm_field[1].checked=true;
            }
        }
    }

    return "";
}


function is24HR() {
    // return `_time_format_type` > 0;
    const {_time_format_type} = window.__permitDetail__.__initialState__;
    return _time_format_type > 0;
}
