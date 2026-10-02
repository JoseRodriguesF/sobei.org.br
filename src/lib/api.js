// ============================================
// SOBEI Site Público — API Integration
// ============================================

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api';
const TIMEOUT_MS = 10000;

function createTimeoutSignal(ms = TIMEOUT_MS) {
  if (typeof AbortSignal !== 'undefined' && AbortSignal.timeout) {
    return AbortSignal.timeout(ms);
  }
  const controller = new AbortController();
  setTimeout(() => controller.abort(), ms);
  return controller.signal;
}

// ---- Vagas Públicas ----

export async function fetchVagasPublicas() {
  try {
    const response = await fetch(`${API_BASE_URL}/public/vagas`, {
      cache: 'no-store',
      signal: createTimeoutSignal(),
    });

    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar vagas:', error);
    return [];
  }
}

export async function fetchVagaPublica(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/public/vagas/${id}`, {
      cache: 'no-store',
      signal: createTimeoutSignal(),
    });

    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar vaga:', error);
    return null;
  }
}

export async function enviarCandidatura(vagaId, formData) {
  try {
    const response = await fetch(`${API_BASE_URL}/public/vagas/${vagaId}/candidatar`, {
      method: 'POST',
      body: formData, // FormData — sem Content-Type header (browser define multipart automaticamente)
      signal: createTimeoutSignal(15000), // Mais tempo para upload de arquivos
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      return { success: false, message: err.message || 'Erro ao enviar candidatura' };
    }

    return await response.json();
  } catch (error) {
    const isTimeout = error.name === 'TimeoutError' || error.name === 'AbortError';
    return { 
      success: false, 
      message: isTimeout 
        ? 'O tempo limite de conexão expirou ao enviar o arquivo. Verifique sua conexão e tente novamente.'
        : 'Erro de conexão com o servidor. Tente novamente mais tarde.' 
    };
  }
}

export async function enviarMensagemUnidade(data) {
  try {
    const response = await fetch(`${API_BASE_URL}/public/mensagens-unidade`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      signal: createTimeoutSignal(),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      return { success: false, message: err.message || 'Erro ao enviar mensagem' };
    }

    return { success: true, data: await response.json() };
  } catch (error) {
    const isTimeout = error.name === 'TimeoutError' || error.name === 'AbortError';
    return { 
      success: false, 
      message: isTimeout 
        ? 'O envio demorou mais do que o esperado. Verifique sua conexão e tente novamente.'
        : 'Erro de conexão com o servidor. Tente novamente mais tarde.' 
    };
  }
}
