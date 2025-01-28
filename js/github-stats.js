const repos = [
    {
        name: 'LBU-FOCP-Portfolio',
        cardId: 'focp-card'
    },
    {
        name: 'Darts-Scorer',
        cardId: 'darts-card'
    }
];

async function updateGitHubStats() {
    const username = 'jayden-hobbs';
    const repos = {
        'focp-card': 'LBU-FOCP-Portfolio',
        'darts-card': 'Darts_Scorer'  // Changed from Darts-Scorer to match your actual repo name
    };

    for (const [cardId, repoName] of Object.entries(repos)) {
        const card = document.getElementById(cardId);
        if (!card) continue;

        try {
            // Fetch repository data
            const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
            const data = await response.json();

            // Fetch commits data
            const commitsResponse = await fetch(`https://api.github.com/repos/${username}/${repoName}/commits`);
            const commitsData = await commitsResponse.json();

            // Fetch languages data
            const languagesResponse = await fetch(`https://api.github.com/repos/${username}/${repoName}/languages`);
            const languagesData = await languagesResponse.json();

            // Update stars and commits
            card.querySelector('.stars').textContent = `⭐ ${data.stargazers_count}`;
            card.querySelector('.commits').textContent = `📝 ${commitsData.length}`;

            // Update languages
            const totalBytes = Object.values(languagesData).reduce((a, b) => a + b, 0);
            const languageBadges = Object.entries(languagesData)
                .map(([lang, bytes]) => {
                    const percentage = ((bytes / totalBytes) * 100).toFixed(1);
                    return `<span class="badge ${lang.toLowerCase()}">${lang} ${percentage}%</span>`;
                })
                .join(' ');
            card.querySelector('.language-badges').innerHTML = languageBadges;

            // Update description
            const description = data.description || 'No description provided.';
            card.querySelector('.description').textContent = description;
        } catch (error) {
            console.error(`Error fetching stats for ${repoName}:`, error);
            card.querySelector('.stars').textContent = '⭐ 0';
            card.querySelector('.commits').textContent = '📝 0';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const projectsGrid = document.querySelector('.projects-grid');
    projectsGrid.innerHTML = repos.map(repo => `
        <div class="project-card" id="${repo.cardId}">
            <h3>${repo.name.replace(/-/g, ' ')}</h3>
            <div class="language-badges">
                <span class="loading">Loading languages...</span>
            </div>
            <p class="description">Loading description...</p>
            <div class="project-stats">
                <span class="stars">⭐ Loading...</span>
                <span class="commits">📝 Loading...</span>
            </div>
            <div class="project-links">
                <button onclick="showProjectDetails('${repo.cardId.split('-')[0]}')" class="view-details">View Details</button>
                <a href="https://github.com/jayden-hobbs/${repo.name}" target="_blank" class="github-link">View on GitHub</a>
            </div>
        </div>
    `).join('');

    updateGitHubStats();
});

// Refresh stats every 5 minutes
setInterval(updateGitHubStats, 300000);
