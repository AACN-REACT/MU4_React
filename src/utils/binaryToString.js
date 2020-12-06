



export function bin2String(array) {
    var result = "";
    for (var i = 0; i < array.length; i++) {
      result += String.fromCharCode(array[i]);
    }

    let deserialized = JSON.parse(result);

    let message ="a network error occured";

    if(deserialized.errors)
    {message = deserialized.errors.key[0] }
    else if (deserialized.error)
    {message=deserialized.error}
    return message
  }