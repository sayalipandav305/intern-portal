function animateDonation(targetValue) {
  let count = 0;
  const donationsEl = document.getElementById("donations");

  const interval = setInterval(() => {
    count += Math.ceil(targetValue / 60);
    if (count >= targetValue) {
      count = targetValue;
      clearInterval(interval);
    }
    donationsEl.textContent = `Donations Raised: ₹${count}`;
  }, 20);
}

fetch("http://localhost:5000/api/intern")
  .then(res => res.json())
  .then(data => {
    document.getElementById("intern-name").textContent = `Welcome, ${data.name} 👋`;
    document.getElementById("referral-code").textContent = `Referral Code: ${data.referralCode}`;
    animateDonation(data.donations);

    if (data.donations >= 10000) {
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 }
      });
    }
  });

fetch("http://localhost:5000/api/leaderboard")
  .then(res => res.json())
  .then(data => {
    const leaderboard = document.getElementById("leaderboard");
    data.forEach(user => {
      const li = document.createElement("li");
      li.textContent = `${user.name} – ₹${user.donations}`;
      leaderboard.appendChild(li);
    });
  });
window.onload = () => {
  fetch('http://localhost:5000/api/intern')
    .then(res => res.json())
    .then(data => {
      document.getElementById('internName').textContent = data.name;
      document.getElementById('refCode').textContent = data.referralCode;
      document.getElementById('totalRaised').textContent = `₹${data.totalRaised}`;
    });
};
