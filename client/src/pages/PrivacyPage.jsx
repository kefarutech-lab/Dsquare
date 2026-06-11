import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import hero3 from "../assets/hero/hero3.jpg";

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
  {
    title: null,
    body: [
      "At DSquare Design Company, accessible from dsquaredesign.in, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that are collected and recorded by DSquare Design Company and how we use it.",
      "If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.",
      "This Privacy Policy applies only to our online activities and is valid for visitors to our website with regard to the information that they shared and/or collected in DSquare Design Company. This policy is not applicable to any information collected offline or via channels other than this website.",
    ],
  },
  {
    title: "Consent",
    body: [
      "By using our website, you hereby consent to our Privacy Policy and agree to its terms.",
    ],
  },
  {
    title: "Information We Collect",
    body: [
      "The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.",
      "If you contact us directly, we may receive additional information about you, such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.",
      "When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.",
    ],
  },
  {
    title: "How We Use Your Information",
    body: [
      "We use the information we collect in various ways, including:",
    ],
    list: [
      "Provide, operate, and maintain our website",
      "Improve, personalize, and expand our website",
      "Understand and analyze how you use our website",
      "Develop new products, services, features, and functionality",
      "Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes",
      "Send you emails",
      "Find and prevent fraud",
    ],
  },
  {
    title: "Log Files",
    body: [
      "DSquare Design Company follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.",
    ],
  },
  {
    title: "Cookies and Web Beacons",
    body: [
      "Like any other website, DSquare Design Company uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.",
    ],
  },
  {
    title: "Advertising Partners Privacy Policies",
    body: [
      "Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on DSquare Design Company, which are sent directly to users' browsers. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.",
      "Note that DSquare Design Company has no access to or control over these cookies that are used by third-party advertisers.",
    ],
  },
  {
    title: "Third-Party Privacy Policies",
    body: [
      "DSquare Design Companies Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt out of certain options.",
      "You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found on the browsers' respective websites.",
    ],
  },
  {
    title: "GDPR Data Protection Rights",
    body: [
      "We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:",
    ],
    list: [
      "The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service.",
      "The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.",
      "The right to erasure – You have the right to request that we erase your personal data, under certain conditions.",
      "The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.",
      "The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.",
      "The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.",
    ],
    body2: [
      "If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.",
    ],
  },
  {
    title: "Children's Information",
    body: [
      "Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.",
      "DSquare Design Company does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.",
    ],
  },
];

export default function PrivacyPage() {
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
      <img ref={imgRef} src={hero3} alt="Privacy Policy" draggable={false}
        className="absolute inset-0 w-full h-full object-cover scale-110 will-change-transform" />
      <div className="absolute inset-0 bg-[#0F0D0C]/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F0D0C]/80 via-[#0F0D0C]/50 to-transparent" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <h1 ref={headRef} className="font-display text-[#EDE9DF] leading-tight"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)", letterSpacing: "-0.02em" }}>
            Privacy <em className="not-italic text-[#B17457]">Policy</em>
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
      gsap.from(".privacy-section", {
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
            <div key={i} className="privacy-section flex flex-col gap-5">

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

              {i < SECTIONS.length - 1 && (
                <div className="w-full h-px bg-[#0F0D0C]/8 mt-2" />
              )}
            </div>
          ))}
        </div>

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
