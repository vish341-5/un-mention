import type { Day } from "@/types/book";

const day6: Day = {
  day: 6,
  title: "The Architecture of Change",
  cards: [
    {
      type: "cover",
      title: "The Architecture of Change",
      subtitle: "Chapters 16–18 of Atomic Habits",
      author: "James Clear",
    },
    {
      type: "lesson",
      chapterRef: "Chapter 16",
      title: "How to Stick with Good Habits Every Day",
      quote: "The secret to getting results that last is to never stop picking up the phone when it rings.",
      insights: [
        "Chapter 16 explains that the key to long-term habit maintenance is consistency, not perfection. Clear writes that the most important thing is to keep showing up, even when the behavior is not perfect. This attitude keeps the system alive and allows small actions to accumulate.",
        "The psychology behind sticking with habits is that repetition strengthens the automaticity of the behavior. A skipped day creates a crack in the routine, so the safer choice is to do something, even if it is small. The brain retains the pattern better when it is reinforced regularly.",
        "Most people get this wrong by believing that one missed day means failure. They use it as an excuse to stop entirely. Clear shows that the more helpful response is to simply restart and preserve the habit chain.",
        "When you understand this properly, you stop chasing perfection and instead value persistence. You recognize that the momentum of regular action matters more than the quality of any single session. That makes it easier to stay committed over months and years.",
      ],
      stories: [
        "Clear uses the story of a writer who kept the habit alive by writing even when the words felt poor. She did not wait for inspiration; she wrote consistently. Over time, the habit of writing every day became stronger than the desire to make every page perfect. The result was a body of work produced through persistence, not perfection. It proves that habit consistency is the foundation of long-term progress.",
        "Another example comes from an athlete who made it his goal simply to take one walk every day during recovery. Even when the weather was bad, he completed the walk. The habit remained intact because he had committed to showing up daily, not to a particular distance or pace. The result was a consistent routine that supported his rehabilitation. It proves that sticking with the habit matters more than the details.",
      ],
      applications: [
        "Choose one habit you can do every day, even when you are tired, and commit to that minimum. If you cannot do your full practice, do the smallest possible version.",
        "Set a simple rule to keep the streak going, such as ‘Do something for five minutes’ whenever you would otherwise skip the habit.",
        "Place a visible tracker where you can see it daily so you are reminded to continue the habit. The streak becomes its own motivation.",
      ],
      reflection: "What one tiny action could you do today to keep your habit chain unbroken?",
    },
    {
      type: "lesson",
      chapterRef: "Chapter 17",
      title: "How an Accountability Partner Can Change Everything",
      quote: "Accountability is the oxygen that keeps a goal alive.",
      insights: [
        "Chapter 17 shows that an accountability partner can dramatically increase your odds of maintaining a habit. Clear explains that when someone else is watching and expecting you to follow through, the behavior becomes more real. Accountability turns private actions into public commitments.",
        "The psychology behind this is that humans dislike letting others down and seek social acceptance. Knowing that someone will check on your progress adds a layer of motivation and makes it harder to rationalize skipping the habit. This creates an extra source of pressure that supports consistency.",
        "Most people get this wrong by trying to go it alone. They assume habits are personal, when in reality habit formation is often social. Clear argues that accountability partners help you stay honest and provide encouragement when the habit feels difficult.",
        "When you understand this, you look for ways to share your progress and invite support. You choose someone you trust and commit to reporting back. That social agreement makes the habit more robust.",
      ],
      stories: [
        "Clear tells the story of coworkers who used a daily check-in to keep each other accountable. Each morning they shared one thing they would accomplish and one thing they had completed the day before. The simple act of accountability improved their follow-through and created momentum. The result was more consistent performance across the team. It proves that support and social pressure can make habits stick.",
        "Another example is a pair of friends who agreed to text each other after their evening workout. The expectation of reporting back made both of them more likely to exercise. When one skipped, the other would notice and offer encouragement. The result was a habit supported by a small circle of accountability. It proves that the right partner can change the odds dramatically.",
      ],
      applications: [
        "Choose one person to share your habit goal with and ask them to check in regularly. A simple weekly message can keep you honest.",
        "Make your progress visible to someone else by sending a screenshot, a photo, or a quick note after completing the habit.",
        "If you do not have a partner, join an online group or habit community that holds you accountable through shared reporting.",
      ],
      reflection: "Who can you invite to hold you accountable for the habit you are trying to build?",
    },
    {
      type: "lesson",
      chapterRef: "Chapter 18",
      title: "The Truth About Talent (When Genes Matter and When They Don’t)",
      quote: "Genes do not determine your destiny, but they do influence the habits you are likely to enjoy.",
      insights: [
        "Chapter 18 explores how talent and genetics matter for habits, but only in certain contexts. Clear argues that while some people have natural advantages in specific areas, most of what matters is the habits they build. The key is to choose habits that suit your strengths and interests.",
        "The psychology behind this is that people are more likely to stick with habits that feel aligned with their natural tendencies. When you try to force a habit that clashes with your strengths, it feels harder to maintain. Clear encourages you to find the intersection of what you want and what comes easily.",
        "Most people get this wrong by either blaming genetics for their lack of progress or trying to imitate someone else’s path. They fail to recognize that the most sustainable habits are the ones that fit them. Clear shows that success is rarely about raw talent; it is more often about choosing the right habits and practicing them consistently.",
        "When you understand this, you stop comparing yourself to others and start designing habits for yourself. You choose systems that leverage your unique abilities, which makes the behavior more satisfying and more likely to last.",
      ],
      stories: [
        "Clear uses the example of athletes who succeed by choosing sports that fit their body type and preferences. Some athletes thrive in endurance events, while others excel in explosive power sports. The result is that when they align their habits with their strengths, they can train consistently and improve. It proves that talent matters only when you build the right system around it.",
        "Another story is about a musician who recognized that she enjoyed the act of practice more than the idea of performing. She focused her habits on daily practice and improvement rather than external validation. The result was steady growth and less burnout. It proves that the most sustainable habits are those that feel naturally enjoyable for you.",
      ],
      applications: [
        "Reflect on one habit that feels more natural than others and give it more space in your routine. Build your system around what you enjoy.",
        "Avoid forcing habits that clash with your strengths. If you hate running, choose a movement habit you are more likely to enjoy.",
        "Use your talents as input, not as an excuse. Choose habits that suit your abilities, and then focus on consistency.",
      ],
      reflection: "Which habit would feel more sustainable if you aligned it with your natural strengths?",
    },
    {
      type: "lesson",
      chapterRef: "Core Concept",
      title: "Resilience Through Routine",
      quote: "The difference between success and failure is often just a single day of continuing.",
      insights: [
        "Resilience in habits comes from a system that keeps you moving even when motivation is low. Clear teaches that the goal is not to feel strong every day, but to keep the habit alive. This mindset turns habits into reliable routines rather than heroic feats.",
        "The psychology is that repeated action builds momentum, and momentum helps habits survive setbacks. When you expect some days to be harder than others, you build a routine that can weather those dips. That is what makes the habit resilient.",
        "Most people get this wrong by treating the habit as a performance metric. They celebrate perfect days and punish imperfect ones. Clear encourages you to aim for endurance instead: can the behavior continue tomorrow? This is a more sustainable metric.",
        "When you understand resilience through routine, you design your habits to survive lousy days. You choose minimums, build accountability, and accept that imperfect actions are still progress. That is how habits become a part of your life.",
      ],
      stories: [
        "Clear describes a habit keeper who always wrote at least one sentence, even when the words were bad. The habit survived because the minimum was so low that it could not be avoided. The result was a much stronger routine than one based on writing only when inspiration struck. It proves that resilience comes from consistency, not perfection.",
        "Another story is of a musician who turned practice into a daily routine rather than a performance. On tired days she still played something simple, and on good days she pushed harder. The result was steady progress and a habit that never broke. It proves that a resilient system is the key to long-term success.",
      ],
      applications: [
        "Set a habit minimum that you can do on your worst day and commit to it. The goal is to stay in the game.",
        "Build a simple ritual around the habit start so it is easy to continue even when you are not motivated.",
        "Keep a visible streak or progress tracker to remind yourself that continuing matters more than perfect execution.",
      ],
      reflection: "What is the smallest version of your habit that you can do even when you do not feel like it?",
    },
    {
      type: "summary",
      title: "Day 6 Summary",
      points: [
        "Consistency matters more than perfection for habits that last.",
        "Accountability makes good habits harder to abandon.",
        "Choose habits that fit your strengths, not someone else’s path.",
        "A resilient system keeps you moving on difficult days.",
        "Small daily actions accumulate into lasting progress.",
      ],
    },
    {
      type: "action",
      tag: "CONCEPT 1",
      question: "What tiny action will you do today to keep your habit going even if you feel off?",
      placeholder: "I will write one sentence tonight to maintain my writing streak.",
      hint: "Maintaining the habit is more important than doing it perfectly every time.",
    },
    {
      type: "action",
      tag: "CONCEPT 2",
      question: "Who will you ask to hold you accountable for one habit this week?",
      placeholder: "I will text a friend after my workout so they know I completed it.",
      hint: "Accountability adds a social layer that helps you follow through.",
    },
    {
      type: "action",
      tag: "CONCEPT 3",
      question: "How can you make a habit feel more natural by aligning it with your strengths?",
      placeholder: "I will choose a walking habit instead of running because I enjoy moving outdoors.",
      hint: "Habits that suit your preferences are easier to sustain.",
    },
    {
      type: "review",
      title: "Your Day 6 Commitments",
      points: [
        "Do a tiny version of the habit to keep the chain alive.",
        "Invite someone to check in on your progress.",
        "Choose a habit that fits your natural strengths.",
      ],
    },
  ],
};

export default day6;
