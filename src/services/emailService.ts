export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export async function sendContactEmail(formData: ContactFormData): Promise<{ success: boolean }> {
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
      phone: formData.phone,
      message: formData.message,
      redirect: false,
    } as Record<string, string | boolean>;

    const form = new FormData();
    Object.keys(payload).forEach(k => form.append(k, String(payload[k as keyof typeof payload])));

    const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: form });
    if (!res.ok) {
      console.error('Web3Forms responded with non-OK status', res.status);
      return { success: false };
    }
    const json = await res.json();
    return { success: !!json.success };
  } catch (err) {
    console.error('Erro ao enviar via Web3Forms:', err);
    return { success: false };
  }
}