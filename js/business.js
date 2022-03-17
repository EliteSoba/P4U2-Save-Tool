(function(self) {
  var TITLES_START = 0x000D95B8;
  var TITLES_END = 0x000DA69E;
  var TITLE_LENGTH = 0x01;
  var TITLE_DISABLED = 0x02;
  var TITLE_ENABLED = 0x05;
  var ICONS_START = 0x000D6490;
  var ICONS_END = 0x000D7FE4;
  var ICON_LENGTH = 0x04;
  var ICON_DISABLED = 0x04;
  var ICON_ENABLED = 0x05;
  var MONEY_LOCATION = 0x000E64FC;
  var MONEY_LENGTH = 0x04;
  var MAX_DISPLAYABLE_MONEY = 9_999_999;

  var readData = function(fileData, loc, length) {
    var out = 0;
    for (let i = length - 1; i >= 0; i--) {
      out *= 0x100;
      out += fileData[loc + i];
    }
    return out;
  }

  var writeData = function(fileData, loc, length, content) {
    var c = content;
    for (let i = 0; i < length; i++) {
      fileData[loc + i] = c % 0x100;

      c = c >> 8;
    }
  }

  var enableAllTitles = function(fileData) {
    for (let i = TITLES_START; i <= TITLES_END; i += TITLE_LENGTH) {
      if (readData(fileData, i, TITLE_LENGTH) === TITLE_DISABLED) {
        writeData(fileData, i, TITLE_LENGTH, TITLE_ENABLED);
      }
    }
  }

  var enableAllIcons = function(fileData) {
    for (let i = ICONS_START; i <= ICONS_END; i += ICON_LENGTH) {
      if (readData(fileData, i, ICON_LENGTH) === ICON_DISABLED) {
        writeData(fileData, i, ICON_LENGTH, ICON_ENABLED);
      }
    }
  }

  var setMaxMoney = function(fileData) {
    writeData(fileData, MONEY_LOCATION, MONEY_LENGTH, MAX_DISPLAYABLE_MONEY);
  }

  var promptSave = function(fileData) {
    var blob = new Blob([fileData])
    var a = window.document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = 'save.dat';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  var doLogic = function(options) {
    var fileData = options.fileData;
    var allTitles = options.allTitles;
    var allIcons = options.allIcons;
    var maxMoney = options.maxMoney;

    if (allTitles) {
      enableAllTitles(fileData);
    }

    if (allIcons) {
      enableAllIcons(fileData);
    }

    if (maxMoney) {
      setMaxMoney(fileData);
    }

    promptSave(fileData);
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
