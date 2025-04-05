// Utility to encode/decode base64
function arrayBufferToBase64(buffer) {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

function base64ToArrayBuffer(base64) {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
}

async function getKey(password, salt) {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
        "raw", enc.encode(password), "PBKDF2", false, ["deriveKey"]
    );
    return crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: salt,
            iterations: 100000,
            hash: "SHA-256"
        },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"]
    );
}

async function encryptText() {
    const text = document.getElementById("plainText").value;
    const password = document.getElementById("password").value;
    const resultDiv = document.getElementById("result");

    if (!text || !password) {
        resultDiv.innerText = "Please enter both text and password.";
        return;
    }

    const enc = new TextEncoder();
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const key = await getKey(password, salt);
    const encrypted = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv: iv },
        key,
        enc.encode(text)
    );

    const payload = {
        iv: arrayBufferToBase64(iv),
        salt: arrayBufferToBase64(salt),
        data: arrayBufferToBase64(encrypted)
    };

    resultDiv.innerText = JSON.stringify(payload, null, 2);
}

async function decryptText() {
    const password = document.getElementById("password").value;
    const resultDiv = document.getElementById("result");

    let payload;
    try {
        payload = JSON.parse(document.getElementById("plainText").value);
    } catch (e) {
        resultDiv.innerText = "Invalid JSON. Please paste valid encrypted data.";
        return;
    }

    try {
        const key = await getKey(password, base64ToArrayBuffer(payload.salt));
        const decrypted = await crypto.subtle.decrypt(
            { name: "AES-GCM", iv: base64ToArrayBuffer(payload.iv) },
            key,
            base64ToArrayBuffer(payload.data)
        );

        const dec = new TextDecoder();
        resultDiv.innerText = "Decrypted text:\n" + dec.decode(decrypted);
    } catch (err) {
        resultDiv.innerText = "Decryption failed. Wrong password or malformed data.";
    }
}