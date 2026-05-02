"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import type { Project } from "@/lib/data/projects";
import { getRelatedProjects } from "@/lib/data/projects";
import { cn } from "@/lib/utils";
function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-2xl border border-white/10 p-4">
      <p className="text-xs text-white/55">{label}</p>
      <p className="mt-2 text-xl font-extrabold text-white">{value}</p>
    </div>
  );
}

export function ProjectDetail({ project }: { project: Project }) {
  const related = getRelatedProjects(project.category, project.slug, 3);

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pb-24 pt-28">
      <nav className="text-sm text-white/55" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-white">
              Home
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href="/portfolio" className="hover:text-white">
              Portfolio
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-white/80">{project.title}</li>
        </ol>
      </nav>

      <section className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-xs tracking-[0.35em] text-white/55 uppercase">{project.category}</p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold text-white">{project.title}</h1>
          <p className="mt-4 text-lg text-white/70">{project.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech.split(",").map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80"
              >
                {t.trim()}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl px-6 py-3 font-semibold text-white bg-gradient-to-r from-primary to-secondary"
              >
                View live
              </a>
            )}
            <Link
              href="/contact"
              className="rounded-xl px-6 py-3 font-semibold text-white/90 glass hover:text-white transition-colors"
            >
              Start a similar project
            </Link>
          </div>
        </div>

        <div
          className={cn(
            "relative overflow-hidden rounded-3xl border border-white/10 aspect-[16/10] bg-gradient-to-br",
            project.gradient
          )}
        >
          {project.image && (
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(circle at 25% 20%, rgba(255,255,255,0.10), transparent 60%), radial-gradient(circle at 70% 80%, rgba(0,0,0,0.25), transparent 55%)"
            }}
          />
        </div>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 glass rounded-3xl border border-white/10 p-6 sm:p-8">
          <h2 className="text-xl font-extrabold text-white">Challenge</h2>
          <p className="mt-3 text-white/70 leading-relaxed">{project.challenge}</p>
          <h2 className="mt-8 text-xl font-extrabold text-white">Solution</h2>
          <p className="mt-3 text-white/70 leading-relaxed">{project.solution}</p>
          <h2 className="mt-8 text-xl font-extrabold text-white">Results</h2>
          <p className="mt-3 text-white/70 leading-relaxed">{project.result}</p>
        </div>
        <div className="space-y-3">
          {project.metrics.map((m) => (
            <MetricCard key={m.label} label={m.label} value={m.value} />
          ))}
          {project.downloads && (
            <div className="glass rounded-2xl border border-white/10 p-4">
              <p className="text-xs text-white/55">Downloads</p>
              <p className="mt-2 text-xl font-extrabold text-white">{project.downloads}</p>
            </div>
          )}
          {project.engagement && (
            <div className="glass rounded-2xl border border-white/10 p-4">
              <p className="text-xs text-white/55">Engagement</p>
              <p className="mt-2 text-xl font-extrabold text-white">{project.engagement}</p>
            </div>
          )}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-extrabold text-white">Gallery</h2>
        <div className="mt-4">
          <Swiper modules={[Pagination]} pagination={{ clickable: true }} spaceBetween={14} slidesPerView={1.1} breakpoints={{ 768: { slidesPerView: 2 } }}>
            {project.gallery.map((g, i) => (
              <SwiperSlide key={g + i}>
                <div className="relative h-56 rounded-2xl border border-white/10 overflow-hidden bg-gradient-to-br from-white/10 to-white/5">
                  {g && !g.startsWith("/placeholder") && (
                    <img
                      src={g}
                      alt={`${project.title} gallery ${i + 1}`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section className="mt-12 glass rounded-3xl border border-white/10 p-6 sm:p-8">
        <h2 className="text-xl font-extrabold text-white">Client testimonial</h2>
        <blockquote className="mt-4 text-lg text-white/75 leading-relaxed">
          “{project.testimonial.quote}”
        </blockquote>
        <footer className="mt-4 text-sm text-white/55">
          — {project.testimonial.author}, {project.testimonial.role}
        </footer>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-extrabold text-white">Related projects</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {related.map((r) => (
            <motion.div key={r.slug} whileHover={{ y: -4 }}>
              <Link
                href={`/portfolio/${r.slug}`}
                className="block glass rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-colors"
              >
                <div className={cn("relative h-28 bg-gradient-to-br overflow-hidden", r.gradient)}>
                  {r.image && (
                    <img
                      src={r.image}
                      alt={r.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="p-4">
                  <p className="font-bold text-white">{r.title}</p>
                  <p className="mt-1 text-xs text-white/55">{r.category}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
