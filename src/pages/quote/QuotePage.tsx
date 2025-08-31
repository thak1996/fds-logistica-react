import React, { useState, useRef, useEffect } from 'react';
import styles from './QuotePage.module.css';
import Modal from '../../components/modals/Modal';
import { sendContactEmail } from '../../services/emailService';
import { lookupCep } from '../../services/cepService';
import type { CepAddress } from '../../services/cepService';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function QuotePage() {
  const [form, setForm] = useState({
    type: 'residencial',
    name: '',
    residential_phone: '',
    commercial_phone: '',
    mobile_phone: '',
    email: '',
    origin_zipcode: '',
    origin_street: '',
    origin_number: '',
    origin_complement: '',
    origin_district: '',
    origin_city: '',
    origin_state: '',
    origin_type: 'house',
    origin_elevator: '',
    origin_floor: '',
    destination_zipcode: '',
    destination_street: '',
    destination_number: '',
    destination_complement: '',
    destination_district: '',
    destination_city: '',
    destination_state: '',
    destination_type: 'house',
    destination_elevator: '',
    destination_floor: '',
    observations: ''
  });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  // CEP lookup states (now used in JSX)
  const [originCepLoading, setOriginCepLoading] = useState(false);
  const [originCepError, setOriginCepError] = useState<string | undefined>(undefined);
  const [destinationCepLoading, setDestinationCepLoading] = useState(false);
  const [destinationCepError, setDestinationCepError] = useState<string | undefined>(undefined);

  // debounce timer for CEP lookups
  const cepTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (cepTimer.current) window.clearTimeout(cepTimer.current);
    };
  }, []);

  // format phone to (99) 9999-9999 or (99) 99999-9999 depending on length
  function formatPhone(value: string) {
    const d = value.replace(/\D/g, '').slice(0, 11);
    if (!d) return '';
    if (d.length <= 2) return `(${d}`;
    if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
    // 11 digits (mobile)
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  }

  // format CEP to 00000-000
  function formatCEP(value: string) {
    const d = value.replace(/\D/g, '').slice(0, 8);
    if (!d) return '';
    if (d.length <= 5) return d;
    return `${d.slice(0, 5)}-${d.slice(5)}`;
  }

  function handleCepChange(name: 'origin_zipcode' | 'destination_zipcode', value: string) {
    const formatted = formatCEP(value);
    setForm(prev => ({ ...prev, [name]: formatted }));

    const digits = formatted.replace(/\D/g, '');
    if (cepTimer.current) window.clearTimeout(cepTimer.current);
    cepTimer.current = window.setTimeout(() => {
      if (digits.length === 8) {
        if (name === 'origin_zipcode') {
          setOriginCepLoading(true);
          setOriginCepError(undefined);
          lookupCep(digits)
            .then((addr: CepAddress) => {
              setForm(prev => ({
                ...prev,
                origin_street: addr.street,
                origin_district: addr.district,
                origin_city: addr.city,
                origin_state: addr.state
              }));
            })
            .catch((err: unknown) => setOriginCepError(getErrorMessage(err)))
            .finally(() => setOriginCepLoading(false));
        } else {
          setDestinationCepLoading(true);
          setDestinationCepError(undefined);
          lookupCep(digits)
            .then((addr: CepAddress) => {
              setForm(prev => ({
                ...prev,
                destination_street: addr.street,
                destination_district: addr.district,
                destination_city: addr.city,
                destination_state: addr.state
              }));
            })
            .catch((err: unknown) => setDestinationCepError(getErrorMessage(err)))
            .finally(() => setDestinationCepLoading(false));
        }
      } else {
        if (name === 'origin_zipcode') setOriginCepError(undefined);
        else setDestinationCepError(undefined);
      }
    }, 450);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;

    // apply masks for specific fields like in ContactPage
    if (name === 'residential_phone' || name === 'commercial_phone' || name === 'mobile_phone') {
      setForm(prev => ({ ...prev, [name]: formatPhone(value) }));
      return;
    }

    if (name === 'origin_zipcode' || name === 'destination_zipcode') {
      // delegate to debounced CEP handler
      handleCepChange(name as 'origin_zipcode' | 'destination_zipcode', value);
      return;
    }

    setForm(prev => ({ ...prev, [name]: value }));
  }

  function toggleRadio(name: string, value: string) {
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    setErrorMessage(undefined);

    const subject = 'Orçamento pelo site';
    const messageLines: string[] = [];
    Object.entries(form).forEach(([k, v]) => {
      messageLines.push(`${k}: ${v ?? ''}`);
    });
    const message = messageLines.join('\n');

    try {
      const result = await sendContactEmail({
        name: form.name || 'Solicitante',
        email: form.email || '',
        phone: form.mobile_phone || form.residential_phone || form.commercial_phone || '',
        subject,
        message
      });

      if (result.success) {
        setStatus('success');
        setForm({
          type: 'residencial',
          name: '',
          residential_phone: '',
          commercial_phone: '',
          mobile_phone: '',
          email: '',
          origin_zipcode: '',
          origin_street: '',
          origin_number: '',
          origin_complement: '',
          origin_district: '',
          origin_city: '',
          origin_state: '',
          origin_type: 'house',
          origin_elevator: '',
          origin_floor: '',
          destination_zipcode: '',
          destination_street: '',
          destination_number: '',
          destination_complement: '',
          destination_district: '',
          destination_city: '',
          destination_state: '',
          destination_type: 'house',
          destination_elevator: '',
          destination_floor: '',
          observations: ''
        });
      } else {
        setErrorMessage(result.message ?? 'Erro desconhecido');
        setStatus('error');
      }
    } catch (err: unknown) {
      const message = typeof err === 'object' && err !== null && 'message' in err
        ? (err as { message?: string }).message
        : undefined;
      setErrorMessage(message ?? 'Erro inesperado');
      setStatus('error');
    }
  }

  // basic validation function
  function isFormValid(f: typeof form) {
    if (!f.name || !f.name.trim()) return false;
    if (!f.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) return false;
    if (!f.mobile_phone && !f.residential_phone && !f.commercial_phone) return false;
    const oz = (f.origin_zipcode || '').replace(/\D/g, '');
    const dz = (f.destination_zipcode || '').replace(/\D/g, '');
    if (oz.length !== 8 || dz.length !== 8) return false;
    return true;
  }

  function closeModal() {
    setStatus('idle');
    setErrorMessage(undefined);
  }

  const sending = status === 'sending';

  return (
    <>
      <div className={styles.pageWrapper}>
        <div className={styles.container}>
          <h1 className={styles.title}>Orçamento</h1>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.card}>
              <h3 className={styles.sectionTitle}>Dados para contato</h3>

              <div className={styles.grid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Tipo *</label>
                  <div className={styles.row}>
                    <label><input type="radio" name="type" checked={form.type === 'residencial'} onChange={() => toggleRadio('type', 'residencial')} /> Residencial</label>
                    <label><input type="radio" name="type" checked={form.type === 'comercial'} onChange={() => toggleRadio('type', 'comercial')} /> Comercial</label>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Nome *</label>
                  <input name="name" value={form.name} onChange={handleChange} className={styles.input} required />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Telefone residencial</label>
                  <input name="residential_phone" value={form.residential_phone} onChange={handleChange} className={styles.input} maxLength={15} placeholder="(11) 1234-5678" />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Telefone comercial</label>
                  <input name="commercial_phone" value={form.commercial_phone} onChange={handleChange} className={styles.input} maxLength={15} placeholder="(11) 1234-5678" />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Telefone celular *</label>
                  <input name="mobile_phone" value={form.mobile_phone} onChange={handleChange} className={styles.input} maxLength={15} required placeholder="(11) 91234-5678" />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>E-mail *</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} className={styles.input} required placeholder="seu@email.com" />
                </div>
              </div>
            </div>

            {/* origem */}
            <div className={styles.card}>
              <h3 className={styles.sectionTitle}>Local de origem</h3>
              <div className={styles.grid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>CEP *</label>
                  <input name="origin_zipcode" value={form.origin_zipcode} onChange={handleChange} className={styles.input} maxLength={9} required placeholder="00000-000" />
                  {originCepLoading && <small style={{ display: 'block', color: '#6b7280', marginTop: 6 }}>Buscando endereço...</small>}
                  {originCepError && <small style={{ display: 'block', color: '#dc2626', marginTop: 6 }}>{originCepError}</small>}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Rua *</label>
                  <input name="origin_street" value={form.origin_street} onChange={handleChange} className={`${styles.input} ${styles.readonly}`} readOnly placeholder="Será preenchido automaticamente com o CEP" />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Número</label>
                  <input name="origin_number" value={form.origin_number} onChange={handleChange} className={styles.input} placeholder="Ex: 123, 456A" />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Bairro *</label>
                  <input name="origin_district" value={form.origin_district} onChange={handleChange} className={`${styles.input} ${styles.readonly}`} readOnly placeholder="Será preenchido automaticamente com o CEP" />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Cidade *</label>
                  <input name="origin_city" value={form.origin_city} onChange={handleChange} className={`${styles.input} ${styles.readonly}`} readOnly placeholder="Será preenchido automaticamente com o CEP" />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Estado *</label>
                  <input name="origin_state" value={form.origin_state} onChange={handleChange} className={`${styles.input} ${styles.readonly}`} readOnly placeholder="Será preenchido automaticamente com o CEP" />
                </div>

                <div className={styles.formGroupFull}>
                  <label className={styles.label}>Tipo de imóvel *</label>
                  <div className={styles.row}>
                    <label><input type="radio" name="origin_type" checked={form.origin_type === 'house'} onChange={() => toggleRadio('origin_type', 'house')} /> Casa</label>
                    <label><input type="radio" name="origin_type" checked={form.origin_type === 'apartment'} onChange={() => toggleRadio('origin_type', 'apartment')} /> Apartamento</label>
                  </div>
                </div>
                {form.origin_type === 'apartment' && (
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Complemento</label>
                    <input name="origin_complement" value={form.origin_complement} onChange={handleChange} className={styles.input} placeholder="Ex: Bloco A, Apto 101" />
                  </div>
                )}
              </div>
            </div>

            {/* destino */}
            <div className={styles.card}>
              <h3 className={styles.sectionTitle}>Local de entrega</h3>
              <div className={styles.grid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>CEP *</label>
                  <input name="destination_zipcode" value={form.destination_zipcode} onChange={handleChange} className={styles.input} maxLength={9} required placeholder="00000-000" />
                  {destinationCepLoading && <small style={{ display: 'block', color: '#6b7280', marginTop: 6 }}>Buscando endereço...</small>}
                  {destinationCepError && <small style={{ display: 'block', color: '#dc2626', marginTop: 6 }}>{destinationCepError}</small>}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Rua *</label>
                  <input name="destination_street" value={form.destination_street} onChange={handleChange} className={`${styles.input} ${styles.readonly}`} readOnly placeholder="Será preenchido automaticamente com o CEP" />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Número</label>
                  <input name="destination_number" value={form.destination_number} onChange={handleChange} className={styles.input} placeholder="Ex: 123, 456A" />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Bairro *</label>
                  <input name="destination_district" value={form.destination_district} onChange={handleChange} className={`${styles.input} ${styles.readonly}`} readOnly placeholder="Será preenchido automaticamente com o CEP" />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Cidade *</label>
                  <input name="destination_city" value={form.destination_city} onChange={handleChange} className={`${styles.input} ${styles.readonly}`} readOnly placeholder="Será preenchido automaticamente com o CEP" />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Estado *</label>
                  <input name="destination_state" value={form.destination_state} onChange={handleChange} className={`${styles.input} ${styles.readonly}`} readOnly placeholder="Será preenchido automaticamente com o CEP" />
                </div>

                <div className={styles.formGroupFull}>
                  <label className={styles.label}>Tipo de imóvel *</label>
                  <div className={styles.row}>
                    <label><input type="radio" name="destination_type" checked={form.destination_type === 'house'} onChange={() => toggleRadio('destination_type', 'house')} /> Casa</label>
                    <label><input type="radio" name="destination_type" checked={form.destination_type === 'apartment'} onChange={() => toggleRadio('destination_type', 'apartment')} /> Apartamento</label>
                  </div>
                </div>
                {form.destination_type === 'apartment' && (
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Complemento</label>
                    <input name="destination_complement" value={form.destination_complement} onChange={handleChange} className={styles.input} placeholder="Ex: Bloco A, Apto 101" />
                  </div>
                )}
              </div>
            </div>

            <div className={styles.card}>
              <label className={styles.label}>Observações</label>
              <textarea name="observations" rows={4} value={form.observations} onChange={handleChange} className={styles.textarea} placeholder="Descreva detalhes sobre a mudança, móveis especiais, etc."></textarea>
            </div>

            <div className={styles.actions}>
              <button
                type="submit"
                className={styles.submit}
                disabled={sending || !isFormValid(form) || originCepLoading || destinationCepLoading}
              >
                {sending ? 'Enviando...' : 'Enviar Orçamento'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Modal isOpen={status === 'success'} onClose={closeModal} type="success" />
      <Modal isOpen={status === 'error'} onClose={closeModal} type="error" debugMessage={errorMessage} />
    </>
  );
}

/* helper para extrair mensagem de erro sem usar `any` */
function getErrorMessage(err: unknown): string {
  if (!err) return 'Erro desconhecido';
  if (typeof err === 'string') return err;
  if (err instanceof Error) return err.message;
  const maybe = err as { message?: unknown };
  if (typeof maybe.message === 'string') return maybe.message;
  return 'Erro desconhecido';
}