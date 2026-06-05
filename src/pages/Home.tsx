import { Link } from 'react-router-dom'
import { Button } from '@scorp-ds/components'
import { ArrowRight } from 'lucide-react'
import PixelFire from '../components/PixelFire'
import PixelClouds from '../components/PixelClouds'
import PageContainer from '../components/PageContainer'

// Pull real data from the data files
import { getFeaturedProjects } from '../data/projects'
import { getLatestPosts } from '../data/posts'

// Reusable card components
import FeaturedProjectCard from '../components/FeaturedProjectCard'
import PostCard from '../components/PostCard'

// Carousel sizing. EDGE_PAD aligns the first card with the 672px content column
// (and the page's 24px mobile gutter); cards then scroll off the right edge.
// CARD_W matches the content column so the lead card looks like the page width.
const EDGE_PAD = 'max(24px, calc((100vw - 672px) / 2))'
const CARD_W = 'min(672px, calc(100vw - 48px))'

export default function Home() {
  // Get featured projects and the 3 most recent posts
  const featuredProjects = getFeaturedProjects()
  const latestPosts = getLatestPosts(3)

  return (
    <>
    {/* Pixel clouds drifting left to right across the top */}
    <PixelClouds />

    <PageContainer flushTop>

      <div className="space-y-16 md:space-y-20 pt-8 md:pt-12">

      {/* ===== Hero Section ===== */}
      <section>
        <h1 className="text-base font-mono font-light text-amber-600 leading-[1.7] mb-4">
          Sacha Hurley
        </h1>
        <p className="text-base font-mono text-[var(--text-secondary)] max-w-3xl leading-[1.625]">
          I'm a product designer working where design meets AI. I use AI tools
          to build real products, from design systems to full apps.
        </p>
      </section>

      <div className="border-t-[0.5px] border-solid border-sepia-500 dark:border-sepia-800" role="separator" />

      {/* ===== Featured Projects ===== */}
      <section className="space-y-6 pb-6 md:pb-8">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-mono font-medium text-[var(--text-primary)]">
            Projects
          </h2>
          <Link to="/projects" className="no-underline">
            <Button variant="link" iconRight={<ArrowRight size={16} className="-translate-y-px" />} className="-mr-6">
              View All
            </Button>
          </Link>
        </div>

        {/* Full-bleed horizontal carousel. The lead card aligns with the page
            content; the rest scroll off the right edge of the screen. */}
        <div
          className="flex gap-6 overflow-x-auto w-screen relative left-1/2 -ml-[50vw] snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          style={{ paddingLeft: EDGE_PAD, paddingRight: EDGE_PAD, scrollPaddingLeft: EDGE_PAD }}
        >
          {featuredProjects.map((project) => (
            <div key={project.slug} className="shrink-0 snap-start" style={{ width: CARD_W }}>
              <FeaturedProjectCard project={project} />
            </div>
          ))}

          {/* Two more image containers that scroll off the side (placeholders) */}
          {[0, 1].map((i) => (
            <div key={`placeholder-${i}`} className="shrink-0 snap-start" style={{ width: CARD_W }}>
              <div className="relative overflow-hidden rounded-[24px] border-[0.5px] border-solid border-sepia-500 dark:border-sepia-800 aspect-video">
                <div className="absolute inset-0 bg-gradient-to-br from-sepia-200 via-sepia-100 to-amber-100 dark:from-sepia-950 dark:via-sepia-925 dark:to-amber-950" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="border-t-[0.5px] border-solid border-sepia-500 dark:border-sepia-800" role="separator" />

      {/* ===== Latest Notes ===== */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-mono font-medium text-[var(--text-primary)]">
            Notes
          </h2>
          <Link to="/notes" className="no-underline">
            <Button variant="link" iconRight={<ArrowRight size={16} className="-translate-y-px" />} className="-mr-6">
              View All
            </Button>
          </Link>
        </div>

        <div className="divide-y-[0.5px] divide-solid divide-sepia-500 dark:divide-sepia-800 [&>a:first-child>article]:pt-0">
          {latestPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      </div>

    </PageContainer>

    {/* Pixel fire animation - only on the home page */}
    <PixelFire />
    </>
  )
}
