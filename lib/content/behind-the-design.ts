export type DesignStorySection = {
  heading: string;
  body: string[];
  list?: string[];
};

export type DesignStory = {
  slug: string;
  title: string;
  scriptureRef: string;
  summary: string;
  meaning: string;
  symbolism: string;
  sections?: DesignStorySection[];
  heroImage?: string;
  productSlug?: string;
};

export const DESIGN_STORIES: DesignStory[] = [
  {
    slug: "trust-god",
    title: "Trust GOD (When You Don't Have the Full Plan)",
    scriptureRef: "Proverbs 3:5-6",
    summary:
      "\"Trust GOD\" is simple on purpose, because when life gets complicated, you don't need a complicated message.",
    meaning:
      "Trust GOD is a daily decision to lean on His understanding instead of our own, especially in seasons that don't make sense yet.",
    symbolism:
      "Red-letter typography spells out a four-word mantra: Trust GOD, Don't doubt, HE is the Truth, Be obedient, with the many names of Christ woven into the surrounding text.",
    heroImage: "/products/trust-god.jpg",
    productSlug: "trust-god",
    sections: [
      {
        heading: "A simple message, on purpose",
        body: [
          "\"Trust GOD\" is simple on purpose. Because when life gets complicated, you don't need a complicated message. You need one you can actually hold onto in the moment things fall apart, not just in the moment you have time to think it through.",
        ],
      },
      {
        heading: "The inspiration",
        body: [
          "This design was born out of a challenge to read through the book of Proverbs one chapter a day for a year, matching each chapter to the day of the month. Every month the corresponding chapter was read again, and every month a new truth surfaced from the same words. Month after month, that repetition formed a mantra.",
          "On the shirt, that mantra is marked out in red: Trust GOD. Don't doubt. HE is the Truth. Be obedient.",
          "Each phrase answers a different moment. When life gets difficult and you don't know what to do, Trust GOD. When life tries to test your faith, Don't doubt. When life keeps warring against you, trying to build fear, remember HE is the Truth. And when the path you're walking gets hard, Be obedient.",
          "Look closer at the rest of the text and you'll find something else woven through it: the many titles and names of Christ Jesus and GOD, hidden in plain sight for anyone willing to look.",
        ],
      },
      {
        heading: "What are you searching for?",
        body: [
          "The back of the shirt carries its own layer, opening with a question: \"What Are You Searching For.\" It's arranged like the letters in a word search puzzle.",
          "Underneath it sits a line from Isaiah 65:1: \"I revealed myself to those who did not ask for me; I was found by those who did not seek me. To a nation that did not call on my name, I said, 'Here am I, here am I.'\"",
          "That verse does double duty. It mirrors exactly what an observer does when they scan the front of the shirt looking for the hidden names, and it answers the question posed on the back. Isaiah 65:1 tells us that GOD's love and grace reach out to all humanity, not just to those already seeking Him, and that salvation is initiated by GOD. It's an invitation to recognize His initiative in your own life, and then to extend that same grace to someone else.",
          "There's one more detail built to bring the verse to life: a subtle shift in font color on the front word search, matched to the color used in the words \"Here am I, here am I.\" Once you notice the change, every hidden word in the search suddenly stands out without effort: a small, physical echo of \"I was found by those who did not seek me.\" One final title for GOD is tucked into the search less obviously than the rest. It isn't hard to find. When you do, it should put a smile on your face.",
        ],
      },
      {
        heading: "Trust isn't passive",
        body: [
          "Trust GOD is a decision made before the outcome is known, not after. Wearing it is a small, daily rehearsal of that decision.",
        ],
        list: [
          "Choose obedience over anxiety.",
          "Choose consistency over hype.",
          "Choose faith over fear, daily.",
        ],
      },
    ],
  },
  {
    slug: "i-am-free",
    title: "I Am Free (Inspired by Resurrection Sunday and the Victory Over Sin)",
    scriptureRef: "Romans 7:25 · Galatians 5:1",
    summary:
      "Freedom through Christ: broken chains, a pierced hand, and the King on the cross, built around Resurrection Sunday and the victory over sin.",
    meaning:
      "I Am Free declares an identity, not a feeling: freedom purchased at the cross and proven at the empty tomb, that cannot be re-earned or lost.",
    symbolism:
      "Broken chains signal deliverance, a restrained hand marks the cost of that freedom, and the cross inscription names the King who paid it.",
    heroImage: "/products/i-am-free.jpg",
    productSlug: "i-am-free-front-back",
    sections: [
      {
        heading: "The meaning begins with Resurrection Sunday",
        body: [
          "Resurrection Sunday is not simply a date on the calendar or a tradition repeated each year. It's the day we remember the death, burial, and resurrection of Jesus Christ. It's the day we look again at the cross, the grave, and the empty tomb, and remember that Christ did not suffer without purpose. He died as a sacrifice for our sins. He was hung on a cross, pierced, and buried. Then, three days later, He got up. That truth is everything, and this design is built around it.",
          "Scripture teaches that sin separates people from GOD and holds them in bondage, not just describing bad behavior, but a condition of captivity that traps, deceives, accuses, and destroys. That's why the resurrection matters so much. If Jesus had died and stayed in the grave, the story would end in sorrow. But He rose. His resurrection proves death didn't have the final word, that sin's penalty was defeated, and that the believer's freedom rests on something stronger than feelings, effort, or personal strength.",
          "\"Thanks be to God, who delivers me through Jesus Christ our Lord.\" Those words from Romans 7:25 shaped the center of the design. They come after Paul describes a real struggle with sin and the frustration of knowing what's right while still feeling the pull of what's wrong, and his answer isn't self-praise. It's deliverance through Jesus Christ. That's the reason the design is called I Am Free.",
        ],
      },
      {
        heading: "Broken chains show what Christ has defeated",
        body: [
          "One of the main images in the design is a set of broken chains, once tethered to sin, now shattered. The Bible often speaks of sin as bondage: it promises pleasure, control, and satisfaction, but leads to captivity. It can become a master, shaping desires, habits, attitudes, and identity. Paul uses the language of slavery to describe the human struggle with sin because that imagery is honest.",
          "The broken chains represent the believer's rescue from the penalty and power of sin, not a suggestion that Christians never face temptation or struggle. Romans 7:25 makes clear the struggle is real. But the design points to a deeper truth: sin no longer owns the one who belongs to Christ. An unlocked chain suggests a captive found a way out; a broken chain points to freedom that came through rescue by a stronger power. The believer isn't freed by self-improvement or spiritual discipline alone. The believer is freed because Jesus conquered what held them.",
          "As the chains shatter in the design, the acts and nature of sin shatter with them, drawing on Galatians 5:19-21, where Paul lists works of the flesh: sinful actions and desires that reveal life apart from the Spirit of GOD. The point isn't to create shame. It's to show deliverance.",
        ],
        list: [
          "Patterns that once controlled the heart",
          "Desires that pulled the soul away from GOD",
          "Actions that brought guilt, separation, and a penalty",
          "Bondage that felt too strong to escape",
        ],
      },
      {
        heading: "Galatians 5 shows the bondage Christ frees us from",
        body: [
          "Galatians 5:19-21 gives a sharp contrast between the works of the flesh and the fruit of the Spirit, and that contrast guided the visual direction of the shirt. Paul doesn't list sin to make believers feel hopeless. He names it so it can be recognized for what it is. Sin loses power when it's brought into the light.",
          "Many believers understand the tension Paul describes: loving GOD, yet persuaded by the influence of sin; wanting to walk in holiness, yet feeling the weakness of the flesh pull the other way. Romans 7 gives language to that struggle, and Galatians 5 gives language to the life GOD calls His people into. The words I Am Free aren't meant to sound self-made or independent from GOD. They're a testimony: I have been rescued, and broken away from what once held me.",
        ],
      },
      {
        heading: "The restrained hand points to the cost of freedom",
        body: [
          "The back of the shirt carries another part of the design: a restrained hand about to be pierced by a sharp wooden stake. This image brings the viewer back to the physical suffering of the crucifixion. The freedom from the bondage of sin shown on the front came at a cost. The chains didn't break because sin was small. They broke because Christ gave Himself fully.",
          "A restrained hand speaks of submission, suffering, and sacrifice. Jesus didn't go to the cross because He lacked power. He willingly laid down His life. The image reminds us the gospel isn't abstract. It happened. It was real. The cross was a brutal public display meant to shame and punish, and Jesus endured it. He was pierced. He bled. He died. The design doesn't turn away from that reality.",
          "Every believer's freedom is tied to Christ's wounds. The same Jesus who was nailed to the cross is the Jesus who rose from the grave. His suffering wasn't the end of the story. It was the path He took to redeem His people. The design carries both pain and victory, without rushing past the cross to reach the resurrection.",
        ],
      },
      {
        heading: "The inscription points to the King on the cross",
        body: [
          "Another key detail is the inscription on the cross, which translates to \"Jesus of Nazareth, King of the Jews.\" In the crucifixion account, this inscription publicly identified Jesus; in Roman executions, such wording labeled the accused and communicated their charge. For Jesus, the title carried irony. It was meant as mockery, especially against Jewish hopes for a king, yet it declared a truth greater than the crowd understood. Jesus truly is King.",
          "People looked at Jesus on the cross and saw defeat. Some thought His claim to kingship had failed. But the resurrection revealed the King wasn't defeated. He was laying down His life, conquering sin and death through what looked like weakness. The inscription gives historical weight to the image and points to a specific Savior, Jesus of Nazareth, and a specific work: His death and resurrection for sinners.",
        ],
      },
      {
        heading: "The red words declare the source of deliverance",
        body: [
          "One of the final details is red lettering from Romans 7: GOD delivers through Christ. It's shown in red to draw attention to the heart of the message. Red connects naturally to blood, sacrifice, urgency, and redemption, helping the words stand apart from the surrounding imagery so the meaning is plain even before every detail is studied.",
          "The full thought comes from Paul's cry of gratitude: \"Thanks be to God, who delivers me through Jesus Christ our Lord.\" Who breaks the chains? GOD does. How does He deliver? Through Jesus Christ. What is the result? Freedom.",
          "The red words keep the design from being only symbolic. Broken chains could mean many things in different settings. Here they mean deliverance from sin through Christ. A pierced hand could be seen as suffering. Here it points to the saving work of Jesus. An inscription could be treated as a historical detail. Here it identifies the crucified King. Together, front and back work like a visual testimony: the broken chains show the result, the pierced hand shows the cost, the inscription names the King, and the red words declare the source.",
        ],
      },
      {
        heading: "The message of the design is freedom through Christ",
        body: [
          "I Am Free was created to reflect one central truth: believers are no longer bound by the penalty of sin because Jesus Christ died, was buried, and rose again. That freedom comes directly from the cross and the price Jesus paid on it. Resurrection Sunday reminds us the gospel is complete: Jesus didn't only die for our sins, He rose in victory; He didn't only expose bondage, He broke it; He didn't only call people to live differently, He made deliverance possible.",
          "\"I Am Free\" isn't just a phrase. It's a response to the resurrection: the believer looking at the cross, remembering an empty tomb, and saying with gratitude, Thanks be to GOD.",
        ],
      },
    ],
  },
  {
    slug: "love-is",
    title: "\"Love Is\" (Put Love Into Action)",
    scriptureRef: "1 John 3:18 · 1 Corinthians 13:4-7 · 1 John 4:7-12",
    summary:
      "Love is one of the most used words in the world, yet Scripture gives it a meaning far deeper than a feeling. This design leaves the sentence open on purpose.",
    meaning:
      "\"Love Is\" is built around three passages that teach love from different angles, showing that biblical love is holy, visible, and rooted in GOD.",
    symbolism:
      "The unfinished phrase invites the viewer to let Scripture, not culture or emotion, supply the definition of love.",
    heroImage: "/products/love-is.jpg",
    productSlug: "love-is",
    sections: [
      {
        heading: "The words \"Love Is\" encourage exploration",
        body: [
          "The catalyst for this design came from a Bible study discussion on John 21, where Jesus asks Simon Peter three times whether he loves Him. Each time, Peter answers, \"Yes, I love you.\" What stood out was the emotional weight of the third question. The text indicates Peter was grieved that Jesus asked a third time. That moment sparked a week-long study of the word love throughout the Bible, which led to a definition that still resonates: love is the active showing of, and desire for, the beneficial well-being of someone other than self. It treats love as an action-oriented force, not a mere sentiment.",
          "The phrase \"Love Is\" feels unfinished on purpose. It doesn't rush to define love by culture, emotion, or personal preference. It leaves space for Scripture to answer. That choice matters because many people define love by what it gives them: approval, attraction, agreement, or comfort. Those things may appear around love, but they don't fully define it. The Bible gives a fuller picture, and three passages carry that picture on the shirt.",
        ],
      },
      {
        heading: "Understanding the message behind the shirt",
        body: [
          "First is 1 John 3:18, where John gives a clear directive to love not merely through words, but through action. This verse emphasizes tangible expressions of love over proclamations, challenging believers to reflect on the authenticity of their love and to live a lifestyle that embodies kindness and generosity.",
          "Next is 1 Corinthians 13, often called the \"Love Chapter,\" which lays out the character of love: patient, kind, not self-seeking. Each attribute frames how love shows up in daily interactions, reinforcing that love isn't just an emotion but a commitment to act in ways that nurture and uplift others.",
          "The design finishes with 1 John 4, which names GOD as the very source of love and instructs us to love one another. The implication: when we extend love to others, it signifies GOD's presence within us and testifies to our relationship with Him. Love is reciprocal: received from GOD, then shared with others.",
        ],
      },
      {
        heading: "Additional context",
        body: [
          "The Bible has plenty to say about love, using distinct Greek and Hebrew words: agapaō, phileō, and 'āhaḇ, each carrying its own connotation. These terms enrich our understanding of love's many dimensions and how it applies across different contexts. The scriptures chosen for this design were selected intentionally to clarify the kind of love believers are called to exemplify.",
          "Loving others is more than a command or a duty. It's through our actions that GOD's love is made visible to the world. That understanding invites the believer to actively participate in love, turning it from a concept into a lived reality that reflects the heart of GOD.",
        ],
      },
    ],
  },
  {
    slug: "god-is-enough",
    title: "\"GOD Is Enough\" (Confidence Without the Noise)",
    scriptureRef: "Philippians 4:12",
    summary:
      "\"Until GOD is enough, nothing ever is\": a proclamation of choosing GOD over the things of this world, in any circumstance.",
    meaning:
      "GOD Is Enough is a decision made in advance: contentment that doesn't wait for the right circumstances to show up first.",
    symbolism:
      "Built entirely around Philippians 4:12, the design keeps the message plain: no noise, just the choice.",
    heroImage: "/products/god-is-enough.jpg",
    productSlug: "god-is-enough",
    sections: [
      {
        heading: "Understanding the message behind the shirt",
        body: [
          "When we wear the phrase \"Until GOD is enough, nothing ever is,\" we're proclaiming a truth that resonates with conviction. We're making the decision to choose GOD over the things of this world.",
        ],
      },
      {
        heading: "Why Philippians 4:12?",
        body: [
          "Philippians 4:12 reads: \"I know what it is to be in need, and I know what it is to have plenty. I have learned the secret of being content in any and every situation, whether well fed or hungry, whether living in plenty or in want.\"",
          "The essence of the verse is finding peace and sufficiency in GOD, regardless of circumstances. It's a journey of growth that reveals true fulfillment comes from a personal relationship with GOD, not from external sources.",
        ],
      },
    ],
  },
  {
    slug: "the-armor",
    title: "G.E.A.R. \"The Armor\"",
    scriptureRef: "Ephesians 6:10-18",
    summary:
      "Inspired by the full armor of GOD in Ephesians 6: the shield of faith, the sword of the Spirit, and standing firm, unmovable, in His Word.",
    meaning:
      "The Armor represents readiness for spiritual battle: not fighting in your own strength, but standing firm in what GOD has already given you.",
    symbolism:
      "The GEAR crest carries the shield of faith, the sword of the Spirit, and an anchor. Each numbered letter of the acronym doubles as a piece of armor.",
    heroImage: "/products/the-armor.jpg",
    productSlug: "g-e-a-r-the-armor-t-shirt",
    sections: [
      {
        heading: "The meaning",
        body: [
          "\"The Armor\" was inspired by the idea of putting on the full armor of GOD as described in Ephesians 6. The front of the shirt shows the acronym GEAR, with each letter followed by its corresponding number in the alphabet instead of a dot or other shape. GEAR has multiple meanings: in slang it means clothing, and in other contexts it means equipment. The title The Armor points directly to what GEAR is referring to here.",
        ],
      },
      {
        heading: "The shield of faith",
        body: [
          "The logo on the sleeve is the crest that represents the acronym GEAR. The first thing you'll likely notice in the crest is the shield of faith. Paul writes in Ephesians 6 to take up the shield in order to extinguish all the flaming arrows of the enemy: a metaphor for the barrage of assaults aimed at weakening one's faith, in an effort to lead astray all who are called by GOD to sin. As it's written in 1 Timothy 2, GOD wants everyone to be saved.",
        ],
      },
      {
        heading: "The sword of the Spirit",
        body: [
          "Inside the shield sits a representation of the sword of the Spirit, illustrative of a soldier's weapon in battle. A sword can both defend and attack. When the Holy Spirit is allowed to guide, the Word of GOD empowers the believer to stand firm against many forms of opposition.",
        ],
      },
      {
        heading: "The anchor",
        body: [
          "That leads into the intersecting anchor, which holds something firmly in place. The idea behind this imagery is to be held firmly in the Word of GOD, unmovable from the truth that GOD's word has authority over all reprobation.",
        ],
      },
    ],
  },
  {
    slug: "i-carry-a-peace",
    title: "I Carry a Peace",
    scriptureRef: "Philippians 4:7",
    summary:
      "A peace that surpasses understanding: for anxiety, fear, and the search for rest.",
    meaning:
      "This design is a reminder that peace isn't the absence of a storm, it's a Person you carry with you through it.",
    symbolism: "Quiet, restrained visual language mirrors the calm the message describes.",
    heroImage: "/products/i-carry-a-peace.jpg",
    productSlug: "i-carry-a-peace",
  },
];

export function getDesignStoryBySlug(slug: string) {
  return DESIGN_STORIES.find((story) => story.slug === slug) ?? null;
}

export function getDesignStoryByProductSlug(slug: string | null | undefined) {
  return DESIGN_STORIES.find((story) => story.productSlug === slug) ?? null;
}
