 document.addEventListener('DOMContentLoaded', function() {
            // Elements
            const backBtn = document.getElementById('backBtn');
            const methodItems = document.querySelectorAll('.method-item');
            const paymentForms = document.querySelectorAll('.payment-form');
            const submitBtns = document.querySelectorAll('.submit-btn');
            const methodsScreen = document.getElementById('methodsScreen');
            const confirmationScreen = document.getElementById('confirmationScreen');
            const doneBtn = document.getElementById('doneBtn');
            const mainFooter = document.getElementById('mainFooter');
            
            // Current selected method
            let currentMethod = null;
            
            // Handle method selection
            methodItems.forEach(item => {
                item.addEventListener('click', function() {
                    const method = this.getAttribute('data-method');
                    
                    // Update UI
                    methodItems.forEach(i => i.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Hide all forms
                    paymentForms.forEach(form => form.classList.remove('active'));
                    
                    // Show selected form
                    document.getElementById(`${method}Form`).classList.add('active');
                    
                    // Update current method
                    currentMethod = method;
                });
            });
            
            // Handle back button
            backBtn.addEventListener('click', function() {
                if (confirmationScreen.classList.contains('active')) {
                    // From confirmation back to methods
                    confirmationScreen.classList.remove('active');
                    methodsScreen.style.display = 'block';
                    mainFooter.style.display = 'block';
                } else if (currentMethod) {
                    // From form back to methods
                    document.querySelector(`.method-item[data-method="${currentMethod}"]`).classList.remove('active');
                    paymentForms.forEach(form => form.classList.remove('active'));
                    currentMethod = null;
                } else {
                    // In a real app, this would go back to the previous page
                    alert('Returning to checkout...');
                }
            });
            
            // Handle form submissions
            submitBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    // Validate form first
                    let isValid = true;
                    const formId = this.id.replace('Submit', 'Form');
                    const form = document.getElementById(formId);
                    
                    // Simple validation - in a real app you'd want more robust validation
                    const inputs = form.querySelectorAll('input[required], select[required]');
                    inputs.forEach(input => {
                        if (!input.value) {
                            isValid = false;
                            input.style.borderColor = '#e74c3c';
                            setTimeout(() => {
                                input.style.borderColor = '';
                            }, 2000);
                        }
                    });
                    
                    if (!isValid) {
                        alert('Please fill in all required fields');
                        return;
                    }
                    
                    // Show loading state
                    this.classList.add('loading');
                    
                    // Simulate payment processing
                    setTimeout(() => {
                        this.classList.remove('loading');
                        
                        // Hide methods and form
                        methodsScreen.style.display = 'none';
                        paymentForms.forEach(form => form.classList.remove('active'));
                        mainFooter.style.display = 'none';
                        
                        // Set confirmation details
                        document.getElementById('confirmMethod').textContent = 
                            currentMethod === 'mtn' ? 'MTN Mobile Money' :
                            currentMethod === 'paypal' ? 'PayPal' :
                            currentMethod === 'card' ? 'Credit/Debit Card' : 'Cryptocurrency';
                        
                        document.getElementById('confirmAmount').textContent = 
                            currentMethod === 'mtn' ? document.getElementById('mtnAmount').value + ' UGX' :
                            currentMethod === 'paypal' ? '$' + document.getElementById('paypalAmount').value :
                            currentMethod === 'card' ? '$' + document.getElementById('cardAmount').value : '0.0025 BTC';
                        
                        // Show confirmation
                        confirmationScreen.classList.add('active');
                        
                        // Reset current method
                        if (currentMethod) {
                            document.querySelector(`.method-item[data-method="${currentMethod}"]`).classList.remove('active');
                            currentMethod = null;
                        }
                    }, 2000);
                });
            });
            
            // Handle done button
            doneBtn.addEventListener('click', function() {
                // In a real app, this would redirect to a success page
                alert('Payment completed successfully!');
                
                // Reset the UI
                confirmationScreen.classList.remove('active');
                methodsScreen.style.display = 'block';
                mainFooter.style.display = 'block';
            });
            
            // Input formatting for better UX
            const cardNumber = document.getElementById('cardNumber');
            if (cardNumber) {
                cardNumber.addEventListener('input', function(e) {
                    let value = this.value.replace(/\s+/g, '');
                    if (value.length > 0) {
                        value = value.match(new RegExp('.{1,4}', 'g')).join(' ');
                    }
                    this.value = value;
                });
            }
            
            const cardExpiry = document.getElementById('cardExpiry');
            if (cardExpiry) {
                cardExpiry.addEventListener('input', function(e) {
                    let value = this.value.replace(/\D/g, '');
                    if (value.length > 2) {
                        value = value.substring(0, 2) + '/' + value.substring(2, 4);
                    }
                    this.value = value;
                });
            }
            
            // Copy crypto address
            const copyBtn = document.querySelector('button[aria-label="Copy Address"]');
            if (copyBtn) {
                copyBtn.addEventListener('click', function() {
                    const address = '3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5';
                    navigator.clipboard.writeText(address).then(() => {
                        const originalText = this.innerHTML;
                        this.innerHTML = '<i class="fas fa-check"></i> Copied!';
                        setTimeout(() => {
                            this.innerHTML = originalText;
                        }, 2000);
                    });
                });
            }
            
            // Currency conversion for PayPal/Card
            const ugxAmount = 50000;
            const usdAmount = 13.50;
            
            const paypalAmount = document.getElementById('paypalAmount');
            if (paypalAmount) {
                paypalAmount.addEventListener('input', function() {
                    const usd = parseFloat(this.value) || 0;
                    const ugx = Math.round(usd * (ugxAmount / usdAmount));
                    this.nextElementSibling.textContent = `${ugx.toLocaleString()} UGX ≈ ${usd.toFixed(2)} USD`;
                });
            }
            
            const cardAmount = document.getElementById('cardAmount');
            if (cardAmount) {
                cardAmount.addEventListener('input', function() {
                    const usd = parseFloat(this.value) || 0;
                    const ugx = Math.round(usd * (ugxAmount / usdAmount));
                    this.nextElementSibling.textContent = `${ugx.toLocaleString()} UGX ≈ ${usd.toFixed(2)} USD`;
                    document.getElementById('cardSubmit').querySelector('span').textContent = `Pay $${usd.toFixed(2)}`;
                });
            }
            
            // MTN number validation
            const mtnNumber = document.getElementById('mtnNumber');
            if (mtnNumber) {
                mtnNumber.addEventListener('input', function() {
                    this.value = this.value.replace(/\D/g, '').substring(0, 9);
                });
            }
            
            // MTN PIN validation
            const mtnPin = document.getElementById('mtnPin');
            if (mtnPin) {
                mtnPin.addEventListener('input', function() {
                    this.value = this.value.replace(/\D/g, '').substring(0, 4);
                });
            }
        });