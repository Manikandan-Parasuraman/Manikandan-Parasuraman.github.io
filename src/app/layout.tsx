import './globals.css'
import { ThemeProvider } from 'next-themes'
import PageTransition from '../components/PageTransition'

export const metadata = {
    title: "Manikandan | Software Engineer",
    description: "Automation, Security, and Scalable Systems"
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <ThemeProvider attribute="class" defaultTheme="dark">
                    <PageTransition>
                        {children}
                    </PageTransition>

                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                "@context": "https://schema.org",
                                "@type": "Person",
                                name: "Manikandan",
                                jobTitle: "Software Engineer",
                                url: "https://YOUR_USERNAME.github.io",
                                sameAs: [
                                    "https://github.com/YOUR_USERNAME"
                                ]
                            })
                        }}
                    />
                </ThemeProvider>
            </body>
        </html>
    )
}
