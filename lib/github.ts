export interface GitHubUserInfo {
    login: string;
    name: string;
    bio: string;
    email: string | null;
}

/**
 * Fetch user profile information from GitHub
 */
export async function getGitHubUserInfo(username: string): Promise<GitHubUserInfo | null> {
    try {
        const res = await fetch(`https://api.github.com/users/${username}`, {
            headers: { 'User-Agent': 'Microtronic-Portfolio-App' },
            next: { revalidate: 86400 } // Cache for 24 hours
        });
        if (!res.ok) return null;
        return res.json();
    } catch (e) {
        console.error("Error fetching github user info:", e);
        return null;
    }
}
// ใช้ forked code from previous thought to ensure safety
/**
 * ดึงเนื้อหา README.md จาก GitHub Repository ที่ระบุ
 * @param repoPath เช่น 'DarumaKlang/my-nextjs-project'
 * @returns เนื้อหา Markdown ของ README.md เป็น string
 */
export async function getReadmeContent(repoPath: string): Promise<string> {
    const url = `https://api.github.com/repos/${repoPath}/contents/README.md`;

    const headers: Record<string, string> = {
        'Accept': 'application/vnd.github.v3.raw',
        'User-Agent': 'Microtronic-Portfolio-App',
    };

    try {
        const response = await fetch(url, {
            headers,
            // Revalidate ทุก 24 ชั่วโมง เพื่อให้ข้อมูลไม่เก่าจนเกินไป
            next: { revalidate: 86400 }
        });

        if (!response.ok) {
            // โยน Error หากดึงข้อมูลไม่สำเร็จ
            // หาก Repo ไม่สาธารณะ (Private) หรือไม่มีไฟล์ README.md จะเข้าส่วนนี้
            throw new Error(`GitHub API Error: Failed to fetch README for ${repoPath}. Status: ${response.status}`);
        }

        const markdown = await response.text();
        return markdown;

    } catch (error) {
        // Log error เพื่อการดีบัก
        console.error(`Error fetching README for ${repoPath}:`, error);

        // คืนค่าข้อความแจ้งเตือนที่เป็นมิตรกับผู้ใช้
        const errorMessage = `## ❌ ไม่พบข้อมูลโครงการ หรือเกิดข้อผิดพลาดในการดึงข้อมูล\n\nไม่สามารถดึงข้อมูล README.md จาก **${repoPath}** ได้ โปรดตรวจสอบว่า Repository นี้เป็นแบบสาธารณะ (Public) และมีไฟล์ README.md อยู่ใน Root Folder.`;
        return errorMessage;
    }
}

export interface GitHubRepoInfo {
    name: string;
    description: string;
    updated_at: string;
    stargazers_count: number;
    html_url: string;
}

export interface GitHubMilestone {
    id: number;
    title: string;
    description: string;
    state: 'open' | 'closed';
    closed_at: string | null;
}

/**
 * Fetch basic repository information
 */
export async function getRepoInfo(repoPath: string): Promise<GitHubRepoInfo | null> {
    try {
        const res = await fetch(`https://api.github.com/repos/${repoPath}`, {
            headers: { 'User-Agent': 'Microtronic-Portfolio-App' },
            next: { revalidate: 3600 }
        });
        if (!res.ok) return null;
        return res.json();
    } catch (e) {
        console.error("Error fetching repo info:", e);
        return null;
    }
}

/**
 * Fetch milestones to use as project steps
 */
export async function getRepoMilestones(repoPath: string): Promise<GitHubMilestone[]> {
    try {
        const res = await fetch(`https://api.github.com/repos/${repoPath}/milestones?state=all&sort=due_on&direction=asc`, {
            headers: { 'User-Agent': 'Microtronic-Portfolio-App' },
            next: { revalidate: 3600 }
        });
        if (!res.ok) return [];
        return res.json();
    } catch (e) {
        console.error("Error fetching milestones:", e);
        return [];
    }
}