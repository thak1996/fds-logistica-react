export interface CepAddress {
  cep: string;
  street: string;
  district: string;
  city: string;
  state: string;
}

const CACHE = new Map<string, CepAddress | null>();

function normalizeCep(cep: string) {
  return (cep || '').replace(/\D/g, '').slice(0, 8);
}

export function isValidCep(cep: string) {
  return normalizeCep(cep).length === 8;
}

export async function lookupCep(rawCep: string, timeoutMs = 5000): Promise<CepAddress> {
  const cep = normalizeCep(rawCep);
  if (cep.length !== 8) throw new Error('CEP inválido');

  if (CACHE.has(cep)) {
    const cached = CACHE.get(cep);
    if (cached) return cached;
    throw new Error('CEP não encontrado');
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`, { signal: controller.signal });
    clearTimeout(timer);

    if (!res.ok) throw new Error(`Erro na consulta CEP (${res.status})`);
    const data = await res.json();

    if (data.erro) {
      CACHE.set(cep, null);
      throw new Error('CEP não encontrado');
    }

    const addr: CepAddress = {
      cep: data.cep || cep,
      street: data.logradouro || '',
      district: data.bairro || '',
      city: data.localidade || '',
      state: data.uf || ''
    };

    CACHE.set(cep, addr);
    return addr;
  } catch (err: unknown) {
    clearTimeout(timer);
    if (typeof err === 'object' && err !== null && 'name' in err && (err as { name?: string }).name === 'AbortError') {
      throw new Error('Tempo esgotado na consulta de CEP');
    }
    throw new Error((typeof err === 'object' && err !== null && 'message' in err) ? (err as { message?: string }).message ?? 'Falha ao consultar CEP' : 'Falha ao consultar CEP');
  }
}