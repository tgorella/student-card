export function validator (data, config) {
  const errors = {};
  function validate (validateMethod, data, config) {
    let statusValidate;
    switch (validateMethod) {
      case "isRequired":
        if (typeof data === "boolean") {
          statusValidate = !data;
        } else {
          if (data.trim() === "") return config.message;
        }
        break;
      case "isUrl": {
        const urlRegExp = /^(?:http)s?:\/\/\S+\.\S+/g;
        statusValidate = !urlRegExp.test(data);
        break;
      }
      case "isDigits": {
        const yearRegExp = /^\d{4}$/g;
        statusValidate = !yearRegExp.test(data);
        break;
      }
			case "isCorrectValue": {
        statusValidate = !(Number(data) < (new Date().getFullYear()-13) && Number(data) > (new Date().getFullYear()-80));
        break;
      }

      default:
        break;
    }
    if (statusValidate) {
      return config.message;
    }
  }

  for (const fieldName in data) {
    for (const validateMethod in config[fieldName]) {
      const error = validate(
        validateMethod,
        data[fieldName],
        config[fieldName][validateMethod]
      );
      if (error && !errors[fieldName]) {
        errors[fieldName] = error;
      }
    }
  }
  return errors;
}
