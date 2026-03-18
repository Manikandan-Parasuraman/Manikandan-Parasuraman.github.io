document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("input");
    const output = document.getElementById("output");
    const error = document.getElementById("error");
    document.getElementById("generate-btn").addEventListener("click", () => {
        const inputVal = input.value;
        error.style.display = "none";
        try {
            output.value = '#' + Math.floor(Math.random()*16777215).toString(16);
        } catch(e) { 
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