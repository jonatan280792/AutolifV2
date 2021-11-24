const enterOnlyNumbers = form => (event, property) => {
  const { value } = event.target;
  const withNoDigits = value.replace(/[^0-9]+/g, '');

  form.controls[property].setValue(withNoDigits);
};

export { enterOnlyNumbers };
