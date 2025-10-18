const formatValidationResult = (validationResultObj) => {
  // validationResultObj es el resultado de validationResult(req)
  const mapped = validationResultObj.mapped();
  const errors = Object.keys(mapped).map(key => {
    const item = mapped[key];
    return {
      field: key,
      msg: item.msg || (item.message ? item.message : 'Invalid value'),
      value: item.value,
      location: item.location || 'body'
    }
  });
  return { errors };
}

module.exports = { formatValidationResult };
