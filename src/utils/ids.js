/**
 * Generate Public IDs
 */

const idLength = 20;
const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

module.exports = {
  new: function() {
    var id = "";
    for (let i = 0; i < idLength; i++) {
      id += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return id;
  }
};
