// fetchJson disini digunakan untuk file lib/products.tsx
// jadi tidak ada pengulangan code untuk parameter atau function yang sering dipanggil
export async function fetchJson(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`request failed: ${response.status}`);
    }
    return await response.json();
}