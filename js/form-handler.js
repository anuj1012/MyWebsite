// Handle form submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: this.querySelector('input[type="text"]').value,
                email: this.querySelector('input[type="email"]').value,
                message: this.querySelector('textarea').value
            };
            
            try {
                // Show loading state
                const submitButton = this.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
                
                // In a real implementation, you would send the data to your backend
                // For now, we'll simulate a successful submission
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Show success message
                alert('Thank you for your message! I will get back to you soon.');
                
                // Clear form
                this.reset();
            } catch (error) {
                alert('Sorry, there was an error sending your message. Please try again later.');
                console.error('Form submission error:', error);
            } finally {
                // Reset button state
                const submitButton = this.querySelector('button[type="submit"]');
                submitButton.textContent = 'Send Message';
                submitButton.disabled = false;
            }
        });
    }
});