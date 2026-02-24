import React from 'react';
import { motion } from 'framer-motion';
import './ChatbotTermsModal.css';

function ChatbotTermsModal({ onAccept, onCancel }) {
  return (
    <motion.div
      className="terms-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="terms-modal"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className="terms-modal-header">
          <h2>Terms & Conditions</h2>
        </div>

        <div className="terms-modal-content">
          <p>
            By using our AI chatbot, you agree to our <strong>Terms of Service</strong> and <strong>Privacy Policy</strong>.
          </p>
          <ul>
            <li>✓ Your data will be processed securely</li>
            <li>✓ We use AI to provide better support</li>
            <li>✓ Conversations may be used to improve our service</li>
            <li>✓ You can opt-out at any time</li>
          </ul>
          <p style={{ marginTop: '20px', fontSize: '0.9rem', opacity: 0.8 }}>
            For full details, please read our <a href="/terms-of-service" target="_blank" rel="noopener noreferrer">Terms of Service</a> and <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.
          </p>
        </div>

        <div className="terms-modal-footer">
          <button className="terms-btn terms-btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="terms-btn terms-btn-accept" onClick={onAccept}>
            Accept & Continue
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ChatbotTermsModal;
