import type { Day } from "@/types/book";

const day4: Day = {
  day: 4,
  title: "Zero to One: Systems and Culture",
  cards: [
    {
      type: "cover",
      title: "Zero to One: Systems and Culture",
      subtitle: "Chapter 7-8 highlights from Zero to One",
      author: "Peter Thiel",
    },
    {
      type: "lesson",
      chapterRef: "Chapter 7",
      title: "Follow the Money",
      quote: "Start with the economics and work backward from there.",
      insights: [
        "Chapter 7 emphasizes that a strong business model is essential. Great ideas alone are not enough unless the economics work and can be sustained over time.",
        "Thiel explains that founders should understand where revenue comes from, how costs behave, and what kind of returns the business can generate before they scale.",
        "The lesson highlights that great strategy is based on real financial logic, not just optimistic assumptions about growth.",
        "This means designing a company where the product, pricing, and distribution align with a healthy margin structure.",
      ],
      stories: [
        "He describes companies that failed because they had attractive demand but weak underlying economics. Those businesses could not sustain their growth because they were losing money on each customer.",
        "He also points to companies that built strong models from the start, allowing them to reinvest profitably and avoid the trap of chasing growth at any cost.",
      ],
      applications: [
        "Identify the key economics of your business and test whether they are strong enough to support your planned growth.",
        "Choose one revenue or cost assumption to validate this week so you can make more informed decisions.",
        "Reframe a product decision in terms of how it affects your unit economics, not just customer interest.",
      ],
      reflection: "What part of your business model still feels like a guess rather than a tested assumption?",
    },
    {
      type: "lesson",
      chapterRef: "Chapter 7",
      title: "Build a Team Around the Right Model",
      quote: "A company is not a collection of talented individuals; it is a team built around a shared way of working.",
      insights: [
        "Chapter 7 points out that culture and team structure should reflect the company’s core strategy. The right people in the right roles create a self-reinforcing system.",
        "Thiel argues that strong teams are not just about hiring stars; they are about assembling people who share the same vision and work effectively together.",
        "The lesson highlights that early team choices shape the company's future identity and ability to execute.",
        "This means being deliberate about who you bring in, how roles are defined, and how decisions are made.",
      ],
      stories: [
        "He tells stories of startups that hired great individuals but failed to align them around a coherent mission, which led to confusion and friction.",
        "He contrasts that with companies that built tightly aligned teams from the beginning, allowing them to move faster and avoid costly disagreements.",
      ],
      applications: [
        "Clarify the one model your team should execute against, and use it to evaluate new hires and roles.",
        "Choose one team practice to strengthen shared understanding, such as a weekly plan review or a clear decision-making process.",
        "Make one hiring or role change that reduces ambiguity and increases focus.",
      ],
      reflection: "What one team or structure choice can better align your company with its business model?",
    },
    {
      type: "lesson",
      chapterRef: "Chapter 7",
      title: "Design Systems That Scale",
      quote: "Systems turn repeated work into predictable results.",
      insights: [
        "Thiel explains that systems are the engines that let a company do more with less work. They turn good ideas into repeatable operations.",
        "The lesson emphasizes that scaling is not just more people or more marketing; it is better structure and clearer processes.",
        "A strong system reduces the risk of failure as the company grows, because it captures what works and makes it easier to teach others.",
        "This means investing early in the routines, handoffs, and standards that will preserve quality when your team gets larger.",
      ],
      stories: [
        "He shares examples of businesses that struggled to scale because they relied too much on individual heroics rather than documented systems.",
        "He also describes companies that were able to grow smoothly because they had simple, scalable processes in place from the beginning.",
      ],
      applications: [
        "Identify one repeatable activity in your business and document a simple process for it.",
        "Choose one handoff or workflow that causes confusion and make it clearer.",
        "Test one small system change that reduces friction for your team.",
      ],
      reflection: "Which repeatable process should be systematized now before it becomes a bottleneck?",
    },
    {
      type: "lesson",
      chapterRef: "Chapter 8",
      title: "Protect Your Secret with Culture",
      quote: "Culture is the way a company protects what makes it special.",
      insights: [
        "Chapter 8 shows that culture is not just a feel-good concept; it is the mechanism that preserves a company's unique approach and values.",
        "Thiel argues that the right culture helps a team move in the same direction and protects the hidden advantages that give the business its edge.",
        "This lesson highlights that culture is most powerful when it is tied to a concrete mission and the behaviors that support it.",
        "A strong culture makes it easier for new people to understand what matters and why certain decisions are made.",
      ],
      stories: [
        "He describes companies whose culture helped them maintain clarity and avoid the drift that can destroy early advantages.",
        "He also warns against cultural myths that are too vague to guide action; the best cultures are specific, observable, and rooted in the company’s purpose.",
      ],
      applications: [
        "List the three values that should guide your team’s daily work, and make sure they are easy to understand.",
        "Choose one example of behavior you want to reinforce and reward it publicly.",
        "Ask whether your current culture helps preserve your company’s core advantage or whether it allows drift.",
      ],
      reflection: "What aspect of your culture most protects the unique way your company works?",
    },
    {
      type: "lesson",
      chapterRef: "Chapter 8",
      title: "Grow Through Shared Beliefs",
      quote: "A company grows faster when everyone understands why it exists.",
      insights: [
        "Thiel explains that shared beliefs help teams coordinate without constant oversight. When people understand the mission, they make better decisions on their own.",
        "The lesson emphasizes that culture and strategy should be aligned, so the beliefs you share are directly tied to the business you are building.",
        "Companies with shared beliefs can move faster because they have a common language for priorities and tradeoffs.",
        "This means creating clarity around what the company stands for and what kind of work is worth doing.",
      ],
      stories: [
        "He describes teams that were able to operate autonomously because they shared a clear sense of purpose and the right way to solve problems.",
        "He contrasts that with organizations where individuals were smart but misaligned, causing wasted effort and unnecessary conflict.",
      ],
      applications: [
        "Write one short statement that captures the shared belief your team should hold.",
        "Share that statement with your team and ask for examples of how it should influence daily choices.",
        "Make one decision using the shared belief as the primary guide.",
      ],
      reflection: "What belief should your team share so they make aligned decisions without being told?",
    },
    {
      type: "summary",
      title: "Day 4 Highlights",
      points: [
        "Strong growth starts with economics, not just bright ideas.",
        "The right team and model make your secret scalable.",
        "Systems turn repeated work into predictable outcomes.",
        "Culture protects your unique advantage as you grow.",
        "Shared beliefs help teams move fast with less coordination.",
      ],
    },
    {
      type: "action",
      tag: "LESSON 1 + 4",
      question: "What part of your business model needs stronger economics before you scale?",
      hint: "Healthy growth depends on understanding the money behind the idea.",
    },
    {
      type: "action",
      tag: "LESSON 2 + 5",
      question: "Which belief should your team share to make better decisions faster?",
      hint: "The right belief helps everyone move in the same direction without extra meetings.",
    },
    {
      type: "action",
      tag: "LESSON 3 + 5",
      question: "What one system should you document or improve today?",
      hint: "Clear systems reduce bottlenecks as your company grows.",
    },
    {
      type: "review",
      title: "Your Day 4 Commitments",
      points: [
        "Strengthen one part of your business model.",
        "Clarify one shared belief for the team.",
        "Improve one scalable system or process.",
      ],
    },
  ],
};

export default day4;
