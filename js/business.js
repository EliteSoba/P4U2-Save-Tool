(function(self) {

  var doLogic = function(options) {
    var fileData = options.fileData;
    var allTitles = options.allTitles;
    var allIcons = options.allIcons;
    var maxMoney = options.maxMoney;

    if (allTitles) {

    }
  }

  var exports = {
    doLogic: doLogic
  };
  if (self) {
    self.magic = Object.assign(self.magic || {}, { business: exports });
  }
  else {
    module.exports = exports
  }
})(typeof(self) !== 'undefined' ? self : null)
