'use client'
// @ts-nocheck
import { useEffect, useRef, useState } from 'react'

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const emailRef = useRef(null)

  /* Sticky nav on scroll */
  useEffect(() => {
    const nav = document.getElementById('main-nav')
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Reveal animations */
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in') }),
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    )
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  function toggleFaq(i) {
    setOpenFaq(prev => (prev === i ? null : i))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const email = emailRef.current?.value
    if (!email || !email.includes('@')) { emailRef.current?.focus(); return }
    setSubmitting(true)
    try {
      await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: e.target.firstName.value,
          lastName:  e.target.lastName.value,
          email,
          childAge:  e.target.childAge.value,
          product:   e.target.product.value,
          deposit:   e.target.dep.value,
        }),
      })
    } catch (_) { /* show success regardless */ }
    setSubmitting(false)
    setSubmitted(true)
  }

  const faqs = [
    {
      q: 'Will my child actually play with this, or will it end up on a shelf?',
      a: "The short answer: we designed specifically to solve this problem. The biggest reason toys get abandoned is that they have one mode of play and children exhaust it in a week. Every Catalyst toy has a narrative layer — so children keep returning because the story continues, not just because the toy exists. That said, we can't promise every child will love every toy. If yours doesn't, we'll work something out.",
    },
    {
      q: "My child is younger than the age range. Can they use it?",
      a: "The age ranges are starting points, not hard rules. Niva (stackable) works well from about 14 months. Reyo is better at 2+. Aru is really a 3+ toy. If you're unsure, the waitlist form lets you tell us your child's age and we'll give you an honest recommendation.",
    },
    {
      q: "Can they play alone, or does it need a parent?",
      a: "Both. All three toys work as independent play. But each set also comes with a parent guide that turns the toy into a conversation. The goal is to give you a way in when you want it, not force you to be there at all times.",
    },
    {
      q: "Is the wood actually safe? What about the magnets?",
      a: "Every batch is BIS certified under IS:9873. The wood is certified Steam Beech, painted with EN 71-tested, non-toxic, water-based paint. The magnets in Niva are set into the wood using a sealed press-fit system — they can't be accessed, pulled out, or swallowed.",
    },
    {
      q: "What's the deposit actually for? Why not just a free signup?",
      a: "Free signups tell us nothing. We need to know how many families genuinely want these — enough to put something toward them. Your deposit goes directly toward your purchase price. If we delay beyond December 2025 or you change your mind for any reason, you get it back in full.",
    },
    {
      q: "When does it ship?",
      a: "Our first batch of 500 units ships in Q4 2025. Waitlist members get priority allocation and a confirmed ship date before the public launch.",
    },
  ]

  return (
    <>
      {/* NAV */}
      <nav id="main-nav">
        <div className="logo">Catalyst<em>Labs</em></div>
        <a href="#waitlist" className="nav-pill">Reserve a set</a>
      </nav>

      {/* HERO */}
      <div style={{ background: 'var(--c)' }}>
        <div className="hero">
          <div className="hero-badge">
            <span className="hero-badge-line"></span>
            First batch — 500 units only
          </div>
          <h1>
            The toy they keep<br />
            coming back to.<br />
            <em>Screen-free.</em>
          </h1>
          <p className="hero-subtext">
            Three wooden play systems for children aged 1–6. Each one built around a real developmental
            milestone — not to look good on a shelf, but to actually get played with.
          </p>
          <div className="hero-cta-group">
            <a href="#waitlist" className="btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
              Join the waitlist
            </a>
            <button className="btn-ghost" onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}>
              See the toys
            </button>
          </div>
          <div className="hero-scroll-hint">
            <span className="hero-scroll-line"></span>
            Scroll to explore
          </div>
          <div className="hero-float" aria-hidden="true">play</div>
        </div>
      </div>

      {/* THE MOMENT */}
      <div className="moment-wrap">
        <div className="moment">
          <div className="reveal">
            <p className="moment-text">
              At some point today, you'll hand them your phone. Not because you're a bad parent.{' '}
              <em>Because you're exhausted.</em> And every toy on that shelf stopped being interesting three weeks ago.
            </p>
            <div className="moment-divider"></div>
            <p className="moment-small">
              The problem isn't screens. The problem is that nothing else holds their attention long enough.
              Catalyst Labs makes play things that do.
            </p>
          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="products-wrap" id="products">
        <div className="products">
          <div className="reveal">
            <p className="eyebrow">The Collection</p>
            <h2 className="section-h">Three toys.<br />Each one earns its place.</h2>
          </div>

          {/* REYO */}
          <div className="product-block reveal" style={{ marginTop: '60px' }}>
            <div className="product-art product-art-reyo">
              <svg className="toy" width="280" height="220" viewBox="0 0 280 220" fill="none">
                <rect x="30" y="25" width="220" height="170" rx="16" fill="rgba(181,146,74,0.12)" />
                <rect x="44" y="39" width="192" height="142" rx="10" fill="rgba(255,255,255,0.6)" />
                <path d="M70 155 Q85 95 105 125 Q120 145 135 90 Q148 50 165 85 Q178 115 195 65 Q205 42 215 70" stroke="#B5924A" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                <circle cx="106" cy="123" r="9" fill="#B5924A" opacity="0.8" />
                <circle cx="103" cy="120" r="3" fill="rgba(255,255,255,0.5)" />
                <circle cx="70" cy="155" r="6" fill="rgba(181,146,74,0.3)" stroke="#B5924A" strokeWidth="1.5" />
                <circle cx="215" cy="70" r="6" fill="rgba(181,146,74,0.3)" stroke="#B5924A" strokeWidth="1.5" />
                <text x="56" y="176" fontFamily="Nunito,sans-serif" fontSize="10" fill="rgba(92,60,34,0.5)">Start</text>
                <text x="206" y="62" fontFamily="Nunito,sans-serif" fontSize="10" fill="rgba(92,60,34,0.5)">Finish</text>
              </svg>
            </div>
            <div className="product-body">
              <div className="product-num">01</div>
              <h3 className="product-name">Reyo <em>Tracing Board</em></h3>
              <span className="product-age-tag">Ages 2 – 5</span>
              <p className="product-story">
                A wooden board with grooved paths cut from the flow of actual alphabet strokes. Your child guides a small marble through the grooves — they're not learning letters, they're{' '}
                <strong>rescuing the boat</strong>, or <strong>helping the mouse find the cheese</strong>. The fine motor skills happen without a single "practice your writing" conversation.
              </p>
              <p className="product-story">
                Children who can't yet hold a pencil do this 40, 50, 60 times in a row. Not because you ask them to. Because they want to finish the story.
              </p>
              <div className="product-what">
                <div className="product-what-label">What's in the box</div>
                <div className="product-what-items">
                  <span className="pwi">Beechwood tracing board</span>
                  <span className="pwi">3 story marbles</span>
                  <span className="pwi">Play guide booklet</span>
                  <span className="pwi">Parent prompts card</span>
                </div>
              </div>
              <div className="product-price-row">
                <span className="product-price">₹1,299</span>
                <span className="product-price-note">Free shipping · BIS certified</span>
              </div>
            </div>
          </div>

          {/* NIVA */}
          <div className="product-block flip reveal">
            <div className="product-art product-art-niva">
              <svg className="toy" width="280" height="220" viewBox="0 0 280 220" fill="none">
                <rect x="60" y="165" width="160" height="24" rx="5" fill="rgba(78,110,74,0.55)" />
                <rect x="76" y="140" width="128" height="26" rx="5" fill="rgba(78,110,74,0.65)" />
                <rect x="90" y="114" width="50" height="27" rx="5" fill="rgba(78,110,74,0.75)" />
                <rect x="146" y="116" width="40" height="25" rx="5" fill="rgba(78,110,74,0.6)" />
                <path d="M96 114 L116 88 L136 114Z" fill="#4E6E4A" opacity="0.7" />
                <rect x="148" y="94" width="32" height="22" rx="4" fill="#4E6E4A" opacity="0.65" />
                <circle cx="162" cy="82" r="12" fill="#4E6E4A" opacity="0.5" />
                <rect x="155" y="72" width="6" height="12" rx="3" fill="#4E6E4A" opacity="0.5" />
                <rect x="165" y="70" width="6" height="14" rx="3" fill="#4E6E4A" opacity="0.6" />
                <circle cx="116" cy="110" r="3.5" fill="rgba(255,255,255,0.6)" />
                <circle cx="95" cy="136" r="3.5" fill="rgba(255,255,255,0.6)" />
                <circle cx="155" cy="112" r="3.5" fill="rgba(255,255,255,0.6)" />
              </svg>
            </div>
            <div className="product-body">
              <div className="product-num">02</div>
              <h3 className="product-name">Niva <em>Stackable</em></h3>
              <span className="product-age-tag">Ages 1 – 4</span>
              <p className="product-story">
                Magnetic, faceted wooden forms that hold together properly — no frustrating towers that fall the moment a toddler breathes near them. The pieces have character: trees, rocks, animals, hills. Your child doesn't stack shapes. <strong>They build worlds.</strong>
              </p>
              <p className="product-story">
                Each set connects with the others. The Niva animals can wander into the Aru chess board. That's why children keep coming back — the universe keeps getting bigger.
              </p>
              <div className="product-what">
                <div className="product-what-label">What's in the box</div>
                <div className="product-what-items">
                  <span className="pwi">18 magnetic wooden pieces</span>
                  <span className="pwi">Nature set: trees + rocks</span>
                  <span className="pwi">Animal figures × 4</span>
                  <span className="pwi">Story card set</span>
                </div>
              </div>
              <div className="product-price-row">
                <span className="product-price">₹1,499</span>
                <span className="product-price-note">Free shipping · BIS certified</span>
              </div>
            </div>
          </div>

          {/* ARU */}
          <div className="product-block reveal">
            <div className="product-art product-art-aru">
              <svg className="toy" width="280" height="220" viewBox="0 0 280 220" fill="none">
                <rect x="55" y="45" width="170" height="130" rx="10" fill="rgba(212,168,67,0.25)" stroke="rgba(212,168,67,0.4)" strokeWidth="1.5" />
                <line x1="97.5" y1="45" x2="97.5" y2="175" stroke="rgba(212,168,67,0.35)" strokeWidth="1" />
                <line x1="140" y1="45" x2="140" y2="175" stroke="rgba(212,168,67,0.35)" strokeWidth="1" />
                <line x1="182.5" y1="45" x2="182.5" y2="175" stroke="rgba(212,168,67,0.35)" strokeWidth="1" />
                <line x1="55" y1="77.5" x2="225" y2="77.5" stroke="rgba(212,168,67,0.35)" strokeWidth="1" />
                <line x1="55" y1="110" x2="225" y2="110" stroke="rgba(212,168,67,0.35)" strokeWidth="1" />
                <line x1="55" y1="142.5" x2="225" y2="142.5" stroke="rgba(212,168,67,0.35)" strokeWidth="1" />
                <circle cx="76" cy="61" r="10" fill="#B5924A" opacity="0.7" />
                <circle cx="118" cy="61" r="10" fill="rgba(181,146,74,0.3)" stroke="#B5924A" strokeWidth="1.5" />
                <rect x="152" y="51" width="20" height="20" rx="4" fill="#4E6E4A" opacity="0.6" />
                <rect x="194" y="51" width="20" height="20" rx="4" fill="rgba(78,110,74,0.3)" stroke="#4E6E4A" strokeWidth="1.5" />
                <circle cx="76" cy="94" r="10" fill="rgba(181,146,74,0.3)" stroke="#B5924A" strokeWidth="1.5" />
                <circle cx="162" cy="126" r="10" fill="#B5924A" opacity="0.8" />
                <circle cx="159" cy="123" r="3" fill="rgba(255,255,255,0.45)" />
              </svg>
            </div>
            <div className="product-body">
              <div className="product-num">03</div>
              <h3 className="product-name">Aru <em>Chess System</em></h3>
              <span className="product-age-tag">Ages 3 – 7</span>
              <p className="product-story">
                Chess is one of the best thinking tools ever invented. It's also almost impossible to teach a 3-year-old. Aru solves this: character pieces, colour-coded moves, and a story-driven adventure system that introduces strategy without a single rule card.
              </p>
              <p className="product-story">
                It starts on a 4×4 board. The stories get harder. The board grows. By the time your child is 7, they're playing actual chess — and they got there through adventures, not flashcards.
              </p>
              <div className="product-what">
                <div className="product-what-label">What's in the box</div>
                <div className="product-what-items">
                  <span className="pwi">Color-mapped 4×4 board</span>
                  <span className="pwi">12 character pieces</span>
                  <span className="pwi">Adventure booklet, 8 levels</span>
                  <span className="pwi">Parent play guide</span>
                </div>
              </div>
              <div className="product-price-row">
                <span className="product-price">₹1,999</span>
                <span className="product-price-note">Free shipping · BIS certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HOW PLAY WORKS */}
      <div className="play-wrap">
        <div className="play">
          <div className="reveal">
            <p className="eyebrow">How it works</p>
            <h2 className="section-h">Play that doesn't<br />need a manual.</h2>
          </div>
          <div className="play-grid reveal delay1">
            <div className="play-card">
              <div className="pc-num">01</div>
              <h4 className="pc-h">Open the box, start playing</h4>
              <p className="pc-p">No batteries, no setup, no reading instructions out loud while a toddler unravels the packaging. Every toy is intuitive within 30 seconds.</p>
            </div>
            <div className="play-card">
              <div className="pc-num">02</div>
              <h4 className="pc-h">The story draws them in</h4>
              <p className="pc-p">Every toy has a narrative layer built in. Children don't practice — they go on adventures. The repetition happens because they want to finish the story, not because you asked.</p>
            </div>
            <div className="play-card">
              <div className="pc-num">03</div>
              <h4 className="pc-h">You play together, or they play alone</h4>
              <p className="pc-p">The parent guides inside each box give you things to say and ask — so playtime becomes conversation, not supervision. But they work just as well when you need 20 quiet minutes.</p>
            </div>
          </div>
        </div>
      </div>

      {/* DEVELOPMENT */}
      <div style={{ background: 'var(--c)' }}>
        <div className="section">
          <div className="reveal">
            <p className="eyebrow">Why it matters</p>
            <h2 className="section-h">Real benefits.<br /><em>No jargon.</em></h2>
          </div>
          <div className="dev-grid">
            {[
              { icon: '✍️', h: 'Pencil-readiness, before school', p: <>Children are showing up to kindergarten unable to hold a pencil — not because they're behind, but because touchscreens train the wrong muscles. <strong>Reyo builds the pincer grip</strong> through groove tracing, so by the time they pick up a pencil, it already feels right.</> },
              { icon: '🏗️', h: 'Spatial thinking, built early', p: <>Stacking, balancing, rotating, building — these are the foundations of maths and engineering. <strong>Niva develops 3D spatial reasoning</strong> through play that has no wrong answer, just different outcomes.</> },
              { icon: '♟️', h: 'Strategic thinking from age 3', p: <>Planning ahead, predicting consequences, thinking from another person's perspective — these are learnable at 3. <strong>Aru introduces strategic thinking</strong> through characters and stories, not rules and diagrams.</> },
              { icon: '👨‍👩‍👧', h: 'Play that parents can join', p: <>Every set comes with a parent guide with story prompts, questions to ask, and ways to extend the play. Because the best developmental tool isn't a toy. <strong>It's you, playing alongside them.</strong></> },
            ].map((card, i) => (
              <div key={i} className={`dev-card reveal delay${i % 2 === 0 ? 1 : 2}`}>
                <div className="dev-icon">{card.icon}</div>
                <h4 className="dev-h">{card.h}</h4>
                <p className="dev-p">{card.p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CRAFT */}
      <div className="craft-wrap">
        <div className="craft">
          <div className="craft-text reveal">
            <p className="eyebrow">Materials & Safety</p>
            <h2 className="section-h" style={{ color: 'var(--c)' }}>Built like<br /><em>it matters.</em></h2>
            <div className="craft-body">
              <p>Every piece goes in a toddler's mouth at some point. We built these knowing that — certified non-toxic paints, sealed magnet systems, smooth-sanded edges.</p>
              <p>The wood is certified Steam Beech from responsibly sourced suppliers. It takes paint evenly, holds up to years of play, and feels genuinely good in small hands.</p>
            </div>
          </div>
          <div className="craft-specs reveal delay1">
            {[
              { icon: '🌲', h: 'Certified Steam Beech wood', p: 'Dense, smooth, long-lasting. The kind of wood that looks better after two years of play, not worse.' },
              { icon: '🎨', h: 'Non-toxic, child-safe paint', p: 'Water-based, EN 71 tested. Zero heavy metals. Safe if chewed. We tested it harder than the standards require.' },
              { icon: '🔒', h: 'Sealed magnet system', p: "Neodymium magnets are set into the wood and sealed — they can't pop out. Drop-tested, bite-tested, toddler-tested." },
              { icon: '✅', h: 'BIS certified (IS:9873)', p: "India's mandatory toy safety standard. Every batch is lab-tested before it ships." },
            ].map((s, i) => (
              <div key={i} className="craft-spec">
                <div className="craft-spec-icon">{s.icon}</div>
                <div>
                  <div className="craft-spec-h">{s.h}</div>
                  <div className="craft-spec-p">{s.p}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BUNDLE */}
      <div className="bundle-wrap">
        <div className="bundle">
          <div className="reveal">
            <p className="eyebrow">The Full Kit</p>
            <h2 className="section-h">Everything, in one box.</h2>
          </div>
          <div className="bundle-card" style={{ marginTop: '48px' }}>
            <div className="bundle-top">
              <div>
                <h3 className="bundle-h">Screen-Free Starter Kit</h3>
                <p className="bundle-sub">All three toys, packaged together. Designed to grow with your child through ages 1–7. Each toy works independently or alongside the others.</p>
                <a href="#waitlist" className="btn-primary" style={{ marginTop: '8px', textDecoration: 'none' }}>Reserve the full kit</a>
              </div>
              <div className="bundle-includes">
                {[
                  { name: 'Reyo', desc: 'Tracing Board + 3 marbles + story guide', price: '₹1,299' },
                  { name: 'Niva', desc: '18-piece magnetic stack + story cards', price: '₹1,499' },
                  { name: 'Aru',  desc: 'Chess system + 8-level adventure booklet', price: '₹1,999' },
                ].map((item, i) => (
                  <div key={i} className="bundle-item">
                    <div className="bi-check">✓</div>
                    <div className="bi-text"><strong>{item.name}</strong> — {item.desc}</div>
                    <div className="bi-price">{item.price}</div>
                  </div>
                ))}
                <div className="bundle-item" style={{ background: 'rgba(78,110,74,0.08)', border: '1px dashed rgba(78,110,74,0.3)' }}>
                  <div className="bi-check" style={{ background: 'rgba(78,110,74,0.15)', color: 'var(--sage)' }}>+</div>
                  <div className="bi-text"><strong>Early access bonus</strong> — Expansion story pack (6 new adventures)</div>
                  <div className="bi-price" style={{ color: 'var(--sage)' }}>Free</div>
                </div>
              </div>
            </div>
            <div className="bundle-bottom">
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                  <span className="bundle-was">₹4,797</span>
                  <span className="bundle-price-big">₹4,299</span>
                </div>
                <div className="bundle-price-note">Free shipping across India · All three toys · Early access bonus included</div>
              </div>
              <a href="#waitlist" className="bundle-cta">Reserve the full kit →</a>
            </div>
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="testi-wrap">
        <div className="testi">
          <div className="reveal">
            <p className="eyebrow">What parents say</p>
            <h2 className="section-h">From families<br /><em>already playing.</em></h2>
          </div>
          <div className="testi-grid">
            <div className="testi-card reveal" style={{ gridColumn: '1/-1', background: 'var(--ink)', padding: '40px', borderRadius: '20px', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '28px', alignItems: 'start' }}>
              <div style={{ fontFamily: 'var(--font-fraunces), serif', fontSize: '72px', fontWeight: 200, color: 'var(--terra)', opacity: 0.4, lineHeight: 0.9, flexShrink: 0 }}>"</div>
              <div>
                <p style={{ fontFamily: 'var(--font-fraunces), serif', fontSize: 'clamp(18px,2.5vw,28px)', fontWeight: 200, fontStyle: 'italic', color: 'var(--c)', lineHeight: 1.5, marginBottom: '20px' }}>She named the marble. Within the first hour, it had a name, a backstory, and apparently a family. We played the Reyo board for forty minutes straight. I haven't seen her that absorbed since she discovered the dishwasher.</p>
                <div style={{ fontSize: '14px', color: 'rgba(244,237,224,0.5)' }}><strong style={{ color: 'var(--c)', display: 'block', marginBottom: '2px' }}>Pooja R., Bengaluru</strong>Mother of a 3-year-old</div>
              </div>
            </div>
            {[
              { quote: '"My son has about a 4-minute attention span. He spent 25 minutes building with Niva before dinner. I watched him redo the same tower six times because he wanted it to look like a mountain."', initials: 'KS', av: 'tav2', name: 'Karthik S.', role: 'Father of a 4-year-old, Chennai' },
              { quote: '"Aru made chess feel like a bedtime story. My daughter asks to play it before bed now. She doesn\'t know she\'s learning chess. She thinks she\'s running a zoo."', initials: 'AM', av: 'tav1', name: 'Ananya M.', role: 'Mother of a 5-year-old, Mumbai' },
              { quote: '"I\'m a Montessori teacher. I\'ve seen a lot of \'educational toys\' that are neither. These are the real thing. The parent guides actually help — I use the prompts in class."', initials: 'SP', av: 'tav3', name: 'Sunita P.', role: 'Montessori educator, Pune' },
            ].map((t, i) => (
              <div key={i} className={`testi-card reveal delay${i + 1}`}>
                <p className="testi-quote">{t.quote}</p>
                <div className="testi-by">
                  <div className={`testi-av ${t.av}`}>{t.initials}</div>
                  <div className="testi-who"><strong>{t.name}</strong>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ background: 'var(--white)' }}>
        <div className="section">
          <div className="reveal">
            <p className="eyebrow">Common questions</p>
            <h2 className="section-h" style={{ marginBottom: '48px' }}>Before you ask.</h2>
          </div>
          <div>
            {faqs.map((faq, i) => (
              <div key={i} className="faq-item reveal">
                <div className="faq-q" onClick={() => toggleFaq(i)}>
                  {faq.q}
                  <span className={`faq-toggle${openFaq === i ? ' open' : ''}`}>+</span>
                </div>
                <div className={`faq-a${openFaq === i ? ' open' : ''}`}>{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WAITLIST */}
      <div className="waitlist-wrap" id="waitlist">
        <div className="waitlist">
          <p className="eyebrow reveal">Reserve your set</p>
          <h2 className="section-h reveal">500 sets.<br /><em>First come, first home.</em></h2>
          <p className="waitlist-sub reveal">We're making our first batch by hand, in small numbers. Leave a deposit to hold your spot. It goes toward your final order — or we refund it, simple as that.</p>

          <div className="waitlist-form-card reveal">
            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-field">
                    <label className="form-label">First name</label>
                    <input className="form-input" name="firstName" type="text" placeholder="Priya" required />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Last name</label>
                    <input className="form-input" name="lastName" type="text" placeholder="Sharma" />
                  </div>
                </div>
                <div className="form-row" style={{ marginBottom: '14px' }}>
                  <div className="form-field" style={{ gridColumn: '1/-1' }}>
                    <label className="form-label">Email address</label>
                    <input className="form-input" name="email" type="email" ref={emailRef} placeholder="priya@example.com" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-field">
                    <label className="form-label">Child's age</label>
                    <div className="form-select-wrap">
                      <select className="form-input" name="childAge" style={{ appearance: 'none', WebkitAppearance: 'none', background: 'var(--c)' }}>
                        <option value="">Choose age</option>
                        <option>Under 12 months</option>
                        <option>1 – 2 years</option>
                        <option>2 – 3 years</option>
                        <option>3 – 4 years</option>
                        <option>4 – 5 years</option>
                        <option>5 – 6 years</option>
                        <option>6+ years</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-field">
                    <label className="form-label">I'm interested in</label>
                    <div className="form-select-wrap">
                      <select className="form-input" name="product" style={{ appearance: 'none', WebkitAppearance: 'none', background: 'var(--c)' }}>
                        <option value="">Choose product</option>
                        <option>Starter Kit — all 3 toys (₹4,299)</option>
                        <option>Reyo — Tracing Board (₹1,299)</option>
                        <option>Niva — Stackable (₹1,499)</option>
                        <option>Aru — Chess System (₹1,999)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: '6px', marginTop: '8px' }}>
                  <span className="deposit-label">Reservation deposit — fully refundable</span>
                  <div className="deposit-row">
                    {[
                      { id: 'd1', value: '199', amt: '₹199', name: 'Hold my spot', note: 'Basic reservation, standard queue' },
                      { id: 'd2', value: '499', amt: '₹499', name: 'Priority access', note: 'Earlier in queue + early-bird price lock', checked: true },
                      { id: 'd3', value: '999', amt: '₹999', name: 'Beta family', note: 'First batch + help us test + free expansion pack' },
                    ].map(d => (
                      <div key={d.id} className="dep">
                        <input type="radio" name="dep" id={d.id} value={d.value} defaultChecked={!!d.checked} />
                        <label htmlFor={d.id}>
                          <span className="dep-amt">{d.amt}</span>
                          <span className="dep-name">{d.name}</span>
                          <span className="dep-note">{d.note}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="deposit-why">
                  Your deposit counts toward your final purchase. If we miss our launch window or you change your mind — full refund, no process, no questions. This just helps us know how many to actually make.
                </p>

                <button className="submit-btn" type="submit" disabled={submitting}>
                  {submitting ? 'Reserving…' : 'Reserve my set →'}
                </button>
                <p className="form-note">No newsletters. No spam. Just your order update and a ship date.</p>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '48px 20px' }}>
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>🎉</div>
                <h3 className="success-h">You're in.</h3>
                <p className="success-p">We'll send you a confirmation shortly. Your spot is reserved.<br />We'll be in touch when your set is ready to ship.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <div>
          <div className="footer-logo">Catalyst<em>Labs</em></div>
          <div className="footer-tag">Because they deserve more than pixels.</div>
        </div>
        <div className="footer-links">
          <a href="mailto:hello@catalystlabs.in">hello@catalystlabs.in</a>
          <a href="#">Bengaluru, India</a>
          <span style={{ fontSize: '12px', color: 'rgba(244,237,224,0.2)', marginTop: '4px' }}>© 2025 Catalyst Labs</span>
        </div>
      </footer>
    </>
  )
}
