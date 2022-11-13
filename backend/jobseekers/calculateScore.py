from .models import ProfileExperience
from employers.models import Experience

class calculateScore:
    def __init__(self, profile, job):
        self.profile = profile
        self.job = job
        self.skillsSection = 0.5
        self.ExperienceSection = 0.35
        self.EducationSection = 0.1
        self.BenefitsSection = 0.05

        self.educationRank = {
            'No formal education': 1,
            'Secondary education': 2,
            'GED': 3,
            'A-Levels': 4,
            "Bachelor's degree": 5,
            "Master's degree": 6,
            'Doctorate or higher': 7,
            'Vocational qualification': 8
        }
       
    def getTotalScore(self):
        return self.totalScore

    def setTotalScore(self, score):
        self.totalScore = score

    def calculateSkillsScore(self):
        score = 0
        currentSkills = [skill.name.lower() for skill in self.profile.skills.all()]
        jobSkills = [skill.name.lower() for skill in self.job.skills.all()]

        for skill in currentSkills:
            if skill in str(jobSkills):
                score += 0.4
            
            else:
                score += 0.15
        
        if len(jobSkills):
            return (score / len(jobSkills) * self.skillsSection) * 100
                
        return 0

    def calculateExperienceScore(self):
        score = 0
        currentExperience = [experience.description.lower() for experience in ProfileExperience.objects.filter(profile = self.profile)]
        jobExperience = [experience.experience.lower() for experience in Experience.objects.filter(job = self.job)]
        
        for experience in currentExperience:
            if experience in str(jobExperience):
                score += 1
            
            else:
                score += 0.4
        
        if len(jobExperience):
           return (score / len(jobExperience) * self.ExperienceSection) * 100

        return 0

    def calculateBenefitsScore(self):
        score = 0
        maxBenefitsLength = 20
        
        if not len(self.job.benefits.all()):
            return 0

        if len(self.job.benefits.all()) < maxBenefitsLength:
            score = len(self.job.benefits.all()) * 0.4
            return score

        return (score / maxBenefitsLength * self.BenefitsSection) * 100

    def calculateTotalScore(self):
        skillsScore = self.calculateSkillsScore()
        experienceScore = self.calculateExperienceScore()
        benefitsScore = self.calculateBenefitsScore()

        self.setTotalScore(skillsScore + experienceScore + benefitsScore)