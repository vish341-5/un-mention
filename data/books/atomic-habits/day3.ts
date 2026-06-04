import type { Day } from "@/types/book";

const day3: Day = {
  day: 3,
  title: "The Architecture of Change",
  cards: [
    {
      type: "cover",
      title: "The Architecture of Change",
      subtitle: "Chapters 7–9 of Atomic Habits",
      author: "James Clear",
    },
    {
      type: "lesson",
      chapterRef: "Chapter 7",
      title: "The Secret to Self-Control",
      quote: "The people with the best self-control are the ones who need to use it the least.",
      insights: [
        "Chapter 7 reveals that self-control is not an infinite resource; it is a limited response to temptation. Clear argues that the strongest way to maintain good habits is not to fight temptation constantly, but to reduce the number of temptations you face. When you design your environment to avoid the wrong cues, you preserve your energy for the decisions that matter most.",
        "The psychology behind self-control is that it is easier to prevent a bad habit from starting than to stop it once it is in motion. Your brain will always feel the pull of the more immediate reward, so the sensible move is to change the conditions of the choice. The fewer temptations in the room, the less willpower you need.",
        "Most people get this wrong by thinking they should be able to resist anything. They rely on their willpower muscle and punish themselves when they fail. Clear shows that this is a losing strategy, because willpower fluctuates and the modern environment is full of easy traps.",
        "When you understand self-control properly, you begin to manage your environment instead of your impulses. You set up systems that make the wrong options harder and the right options easier. That is how habits become sustainable over time.",
      ],
      stories: [
        "Clear tells the story of a woman who kept junk food out of her house rather than trying to resist it at the moment of craving. When the temptation was removed, she did not need to practice heroics; she simply chose the food that was available. The result was a steady decline in unhealthy snacking and a habit of preparing nourishing meals. This story proves that the easiest way to win self-control battles is to never have them in the first place.",
        "Another example is a man who stopped checking his phone during work by leaving it in another room. He did not force himself to ignore notifications; he eliminated the temptation from his workspace. Over weeks, his focus improved and the habit of deep work became easier. It proves that avoidance is not avoidance of responsibility, but a practical design choice for better behavior.",
      ],
      applications: [
        "Identify one temptation that consistently derails you and remove it from your immediate environment. If social media distracts you at lunch, install a website blocker or keep your phone in another room.",
        "If you cannot remove the temptation completely, make it harder to reach. Put unhealthy snacks on a high shelf and keep healthier alternatives within arm’s reach. This makes the better choice more likely.",
        "Create a habit contract with yourself for one tempting behavior. Commit to a rule such as ‘No phone until I finish one focused task’ and place a reminder where you can see it. The act of writing the rule helps you avoid reliance on willpower.",
      ],
      reflection: "Which repeated temptation can you remove today so you do not have to rely on self-control?",
    },
    {
      type: "lesson",
      chapterRef: "Chapter 8",
      title: "How to Make a Habit Irresistible",
      quote: "What is immediately rewarded is repeated. What is immediately punished is avoided.",
      insights: [
        "Chapter 8 explores the second law of behavior change: make it attractive. Clear explains that habits are more likely to stick when they are paired with something you want. The brain is wired to pursue pleasure and avoid pain, so an attractive habit feels worth doing in the moment.",
        "The psychology behind this is that cravings drive habits. When the cue triggers a desire, the behavior is more likely to happen. Clear teaches you to make habits attractive by bundling them with something enjoyable or by reframing the action as part of a desirable identity.",
        "Most people get this wrong by thinking good habits must feel unpleasant. They treat discipline as punishment and then wonder why they fail. Clear shows that if you make the habit attractive, it stops feeling like a chore and starts feeling like a choice worth making.",
        "When you understand how to make habits attractive, you stop asking yourself whether you feel like doing it and instead ask what makes the behavior appealing. You design the habit so that the brain wants it, not just tolerates it.",
      ],
      stories: [
        "Clear shares the story of temptation bundling, where a man only listened to his favorite podcast while running. By pairing the workout with something he enjoyed, the run became attractive instead of something to dread. As a result, he started running more consistently and looked forward to the activity. This story proves that you can make good habits irresistible by linking them to a reward.",
        "Another example comes from a team that turned a boring review process into a social ritual. They paired weekly planning with donuts and a short celebration, which made the task feel more attractive and less like work. The outcome was higher participation and more consistent execution. It proves that people will do the habits they find appealing, even if the underlying task is the same.",
      ],
      applications: [
        "Pair a habit you want with something you already enjoy. If you want to stretch more, only watch your favorite show while you do it. That makes the habit attractive by design.",
        "Reframe the habit as part of a positive identity. Instead of saying ‘I have to floss,’ say ‘I am someone who takes care of my teeth.’ That mental shift makes the behavior more appealing.",
        "Add a small reward after the habit so it feels satisfying. If you complete a work session, take five minutes to step outside or enjoy a cup of tea. The immediate payoff reinforces the attraction.",
      ],
      reflection: "What small reward can you attach to a habit to make it feel more irresistible?",
    },
    {
      type: "lesson",
      chapterRef: "Chapter 9",
      title: "The Role of Family and Friends in Shaping Your Habits",
      quote: "We tend to imitate the habits of three social groups: the close, the many, and the powerful.",
      insights: [
        "Chapter 9 explains that our habits are not formed in a vacuum; they are shaped by the people around us. Clear identifies three groups that influence us: the close (family and friends), the many (society at large), and the powerful (role models). Each group sends cues that help define what behavior is normal.",
        "The psychology behind this is social proof: humans are wired to do what others do. When a habit is shared or visible within your network, it becomes easier to adopt because it feels like the expected thing to do. This is why culture is a powerful habit engine.",
        "Most people get this wrong by trying to change habits in isolation. They believe they can simply decide differently, even when their social environment still rewards the old behavior. Clear shows that if you want to change, you must understand and adapt the social cues that surround you.",
        "When you understand the social dimension of habits, you choose your environment and your tribe more carefully. You seek out people who embody the habits you want and allow their behavior to influence your own. That makes the change feel more natural and sustainable.",
      ],
      stories: [
        "Clear tells the story of a man who became healthy after marrying someone with good habits. He did not need more discipline; he needed a different social environment. His partner’s routine of cooking nutritious meals and exercising regularly became the new normal, and he gradually adopted the same habits. The result was lasting behavior change supported by the people closest to him. It proves that you become the average of the habits around you.",
        "Another example is a company where employees were more likely to take the stairs when their coworkers did. The visible behavior of others created a social proof cue that made stair climbing feel normal. As a result, more people chose the healthier option without being told. It proves that the habits of your tribe shape what you consider normal.",
      ],
      applications: [
        "Identify one person whose habits you admire and observe what cues support their behavior. Then add one similar cue to your own environment.",
        "If possible, join a group that already practices the habit you want. A running club, study group, or accountability partner gives your habit a social anchor.",
        "Make your good habit visible to others. Share your progress with a friend or keep your tools out in the open so your social circle can reinforce the behavior.",
      ],
      reflection: "Who in your life models the habit you want, and how can you get closer to their environment?",
    },
    {
      type: "lesson",
      chapterRef: "Core Concept",
      title: "Temptation Bundling and Social Proof",
      quote: "We are more likely to embrace habits when they are attractive and when our group does them too.",
      insights: [
        "Temptation bundling combines the second and third laws of behavior change by pairing an action you should do with something you want to do. Clear shows that this makes the habit more attractive and creates a social incentive for consistency. When the habit is both attractive and socially supported, it is far easier to repeat.",
        "The psychology is simple: your brain will pursue associated rewards more willingly, and your social network provides a sense of belonging that reinforces the behavior. The combination of desire and peer influence is a powerful habit starter.",
        "Most people get this wrong by expecting motivation alone to sustain them. They either try to rely on self-control or they ignore the influence of others. Clear demonstrates that the strongest habits are built when you engineer both attraction and social alignment.",
        "When you understand temptation bundling and social proof, you can design habits that feel good and normal. You stop fighting your natural tendencies and instead work with them. That is how long-term habits become part of your identity and your tribe.",
      ],
      stories: [
        "Clear describes a woman who only allowed herself to watch her favorite show while exercising on the treadmill. She made the workout attractive by pairing it with a reward she already wanted. Over time, she began to associate the treadmill with pleasure instead of obligation, and she exercised more often. The result was a healthier habit supported by a simple behavioral design. It proves that attractive habits are easier to maintain.",
        "Another story involves a group of coworkers who turned a daily planning ritual into a social habit. They met for ten minutes each morning to set priorities and celebrate progress, which made the habit feel like a team activity instead of a chore. As more people joined, the behavior became part of the office culture. It proves that social proof can transform individual effort into a shared routine.",
      ],
      applications: [
        "Pair a habit you want to build with something you already enjoy and make it a non-negotiable part of the routine. If you love a particular song, only listen to it while you walk.",
        "Invite a friend to join you in a habit so you can use social momentum to support your consistency. A shared habit becomes easier because you do it together.",
        "Create a public commitment for one habit element. Tell someone you will do it, and let the social expectation help keep you on track.",
      ],
      reflection: "What enjoyable element can you bundle with a new habit to make it feel worth doing?",
    },
    {
      type: "summary",
      title: "Day 3 Summary",
      points: [
        "The best self-control is the self-control you do not need.",
        "Make habits attractive by pairing them with something you want.",
        "Your tribe’s habits shape what you consider normal.",
        "Temptation bundling turns good behavior into something you look forward to.",
        "Design habits with social support to make them stick.",
      ],
    },
    {
      type: "action",
      tag: "CONCEPT 1 + 3",
      question: "What temptation can you remove or relocate today so your willpower does not have to decide?",
      placeholder: "I will put my phone in another room while I work so I do not give in to distractions.",
      hint: "Removing the temptation is often more effective than trying to resist it.",
    },
    {
      type: "action",
      tag: "CONCEPT 2",
      question: "What reward can you pair with a habit to make it feel more attractive?",
      placeholder: "I will listen to my favorite podcast only while I walk for ten minutes.",
      hint: "A habit feels easier when it is linked to something you enjoy.",
    },
    {
      type: "action",
      tag: "CONCEPT 3 + 5",
      question: "Who can you involve today to make the habit you want more socially supported?",
      placeholder: "I will invite a friend to join me for a weekly study session.",
      hint: "Habits become more likely when your social circle expects them.",
    },
    {
      type: "review",
      title: "Your Day 3 Commitments",
      points: [
        "Remove one temptation so you do not need to rely on willpower.",
        "Pair a habit with a reward that makes it attractive.",
        "Invite someone into the habit to gain social support.",
      ],
    },
  ],
};

export default day3;
