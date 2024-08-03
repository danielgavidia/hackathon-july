from model import Animal
class BayesianOddsCalculator:
    def __init__(self, animals):
        self.animals = animals
        self.priors = {animal: 1.0 / len(animals) for animal in animals}  # Uniform priors

    def calculate_likelihood(self, scores):
        likelihoods = {}
        total_score = sum(scores.values())
        for animal, score in scores.items():
            likelihoods[animal] = score / total_score
        return likelihoods

    def update_priors(self, likelihoods):
        for animal in self.priors:
            self.priors[animal] *= likelihoods[animal]
        total = sum(self.priors.values())
        self.posteriors = {animal: self.priors[animal] / total for animal in self.priors}
        return self.posteriors


    def calculate_odds(self):
        def decimal_to_fraction(decimal_odds):
            if decimal_odds == 0:
                return "0/1"  # Avoid division by zero
            numerator = decimal_odds - 1
            # Convert to integer fraction
            return numerator
        
        odds = {animal: decimal_to_fraction(1 / prob) for animal, prob in self.posteriors.items() if prob > 0}
        return odds


def run_race_and_calculate_odds(animals: list[Animal], scores: dict[Animal, float]):
    bayesian_calculator = BayesianOddsCalculator(animals)
    likelihoods = bayesian_calculator.calculate_likelihood(scores)
    posteriors = bayesian_calculator.update_priors(likelihoods)
    odds = bayesian_calculator.calculate_odds()

    return odds