//Initialize Quill editor
document.addEventListener("DOMContentLoaded", function() {
    var quill = new Quill('#editor-container', {
      theme: 'snow'
    });

    const form = document.getElementById('benefit-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const formData = new FormData(form);
        const benefitName = formData.get('benefit-name');
        const description = formData.get('description');
        var content = quill.root.innerHTML;
        const iconImage = formData.get('icon-image');

        console.log('Benefit Name:', benefitName);
        console.log('Description:', description);
        console.log('Content:', content);
        console.log('Icon/Image:', iconImage);
        
        // Example: Send data to the server
        // fetch('/your-server-endpoint', {
        //     method: 'POST',
        //     body: formData
        // }).then(response => response.json())
        // .then(data => {
        //     console.log(data);
        // }).catch(error => {
        //     console.error('Error:', error);
        // });
    });
});
