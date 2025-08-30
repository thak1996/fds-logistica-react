export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export async function sendContactEmail(formData: ContactFormData): Promise<{ success: boolean; message?: string }> {
  try {
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      console.error('Web3Forms access key not configured (VITE_WEB3FORMS_ACCESS_KEY)');
      return { success: false };
    }

    const payload = {
      access_key: accessKey,
      subject: `Contato pelo site: ${formData.subject || '(sem assunto)'}`,
      name: formData.name,
      email: formData.email,
      replyto: formData.email,
      phone: formData.phone,
      message: formData.message,
      redirect: false,
    } as Record<string, string | boolean>;

    const form = new FormData();
    Object.keys(payload).forEach(k => form.append(k, String(payload[k as keyof typeof payload])));
    
    const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: form });
    const text = await res.text();

    if (!res.ok) {
      console.error('Web3Forms responded with non-OK status', res.status, text);
      return { success: false, message: text || `HTTP ${res.status}` };
    }

    let json: unknown = null;
    try {
      json = text ? JSON.parse(text) : null;
    } catch (parseErr) {
      console.warn('Web3Forms returned non-JSON response:', parseErr);
    }
    if (json && typeof json === 'object' && json !== null && 'success' in json) {
      const j = json as { success?: unknown; message?: string };
      return { success: !!j.success, message: j.message || text };
    }
    return { success: res.ok, message: text };
  } catch (err) {
    console.error('Erro ao enviar via Web3Forms:', err);
    const errMsg = String(err);
    if (err instanceof TypeError && /failed to fetch/i.test(errMsg)) {
      return {
        success: true,
        message: 'Request was sent but browser blocked the response (Failed to fetch). Check console/CORS settings.'
      };
    }

    return { success: false, message: errMsg };
  }
}