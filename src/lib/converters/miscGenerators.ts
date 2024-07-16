export const generate_uuid = (): string => {
  return self.crypto.randomUUID();
};

export const coin_toss = (): string => {
  return Math.random() < 0.5 ? "Heads" : "Tails";
};

export const dice_roll = (): string => {
  return String(Math.floor(Math.random() * 6) + 1);
};
