"use client"
import * as React from "react"
import { Command } from "cmdk"
import { useRouter } from "next/navigation"
import { ExternalLink, ArrowRight } from "lucide-react"

export default function CommandPalette() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  if (!open) return null

  const handleNavigate = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    } else {
      router.push(`/#${id}`)
    }
    setOpen(false)
  }

  const handleOpenResume = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
    setOpen(false)
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#1c1917]/50 backdrop-blur-xs">
      <div className="fixed left-[50%] top-[20%] w-full max-w-lg -translate-x-1/2 rounded-xl border border-[#e7e0d3] bg-[#ffffff] shadow-2xl overflow-hidden">
        <Command className="flex h-full w-full flex-col overflow-hidden rounded-md bg-[#ffffff] text-[#292524]">
          <Command.Input 
            autoFocus
            className="flex h-11 w-full bg-transparent px-3 py-3 text-sm outline-none placeholder:text-[#a8a29e] disabled:cursor-not-allowed disabled:opacity-50 border-b border-[#e7e0d3] text-[#292524]" 
            placeholder="Type a command or search..." 
          />
          <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2">
            <Command.Empty className="py-6 text-center text-sm text-[#78716c]">No results found.</Command.Empty>
            
            <Command.Group heading="Navigation" className="px-2 py-1.5 text-xs font-semibold text-[#78716c] uppercase tracking-wider">
              <Command.Item 
                className="relative flex cursor-pointer select-none items-center justify-between rounded-lg px-2.5 py-2 text-sm text-[#292524] outline-none aria-selected:bg-[#f5efe6] aria-selected:text-[#9a3412] data-[disabled]:pointer-events-none data-[disabled]:opacity-50 transition-colors"
                onSelect={() => handleNavigate("case-studies")}>
                <span>View Strategic Initiatives</span>
                <ArrowRight className="w-4 h-4 opacity-70" />
              </Command.Item>
              <Command.Item 
                className="relative flex cursor-pointer select-none items-center justify-between rounded-lg px-2.5 py-2 text-sm text-[#292524] outline-none aria-selected:bg-[#f5efe6] aria-selected:text-[#9a3412] data-[disabled]:pointer-events-none data-[disabled]:opacity-50 transition-colors"
                onSelect={() => handleNavigate("experience")}>
                <span>View Experience</span>
                <ArrowRight className="w-4 h-4 opacity-70" />
              </Command.Item>
              <Command.Item 
                className="relative flex cursor-pointer select-none items-center justify-between rounded-lg px-2.5 py-2 text-sm text-[#292524] outline-none aria-selected:bg-[#f5efe6] aria-selected:text-[#9a3412] data-[disabled]:pointer-events-none data-[disabled]:opacity-50 transition-colors"
                onSelect={() => handleNavigate("skills")}>
                <span>View Skills</span>
                <ArrowRight className="w-4 h-4 opacity-70" />
              </Command.Item>
            </Command.Group>
            
            <Command.Group heading="Resumes" className="px-2 py-1.5 text-xs font-semibold text-[#78716c] uppercase tracking-wider">
              <Command.Item 
                className="relative flex cursor-pointer select-none items-center justify-between rounded-lg px-2.5 py-2 text-sm text-[#292524] outline-none aria-selected:bg-[#f5efe6] aria-selected:text-[#9a3412] data-[disabled]:pointer-events-none data-[disabled]:opacity-50 transition-colors"
                onSelect={() => handleOpenResume("https://raw.githubusercontent.com/iarjune/portfolio/main/data/resumes/Ivan.Arjune.347-781-4826_Platform.pdf")}>
                <span>Download &quot;Platform&quot; Resume</span>
                <ExternalLink className="w-4 h-4 opacity-70" />
              </Command.Item>
              <Command.Item 
                className="relative flex cursor-pointer select-none items-center justify-between rounded-lg px-2.5 py-2 text-sm text-[#292524] outline-none aria-selected:bg-[#f5efe6] aria-selected:text-[#9a3412] data-[disabled]:pointer-events-none data-[disabled]:opacity-50 transition-colors"
                onSelect={() => handleOpenResume("https://raw.githubusercontent.com/iarjune/portfolio/main/data/resumes/Ivan.Arjune.347-781-4826_Infra.pdf")}>
                <span>Download &quot;Infrastructure / MLOps&quot; Resume</span>
                <ExternalLink className="w-4 h-4 opacity-70" />
              </Command.Item>
              <Command.Item 
                className="relative flex cursor-pointer select-none items-center justify-between rounded-lg px-2.5 py-2 text-sm text-[#292524] outline-none aria-selected:bg-[#f5efe6] aria-selected:text-[#9a3412] data-[disabled]:pointer-events-none data-[disabled]:opacity-50 transition-colors"
                onSelect={() => handleOpenResume("https://raw.githubusercontent.com/iarjune/portfolio/main/data/resumes/Ivan.Arjune.347-781-4826_Lead.pdf")}>
                <span>Download &quot;Lead Ops&quot; Resume</span>
                <ExternalLink className="w-4 h-4 opacity-70" />
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  )
}
