import random


class Animal:
    def __init__(self, name, speed, strength, endurance, agility, acceleration, reaction_time, stamina, recovery, focus, consistency, experience):
        self.name = str(name)
        self.speed = float(speed)
        self.strength = float(strength)
        self.endurance = float(endurance)
        self.agility = float(agility)
        self.acceleration = float(acceleration)
        self.reaction_time = float(reaction_time)
        self.stamina = float(stamina)
        self.recovery = float(recovery)
        self.focus = float(focus)
        self.consistency = float(consistency)
        self.experience = float(experience)
        self.performance_score = self.calcuslate_performance_score()

    def calculate_performance_score(self):
        weights = {
            'speed': 0.2,
            'strength': 0.2,
            'endurance': 0.15,
            'agility': 0.15,
            'acceleration': 0.1,
            'reaction_time': 0.1,
            'stamina': 0.05,
            'recovery': 0.05,
            'focus': 0.05,
            'consistency': 0.05,
            'experience': 0.1
        }

        performance_score = (
            self.speed * weights['speed'] +
            self.strength * weights['strength'] +
            self.endurance * weights['endurance'] +
            self.agility * weights['agility'] +
            self.acceleration * weights['acceleration'] +
            (100 - self.reaction_time) * weights['reaction_time'] +
            self.stamina * weights['stamina'] +
            self.recovery * weights['recovery'] +
            self.focus * weights['focus'] +
            self.consistency * weights['consistency'] +
            self.experience * weights['experience']
        )

        return performance_score

    def simulate_race(self):
        random_factor = random.uniform(0.95, 1.05)
        adjusted_score = self.performance_score * random_factor
        return adjusted_score

    def update_attributes(self, race_results):
        highest_score = max(race_results.values())
        if self.name in race_results:
            performance_score = race_results[self.name]
            performance_percentage = performance_score / highest_score
            improvement_factor = 0.05  # 5% improvement for losers
            setback_factor = 0.05      # 5% setback for winners

            if performance_percentage >= 1.0:
                self.speed = max(0, self.speed - setback_factor * 100)
                self.strength = max(0, self.strength - setback_factor * 100)
                self.endurance = max(0, self.endurance - setback_factor * 100)
                self.agility = max(0, self.agility - setback_factor * 100)
                self.acceleration = max(0, self.acceleration - setback_factor * 100)
                self.reaction_time = min(100, self.reaction_time + setback_factor * 100)
                self.stamina = max(0, self.stamina - setback_factor * 100)
                self.recovery = max(0, self.recovery - setback_factor * 100)
                self.focus = max(0, self.focus - setback_factor * 100)
                self.consistency = max(0, self.consistency - setback_factor * 100)
                self.experience = max(0, self.experience - setback_factor * 100)
            else:  # Losing condition
                self.speed = min(100, self.speed + improvement_factor * 100)
                self.strength = min(100, self.strength + improvement_factor * 100)
                self.endurance = min(100, self.endurance + improvement_factor * 100)
                self.agility = min(100, self.agility + improvement_factor * 100)
                self.acceleration = min(100, self.acceleration + improvement_factor * 100)
                self.reaction_time = max(0, self.reaction_time - improvement_factor * 100)
                self.stamina = min(100, self.stamina + improvement_factor * 100)
                self.recovery = min(100, self.recovery + improvement_factor * 100)
                self.focus = min(100, self.focus + improvement_factor * 100)
                self.consistency = min(100, self.consistency + improvement_factor * 100)
                self.experience = min(100, self.experience + improvement_factor * 100)
