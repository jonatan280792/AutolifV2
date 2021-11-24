import {
  localSessionPersistence,
  sessionPersistence,
} from '@utils/session-persistence.util';

const setLanguage = (keyName) => {
  let valueString = localStorage.getItem(keyName);

  if (!valueString) {
    localSessionPersistence.setRawString(keyName, 'es');
    valueString = localStorage.getItem(keyName);
  } else {
    return valueString;
  }
};

export { setLanguage };