import React from 'react';
import './About.css';
import { useTheme } from '../hooks/useTheme.js';

const Terms = () => {
  const { theme } = useTheme();

  return (
    <section className={`about-section section-tone-terms ${theme}`} id="terms">
      <div className="container">
        <h2 className={`section-title ${theme}`}>Terms of Service</h2>

        <div className="about-content">
          <div className="about-text">
            <p className={theme}>
              By commissioning me (Rynix), you agree to the following Terms of Service. These terms ensure a <strong>fair process</strong> and protect both parties.
            </p>

            <div className="tos-grid">
              <div className="tos-block" id="general-terms">
                <h3 className={theme}>1. General Terms</h3>
                <ul className="tos-list">
                  <li><strong>Do not claim my work as your own.</strong> Proper credit is required (at least mention “Rynix” or tag me when possible). If you prefer no credit, an additional fee will apply.</li>
                  <li><strong>I may decline a commission</strong> for any reason (scope, time, or personal circumstances).</li>
                  <li>Commissions are handled on a <strong>first‑come, first‑serve</strong> basis.</li>
                  <li><strong>Creative direction</strong> is up to me unless clear references are provided.</li>
                  <li><strong>Source materials</strong> (mix, illustrations, logos, etc.) must be provided before production begins.</li>
                </ul>
              </div>

              <div className="tos-block" id="payment-refunds">
                <h3 className={theme}>2. Payment & Refunds</h3>
                <ul className="tos-list">
                  <li><strong>Full payment upfront</strong> via Paypal (VGen soon).</li>
                  <li>If you cancel early (before significant progress), a <strong>50% refund</strong> will be issued.</li>
                  <li><strong>No refunds</strong> once the project has passed halfway progress.</li>
                  <li>If I am unable to complete your project for personal/unforeseen reasons, <strong>you will receive a full refund</strong>.</li>
                </ul>
              </div>

              <div className="tos-block" id="delivery-revisions">
                <h3 className={theme}>3. Delivery & Revisions</h3>
                <ul className="tos-list">
                  <li>Delivery time depends on commission type and my current queue. A <strong>rough estimate</strong> will be provided before I start.</li>
                  <li>I may share previews during production if needed, and a <strong>low‑quality/watermarked preview</strong> before final delivery.</li>
                  <li><strong>Major Revisions</strong> (e.g., restructuring, timing changes, or replacing assets) will incur additional fees.</li>
                  <li><strong>Mistakes on my part</strong> (e.g., wrong lyrics/assets) will be fixed at no cost.</li>
                </ul>
              </div>

              <div className="tos-block" id="rights-usage">
                <h3 className={theme}>4. Rights & Usage</h3>
                <ul className="tos-list">
                  <li>I reserve the right to use finished works in my <strong>portfolio or for promotional purposes</strong>.</li>
                  <li><strong>Commercial usage</strong> (e.g., corporate/agency projects) will be charged <strong>2× the base price</strong>.</li>
                  <li><strong>Redistribution, resale, or re‑uploading</strong> is not allowed. Proper credit is required unless the no credit option has been purchased.</li>
                  <li><strong>Project source files</strong> are not included unless purchased separately.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Terms;