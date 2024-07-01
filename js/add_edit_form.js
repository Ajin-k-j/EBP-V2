document.addEventListener("DOMContentLoaded", function() {
    ClassicEditor
        .create(document.querySelector('#editor'), {
            toolbar: {
                items: [
                    'heading', '|',
                    'bold', 'italic', 'underline', 'link', '|',
                    'bulletedList', 'numberedList', 'blockQuote', '|',
                    'textColor'
                ]
            },
            language: 'en',
            licenseKey: '',

        })
        .then(editor => {
            window.editor = editor;
        })
        .catch(error => {
            console.error('Oops, something went wrong!');
            console.error('Please, report the following error.');
            console.error(error);
        });

    const form = document.getElementById('benefit-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const formData = new FormData(form);
        const benefitName = formData.get('benefit-name');
        const description = formData.get('description');
        const content = tinymce.get('content').getContent();
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
