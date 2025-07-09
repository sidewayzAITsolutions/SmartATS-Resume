import { NextRequest, NextResponse } from 'next/server';
import pdfParse from 'pdf-parse';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('resume') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const data = await pdfParse(buffer);
    
    // Simple parsing logic - enhance as needed
    const parsedData = {
      personal: {
        fullName: extractName(data.text),
        email: extractEmail(data.text),
        phone: extractPhone(data.text),
      },
      summary: extractSummary(data.text),
      experience: extractExperience(data.text),
      education: extractEducation(data.text),
      skills: extractSkills(data.text),
    };

    return NextResponse.json(parsedData);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to parse resume' }, { status: 500 });
  }
}

// Helper functions
function extractEmail(text: string): string {
  const emailRegex = /[\w.-]+@[\w.-]+\.\w+/;
  const match = text.match(emailRegex);
  return match ? match[0] : '';
}

function extractPhone(text: string): string {
  const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
  const match = text.match(phoneRegex);
  return match ? match[0] : '';
}

function extractName(text: string): string {
  // Look for name patterns at the beginning of the document
  const lines = text.split('\n').filter(line => line.trim().length > 0);
  const firstLine = lines[0]?.trim() || '';

  // Simple heuristic: if first line has 2-3 words and no special characters, it's likely a name
  const namePattern = /^[A-Za-z\s]{2,50}$/;
  if (namePattern.test(firstLine) && firstLine.split(' ').length >= 2 && firstLine.split(' ').length <= 4) {
    return firstLine;
  }

  return '';
}

function extractSummary(text: string): string {
  // Look for summary/objective sections
  const summaryKeywords = ['summary', 'objective', 'profile', 'about'];
  const lines = text.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].toLowerCase();
    if (summaryKeywords.some(keyword => line.includes(keyword))) {
      // Get the next few lines as summary
      const summaryLines = [];
      for (let j = i + 1; j < Math.min(i + 5, lines.length); j++) {
        const nextLine = lines[j].trim();
        if (nextLine && !nextLine.match(/^[A-Z\s]+$/)) { // Skip all-caps headers
          summaryLines.push(nextLine);
        }
      }
      return summaryLines.join(' ').substring(0, 500);
    }
  }

  return '';
}

function extractExperience(text: string): any[] {
  // Look for experience section and extract job entries
  const experienceKeywords = ['experience', 'employment', 'work history', 'professional experience'];
  const lines = text.split('\n');
  const experiences = [];

  let inExperienceSection = false;
  let currentJob: any = {};

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const lowerLine = line.toLowerCase();

    // Check if we're entering experience section
    if (experienceKeywords.some(keyword => lowerLine.includes(keyword))) {
      inExperienceSection = true;
      continue;
    }

    // Check if we're leaving experience section
    if (inExperienceSection && (lowerLine.includes('education') || lowerLine.includes('skills'))) {
      if (currentJob.title) experiences.push(currentJob);
      break;
    }

    if (inExperienceSection && line) {
      // Look for job titles (usually followed by company or dates)
      const datePattern = /\d{4}|\d{1,2}\/\d{4}/;
      if (datePattern.test(line)) {
        if (currentJob.title) {
          experiences.push(currentJob);
          currentJob = {};
        }
        currentJob.years = line;
      } else if (!currentJob.title && line.length > 5 && line.length < 100) {
        currentJob.title = line;
        currentJob.company = '';
        currentJob.description = '';
      }
    }
  }

  if (currentJob.title) experiences.push(currentJob);
  return experiences.slice(0, 5); // Limit to 5 experiences
}

function extractEducation(text: string): any[] {
  // Look for education section
  const educationKeywords = ['education', 'academic', 'degree', 'university', 'college'];
  const lines = text.split('\n');
  const education = [];

  let inEducationSection = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const lowerLine = line.toLowerCase();

    if (educationKeywords.some(keyword => lowerLine.includes(keyword))) {
      inEducationSection = true;
      continue;
    }

    if (inEducationSection && (lowerLine.includes('skills') || lowerLine.includes('experience'))) {
      break;
    }

    if (inEducationSection && line && line.length > 10) {
      const degreePattern = /(bachelor|master|phd|doctorate|associate|diploma|certificate)/i;
      if (degreePattern.test(line)) {
        education.push({
          degree: line,
          institution: '',
          year: '',
          gpa: ''
        });
      }
    }
  }

  return education.slice(0, 3); // Limit to 3 education entries
}

function extractSkills(text: string): string[] {
  // Look for skills section
  const skillsKeywords = ['skills', 'technical skills', 'competencies', 'technologies'];
  const lines = text.split('\n');
  const skills = [];

  let inSkillsSection = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const lowerLine = line.toLowerCase();

    if (skillsKeywords.some(keyword => lowerLine.includes(keyword))) {
      inSkillsSection = true;
      continue;
    }

    if (inSkillsSection && (lowerLine.includes('experience') || lowerLine.includes('education'))) {
      break;
    }

    if (inSkillsSection && line) {
      // Split by common delimiters
      const lineSkills = line.split(/[,•·|]/).map(s => s.trim()).filter(s => s.length > 1 && s.length < 30);
      skills.push(...lineSkills);
    }
  }

  return skills.slice(0, 20); // Limit to 20 skills
}