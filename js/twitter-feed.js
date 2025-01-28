// Configuration object
const config = {
    bearerToken: 'Nk3KDvkZGqIF2DR5LjxutFKpJ'  // Your X API token
};

async function fetchXPosts() {
    const xFeed = document.getElementById('x-feed');
    
    try {
        console.log('Fetching X posts...');
        
        const response = await fetch('https://api.twitter.com/2/tweets/search/recent', {
            headers: {
                'Authorization': `Bearer ${config.bearerToken}`,
                'Content-Type': 'application/json'
            }
        });

        console.log('Response:', response);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Data received:', data);

        if (data.data && data.data.length > 0) {
            displayPosts(data.data);
        } else {
            xFeed.innerHTML = '<p>No posts available.</p>';
        }

    } catch (error) {
        console.error('Error fetching posts:', error);
        xFeed.innerHTML = `<p class="error">Error loading posts: ${error.message}</p>`;
    }
}

function displayPosts(posts) {
    const xFeed = document.getElementById('x-feed');
    
    const postsHTML = posts.map(post => `
        <div class="x-post">
            <p>${post.text}</p>
            <small>${new Date(post.created_at).toLocaleDateString()}</small>
        </div>
    `).join('');

    xFeed.innerHTML = postsHTML;
}

// Load posts when the page loads
document.addEventListener('DOMContentLoaded', fetchXPosts); 