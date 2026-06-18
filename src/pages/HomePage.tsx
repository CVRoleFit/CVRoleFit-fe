import { Link } from "react-router-dom";
import { Button, FloatingIcons } from "@/shared/components";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const features = [
  {
    icon: "📄",
    title: "Resume Upload",
    description:
      "Simply upload your PDF resume. Our AI extracts and structures all relevant information automatically.",
  },
  {
    icon: "🔍",
    title: "Deep Analysis",
    description:
      "Goes beyond keyword matching. We analyze your projects, experience, and achievements to identify real skills.",
  },
  {
    icon: "📊",
    title: "Skill Profiling",
    description:
      "Build a comprehensive skill profile with confidence scores and supporting evidence from your work.",
  },
  {
    icon: "🎯",
    title: "Job Matching",
    description:
      "Compare your profile against job requirements. See exactly where you fit and what to improve.",
  },
  {
    icon: "💡",
    title: "Evidence-Based",
    description:
      "Every skill comes with proof. See which projects or experiences demonstrate each capability.",
  },
  {
    icon: "📈",
    title: "Improvement Tips",
    description:
      "Get actionable recommendations on how to strengthen your profile and fill skill gaps.",
  },
];

const steps = [
  {
    step: "1",
    title: "Upload Your Resume",
    description: "Drop your PDF resume and let our AI extract the information.",
  },
  {
    step: "2",
    title: "AI Analysis",
    description:
      "Our AI identifies skills, projects, and experience with confidence scores.",
  },
  {
    step: "3",
    title: "Review & Improve",
    description:
      "See your skill profile, evidence, and get improvement recommendations.",
  },
];

const testimonials = [
  {
    quote:
      "Finally, an ATS that understands what I've actually built, not just keywords on my resume.",
    author: "Senior Software Engineer",
    company: "Tech Startup",
  },
  {
    quote:
      "I could see exactly which projects proved each skill. Much better than keyword matching.",
    author: "Full Stack Developer",
    company: "Consulting Firm",
  },
  {
    quote:
      "The evidence-based approach helped me understand my own skill gaps and what to focus on.",
    author: "Career Changer",
    company: "Bootcamp Graduate",
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
    },
  },
};

const slideUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
    },
  },
};

function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}

export function HomePage() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="flex flex-col">
      <FloatingIcons />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={prefersReducedMotion ? { opacity: 1 } : "hidden"}
            animate="visible"
            variants={slideUpVariants}
          >
            <motion.h1
              className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl"
              variants={fadeInVariants}
              initial={prefersReducedMotion ? { opacity: 1 } : "hidden"}
              animate="visible"
            >
              Resume Intelligence That{" "}
              <motion.span
                className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                animate={
                  prefersReducedMotion
                    ? { opacity: 1 }
                    : {
                        opacity: [0.7, 1, 0.7],
                      }
                }
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              >
                Understands
              </motion.span>{" "}
              Your Skills
            </motion.h1>
            <motion.p
              className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300"
              variants={itemVariants}
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : "hidden"}
              animate="visible"
            >
              Go beyond keyword matching. Our AI analyzes your projects,
              experience, and achievements to build an evidence-based skill
              profile that shows what you can actually do.
            </motion.p>
            <motion.div
              className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
              variants={containerVariants}
              initial={prefersReducedMotion ? { opacity: 1 } : "hidden"}
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <Link to="/resume">
                  <Button size="lg" className="w-full sm:w-auto">
                    Analyze Your Resume - It's Free
                  </Button>
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <a href="#how-it-works">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    See How It Works
                  </Button>
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={prefersReducedMotion ? { opacity: 1 } : "hidden"}
            whileInView="visible"
            variants={slideUpVariants}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              The Problem with Traditional ATS
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Traditional Applicant Tracking Systems have fundamental
              limitations
            </p>
          </motion.div>
          <motion.div
            className="grid gap-6 md:grid-cols-3"
            initial={prefersReducedMotion ? { opacity: 1 } : "hidden"}
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              {
                title: "Keyword Obsession",
                description:
                  "Traditional ATS systems look for exact keyword matches, missing candidates who have the skills but use different terminology.",
              },
              {
                title: "No Context",
                description:
                  '"Python" on a resume tells nothing about proficiency level or how the skill was actually used in real projects.',
              },
              {
                title: "Black Box Results",
                description:
                  "No explanation for why a candidate was rejected or how to improve their application for future opportunities.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="rounded-xl border border-red-200 bg-white p-6 dark:border-red-900/50 dark:bg-gray-800"
                variants={itemVariants}
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                  <span className="text-xl">❌</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={prefersReducedMotion ? { opacity: 1 } : "hidden"}
            whileInView="visible"
            variants={slideUpVariants}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Evidence-Based Skill Intelligence
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              We don't just find keywords. We understand demonstrated
              capabilities.
            </p>
          </motion.div>
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            initial={prefersReducedMotion ? { opacity: 1 } : "hidden"}
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true, margin: "-100px" }}
          >
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                className="rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-blue-200 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-800"
                variants={itemVariants}
                whileHover={prefersReducedMotion ? {} : { y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={prefersReducedMotion ? { opacity: 1 } : "hidden"}
            whileInView="visible"
            variants={slideUpVariants}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Three simple steps to understand your professional profile
            </p>
          </motion.div>
          <motion.div
            className="grid gap-8 md:grid-cols-3"
            initial={prefersReducedMotion ? { opacity: 1 } : "hidden"}
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true, margin: "-100px" }}
          >
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                className="relative"
                variants={itemVariants}
              >
                {idx < steps.length - 1 && (
                  <div className="absolute right-0 top-8 hidden h-0.5 w-1/2 translate-x-1/2 bg-gradient-to-r from-blue-300 to-blue-100 dark:from-blue-700 dark:to-blue-900 md:block" />
                )}
                <div className="flex flex-col items-center text-center">
                  <motion.div
                    className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white"
                    animate={
                      prefersReducedMotion
                        ? { scale: 1 }
                        : { scale: [1, 1.05, 1] }
                    }
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: idx * 0.3,
                    }}
                  >
                    {step.step}
                  </motion.div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            className="mt-12 text-center"
            initial={prefersReducedMotion ? { opacity: 1 } : "hidden"}
            whileInView="visible"
            variants={itemVariants}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Link to="/resume">
              <Button size="lg">Get Started Now</Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Example Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={prefersReducedMotion ? { opacity: 1 } : "hidden"}
            whileInView="visible"
            variants={slideUpVariants}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              See the Difference
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Traditional ATS vs. CVRoleFit
            </p>
          </motion.div>
          <motion.div
            className="grid gap-8 lg:grid-cols-2"
            initial={prefersReducedMotion ? { opacity: 1 } : "hidden"}
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="rounded-xl border border-red-200 bg-red-50 p-6 dark:border-red-900/50 dark:bg-red-950/20"
              variants={itemVariants}
            >
              <h3 className="text-lg font-semibold text-red-800 dark:text-red-300">
                Traditional ATS Sees:
              </h3>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start gap-2 text-sm text-red-600 dark:text-red-400">
                  <span>❌</span>
                  <span>"Python" mentioned 3 times</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-red-600 dark:text-red-400">
                  <span>❌</span>
                  <span>"React" keyword found</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-red-600 dark:text-red-400">
                  <span>❌</span>
                  <span>Missing "Django" keyword - Reject</span>
                </li>
              </ul>
            </motion.div>
            <motion.div
              className="rounded-xl border border-green-200 bg-green-50 p-6 dark:border-green-900/50 dark:bg-green-950/20"
              variants={itemVariants}
            >
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-300">
                CVRoleFit Understands:
              </h3>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start gap-2 text-sm text-green-600 dark:text-green-400">
                  <span>✅</span>
                  <span>Python: Expert (3 major projects, 5 years)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-green-600 dark:text-green-400">
                  <span>✅</span>
                  <span>React: Proficient (2 production apps)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-green-600 dark:text-green-400">
                  <span>✅</span>
                  <span>
                    Django capability: Demonstrated via Flask expertise
                  </span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={prefersReducedMotion ? { opacity: 1 } : "hidden"}
            whileInView="visible"
            variants={slideUpVariants}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              What People Say
            </h2>
          </motion.div>
          <motion.div
            className="grid gap-6 md:grid-cols-3"
            initial={prefersReducedMotion ? { opacity: 1 } : "hidden"}
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true, margin: "-100px" }}
          >
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
                variants={itemVariants}
                whileHover={prefersReducedMotion ? {} : { y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-sm italic text-gray-600 dark:text-gray-300">
                  "{testimonial.quote}"
                </p>
                <div className="mt-4 border-t border-gray-100 pt-4 dark:border-gray-700">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {testimonial.author}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {testimonial.company}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : "hidden"}
            whileInView="visible"
            variants={slideUpVariants}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Ready to Understand Your Real Skills?
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Upload your resume and get AI-powered insights about your
              demonstrated capabilities, not just keywords.
            </p>
            <motion.div
              className="mt-8"
              initial={prefersReducedMotion ? { opacity: 1 } : "hidden"}
              whileInView="visible"
              variants={itemVariants}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Link to="/resume">
                <Button size="lg">Analyze Your Resume</Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
