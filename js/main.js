(function(window) {
  var business = magic.business;

  var fileData = null;
  var fileInput = document.getElementById('file-input');

  var enableSubmit = function() {
    var submitButton = document.getElementById('submit-button');
    submitButton.removeAttribute('disabled');
  }

  var dragListener = function(e) {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';
  }
  var dropListener = function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items) {
      [...e.dataTransfer.items].forEach(function(i) {
        if (i.kind === 'file') {
          fileData = i.getAsFile();
        }
      });
    }
    else {
      fileData = e.dataTransfer.files[e.dataTransfer.files.length - 1];
    }

    var dT = new DataTransfer();
    dT.items.add(fileData);
    fileInput.files = dT.files;

    enableSubmit();
  }

  var addDropListener = function() {
    var target = document.getElementById('upload-region');
    target.addEventListener('dragover', dragListener);
    target.addEventListener('drop', dropListener);
  }

  var fileChangeListener = function(e) {
    if (fileInput.files[0]) {
      fileData = fileInput.files[0];
      enableSubmit();
    }
  }

  var addFileInputHandler = function() {
    var target = fileInput;
    target.addEventListener('change', fileChangeListener);
  }

  var submitListener = function(e) {
    e.preventDefault();
    e.stopPropagation();

    var allTitles = document.getElementById('unlock-titles').checked;
    var allIcons = document.getElementById('unlock-icons').checked;
    var maxMoney = document.getElementById('max-money').checked;

    business.doLogic({
      fileData: fileData,
      allTitles: allTitles,
      allIcons: allIcons,
      maxMoney: maxMoney
    });
  }

  var addSubmitHandler = function() {
    var target = document.getElementById('data-form');
    target.addEventListener('submit', submitListener);
  }

  addDropListener();
  addFileInputHandler();
  addSubmitHandler();

})(typeof(window) !== 'undefined' ? window : null);
