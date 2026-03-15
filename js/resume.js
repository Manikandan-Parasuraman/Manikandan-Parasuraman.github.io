let resumeData = null;

async function loadResumeContent() {
    console.log("Loading resume content...");

    try {
        const response = await fetch('../data/resume.json');
        if (response.ok) {
            resumeData = await response.json();
            console.log("Loaded resume data from JSON file.");
            renderResume(resumeData);
        } else {
            console.error("Failed to fetch resume data.");
        }
    } catch (e) {
        console.error("Error fetching resume data. If you are viewing this via file:///, your browser may be blocking the request due to CORS policies. Please use a local server.", e);
    }
}

function renderResume(data) {
    if (!data) return;

    // Personal Info
    const nameEl = document.getElementById('user-name');
    if (nameEl) nameEl.textContent = data.personal_info.name;

    const roleEl = document.getElementById('user-role');
    if (roleEl) roleEl.textContent = data.personal_info.role;

    const linkedinBtn = document.getElementById('linkedin-btn');
    if (linkedinBtn) linkedinBtn.href = data.personal_info.linkedin;

    const linkedinFooterBtn = document.getElementById('linkedin-footer-btn');
    if (linkedinFooterBtn) linkedinFooterBtn.href = data.personal_info.linkedin;

    const githubBtn = document.getElementById('github-btn');
    if (githubBtn) githubBtn.href = data.personal_info.github;

    const githubHeaderBtn = document.getElementById('github-header-btn');
    if (githubHeaderBtn) githubHeaderBtn.href = data.personal_info.github;

    const contactDiv = document.getElementById('user-contact');
    if (contactDiv) {
        contactDiv.innerHTML = `
            <span><i class="fas fa-envelope"></i> ${data.personal_info.email}</span>
            <span><i class="fas fa-phone"></i> ${data.personal_info.phone}</span>
            <span><i class="fas fa-map-marker-alt"></i> ${data.personal_info.location}</span>
        `;
    }

    // Summary
    const summaryEl = document.getElementById('resume-summary');
    if (summaryEl) {
        summaryEl.textContent = data.summary;
    }

    // Skills
    const skillsDiv = document.getElementById('resume-skills');
    if (skillsDiv) {
        skillsDiv.innerHTML = data.skills.map(skill => `<span class="skill-badge">${skill}</span>`).join('');
    }

    // Work Experience
    const expDiv = document.getElementById('resume-experience');
    if (expDiv) {
        expDiv.innerHTML = data.experience.map(exp => `
            <div class="exp-item">
                <p class="exp-date">${exp.period}</p>
                <h3>${exp.role} | ${exp.company}</h3>
                <ul style="margin-top: 10px; padding-left: 20px;">
                    ${exp.highlights.map(h => `<li>${h}</li>`).join('')}
                </ul>
            </div>
        `).join('');
    }

    // Projects
    const projectsDiv = document.getElementById('resume-projects');
    if (projectsDiv) {
        projectsDiv.innerHTML = data.projects.map(p => `
            <div class="card">
                <h3 style="color: var(--primary-navy); margin-bottom:10px">${p.name}</h3>
                <p style="font-size: 0.9rem; color: var(--text-light); flex-grow:1">${p.description}</p>
            </div>
        `).join('');
    }

    // Education
    const eduDiv = document.getElementById('resume-education');
    if (eduDiv) {
        eduDiv.innerHTML = `<h4 style="color: var(--primary-navy); font-size: 1.2rem; margin-bottom: 0.5rem;">Education</h4>` + data.education.map(edu => `
            <div style="margin-bottom: 15px;">
                <h5 style="font-size: 1rem; color: var(--text-main); font-weight: 600;">${edu.degree}</h5>
                <p style="color: var(--text-light); font-size: 0.9rem;">${edu.institution}, ${edu.year}</p>
            </div>
        `).join('');
    }

    // Certifications
    const certDiv = document.getElementById('resume-certifications');
    if (certDiv) {
        certDiv.innerHTML = `<h4 style="color: var(--primary-navy); font-size: 1.2rem;">Certifications</h4>
            <ul style="font-size: 0.9rem; padding-left: 20px; color: var(--text-main); margin-top: 10px;">
                ${data.certifications.map(c => `<li style="margin-bottom: 5px;">${c}</li>`).join('')}
            </ul>`;
    }
}

async function downloadATSResume() {
    if (!resumeData) return;

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: "mm", format: "a4" });

    let y = 20;

    function addHeading(text) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(13);
        doc.text(text, 20, y);
        y += 8;
    }

    function addText(text) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        const lines = doc.splitTextToSize(text, 170);
        doc.text(lines, 20, y);
        y += lines.length * 6 + 4;
    }

    // Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(resumeData.personal_info.name, 20, y); y += 8;

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`${resumeData.personal_info.location} | ${resumeData.personal_info.phone} | ${resumeData.personal_info.email}`, 20, y); y += 6;
    doc.text(`LinkedIn: ${resumeData.personal_info.linkedin_label}`, 20, y); y += 6;
    doc.text(`GitHub: ${resumeData.personal_info.github_label}`, 20, y); y += 10;

    addHeading("PROFESSIONAL SUMMARY");
    addText(resumeData.summary);

    addHeading("SKILLS");
    addText(resumeData.skills.join(", "));

    addHeading("WORK EXPERIENCE");
    resumeData.experience.forEach(exp => {
        addText(`${exp.role} – ${exp.company} (${exp.period})`);
        exp.highlights.forEach(h => {
            addText(`• ${h}`);
            y -= 4;
        });
        y += 4;
    });

    addHeading("PROJECTS");
    resumeData.projects.forEach(p => {
        addText(`${p.name} | ${p.description}`);
    });

    addHeading("EDUCATION");
    resumeData.education.forEach(edu => {
        addText(`${edu.degree} – ${edu.institution} (${edu.year})`);
    });

    addHeading("CERTIFICATIONS");
    addText(resumeData.certifications.join(" | "));

    doc.save(`${resumeData.personal_info.name.replace(' ', '_')}_Resume.pdf`);
}
