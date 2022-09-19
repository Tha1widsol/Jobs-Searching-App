def calculateScore(profile, job):
    skillsSection = 0.5
    ExperienceSection = 0.35
    EducationSection = 0.1
    BenefitsSection = 0.05

    totalScore = SkillsScore = 0

    educationRank = {
        'No formal education': 1,
        'Secondary education': 2,
        'GED': 3,
        'A-Levels': 4,
        "Bachelor's degree": 5,
        "Master's degree": 6,
        'Doctorate or higher': 7,
        'Vocational qualification': 8
    }

    currentSkills = [skill.name.lower() for skill in profile.skills.all()]
    jobSkills = [skill.name.lower() for skill in job.skills.all()]

    for skill in currentSkills:
        if skill in str(jobSkills):
            SkillsScore += 1
        
        else:
            SkillsScore += 0.4

    if len(job.skills.all()):
           totalScore += (SkillsScore / len(jobSkills)) * skillsSection

    return totalScore * 100
