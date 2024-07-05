class Drive_Initialization_Error extends Error {
  constructor(message) {
    super(message);
    this.name = "Drive_Initialization_Error";
  }
}

module.exports = { Drive_Initialization_Error };