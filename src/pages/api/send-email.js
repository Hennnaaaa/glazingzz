import { Resend } from 'resend';
import { 
  createServiceRequestTemplate, 
  createCustomerConfirmationTemplate, 
  createContactFormTemplate, 
  createContactConfirmationTemplate 
} from '../../lib/emailTemplates';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { type, formData } = req.body;

  try {
    if (type === 'service-request') {
      // Send notification to business
      await resend.emails.send({
        from: 'noreply@castlecrewglazing.co.uk',
        to: 'info@castlecrewglazing.co.uk',
        subject: `🏠 New Service Request - ${formData.firstName} ${formData.lastName}`,
        html: createServiceRequestTemplate(formData),
      });

      // Send confirmation to customer
      await resend.emails.send({
        from: 'Castle Crew Glazing <noreply@castlecrewglazing.co.uk>',
        to: formData.email,
        subject: 'Service Request Received - Castle Crew Glazing',
        html: createCustomerConfirmationTemplate(formData),
      });
    }

    if (type === 'contact') {
      // Send notification to business
      await resend.emails.send({
        from: 'noreply@castlecrewglazing.co.uk',
        to: 'info@castlecrewglazing.co.uk',
        subject: `📨 New Contact Form - ${formData.name}`,
        html: createContactFormTemplate(formData),
      });

      // Send confirmation to customer
      await resend.emails.send({
        from: 'Castle Crew Glazing <noreply@castlecrewglazing.co.uk>',
        to: formData.email,
        subject: 'Thank you for contacting Castle Crew Glazing',
        html: createContactConfirmationTemplate(formData),
      });
    }

    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ 
      message: 'Failed to send email', 
      error: error.message 
    });
  }
}