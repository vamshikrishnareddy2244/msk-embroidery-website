"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const defaultProducts = [
  { name: "Single Head Embroidery Machine", type: "Embroidery Machines", tag: "SINGLE HEAD", icon: "01", image: "/single-head-embroidery.jpg", description: "Compact, reliable embroidery production for growing businesses." },
  { name: "Double Head Embroidery Machine", type: "Embroidery Machines", tag: "DOUBLE HEAD", icon: "02", image: "/double-head-embroidery.jpg", description: "Higher productivity with dual-head embroidery performance." },
  { name: "Double Bead Machine", type: "Bead Machines", tag: "DOUBLE BEAD", icon: "03", image: "", description: "Bead attachment solution for detailed decorative production." },
  { name: "Triple Bead Machine", type: "Bead Machines", tag: "TRIPLE BEAD", icon: "04", image: "", description: "Multi-bead production for efficient decorative work." },
  { name: "Four Bead Machine", type: "Bead Machines", tag: "FOUR BEAD", icon: "05", image: "/four-bead-machine.jpg", description: "Four-bead capability for advanced embellishment requirements." },
  { name: "4 Bead 2 Sequence Device", type: "Devices", tag: "4 BEAD • 2 SEQUENCE", icon: "06", image: "", description: "A dedicated 4-bead, 2-sequence device for production flexibility." }
];

const branches = [
  ["Hyderabad", "Assembly Rd, Public Gardens, Red Hills, Lakdikapul", "https://www.google.com/maps/search/?api=1&query=Assembly+Rd+Public+Gardens+Red+Hills+Lakdikapul+Hyderabad", "/hyderabad-branch.jpg", "9000524484"],
  ["Kodad", "Huzur Nagar Road, Kodad", "https://www.google.com/maps/search/?api=1&query=MSK+Embroidery+Machine+Kodad", "", "9866650925"],
  ["Bangalore", "MSK service & support", "https://www.google.com/maps/search/?api=1&query=MSK+Embroidery+Machine+Bangalore", "/bangalore-branch.jpg", "7676700103"],
  ["Vizag", "MSK service & support", "https://www.google.com/maps/search/?api=1&query=MSK+Embroidery+Machine+Vizag", "https://img.staticmb.com/mbcontent/images/crop/uploads/ver2/XIwvQlc61t8ZIpanz4mAnjU5yiPgMTsF1FomAJaW47thYQ/Panoramic-view-of-Visakhapatnam-real-estate-2025_0_1200.jpg", "9966056628"],
  ["Jammikunta", "MSK service & support", "https://www.google.com/maps/search/?api=1&query=MSK+Embroidery+Machine+Jammikunta", "https://files.yappe.in/place/full/jammikunta-8793291.webp", ""]
];

const gallery = [
  ["Double Head Embroidery Machine", "/gallery-machine-01.png"],
  ["Computer Embroidery Machine", "/gallery-machine-02.png"],
  ["Embroidery Machine", "/gallery-machine-03.png"],
  ["Embroidery Work", "/gallery-machine-04.png"]
];

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}>{children}</motion.div>;
}

export default function MskHome() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<(typeof defaultProducts)[number] | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [faq, setFaq] = useState<number | null>(0);
  const [formSent, setFormSent] = useState(false);
  const [formSending, setFormSending] = useState(false);
  const [formError, setFormError] = useState("");
  const [showTop, setShowTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [products, setProducts] = useState(defaultProducts);

  useEffect(() => {
    fetch("/api/products")
      .then(r => r.ok ? r.json() : Promise.reject(new Error("Products API failed")))
      .then(data => { if (Array.isArray(data)) setProducts(data); })
      .catch(err => console.error(err));
    const onScroll = () => { setShowTop(window.scrollY > 600); const max = document.documentElement.scrollHeight - window.innerHeight; setScrollProgress(max > 0 ? window.scrollY / max : 0); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const visibleProducts = useMemo(() => products.filter(p => (filter === "All" || p.type === filter) && p.name.toLowerCase().includes(query.toLowerCase())), [products, filter, query]);
  const wa = (product?: string) => `https://wa.me/919000524484?text=${encodeURIComponent(product ? `Hello MSK, I am interested in ${product}` : "Hello MSK, I need information about your embroidery machines.")}`;

  return <main>
    <div className="top-line" />
    <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress})` }} />
    <nav className="navbar">
      <a href="#home" className="brand"><Image src="/msk-logo.png" alt="MSK Embroidery Machine" width={190} height={78} priority /></a>
      <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">☰</button>
      <div className={`nav-links ${mobileOpen ? "open" : ""}`}>
        {[['Home','#home'],['Products','#products'],['Service','#service'],['Gallery','#gallery'],['About','#about'],['Branches','#branches'],['FAQ','#faq']].map(([label, href]) => <a key={label} href={href} onClick={() => setMobileOpen(false)}>{label}</a>)}
        <a href="#contact" className="nav-cta" onClick={() => setMobileOpen(false)}>Enquire Now</a>
      </div>
    </nav>

    <section id="home" ref={heroRef} className="hero">
      <div className="hero-grid" /><div className="hero-orb orb-a" /><div className="hero-orb orb-b" />
      <motion.div className="hero-copy" style={{ y: heroY }}>
        <motion.p className="eyebrow" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .3 }}>COMPUTER EMBROIDERY MACHINES</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .45, duration: .9 }}>Excellence in<br /><span>Every Stitch.</span></motion.h1>
        <motion.p className="hero-text" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .7 }}>Technician-built machinery, dependable performance and service with no compromise. From installation to after-sales support, MSK stays with your production.</motion.p>
        <motion.div className="hero-actions" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .9 }}><a className="button button-gold" href="#products">Explore Machines <span>↗</span></a><a className="button button-ghost" href={wa()} target="_blank" rel="noreferrer">WhatsApp Us</a></motion.div>
        <div className="hero-mini-stats"><div><strong>800+</strong><span>Machines Delivered</span></div><div><strong>5</strong><span>Locations</span></div><div><strong>100%</strong><span>Service Focus</span></div></div>
      </motion.div>
      <motion.div className="hero-machine" style={{ scale: heroScale }}>
        <div className="hero-machine-visual">
          <Image src="/hero-machine-real.png" alt="MSK Embroidery Machine" fill priority sizes="(max-width: 900px) 92vw, 50vw" className="hero-machine-photo" />
          <div className="hero-machine-overlay" />
          <div className="floating-chip chip-one">TECHNICIAN BUILT</div>
          <div className="floating-chip chip-two">NO COMPROMISE IN SERVICE</div>
          <div className="floating-chip chip-three">ALL INDIA DELIVERY</div>
        </div>
      </motion.div>
      <div className="scroll-cue"><span>SCROLL TO EXPLORE</span><i /></div>
    </section>

    <section id="about" className="section about">
      <div className="section-label">01 / ABOUT MSK</div><div className="about-grid"><Reveal><h2>Machines are only<br /><em>half the story.</em></h2></Reveal><Reveal delay={.1}><p className="lead">MSK is built by technicians who understand the machine, the production floor and the importance of fast service.</p><p>We believe there should be no compromise in service. Our support covers installation, operation guidance, troubleshooting, maintenance and long-term technical assistance.</p></Reveal></div>
      <div className="service-promise">{[["01","TECHNICAL EXPERTISE","People who understand the machine, not just the catalogue.","/four-bead-machine.jpg"],["02","NO COMPROMISE IN SERVICE","Your production matters. Our support stays with you.","/double-head-embroidery.jpg"],["03","LONG-TERM SUPPORT","Installation, guidance, maintenance and technical assistance.","/hyderabad-branch.jpg"]].map(([n,title,text,image],i)=><Reveal key={n} delay={i*.08}><div className="promise-card"><div className="promise-image"><img src={image} alt={title}/><div className="promise-image-shade"/></div><div className="promise-content"><span>{n}</span><h3>{title}</h3><p>{text}</p></div></div></Reveal>)}</div>
    </section>

    <section id="products" className="section products">
      <div className="section-head"><div><div className="section-label">02 / PRODUCTS</div><h2>Built for <em>production.</em></h2></div><p>Explore embroidery machines, bead machines and the 4 Bead 2 Sequence device.</p></div>
      <div className="product-tools"><div className="filters">{["All","Embroidery Machines","Bead Machines","Devices"].map(item=><button key={item} className={filter===item?"active":""} onClick={()=>setFilter(item)}>{item}</button>)}</div><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search products..." aria-label="Search products" /></div>
      <motion.div layout className="product-grid">{visibleProducts.map((product,index)=><motion.article layout key={product.name} className="product-card" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:index*.05}} whileHover={{y:-8}}>
        <button className="product-image product-image-button" onClick={()=>setSelected(product)} aria-label={`View ${product.name}`}><div className="product-number">{product.icon}</div>{product.image?<Image src={product.image} alt={product.name} fill sizes="(max-width:560px) 92vw,(max-width:900px) 45vw,30vw" className="product-photo"/>:<div className="mini-machine"><span className="mini-head"/><span className="mini-body"/><span className="mini-base"/></div>}<div className="product-tag">{product.tag}</div></button>
        <div className="product-info"><p>{product.type}</p><h3>{product.name}</h3><p className="product-desc">{product.description}</p><div className="product-actions"><button onClick={()=>setSelected(product)}>View Details <span>↗</span></button><a href={wa(product.name)} target="_blank" rel="noreferrer">Get Quote <span>→</span></a></div></div>
      </motion.article>)}</motion.div>
    </section>

    <section id="service" className="dark-section"><div className="service-bg-text">SERVICE</div><div className="section service-section"><div className="section-label">03 / THE MSK DIFFERENCE</div><div className="service-grid"><Reveal><h2>When your machine<br />runs, <em>business runs.</em></h2></Reveal><Reveal delay={.12}><p className="lead light">Service is not an add-on at MSK. It is part of the product.</p></Reveal></div><div className="service-list">{["Installation & setup","Technical troubleshooting","Maintenance & service","Operator guidance","Fast support","Long-term assistance"].map((item,i)=><motion.div key={item} className="service-row" initial={{opacity:0,x:-25}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*.05}}><span>0{i+1}</span><strong>{item}</strong><i>↗</i></motion.div>)}</div></div></section>

    <section id="gallery" className="section gallery-section">
      <div className="section-head">
        <div>
          <div className="section-label">04 / MACHINE GALLERY</div>
          <h2>See the <em>machines.</em></h2>
        </div>
        <p>Real MSK machine photographs from our collection.</p>
      </div>
      <div className="gallery-grid">
        {gallery.map(([title,src],i)=>(
          <button
            className="gallery-item"
            key={src}
            onClick={()=>setSelected(products.find(p=>p.name===title) || null)}
            type="button"
          >
            <img src={src} alt={title} loading={i === 0 ? "eager" : "lazy"} />
            <div><span>0{i+1}</span><strong>{title}</strong></div>
          </button>
        ))}
      </div>
    </section>

    <section id="branches" className="section branches"><div className="section-head"><div><div className="section-label">05 / OUR REACH</div><h2>Closer to your<br /><em>business.</em></h2></div><p>Our growing presence helps customers get the support they need.</p></div><div className="branch-grid">{branches.map(([branch,address,map,image,phone],i)=><Reveal key={branch} delay={i*.06}><div className="branch-card">{image&&<img className="branch-photo" src={image} alt={`${branch} location`} loading="lazy" />}<div className="branch-overlay"/><span>0{i+1}</span><div className="pin">+</div><h3>{branch}</h3><p>{address}</p>{phone&&<a className="branch-phone" href={`tel:+91${phone}`}>+91 {phone}</a>}<a href={map} target="_blank" rel="noreferrer">Open in Maps ↗</a></div></Reveal>)}</div></section>

    <section className="stats-band"><div><strong>800+</strong><span>Machines Delivered</span></div><div><strong>5</strong><span>Service Locations</span></div><div><strong>5 YR*</strong><span>Warranty*</span></div><div><strong>ALL INDIA</strong><span>Delivery</span></div></section>

    <section className="section testimonials"><div className="section-label">06 / CUSTOMER CONFIDENCE</div><h2>Built on <em>support.</em></h2><div className="testimonial-grid">{[["01","Reliable machine support","From installation to troubleshooting, the focus is on keeping production moving."],["02","Technician-first approach","The MSK promise is simple: understand the machine and solve the problem."],["03","Long-term relationship","Customers need more than a machine. They need a dependable technical partner."]].map(([n,title,text])=><Reveal key={n}><div className="testimonial-card"><span>{n}</span><div className="stars">★★★★★</div><h3>{title}</h3><p>{text}</p></div></Reveal>)}</div></section>

    <section id="faq" className="section faq-section"><div className="section-head"><div><div className="section-label">07 / FAQ</div><h2>Common <em>questions.</em></h2></div><p>Need something specific? Send an enquiry and our team can guide you.</p></div><div className="faq-list">{[["Do you provide installation and setup?","Yes. Installation, setup and operator guidance are part of the MSK service approach."],["Do you provide service after purchase?","Yes. MSK focuses on long-term technical support, troubleshooting and maintenance."],["Do you deliver machines across India?","Yes. We provide all-India machine delivery. Contact us for delivery details to your location."],["Can I enquire about a specific machine?","Yes. Use the Get Quote button on any product or contact MSK directly on WhatsApp or phone."],["Can I add product photos later?","Yes. The product section is structured so additional product photos can be added without creating separate product pages."]].map(([q,a],i)=><div className={`faq-item ${faq===i?"open":""}`} key={q}><button onClick={()=>setFaq(faq===i?null:i)}><span>{q}</span><b>{faq===i?"−":"+"}</b></button>{faq===i&&<motion.p initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}}>{a}</motion.p>}</div>)}</div></section>

    <section id="contact" className="contact section"><div className="contact-glow"/><div className="section-label">08 / START A CONVERSATION</div><div className="contact-grid"><Reveal><h2>Let's build your<br /><em>next production.</em></h2><p>Tell us what you need and the MSK team will help you choose the right solution.</p></Reveal><Reveal delay={.1}><form className="enquiry-form" onSubmit={async e=>{e.preventDefault();setFormSending(true);setFormError("");setFormSent(false);const form=e.currentTarget;const data=new FormData(form);try{const res=await fetch("/api/enquiries",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:data.get("name"),phone:data.get("phone"),email:data.get("email"),product:data.get("product"),message:data.get("message")})});const result=await res.json();if(!res.ok)throw new Error(result.error||"Unable to send enquiry");setFormSent(true);form.reset();}catch(err){setFormError(err instanceof Error?err.message:"Unable to send enquiry");}finally{setFormSending(false);}}}><input name="name" required placeholder="Your name"/><input name="phone" required type="tel" placeholder="Phone number"/><input name="email" type="email" placeholder="Email address"/><select name="product" defaultValue=""><option value="" disabled>Select product</option>{products.map(p=><option key={p.name} value={p.name}>{p.name}</option>)}</select><textarea name="message" required placeholder="Tell us what you need..." rows={4}/><button className="button button-gold" type="submit" disabled={formSending}>{formSending?"Sending...":"Send Enquiry ↗"}</button>{formSent&&<p className="form-success">Thank you. Your enquiry has been saved. For fastest response, also WhatsApp MSK.</p>}{formError&&<p className="form-success" style={{color:"#b42318"}}>{formError}</p>}</form></Reveal></div><div className="contact-actions"><a className="button button-gold" href={wa()} target="_blank" rel="noreferrer">WhatsApp MSK ↗</a><a className="button button-dark" href="tel:+919000524484">Call Us</a><a className="button button-outline-dark" href="mailto:mskembroidarymachines@gmail.com">Email Us</a></div></section>

    <footer><div className="footer-main"><Image src="/msk-logo.png" alt="MSK" width={210} height={86}/><div><p className="footer-title">MSK EMBROIDERY MACHINE</p><p>Excellence in Every Stitch.</p><div className="social-links"><a href={wa()} target="_blank" rel="noreferrer">WhatsApp</a><a href="#home">Instagram</a><a href="#home">YouTube</a></div></div><div className="footer-address"><strong>Hyderabad</strong><span>Assembly Rd, Public Gardens,<br/>Red Hills, Lakdikapul, Hyderabad</span><span>All India machine delivery</span><a href="mailto:mskembroidarymachines@gmail.com">mskembroidarymachines@gmail.com</a><span>Technician-built • No compromise in service</span></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} MSK Embroidery Machine. All rights reserved.</span><span>Built around machines. Driven by service.</span></div></footer>

    <a className="floating-whatsapp" href={wa()} target="_blank" rel="noreferrer" aria-label="WhatsApp MSK">✆</a>{showTop&&<button className="back-top" onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}>↑</button>}

    {selected&&<div className="modal-backdrop" onClick={()=>setSelected(null)}><motion.div className="product-modal" initial={{opacity:0,scale:.94,y:20}} animate={{opacity:1,scale:1,y:0}} onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>setSelected(null)}>×</button><div className="modal-media">{selected.image?<Image src={selected.image} alt={selected.name} fill sizes="(max-width:700px) 90vw,50vw"/>:<div className="modal-placeholder"><span>MSK</span><small>Product photo coming soon</small></div>}</div><div className="modal-copy"><span className="modal-tag">{selected.tag}</span><h2>{selected.name}</h2><p>{selected.description}</p><div className="modal-points"><span>✓ Technician support</span><span>✓ Installation guidance</span><span>✓ All India delivery</span></div><a className="button button-gold" href={wa(selected.name)} target="_blank" rel="noreferrer">Get Quote on WhatsApp ↗</a></div></motion.div></div>}
  </main>;
}
