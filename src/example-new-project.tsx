/**
 * EXAMPLE: Using Scorpion UI in a New Project
 * 
 * This file shows exactly how to use the Scorpion UI package
 * Copy this pattern to your new project!
 * 
 * SETUP INSTRUCTIONS:
 * 1. In your new project, install: npm install scorpion-ui
 * 2. Copy this file to your new project
 * 3. Setup Tailwind config (see instructions below)
 * 4. Import this component in your App.tsx
 */

// ============================================
// STEP 1: Import CSS (do this ONCE in your main.tsx or App.tsx)
// ============================================
// Uncomment this line in your main entry file:
// import '@sachahurley/scorpion-ui/styles'

// ============================================
// STEP 2: Import components from scorpion-ui
// ============================================
import { 
  ThemeProvider,
  Button,
  Input,
  Card,
  Modal,
  Badge,
  Alert,
  Avatar,
  Divider,
  ThemeToggle,
  type ButtonProps,
} from '@sachahurley/scorpion-ui'

import { Download, User, Settings } from 'lucide-react'
import { useState } from 'react'

// ============================================
// STEP 3: Create your component
// ============================================
export function ExampleNewProject() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [email, setEmail] = useState('')

  return (
    // ============================================
    // STEP 4: Wrap with ThemeProvider
    // ============================================
    <ThemeProvider>
      <div className="min-h-screen bg-[var(--surface-page)] p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-mono font-bold text-[var(--text-primary)]">
              My New Project
            </h1>
            <ThemeToggle />
          </div>

          {/* Welcome Card */}
          <Card>
            <h2 className="text-2xl font-mono font-bold mb-4">
              Welcome to Scorpion UI
            </h2>
            <p className="text-[var(--text-secondary)] mb-6">
              This is an example of how to use the Scorpion UI design system
              in your new project. All components are ready to use!
            </p>
            
            <div className="space-y-4">
              <Input 
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="large"
              />
              <div className="flex gap-4">
                <Button variant="primary" iconLeft={<Download />}>
                  Get Started
                </Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </Card>

          {/* Components Showcase */}
          <Card>
            <h2 className="text-2xl font-mono font-bold mb-4">Components</h2>
            
            <div className="space-y-6">
              {/* Buttons */}
              <div>
                <h3 className="text-lg font-mono font-bold mb-2">Buttons</h3>
                <div className="flex flex-wrap gap-2">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Delete</Button>
                </div>
              </div>

              <Divider />

              {/* Badges */}
              <div>
                <h3 className="text-lg font-mono font-bold mb-2">Badges</h3>
                <div className="flex gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="error">Error</Badge>
                  <Badge variant="info">Info</Badge>
                </div>
              </div>

              <Divider />

              {/* Alert */}
              <Alert variant="info">
                This is an info alert. Use alerts to show important messages.
              </Alert>

              <Divider />

              {/* Avatar */}
              <div>
                <h3 className="text-lg font-mono font-bold mb-2">Avatars</h3>
                <div className="flex gap-4">
                  <Avatar src="https://via.placeholder.com/40" alt="User" />
                  <Avatar fallback="JD" />
                  <Avatar fallback="AB" />
                </div>
              </div>

              <Divider />

              {/* Modal Trigger */}
              <div>
                <Button onClick={() => setIsModalOpen(true)}>
                  Open Modal Example
                </Button>
              </div>
            </div>
          </Card>

          {/* Modal */}
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Example Modal"
          >
            <div className="space-y-4">
              <p className="text-[var(--text-primary)]">
                This is a modal dialog. You can put any content here.
              </p>
              <div className="flex gap-4">
                <Button onClick={() => setIsModalOpen(false)}>
                  Close
                </Button>
                <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                  Save
                </Button>
              </div>
            </div>
          </Modal>

        </div>
      </div>
    </ThemeProvider>
  )
}

/**
 * TAILWIND CONFIG SETUP
 * 
 * Create or update tailwind.config.js in your new project:
 * 
 * module.exports = {
 *   presets: [require('@sachahurley/scorpion-ui/tailwind.preset.js')],
 *   darkMode: ["class"],
 *   content: [
 *     "./index.html",
 *     "./src/**/*.{js,ts,jsx,tsx}",
 *     "./node_modules/scorpion-ui/dist/**/*.{js,ts,jsx,tsx}",
 *   ],
 * }
 */
