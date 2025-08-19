// Service Request Email Template (to business)
export const createServiceRequestTemplate = (formData) => {
  const selectedServices = formData.services.map(serviceId => {
    const serviceMap = {
      'window-installation': 'Window Installation',
      'door-replacement': 'Door Replacement',
      'glass-repair': 'Glass Repair',
      'double-glazing': 'Double Glazing',
      'commercial-glazing': 'Commercial Glazing',
      'emergency-repair': 'Emergency Repair',
      'conservatory': 'Conservatory Work',
      'skylight': 'Skylight Installation'
    };
    return serviceMap[serviceId] || serviceId;
  }).join(', ');

  const urgencyMap = {
    'low': 'Low - Within 2 weeks',
    'medium': 'Medium - Within 1 week',
    'high': 'High - Within 3 days',
    'urgent': 'Urgent - Within 24 hours'
  };

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Service Request</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #475569; color: white; padding: 20px; text-align: center; }
        .content { background-color: #f8fafc; padding: 20px; }
        .section { margin-bottom: 20px; }
        .label { font-weight: bold; color: #475569; }
        .value { margin-bottom: 10px; }
        .urgent { background-color: #fee2e2; border-left: 4px solid #dc2626; padding: 10px; }
        .high { background-color: #fed7aa; border-left: 4px solid #ea580c; padding: 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🏠 New Service Request</h1>
          <p>Castle Crew Glazing</p>
        </div>
        
        <div class="content">
          ${formData.urgency === 'urgent' ? '<div class="urgent"><strong>⚠️ URGENT REQUEST - Within 24 hours</strong></div>' : ''}
          ${formData.urgency === 'high' ? '<div class="high"><strong>🔸 HIGH PRIORITY - Within 3 days</strong></div>' : ''}
          
          <div class="section">
            <h2>Customer Information</h2>
            <div class="value"><span class="label">Name:</span> ${formData.firstName} ${formData.lastName}</div>
            <div class="value"><span class="label">Email:</span> ${formData.email}</div>
            <div class="value"><span class="label">Phone:</span> ${formData.phone}</div>
            <div class="value"><span class="label">Preferred Contact:</span> ${formData.preferredContact}</div>
            ${formData.preferredTime ? `<div class="value"><span class="label">Best Time:</span> ${formData.preferredTime}</div>` : ''}
          </div>

          <div class="section">
            <h2>Property Details</h2>
            <div class="value"><span class="label">Address:</span> ${formData.address}</div>
            <div class="value"><span class="label">City:</span> ${formData.city}</div>
            <div class="value"><span class="label">Postcode:</span> ${formData.postcode}</div>
          </div>

          <div class="section">
            <h2>Service Requirements</h2>
            <div class="value"><span class="label">Services:</span> ${selectedServices}</div>
            <div class="value"><span class="label">Urgency:</span> ${urgencyMap[formData.urgency] || formData.urgency}</div>
            ${formData.budget ? `<div class="value"><span class="label">Budget:</span> ${formData.budget}</div>` : ''}
            ${formData.hearAboutUs ? `<div class="value"><span class="label">How they heard about us:</span> ${formData.hearAboutUs}</div>` : ''}
          </div>

          <div class="section">
            <h2>Project Description</h2>
            <div style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #475569;">
              ${formData.description.replace(/\n/g, '<br>')}
            </div>
          </div>

          <div style="background-color: #475569; color: white; padding: 15px; text-align: center; margin-top: 20px;">
            <p><strong>Next Steps:</strong></p>
            <p>1. Contact customer within 2 hours (business hours)</p>
            <p>2. Schedule consultation</p>
            <p>3. Prepare quote</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Customer Confirmation Email Template
export const createCustomerConfirmationTemplate = (formData) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Service Request Received</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #475569; color: white; padding: 20px; text-align: center; }
        .content { background-color: #f8fafc; padding: 20px; }
        .highlight { background-color: #e2e8f0; padding: 15px; border-radius: 5px; margin: 15px 0; }
        .button { background-color: #475569; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Request Received!</h1>
          <p>Castle Crew Glazing</p>
        </div>
        
        <div class="content">
          <h2>Dear ${formData.firstName},</h2>
          
          <p>Thank you for choosing Castle Crew Glazing! We've successfully received your service request and are excited to help you with your glazing project.</p>
          
          <div class="highlight">
            <h3>📋 Your Request Summary:</h3>
            <p><strong>Services:</strong> ${formData.services.length} service(s) requested</p>
            <p><strong>Property:</strong> ${formData.address}, ${formData.city}, ${formData.postcode}</p>
            <p><strong>Priority:</strong> ${formData.urgency}</p>
          </div>

          <h3>What happens next?</h3>
          <ul>
            <li>✅ We'll review your requirements (within 2 hours)</li>
            <li>📞 Our team will contact you to schedule a free consultation</li>
            <li>📏 We'll visit your property for accurate measurements</li>
            <li>💰 You'll receive a detailed, transparent quote</li>
            <li>🔨 We'll schedule and complete your project</li>
          </ul>

          <div style="background-color: #059669; color: white; padding: 15px; border-radius: 5px; text-align: center;">
            <h3>🆓 FREE Consultation & Quote</h3>
            <p>No obligation • Professional assessment • Transparent pricing</p>
          </div>

          <h3>Need immediate assistance?</h3>
          <p>For urgent matters, don't hesitate to call us directly:</p>
          <p style="text-align: center;">
            <a href="tel:+447949821925" class="button">📞 Call +44 7949 821925</a>
          </p>

          <p>We're looking forward to working with you!</p>
          
          <p>Best regards,<br>
          <strong>The Castle Crew Glazing Team</strong><br>
          Professional Glazing Solutions</p>

          <hr style="margin: 20px 0; border: none; border-top: 1px solid #e2e8f0;">
          <p style="font-size: 12px; color: #64748b;">
            Castle Crew Glazing | 16 Industrial Estate, Welwyn Garden, AL7 4ST<br>
            Email: info@castlecrewglazing.co.uk | Phone: +44 7949 821925
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Contact Form Email Template (to business)
export const createContactFormTemplate = (formData) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Contact Form Submission</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #475569; color: white; padding: 20px; text-align: center; }
        .content { background-color: #f8fafc; padding: 20px; }
        .section { margin-bottom: 20px; }
        .label { font-weight: bold; color: #475569; }
        .value { margin-bottom: 10px; }
        .source { background-color: #e2e8f0; padding: 10px; border-radius: 5px; font-size: 12px; color: #64748b; margin-bottom: 20px; }
        .priority { background-color: #f59e0b; color: white; padding: 10px; border-radius: 5px; margin-bottom: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📨 New Contact Form</h1>
          <p>Castle Crew Glazing</p>
        </div>
        
        <div class="content">
          ${formData.source ? `<div class="source"><strong>Source:</strong> ${formData.source}</div>` : ''}
          
          ${formData.source === 'Homepage Form' ? `<div class="priority"><strong>🔥 PRIORITY:</strong> Free Estimate Request from Homepage</div>` : ''}
          
          <div class="section">
            <h2>Contact Details</h2>
            <div class="value"><span class="label">Name:</span> ${formData.name}</div>
            <div class="value"><span class="label">Email:</span> ${formData.email}</div>
            <div class="value"><span class="label">Phone:</span> ${formData.phone}</div>
            ${formData.subject ? `<div class="value"><span class="label">Subject:</span> ${formData.subject}</div>` : ''}
          </div>

          <div class="section">
            <h2>Message</h2>
            <div style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #475569;">
              ${formData.message.replace(/\n/g, '<br>')}
            </div>
          </div>

          <div style="background-color: #475569; color: white; padding: 15px; text-align: center; margin-top: 20px;">
            <p><strong>Action Required:</strong> Respond to customer inquiry within 2 hours</p>
            ${formData.source === 'Homepage Form' ? '<p><em>High Priority - Free Estimate Request</em></p>' : ''}
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Contact Form Confirmation Email (to customer)
export const createContactConfirmationTemplate = (formData) => {
  const isHomepageForm = formData.source === 'Homepage Form';
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${isHomepageForm ? 'Free Estimate Request Received' : 'Message Received'}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #475569; color: white; padding: 20px; text-align: center; }
        .content { background-color: #f8fafc; padding: 20px; }
        .button { background-color: #475569; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0; }
        .highlight { background-color: #e2e8f0; padding: 15px; border-radius: 5px; margin: 15px 0; }
        .estimate-box { background-color: #059669; color: white; padding: 15px; border-radius: 5px; text-align: center; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ ${isHomepageForm ? 'Free Estimate Request Received!' : 'Message Received!'}</h1>
          <p>Castle Crew Glazing</p>
        </div>
        
        <div class="content">
          <h2>Dear ${formData.name.split(' ')[0]},</h2>
          
          ${isHomepageForm ? `
            <p>Thank you for requesting a free estimate from Castle Crew Glazing! We're excited to help you transform your space with our premium glazing solutions.</p>
            
            <div class="estimate-box">
              <h3>🆓 FREE Consultation & Estimate</h3>
              <p>No obligation • Professional assessment • Transparent pricing</p>
            </div>
            
            <div class="highlight">
              <h3>📋 Your Request Summary:</h3>
              <p><strong>Service Requested:</strong> ${formData.subject.replace('Free Estimate Request - ', '')}</p>
              <p><strong>Contact Method:</strong> ${formData.email}${formData.phone !== 'Not provided' ? ` | ${formData.phone}` : ''}</p>
            </div>

            <h3>What happens next?</h3>
            <ul>
              <li>✅ We'll review your estimate request (within 2 hours)</li>
              <li>📞 Our team will contact you to discuss your project</li>
              <li>📏 We'll schedule a free on-site consultation</li>
              <li>💰 You'll receive a detailed, transparent quote</li>
              <li>🔨 We'll schedule and complete your project</li>
            </ul>
          ` : `
            <p>Thank you for contacting Castle Crew Glazing! We've received your message and appreciate you taking the time to reach out to us.</p>
            
            <div class="highlight">
              <h3>Your Message:</h3>
              ${formData.subject ? `<p><strong>Subject:</strong> ${formData.subject}</p>` : ''}
              <p style="font-style: italic;">"${formData.message}"</p>
            </div>

            <h3>What's next?</h3>
            <ul>
              <li>✅ Our team will review your inquiry</li>
              <li>📞 We'll respond within 24 hours</li>
              <li>🆓 Free consultation available if needed</li>
            </ul>
          `}

          <h3>Need immediate assistance?</h3>
          <p>For urgent matters, don't hesitate to call us directly:</p>
          <p style="text-align: center;">
            <a href="tel:+447949821925" class="button">📞 Call +44 7949 821925</a>
          </p>

          <p>We're looking forward to ${isHomepageForm ? 'working with you on your glazing project' : 'helping you'}!</p>
          
          <p>Best regards,<br>
          <strong>The Castle Crew Glazing Team</strong><br>
          Professional Glazing Solutions</p>

          <hr style="margin: 20px 0; border: none; border-top: 1px solid #e2e8f0;">
          <p style="font-size: 12px; color: #64748b;">
            Castle Crew Glazing | 16 Industrial Estate, Welwyn Garden, AL7 4ST<br>
            Email: info@castlecrewglazing.co.uk | Phone: +44 7949 821925<br>
            <br>
            ${isHomepageForm ? 'Thank you for choosing Castle Crew Glazing for your glazing needs!' : 'Thank you for contacting Castle Crew Glazing!'}
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};