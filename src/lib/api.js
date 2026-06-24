// ============================================
// SOBEI Site Público — API Integration
// ============================================

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api';

// ---- Vagas Públicas ----

export async function fetchVagasPublicas() {
  try {
    const response = await fetch(`${API_BASE_URL}/public/vagas`, {
      cache: 'no-store',
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
    });

    if (!response.ok) {
      const err = await response.json();
      return { success: false, message: err.message || 'Erro ao enviar candidatura' };
    }

    return await response.json();
  } catch (error) {
    return { success: false, message: 'Erro de conexão com o servidor' };
  }
}
