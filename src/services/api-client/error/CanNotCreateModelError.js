export class CanNotCreateModelError extends Error {
  /**
   * @param {string} modelName
   * @returns {CanNotCreateModelError}
   */
  static create(modelName) {
    const message = `Can not create model "${modelName}"`;
    return new CanNotCreateModelError(message);
  }
}