document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("input");
    const output = document.getElementById("output");
    const error = document.getElementById("error");
    document.getElementById("generate-btn").addEventListener("click", () => {
        const inputVal = input.value;
        error.style.display = "none";
        try { const s = inputVal.length; let score = 0; if (s > 8) score++; if (/[A-Z]/.test(inputVal)) score++; if (/[0-9]/.test(inputVal)) score++; if (/[^A-Za-z0-9]/.test(inputVal)) score++; const labels = ['Very Weak', 'Weak', 'Good', 'Strong', 'Excellent']; output.value = 'Strength: ' + labels[score] + ' (' + s + ' chars)'; } catch(e) { 
            console.error(e);
            error.textContent = "Error: " + e.message;
            error.style.display = "block";
        }
    });
    document.getElementById("clear-btn").addEventListener("click", () => { input.value = ""; output.value = ""; error.style.display = "none"; });
    document.getElementById("copy-btn").addEventListener("click", () => { output.select(); document.execCommand("copy"); const toast = document.getElementById("copy-toast"); toast.style.display = "block"; setTimeout(() => toast.style.display = "none", 2000); });
    document.addEventListener("keydown", (e) => {
        if (e.ctrlKey && e.key === "Enter") document.getElementById("generate-btn").click();
    });
});