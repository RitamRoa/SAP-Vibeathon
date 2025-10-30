import { NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"
import pdf from "pdf-parse"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!)

// Get default skills if all else fails
function getDefaultSkills(): string[] {
  return [
    "Communication",
    "Teamwork",
    "Problem Solving",
    "Leadership",
    "Continuous Learning",
    "Innovation",
    "Technology",
    "Collaboration",
    "Creativity",
    "Critical Thinking",
    "Adaptability",
    "Professional Development"
  ]
}

// Fallback function to extract skills from keywords
function extractSkillsFromKeywords(text: string): string[] {
  const skillsAndInterests = {
    // Programming & Tech
    "JavaScript": ["JavaScript", "Web Development"],
    "TypeScript": ["TypeScript", "Type Safety"],
    "Python": ["Python", "Data Science"],
    "Java": ["Java", "Enterprise Software"],
    "C++": ["C++", "Systems Programming"],
    "React": ["React", "Frontend Development"],
    "Node.js": ["Node.js", "Backend Development"],
    "Angular": ["Angular", "Web Applications"],
    "Vue": ["Vue.js", "Progressive Web Apps"],
    "Docker": ["Docker", "Containerization"],
    "Kubernetes": ["Kubernetes", "Cloud Native"],
    "AWS": ["AWS", "Cloud Computing"],
    "Azure": ["Azure", "Microsoft Cloud"],
    "GCP": ["GCP", "Google Cloud"],
    "SQL": ["SQL", "Database Management"],
    "MongoDB": ["MongoDB", "NoSQL"],
    "PostgreSQL": ["PostgreSQL", "Relational Databases"],
    "Git": ["Git", "Version Control"],
    "CI/CD": ["CI/CD", "DevOps"],
    "Machine Learning": ["Machine Learning", "AI/ML"],
    "AI": ["Artificial Intelligence", "AI Research"],
    "Data": ["Data Analysis", "Big Data"],
    "Blockchain": ["Blockchain", "Web3"],
    "Mobile": ["Mobile Development", "App Development"],
    "iOS": ["iOS Development", "Swift"],
    "Android": ["Android Development", "Kotlin"],
    
    // Design & Creative
    "UI/UX": ["UI/UX Design", "User Experience"],
    "Design": ["Design Thinking", "Visual Design"],
    "Figma": ["Figma", "Prototyping"],
    "Photoshop": ["Adobe Photoshop", "Graphic Design"],
    "Illustrator": ["Adobe Illustrator", "Vector Graphics"],
    
    // Business & Management
    "Product": ["Product Management", "Product Strategy"],
    "Agile": ["Agile", "Scrum"],
    "Project Management": ["Project Management", "Planning"],
    "Strategy": ["Business Strategy", "Strategic Planning"],
    "Marketing": ["Digital Marketing", "Marketing Strategy"],
    "Sales": ["Sales", "Business Development"],
    "Analytics": ["Business Analytics", "Data-Driven Decisions"],
    
    // Interests & Domains
    "Startup": ["Startups", "Entrepreneurship"],
    "Innovation": ["Innovation", "Technology Trends"],
    "Open Source": ["Open Source", "Community Building"],
    "Teaching": ["Teaching", "Mentorship"],
    "Research": ["Research", "Academic Work"],
    "Writing": ["Technical Writing", "Content Creation"],
    "Speaking": ["Public Speaking", "Conferences"],
    "Sustainability": ["Sustainability", "Green Tech"],
    "Healthcare": ["Healthcare Technology", "Health Tech"],
    "Finance": ["Fintech", "Financial Technology"],
    "Education": ["EdTech", "Educational Technology"],
    "Gaming": ["Game Development", "Gaming Industry"],
    "Security": ["Cybersecurity", "Information Security"],
    "IoT": ["Internet of Things", "Connected Devices"],
  }

  const lowerText = text.toLowerCase()
  const foundItems = new Set<string>()

  // Check for each keyword and add related skills/interests
  Object.entries(skillsAndInterests).forEach(([keyword, items]) => {
    if (lowerText.includes(keyword.toLowerCase())) {
      items.forEach(item => foundItems.add(item))
    }
  })

  // Also look for common interest words
  const interestKeywords = [
    "passionate about", "interested in", "enthusiast", "advocate for",
    "contributor to", "volunteer", "mentor", "speaker", "author",
    "community", "blog", "publish", "research", "study"
  ]

  interestKeywords.forEach(keyword => {
    if (lowerText.includes(keyword)) {
      // Extract context around these words
      const index = lowerText.indexOf(keyword)
      const context = text.substring(Math.max(0, index - 50), Math.min(text.length, index + 100))
      
      // Add some generic interests based on context
      if (context.toLowerCase().includes("tech")) foundItems.add("Technology Innovation")
      if (context.toLowerCase().includes("team")) foundItems.add("Team Collaboration")
      if (context.toLowerCase().includes("learn")) foundItems.add("Continuous Learning")
    }
  })

  const result = Array.from(foundItems)
  return result.length > 0 ? result.slice(0, 15) : getDefaultSkills()
}

export async function POST(request: NextRequest) {
  try {
    console.log("Extract skills API called")
    
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      console.error("No file provided")
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    console.log("File received:", file.name, file.type, file.size)

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    console.log("Extracting text from PDF...")
    
    // Extract text from PDF
    let data
    try {
      data = await pdf(buffer)
    } catch (pdfError: any) {
      console.error("PDF parsing error:", pdfError)
      // If PDF parsing fails, return some default skills
      return NextResponse.json({ 
        skills: getDefaultSkills(),
        message: "Could not parse PDF, using default skills" 
      })
    }
    
    const text = data.text

    console.log("Extracted text length:", text?.length)

    if (!text || text.trim().length === 0) {
      console.log("No text extracted, using default skills")
      return NextResponse.json({ 
        skills: getDefaultSkills(),
        message: "No text found in PDF, using default skills" 
      })
    }

    console.log("Using Gemini to extract skills...")
    
    // Use Gemini to extract skills
    let skills: string[] = []
    
    try {
      const model = genAI.getGenerativeModel({ 
        model: process.env.GOOGLE_GEMINI_MODEL || "gemini-1.5-flash" 
      })

      const prompt = `You are an expert at analyzing professional profiles and building comprehensive knowledge graphs about people's skills, interests, and passions.

Analyze the following LinkedIn profile/resume text and extract:

1. **Technical & Professional Skills**: Programming languages, frameworks, tools, methodologies, certifications
2. **Soft Skills**: Leadership, communication, collaboration, problem-solving abilities
3. **Domain Expertise**: Industry knowledge, specializations
4. **Interests & Passions**: Infer what this person might be interested in based on their:
   - Projects they've worked on
   - Technologies they use
   - Industries they're in
   - Hobbies mentioned
   - Volunteer work
   - Publications or speaking engagements
   - Communities they're part of
   - Course topics or learning areas
   
Think broadly about their interests. For example:
- A web developer might be interested in: Open Source, UI/UX Design, Web Performance, Accessibility, Developer Tools
- A data scientist might be interested in: Machine Learning Research, Data Visualization, Statistical Modeling, Big Data, AI Ethics
- An entrepreneur might be interested in: Startup Ecosystems, Product Management, Innovation, Business Strategy, Venture Capital

Build a rich knowledge graph. Be creative and inferential. Extract up to 20 unique items that represent their skills AND interests.

Return ONLY a JSON array of strings. Mix skills, technologies, and interest areas. Format: ["item1", "item2", ...]

Profile text:
${text.substring(0, 15000)}`

      const result = await model.generateContent(prompt)
      const response = await result.response
      const skillsText = response.text()

      console.log("Gemini response:", skillsText)

      // Parse the JSON response
      try {
        // Remove markdown code blocks if present
        const cleanText = skillsText.replace(/```json\n?|\n?```/g, "").trim()
        skills = JSON.parse(cleanText)
      } catch (parseError) {
        console.log("JSON parse error, trying regex extraction")
        // If parsing fails, try to extract skills using regex
        const skillMatches = skillsText.match(/"([^"]+)"/g)
        if (skillMatches) {
          skills = skillMatches.map((s) => s.replace(/"/g, ""))
        }
      }
    } catch (geminiError: any) {
      console.error("Gemini API error:", geminiError)
      // Fallback to keyword extraction if Gemini fails
      skills = extractSkillsFromKeywords(text)
    }

    // Fallback: if no skills extracted, provide some defaults based on keywords
    if (!skills || skills.length === 0) {
      console.log("No skills from Gemini, using keyword extraction")
      skills = extractSkillsFromKeywords(text)
    }

    // Limit to top 20 items
    console.log("Final skills:", skills)
    return NextResponse.json({ skills: skills.slice(0, 20) })
  } catch (error: any) {
    console.error("Error extracting skills:", error)
    // Return default skills even on error
    return NextResponse.json({ 
      skills: getDefaultSkills(),
      message: "Error processing file, using default skills"
    })
  }
}
