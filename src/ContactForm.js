import React, { useState } from 'react';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    businessEmail: '',
    company: '',
    jobTitle: '',
    message: '',
    privacyAccepted: false
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.businessEmail.trim()) {
      newErrors.businessEmail = 'Business email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.businessEmail)) {
      newErrors.businessEmail = 'Please enter a valid email address';
    } else {
      const personalEmailDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'aol.com', 'protonmail.com', 'zoho.com', 'mail.com', 'yandex.com'];
      const emailDomain = formData.businessEmail.split('@')[1]?.toLowerCase();
      if (personalEmailDomains.includes(emailDomain)) {
        newErrors.businessEmail = 'Please use a company email address, not a personal email';
      }
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company is required';
    }

    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = 'Job title is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Your message to Legartis is required';
    }

    if (!formData.privacyAccepted) {
      newErrors.privacyAccepted = 'You must accept the privacy policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        const response = await fetch(process.env.REACT_APP_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(`${process.env.REACT_APP_WEBHOOK_USERNAME}:${process.env.REACT_APP_WEBHOOK_PASSWORD}`),
          },
          body: JSON.stringify({
            first_name: formData.firstName,
            last_name: formData.lastName,
            business_email: formData.businessEmail,
            company: formData.company,
            job_title: formData.jobTitle,
            message: formData.message
          })
        });

        console.log('Response status:', response.status);
        console.log('Response statusText:', response.statusText);

        if (response.ok) {
          alert('Thank you for your submission! We will get back to you soon.');
          setFormData({
            firstName: '',
            lastName: '',
            businessEmail: '',
            company: '',
            jobTitle: '',
            message: '',
            privacyAccepted: false
          });
        } else {
          const errorText = await response.text();
          console.error('Server response:', errorText);
          alert(`There was an error submitting your form (${response.status}). Please try again.`);
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
          alert('Network error: Unable to connect to the server. Please check your connection and try again.');
        } else {
          alert('There was an error submitting your form. Please try again.');
        }
      }
    }
  };

  return (
    <div className="page-container">
      <div className="header">
        <img src="/logo.svg" alt="Legartis Logo" className="logo" />
      </div>
      
      <div className="main-content">
        <div className="content-section">
          <div className="hero-section">
            <h1>Get in Touch</h1>
            <p className="subheadline">
              Unleash the full potential of contract review automation. We're looking forward to hearing from you – please fill out the form and send us your questions.
            </p>
          </div>

          <div className="about-section">
            <h2>What Legartis Is All About</h2>
            <ul>
              <li>Legartis is an award-winning LegalTech solution designed to automate contract review processes</li>
              <li>Ready to use from day one</li>
              <li>Combines artificial intelligence with an intuitive user experience</li>
              <li>AI automatically analyzes contracts and delivers precise results within seconds</li>
              <li>Used by Legal, sales and procurement teams to enhance quality and consistency</li>
            </ul>
          </div>

          <div className="helpful-content">
            <h3>Looking for Helpful Content?</h3>
            <p>Our free LegalTech guide is the ideal introductory read. Learn how to optimize collaboration between legal departments and sales and procurement teams using contract review.</p>
            <a href="https://www.legartis.ai/resources/legaltech-guide" target="_blank" rel="noopener noreferrer">
              <button className="download-button">Download the LegalTech Guide</button>
            </a>
          </div>
        </div>

        <div className="form-section">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First name*</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={errors.firstName ? 'error' : ''}
                />
                {errors.firstName && <span className="error-message">{errors.firstName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last name*</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={errors.lastName ? 'error' : ''}
                />
                {errors.lastName && <span className="error-message">{errors.lastName}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="businessEmail">Business email*</label>
              <input
                type="email"
                id="businessEmail"
                name="businessEmail"
                value={formData.businessEmail}
                onChange={handleInputChange}
                className={errors.businessEmail ? 'error' : ''}
              />
              {errors.businessEmail && <span className="error-message">{errors.businessEmail}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="company">Company*</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className={errors.company ? 'error' : ''}
              />
              {errors.company && <span className="error-message">{errors.company}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="jobTitle">Job title*</label>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                className={errors.jobTitle ? 'error' : ''}
              />
              {errors.jobTitle && <span className="error-message">{errors.jobTitle}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Message to Legartis*</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleInputChange}
                className={errors.message ? 'error' : ''}
              />
              {errors.message && <span className="error-message">{errors.message}</span>}
            </div>

            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="privacyAccepted"
                  checked={formData.privacyAccepted}
                  onChange={handleInputChange}
                  className={errors.privacyAccepted ? 'error' : ''}
                />
                <span className="checkmark"></span>
                Legartis will use any of the data provided by you in accordance with our Privacy Policy.*
              </label>
              {errors.privacyAccepted && <span className="error-message">{errors.privacyAccepted}</span>}
            </div>

            <button type="submit" className="submit-button">
              Send Message
            </button>
          </form>
        </div>
      </div>
      
      <div className="footer">
      </div>
    </div>
  );
};

export default ContactForm;