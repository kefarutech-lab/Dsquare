import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import hero1 from "../assets/hero/hero1.avif";

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
  {
    title: null,
    body: [
      "Welcome to DSquare Design Company! These terms and conditions outline the rules and regulations for the use of DSquare Design Company's website, located at dsquaredesign.in.",
      "By accessing this website, we assume you accept these terms and conditions. Do not continue to use DSquare Design Company if you do not agree to take all of the terms and conditions stated on this page.",
      `The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice, and all Agreements: "Client", "You" and "Your" refer to you, the person who logs on this website and is compliant with the Company's terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us" refer to DSquare Design Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance, and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client's needs in respect of the provision of the Company's stated services, in accordance with and subject to, prevailing law of India. Any use of the above terminology or other words in the singular, plural, capitalization, and/or he/she or they is taken as interchangeable and therefore as referring to the same.`,
    ],
  },
  {
    title: "Cookies",
    body: [
      "We employ the use of cookies. By accessing DSquare Design Company, you agree to use cookies in agreement with DSquare Design Companies Privacy Policy.",
      "Most interactive websites use cookies to let us retrieve the user's details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.",
    ],
  },
  {
    title: "License",
    body: [
      "Unless otherwise stated, DSquare Design Company and/or its licensors own the intellectual property rights for all material on DSquare Design Company. All intellectual property rights are reserved. You may access this from DSquare Design Company for your own personal use, subject to restrictions set in these terms and conditions.",
    ],
    list: [
      "Republish material from DSquare Design Company",
      "Sell, rent, or sub-license material from DSquare Design Company",
      "Reproduce, duplicate or copy material from DSquare Design Company",
      "Redistribute content from DSquare Design Company",
    ],
    listPrefix: "You must not:",
    body2: [
      "This Agreement shall begin on the date hereof.",
      "Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. DSquare Design Company does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of DSquare Design Company, its agents, and/or affiliates. Comments reflect the views and opinions of the person who posts their views and opinions. To the extent permitted by applicable laws, DSquare Design Company shall not be liable for the Comments or for any liability, damages, or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.",
      "DSquare Design Company reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive, or that cause a breach of these Terms and Conditions.",
    ],
    list2: [
      "You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;",
      "The Comments do not invade any intellectual property right, including, without limitation, copyright, patent, or trademark of any third party;",
      "The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material, which is an invasion of privacy;",
      "The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.",
    ],
    list2Prefix: "You warrant and represent that:",
    body3: [
      "You hereby grant DSquare Design Company a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats, or media.",
    ],
  },
  {
    title: "Hyperlinking to our Content",
    body: [
      "The following organizations may link to our Website without prior written approval:",
    ],
    list: [
      "Government agencies;",
      "Search engines;",
      "News organizations;",
      "Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses; and",
      "System-wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups, which may not hyperlink to our website.",
    ],
    body2: [
      "These organizations may link to our home page, to publications or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement, or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party's site.",
      "If you are one of the organizations listed above and are interested in linking to our website, you must inform us by sending an email to DSquare Design Company. Please include your name, your organization name, contact information, as well as the URL of your site, a list of any URLs from which you intend to link to our Website, and a list of the URLs on our site to which you would like to link. Wait 2–3 weeks for a response.",
    ],
  },
  {
    title: "iFrames",
    body: [
      "Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.",
    ],
  },
  {
    title: "Content Liability",
    body: [
      "We shall not be held responsible for any content that appears on your Website. You agree to protect and defend us against all claims that arise on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene, or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third-party rights.",
    ],
  },
  {
    title: "Your Privacy",
    body: ["Please read our Privacy Policy for full details on how we handle your personal information."],
  },
  {
    title: "Reservation of Rights",
    body: [
      "We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amend these terms and conditions and its linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.",
    ],
  },
  {
    title: "Removal of Links from our Website",
    body: [
      "If you find any link on our Website that is offensive for any reason, you are free to contact and inform us at any time. We will consider requests to remove links but we are not obligated to do so or to respond to you directly.",
      "We do not ensure that the information on this website is correct; we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.",
    ],
  },
  {
    title: "Disclaimer",
    body: [
      "To the maximum extent permitted by applicable law, we exclude all representations, warranties, and conditions relating to our website and the use of this website. Nothing in this disclaimer will:",
    ],
    list: [
      "Limit or exclude our or your liability for death or personal injury;",
      "Limit or exclude our or your liability for fraud or fraudulent misrepresentation;",
      "Limit any of our or your liabilities in any way that is not permitted under applicable law; or",
      "Exclude any of our or your liabilities that may not be excluded under applicable law.",
    ],
    body2: [
      "The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort, and for breach of statutory duty.",
      "As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.",
    ],
  },
];

export default function TermsPage() {
  return (
    <main className="bg-[#0F0D0C]">
      <HeroSection />
      <ContentSection />
    </main>
  );
}

/* ── Hero ───────────────────────────────────────────────────────── */
function HeroSection() {
  const secRef  = useRef(null);
  const imgRef  = useRef(null);
  const tagRef  = useRef(null);
  const headRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imgRef.current, {
        yPercent: -12, ease: "none",
        scrollTrigger: { trigger: secRef.current, start: "top top", end: "bottom top", scrub: 1.5 },
      });
      gsap.from(tagRef.current,  { opacity: 0, y: 14, duration: 0.7, ease: "power3.out", delay: 0.3 });
      gsap.from(headRef.current, { opacity: 0, y: 30, duration: 1.1, ease: "power3.out", delay: 0.5 });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={secRef} className="relative h-[55vh] w-full overflow-hidden">
      <img ref={imgRef} src={hero1} alt="Terms & Conditions" draggable={false}
        className="absolute inset-0 w-full h-full object-cover scale-110 will-change-transform" />
      <div className="absolute inset-0 bg-[#0F0D0C]/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F0D0C]/80 via-[#0F0D0C]/50 to-transparent" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <h1 ref={headRef} className="font-display text-[#EDE9DF] leading-tight"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)", letterSpacing: "-0.02em" }}>
            Terms &amp; <em className="not-italic text-[#B17457]">Conditions</em>
          </h1>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <div className="flex items-center gap-3">
          <span className="w-6 h-px bg-[#B17457]/50" />
          <span className="font-sans text-[#D9D3C3]/48 text-[9px] tracking-[0.4em] uppercase">Legal & Policies</span>
          <span className="w-6 h-px bg-[#B17457]/50" />
        </div>
      </div>
    </section>
  );
}

/* ── Content ────────────────────────────────────────────────────── */
function ContentSection() {
  const secRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".terms-section", {
        opacity: 0, y: 30, duration: 0.8, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: secRef.current, start: "top 80%", toggleActions: "play none none none" },
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={secRef} className="bg-white py-20 lg:py-28">
      <div className="max-w-[860px] mx-auto px-6 lg:px-12">

        <div className="flex flex-col gap-12">
          {SECTIONS.map((sec, i) => (
            <div key={i} className="terms-section flex flex-col gap-5">

              {sec.title && (
                <h2 className="font-display text-[#0F0D0C] text-2xl lg:text-3xl leading-tight"
                  style={{ letterSpacing: "-0.01em" }}>
                  {sec.title}
                </h2>
              )}

              {sec.body?.map((p, j) => (
                <p key={j} className="font-sans text-[#333] text-sm lg:text-base leading-loose">
                  {p}
                </p>
              ))}

              {sec.listPrefix && (
                <p className="font-sans text-[#0F0D0C] text-sm font-semibold">{sec.listPrefix}</p>
              )}
              {sec.list && (
                <ul className="flex flex-col gap-2 pl-5">
                  {sec.list.map((item, j) => (
                    <li key={j} className="font-sans text-[#333] text-sm lg:text-base leading-loose list-disc">
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {sec.body2?.map((p, j) => (
                <p key={j} className="font-sans text-[#333] text-sm lg:text-base leading-loose">
                  {p}
                </p>
              ))}

              {sec.list2Prefix && (
                <p className="font-sans text-[#0F0D0C] text-sm font-semibold">{sec.list2Prefix}</p>
              )}
              {sec.list2 && (
                <ul className="flex flex-col gap-2 pl-5">
                  {sec.list2.map((item, j) => (
                    <li key={j} className="font-sans text-[#333] text-sm lg:text-base leading-loose list-disc">
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {sec.body3?.map((p, j) => (
                <p key={j} className="font-sans text-[#333] text-sm lg:text-base leading-loose">
                  {p}
                </p>
              ))}

              {/* Divider between sections */}
              {i < SECTIONS.length - 1 && (
                <div className="w-full h-px bg-[#0F0D0C]/8 mt-2" />
              )}
            </div>
          ))}
        </div>

        {/* Back to home */}
        <div className="mt-16 pt-8 border-t border-[#0F0D0C]/10">
          <Link
            to="/"
            className="group inline-flex items-center gap-3 bg-[#B17457] text-[#EDE9DF] font-sans text-xs tracking-[0.2em] uppercase px-7 py-3.5 hover:bg-[#9a6245] transition-colors duration-300"
          >
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none"
              className="group-hover:-translate-x-1 transition-transform duration-200">
              <path d="M13 7H1M6 2L1 7L6 12" stroke="currentColor" strokeWidth="1.3"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Home
          </Link>
        </div>

      </div>
    </section>
  );
}
