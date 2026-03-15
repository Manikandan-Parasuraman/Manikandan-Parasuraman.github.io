async function downloadATSResume() {
    if (!resumeData) return;

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: "mm", format: "a4" });

    // Tighter 1-page margins
    let y = 12;
    const margin = 12;
    const rightMargin = 12;
    const pageWidth = 210;
    const maxWidth = pageWidth - margin - rightMargin;
    const pageHeight = 297;
    const bottomMargin = 12;

    function checkPageBreak(requiredSpace) {
        if (y + requiredSpace > pageHeight - bottomMargin) {
            doc.addPage();
            y = margin;
        }
    }

    // Header left-aligned (15pt to save space but remain prominent)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    doc.text(resumeData.personal_info.name.toUpperCase(), margin, y);
    y += 5.5;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    const contactInfo = `${resumeData.personal_info.phone} | ${resumeData.personal_info.email} | ${resumeData.personal_info.location}`;
    doc.text(contactInfo, margin, y);
    y += 4;
    const linksInfo = `${resumeData.personal_info.linkedin_label} | ${resumeData.personal_info.github_label}`;
    doc.text(linksInfo, margin, y);
    y += 6;

    function addHeading(text) {
        checkPageBreak(10);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.text(text.toUpperCase(), margin, y);
        y += 1.5;
        doc.setLineWidth(0.5);
        doc.setDrawColor(50, 50, 50);
        doc.line(margin, y, margin + maxWidth, y);
        y += 4;
    }

    function addText(text, fontSize = 9, isBold = false) {
        doc.setFont("helvetica", isBold ? "bold" : "normal");
        doc.setFontSize(fontSize);
        const lines = doc.splitTextToSize(text, maxWidth);
        checkPageBreak(lines.length * 4.2 + 2);
        doc.text(lines, margin, y);
        y += lines.length * 4.2 + 1;
    }

    function addBullet(text, fontSize = 9) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(fontSize);
        const bullet = "•";
        const bulletSpace = 4;
        const lines = doc.splitTextToSize(text, maxWidth - bulletSpace);
        checkPageBreak(lines.length * 4.2 + 2);
        doc.text(bullet, margin, y);
        doc.text(lines, margin + bulletSpace, y);
        y += lines.length * 4.2 + 0.5;
    }

    if (resumeData.summary) {
        addHeading("Professional Summary");
        addText(resumeData.summary);
        y += 3;
    }

    if (resumeData.skills) {
        addHeading("Technical Skills");
        // Keep only top necessary ATS sets to save space and density
        const necessaryCategories = [
            "Programming Languages",
            "Backend Frameworks",
            "API Development",
            "Databases",
            "Cloud Platforms",
            "DevOps & Code Quality",
            "Software Architecture"
        ];
        let skillBlocks = [];
        for (const [category, skills] of Object.entries(resumeData.skills)) {
            if (necessaryCategories.includes(category)) {
                skillBlocks.push(`${category}: ${skills.join(", ")}`);
            }
        }
        // Join them to form a compact, dense skill block
        addText(skillBlocks.join(" | "));
        y += 3;
    }

    if (resumeData.experience && resumeData.experience.length > 0) {
        addHeading("Professional Experience");
        resumeData.experience.forEach(exp => {
            checkPageBreak(10);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(9.5);

            const headerText = `${exp.role} - ${exp.company}`;
            const dateStr = exp.period;

            // Right align date
            const dateWidth = doc.getStringUnitWidth(dateStr) * 9.5 / doc.internal.scaleFactor;
            doc.text(headerText, margin, y);
            doc.text(dateStr, margin + maxWidth - dateWidth, y);
            y += 4.5;

            exp.highlights.forEach(h => {
                addBullet(h);
            });
            y += 2;
        });
    }

    if (resumeData.projects && resumeData.projects.length > 0) {
        addHeading("Projects");
        resumeData.projects.forEach(p => {
            checkPageBreak(10);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(9.5);
            doc.text(p.name, margin, y);
            y += 4.5;

            addText(p.description, 9, false);
            y += 1;
        });
        y += 1;
    }

    if (resumeData.education && resumeData.education.length > 0) {
        addHeading("Education");
        resumeData.education.forEach(edu => {
            checkPageBreak(8);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(9.5);
            doc.text(edu.degree, margin, y);

            const dateWidth = doc.getStringUnitWidth(edu.year) * 9.5 / doc.internal.scaleFactor;
            doc.text(edu.year, margin + maxWidth - dateWidth, y);
            y += 4.5;

            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);
            doc.text(edu.institution, margin, y);
            y += 4.5;
        });
        y += 2;
    }

    if (resumeData.certifications && resumeData.certifications.length > 0) {
        addHeading("Certifications");
        // Implicitly take the latest 5 only
        const latestCerts = resumeData.certifications.slice(0, 5);
        latestCerts.forEach(cert => {
            addBullet(`${cert.title} - ${cert.issuer} (${cert.year})`);
        });
    }

    doc.save(`${resumeData.personal_info.name.replace(/ /g, '_')}_Resume.pdf`);
}
