import confetti from 'canvas-confetti';

export default function BirthdayButton({ onClick }: { onClick: () => void }) {
  const handleClick = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className="glow-button w-full py-2 text-white rounded-full bg-pink-500 hover:bg-pink-600 transition-all duration-300"
    >
      Happy Birthday 🎉
    </button>
  );
}