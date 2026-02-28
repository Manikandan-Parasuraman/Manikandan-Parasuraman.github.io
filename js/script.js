let resumeData = null;

// Fetch and load resume data
async function loadResumeContent() {
    try {
        const response = await fetch('data/resume.json');
        resumeData = await response.json();
        renderResume(resumeData);
    } catch (error) {
        console.error("Error loading resume data:", error);
    }
}

function renderResume(data) {
    // Personal Info
    document.getElementById('user-name').textContent = data.personal_info.name;
    document.getElementById('user-role').textContent = data.personal_info.role;

    const contactDiv = document.getElementById('user-contact');
    if (contactDiv) {
        contactDiv.innerHTML = `
            ${data.personal_info.location} | 
            ${data.personal_info.phone} | 
            ${data.personal_info.email} | 
            <a href="${data.personal_info.linkedin}" target="_blank">${data.personal_info.linkedin_label}</a> | 
            <a href="${data.personal_info.github}" target="_blank">${data.personal_info.github_label}</a>
        `;
    }

    // Summary
    document.getElementById('resume-summary').textContent = data.summary;

    // Skills
    document.getElementById('resume-skills').textContent = data.skills.join(', ') + '.';

    // Work Experience
    const expDiv = document.getElementById('resume-experience');
    expDiv.innerHTML = data.experience.map(exp => `
        <strong>${exp.role} – ${exp.company}</strong><br>
        ${exp.period}<br>
        ${exp.highlights.map(h => `• ${h}`).join('<br>')}
        <br><br>
    `).join('');

    // Projects
    const projectsDiv = document.getElementById('resume-projects');
    projectsDiv.innerHTML = data.projects.map(p => `
        <strong>${p.name}</strong> – ${p.description}<br>
    `).join('');

    // Education
    const eduDiv = document.getElementById('resume-education');
    eduDiv.innerHTML = data.education.map(edu => `
        ${edu.degree}<br>
        ${edu.institution}, ${edu.year}
    `).join('');

    // Certifications
    const certDiv = document.getElementById('resume-certifications');
    certDiv.innerHTML = data.certifications.join('<br>');
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
