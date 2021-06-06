export function validateName(name = ''): boolean {
  const regExp = /^[a-zA-Zа-яА-Я][a-zA-Z0-9\s]{1,30}$/;
  if (regExp.test(name)) return true;
  return false;
}

export function validateSurname(surname = ''): boolean {
  const regExp = /^[a-zA-Zа-яА-Я][a-zA-Z0-9\s]{1,30}$/;
  if (regExp.test(surname)) return true;
  return false;
}

export function validateEmail(email = ''): boolean {
  const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regExp.test(email)) return true;
  return false;
}
