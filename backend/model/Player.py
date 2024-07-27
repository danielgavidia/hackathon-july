class Player:
    def __init__(self, name, balance=100):
        self.name = name
        self.balance = balance
        self.bets = {}

    def place_bet(self, horse, amount):
        if amount > self.balance:
            print(f"{self.name}, you don't have enough balance to place this bet.")
            return False
        if horse in self.bets:
            self.bets[horse] += amount
        else:
            self.bets[horse] = amount
        self.balance -= amount
        print(f"{self.name} placed a bet of {amount} on {horse}. Current balance: {self.balance}.")
        return True

    def update_balance(self, horse, odds):
        if horse in self.bets:
            winnings = self.bets[horse] * odds
            self.balance += winnings
            print(f"{self.name} won {winnings}! New balance: {self.balance}.")
        else:
            print(f"{self.name} did not bet on {horse}.")
        self.bets.clear()  # Clear bets after each race

    def display_balance(self):
        print(f"{self.name}'s current balance: {self.balance}")

    def display_bets(self):
        if not self.bets:
            print(f"{self.name} has no current bets.")
        else:
            print(f"{self.name}'s current bets:")
            for horse, amount in self.bets.items():
                print(f"  {horse}: {amount}")


if __name__ == "__main__":
    player = Player("Tej")
