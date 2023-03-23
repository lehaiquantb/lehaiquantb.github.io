import _ from 'lodash';

export const smoothSignal = (src: number[], sigma = 8) => {
  /*
    1-D Gaussian filter
    Parameters
    ----------
    input: array
          a series of signal needs to be smoothed
    sigma : integer
        standard deviation for Gaussian kernel
        Default is 4.0.

    Returns
    -------
    output: array
          smooth signal
    */

  //define length of window
  var win = sigma * 2 - 1;

  // weight of the each window
  let weight = _.range(win).map(function () {
    return 1.0;
  });
  let weightGauss: number[] = [];

  _.forEach(_.range(win), i => {
    i = i - sigma + 1;
    let frac = i / win;
    let gauss = 1 / Math.exp(4 * frac * (4 * frac));
    weightGauss.push(gauss);
  });

  weight = (_.zip(weightGauss, weight) as number[][]).map(function (x) {
    return x[0] * x[1];
  });
  let smoothed = _.range(src.length + 1 - win).map(function () {
    return 0.0;
  });
  for (let i = 0; i < smoothed.length; i++) {
    smoothed[i] =
      (_.zip(src.slice(i, i + win), weight) as number[][])
        .map(function (x) {
          return x[0] * x[1];
        })
        .reduce(function (memo, num) {
          return memo + num;
        }, 0) /
      _.reduce(
        weight,
        function (memo, num) {
          return memo + num;
        },
        0,
      );
  }

  return smoothed;
};

export const gaussian = (src: number[], sigma = 75) => {
  const count = Math.floor(0.02 * src.length);
  let maxStart = 0;
  let maxEnd = 0;
  for (let index = 0; index < count; index++) {
    if (maxStart < src[index]) {
      maxStart = src[index];
    }
  }
  for (let index = src.length - count; index < src.length; index++) {
    if (maxEnd < src[index]) {
      maxEnd = src[index];
    }
  }
  let arrayHead = Array(sigma - 1).fill(maxStart);
  let arrayTail = Array(sigma - 1).fill(maxEnd);
  src = arrayHead.concat(src, arrayTail);
  return smoothSignal(src, sigma);
};
