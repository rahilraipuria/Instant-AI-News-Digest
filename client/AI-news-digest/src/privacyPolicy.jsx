import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 text-gray-800">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Privacy Policy</h1>
      <p className="text-sm text-gray-500 text-center mb-4">Last updated: March 18, 2025</p>

      <p className="mb-4">
        This Privacy Notice for <strong>Rahil Raipuria</strong> ("we," "us," or "our") describes how we collect, store, use, and share your personal information when you use our services.
      </p>

      <ul className="list-disc list-inside mb-6 space-y-2">
        <li>
          Visiting our website:{" "}
          <a
            href="https://instant-ai-news-digest-dashboard.onrender.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            instant-ai-news-digest-dashboard.onrender.com
          </a>
        </li>
        <li>Engaging with us via sales, marketing, or events.</li>
      </ul>

      <p className="mb-4">
        If you have any questions, contact us at{" "}
        <a href="mailto:rahil.raipuria2003@gmail.com" className="text-blue-500 hover:underline">
          rahil.raipuria2003@gmail.com
        </a>.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-4 text-gray-700">Summary of Key Points</h2>
      <ul className="list-disc list-inside mb-6 space-y-2">
        <li>We process data based on your interactions with our Services.</li>
        <li>We do not process sensitive personal information.</li>
        <li>We do not collect information from third parties.</li>
        <li>We process data to improve security, compliance, and service quality.</li>
        <li>You have the right to review, update, or delete your data.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-4 text-gray-700">Table of Contents</h2>
      <ul className="list-disc list-inside space-y-2">
        {[
          "WHAT INFORMATION DO WE COLLECT?",
          "HOW DO WE PROCESS YOUR INFORMATION?",
          "WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?",
          "DO WE OFFER ARTIFICIAL INTELLIGENCE-BASED PRODUCTS?",
          "HOW LONG DO WE KEEP YOUR INFORMATION?",
          "DO WE COLLECT INFORMATION FROM MINORS?",
          "WHAT ARE YOUR PRIVACY RIGHTS?",
          "DO WE MAKE UPDATES TO THIS NOTICE?",
          "HOW CAN YOU CONTACT US ABOUT THIS NOTICE?"
        ].map((item, index) => (
          <li key={index} className="text-blue-500 hover:underline cursor-pointer">
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-8 space-y-6">
        <section>
          <h3 className="text-lg font-semibold text-gray-700">1. WHAT INFORMATION DO WE COLLECT?</h3>
          <p>We collect personal information that you voluntarily provide when using our Services.</p>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-700">2. HOW DO WE PROCESS YOUR INFORMATION?</h3>
          <p>We process data to provide, improve, and secure our Services while ensuring legal compliance.</p>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-700">3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</h3>
          <p>We may share your data in business-related situations such as mergers or acquisitions.</p>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-700">4. DO WE OFFER ARTIFICIAL INTELLIGENCE-BASED PRODUCTS?</h3>
          <p>Yes, we provide AI-powered search tools.</p>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-700">5. HOW LONG DO WE KEEP YOUR INFORMATION?</h3>
          <p>We retain your data as long as necessary, ensuring compliance with legal requirements.</p>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-700">6. DO WE COLLECT INFORMATION FROM MINORS?</h3>
          <p>No, we do not knowingly collect data from individuals under 18.</p>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-700">7. WHAT ARE YOUR PRIVACY RIGHTS?</h3>
          <p>You can request access, modification, or deletion of your personal data.</p>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-700">8. DO WE MAKE UPDATES TO THIS NOTICE?</h3>
          <p>Yes, we may update this notice to comply with legal requirements.</p>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-700">9. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h3>
          <p>
            Email:{" "}
            <a href="mailto:rahil.raipuria2003@gmail.com" className="text-blue-500 hover:underline">
              rahil.raipuria2003@gmail.com
            </a>
          </p>
          <p>Address: Bengaluru, Karnataka 560004, India</p>
        </section>
      </div>

      <footer className="mt-10 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Rahil Raipuria. All Rights Reserved.
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
