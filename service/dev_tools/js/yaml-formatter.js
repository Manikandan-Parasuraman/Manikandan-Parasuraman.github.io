document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("input");
    const output = document.getElementById("output");
    const error = document.getElementById("error");

    function loadJsYaml() {
        return new Promise((resolve, reject) => {
            if (window.jsyaml) return resolve();
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/js-yaml/4.1.0/js-yaml.min.js';
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
        });
    }

    document.getElementById("generate-btn").addEventListener("click", async () => {
        const inputVal = input.value.trim();
        if (!inputVal) return;
        
        error.style.display = "none";
        try {
            await loadJsYaml();
            const obj = jsyaml.load(inputVal);
            output.value = jsyaml.dump(obj, { indent: 2 });
        } catch(e) { 
            console.error(e);
            error.textContent = "Error: Invalid YAML string.";
            error.style.display = "block";
        }
    });

    document.getElementById("clear-btn").addEventListener("click", () => { input.value = ""; output.value = ""; error.style.display = "none"; });
    document.getElementById("copy-btn").addEventListener("click", () => { output.select(); document.execCommand("copy"); const toast = document.getElementById("copy-toast"); toast.style.display = "block"; setTimeout(() => toast.style.display = "none", 2000); });
});