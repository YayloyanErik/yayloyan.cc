function md5(buffer) {
    return SparkMD5.ArrayBuffer.hash(buffer);
}

async function generateHash() {
    const fileInput = document.getElementById('fileInput');
    const resultDiv = document.getElementById('hashResult');
    const algorithm = document.getElementById('algorithm').value;
    const file = fileInput.files[0];

    if (!file) {
        resultDiv.innerText = "Please select a file first.";
        return;
    }

    const arrayBuffer = await file.arrayBuffer();

    if (algorithm === 'MD5') {
        const hashHex = md5(arrayBuffer);
        resultDiv.innerText = `MD5: ${hashHex}`;
        return;
    }

    const hashBuffer = await crypto.subtle.digest(algorithm, arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    resultDiv.innerText = `${algorithm}: ${hashHex}`;
}

async function generateTextHash() {
    const text = document.getElementById('textInput').value;
    const resultDiv = document.getElementById('textHashResult');
    const algorithm = document.getElementById('algorithm').value;

    if (!text) {
        resultDiv.innerText = "Please enter some text first.";
        return;
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    if (algorithm === 'MD5') {
        const hashHex = SparkMD5.hash(text);
        resultDiv.innerText = `MD5: ${hashHex}`;
        return;
    }

    const hashBuffer = await crypto.subtle.digest(algorithm, data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    resultDiv.innerText = `${algorithm}: ${hashHex}`;
}