
// Add event listeners for drag and drop
var dropZone = document.getElementById('dropZone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);

function handleDragOver(event) {
    event.stopPropagation();
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
}

function handleFileSelect(event) {
    event.stopPropagation();
    event.preventDefault();
  
    var files = event.dataTransfer.files; // FileList object
    var reader = new FileReader();

    reader.onload = function(event) {
        document.getElementById('textInput').value = event.target.result;
    };

    reader.readAsText(files[0]); // Read the first dropped file as text
}

function extractURLsOnDrop() {
    extractURLs(); // Extract URLs after dropping the file
}


function extractURLs() {
    var text = document.getElementById('textInput').value;
    var urls = text.match(/\bhttps?:\/\/\S+/gi);
    var urlListDiv = document.getElementById('urlList');
    urlListDiv.innerHTML = '';

    if (urls) {
        urls.forEach(function(url) {
            var urlElement = document.createElement('div');
            urlElement.className = 'url';
            urlElement.textContent = url;
            urlListDiv.appendChild(urlElement);
        });
    } else {
        urlListDiv.textContent = 'No URLs found in the text.';
    }
}

function copyURLs() {
    var urls = document.querySelectorAll('.url');
    var urlsText = '';

    urls.forEach(function(url) {
        urlsText += url.textContent + '\n';
    });

    navigator.clipboard.writeText(urlsText)
        .then(function() {
            alert('URLs copied to clipboard!');
        })
        .catch(function(error) {
            console.error('Failed to copy URLs: ', error);
        });
}

function saveToFile() {
    var urls = document.querySelectorAll('.url');
    var fileName = document.getElementById('fileNameInput').value;
    var fileFormat = document.getElementById('fileFormat').value;
    var urlsData = '';

    urls.forEach(function(url) {
        urlsData += url.textContent + '\n';
    });

    var blob = new Blob([urlsData], { type: 'text/' + fileFormat });
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName + '.' + fileFormat;
    link.click();
}
    
