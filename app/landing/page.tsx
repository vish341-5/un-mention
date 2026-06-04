'use client';

import { useEffect, useRef } from 'react';
import './page.css';

// ── BOOK DATA ─────────────────────────────────────────────────────────────────
const BOOKS: Record<string, BookConfig> = {
  laws: {
    id: 'laws', bg: '#0C0A09', cardBg1: '#181410', cardBg2: '#131109',
    accent: '#C9954A', mutedColor: '#8C7B6A', bodyColor: '#B8B0A4',
    commitBg: '#071510', bookName: '48 LAWS OF POWER',
    bookTitle: '48 Laws of Power', dayTitle: 'Master Your Image',
    commitLabels: ['LAW 1 + 4', 'LAW 3', 'LAW 5 + 6'],
    cards: [
      {
        type: 'cover', title: 'Master Your<br><em style={{color:"#C9954A"}}>Image</em>', subtitle: '48 Laws of Power · Robert Greene',
        features: ['7 laws. One theme.', 'A reflection after each law.', '3 commitments at the end.', 'Your personal summary card.']
      },
      {
        type: 'concept', num: 'LAW 1', title: 'Never Outshine the Master',
        core: 'The most dangerous mistake you can make around someone with power over you is making them feel inferior.',
        body: 'People in authority are deeply sensitive to ego threats — regardless of how rational they appear. When you outperform, overshadow, or embarrass a superior, you don\'t trigger admiration. You trigger resentment.\n\nMake your wins their wins. Make them feel like the source of your success — and real opportunity opens.',
        why: 'Nicolas Fouquet threw the most spectacular party of 17th-century France to impress King Louis XIV. He was arrested within weeks. His crime wasn\'t corruption — it was making the king feel small.',
        apply: 'In every interaction with someone above you, ask: am I making them feel secure or threatened? The answer determines everything that follows.',
        reflection: 'Think of someone who has power over your future right now. Have you ever made them feel overshadowed — even unintentionally?'
      },
      {
        type: 'concept', num: 'LAW 2', title: 'Never Trust Friends Too Much',
        core: 'Friends are often the most dangerous people in your inner circle — not because they mean harm, but because friendship creates expectations that corrode working relationships.',
        body: 'A friend you promote expects preferential treatment. They take liberties. A former enemy recruited into your service has everything to prove — they work harder and stay more loyal.',
        why: 'History is full of kings betrayed by childhood friends given too much power, and rulers strengthened by reformed adversaries who had the most to prove.',
        apply: 'Separate your social circle from your strategic circle. The people you trust personally are not always the people you should trust professionally.',
        reflection: 'Is there someone in your life right now who you trust more because of loyalty than because of their actual track record?'
      },
      {
        type: 'concept', num: 'LAW 3', title: 'Conceal Your Intentions',
        core: 'When people know what you want, they know how to stop you, manipulate you, and prepare for you.',
        body: 'Concealment isn\'t lying — it\'s managing the narrative of your actions. Keep people focused on something else while you move toward your real objective.\n\nShare your process. Conceal your destination, your timeline, and your true motivation.',
        why: 'Bismarck would declare one intention publicly while quietly building a completely different outcome. By the time his opponents understood, the architecture was complete.',
        apply: 'Desire reveals vulnerability. Hidden desire is power in waiting.',
        reflection: 'What goal are you currently working toward that you\'ve been announcing too openly — and who might use that information against you?'
      },
      {
        type: 'concept', num: 'LAW 4', title: 'Always Say Less Than Necessary',
        core: 'The less you say, the more powerful you appear. Words are currency — the more you spend, the less each one is worth.',
        body: 'Silence does three things: it gives nothing away, it creates discomfort that others rush to fill, and it builds an aura of depth.\n\nA person who speaks little is assumed to be thinking much. Every word withheld is a card kept in your hand.',
        why: 'The more you talk, the more likely you are to say something you didn\'t intend. Powerful people throughout history have used deliberate silence as their most effective weapon.',
        apply: 'In your next important conversation — say your point, then stop. Resist the urge to fill silence. Watch what the other person reveals.',
        reflection: 'Think of a recent conversation where you said more than you needed to. What did that cost you?'
      },
      {
        type: 'concept', num: 'LAW 5', title: 'So Much Depends on Reputation',
        core: 'Reputation is the cornerstone of power. Through reputation alone you can intimidate and win — without it, you are vulnerable everywhere.',
        body: 'Reputation precedes you into every room. It shapes how people interpret your actions before they happen. A strong reputation makes everything easier — weak people defer, strong people negotiate cautiously.\n\nOnce established, it creates a self-reinforcing cycle: people look for evidence that confirms what they already believe about you.',
        why: 'Talleyrand survived every French government from the monarchy to Napoleon to the Restoration — not through loyalty, but through an impeccable reputation for knowing which way power would flow.',
        apply: 'Your reputation is a strategic asset. Most people let it form by accident. Decide what you want it to be — and manage it deliberately.',
        reflection: 'What does your reputation currently say about you — and is that the reputation you chose, or one that formed by default?'
      },
      {
        type: 'concept', num: 'LAW 6', title: 'Court Attention at All Costs',
        core: 'Everything is judged by its appearance. What is unseen counts for nothing. The world is a theatre — never be caught backstage.',
        body: 'In a crowded world, attention is the first resource. Without it, your other resources are invisible. Anything that makes you stand out — even infamy for a moment — is preferable to being forgotten.\n\nControversy, mystery, and unpredictability all draw attention. What people cannot ignore, they cannot dismiss.',
        why: 'P.T. Barnum understood this before modern marketing existed. The spectacle was never separate from the content — it was the strategy.',
        apply: 'Make your work harder to ignore. The quality of attention matters — but its absence is fatal.',
        reflection: 'Is there something you\'re doing — work, a project, a skill — that almost nobody knows about? What\'s the cost of that invisibility?'
      },
      {
        type: 'insights', insights: [
          { num: '01', title: 'Power is a game of perception, not merit', body: 'What you actually do matters far less than how it appears, who sees it, and what they think it means. Mastering appearances isn\'t dishonesty — it\'s fluency in how the world actually works.' },
          { num: '02', title: 'The people above you are always watching for threats to their ego', body: 'This is the most underestimated dynamic in professional life. Performance that makes your superiors feel diminished is more dangerous than underperformance. Make your wins their wins.' },
          { num: '03', title: 'Your reputation works for you or against you 24 hours a day', body: 'Unlike effort, which is intermittent, reputation is continuous. It operates in every room you\'ve never entered, in every conversation you\'re not part of. Build it deliberately.' }
        ]
      },
      {
        type: 'commit', questions: [
          { q: 'Think of your most important professional relationship right now. What\'s one thing you\'ve done recently that may have made them feel overshadowed — and what will you do differently?', placeholder: 'e.g. I\'ve been correcting my manager in meetings. This week I\'ll reframe my input as building on their point, not contradicting it.', tag: 'LAWS 1 + 4', hint: 'Be specific. Name the person, the behavior, and the change. Vague commitments produce vague results.' },
          { q: 'What is one goal, plan, or ambition that you\'ve been announcing too openly — and who might be using that information to prepare against you?', placeholder: 'e.g. I\'ve been telling everyone I\'m looking for a new role. I\'ll stop — and move quietly until I have an offer in hand.', tag: 'LAW 3', hint: 'Concealment isn\'t deception. It\'s patience. The goal doesn\'t change — only who knows about it.' },
          { q: 'Write one concrete action you\'ll take this week to make yourself — or your work — harder to ignore.', placeholder: 'e.g. I\'ve been doing good work no one sees. This week I\'ll send one update to three people who should know about it.', tag: 'LAWS 5 + 6', hint: 'Attention doesn\'t come for free — it has to be earned or manufactured. What\'s yours?' }
        ]
      },
      { type: 'summary' },
      { type: 'signin' }
    ]
  },
  atomic: {
    id: 'atomic', bg: '#081510', cardBg1: '#0D1F18', cardBg2: '#081510',
    accent: '#4ADE80', mutedColor: '#6B8C7A', bodyColor: '#9DB8AC',
    commitBg: '#061210', bookName: 'ATOMIC HABITS',
    bookTitle: 'Atomic Habits', dayTitle: 'The Foundation of Change',
    commitLabels: ['HABIT LOOP', 'IDENTITY', 'ENVIRONMENT'],
    cards: [
      {
        type: 'cover', title: 'The Foundation<br><em style={{color:"#4ADE80"}}>of Change</em>', subtitle: 'Atomic Habits · James Clear',
        features: ['5 core ideas from chapters 1–3', 'A reflection after each concept', '3 commitments at the end', 'Your personal summary card']
      },
      {
        type: 'concept', num: 'THE CORE IDEA', title: '1% Better Every Day',
        core: 'Habits are the compound interest of self-improvement. The same way that money multiplies through compound interest, the effects of your habits multiply as you repeat them.',
        body: 'If you get 1% better each day for one year, you\'ll end up 37 times better by the time you\'re done. If you get 1% worse each day for one year, you\'ll decline nearly down to zero.\n\nHabits are a double-edged sword. They can work for you or against you. The key question is: are your daily choices compounding in your favour?',
        why: 'British Cycling was considered a laughingstock in 1998. When Dave Brailsford took over, he implemented the "aggregation of marginal gains" — 1% improvements in everything from rider nutrition to pillow firmness. Within 5 years: Tour de France victory.',
        apply: 'Stop looking for the one big change and start searching for tiny improvements you can sustain daily. The results won\'t be visible for weeks or months — that\'s exactly the point.',
        reflection: 'Where in your life are you waiting for a big breakthrough when 1% daily improvements would actually get you there faster?'
      },
      {
        type: 'concept', num: 'THE HABIT LOOP', title: 'Cue. Craving. Response. Reward.',
        core: 'All habits follow the same four-step loop. Understanding it gives you the ability to build any habit — or break any one you don\'t want.',
        body: 'The cue triggers a craving. The craving motivates a response. The response delivers a reward. The reward satisfies the craving and becomes associated with the cue.\n\nEvery habit, good or bad, follows this loop. You don\'t control the loop — but you can redesign any of its four components.',
        why: 'Tech companies build products around this loop deliberately. Notifications are cues. Social validation is the reward. Understanding this is how you take back control of your own behavior.',
        apply: 'Pick one habit you want to build. Identify its cue (when, where, what triggers it), define the craving (what outcome do you actually want), keep the response obvious, and make the reward immediate.',
        reflection: 'Think of a bad habit you\'ve been unable to break. Which part of the loop is strongest? The cue, the craving, or the reward?'
      },
      {
        type: 'concept', num: 'IDENTITY', title: 'You Don\'t Rise to Goals. You Fall to Systems.',
        core: 'Every action you take is a vote for the type of person you wish to become. The goal isn\'t to read a book — it\'s to become a reader.',
        body: 'Most people set outcome-based goals: lose 20 pounds, run a marathon. The problem is they don\'t change who they are — they just change what they do, temporarily.\n\nIdentity-based habits work differently. Instead of "I want to run a marathon", it\'s "I\'m becoming a runner." Every run — even a 10-minute one — is evidence for that identity.',
        why: 'The word "identity" comes from the Latin "essentitas" (being) and "identidem" (repeatedly). Your identity is literally what you repeatedly do. Change the repetitions, change the identity.',
        apply: 'Before your next action toward a habit, ask: "What would a person with this identity do?" Then do that — even a tiny version of it. Every action is evidence.',
        reflection: 'What identity are you trying to build — and what small actions this week could serve as evidence for that identity?'
      },
      {
        type: 'insights', insights: [
          { num: '01', title: 'Tiny changes create remarkable results over time', body: 'The problem is the feedback loop is too slow to feel it working. Most people give up before the compound effect becomes visible. The plateau of latent potential is real — results come in a sudden burst after a long invisible period of building.' },
          { num: '02', title: 'Your environment is more powerful than your willpower', body: 'Every habit is cued by context. The easiest way to build a habit is to redesign your environment so the cue is impossible to miss. Put the book on your pillow. Put the running shoes by the door. Stop relying on motivation — design for inevitability.' },
          { num: '03', title: 'The goal was never the point — the system is', body: 'Goals are direction. Systems are what produce results. Two athletes can have the same goal and only one will achieve it — because only one built the system. Once the system is right, the goal is an afterthought.' }
        ]
      },
      {
        type: 'commit', questions: [
          { q: 'Choose one habit you want to build in the next 30 days. Name the specific cue, the response, and the reward.', placeholder: 'e.g. Cue: after I make coffee. Response: 20 minutes of writing. Reward: read one article I enjoy.', tag: 'HABIT LOOP', hint: 'Be specific enough that someone else could follow your instructions. Vague habit plans produce vague results.' },
          { q: 'What identity are you trying to build — and what is the smallest possible action that would serve as evidence for it today?', placeholder: 'e.g. I\'m becoming someone who moves every day. Today I\'ll do 5 minutes of stretching. That\'s it. That\'s enough.', tag: 'IDENTITY', hint: 'The size of the action doesn\'t matter yet. The repetition does. Cast one vote for the person you\'re becoming.' },
          { q: 'Redesign one part of your environment to make a desired habit inevitable — or an unwanted one harder.', placeholder: 'e.g. I\'ll put my phone charger outside the bedroom so I can\'t scroll before sleep. I\'ll put my book on my pillow instead.', tag: 'ENVIRONMENT', hint: 'Willpower is finite. Design is forever. What one environmental change would make your habit automatic?' }
        ]
      },
      { type: 'summary' },
      { type: 'signin' }
    ]
  },
  zero: {
    id: 'zero', bg: '#080C18', cardBg1: '#0E1428', cardBg2: '#080C18',
    accent: '#60A5FA', mutedColor: '#6B7E9C', bodyColor: '#9AADC4',
    commitBg: '#060A14', bookName: 'ZERO TO ONE',
    bookTitle: 'Zero to One', dayTitle: 'The Philosophy of Progress',
    commitLabels: ['0→1 THINKING', 'CONTRARIAN THINKING', 'UNLEARN THE WRONG LESSONS'],
    cards: [
      {
        type: 'cover', title: 'The Philosophy<br><em style={{color:"#60A5FA"}}>of Progress</em>', subtitle: 'Zero to One · Peter Thiel with Blake Masters',
        features: ['5 core ideas from chapters 1–2', 'A reflection after each concept', '3 commitments at the end', 'Your personal summary card']
      },
      {
        type: 'concept', num: 'THE CORE IDEA', title: 'Two Kinds of Progress',
        core: 'The difference between 0→1 and 1→N is the difference between creating and copying. Only one of them builds the future.',
        body: 'Horizontal progress means copying what works — spreading it, scaling it. Going from 1 to N. A hundred typewriters instead of one.\n\nVertical progress means creating what didn\'t exist before. Going from 0 to 1. A typewriter becomes a word processor.\n\nGlobalization is horizontal. Technology is vertical. Thiel argues the world urgently needs more of the latter.',
        why: 'We can easily imagine China becoming like the United States — that\'s horizontal progress. But imagining a completely new kind of energy, medicine, or communication requires a fundamentally different kind of thinking.',
        apply: 'Look at your work right now. Are you copying and improving — or are you creating something that didn\'t exist? Most people spend their entire careers on 1→N. The rare ones who go 0→1 build the things everyone else copies.',
        reflection: 'In your own life or work — is there something you\'ve been copying or improving when you could be creating something entirely new?'
      },
      {
        type: 'concept', num: 'THE CONTRARIAN QUESTION', title: 'What Important Truth Do Few People Agree With You On?',
        core: 'This question is not an icebreaker. It\'s a diagnostic tool for original thinking — and most people fail it.',
        body: 'Most answers are either trivially true or merely contrarian for its own sake. A genuine answer sounds like: most people believe X, but the actual truth is Y — and here\'s why.\n\nThis question matters because every great company is built on a secret. A truth most people don\'t yet believe.\n\nIf your idea is something everyone already knows is good, it either already exists or dozens of people are building it right now.',
        why: 'Thiel\'s own answer was that internet payments would become the backbone of global commerce — when almost nobody believed that in 1998. PayPal was built on that contrarian truth.',
        apply: 'The best business opportunities hide behind ideas that smart people dismiss. If your idea is obviously good to everyone, the opportunity is probably already gone.',
        reflection: 'What is one belief you hold about your industry, career, or the world that most people around you would disagree with — and why do you think you\'re right?'
      },
      {
        type: 'concept', num: 'WHY THIS IS HARD', title: 'Consensus is the Default Mode',
        core: 'Original thinking is rare — not because people are unintelligent, but because social pressure toward conformity is overwhelming.',
        body: 'We calibrate our beliefs against the people around us. In academia this means publishing within established paradigms. In business it means benchmarking — measuring against competitors rather than against a completely different vision.\n\nThe gravitational pull of consensus thinking makes genuine originality extremely difficult.',
        why: 'In business, benchmarking feels safe and responsible. But a company that defines itself by its competition has already surrendered the most important strategic ground — the ability to define its own category.',
        apply: 'Next time you\'re forming an opinion on something important, ask: am I actually thinking this through, or am I just reflecting what the people around me believe?',
        reflection: 'Is there an area in your life where you\'ve been following consensus — going along with what\'s expected — when your instinct tells you something different?'
      },
      {
        type: 'concept', num: 'THE 4 WRONG LESSONS', title: 'What the Dot-Com Crash Taught Everyone — Wrongly',
        core: 'Silicon Valley learned real lessons from a real disaster. Thiel\'s argument is that almost every one of them is wrong.',
        body: 'The dot-com crash taught entrepreneurs four lessons: make incremental advances, stay lean and flexible, improve on the competition, focus on product not sales.\n\nThiel\'s inversion: boldness over triviality, a bad plan beats no plan, competitive markets destroy profits, sales matters as much as product.\n\nThe founders who ignored these lessons — Zuckerberg, Bezos, Page — built companies that redefined entire industries.',
        why: 'The founders who absorbed these lessons built safer, smaller companies. They learned them through the lens of their trauma, which distorted the signal.',
        apply: 'Which of these four wrong lessons are you currently following? Most people are operating on at least one of them without realizing it.',
        reflection: 'Are you being "lean and flexible" when you actually need conviction and a plan? Or competing in an existing market when you could be defining a new one?'
      },
      {
        type: 'concept', num: 'THE FUTURE', title: 'The Future Is Made, Not Arrived At',
        core: 'The future isn\'t just the set of moments yet to come. It\'s the world that will be qualitatively different — and someone has to build it.',
        body: 'Thiel defines the future as the part of time that is meaningfully different from today. That difference doesn\'t appear on its own.\n\nThiel is genuinely optimistic: the problems facing civilization — disease, energy scarcity, poverty — are not unsolvable. They are engineering problems that haven\'t been adequately addressed because the right thinking, incentives, and courage haven\'t been in place.',
        why: 'Most people treat the future as something that happens to them. The founders of great companies treat it as something they are building on purpose — one 0→1 moment at a time.',
        apply: 'The path to building something great begins not with a business plan but with a thought — a specific, non-obvious belief about how the world works and how it could be different. What is yours?',
        reflection: 'If you were going to build something that genuinely didn\'t exist yet — what problem would it solve and why does nobody else see it yet?'
      },
      {
        type: 'insights', insights: [
          { num: '01', title: 'The best opportunities hide behind ideas that smart people dismiss', body: 'If everyone thinks your idea is obviously good, the market has probably already moved. The contrarian position isn\'t about being different for its own sake — it\'s about seeing clearly when the consensus is wrong.' },
          { num: '02', title: 'Copying feels safe but it\'s the riskier long-term play', body: '1→N progress looks responsible. But you\'re competing for the same market as everyone else. The only truly defensible position is one nobody else has staked out — and that requires going from 0 to 1.' },
          { num: '03', title: 'The future is not inevitable — it is built by specific people with specific convictions', body: 'The world doesn\'t improve on autopilot. It improves because particular individuals held non-obvious beliefs long enough to act on them.' }
        ]
      },
      {
        type: 'commit', questions: [
          { q: 'Where in your work or life could you go from 0 to 1 right now — and what\'s the first step you\'ll take this week?', placeholder: 'e.g. I\'ve been thinking about building a tool that doesn\'t exist. This week I\'ll spend 2 hours validating if anyone else has the same problem.', tag: '0→1 THINKING', hint: 'Thiel\'s framework only works when applied to a real, concrete situation. Name the specific thing.' },
          { q: 'What\'s one decision you\'ve made by following the crowd — and what would you do differently if you only answered to your own thinking?', placeholder: 'e.g. I chose a "safe" career path. If I\'d been thinking for myself, I would have taken the less conventional option two years earlier.', tag: 'CONTRARIAN THINKING', hint: 'This isn\'t about regret. It\'s about understanding how much of your decision-making is genuinely yours.' },
          { q: 'Write the one bold bet you\'d make on yourself or your work — if incremental thinking was not an option.', placeholder: 'e.g. I\'d stop trying to be a slightly better version of others in my industry and instead build something on completely different assumptions.', tag: 'UNLEARN THE WRONG LESSONS', hint: 'You\'ve been thinking through four concepts and four reflections. The answer is already forming. Write it.' }
        ]
      },
      { type: 'summary' },
      { type: 'signin' }
    ]
  }
};

// ── TYPES ─────────────────────────────────────────────────────────────────────
interface BookConfig {
  id: string;
  bg: string;
  cardBg1: string;
  cardBg2: string;
  accent: string;
  mutedColor: string;
  bodyColor: string;
  commitBg: string;
  bookName: string;
  bookTitle: string;
  dayTitle: string;
  commitLabels: string[];
  cards: CardData[];
}

type CardData =
  | CoverCard
  | ConceptCard
  | InsightsCard
  | CommitCard
  | { type: 'summary' }
  | { type: 'signin' };

interface CoverCard {
  type: 'cover';
  title: string;
  subtitle: string;
  features: string[];
}

interface ConceptCard {
  type: 'concept';
  num: string;
  title: string;
  core: string;
  body: string;
  why: string;
  apply: string;
  reflection: string;
}

interface InsightsCard {
  type: 'insights';
  insights: { num: string; title: string; body: string }[];
}

interface CommitCard {
  type: 'commit';
  questions: { q: string; placeholder: string; tag: string; hint: string }[];
}

interface ReaderState {
  cards: CardData[];
  current: number;
  tab: 'core' | 'story' | 'apply';
  reflections: Record<number, string>;
  commitments: [string, string, string];
  commitStep: number;
  animKey: number;
  lessonIdx: number;
}

// ── CARD RENDERER FUNCTIONS ───────────────────────────────────────────────────
function mkCard(cfg: BookConfig, extra = ''): HTMLDivElement {
  const d = document.createElement('div');
  d.className = 'cr-card';
  d.style.cssText = `background:linear-gradient(145deg, ${cfg.cardBg1}, ${cfg.cardBg2}); ${extra}`;
  return d;
}

function renderCover(card: CoverCard, cfg: BookConfig, state: ReaderState): HTMLDivElement {
  const d = mkCard(cfg, `border-color:${cfg.accent}20; cursor:pointer; justify-content:space-between; min-height:500px;`);
  d.onclick = () => { state.current = 1; (window as any)['_rerender_' + cfg.id](); };
  d.innerHTML = `
    <div>
      <div style="font-size:9px;letter-spacing:5px;color:${cfg.accent};font-family:'DM Mono',monospace;margin-bottom:32px;">UNMENTIONED</div>
      <div style="font-size:10px;letter-spacing:4px;color:${cfg.accent}80;font-family:'DM Mono',monospace;margin-bottom:14px;">DAY 1 OF 7</div>
      <h1 style="font-family:'Cormorant Garamond',serif;font-size:46px;font-weight:700;color:#F5EFE6;line-height:1.05;margin-bottom:16px;">${card.title}</h1>
      <p style="font-size:13px;color:${cfg.mutedColor};font-family:'DM Sans',sans-serif;margin-top:16px;">${card.subtitle}</p>
    </div>
    <div>
      <div style="height:1px;background:linear-gradient(to right, ${cfg.accent}25, transparent);margin-bottom:24px;"></div>
      ${card.features.map(f => `<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;"><div style="width:4px;height:4px;border-radius:50%;background:${cfg.accent};flex-shrink:0;"></div><span style="font-size:13px;color:${cfg.mutedColor};font-family:'DM Sans',sans-serif;">${f}</span></div>`).join('')}
      <div style="display:flex;align-items:center;gap:8px;font-size:12px;color:#ffffff20;font-family:'DM Sans',sans-serif;margin-top:32px;">
        <span style="width:7px;height:7px;border-radius:50%;background:${cfg.accent};animation:pulse 2s infinite;display:inline-block;"></span>
        Tap anywhere to begin
      </div>
    </div>`;
  return d;
}

function renderConcept(card: ConceptCard, cfg: BookConfig, state: ReaderState): HTMLDivElement {
  const d = mkCard(cfg);
  const tabs: ('core' | 'story' | 'apply')[] = ['core', 'story', 'apply'];
  const tabLabels = ['Core', 'Story', 'Apply'];
  const content: Record<string, string> = { core: card.body, story: card.why, apply: card.apply };

  const header = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
      <span style="font-size:9px;letter-spacing:4px;color:${cfg.accent};font-family:'DM Mono',monospace;">${card.num || ''}</span>
      <span style="font-size:10px;color:#ffffff20;font-family:'DM Mono',monospace;">${(state.cards.filter(c => c.type === 'concept').indexOf(card) + 1)} of ${state.cards.filter(c => c.type === 'concept').length}</span>
    </div>
    <h2 style="font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:700;color:#F5EFE6;line-height:1.2;margin-bottom:12px;">${card.title}</h2>
    <div style="background:${cfg.accent}10;border:1px solid ${cfg.accent}22;border-radius:10px;padding:12px 14px;margin-bottom:14px;">
      <p style="font-size:13px;color:#E8D5B7;font-family:'Cormorant Garamond',serif;font-style:italic;line-height:1.65;">${card.core}</p>
    </div>`;

  const tabsHTML = `<div class="cr-tabs">${tabs.map((t, i) => `<button class="cr-tab" data-tab="${t}" style="background:${state.tab === t ? cfg.accent : '#ffffff08'};color:${state.tab === t ? cfg.cardBg1 : '#ffffff35'};">${tabLabels[i]}</button>`).join('')}</div>`;

  const bodyHTML = `<div id="cr-tabcontent-${cfg.id}" style="flex:1;overflow-y:auto;"><p style="font-size:13px;color:${cfg.bodyColor};line-height:1.8;font-family:'DM Sans',sans-serif;">${(content[state.tab] || '').replace(/\n\n/g, `</p><p style="font-size:13px;color:${cfg.bodyColor};line-height:1.8;font-family:'DM Sans',sans-serif;margin-top:10px;">`)}</p></div>`;

  const reflectHTML = card.reflection ? `
    <div class="cr-reflect">
      <div class="cr-reflect-label" style="color:${cfg.accent};">REFLECT</div>
      <p class="cr-reflect-q" style="color:${cfg.mutedColor};">${card.reflection}</p>
      <textarea class="cr-textarea" placeholder="Your thought here (optional)..." style="background:#ffffff06;border:1px solid #ffffff10;color:#F5EFE6;" data-reflect-idx="${state.current}">${state.reflections[state.current] || ''}</textarea>
    </div>` : '';

  d.innerHTML = header + tabsHTML + bodyHTML + reflectHTML;

  d.querySelectorAll('.cr-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      state.tab = (btn as HTMLElement).dataset.tab as 'core' | 'story' | 'apply';
      (window as any)['_rerender_' + cfg.id]();
    });
  });

  const ta = d.querySelector('textarea[data-reflect-idx]') as HTMLTextAreaElement | null;
  if (ta) ta.addEventListener('input', e => { state.reflections[state.current] = (e.target as HTMLTextAreaElement).value; });

  return d;
}

function renderInsights(card: InsightsCard, cfg: BookConfig, state: ReaderState): HTMLDivElement {
  const d = mkCard(cfg, `background:linear-gradient(160deg, ${cfg.cardBg1}, ${cfg.cardBg2});`);
  const ins = card.insights[state.lessonIdx];

  d.innerHTML = `
    <div style="font-size:9px;letter-spacing:4px;color:${cfg.accent};font-family:'DM Mono',monospace;margin-bottom:6px;">3 KEY INSIGHTS</div>
    <h2 style="font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:700;color:#F5EFE6;margin-bottom:20px;line-height:1.2;">What Day 1 really taught you</h2>
    <div style="display:flex;gap:8px;margin-bottom:20px;">
      ${card.insights.map((_, i) => `<button class="cr-insight-btn" data-i="${i}" style="flex:1;padding:8px;border-radius:10px;border:1px solid ${i === state.lessonIdx ? cfg.accent : '#ffffff10'};background:${i === state.lessonIdx ? cfg.accent + '18' : 'transparent'};color:${i === state.lessonIdx ? cfg.accent : '#ffffff30'};font-size:16px;font-family:'DM Sans',sans-serif;font-weight:700;cursor:pointer;">${i + 1}</button>`).join('')}
    </div>
    <div style="flex:1;">
      <div style="font-size:42px;font-weight:700;color:${cfg.accent}15;font-family:'Cormorant Garamond',serif;line-height:1;margin-bottom:-4px;">${ins.num}</div>
      <h3 style="font-family:'Cormorant Garamond',serif;font-size:21px;color:#F5EFE6;line-height:1.3;margin-bottom:14px;font-weight:700;">${ins.title}</h3>
      <p style="font-size:14px;color:${cfg.bodyColor};line-height:1.8;font-family:'DM Sans',sans-serif;">${ins.body}</p>
    </div>
    <p style="font-size:10px;color:#ffffff20;font-family:'DM Mono',monospace;text-align:center;margin-top:16px;">Tap 1 · 2 · 3 to explore</p>`;

  d.querySelectorAll('.cr-insight-btn').forEach(btn => {
    btn.addEventListener('click', () => { state.lessonIdx = parseInt((btn as HTMLElement).dataset.i || '0'); (window as any)['_rerender_' + cfg.id](); });
  });
  return d;
}

function renderCommit(card: CommitCard, cfg: BookConfig, state: ReaderState): HTMLDivElement {
  const q = card.questions[state.commitStep];
  const d = mkCard(cfg, `background:linear-gradient(160deg, ${cfg.commitBg}, ${cfg.cardBg2});`);

  d.innerHTML = `
    <div style="font-size:9px;letter-spacing:4px;color:${cfg.accent};font-family:'DM Mono',monospace;margin-bottom:6px;">YOUR COMMITMENTS</div>
    <div style="display:flex;gap:6px;margin-bottom:20px;">
      ${[0, 1, 2].map(i => `<div style="flex:1;height:3px;border-radius:2px;background:${i <= state.commitStep ? cfg.accent : '#ffffff10'};transition:all 0.3s;"></div>`).join('')}
    </div>
    <div style="font-size:9px;letter-spacing:3px;color:${cfg.accent}80;font-family:'DM Mono',monospace;margin-bottom:10px;">${q.tag || ''}</div>
    <h2 class="cr-commit-q" style="color:#F5EFE6;">${q.q}</h2>
    <div style="flex:1;display:flex;flex-direction:column;">
      <textarea class="cr-commit-ta" placeholder="${q.placeholder}" style="background:#ffffff06;border:1px solid ${state.commitments[state.commitStep].trim() ? cfg.accent + '40' : '#ffffff10'};color:#F5EFE6;" data-step="${state.commitStep}">${state.commitments[state.commitStep]}</textarea>
      <p style="font-size:11px;color:${state.commitments[state.commitStep].trim() ? cfg.accent + '70' : '#ffffff20'};font-family:'DM Sans',sans-serif;margin-top:10px;">${state.commitments[state.commitStep].trim() ? '✓ Tap → to continue' : 'Write your action — one sentence is enough'}</p>
    </div>
    <div class="cr-hint" style="background:${cfg.accent}08;border:1px solid ${cfg.accent}18;"><p style="color:${cfg.accent}60;">${q.hint || ''}</p></div>`;

  const textarea = d.querySelector('textarea') as HTMLTextAreaElement;
  textarea.addEventListener('input', e => {
    state.commitments[state.commitStep] = (e.target as HTMLTextAreaElement).value;
    (window as any)['_rerender_' + cfg.id]();
  });
  return d;
}

function renderSummary(cfg: BookConfig, state: ReaderState): HTMLDivElement {
  const d = document.createElement('div');
  d.className = 'cr-summary';
  d.style.cssText = `background:linear-gradient(160deg, ${cfg.cardBg1}, ${cfg.cardBg2});border:1px solid ${cfg.accent}25;`;

  const filledReflections = Object.entries(state.reflections).filter(([, v]) => v.trim());

  d.innerHTML = `
    <div class="cr-summary-header" style="border-bottom:1px solid ${cfg.accent}20;">
      <div style="font-size:9px;letter-spacing:5px;color:${cfg.accent};font-family:'DM Mono',monospace;margin-bottom:8px;">UNMENTIONED</div>
      <h2 style="font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:700;color:#F5EFE6;line-height:1.1;margin-bottom:4px;">${cfg.bookTitle}</h2>
      <p style="font-size:12px;color:${cfg.mutedColor};font-family:'DM Sans',sans-serif;">Day 1 Complete · ${cfg.dayTitle}</p>
    </div>
    <div style="margin-bottom:16px;margin-top:16px;">
      <div style="font-size:9px;letter-spacing:3px;color:${cfg.accent};font-family:'DM Mono',monospace;margin-bottom:10px;">YOUR 3 COMMITMENTS</div>
      ${state.commitments.map((c, i) => `
        <div style="padding:10px 12px;background:${cfg.accent}08;border:1px solid ${cfg.accent}18;border-radius:10px;margin-bottom:8px;">
          <div style="font-size:9px;color:${cfg.accent}60;font-family:'DM Mono',monospace;margin-bottom:4px;letter-spacing:2px;">${cfg.commitLabels[i] || 'COMMITMENT ' + (i + 1)}</div>
          <p style="font-size:13px;color:${c ? '#F5EFE6' : '#ffffff25'};font-family:'DM Sans',sans-serif;line-height:1.55;font-style:${c ? 'normal' : 'italic'}">${c || '—'}</p>
        </div>`).join('')}
    </div>
    ${filledReflections.length > 0 ? `
    <div style="margin-bottom:16px;">
      <div style="font-size:9px;letter-spacing:3px;color:#A78BFA;font-family:'DM Mono',monospace;margin-bottom:10px;">YOUR REFLECTIONS</div>
      ${filledReflections.map(([, v]) => `
        <div style="padding:8px 12px;background:#A78BFA08;border:1px solid #A78BFA18;border-radius:8px;margin-bottom:6px;">
          <p style="font-size:12px;color:${cfg.bodyColor};font-family:'DM Sans',sans-serif;line-height:1.5;font-style:italic;">"${v}"</p>
        </div>`).join('')}
    </div>` : ''}
    <div style="text-align:center;padding-top:12px;border-top:1px solid ${cfg.accent}15;">
      <p style="font-size:10px;color:#ffffff20;font-family:'DM Sans',sans-serif;margin-bottom:8px;">📸 Screenshot this card to save your progress</p>
      <p style="font-size:11px;color:${cfg.accent}60;font-family:'DM Mono',monospace;">unmentioned.app</p>
    </div>`;
  return d;
}

function renderSignin(cfg: BookConfig): HTMLDivElement {
  const d = mkCard(cfg, 'overflow-y:auto;');

  d.innerHTML = `
    <div class="cr-signin-card">
      <div style="font-size:9px;letter-spacing:4px;color:${cfg.accent};font-family:'DM Mono',monospace;margin-bottom:12px;">YOU FINISHED DAY 1</div>
      <h2 style="font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:700;color:#F5EFE6;line-height:1.2;margin-bottom:12px;">Want all 7 days?</h2>
      <p style="font-size:13px;color:${cfg.mutedColor};font-family:'DM Sans',sans-serif;line-height:1.6;margin-bottom:28px;max-width:280px;">Sign in or create a free account to unlock all 7 days and access your full library.</p>
      <a href="/sign-in" class="cr-signin-btn" style="background:${cfg.accent};color:#0E0C0A;width:100%;text-align:center;">Sign In →</a>
      <a href="/sign-up" class="cr-signin-btn" style="background:transparent;color:${cfg.accent};border:1px solid ${cfg.accent}40;width:100%;text-align:center;margin-top:10px;">Create Free Account</a>
      <p style="font-size:10px;color:#ffffff20;font-family:'DM Mono',monospace;margin-top:16px;">1 book free · No credit card needed</p>
    </div>`;

  return d;
}

function renderCard(state: ReaderState, cfg: BookConfig): HTMLElement {
  const card = state.cards[state.current];
  if (card.type === 'cover') return renderCover(card, cfg, state);
  if (card.type === 'concept') return renderConcept(card, cfg, state);
  if (card.type === 'insights') return renderInsights(card, cfg, state);
  if (card.type === 'commit') return renderCommit(card, cfg, state);
  if (card.type === 'summary') return renderSummary(cfg, state);
  if (card.type === 'signin') return renderSignin(cfg);
  return document.createElement('div');
}

function initReader(bookId: string): void {
  const cfg = BOOKS[bookId];
  const container = document.getElementById('panel-' + bookId);
  if (!container) return;
  container.innerHTML = '';

  const state: ReaderState = {
    cards: cfg.cards,
    current: 0,
    tab: 'core',
    reflections: {},
    commitments: ['', '', ''],
    commitStep: 0,
    animKey: 0,
    lessonIdx: 0
  };

  function render(): void {
    const card = state.cards[state.current];
    const total = state.cards.length;
    const progress = (state.current / (total - 1)) * 100;
    const isCommit = card.type === 'commit';
    const canNext = isCommit ? state.commitments[state.commitStep].trim().length > 0 : true;
    const showNav = state.current > 0 && card.type !== 'signin';

    const wrap = document.createElement('div');
    wrap.className = 'cr-root cr-anim';
    wrap.style.cssText = `background:${cfg.bg}; border-radius:20px;`;

    const glow = document.createElement('div');
    glow.className = 'cr-glow';
    glow.style.background = `radial-gradient(ellipse, ${cfg.accent}18 0%, transparent 70%)`;
    wrap.appendChild(glow);

    if (state.current > 0) {
      const topbar = document.createElement('div');
      topbar.className = 'cr-topbar';
      topbar.style.background = `linear-gradient(to bottom, ${cfg.bg} 50%, transparent)`;
      topbar.innerHTML = `
        <div class="cr-topbar-row">
          <span style="font-size:9px;letter-spacing:3px;color:${cfg.accent};font-family:'DM Mono',monospace;">${cfg.bookName}</span>
          <span style="font-size:9px;color:#ffffff25;font-family:'DM Mono',monospace;background:#ffffff08;padding:2px 8px;border-radius:20px;">DAY 1</span>
        </div>
        <div class="cr-progress"><div class="cr-progress-fill" style="width:${progress}%;background:${cfg.accent};"></div></div>`;
      wrap.appendChild(topbar);
    }

    const stage = document.createElement('div');
    stage.className = 'cr-stage';
    stage.appendChild(renderCard(state, cfg));
    wrap.appendChild(stage);

    if (showNav) {
      const nav = document.createElement('div');
      nav.className = 'cr-bottombar';
      nav.style.background = `linear-gradient(to top, ${cfg.bg} 50%, transparent)`;

      const prevBtn = document.createElement('button');
      prevBtn.className = 'cr-navbtn';
      prevBtn.textContent = '←';
      prevBtn.onclick = () => {
        if (state.current > 0) {
          if (card.type === 'commit' && state.commitStep > 0) { state.commitStep--; }
          else if (card.type === 'commit') { state.current--; state.commitStep = 0; }
          else { state.current--; }
          state.tab = 'core';
          rerender();
        }
      };

      const dots = document.createElement('div');
      dots.className = 'cr-dots';
      const dotCount = Math.min(total, 15);
      for (let i = 0; i < dotCount; i++) {
        const d = document.createElement('div');
        d.className = 'cr-dot';
        const mapped = Math.floor((i / dotCount) * total);
        d.style.width = mapped === state.current ? '18px' : '5px';
        d.style.background = mapped === state.current ? cfg.accent : mapped < state.current ? cfg.accent + '55' : '#ffffff18';
        dots.appendChild(d);
      }

      const nextBtn = document.createElement('button');
      nextBtn.className = 'cr-navbtn';
      nextBtn.textContent = '→';
      nextBtn.style.opacity = canNext ? '1' : '0.3';
      nextBtn.onclick = () => {
        if (!canNext) return;
        const c = state.cards[state.current];
        if (c.type === 'commit') {
          if (state.commitStep < 2) { state.commitStep++; }
          else { state.current++; state.commitStep = 0; }
        } else if (state.current < total - 1) { state.current++; }
        state.tab = 'core'; state.lessonIdx = 0; rerender();
      };

      nav.appendChild(prevBtn); nav.appendChild(dots); nav.appendChild(nextBtn);
      wrap.appendChild(nav);
    }

    container!.innerHTML = '';
    container!.appendChild(wrap);

    // Touch support
    let ts: number | null = null;
    wrap.addEventListener('touchstart', e => { ts = e.touches[0].clientX; });
    wrap.addEventListener('touchend', e => {
      if (!ts) return;
      const dx = ts - e.changedTouches[0].clientX;
      if (Math.abs(dx) > 50) {
        if (dx > 0 && canNext) {
          const c = state.cards[state.current];
          if (c.type === 'commit') { if (state.commitStep < 2) state.commitStep++; else { state.current++; state.commitStep = 0; } }
          else if (state.current < state.cards.length - 1) state.current++;
          state.tab = 'core'; state.lessonIdx = 0; rerender();
        } else if (dx < 0 && state.current > 0) {
          const c = state.cards[state.current];
          if (c.type === 'commit' && state.commitStep > 0) state.commitStep--;
          else if (c.type === 'commit') { state.current--; state.commitStep = 0; }
          else state.current--;
          state.tab = 'core'; rerender();
        }
      }
      ts = null;
    });
  }

  function rerender(): void { render(); }

  render();
  (window as any)['_state_' + bookId] = state;
  (window as any)['_rerender_' + bookId] = rerender;
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function LandingPage() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Scroll nav
    const handleScroll = () => {
      if (navRef.current) {
        navRef.current.classList.toggle('scrolled', window.scrollY > 40);
      }
    };
    window.addEventListener('scroll', handleScroll);

    // Reveal on scroll
    const reveals = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), 80);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => obs.observe(el));

    // Init default book reader
    initReader('laws');

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToDemo = () => {
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
  };

  const selectBook = (id: string) => {
    document.querySelectorAll('.book-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.reader-panel').forEach(p => p.classList.remove('active'));
    document.getElementById('btn-' + id)?.classList.add('active');
    document.getElementById('panel-' + id)?.classList.add('active');
    if (!(window as any)['_init_' + id]) {
      (window as any)['_init_' + id] = true;
      initReader(id);
    }
  };

  return (
    <>
      {/* NAV */}
      <nav ref={navRef} id="nav">
        <div className="nav-logo">un<span>mentioned</span></div>
        <div className="nav-actions">
          <a href="/sign-in" className="nav-btn-signin">Sign In</a>
          <a href="/sign-up" className="nav-btn-signup">Sign Up →</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg-line" style={{ left: '20%' }}></div>
        <div className="hero-bg-line" style={{ left: '80%' }}></div>
        <div className="hero-badge"><span className="hero-badge-dot"></span>TRY DAY 1 — FREE. NO SIGNUP NEEDED.</div>
        <p className="hero-eyebrow">THE READING PROBLEM IS SOLVED</p>
        <h1 className="hero-h1">You buy the book.<br /><em>You never finish it.</em></h1>
        <p className="hero-h1-sub">Or worse — you finish it and forget everything.</p>
        <p className="hero-sub">unmentioned turns any self-help book into a structured 7-day digest — with daily reflections, commitments, and follow-ups that make the knowledge actually stick.</p>
        <div className="hero-cta-row">
          <a href="/sign-in" className="btn-primary">Sign In →</a>
          <button className="btn-secondary" onClick={scrollToDemo}>Try Day 1 Free →</button>
        </div>
        <p className="hero-proof">NO SIGNUP NEEDED · EXPERIENCE DAY 1 OF ANY BOOK NOW</p>
      </section>

      {/* MARQUEE */}
      <div className="coming-strip">
        <div className="strip-track">
          <span className="strip-item">7-DAY BOOK DIGESTS <span className="dot"></span></span>
          <span className="strip-item">REFLECTION AFTER EVERY CONCEPT <span className="dot"></span></span>
          <span className="strip-item">AI-POWERED FOLLOW-UPS <span className="dot"></span></span>
          <span className="strip-item">DAILY COMMITMENTS <span className="dot"></span></span>
          <span className="strip-item">PERSONAL INSIGHTS VAULT <span className="dot"></span></span>
          <span className="strip-item">1 BOOK FREE · NO CARD NEEDED <span className="dot"></span></span>
          <span className="strip-item">7-DAY BOOK DIGESTS <span className="dot"></span></span>
          <span className="strip-item">REFLECTION AFTER EVERY CONCEPT <span className="dot"></span></span>
          <span className="strip-item">AI-POWERED FOLLOW-UPS <span className="dot"></span></span>
          <span className="strip-item">DAILY COMMITMENTS <span className="dot"></span></span>
          <span className="strip-item">PERSONAL INSIGHTS VAULT <span className="dot"></span></span>
          <span className="strip-item">1 BOOK FREE · NO CARD NEEDED <span className="dot"></span></span>
        </div>
      </div>

      {/* PAIN */}
      <section className="pain">
        <div className="pain-inner">
          <p className="pain-label">SOUND FAMILIAR?</p>
          <div className="pain-grid">
            <div className="pain-item reveal"><span className="pain-num">01</span><div><p className="pain-q">&quot;I bought 12 books last year. Read maybe 2.&quot;</p><p className="pain-a">The intention is always there. The follow-through rarely is. The book sits on your shelf as a monument to who you were going to become.</p></div></div>
            <div className="pain-item reveal"><span className="pain-num">02</span><div><p className="pain-q">&quot;I finished Atomic Habits. I still have no habits.&quot;</p><p className="pain-a">Reading is the easy part. The book tells you what to do — but nobody helps you actually do it. You close the book and life resumes as normal.</p></div></div>
            <div className="pain-item reveal"><span className="pain-num">03</span><div><p className="pain-q">&quot;I highlighted everything. I remember nothing.&quot;</p><p className="pain-a">300 pages of wisdom condensed into a Kindle full of yellow lines you&apos;ll never revisit. The knowledge evaporates within days.</p></div></div>
            <div className="pain-item reveal"><span className="pain-num">04</span><div><p className="pain-q">&quot;I don&apos;t have 6 hours to read a business book.&quot;</p><p className="pain-a">You&apos;re not lazy. You&apos;re busy. Between work, life, and everything else — reading 350 pages cover to cover is a luxury most people can&apos;t afford.</p></div></div>
          </div>
          <div className="pain-statement reveal"><p className="pain-statement-text">The self-help industry is worth <strong>$15 billion.</strong> Most of it sits unread on shelves. The problem was never the books — it was the format.</p></div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how" id="how">
        <p className="section-label reveal">HOW IT WORKS</p>
        <h2 className="section-title reveal">Three steps. <em>Seven days.</em> Actually applied.</h2>
        <div className="steps reveal">
          <div className="step"><span className="step-tag">STEP 01</span><div className="step-num">1</div><h3 className="step-title">Pick a book</h3><p className="step-body">Choose from our curated library of the most impactful self-help and productivity books — pre-processed and ready instantly. No upload needed to get started.</p></div>
          <div className="step"><span className="step-tag">STEP 02</span><div className="step-num">2</div><h3 className="step-title">Read, reflect, commit</h3><p className="step-body">Each day covers the core concepts with reflections after every idea, 3 personal commitments at the end, and a summary card you can screenshot and keep.</p></div>
          <div className="step"><span className="step-tag">STEP 03</span><div className="step-num">3</div><h3 className="step-title">Apply it. Live it.</h3><p className="step-body">We follow up every 2–3 days to check in on your commitments. The AI remembers what you wrote and pushes you gently further each time. Knowledge becomes behavior.</p></div>
        </div>
      </section>

      {/* DEMO SECTION */}
      <section className="demo-section" id="demo">
        <div className="demo-inner">
          <div className="demo-header reveal">
            <p className="demo-label">TRY IT NOW — NO SIGNUP NEEDED</p>
            <h2 className="demo-title">Experience <em>Day 1</em> of any book.</h2>
            <p className="demo-subtitle">Read the core ideas. Reflect after each one. Make 3 commitments. Get your personal summary card.</p>
          </div>

          <div className="book-selector reveal">
            <button className="book-btn active" onClick={() => selectBook('laws')} id="btn-laws">
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#C9954A', display: 'block' }}></span>
              <span className="book-btn-title">48 Laws of Power</span>
              <span className="book-btn-author">ROBERT GREENE</span>
            </button>
            <button className="book-btn" onClick={() => selectBook('atomic')} id="btn-atomic">
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ADE80', display: 'block' }}></span>
              <span className="book-btn-title">Atomic Habits</span>
              <span className="book-btn-author">JAMES CLEAR</span>
            </button>
            <button className="book-btn" onClick={() => selectBook('zero')} id="btn-zero">
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#60A5FA', display: 'block' }}></span>
              <span className="book-btn-title">Zero to One</span>
              <span className="book-btn-author">PETER THIEL</span>
            </button>
          </div>

          <div className="reader-container reveal">
            <div id="panel-laws" className="reader-panel active"></div>
            <div id="panel-atomic" className="reader-panel"></div>
            <div id="panel-zero" className="reader-panel"></div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <p className="section-label reveal">WHAT MAKES IT DIFFERENT</p>
        <h2 className="section-title reveal">Built for the way <em>humans</em> actually learn.</h2>
        <div className="features-grid reveal">
          <div className="feat-card"><div className="feat-emoji">🧠</div><h3 className="feat-title">Reflect after every idea</h3><p className="feat-body">Every concept ends with one reflection question that connects the idea to your real life — not a generic prompt, but something specific to what you just read.</p><span className="feat-tag">THE DIFFERENCE MAKER</span></div>
          <div className="feat-card"><div className="feat-emoji">✍️</div><h3 className="feat-title">3 commitments per day</h3><p className="feat-body">At the end of each day, you write 3 specific actions you&apos;re committing to. Obvious, fast to answer, and tied directly to the day&apos;s lessons — not abstract journaling.</p><span className="feat-tag">BEHAVIOR CHANGE</span></div>
          <div className="feat-card"><div className="feat-emoji">🔁</div><h3 className="feat-title">AI follows up with you</h3><p className="feat-body">Every 2–3 days, we check in. &quot;Did you do the 2-minute habit? No? Let&apos;s try 1 minute.&quot; The AI remembers your commitments and builds on them each time.</p><span className="feat-tag">THE JOURNEY ENGINE</span></div>
          <div className="feat-card"><div className="feat-emoji">📸</div><h3 className="feat-title">Screenshot-worthy summary</h3><p className="feat-body">Every day ends with a personal summary card showing your reflections, commitments, and insights — beautifully designed and built to be shared.</p><span className="feat-tag">SHAREABLE</span></div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta">
        <div className="final-cta-inner reveal">
          <p className="final-cta-label">START READING DIFFERENTLY</p>
          <h2 className="final-cta-title">The next book you read deserves to actually <em>change you.</em></h2>
          <p className="final-cta-sub">Day 1 is free — no card, no signup required. Create an account to unlock all 7 days and access more books every month.</p>
          <div className="final-btn-row">
            <a href="/sign-up" className="final-btn-primary">Get Started Free →</a>
            <button className="final-btn-secondary" onClick={scrollToDemo}>Try Day 1 First →</button>
          </div>
          <p className="final-cta-micro">1 BOOK FREE · NO CREDIT CARD · CANCEL ANYTIME</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">un<span>mentioned</span></div>
        <p className="footer-right">© 2025 unmentioned · Built for readers who mean it</p>
      </footer>
    </>
  );
}
