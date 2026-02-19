"use client"

import { useEffect, useState } from "react"

export default function GitHubProjects() {
    const [repos, setRepos] = useState<any[]>([])

    useEffect(() => {
        fetch("https://api.github.com/users/YOUR_USERNAME/repos?sort=updated")
            .then(res => res.json())
            .then(data => {
                const filtered = data
                    .filter((repo: any) => !repo.fork)
                    .slice(0, 6)
                setRepos(filtered)
            })
    }, [])

    return (
        <div className="grid md:grid-cols-3 gap-6 mt-10">
            {repos.map((repo) => (
                <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    className="border p-6 rounded-xl hover:scale-105 transition"
                >
                    <h3 className="font-semibold mb-2">{repo.name}</h3>
                    <p className="text-sm text-gray-400">
                        {repo.description}
                    </p>
                </a>
            ))}
        </div>
    )
}
