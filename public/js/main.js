// JS File Goes Here
// "myAwesomeDropzone" is the camelized version of the HTML element's ID
Dropzone.options.myAwesomeDropzone = {
    paramName: "myFile", // The name that will be used to transfer the file
    maxFilesize: 2, // MB
    accept: function(file, done) {
      if (file.name == "noname.jpg") {
        done("Na, you don't.");
      }
      else { done(); }
    }
  };