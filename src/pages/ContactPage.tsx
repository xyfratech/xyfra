import { useState } from 'react'
import SectionHeader from '../components/SectionHeader'
import { useScrollReveal } from '../hooks/useScrollReveal'

const EMPTY_FORM = {
  name: '',
  email: '',
  company: '',
  service: 'Software Development',
  message: '',
}

export default function ContactPage() {
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  useScrollReveal([submitSuccess])

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
      setFormData(EMPTY_FORM)
      setTimeout(() => setSubmitSuccess(false), 5000)
    }, 1200)
  }

  return (
    <div className="page">
      <section className="section-container">
        <SectionHeader
          tag="LET'S BUILD"
          title={[['Start Your', 'light'], ['Digital Project', 'green'], ['Today', 'box']]}
          subtitle="Contact our team for a free technical consultation or marketing strategy roadmap."
        />

        <div className="contact-grid" data-reveal>
          <div className="contact-info-panel">
            <h3>Direct Contact & Quotes</h3>
            <p>Reach out to discuss Software Development, Mobile Apps, Websites, Marketing, or SEO.</p>

            <div className="info-list">
              <div className="info-item">
                <div className="info-icon">✉️</div>
                <div>
                  <span className="info-label">Direct Email</span>
                  <a href="mailto:xyfratechnologies@gmail.com" className="info-val">xyfratechnologies@gmail.com</a>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">📞</div>
                <div>
                  <span className="info-label">Phone Hotline</span>
                  <a href="tel:+917306324011" className="info-val">+91 73063 24011</a>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">⏱️</div>
                <div>
                  <span className="info-label">Response Time</span>
                  <span className="info-val">Within 2 Hours</span>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-panel">
            {submitSuccess ? (
              <div className="submit-success-msg">
                <div className="success-icon">🎉</div>
                <h3>Project Inquiry Received!</h3>
                <p>Thank you for reaching out. A Senior Project Lead will review your request and get back to you within 2 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="consultation-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Work Email *</label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="company">Company Name</label>
                    <input
                      type="text"
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="service">Primary Requirement</label>
                    <select
                      id="service"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    >
                      <option value="Software Development">Software Development</option>
                      <option value="App Development">App Development</option>
                      <option value="Website Development">Website Development</option>
                      <option value="Digital Marketing">Digital Marketing</option>
                      <option value="SEO Work">SEO Work</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Project Details</label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    placeholder="Tell us about your project goals, software requirements, or marketing targets..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-primary form-submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <span>Submit Project Details</span>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
