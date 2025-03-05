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

    // Pricing Logic
    const basePrice = 15; // Price per page
    const depositPercentage = 0.33; // 33% of total price

    // Page Counter and Price Calculation
    const pageCounter = document.querySelector('.counter span');
    const totalPriceElement = document.getElementById('totalPrice');
    const depositPriceElement = document.querySelector('.price-info p:nth-child(2) span');

    document.querySelector('.counter').addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            let count = parseInt(pageCounter.textContent) || 1;
            if (e.target.textContent === '+') {
                count++;
            } else {
                count = Math.max(1, count - 1);
            }
            pageCounter.textContent = count;

            // Update Pricing
            const total = count * basePrice;
            const deposit = Math.ceil(total * depositPercentage);
            totalPriceElement.textContent = total;
            depositPriceElement.textContent = deposit;
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

        // Collect form data
        const formData = {
            'Type of Paper': document.querySelector('select').value,
            'Academic Level': document.querySelector('.academic-level .active')?.textContent || 'Not selected',
            'Subject': document.querySelector('input[placeholder="Enter subject"]').value,
            'Title': document.querySelector('input[placeholder="Enter title"]').value,
            'Instructions': document.querySelector('textarea').value,
            'Paper Format': document.querySelector('.paper-format .active')?.textContent || 'Not selected',
            'Number of Pages': pageCounter.textContent,
            'Total Price': `$${totalPriceElement.textContent}`,
            'Deposit Required': `$${depositPriceElement.textContent}`,
            'Currency': document.querySelector('.currency .active')?.textContent || 'USD',
            'Deadline': document.querySelector('.deadline .active')?.textContent || 'Not selected',
            'Category': document.querySelector('.category .active')?.textContent || 'Not selected',
            'Additional Services': Array.from(document.querySelectorAll('.additional-services input:checked'))
                .map(checkbox => checkbox.parentElement.textContent.trim()).join(', ') || 'None'
        };

        // Format WhatsApp Message
        let message = `📄 *New Order Submission*\n\n`;
        Object.entries(formData).forEach(([key, value]) => {
            message += `🔹 *${key}*: ${value}\n`;
        });

        message += `\n✅ *Please review and confirm your order!*`;

        // Encode for WhatsApp
        const phone = "254743144115";
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;

        // Open WhatsApp (Mobile Friendly)
        window.open(whatsappUrl, '_blank');
    });

    // Signup button handler
    document.querySelector('.signup-btn').addEventListener('click', (e) => {
        e.preventDefault();
        // Add signup logic here
    });
});
