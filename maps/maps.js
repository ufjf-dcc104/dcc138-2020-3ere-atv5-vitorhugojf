const map = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1],
  [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 2, 0, 0, 0, 0, 3, 3, 0, 2, 1, 2, 2, 1],
  [1, 2, 2, 0, 0, 0, 3, 0, 2, 2, 1, 2, 2, 1],
  [1, 2, 2, 0, 0, 0, 0, 2, 1, 2, 1, 2, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2, 2, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

function getTypeValue(type) {
  if (type == null) {
    return { x: 0, y: 0, shallNotPass: true };
  }

  if (type === 0) {
    return { x: 40, y: 6, shallNotPass: false };
  }
  if (type === 1) {
    return { x: 12, y: 2, shallNotPass: true };
  }
  if (type === 2) {
    return { x: 12, y: 6, shallNotPass: false };
  }
  if (type === 3) {
    return { x: 60, y: 2, shallNotPass: true };
  } else {
    return { x: 0, y: 0, shallNotPass: true };
  }
}

export { map, getTypeValue };
