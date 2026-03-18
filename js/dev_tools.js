document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('tools-container');
    const searchInput = document.getElementById('tool-search');

    if (!container || !searchInput) return;

    function renderTools(filter = '') {
        container.innerHTML = '';
        if (typeof TOOLS === 'undefined') return;

        const categories = [...new Set(TOOLS.map(t => t.category))];
        
        categories.forEach(cat => {
            const catTools = TOOLS.filter(t => 
                t.category === cat && 
                (t.name.toLowerCase().includes(filter.toLowerCase()) || 
                 t.category.toLowerCase().includes(filter.toLowerCase()))
            );

            if (catTools.length > 0) {
                const catTitle = document.createElement('div');
                catTitle.className = 'category-title';
                catTitle.innerHTML = `<i class="fas fa-folder-open"></i> ${cat}`;
                container.appendChild(catTitle);

                catTools.forEach(tool => {
                    const card = document.createElement('a');
                    card.href = `dev_tools/${tool.path}.html`;
                    card.className = 'tool-card';
                    card.innerHTML = `
                        <div>
                            <div class="tool-name">${tool.name}</div>
                            <div class="tool-desc">${tool.desc}</div>
                        </div>
                        <div class="btn-open">Open Tool</div>
                    `;
                    container.appendChild(card);
                });
            }
        });

        if (container.innerHTML === '') {
            container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-light);">No tools found matching "${filter}"</div>`;
        }
    }

    searchInput.addEventListener('input', (e) => {
        renderTools(e.target.value);
    });

    renderTools();
});
