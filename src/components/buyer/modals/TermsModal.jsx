import React from "react";

const TermsModal = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  const termsContent = {
    terms: {
      title: "Terms of Service",
      content: `Terms and Conditions

Welcome to Cake Area! By using our platform, you agree to comply with and be bound by the following terms and conditions. Please read these carefully before using the website.

1. User Accounts
a. Buyers
- Buyers must provide accurate and complete personal information, including but not limited to name, delivery address, email, and contact number.
- Buyers are responsible for keeping their account details confidential and ensuring that no unauthorized persons have access to it.

b. Bakers
- Bakers are required to provide personal information, such as name, email, and contact number, as well as their business permit and GCash QR code for payment processing.
- Bakers agree to ensure that all business permits provided are valid and up-to-date. Falsification of business documents will result in immediate suspension and legal action if necessary.
- Bakers must maintain the accuracy of their business information, including updates to GCash QR codes, if necessary.

2. Data Privacy
- All personal and business information collected from buyers and bakers will be stored and handled in accordance with our Privacy Policy.
- Cake Area is committed to protecting your personal information and ensuring that it is used solely for processing orders, payments, and business verification purposes.
- We will not sell or share your information with third parties except as required by law or for payment processing.

3. Order Processing and Payment
- Orders placed through the platform are processed by the respective bakers, and payments are handled securely via GCash, using the QR codes provided by the bakers.
- Cake Area is not responsible for any delays in order processing due to incorrect or incomplete information provided by buyers or bakers.
- Payments are directly transferred to the bakers, and Cake Area takes no responsibility for any disputes related to payments, refunds, or product issues. Buyers should contact the baker directly for any disputes or concerns.

4. Baker Requirements
- Bakers are required to maintain valid business permits to sell their goods through the platform. Bakers are responsible for renewing their permits and providing updated copies when necessary.
- Bakers are solely responsible for the quality and safety of their products. Cake Area does not guarantee the quality of any products sold on the platform.
- Bakers must ensure that their GCash QR code is accurate and functional to avoid payment issues.

5. Liability
- Cake Area acts as a platform facilitating transactions between buyers and bakers and is responsible for ensuring secure payment processing and communication between parties.
- The platform provides dispute resolution services and will mediate any conflicts between buyers and bakers.
- While Cake Area facilitates transactions, the ultimate responsibility for product quality and delivery lies with the bakers.
- Cake Area maintains transaction records and payment histories to protect both buyers and bakers.

6. Platform Use
- Users agree to use Cake Area for legitimate purposes only. Any illegal or fraudulent activity will result in immediate account termination.
- Cake Area reserves the right to suspend or terminate accounts of buyers or bakers who violate these terms and conditions.

7. Changes to Terms and Conditions
- Cake Area reserves the right to update these terms and conditions at any time. Changes will be effective immediately upon posting on the platform.
- Continued use of the platform after changes have been posted constitutes acceptance of the updated terms.

By using Cake Area, you acknowledge that you have read, understood, and agree to these Terms and Conditions.`
    },
    privacy: {
      title: "Privacy Policy",
      content: `Privacy Policy

Last updated: [Current Date]

1. Information We Collect

Personal Information:
- Name, email address, phone number
- Delivery address
- Birth date
- Payment information (processed securely through GCash)

For Bakers:
- Business permit information
- GCash QR codes
- Business address and contact details

2. How We Use Your Information

We use the collected information to:
- Process and fulfill orders
- Facilitate communication between buyers and bakers
- Verify baker credentials and permits
- Process payments
- Send important updates about your account or orders
- Improve our services and user experience

3. Information Sharing

We share your information only:
- Between buyers and bakers as necessary to fulfill orders
- With payment processors to complete transactions
- When required by law or legal process
- To protect our rights or property

We never:
- Sell your personal information
- Share your data with third-party advertisers
- Use your information for marketing without consent

4. Data Security

We implement various security measures to protect your information:
- Encrypted data transmission
- Secure password storage
- Regular security audits
- Limited staff access to personal information

5. Your Rights

You have the right to:
- Access your personal information
- Correct inaccurate data
- Request deletion of your data
- Opt-out of communications
- Export your data

6. Data Retention

We retain your information:
- As long as your account is active
- As required by law
- For legitimate business purposes

7. Children's Privacy

Our service is not intended for users under 18 years old. We do not knowingly collect information from children.

8. Changes to Privacy Policy

We may update this policy periodically. We will notify users of significant changes via email or platform notification.

9. Contact Us

For privacy-related questions or concerns:
- Email: [contact email]
- Phone: [contact number]

10. Consent

By using Cake Area, you consent to this privacy policy and our processing of your information as described above.`
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-primary">
            {termsContent[type].title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
        <div className="prose prose-sm">
          <pre className="whitespace-pre-wrap font-sans">
            {termsContent[type].content}
          </pre>
        </div>
        <div className="mt-4 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
