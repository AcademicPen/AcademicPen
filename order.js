document.addEventListener('DOMContentLoaded', () => {
    // Button group functionality
    const handleButtonGroup = (containerClass) => {
        const containers = document.querySelectorAll(`.${containerClass}`);
        containers.forEach(container => {
            const buttons = container.querySelectorAll('button');
            buttons.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    buttons.forEach(b => b.classList.remove('active'));
                    button.classList.add('active');
                });
            });
        });
    };

    // Initialize button groups
    ['academic-level', 'paper-format', 'currency', 'deadline', 'category'].forEach(group => {
        handleButtonGroup(group);
    });

    // File upload handling
    const fileUpload = document.querySelector('.file-upload');
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.hidden = true;
    
    fileUpload.querySelector('button').addEventListener('click', (e) => {
        e.preventDefault();
        fileInput.click();
    });

    fileInput.addEventListener('change', handleFileSelect);
    fileUpload.addEventListener('dragover', (e) => {
        e.preventDefault();
        fileUpload.classList.add('dragover');
    });
    fileUpload.addEventListener('dragleave', () => {
        fileUpload.classList.remove('dragover');
    });
    fileUpload.addEventListener('drop', (e) => {
        e.preventDefault();
        fileUpload.classList.remove('dragover');
        fileInput.files = e.dataTransfer.files;
        handleFileSelect();
    });

    function handleFileSelect() {
        if (fileInput.files.length > 0) {
            fileUpload.querySelector('span').textContent = fileInput.files[0].name;
        }
    }

    // Page counter with proper increment/decrement
    const pageCounter = document.querySelector('.counter span');
    document.querySelector('.counter').addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            let count = parseInt(pageCounter.textContent) || 1;
            if (e.target.textContent === '+') {
                count++;
            } else {
                count = Math.max(1, count - 1);
            }
            pageCounter.textContent = count;
        }
    });

    // Discount code handling
    document.querySelector('.discount button').addEventListener('click', (e) => {
        e.preventDefault();
        const code = document.querySelector('.discount input').value;
        if (code) {
            alert('Discount code applied!');
        }
    });

    // WhatsApp contact button
    document.getElementById('whatsappBtn').addEventListener('click', (e) => {
        e.preventDefault();
        window.open(`https://wa.me/254743144115`, '_blank');
    });

    // Form submission handler
    document.getElementById('submitOrder').addEventListener('click', async (e) => {
        e.preventDefault();

        // Collect all form data
        const formData = {
            'Type of Paper': document.querySelector('select').value,
            'Academic Level': document.querySelector('.academic-level .active').textContent,
            'Subject': document.querySelector('input[placeholder="Enter subject"]').value,
            'Title': document.querySelector('input[placeholder="Enter title"]').value,
            'Instructions': document.querySelector('textarea').value,
            'Paper Format': document.querySelector('.paper-format .active').textContent,
            'Number of Pages': document.querySelector('.counter span').textContent,
            'Currency': document.querySelector('.currency .active').textContent,
            'Deadline': document.querySelector('.deadline .active').textContent,
            'Category': document.querySelector('.category .active').textContent,
            'Additional Services': Array.from(document.querySelectorAll('.additional-services input:checked'))
                                   .map(checkbox => checkbox.parentElement.textContent.trim()).join(', ')
        };

        // Create PDF
        const doc = new jspdf.jsPDF();
        let yPos = 20;
        
        Object.entries(formData).forEach(([key, value]) => {
            if (value) {
                doc.text(`${key}: ${value}`, 20, yPos);
                yPos += 10;
            }
        });

        // Save PDF
        const pdfBlob = doc.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);

        // Prepare WhatsApp message
        const message = `New Order Submission\n*Please find attached order details*`;
        const whatsappUrl = `https://web.whatsapp.com/send?phone=254743144115&text=${encodeURIComponent(message)}`;

        // Open WhatsApp Web
        const whatsappWindow = window.open(whatsappUrl, '_blank');
        
        // Automatically download PDF
        const downloadLink = document.createElement('a');
        downloadLink.href = pdfUrl;
        downloadLink.download = 'order-details.pdf';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        // Show attachment reminder after short delay
        setTimeout(() => {
            alert('Please attach the downloaded PDF file in WhatsApp Web:\n1. Click the paperclip icon\n2. Select "Document"\n3. Choose the downloaded "order-details.pdf" file\n4. Press send');
        }, 3000);
    });

    // Signup button handler
    document.querySelector('.signup-btn').addEventListener('click', (e) => {
        e.preventDefault();
        // Add signup logic here
    });
});