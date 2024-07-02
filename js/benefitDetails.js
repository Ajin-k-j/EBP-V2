//Initialize Quill editor
document.addEventListener("DOMContentLoaded", function() {
    var quill = new Quill('#editor-container', {
      theme: 'snow'
    });

  // Get the display content button and output div
  var displayContentBtn = document.getElementById('display-content-btn');
  var outputDiv = document.getElementById('output');

  // Add click event listener to the button
  displayContentBtn.addEventListener('click', function() {
    // Get the HTML content from the editor
    var content = quill.root.innerHTML;
    console.log(content);
    // Display the content in the output div
    outputDiv.innerHTML = content;
  });

});