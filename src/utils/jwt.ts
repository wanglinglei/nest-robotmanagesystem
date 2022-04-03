// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require('jsonwebtoken');

const secret = 'robot';

export function creatToken({ userNumber }) {
  return jwt.sign({ userNumber }, secret);
}

export function parsingToken(token) {
  try {
    const result = jwt.verify(token, secret) || {};
    return result;
  } catch (error) {
    return {};
  }
}
