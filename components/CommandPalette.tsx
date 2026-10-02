"use client"
import * as React from "react"
import { Command } from "cmdk"
import { useRouter } from "next/navigation"

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

  return (
    <div className="fixed inset-0 z-50 bg-black/80">
      <div className="fixed left-[50%] top-[20%] w-full max-w-lg -translate-x-1/2 rounded-xl border bg-background shadow-2xl">
        <Command className="flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground">
          <Command.Input 
            autoFocus
            className="flex h-11 w-full rounded-md bg-transparent px-3 py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border-b" 
            placeholder="Type a command or search..." 
          />
          <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2">
            <Command.Empty className="py-6 text-center text-sm">No results found.</Command.Empty>
            
            <Command.Group heading="Navigation" className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
              <Command.Item 
                className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                onSelect={() => { router.push("/"); setOpen(false) }}>
                Home
              </Command.Item>
              <Command.Item 
                className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                onSelect={() => { router.push("/topology"); setOpen(false) }}>
                System Topology Viewer
              </Command.Item>
            </Command.Group>
            
            <Command.Group heading="Actions" className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
              <Command.Item 
                className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                onSelect={() => { 
                  // open resume modal somehow? We can dispatch event
                  window.dispatchEvent(new CustomEvent('open-resume-modal'))
                  setOpen(false) 
                }}>
                Download Resume PDF
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  )
}
