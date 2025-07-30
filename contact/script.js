// Contact Page JavaScript

class ContactPage {
    constructor() {
        this.form = document.getElementById('appointmentForm');
        this.submitBtn = document.getElementById('submitBtn');
        this.successMessage = document.getElementById('successMessage');
        this.characterCount = document.getElementById('characterCount');
        this.messageTextarea = document.querySelector('textarea[name="message"]');
        this.bookAnotherBtn = document.getElementById('bookAnotherBtn');
        
        this.init();
    }

    init() {
        if (!this.form) return;

        // Form event listeners
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.form.addEventListener('input', (e) => this.handleInput(e));
        this.form.addEventListener('blur', (e) => this.handleBlur(e), true);
        
        // Character count for textarea
        if (this.messageTextarea) {
            this.updateCharacterCount();
        }

        // Book another appointment button
        if (this.bookAnotherBtn) {
            this.bookAnotherBtn.addEventListener('click', () => this.resetForm());
        }

        // Copy functionality for contact details
        this.initCopyFunctionality();
        
        // Set minimum date to today
        this.setMinimumDate();
        
        // Initialize animations
        this.initAnimations();
    }

    handleInput(e) {
        const field = e.target;
        
        // Clear error state on input
        this.clearFieldError(field);
        
        // Handle character count for textarea
        if (field.name === 'message') {
            this.updateCharacterCount();
        }
        
        // Real-time validation for specific fields
        if (field.type === 'email' && field.value) {
            this.validateEmail(field, false);
        }
        
        if (field.type === 'tel' && field.value) {
            this.validatePhone(field, false);
        }
    }

    handleBlur(e) {
        const field = e.target;
        
        // Validate field on blur if it has a value or is required
        if (field.required || field.value.trim()) {
            this.validateField(field);
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        // Show loading state
        this.setLoadingState(true);
        
        // Validate all fields
        const isValid = this.validateForm();
        
        if (isValid) {
            // Simulate form submission
            setTimeout(() => {
                this.showSuccess();
                this.setLoadingState(false);
            }, 2000);
        } else {
            this.setLoadingState(false);
            // Scroll to first error
            const firstError = this.form.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
        }
    }

    validateForm() {
        let isValid = true;
        const fields = this.form.querySelectorAll('input, select, textarea');
        
        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Required field validation
        if (field.required && !value) {
            errorMessage = `${this.getFieldLabel(field)} is required`;
            isValid = false;
        }
        // Email validation
        else if (field.type === 'email' && value) {
            isValid = this.validateEmail(field);
        }
        // Phone validation
        else if (field.type === 'tel' && value) {
            isValid = this.validatePhone(field);
        }
        // Name validation
        else if (field.name === 'fullName' && value) {
            if (!/^[a-zA-Z\s'-]+$/.test(value)) {
                errorMessage = 'Please enter a valid name (letters only)';
                isValid = false;
            } else if (value.length < 2) {
                errorMessage = 'Name must be at least 2 characters long';
                isValid = false;
            }
        }
        // Date validation
        else if (field.type === 'date' && value) {
            const selectedDate = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                errorMessage = 'Please select a future date';
                isValid = false;
            }
            
            // Check if selected date is a weekend (optional business rule)
            const dayOfWeek = selectedDate.getDay();
            if (dayOfWeek === 0) { // Sunday
                errorMessage = 'We are closed on Sundays. Please select another date';
                isValid = false;
            }
        }

        // Show/hide error
        if (!isValid && errorMessage) {
            this.showFieldError(field, errorMessage);
        } else {
            this.clearFieldError(field);
        }

        return isValid;
    }

    validateEmail(field, showError = true) {
        const email = field.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
            if (showError) {
                this.showFieldError(field, 'Please enter a valid email address');
            }
            return false;
        }
        
        this.clearFieldError(field);
        return true;
    }

    validatePhone(field, showError = true) {
        const phone = field.value.trim();
        // Allow various phone formats
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        
        if (!phoneRegex.test(phone.replace(/[\s\-$$$$]/g, ''))) {
            if (showError) {
                this.showFieldError(field, 'Please enter a valid phone number');
            }
            return false;
        }
        
        this.clearFieldError(field);
        return true;
    }

    showFieldError(field, message) {
        field.classList.add('error');
        const errorElement = document.getElementById(`${field.name}-error`);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = document.getElementById(`${field.name}-error`);
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.remove('show');
        }
    }

    getFieldLabel(field) {
        const label = field.closest('.input-group')?.querySelector('.form-label');
        return label ? label.textContent.replace('*', '') : field.name;
    }

    updateCharacterCount() {
        if (!this.messageTextarea || !this.characterCount) return;
        
        const maxLength = 500;
        const currentLength = this.messageTextarea.value.length;
        const remaining = maxLength - currentLength;
        
        this.characterCount.textContent = `${remaining} characters remaining`;
        
        // Update styling based on remaining characters
        this.characterCount.classList.remove('warning', 'danger');
        if (remaining < 100) {
            this.characterCount.classList.add('warning');
        }
        if (remaining < 20) {
            this.characterCount.classList.add('danger');
        }
    }

    setLoadingState(loading) {
        if (loading) {
            this.submitBtn.disabled = true;
            this.submitBtn.classList.add('loading');
            this.submitBtn.querySelector('.btn-text').textContent = 'Booking...';
        } else {
            this.submitBtn.disabled = false;
            this.submitBtn.classList.remove('loading');
            this.submitBtn.querySelector('.btn-text').textContent = 'Book Appointment';
        }
    }

    showSuccess() {
        // Hide form and show success message
        this.form.style.display = 'none';
        this.successMessage.classList.add('show');
        
        // Scroll to success message
        this.successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    resetForm() {
        // Reset form
        this.form.reset();
        this.form.style.display = 'block';
        this.successMessage.classList.remove('show');
        
        // Clear all errors
        const errorElements = this.form.querySelectorAll('.error-message');
        errorElements.forEach(el => {
            el.textContent = '';
            el.classList.remove('show');
        });
        
        const errorFields = this.form.querySelectorAll('.error');
        errorFields.forEach(field => field.classList.remove('error'));
        
        // Reset character count
        this.updateCharacterCount();
        
        // Scroll back to form
        this.form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    setMinimumDate() {
        const dateInput = this.form.querySelector('input[type="date"]');
        if (dateInput) {
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            dateInput.min = tomorrow.toISOString().split('T')[0];
        }
    }

    initCopyFunctionality() {
        const copyableElements = document.querySelectorAll('.copyable');
        
        copyableElements.forEach(element => {
            element.addEventListener('click', () => {
                const textToCopy = element.getAttribute('data-copy') || element.textContent;
                this.copyToClipboard(textToCopy);
                this.showCopyFeedback(element);
            });
        });
    }

    copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).catch(() => {
                this.fallbackCopyToClipboard(text);
            });
        } else {
            this.fallbackCopyToClipboard(text);
        }
    }

    fallbackCopyToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }
        
        document.body.removeChild(textArea);
    }

    showCopyFeedback(element) {
        const originalText = element.textContent;
        element.textContent = 'Copied!';
        element.style.color = '#28a745';
        element.style.fontWeight = 'bold';
        
        setTimeout(() => {
            element.textContent = originalText;
            element.style.color = '';
            element.style.fontWeight = '';
        }, 1500);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContactPage();
});

// Add page load animation
window.addEventListener('load', () => {
    const hero = document.querySelector('.contact-hero');
    if (hero) {
        hero.style.opacity = '0';
        hero.style.transform = 'translateY(-20px)';
        hero.style.transition = 'all 1s ease';
        
        setTimeout(() => {
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
        }, 200);
    }
});