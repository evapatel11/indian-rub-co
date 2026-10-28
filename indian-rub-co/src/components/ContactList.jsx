import { BUSINESS } from '../data/business';

const Pin = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
);
const Phone = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></svg>
);
const Mail = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
);

// Address, phone and email with clickable tel: and mailto: links.
export default function ContactList({ className = '' }) {
  return (
    <ul className={`contact-list ${className}`}>
      <li>
        <Pin />
        <span>
          <span className="contact-list__label">Address</span>
          <address>
            {BUSINESS.addressLines.map((l, i) => (
              <span key={l}>{l}{i < BUSINESS.addressLines.length - 1 && <br />}</span>
            ))}
          </address>
        </span>
      </li>
      <li>
        <Phone />
        <span>
          <span className="contact-list__label">Phone</span>
          <a href={BUSINESS.phoneHref}>{BUSINESS.phoneDisplay}</a>
        </span>
      </li>
      <li>
        <Mail />
        <span>
          <span className="contact-list__label">Email</span>
          <a href={BUSINESS.emailHref}>{BUSINESS.email}</a>
        </span>
      </li>
    </ul>
  );
}
