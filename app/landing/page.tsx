'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import './page.css';

export default function Home() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Nav scroll effect
    const handleScroll = () => {
      if (navRef.current) {
        navRef.current.classList.toggle('scrolled', window.scrollY > 40);
      }
    };
    window.addEventListener('scroll', handleScroll);

    // Scroll reveal
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), 80);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((el) => observer.observe(el));

    // Mock card tabs
    const tabs = document.querySelectorAll('.mock-tab');
    const bodies: Record<string, string> = {
      Core: "When you start a new habit, it should take less than two minutes to do. \"Read before bed each night\" becomes \"Read one page.\" The point is not to do one thing — it's to master the art of showing up.",
      Why: "Habits are the entry point, not the end point. The 2-minute rule isn't about doing less — it's about never missing the start. Once you're in motion, continuing is far easier than beginning.",
      Apply: 'Pick one habit you keep failing at. Strip it down until it takes under 2 minutes. Set your environment so that doing it is the path of least resistance. Start tonight.',
    };

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        const bodyEl = document.querySelector('.mock-body') as HTMLElement;
        if (bodyEl) {
          bodyEl.style.opacity = '0';
          bodyEl.style.transition = 'opacity 0.15s';
          setTimeout(() => {
            bodyEl.textContent = bodies[tab.textContent || 'Core'] || bodies['Core'];
            bodyEl.style.opacity = '1';
          }, 150);
        }
      });
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* NAV */}
      <nav ref={navRef} id="nav">
        <div className="nav-logo">
          un<span>mention</span>
        </div>
        <div className="nav-right">
          <div className="nav-badge">
            <span className="nav-badge-dot"></span>
            <span>IN DEVELOPMENT</span>
          </div>
          <Link href="/sign-in" className="nav-signin-btn">
            Sign In
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg-line" style={{ left: '20%' }}></div>
        <div className="hero-bg-line" style={{ left: '80%' }}></div>

        <div className="hero-badge">
          <span className="hero-badge-dot"></span>
          DAY 1 · READ LESS. KNOW MORE. ACTUALLY APPLY IT.
        </div>
        <p className="hero-eyebrow">THE READING PROBLEM IS SOLVED</p>
        <h1 className="hero-h1">
          You buy the book.<br />
          <em>You never finish it.</em>
        </h1>
        <p className="hero-h1-sub">Or worse — you finish it and forget everything.</p>
        <p className="hero-sub">
          unnmention turns any self-help or productivity book into a structured 7-day digest — with daily
          actions, deep dives, and reminders that make the knowledge actually stick.
        </p>

        <div className="hero-cta">
          <Link href="/sign-in" className="hero-signin-btn">
            Get Started →
          </Link>
          <p className="hero-proof">JOIN EARLY READERS FOLLOWING THE BUILD</p>
        </div>
      </section>

      {/* COMING SOON MARQUEE */}
      <div className="coming-strip">
        <div className="strip-track" id="stripTrack">
          <span className="strip-item">CURRENTLY IN DEVELOPMENT <span className="dot"></span></span>
          <span className="strip-item">7-DAY BOOK DIGESTS <span className="dot"></span></span>
          <span className="strip-item">MORNING EMAIL COURSES <span className="dot"></span></span>
          <span className="strip-item">AI-POWERED DEEP DIVES <span className="dot"></span></span>
          <span className="strip-item">DAILY IMPLEMENTATION QUESTIONS <span className="dot"></span></span>
          <span className="strip-item">PERSONAL INSIGHTS VAULT <span className="dot"></span></span>
          <span className="strip-item">LAUNCHING SOON <span className="dot"></span></span>
          {/* duplicated for seamless loop */}
          <span className="strip-item">CURRENTLY IN DEVELOPMENT <span className="dot"></span></span>
          <span className="strip-item">7-DAY BOOK DIGESTS <span className="dot"></span></span>
          <span className="strip-item">MORNING EMAIL COURSES <span className="dot"></span></span>
          <span className="strip-item">AI-POWERED DEEP DIVES <span className="dot"></span></span>
          <span className="strip-item">DAILY IMPLEMENTATION QUESTIONS <span className="dot"></span></span>
          <span className="strip-item">PERSONAL INSIGHTS VAULT <span className="dot"></span></span>
          <span className="strip-item">LAUNCHING SOON <span className="dot"></span></span>
        </div>
      </div>

      {/* PAIN */}
      <section className="pain">
        <div className="pain-inner">
          <p className="pain-label">SOUND FAMILIAR?</p>
          <div className="pain-grid">
            <div className="pain-item reveal">
              <span className="pain-num">01</span>
              <div>
                <p className="pain-q">&ldquo;I bought 12 books last year. Read maybe 2.&rdquo;</p>
                <p className="pain-a">
                  The intention is always there. The follow-through rarely is. The book sits on your shelf as
                  a monument to who you were going to become.
                </p>
              </div>
            </div>
            <div className="pain-item reveal">
              <span className="pain-num">02</span>
              <div>
                <p className="pain-q">&ldquo;I finished Atomic Habits. I still have no habits.&rdquo;</p>
                <p className="pain-a">
                  Reading is the easy part. The book tells you what to do — but nobody helps you actually do
                  it. You close the book and life resumes as normal.
                </p>
              </div>
            </div>
            <div className="pain-item reveal">
              <span className="pain-num">03</span>
              <div>
                <p className="pain-q">&ldquo;I highlighted everything. I remember nothing.&rdquo;</p>
                <p className="pain-a">
                  300 pages of wisdom condensed into a Kindle full of yellow lines you&apos;ll never revisit.
                  The knowledge evaporates within days.
                </p>
              </div>
            </div>
            <div className="pain-item reveal">
              <span className="pain-num">04</span>
              <div>
                <p className="pain-q">&ldquo;I don&apos;t have 6 hours to read a business book.&rdquo;</p>
                <p className="pain-a">
                  You&apos;re not lazy. You&apos;re busy. Between work, life, and everything else — reading a
                  350-page book cover to cover is a luxury most people can&apos;t afford.
                </p>
              </div>
            </div>
          </div>
          <div className="pain-statement reveal">
            <p className="pain-statement-text">
              The self-help industry is worth <strong>$15 billion.</strong> Most of it sits unread on
              shelves. The problem was never the books — it was the format.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how" id="how">
        <p className="section-label reveal">HOW IT WILL WORK</p>
        <h2 className="section-title reveal">
          Three steps. <em>Seven days.</em> Actually applied.
        </h2>
        <div className="steps reveal">
          <div className="step">
            <span className="step-tag">STEP 01</span>
            <div className="step-num">1</div>
            <h3 className="step-title">Upload your book</h3>
            <p className="step-body">
              Drop in any self-help or productivity ebook as a PDF or EPUB. Or choose from our curated
              library of the most impactful books — pre-processed and ready instantly. Takes 60 seconds.
            </p>
          </div>
          <div className="step">
            <span className="step-tag">STEP 02</span>
            <div className="step-num">2</div>
            <h3 className="step-title">Get your 7-day digest</h3>
            <p className="step-body">
              Our AI structures the entire book into 7 focused days — each with key concepts, real stories,
              insights, and specific actions. 15 minutes a day, not 15 hours. Delivered as beautiful
              swipeable cards or straight to your inbox each morning.
            </p>
          </div>
          <div className="step">
            <span className="step-tag">STEP 03</span>
            <div className="step-num">3</div>
            <h3 className="step-title">Apply it. Track it. Keep it.</h3>
            <p className="step-body">
              At the end of each day, tell us how you&apos;ll apply what you learned. We remind you the next
              morning. Every insight you save lives in your personal vault — the knowledge doesn&apos;t
              disappear this time.
            </p>
          </div>
        </div>
      </section>

      {/* CARD PREVIEW */}
      <section className="preview" id="features">
        <div className="preview-inner">
          <div className="preview-left reveal">
            <p className="section-label">THE READING EXPERIENCE</p>
            <h2 className="preview-title">
              Every card is a <em>lesson,</em> not a summary.
            </h2>
            <p className="preview-body">
              We don&apos;t compress books into bullet points. We restructure them into a daily learning
              experience — with the core idea, the reasoning behind it, the real-world example, and exactly
              how to apply it today.
            </p>
            <div className="feature-list">
              <div className="feature-item">
                <div className="feature-icon">📖</div>
                <p className="feature-text">
                  <strong>Core → Why → Apply</strong>
                  <br />
                  <span>Every concept taught in three layers. Read as deep as you want.</span>
                </p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🔍</div>
                <p className="feature-text">
                  <strong>Dive Deeper on any card</strong>
                  <br />
                  <span>
                    Don&apos;t understand something? Ask the AI. It knows exactly which card you&apos;re on.
                  </span>
                </p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">📚</div>
                <p className="feature-text">
                  <strong>Stories extracted separately</strong>
                  <br />
                  <span>Every anecdote and case study from the book — pulled into its own track.</span>
                </p>
              </div>
            </div>
          </div>
          <div className="preview-right reveal">
            <div className="mock-card">
              <p className="mock-tag">DAY 2 · ATOMIC HABITS</p>
              <p className="mock-law">CONCEPT 3</p>
              <h3 className="mock-title">The 2-Minute Rule</h3>
              <div className="mock-tabs">
                <div className="mock-tab active">Core</div>
                <div className="mock-tab">Why</div>
                <div className="mock-tab">Apply</div>
              </div>
              <p className="mock-body">
                When you start a new habit, it should take less than two minutes to do. &ldquo;Read before
                bed each night&rdquo; becomes &ldquo;Read one page.&rdquo; The point is not to do one thing
                — it&apos;s to master the art of showing up.
              </p>
              <div className="mock-divider"></div>
              <div className="mock-dive">Dive deeper into this concept</div>
              <div className="mock-progress">
                <div className="mock-dot done"></div>
                <div className="mock-dot done"></div>
                <div className="mock-dot active"></div>
                <div className="mock-dot"></div>
                <div className="mock-dot"></div>
                <div className="mock-dot"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="features">
        <p className="section-label reveal">WHAT MAKES IT DIFFERENT</p>
        <h2 className="section-title reveal">
          Built for the way <em>humans</em> actually learn.
        </h2>
        <div className="features-grid reveal">
          <div className="feat-card">
            <div className="feat-emoji">🧠</div>
            <h3 className="feat-title">Daily implementation questions</h3>
            <p className="feat-body">
              At the end of every day, unnmention asks you one specific question: &ldquo;How will you apply
              today&apos;s lesson?&rdquo; You write it. We remind you tomorrow morning. That friction is
              intentional — it&apos;s the moment learning becomes behavior change.
            </p>
            <span className="feat-tag">THE DIFFERENCE MAKER</span>
          </div>
          <div className="feat-card">
            <div className="feat-emoji">📬</div>
            <h3 className="feat-title">Morning email course option</h3>
            <p className="feat-body">
              Prefer email? Turn any uploaded book into a 7-day email course delivered to your inbox at the
              time you choose. Day 3 arrives while you&apos;re having coffee. No app to open. The lesson
              comes to you.
            </p>
            <span className="feat-tag">HABIT-FIRST DESIGN</span>
          </div>
          <div className="feat-card">
            <div className="feat-emoji">🗄️</div>
            <h3 className="feat-title">Your personal insights vault</h3>
            <p className="feat-body">
              Every card you bookmark, every note you write, every implementation log — it lives in your
              vault permanently. A year from now you can search &ldquo;what did I learn about habits in
              January&rdquo; and find it instantly.
            </p>
            <span className="feat-tag">KNOWLEDGE RETENTION</span>
          </div>
          <div className="feat-card">
            <div className="feat-emoji">💬</div>
            <h3 className="feat-title">Dive deeper on anything</h3>
            <p className="feat-body">
              Every card has a &ldquo;Dive deeper&rdquo; button. Tap it and ask anything — &ldquo;Explain
              this differently,&rdquo; &ldquo;Give me a real business example,&rdquo; &ldquo;How does this
              apply to someone in sales?&rdquo; The AI knows exactly which concept you&apos;re on.
            </p>
            <span className="feat-tag">AI-POWERED</span>
          </div>
        </div>
      </section>

      {/* EMAIL COURSE SECTION */}
      <section className="email-section">
        <div className="email-inner">
          <div className="reveal">
            <p className="email-label">THE EMAIL COURSE FEATURE</p>
            <h2 className="email-title">
              Your book, delivered like a <em>morning ritual.</em>
            </h2>
            <p className="email-body">
              Upload any book and choose to receive it as a 7-day email course. Set your time. Set your
              timezone. Every morning, Day N lands in your inbox — beautifully formatted, ready to read with
              your coffee. No app, no friction, no forgetting.
            </p>
          </div>
          <div className="reveal">
            <div className="email-mock">
              <div className="email-mock-top">
                <div className="email-mock-dot" style={{ background: '#ff5f57' }}></div>
                <div className="email-mock-dot" style={{ background: '#febc2e' }}></div>
                <div className="email-mock-dot" style={{ background: '#28c840' }}></div>
              </div>
              <div className="email-mock-body">
                <p className="email-from">FROM: unnmention · 7:00 AM</p>
                <p className="email-subject">📖 Day 4 of Zero to One — Competition is for losers</p>
                <span className="email-day-badge">DAY 4 OF 7</span>
                <h4 className="email-preview-title">Why Thiel thinks competition destroys value</h4>
                <p className="email-preview-body">
                  Every business book tells you to &ldquo;beat the competition.&rdquo; Thiel argues this is
                  the wrong frame entirely. Competition, by definition, means you&apos;re fighting over the
                  same pie. The goal should be to build something so different that competition becomes
                  irrelevant...
                </p>
                <div className="email-cta-btn">Read today&apos;s full digest →</div>
                <p className="email-time">⏰ Delivered at your chosen time every morning</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta">
        <div className="final-cta-inner reveal">
          <p className="final-cta-label">START READING DIFFERENTLY</p>
          <h2 className="final-cta-title">
            The next book you buy deserves to actually <em>change you.</em>
          </h2>
          <p className="final-cta-sub">
            Sign in and start turning your books into structured learning — with daily actions and reminders
            that make the knowledge stick.
          </p>
          <Link href="/sign-in" className="final-signin-btn">
            Sign In to Get Started →
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">
          un<span>mention</span>
        </div>
        <p className="footer-right">© 2025 unnmention · Built for readers who mean it</p>
      </footer>
    </>
  );
}
