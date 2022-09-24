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

        self.totalScore = self.SkillsScore = self.experienceScore = 0

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

        self.currentSkills = [skill.name.lower() for skill in self.profile.skills.all()]
        self.jobSkills = [skill.name.lower() for skill in self.job.skills.all()]
        self.currentExperience = [experience.description.lower() for experience in ProfileExperience.objects.filter(profile = self.profile)]
        self.jobExperience = [experience.experience.lower() for experience in Experience.objects.filter(job = self.job)]

    def getTotalScore(self):
        return self.totalScore

    def setTotalScore(self, score):
        self.totalScore = score

    def calculateSkillsScore(self):
        for skill in self.currentSkills:
            if skill in str(self.jobSkills):
                self.SkillsScore += 1
            
            else:
                self.SkillsScore += 0.4
                
        return self.SkillsScore

    def calculateExperienceScore(self):
        for experience in self.currentExperience:
            if experience in str(self.jobExperience):
                self.experienceScore += 1
            
            else:
                self.experienceScore += 0.4
        
        return self.experienceScore
        
    def calculateTotalScore(self):
        if len(self.jobSkills):
          self.SkillsScore = (self.calculateSkillsScore() / len(self.job.skills.all()) * self.skillsSection) * 100

        if len(self.jobExperience):
          self.experienceScore = (self.calculateExperienceScore() / len(self.jobExperience) * self.ExperienceSection) * 100

        self.setTotalScore(self.SkillsScore + self.experienceScore)