// @flow

function square(x: ?number) {
  if (x) {
    return x * x;
  } else {
    return NaN;
  }
}

const numb: number = '';
