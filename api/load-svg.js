export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const REPO_OWNER = 'info-afk4';
    const REPO_NAME = 'training';
    const FILE_PATH = 'data/svg-edits.json';
    const BRANCH = 'main';

    try {
        // Try fetching the raw file directly (works without token too)
        const url = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${BRANCH}/${FILE_PATH}`;
        const headers = {};
        if (GITHUB_TOKEN) {
            headers['Authorization'] = `token ${GITHUB_TOKEN}`;
        }

        const response = await fetch(url, { headers });

        if (!response.ok) {
            return res.status(200).json({});
        }

        const data = await response.json();
        return res.status(200).json(data);
    } catch (err) {
        return res.status(200).json({});
    }
}
