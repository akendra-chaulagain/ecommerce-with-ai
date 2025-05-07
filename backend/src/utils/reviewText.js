

export const generateReviewThankYouEmail = (userName, comment, rating) => {
  return `Dear ${userName},

Thank you for taking the time to share your review with us. We truly appreciate your feedback, as it helps us continually improve our products and services.

Here’s a summary of your review:
----------------------------------------
Review: "${comment}"
Rating: ${rating} out of 5
----------------------------------------

We’re grateful for your support and hope to continue serving you with excellence.

Warm regards,  
The E-Commerce Team`;
};
