import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Temporary in-memory data. Replace with MongoDB later.
const courses = [
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

app.get("/api/courses", (req, res) => res.json(courses));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log("Netvaro API running on http://localhost:" + PORT),
);
