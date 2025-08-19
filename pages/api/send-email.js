import { Resend } from 'resend';
import { 
  createServiceRequestTemplate, 
  createCustomerConfirmationTemplate, 
  createContactFormTemplate, 
  createContactConfirmationTemplate 
} from '../../lib/emailTemplates';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      message: 'Method not allowed. Only POST requests are accepted.',
      allowedMethods: ['POST']
    });
  }

  // Check if API key exists
  if (!process.env.RESEND_API_KEY) {
    console.error('Missing RESEND_API_KEY environment variable');
    return res.status(500).json({ 
      message: 'Server configuration error. Please contact support.' 
    });
  }

  try {
    const { type, formData } = req.body;

    // Validate request body
    if (!type || !formData) {
      return res.status(400).json({ 
        message: 'Invalid request. Missing type or formData.' 
      });
    }

    console.log('Processing email request:', { type, email: formData.email });

    if (type === 'service-request') {
      // Send notification to business
      await resend.emails.send({
        from: 'Castle Crew Glazing <noreply@castlecrewglazing.co.uk>',
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

      console.log('Service request emails sent successfully');
    }

    if (type === 'contact') {
      // Send notification to business
      await resend.emails.send({
        from: 'Castle Crew Glazing <noreply@castlecrewglazing.co.uk>',
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

      console.log('Contact form emails sent successfully');
    }

    res.status(200).json({ 
      message: 'Emails sent successfully',
      type: type
    });

  } catch (error) {
    console.error('Email sending error:', error);
    
    // Return specific error information
    res.status(500).json({ 
      message: 'Failed to send email',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}