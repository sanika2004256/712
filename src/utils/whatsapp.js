/**
 * Direct WhatsApp Link Helper
 * Directly launches the WhatsApp native app on mobile (skipping the intermediate browser landing page),
 * and launches WhatsApp Web directly on desktop.
 */
export const getCleanNumber = (phone) => {
  let digits = String(phone || '').replace(/\D/g, '');
  if (digits.length === 11 && digits.startsWith('0')) {
    digits = digits.substring(1);
  }
  if (digits.length === 10) {
    digits = '91' + digits;
  }
  return digits;
};

export const openDirectWhatsApp = (phone, text = '') => {
  const digits = getCleanNumber(phone);
  if (!digits) return;

  const encodedText = encodeURIComponent(text);
  const isMobile = typeof navigator !== 'undefined' && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (isMobile) {
    // On mobile devices, whatsapp:// protocol immediately opens the WhatsApp app directly
    window.location.href = `whatsapp://send?phone=${digits}${encodedText ? `&text=${encodedText}` : ''}`;
  } else {
    // On desktop, web.whatsapp.com directly opens the web chat
    window.open(`https://web.whatsapp.com/send?phone=${digits}${encodedText ? `&text=${encodedText}` : ''}`, '_blank');
  }
};

export const getDirectWhatsAppHref = (phone, text = '') => {
  const digits = getCleanNumber(phone);
  if (!digits) return '#';
  const encodedText = encodeURIComponent(text);
  return `whatsapp://send?phone=${digits}${encodedText ? `&text=${encodedText}` : ''}`;
};
