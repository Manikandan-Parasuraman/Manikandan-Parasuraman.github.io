/* Resume Data Object - Embedded to work even without a local server */
const RESUME_DATA = {
    "personal_info": {
        "name": "Manikandan Parasuraman",
        "role": "Senior Software Engineer",
        "location": "Tiruvannamalai, Tamil Nadu",
        "phone": "+91 7305769813",
        "email": "manikandan3007@yahoo.com",
        "linkedin": "https://www.linkedin.com/in/manikandan-parasuraman",
        "linkedin_label": "linkedin.com/in/manikandan-parasuraman",
        "github": "https://github.com/Manikandan-Parasuraman",
        "github_label": "github.com/Manikandan-Parasuraman"
    },
    "summary": "Experienced Software Engineer specializing in microservices architecture, REST API development, MongoDB database design, automation frameworks, cloud deployment (GCP & Azure), CI/CD implementation, and code quality governance using SonarQube.",
    "skills": [
        "Flask", "FastAPI", "MongoDB", "PyMongo", "Selenium", "BeautifulSoup", "SonarQube",
        "GCP", "Azure", "Git", "Bitbucket", "Jira", "Agile", "Scrum"
    ],
    "experience": [
        {
            "company": "Quantrium.ai",
            "role": "Software Engineer",
            "period": "Feb 2019 – Present",
            "highlights": [
                "Designed and implemented microservices architecture.",
                "Developed scalable REST APIs.",
                "Managed MongoDB scripting and optimization.",
                "Deployed applications to GCP and Azure."
            ]
        },
        {
            "company": "Kadamba Technologies",
            "role": "Software Tester",
            "period": "Dec 2017 – Feb 2019",
            "highlights": [
                "Developed automation testing framework.",
                "Managed defect lifecycle and documentation."
            ]
        }
    ],
    "projects": [
        {
            "name": "Custom Automation Testing Framework",
            "description": "Modular CI/CD integrated automation solution."
        },
        {
            "name": "MongoDB MCP Server",
            "description": "REST-based MCP server with MongoDB integration."
        }
    ],
    "education": [
        {
            "degree": "Bachelor of Technology (B.Tech) – Information Technology",
            "institution": "SKP Engineering College",
            "year": "2017"
        }
    ],
    "certifications": [
        "Oracle Certified Professional, Java SE 8",
        "RDBMS – NIIT",
        "Manual & Automation Testing",
        "Diplomate in Computer Application"
    ]
};

let resumeData = RESUME_DATA; // Default to embedded data

async function loadResumeContent() {
    console.log("Loading resume content...");

    // First, render with embedded data so the page isn't empty
    renderResume(RESUME_DATA);

    // Then, try to fetch the latest JSON if we're on a server
    try {
        const response = await fetch('../data/resume.json');
        if (response.ok) {
            resumeData = await response.json();
            console.log("Updated data with latest JSON from server.");
            renderResume(resumeData);
        }
    } catch (e) {
        console.warn("Could not fetch remote JSON (likely offline or local file). Using embedded data fallback.");
    }
}

function renderResume(data) {
    if (!data) return;

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
    if (expDiv) {
        expDiv.innerHTML = data.experience.map(exp => `
            <div class="job">
                <strong>${exp.role} – ${exp.company}</strong><br>
                <em>${exp.period}</em><br>
                ${exp.highlights.map(h => `• ${h}`).join('<br>')}
                <br><br>
            </div>
        `).join('');
    }

    // Projects
    const projectsDiv = document.getElementById('resume-projects');
    if (projectsDiv) {
        projectsDiv.innerHTML = data.projects.map(p => `
            <div class="project-item">
                <strong>${p.name}</strong> – ${p.description}
            </div>
        `).join('');
    }

    // Education
    const eduDiv = document.getElementById('resume-education');
    if (eduDiv) {
        eduDiv.innerHTML = data.education.map(edu => `
            <div class="edu-item">
                <strong>${edu.degree}</strong><br>
                ${edu.institution}, ${edu.year}
            </div>
        `).join('');
    }

    // Certifications
    const certDiv = document.getElementById('resume-certifications');
    if (certDiv) {
        certDiv.innerHTML = data.certifications.join('<br>');
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
