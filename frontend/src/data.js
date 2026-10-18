// Fallback data used when the backend is not running.
// Dates are ISO strings: enrollment opens at `start` and closes at `end`.
export const fallbackCourses = [
  {
    id: "ccna",
    title: "CCNA Certification",
    level: "Beginner",
    videos: 42,
    blurb:
      "Networking basics, IPv4 and IPv6, switching, routing and a first look at automation.",
    start: "2026-10-09",
    end: "2026-10-31",
  },
  {
    id: "security",
    title: "Cybersecurity Essentials",
    level: "Beginner",
    videos: 24,
    blurb:
      "Threats, hardening, firewalls and the basics of keeping a network safe.",
    start: "2026-10-24",
    end: "2026-11-13",
  },
  {
    id: "subnetting",
    title: "Subnetting Made Simple",
    level: "Beginner",
    videos: 18,
    blurb: "Binary, masks and subnet design, one small step at a time.",
    start: "2026-09-01",
    end: "2026-10-05",
  },
  {
    id: "encor",
    title: "CCNP ENCOR 350-401",
    level: "Advanced",
    videos: 60,
    blurb:
      "Enterprise core: spanning tree, EIGRP, OSPF, BGP, multicast and network design.",
    start: "2026-09-09",
    end: "2026-10-16",
  },
];

export const features = [
  {
    t: "Taught by a Cisco instructor",
    d: "Lessons follow the real Cisco curriculum and exam topics.",
  },
  {
    t: "Free first lessons",
    d: "Watch the first two videos of every course before you enroll.",
  },
  { t: "Hands-on labs", d: "Packet Tracer and CML labs for every module." },
  {
    t: "Clear enrollment windows",
    d: "Each batch opens and closes on a published date.",
  },
  {
    t: "Watch on any device",
    d: "Phone, tablet or laptop. Pick up where you stopped.",
  },
  {
    t: "Ask your instructor",
    d: "Get answers to your questions inside the course group.",
  },
];

export const steps = [
  {
    t: "Watch the free lessons",
    d: "Open any course and play the first two videos.",
  },
  {
    t: "Enroll before the deadline",
    d: "The countdown on each course shows how long you have.",
  },
  {
    t: "Unlock every module",
    d: "After enrolling, all videos and labs open for you.",
  },
];

export const faqs = [
  {
    q: "Why can I only watch two videos?",
    a: "The first two videos of every course are free. The remaining modules unlock when you enroll.",
  },
  {
    q: "What happens when enrollment closes?",
    a: "You can still watch the free lessons. Join the next batch when it opens.",
  },
  {
    q: "Do I need Cisco experience?",
    a: "No. Beginner courses start from zero and are marked clearly.",
  },
  {
    q: "How do I pay?",
    a: "Payment will be added in the next step. This page only shows the layout.",
  },
];
