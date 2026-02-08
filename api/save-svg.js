export default async function handler(req, res) {
    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const REPO_OWNER = 'info-afk4';
    const REPO_NAME = 'training';
    const FILE_PATH = 'data/svg-edits.json';
    const BRANCH = 'main';

    if (!GITHUB_TOKEN) {
        return res.status(500).json({ error: 'GitHub token not configured' });
    }

    try {
        const { svgId, svgCode } = req.body;
        if (!svgId || !svgCode) {
            return res.status(400).json({ error: 'Missing svgId or svgCode' });
        }

        // 1. Get current file from GitHub
        const getUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}?ref=${BRANCH}`;
        const getRes = await fetch(getUrl, {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        let currentData = {};
        let sha = null;

        if (getRes.ok) {
            const fileInfo = await getRes.json();
            sha = fileInfo.sha;
            const content = Buffer.from(fileInfo.content, 'base64').toString('utf-8');
            currentData = JSON.parse(content);
        }

        // 2. Update with new edit
        currentData[svgId] = svgCode;

        // 3. Commit updated file to GitHub
        const newContent = Buffer.from(JSON.stringify(currentData, null, 2)).toString('base64');
        const putUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;
        const putBody = {
            message: `Update SVG: ${svgId}`,
            content: newContent,
            branch: BRANCH
        };
        if (sha) putBody.sha = sha;

        const putRes = await fetch(putUrl, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(putBody)
        });

        if (!putRes.ok) {
            const err = await putRes.text();
            return res.status(500).json({ error: 'GitHub commit failed', details: err });
        }

        return res.status(200).json({ success: true, svgId });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
