"use client"

import ParticleScene from "../components/ParticleScene"
import GitHubProjects from "../components/GitHubProjects"
import GitHubCalendar from "react-github-calendar"
import Typing from "react-typing-effect"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { Command } from "cmdk"

export default function Home() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const [open, setOpen] = useState(false)

    useEffect(() => setMounted(true), [])
    if (!mounted) return null

    return (
        <main className="relative min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-500">

            <ParticleScene />

            <Command.Dialog open={open} onOpenChange={setOpen}
                className="fixed top-1/4 left-1/2 -translate-x-1/2 w-96 bg-zinc-900 text-white p-4 rounded-xl">
                <Command.Input placeholder="Search..." />
                <Command.List>
                    <Command.Item onSelect={() => setTheme(theme === "dark" ? "light" : "dark")}>
                        Toggle Build / Break Mode
                    </Command.Item>
                </Command.List>
            </Command.Dialog>

            <header className="flex justify-between p-6">
                <h1 className="font-bold text-xl">Manikandan</h1>
                <div className="flex gap-4">
                    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="border px-4 py-2 rounded-lg">
                        {theme === "dark" ? "Build Mode" : "Break Mode"}
                    </button>
                    <button onClick={() => setOpen(true)}
                        className="border px-4 py-2 rounded-lg">
                        ⌘K
                    </button>
                </div>
            </header>

            <section className="text-center mt-32">
                <h2 className="text-5xl font-bold">
                    Engineering. Automation. Security.
                </h2>
            </section>

            <section className="mt-40 max-w-4xl mx-auto px-6 text-green-400 font-mono">
                <p>$ whoami</p>
                <Typing
                    text={[
                        "Software Engineer",
                        "Automation Specialist",
                        "Security Enthusiast",
                    ]}
                    speed={60}
                />
            </section>

            <section className="mt-40 max-w-6xl mx-auto px-6">
                <h2 className="text-3xl font-semibold mb-6">
                    Live GitHub Projects
                </h2>
                <GitHubProjects />
            </section>

            <section className="mt-40 text-center">
                <h3 className="text-3xl font-semibold mb-6">
                    GitHub Activity
                </h3>
                <GitHubCalendar
                    username="YOUR_USERNAME"
                    colorScheme={theme === "dark" ? "dark" : "light"}
                />
            </section>

            <footer className="mt-40 text-center pb-20">
                <a href="/resume.pdf"
                    className="border px-6 py-3 rounded-lg">
                    Download Resume
                </a>
            </footer>

        </main>
    )
}
