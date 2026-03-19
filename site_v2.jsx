import { useState, useRef, useEffect, useCallback } from "react";

const C = {
  primary:"#C0392B", primaryDark:"#962D22", accent:"#D4A03C", dark:"#2C2C2C",
  darkBg:"#1a1a2e", chatBg:"#0f0f1e", botBubble:"#1e293b", userBubble:"#C0392B",
  text:"#f1f5f9", textMuted:"#94a3b8", inputBg:"#1e293b", border:"#334155",
  success:"#22c55e", white:"#ffffff", lightBg:"#f8f9fa", sectionBg:"#fdf6ec",
};

const BotIcon=()=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/></svg>;
const SendIcon=()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>;
const UploadIcon=()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>;
const MinIcon=()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const Chk=()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.success} strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>;
const Img=({label,h=180})=><div style={{height:h,background:"#f0f1f3",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",borderRadius:12,border:"1px solid #e5e7eb"}}><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg><span style={{fontSize:14,color:"#9ca3af",marginTop:6}}>{label}</span></div>;

const CHAT_PAGES=["home","digitizing","artwork","pricing"];

// ── NAV ──
function Nav({page,setPage,setShowAdmin}){
  const links=[{id:"digitizing",l:"Digitizing"},{id:"artwork",l:"Artwork"},{id:"patches",l:"Patches"},{id:"gallery",l:"Gallery"},{id:"howwetest",l:"How We Test"},{id:"pricing",l:"Pricing"},{id:"faq",l:"FAQ"},{id:"blog",l:"Blog"},{id:"promo",l:"Promo"}];
  return <>
    <div style={{background:C.dark,color:C.textMuted,fontSize:14,padding:"10px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
      <div style={{display:"flex",gap:16}}>
        <span>📞 401-655-1153</span><span>✉️ mail@digitizing.us</span>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
        <span style={{color:"rgba(255,255,255,0.5)"}}>Have an account?</span>
        <a href="https://system.digitizing.systems" target="_blank" rel="noopener noreferrer" style={{color:C.accent,textDecoration:"none",fontWeight:700,fontSize:14}}>Log In</a>
        <span style={{color:"rgba(255,255,255,0.2)"}}>|</span>
        <span style={{color:"rgba(255,255,255,0.5)"}}>New?</span>
        <a href="https://system.digitizing.systems/register" target="_blank" rel="noopener noreferrer" style={{color:C.accent,textDecoration:"none",fontWeight:700,fontSize:14}}>Sign Up Free</a>
        <span style={{background:C.accent,color:C.dark,fontSize:13,fontWeight:700,padding:"3px 10px",borderRadius:4}}>50% OFF first 2 designs!</span>
        <span style={{color:"rgba(255,255,255,0.2)"}}>|</span>
        <span style={{color:"rgba(255,255,255,0.4)",fontSize:13}}>🛡️ We never store your card details</span>
        <span style={{cursor:"pointer",color:"transparent",fontSize:10}} onClick={()=>setShowAdmin&&setShowAdmin(p=>!p)}>•</span>
      </div>
    </div>
    <nav style={{background:C.primary,padding:"0 24px",display:"flex",alignItems:"center",justifyContent:"space-between",height:58,flexWrap:"wrap"}}>
      <div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer"}} onClick={()=>setPage("home")}>
        <div style={{background:C.accent,borderRadius:6,width:34,height:34,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:15,color:C.dark}}>D</div>
        <span style={{color:C.white,fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:19}}>DIGITIZING.US</span>
      </div>
      <div style={{display:"flex",gap:16,alignItems:"center",flexWrap:"wrap"}}>
        {links.map(l=><a key={l.id} href="#" onClick={e=>{e.preventDefault();setPage(l.id)}} style={{color:page===l.id?C.accent:"rgba(255,255,255,0.85)",textDecoration:"none",fontSize:15,fontWeight:page===l.id?700:500}} onMouseEnter={e=>e.target.style.color=C.accent} onMouseLeave={e=>{if(page!==l.id)e.target.style.color="rgba(255,255,255,0.85)"}}>{l.l}</a>)}
      </div>
    </nav>
  </>;
}

// ── FOOTER ──
function Footer({setPage}){
  return <footer style={{background:"#111",padding:"48px 32px 32px",color:"#999"}}>
    <div style={{maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:32,marginBottom:32}}>
      <div><div style={{color:C.white,fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:18,marginBottom:12}}>DIGITIZING.US</div><p style={{fontSize:15,lineHeight:1.6,color:"#777"}}>Professional embroidery digitizing, vector artwork, and patches. Staff with 30+ years experience.</p></div>
      <div><div style={{color:C.white,fontWeight:600,fontSize:15,marginBottom:12}}>Services</div>{["digitizing","artwork","patches","pricing"].map(s=><a key={s} href="#" onClick={e=>{e.preventDefault();setPage(s)}} style={{display:"block",color:"#777",textDecoration:"none",fontSize:15,marginBottom:8}}>{s.charAt(0).toUpperCase()+s.slice(1)}</a>)}</div>
      <div><div style={{color:C.white,fontWeight:600,fontSize:15,marginBottom:12}}>Company</div>{[["About","about"],["How We Test","howwetest"],["Gallery","gallery"],["Blog","blog"],["FAQ","faq"]].map(([l,id])=><a key={id} href="#" onClick={e=>{e.preventDefault();setPage(id)}} style={{display:"block",color:"#777",textDecoration:"none",fontSize:15,marginBottom:8}}>{l}</a>)}</div>
      <div><div style={{color:C.white,fontWeight:600,fontSize:15,marginBottom:12}}>Contact</div><p style={{fontSize:15,color:"#777"}}>📞 401-655-1153</p><p style={{fontSize:15,color:"#777"}}>✉️ mail@digitizing.us</p><p style={{fontSize:15,color:"#777"}}>📍 1812 Raspberry Ct, NJ 08817</p></div>
    </div>
    <div style={{borderTop:"1px solid #333",paddingTop:20,textAlign:"center",fontSize:14,color:"#555"}}>© 2026 Fixed Price Digitizing. All rights reserved. <a href="#" onClick={e=>{e.preventDefault();setPage("terms")}} style={{color:"#666",textDecoration:"none",marginLeft:12}}>Terms & Privacy</a></div>
  </footer>;
}

// ── SHARED COMPONENTS ──
function PH({title,sub,bc,setPage}){return <section style={{background:`linear-gradient(135deg,${C.dark} 0%,#1a1a2e 100%)`,padding:"56px 32px 48px"}}><div style={{maxWidth:1100,margin:"0 auto"}}>{bc&&<div style={{fontSize:14,color:C.textMuted,marginBottom:10}}><a href="#" onClick={e=>{e.preventDefault();setPage("home")}} style={{color:C.accent,textDecoration:"none"}}>Home</a> / {bc}</div>}<h1 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:38,fontWeight:700,color:C.white,margin:"0 0 10px"}}>{title}</h1>{sub&&<p style={{fontSize:17,color:C.textMuted,margin:0,maxWidth:600,lineHeight:1.6}}>{sub}</p>}</div></section>;}
function S({children,bg=C.white,py=72}){return <section style={{background:bg,padding:`${py}px 32px`}}><div style={{maxWidth:1100,margin:"0 auto"}}>{children}</div></section>;}
function ST({children,sub}){return <><h2 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:30,fontWeight:700,color:C.dark,margin:"0 0 8px"}}>{children}</h2>{sub&&<p style={{fontSize:17,color:"#666",margin:"0 0 36px",lineHeight:1.6}}>{sub}</p>}</>;}
function CTA({onChat,title="Ready to get started?",desc="Upload your design and get a quote in minutes."}){return <section style={{background:C.dark,padding:"56px 32px",textAlign:"center"}}><h2 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:30,fontWeight:700,color:C.accent,margin:"0 0 14px"}}>{title}</h2><p style={{fontSize:17,color:"rgba(255,255,255,0.6)",margin:"0 0 28px"}}>{desc}</p><button onClick={onChat} style={{background:C.primary,color:C.white,border:"none",borderRadius:8,padding:"14px 36px",fontSize:16,fontWeight:700,cursor:"pointer"}}>Upload Your Design Now</button></section>;}

// ═══════════════════════════════════════
// PAGE: HOME
// ═══════════════════════════════════════
function HomePage({onChat,setPage}){
  return <>
    <section style={{background:`linear-gradient(135deg,rgba(28,28,38,0.95),rgba(26,26,46,0.92),rgba(140,40,30,0.90))`,padding:"72px 32px",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,opacity:0.06,backgroundImage:"repeating-linear-gradient(90deg,transparent,transparent 36px,rgba(255,255,255,0.15) 36px,rgba(255,255,255,0.15) 37px),repeating-linear-gradient(0deg,transparent,transparent 36px,rgba(255,255,255,0.1) 36px,rgba(255,255,255,0.1) 37px)",pointerEvents:"none"}}/>
      <div style={{position:"absolute",left:"5%",bottom:"-20%",width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle,rgba(192,57,43,0.2),transparent 70%)",pointerEvents:"none"}}/>
      <div style={{position:"absolute",right:"10%",top:"-10%",width:300,height:300,borderRadius:"50%",background:"radial-gradient(circle,rgba(212,160,60,0.1),transparent 70%)",pointerEvents:"none"}}/>
      <div style={{maxWidth:1100,margin:"0 auto",display:"flex",alignItems:"center",gap:48,position:"relative",zIndex:1,flexWrap:"wrap"}}>
        <div style={{flex:1,minWidth:300}}>
          <div style={{background:"rgba(192,57,43,0.15)",border:"1px solid rgba(192,57,43,0.3)",borderRadius:20,padding:"4px 14px",display:"inline-block",marginBottom:18,fontSize:14,color:C.accent,fontWeight:500}}>✨ First design includes a sew-out proof</div>
          <h1 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:44,fontWeight:700,color:C.white,lineHeight:1.15,margin:"0 0 18px"}}>Your digitizer sends<br/>a mock-up.<br/><span style={{color:C.accent}}>We send you a sew-out.</span></h1>
          <p style={{fontSize:17,color:C.textMuted,lineHeight:1.7,margin:"0 0 28px",maxWidth:520}}>Because a cheap file isn't cheap if it ruins a <strong style={{color:C.white}}>$60 Carhartt jacket</strong>. We test designs on commercial machines so you don't lose $75, miss a deadline, or lose a client. <strong style={{color:C.white}}>Flat-rate pricing. No per-stitch surprises.</strong></p>
          <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
            <button onClick={onChat} style={{background:C.accent,color:C.dark,border:"none",borderRadius:8,padding:"14px 28px",fontSize:16,fontWeight:700,cursor:"pointer",fontFamily:"'Space Grotesk',sans-serif"}}>Get Started — Upload Your Design</button>
            <button onClick={onChat} style={{background:"transparent",color:C.white,border:"2px solid rgba(255,255,255,0.2)",borderRadius:8,padding:"14px 22px",fontSize:16,fontWeight:500,cursor:"pointer"}}>Get a Free Quote</button>
          </div>
        </div>
        <div style={{flex:"0 0 340px",display:"flex",flexDirection:"column",gap:12}}>
          {[{i:"🧪",t:"Tested on Fabric",d:"Dedicated testing facility with commercial machines"},{i:"💰",t:"Fixed Pricing",d:"Left chest from $15. No per-stitch games."},{i:"⚡",t:"Fast Turnaround",d:"1-2 days standard. Express next-day available."},{i:"🎯",t:"Full Service",d:"Digitizing • Vector • Patches • Badges"}].map((x,i)=>
            <div key={i} style={{background:"rgba(255,255,255,0.05)",borderRadius:12,padding:"14px 18px",display:"flex",gap:12,alignItems:"center",border:"1px solid rgba(255,255,255,0.08)"}}>
              <span style={{fontSize:26}}>{x.i}</span><div><div style={{color:C.white,fontWeight:600,fontSize:16}}>{x.t}</div><div style={{color:C.textMuted,fontSize:14}}>{x.d}</div></div>
            </div>
          )}
        </div>
      </div>
    </section>
    <div style={{background:C.sectionBg,padding:"22px 32px",display:"flex",justifyContent:"center",gap:40,flexWrap:"wrap",borderBottom:"1px solid #e8dcc8"}}>
      {[{n:"30+",l:"Years Experience"},{n:"1M+",l:"Designs Delivered"},{n:"1000s",l:"Companies Served"},{n:"$15",l:"From per Design"}].map((x,i)=><div key={i} style={{textAlign:"center"}}><div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:26,fontWeight:700,color:C.primary}}>{x.n}</div><div style={{fontSize:14,color:"#666",fontWeight:500}}>{x.l}</div></div>)}
    </div>
    <S><ST sub="One partner for all your embroidery and artwork needs">Everything Under One Roof</ST>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24}}>
        {[{t:"Embroidery Digitizing",d:"Hand-digitized in Wilcom. Tested on commercial machines. From $15.",img:"3D Puff Cap Sew-out",pg:"digitizing"},{t:"Artwork Services",d:"DTF optimized, vinyl cut paths, laser-tested hard goods. From $7/hr.",img:"DTF Optimized Artwork",pg:"artwork"},{t:"Badges, Patches & Pins",d:"Embroidered, woven, chenille, bullion, PVC, silicone, enamel pins, keyrings and more. UK manufacturing partners.",img:"Custom Embroidered Patch",pg:"patches"}].map((s,i)=>
          <div key={i} onClick={()=>setPage(s.pg)} style={{background:C.white,borderRadius:16,overflow:"hidden",cursor:"pointer",border:"1px solid #e5e7eb",transition:"transform 0.2s"}} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-4px)"} onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
            <Img label={s.img} h={170}/><div style={{padding:"22px"}}><h3 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:19,fontWeight:700,color:C.dark,margin:"0 0 8px"}}>{s.t}</h3><p style={{fontSize:16,color:"#555",lineHeight:1.6,margin:0}}>{s.d}</p></div>
          </div>
        )}
      </div>
    </S>
    <S bg="#f7f8fa"><ST sub="We don't just click auto-digitize. We perfect the pathing, underlay, and pull compensation for your specific fabric.">From Screen to Machine</ST>
      <div style={{display:"grid",gridTemplateColumns:"1fr 60px 1fr",gap:0,alignItems:"center"}}>
        <div style={{background:C.white,borderRadius:14,overflow:"hidden",border:"1px solid #e5e7eb"}}><Img label="Digital Wireframe File" h={200}/><div style={{padding:"18px",textAlign:"center"}}><div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:17,fontWeight:700,color:C.dark}}>Screen Mock-up</div><div style={{fontSize:15,color:"#888",marginTop:4}}>Looks great on your monitor...</div></div></div>
        <div style={{textAlign:"center"}}><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></div>
        <div style={{background:C.white,borderRadius:14,overflow:"hidden",border:`2px solid ${C.primary}`}}><Img label="Physical Sew-out" h={200}/><div style={{padding:"18px",textAlign:"center"}}><div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:17,fontWeight:700,color:C.primary}}>Tested on Fabric</div><div style={{fontSize:15,color:"#888",marginTop:4}}>...but does it sew? We make sure it does.</div></div></div>
      </div>
    </S>
    <section style={{background:C.dark,padding:"72px 32px"}}><div style={{maxWidth:800,margin:"0 auto",textAlign:"center"}}>
      <h2 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:36,fontWeight:700,color:C.accent,margin:"0 0 20px"}}>Are you paying twice?</h2>
      <p style={{fontSize:17,color:"rgba(255,255,255,0.6)",lineHeight:1.8,margin:"0 0 20px"}}>A cheap digitizing file doesn't just cost you the file price. It costs you machine downtime, thread breaks, and ruined garments.</p>
      <p style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:22,fontWeight:700,color:C.white,margin:"0 0 20px"}}>$8 <span style={{color:"rgba(255,255,255,0.4)",fontWeight:400,fontSize:17}}>(bargain file)</span> + $60 <span style={{color:"rgba(255,255,255,0.4)",fontWeight:400,fontSize:17}}>(ruined jacket)</span> = <span style={{color:C.accent}}>$68 lesson learned.</span></p>
      <p style={{fontSize:17,color:"rgba(255,255,255,0.6)",lineHeight:1.8,margin:"0 0 32px"}}>Stop crossing your fingers when you press start. Get files tested on real fabric, for a flat rate, and get it right the first time.</p>
      <button onClick={onChat} style={{background:C.primary,color:C.white,border:"none",borderRadius:8,padding:"14px 36px",fontSize:16,fontWeight:700,cursor:"pointer"}}>Upload Your Design Now</button>
    </div></section>
  </>;
}

// ═══════════════════════════════════════
// PAGE: DIGITIZING
// ═══════════════════════════════════════
function DigiPage({onChat,setPage}){
  return <>
    <PH title="Embroidery Digitizing" sub="Hand-digitized. Tested on commercial machines. Delivered with a sew-out proof." bc="Embroidery Digitizing" setPage={setPage}/>
    <S><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:40,alignItems:"center"}}>
      <div>
        <h2 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:26,fontWeight:700,color:C.dark,margin:"0 0 14px"}}>Your digitizer sends a mock-up. We send you a sew-out.</h2>
        <p style={{fontSize:16,color:"#555",lineHeight:1.7,margin:"0 0 16px"}}>Every design is manually digitized in Wilcom by experienced punchers. No auto-punch. Optimized pathing, proper underlay, and pull compensation tuned to your fabric. Then we test it on commercial Barudan and Happy machines — including older models.</p>
        <p style={{fontSize:16,color:"#555",lineHeight:1.7,margin:"0 0 20px"}}>If something won't work — text too small, detail too fine, wrong stitch type — we tell you before it becomes your problem and suggest alternatives with a mock-up for approval.</p>
        <button onClick={onChat} style={{background:C.primary,color:C.white,border:"none",borderRadius:8,padding:"12px 24px",fontSize:16,fontWeight:700,cursor:"pointer"}}>Upload Your Design</button>
      </div>
      <Img label="Sew-out proof on fabric" h={340}/>
    </div></S>
    <S bg="#f7f8fa"><ST sub="We know what makes a file run clean — because we test it before you do.">What Makes Our Digitizing Different</ST>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
        {[{t:"Manual Digitizing",d:"Every file hand-built by skilled punchers. Auto-punch can't replicate 30+ years of experience."},{t:"Sew-Out Tested",d:"Tested on commercial machines. Scanned sew-out proofs on real fabric — not screen renderings."},{t:"Machine Compatibility",d:"Tested on modern and older machines. Your file will run clean on 20-year-old Barudans."},{t:"Small Text Specialists",d:"Optimized for 60wt threads. If it can't go small enough, we offer alternative layouts."},{t:"3D Puff Expertise",d:"Multi-layer foam-on-foam. We understand the physics and test before delivery."},{t:"Minimum Trims",d:"Path-optimized to minimize thread breaks, jump stitches, and color changes."}].map((x,i)=>
          <div key={i} style={{background:C.white,borderRadius:12,padding:"24px 20px",border:"1px solid #e5e7eb"}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><Chk/><h3 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:17,fontWeight:700,color:C.dark,margin:0}}>{x.t}</h3></div><p style={{fontSize:15,color:"#555",lineHeight:1.6,margin:0}}>{x.d}</p></div>
        )}
      </div>
    </S>
    <S><ST sub="Simple, transparent, flat-rate pricing. No per-stitch surprises.">Digitizing Pricing</ST>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
        {[{tier:"Simple Left Chest",price:"$15",note:"95% of designs • 1-2 days",features:["Hand-digitized in Wilcom","Sew-out tested","All formats included","Free edits"],hl:false},{tier:"Complex Left Chest",price:"$25",note:"Fine detail • 1-2 days",features:["Extra detail optimization","Small text handling","Multi-layer work","All formats included"],hl:true},{tier:"Back Design",price:"$35",note:"Simple • 1-2 days",features:["Large format","Multiple sizes","Production-ready","All formats included"],hl:false}].map((p,i)=>
          <div key={i} style={{background:p.hl?C.primary:"#fff",borderRadius:14,padding:"28px 24px",border:p.hl?"none":"1px solid #e5e7eb",textAlign:"center",position:"relative"}}>
            {p.hl&&<div style={{position:"absolute",top:-11,left:"50%",transform:"translateX(-50%)",background:C.accent,color:C.dark,fontSize:13,fontWeight:700,padding:"3px 14px",borderRadius:16}}>Most Popular</div>}
            <div style={{fontSize:15,fontWeight:600,color:p.hl?"rgba(255,255,255,0.7)":"#888",marginBottom:6}}>{p.tier}</div>
            <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:38,fontWeight:700,color:p.hl?C.white:C.dark}}>{p.price}</div>
            <div style={{fontSize:14,color:p.hl?C.accent:"#888",marginBottom:16,fontWeight:600}}>{p.note}</div>
            {p.features.map((f,fi)=><div key={fi} style={{fontSize:15,color:p.hl?"rgba(255,255,255,0.8)":"#555",padding:"7px 0",borderTop:`1px solid ${p.hl?"rgba(255,255,255,0.1)":"#f0f0f0"}`}}>{f}</div>)}
            <button onClick={onChat} style={{marginTop:16,width:"100%",background:p.hl?C.accent:C.primary,color:p.hl?C.dark:C.white,border:"none",borderRadius:8,padding:"11px",fontSize:15,fontWeight:700,cursor:"pointer"}}>Get Started</button>
          </div>
        )}
      </div>
      <div style={{background:C.sectionBg,borderRadius:12,padding:"24px 28px",marginTop:32,textAlign:"center"}}>
        <span style={{fontWeight:700,color:C.primary,fontSize:17}}>🎉 New customers: 50% off your first 2 designs!</span><span style={{color:"#666",fontSize:16,marginLeft:8}}>That's a simple left chest from just $7.50.</span>
      </div>
    </S>
    <S bg="#f7f8fa"><ST>Formats We Deliver</ST>
      <p style={{fontSize:16,color:"#555",lineHeight:1.7,marginBottom:20}}>Digitized in <strong>Wilcom</strong> (preferred). Also support Pulse, Melco, Compucon. Delivered in any format your machine needs:</p>
      <div style={{display:"flex",flexWrap:"wrap",gap:8}}>{["DST","PES","JEF","EXP","VP3","HUS","XXX","SEW","PCS","EMB","ART","TAP","BRO","Other"].map(f=><span key={f} style={{background:C.white,border:"1px solid #e5e7eb",borderRadius:8,padding:"7px 14px",fontSize:15,color:C.dark,fontWeight:500}}>{f}</span>)}</div>
      <p style={{fontSize:15,color:"#888",marginTop:14}}>Not sure? Tell us your machine brand — we'll figure it out. Most machines use DST. Brother uses PES.</p>
    </S>
    <CTA onChat={onChat} title="Ready to get your design digitized?" desc="Upload your artwork and get a quote in minutes. First design includes a sew-out proof."/>
  </>;
}

// ═══════════════════════════════════════
// PAGE: VECTOR ARTWORK
// ═══════════════════════════════════════
function ArtworkPage({onChat,setPage}){
  return <>
    <PH title="Artwork Services" sub="Optimized for how print actually works today. Not just vectorizing everything — the right treatment for each output." bc="Artwork" setPage={setPage}/>
    <S><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:40,alignItems:"center"}}>
      <div>
        <h2 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:26,fontWeight:700,color:C.dark,margin:"0 0 14px"}}>Artwork prepared for production. Not just traced.</h2>
        <p style={{fontSize:16,color:"#555",lineHeight:1.7,margin:"0 0 16px"}}>Most artwork services will vectorize everything. That's not always what you need — and for DTF, it's often the wrong call entirely. We look at what you're printing on, what machine you're running, and what actually needs to be sharp. Then we optimize for that, not for a format checkbox.</p>
        <p style={{fontSize:16,color:"#555",lineHeight:1.7,margin:"0 0 20px"}}>The result is a file that runs cleanly on your equipment — not just a file that opens in Illustrator.</p>
        <div style={{display:"flex",alignItems:"center",gap:16}}><span style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:34,fontWeight:700,color:C.primary}}>$7<span style={{fontSize:17,color:"#888"}}>/hr</span></span><button onClick={onChat} style={{background:C.primary,color:C.white,border:"none",borderRadius:8,padding:"12px 24px",fontSize:16,fontWeight:700,cursor:"pointer"}}>Get a Quote</button></div>
      </div>
      <Img label="Artwork Optimization Example" h={340}/>
    </div></S>

    <S bg="#f7f8fa">
      <ST sub="Different outputs need different treatment. Here's how we approach each one.">What We Do & For What</ST>

      {/* BIG FEATURED CARD — DTF */}
      <div style={{background:`linear-gradient(135deg,${C.dark} 0%,#1a1a2e 100%)`,borderRadius:18,padding:"36px 40px",marginBottom:20,border:`1px solid rgba(192,57,43,0.3)`}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:32,alignItems:"center"}}>
          <div>
            <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(192,57,43,0.2)",border:"1px solid rgba(192,57,43,0.4)",borderRadius:20,padding:"5px 14px",marginBottom:16}}>
              <span style={{width:8,height:8,borderRadius:"50%",background:C.accent,display:"inline-block"}}/>
              <span style={{fontSize:13,color:C.accent,fontWeight:700,letterSpacing:"0.05em"}}>THE INDUSTRY HAS CHANGED</span>
            </div>
            <h3 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:26,fontWeight:700,color:C.white,margin:"0 0 14px",lineHeight:1.25}}>DTF Optimized Artwork</h3>
            <p style={{fontSize:16,color:"rgba(255,255,255,0.7)",lineHeight:1.7,margin:"0 0 14px"}}>DTF doesn't require 100% vector artwork anymore — and that's changed everything. A full re-vector of a complex logo often does more harm than good, destroying the subtle gradients and photographic qualities that make the design look right on film.</p>
            <p style={{fontSize:16,color:"rgba(255,255,255,0.7)",lineHeight:1.7,margin:"0 0 20px"}}>What DTF <em style={{color:C.white}}>does</em> need is a clean outer border and crisp small text. We selectively vectorize exactly those elements — the edge path and any fine text — while keeping the rest of the artwork as high-res raster. The result prints sharper, with better color fidelity, than a fully-vectorized file.</p>
            <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
              {["Selective edge vectorizing","Small text sharpened","Gradients preserved","High-res PNG or PDF output"].map((f,i)=>
                <span key={i} style={{background:"rgba(255,255,255,0.08)",color:"rgba(255,255,255,0.8)",fontSize:13,fontWeight:500,padding:"5px 12px",borderRadius:20,border:"1px solid rgba(255,255,255,0.12)"}}>{f}</span>
              )}
            </div>
          </div>
          <div style={{background:"rgba(255,255,255,0.04)",borderRadius:14,padding:"28px",border:"1px solid rgba(255,255,255,0.08)"}}>
            <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:15,fontWeight:700,color:C.accent,marginBottom:16}}>Why not just vectorize everything?</div>
            {[
              {q:"Complex logo with gradients",old:"Full re-vector flattens the depth",better:"Raster body + vectorized border edge"},
              {q:"Fine text at small sizes",old:"Raster text goes soft on film",better:"Vectorized text only — everything else stays raster"},
              {q:"Photographic or illustrated artwork",old:"Auto-trace destroys the detail",better:"Optimized high-res raster, no trace needed"},
            ].map((r,i)=><div key={i} style={{borderBottom:i<2?"1px solid rgba(255,255,255,0.06)":"none",paddingBottom:i<2?14:0,marginBottom:i<2?14:0}}>
              <div style={{fontSize:14,fontWeight:600,color:C.white,marginBottom:6}}>{r.q}</div>
              <div style={{display:"flex",flexDirection:"column",gap:4}}>
                <div style={{fontSize:13,color:"rgba(255,255,255,0.4)"}}>✗ {r.old}</div>
                <div style={{fontSize:13,color:"#86efac"}}>✓ {r.better}</div>
              </div>
            </div>)}
          </div>
        </div>
      </div>

      {/* TWO SMALLER CARDS */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
        <div style={{background:C.white,borderRadius:14,padding:"28px",border:"1px solid #e5e7eb"}}>
          <div style={{fontSize:28,marginBottom:12}}>✂️</div>
          <h3 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:19,fontWeight:700,color:C.dark,margin:"0 0 10px"}}>Vinyl Cutting</h3>
          <p style={{fontSize:15,color:"#555",lineHeight:1.6,margin:"0 0 14px"}}>Clean cut paths with properly optimized nodes — no stray points, no overlapping paths. We embed the cut path as a spot color layer in green or magenta, whichever your cutter or RIP software expects. Ready to load and cut without cleanup.</p>
          <div style={{borderTop:"1px solid #f0f0f0",paddingTop:14,display:"flex",gap:8,flexWrap:"wrap"}}>
            {["Cut path in green or magenta","Clean node optimization","AI, EPS, SVG"].map((f,i)=><span key={i} style={{background:"#f7f8fa",color:"#555",fontSize:13,padding:"4px 10px",borderRadius:16,border:"1px solid #e5e7eb"}}>{f}</span>)}
          </div>
        </div>
        <div style={{background:C.white,borderRadius:14,padding:"28px",border:"1px solid #e5e7eb"}}>
          <div style={{fontSize:28,marginBottom:12}}>🔆</div>
          <h3 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:19,fontWeight:700,color:C.dark,margin:"0 0 10px"}}>Hard Goods & Specialty</h3>
          <p style={{fontSize:15,color:"#555",lineHeight:1.6,margin:"0 0 14px"}}>Engraving, signage, promo items, and laser applications. We have a <strong>laser machine in-house</strong> — so we don't just format files to spec, we test them. If an engraving path has an issue, we catch it before it reaches your machine or your client's job.</p>
          <div style={{borderTop:"1px solid #f0f0f0",paddingTop:14,display:"flex",gap:8,flexWrap:"wrap"}}>
            {["Laser-tested in house","AI, SVG, PDF, CDR","Engraving & signage ready"].map((f,i)=><span key={i} style={{background:"#f7f8fa",color:"#555",fontSize:13,padding:"4px 10px",borderRadius:16,border:"1px solid #e5e7eb"}}>{f}</span>)}
          </div>
        </div>
      </div>
    </S>
    <CTA onChat={onChat} title="Need artwork prepared?" desc="Send us your file and tell us what it's for. From $7/hr."/>
  </>;
}

// ═══════════════════════════════════════
// PAGE: PRICING
// ═══════════════════════════════════════
function PricingPage({onChat}){
  return <>
    <PH title="Pricing" sub="Transparent, flat-rate pricing. No per-stitch fees. No hidden charges."/>
    <S><ST sub="All prices are flat rates. 95% of designs fall in the Simple category.">Embroidery Digitizing</ST>
      <div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontSize:15}}>
        <thead><tr style={{background:C.dark}}>{["Design Type","Standard (1-2 Days)","Express (Next-Day)"].map(h=><th key={h} style={{color:C.white,padding:"12px 18px",textAlign:"left",fontWeight:600}}>{h}</th>)}</tr></thead>
        <tbody>{[{t:"Left Chest — Simple (95%)",a:"$15",b:"$19"},{t:"Left Chest — Complex",a:"$25",b:"$30"},{t:"Left Chest — Ultra Tough",a:"Quote",b:"Quote"},{t:"Cap / Hat — Simple",a:"$20",b:"$24"},{t:"Cap / Hat — Complex",a:"$30",b:"$35"},{t:"Back Design — Simple",a:"$35",b:"$45"},{t:"Back Design — Complex",a:"$50",b:"$60"},{t:"Back Design — Ultra Tough",a:"Quote",b:"Quote"},{t:"Edit / Resize (all plans)",a:"$10",b:"$10"}].map((r,i)=>
          <tr key={i} style={{background:i%2===0?"#fafafa":"#fff",borderBottom:"1px solid #eee"}}><td style={{padding:"12px 18px",fontWeight:500,color:C.dark}}>{r.t}</td><td style={{padding:"12px 18px",color:"#555"}}>{r.a}</td><td style={{padding:"12px 18px",color:C.primary,fontWeight:600}}>{r.b}</td></tr>
        )}</tbody>
      </table></div>
      <p style={{fontSize:15,color:"#888",marginTop:14,fontStyle:"italic"}}>Ultra Tough designs include highly complex artwork with extreme detail. We always quote these individually so there are no surprises.</p>
    </S>
    <S bg="#f7f8fa"><ST>Vector Artwork</ST>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
        <div style={{background:C.white,borderRadius:12,padding:"28px",border:"1px solid #e5e7eb",textAlign:"center"}}><div style={{fontSize:15,color:"#888",marginBottom:6}}>Standard Vectoring</div><div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:38,fontWeight:700,color:C.dark}}>$7<span style={{fontSize:17,color:"#888"}}>/hr</span></div><p style={{fontSize:15,color:"#555",marginTop:10}}>Full vector rebuild. All formats included.</p></div>
        <div style={{background:C.white,borderRadius:12,padding:"28px",border:"1px solid #e5e7eb",textAlign:"center"}}><div style={{fontSize:15,color:"#888",marginBottom:6}}>Simple Logo Trace</div><div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:38,fontWeight:700,color:C.dark}}>$15<span style={{fontSize:17,color:"#888"}}> flat</span></div><p style={{fontSize:15,color:"#555",marginTop:10}}>Basic 1-3 color logo vectorization.</p></div>
      </div>
    </S>
    <S><ST>What's Included — Every Time</ST>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>{["All file formats","Free edits","Sew-out testing","No per-stitch pricing","Dedicated digitizer for Pro Partners","30-day file storage"].map((f,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"14px",background:"#fafafa",borderRadius:10}}><Chk/><span style={{fontSize:15,color:C.dark,fontWeight:500}}>{f}</span></div>)}</div>
    </S>
    <S bg={C.sectionBg} py={56}><div style={{textAlign:"center"}}>
      <div style={{background:C.primary,color:C.white,display:"inline-block",padding:"5px 18px",borderRadius:20,fontSize:14,fontWeight:700,marginBottom:14}}>🎉 New Customer Offer</div>
      <h2 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:28,fontWeight:700,color:C.dark,margin:"0 0 10px"}}>50% Off Your First 2 Designs</h2>
      <p style={{fontSize:17,color:"#555",margin:"0 0 6px"}}>Simple left chest from just <strong>$7.50</strong>. Sew-out tested. All formats.</p>
      <p style={{fontSize:15,color:"#888",margin:"0 0 20px"}}>New customers only. First 2 orders. Discount applied automatically.</p>
      <button onClick={onChat} style={{background:C.primary,color:C.white,border:"none",borderRadius:8,padding:"12px 28px",fontSize:16,fontWeight:700,cursor:"pointer"}}>Get Your First Design — 50% Off</button>
    </div></S>
  </>;
}

// ═══════════════════════════════════════
// PAGE: HOW WE TEST
// ═══════════════════════════════════════
function TestPage({onChat,setPage}){
  return <>
    <PH title="How We Test" sub="Most digitizers send a screen rendering. We send a scan of the actual sew-out." bc="How We Test" setPage={setPage}/>
    <S><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:40,alignItems:"center"}}>
      <div>
        <h2 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:26,fontWeight:700,color:C.dark,margin:"0 0 14px"}}>Tested on Fabric. Not on Screen.</h2>
        <p style={{fontSize:16,color:"#555",lineHeight:1.7,margin:"0 0 16px"}}>Our testing facility has commercial Barudan and Happy machines — modern and older models. We test across the full range of equipment that real shops use.</p>
        <p style={{fontSize:16,color:"#555",lineHeight:1.7}}>When we're not confident a design will run cleanly, we stitch it out on real fabric, scan it, and send you the proof. That's thread on fabric — not a screen rendering.</p>
      </div>
      <Img label="Testing Facility — Machine Running" h={340}/>
    </div></S>
    <S bg="#f7f8fa"><ST>Our Testing Process</ST>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16}}>
        {[{s:"1",t:"Digitize",d:"Manually digitized in Wilcom. Pathing, underlay, pull compensation optimized."},{s:"2",t:"Review",d:"Checked for small text, color changes, stitch density, fabric compatibility."},{s:"3",t:"Test",d:"Stitched out on commercial machine. Thread tension, registration, finish checked."},{s:"4",t:"Deliver",d:"Tested file delivered with scanned sew-out proof. Issues flagged with alternatives."}].map((x,i)=>
          <div key={i} style={{textAlign:"center"}}><div style={{width:48,height:48,borderRadius:"50%",background:C.primary,color:C.white,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px",fontFamily:"'Space Grotesk',sans-serif",fontSize:22,fontWeight:700}}>{x.s}</div><h3 style={{fontSize:17,fontWeight:700,color:C.dark,margin:"0 0 6px"}}>{x.t}</h3><p style={{fontSize:15,color:"#555",lineHeight:1.5}}>{x.d}</p></div>
        )}
      </div>
    </S>
    <S><ST sub="If we spot a problem, we tell you before it becomes your problem.">We'll Tell You If Something's Wrong</ST>
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:20}}>
        {[{t:"Text too small?",d:"We'll offer alternative layouts with a graphic mock-up for your approval."},{t:"Detail too fine?",d:"We flag what can't be faithfully embroidered and suggest simplifications."},{t:"Wrong stitch type?",d:"We optimize satin, fill, and running stitches for the best result on your fabric."},{t:"Machine compatibility?",d:"We adjust for older machines that can't handle certain densities or paths."}].map((x,i)=>
          <div key={i} style={{background:"#fafafa",borderRadius:12,padding:"24px",borderLeft:`4px solid ${C.primary}`}}><h3 style={{fontSize:17,fontWeight:700,color:C.dark,margin:"0 0 6px"}}>{x.t}</h3><p style={{fontSize:15,color:"#555",lineHeight:1.6,margin:0}}>{x.d}</p></div>
        )}
      </div>
    </S>
    <CTA onChat={onChat} title="See the difference testing makes" desc="Upload your design and experience sew-out tested quality."/>
  </>;
}

// ═══════════════════════════════════════
// PAGE: PATCHES & BADGES
// ═══════════════════════════════════════
function PatchCard({t,d,img,moq,size,lead,bg=C.white}){
  return <div style={{background:bg,borderRadius:14,overflow:"hidden",border:"1px solid #e5e7eb",display:"flex",flexDirection:"column"}}>
    <Img label={img} h={150}/>
    <div style={{padding:"18px 20px",flex:1,display:"flex",flexDirection:"column"}}>
      <h3 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:17,fontWeight:700,color:C.dark,margin:"0 0 7px"}}>{t}</h3>
      <p style={{fontSize:14,color:"#555",lineHeight:1.6,margin:"0 0 12px",flex:1}}>{d}</p>
      <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
        {moq&&<span style={{fontSize:12,color:C.primary,fontWeight:600,background:"#fef2f2",borderRadius:4,padding:"2px 8px"}}>MOQ {moq}</span>}
        {size&&<span style={{fontSize:12,color:"#555",background:"#f1f5f9",borderRadius:4,padding:"2px 8px"}}>{size}</span>}
        {lead&&<span style={{fontSize:12,color:"#555",background:"#f1f5f9",borderRadius:4,padding:"2px 8px"}}>⏱ {lead}</span>}
      </div>
    </div>
  </div>;
}

function PatchSectionCTA({onChat}){
  return <div style={{textAlign:"center",padding:"32px 0 8px"}}>
    <a href="https://usabadge.com" target="_blank" rel="noopener noreferrer" style={{display:"inline-block",background:C.primary,color:C.white,borderRadius:8,padding:"12px 28px",fontSize:15,fontWeight:700,textDecoration:"none",marginRight:12}}>Order at USABadge.com →</a>
    <button onClick={onChat} style={{background:"transparent",color:C.primary,border:`2px solid ${C.primary}`,borderRadius:8,padding:"11px 24px",fontSize:15,fontWeight:700,cursor:"pointer"}}>Get a Quote</button>
  </div>;
}

function PatchesPage({setPage,onChat}){
  return <>
    <PH title="Badges, Patches, Keyrings & Pins" sub="Every badge and patch type from one partner. Cloth, silicone, PVC, enamel, and more." bc="Patches & Badges" setPage={setPage}/>

    {/* INTRO */}
    <S><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:40,alignItems:"center"}}>
      <div>
        <h2 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:26,fontWeight:700,color:C.dark,margin:"0 0 14px"}}>Every Badge Type. One Partner.</h2>
        <p style={{fontSize:16,color:"#555",lineHeight:1.7,margin:"0 0 16px"}}>From classic embroidered cloth badges to bullion, enamel pins, PVC, faux leather, and silicone — we produce them all to your exact specifications. Every order is priced individually based on size, type, quantity, and complexity.</p>
        <p style={{fontSize:16,color:"#555",lineHeight:1.7,margin:"0 0 24px"}}>Get a quote through the form or visit our dedicated badge ordering site for instant pricing and ordering.</p>
        <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
          <a href="https://usabadge.com" target="_blank" rel="noopener noreferrer" style={{display:"inline-block",background:C.primary,color:C.white,border:"none",borderRadius:8,padding:"13px 24px",fontSize:15,fontWeight:700,cursor:"pointer",textDecoration:"none"}}>Order at USABadge.com →</a>
          <button onClick={onChat} style={{background:"transparent",color:C.primary,border:`2px solid ${C.primary}`,borderRadius:8,padding:"12px 20px",fontSize:15,fontWeight:700,cursor:"pointer"}}>Get a Quote</button>
        </div>
      </div>
      <Img label="Badge & Patch Collection" h={320}/>
    </div></S>

    {/* FACTORY INVESTMENT */}
    <S bg={C.dark}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:48,alignItems:"center"}}>
        <div>
          <div style={{display:"inline-block",background:"rgba(212,160,60,0.15)",border:"1px solid rgba(212,160,60,0.3)",borderRadius:6,padding:"4px 12px",fontSize:13,color:C.accent,fontWeight:600,marginBottom:16}}>WHY IT MATTERS</div>
          <h2 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:26,fontWeight:700,color:C.white,margin:"0 0 16px",lineHeight:1.25}}>We don't just source patches. We have a direct investment in our manufacturing partners.</h2>
          <p style={{fontSize:16,color:"rgba(255,255,255,0.65)",lineHeight:1.7,margin:"0 0 14px"}}>Most badge services are pure middlemen — they take your order, send it to whoever is cheapest that week, and hope for the best.</p>
          <p style={{fontSize:16,color:"rgba(255,255,255,0.65)",lineHeight:1.7,margin:0}}>We have a direct investment in our manufacturing partners, primarily based in the UK. That means real visibility into production, consistent quality standards, and the ability to push back when something isn't right — before it ships to you.</p>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {[{i:"🏭",t:"Invested in manufacturing",d:"Direct stake in our primary production partners — not sourcing from the cheapest supplier available this week."},{i:"🇬🇧",t:"Primarily UK-based",d:"Main manufacturing partners in the UK, with broader production capacity worldwide."},{i:"🔍",t:"Real quality visibility",d:"We can inspect, push back, and hold standards — because we have skin in the game, not just a purchase order."},{i:"📋",t:"Consistent output",d:"Same factories, same standards, same people. Your 500th order looks like your first."}].map((x,i)=>
            <div key={i} style={{background:"rgba(255,255,255,0.05)",borderRadius:12,padding:"16px 18px",display:"flex",gap:14,alignItems:"flex-start",border:"1px solid rgba(255,255,255,0.08)"}}>
              <span style={{fontSize:22,flexShrink:0}}>{x.i}</span>
              <div><div style={{color:C.white,fontWeight:600,fontSize:15,marginBottom:3}}>{x.t}</div><div style={{color:"rgba(255,255,255,0.5)",fontSize:14,lineHeight:1.5}}>{x.d}</div></div>
            </div>
          )}
        </div>
      </div>
    </S>

    {/* EMBROIDERED BADGES */}
    <S bg="#f7f8fa">
      <ST sub="Thread-based badges in every style — from standard embroidered to 3D puff, chenille, and bullion.">Embroidered Badges</ST>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
        <PatchCard t="Embroidered Badges" d="Classic raised-thread badges. Merrowed or satin edge. Metallic threads available. Merrow border, heat-seal, iron-on, or non-woven backing." img="Embroidered Badge" moq="25 pcs" size="25–229mm" lead="7–9 BD"/>
        <PatchCard t="Embroidered 3D Puff Badges" d="Multi-layer foam construction for a bold raised effect. Best with clean, bold designs. Metallic threads and button loop upgrades available." img="3D Puff Badge" moq="25 pcs" size="10–350mm" lead="7–12 BD"/>
        <PatchCard t="Embroidered Chenille Badges" d="Thick, fluffy chenille texture on felt backing. Synonymous with varsity and letterman styles. Satin edge finish." img="Chenille Badge" moq="25 pcs" size="50–400mm" lead="15–20 BD"/>
        <PatchCard t="Faux Chenille Badges" d="The chenille look without the bulk. Woven twill construction with a chenille-style finish. Heat-seal backing available." img="Faux Chenille Badge" moq="25 pcs" size="10–150mm" lead="14–21 BD"/>
        <PatchCard t="Bullion Badges" d="Premium metallic wire embroidery on felt. A classic military and ceremonial badge style. Gold and silver bullion wire." img="Bullion Badge" moq="10 pcs" size="25–150mm" lead="21–28 BD"/>
        <PatchCard t="Subli-Stitch Badges" d="Hybrid stitch-and-sublimation technique. Sharp photo-realistic detail with the texture of embroidery. Satin edge." img="Subli-Stitch Badge" moq="25 pcs" size="50–360mm" lead="7–9 BD"/>
      </div>
      <PatchSectionCTA onChat={onChat}/>
    </S>

    {/* WOVEN & PRINTED */}
    <S>
      <ST sub="Flat-finish badges with fine detail capability — ideal for complex artwork and small text.">Woven & Printed Badges</ST>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
        <PatchCard t="Woven Badges" d="Dense thread weave produces a flat, smooth finish with exceptional detail. Finer text and sharper edges than embroidered. Merrow or satin border." img="Woven Badge" moq="10 pcs" size="25–190mm" lead="14–21 BD"/>
        <PatchCard t="Printed Badges" d="Full-color CMYK fabric print. Ideal for gradients, photographic artwork, and complex multi-color designs. Velcro, iron-on, or satin backing." img="Printed Badge" moq="25 pcs" size="51–229mm" lead="7–9 BD"/>
        <PatchCard t="Woven Labels" d="Center-fold or straight-cut woven labels. Metallic threads available. Heat-seal backing. Ideal for garment branding and care labels." img="Woven Label" moq="100 pcs" size="10–100mm" lead="10–14 BD"/>
      </div>
      <PatchSectionCTA onChat={onChat}/>
    </S>

    {/* SPECIALIST MATERIALS */}
    <S bg="#f7f8fa">
      <ST sub="Premium and specialist badge materials for high-end branding, tactical, and fashion applications.">Specialist Material Badges</ST>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
        <PatchCard t="PVC Badges" d="Rigid molded rubber badges. Waterproof and highly durable. Sewing channel or heat-seal backing. Ideal for tactical, outdoor, and uniform applications." img="PVC Badge" moq="100 pcs" size="10–250mm" lead="15–21 BD"/>
        <PatchCard t="3D Silicone Badges" d="Fully flexible silicone in any shape. Soft to the touch, waterproof, and washable. Appliqué finish available. Premium sportswear and fashion branding." img="3D Silicone Badge" moq="100 pcs" size="10–300mm" lead="10–14 BD"/>
        <PatchCard t="TPU Badges" d="Thermoplastic polyurethane — lighter and more flexible than PVC. Crisp edges, full color, durable finish. Ideal for performance apparel." img="TPU Badge" moq="100 pcs" size="10–200mm" lead="14–21 BD"/>
        <PatchCard t="Faux Leather Badges" d="Faux leather with laser-engraved or printed detail. Premium feel for fashion, accessories, and corporate branding. Heat-seal backing." img="Faux Leather Badge" moq="50 pcs" size="10–127mm" lead="14–21 BD"/>
        <PatchCard t="Metaprint Badges" d="Suede or fabric base with metallic or specialty print overlay. Unique premium finish that combines texture with high-resolution colour." img="Metaprint Badge" moq="100 pcs" size="10–100mm" lead="15–21 BD"/>
        <PatchCard t="DTF Transfers" d="Direct-to-film heat-press transfers. Full color, no minimum colour restriction. Apply to virtually any garment or accessory." img="DTF Transfer Badge" moq="25 pcs" size="Up to 550mm" lead="10–12 BD"/>
      </div>
      <PatchSectionCTA onChat={onChat}/>
    </S>

    {/* ENAMEL PINS */}
    <S>
      <ST sub="Custom metal pins in hard enamel, soft enamel, and die cast. Perfect for branding, merchandise, and events.">Enamel Pins & Metal Badges</ST>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
        <PatchCard t="Soft Enamel Pins" d="Recessed enamel with raised metal outlines. Textured finish. Up to 4 colours, magnet or clutch fixing, optional epoxy dome and glitter. Gold or nickel plating." img="Soft Enamel Pin" moq="100 pcs" size="10–100mm" lead="21–28 BD"/>
        <PatchCard t="Premium Hard Enamel Pins" d="Polished flat surface with glass-smooth finish. Up to 5 colours plus glow-in-dark and glitter options. Gold plating, tie slide or clutch fixing. Backing cards available." img="Hard Enamel Pin" moq="100 pcs" size="13–50mm" lead="15–21 BD"/>
        <PatchCard t="Die Cast Hard Enamel Pins" d="Die-cast metal construction for maximum detail and durability. Antique copper or custom plating. Sequential numbering, backstamp, backing cards included." img="Die Cast Enamel Pin" moq="50 pcs" size="10–100mm" lead="15–21 BD"/>
      </div>
      <PatchSectionCTA onChat={onChat}/>
    </S>

    {/* KEYRINGS */}
    <S bg="#f7f8fa">
      <ST sub="Custom branded keyrings in embroidered, woven, PVC, and printed finishes.">Keyrings</ST>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:20}}>
        <PatchCard t="Embroidered Keyrings" d="Embroidered twill keyring, single-sided. Merrow border. Same quality as our embroidered badges in a keyring format." img="Embroidered Keyring" moq="25 pcs" size="40–150mm" lead="8–10 BD"/>
        <PatchCard t="Soft PVC Keyrings" d="Full-color molded PVC. Durable and lightweight. Great for merchandise, giveaways, and event branding." img="PVC Keyring" moq="100 pcs" size="10–100mm" lead="15–21 BD"/>
        <PatchCard t="Printed Keyrings" d="Single-sided printed keyring. High-resolution full-color print. Fast turnaround. Ideal for promotional runs and events." img="Printed Keyring" moq="25 pcs" size="10–100mm" lead="7–10 BD"/>
        <PatchCard t="Woven Keyrings" d="Dense woven finish for fine detail and sharp colours. Velcro hook backing. The woven badge format in a keyring." img="Woven Keyring" moq="25 pcs" size="10–100mm" lead="14–21 BD"/>
      </div>
      <PatchSectionCTA onChat={onChat}/>
    </S>

    {/* FINAL CTA */}
    <S><div style={{textAlign:"center",maxWidth:640,margin:"0 auto"}}>
      <h2 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:28,fontWeight:700,color:C.dark,margin:"0 0 12px"}}>Not sure which type is right for you?</h2>
      <p style={{fontSize:17,color:"#555",margin:"0 0 24px",lineHeight:1.6}}>Each badge type has different strengths — size, detail, durability, finish. Tell us what you need it for and we'll point you to the right product and get you a quote.</p>
      <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
        <button onClick={onChat} style={{background:C.primary,color:C.white,border:"none",borderRadius:8,padding:"13px 28px",fontSize:16,fontWeight:700,cursor:"pointer"}}>Get a Quote</button>
        <a href="https://usabadge.com" target="_blank" rel="noopener noreferrer" style={{display:"inline-block",background:"transparent",color:C.primary,border:`2px solid ${C.primary}`,borderRadius:8,padding:"12px 24px",fontSize:15,fontWeight:700,textDecoration:"none"}}>Order at USABadge.com →</a>
      </div>
    </div></S>
  </>;
}

// ═══════════════════════════════════════
// PAGE: GALLERY
// ═══════════════════════════════════════
function GalleryPage({setPage}){
  const items=[
    {label:"3D Puff Cap Logo",cat:"Digitizing"},{label:"Left Chest Corporate Logo",cat:"Digitizing"},{label:"Full Back Motorcycle Club",cat:"Digitizing"},
    {label:"Small Text Detail — 5mm",cat:"Digitizing"},{label:"Multi-Color Sports Crest",cat:"Digitizing"},{label:"Satin Stitch Script Font",cat:"Digitizing"},
    {label:"Screen Print Vector — 6 Colors",cat:"Artwork"},{label:"Vinyl Cut Ready Logo",cat:"Artwork"},{label:"DTG Full Color Illustration",cat:"Artwork"},
    {label:"Embroidered Patch — Fire Dept",cat:"Patches"},{label:"Chenille Varsity Letter",cat:"Patches"},{label:"PVC Tactical Patch",cat:"Patches"},
  ];
  const [filter,setFilter]=useState("All");
  const cats=["All","Digitizing","Artwork","Patches"];
  const filtered=filter==="All"?items:items.filter(x=>x.cat===filter);
  return <>
    <PH title="Gallery" sub="A selection of our work across digitizing, vector artwork, and patches." bc="Gallery" setPage={setPage}/>
    <S>
      <div style={{display:"flex",gap:10,marginBottom:32,flexWrap:"wrap"}}>
        {cats.map(c=><button key={c} onClick={()=>setFilter(c)} style={{background:filter===c?C.primary:"#f0f1f3",color:filter===c?C.white:C.dark,border:"none",borderRadius:20,padding:"8px 20px",fontSize:15,fontWeight:600,cursor:"pointer"}}>{c}</button>)}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
        {filtered.map((x,i)=>
          <div key={i} style={{borderRadius:14,overflow:"hidden",border:"1px solid #e5e7eb"}}>
            <Img label={x.label} h={200}/>
            <div style={{padding:"16px 18px"}}><div style={{fontSize:16,fontWeight:600,color:C.dark}}>{x.label}</div><div style={{fontSize:14,color:C.primary,fontWeight:500,marginTop:4}}>{x.cat}</div></div>
          </div>
        )}
      </div>
    </S>
  </>;
}

// ═══════════════════════════════════════
// PAGE: FAQ
// ═══════════════════════════════════════
function FAQPage({setPage}){
  const [open,setOpen]=useState(null);
  const faqs=[
    {q:"How much does digitizing cost?",a:"Simple left chest designs start at $15 (Standard 1-2 days) or $19 (Express next-day). Complex designs from $25. Back designs from $35. 95% of designs fall in the Simple category. New customers get 50% off their first 2 designs."},
    {q:"What file formats do you deliver?",a:"We deliver in any stitch format your machine needs — DST, PES, JEF, EXP, VP3, HUS, and 40+ others. We digitize in Wilcom (preferred) and also support Pulse, Melco, and Compucon. Not sure which format? Tell us your machine brand and we'll figure it out."},
    {q:"Do you test designs on real machines?",a:"Yes. We have a dedicated testing facility with commercial Barudan and Happy embroidery machines, including older models. When we're not confident a design will run cleanly, we stitch it out on real fabric and send you a scanned sew-out proof."},
    {q:"What is a sew-out proof?",a:"A sew-out proof is a photograph or scan of your design actually stitched onto fabric — not a screen rendering. It shows you exactly how the design will look when embroidered, including thread texture, color accuracy, and any potential issues."},
    {q:"How small can text go in embroidery?",a:"Generally 4-5mm letter height with clean results. We optimize for thin threads (60wt) for the sharpest small text. If we can't achieve legible text at your requested size, we offer alternative layouts with a mock-up for your approval."},
    {q:"What is 3D puff embroidery?",a:"3D puff uses foam underneath the stitching to create a raised, dimensional effect. It works best with bold, simple designs — fine details and small text don't work well on foam. We test every puff design to ensure the foam holds its shape."},
    {q:"What turnaround times do you offer?",a:"Standard: 1-2 business days. Express: next business day. Quotes (mock-up + stitch count) typically take 6-7 hours."},
    {q:"Can you digitize for old machines?",a:"Yes. We test on both modern and older commercial machines. If your shop runs 15-20 year old equipment, we understand its limitations and digitize accordingly — adjusting stitch density, path complexity, and format compatibility."},
    {q:"What if I'm not happy with the design?",a:"Edits are included. If the design needs changes, we revise it at no extra charge. If a fundamental redesign is needed, edit fees start at $10 flat regardless of your plan."},
    {q:"Do you store my credit card details?",a:"No. We never store your credit card information. All payments are processed through secure third-party payment processors."},
    {q:"What's the difference between simple and complex?",a:"Simple designs (95% of orders) are standard logos, text, and straightforward artwork. Complex designs have extensive fine detail, many small elements, intricate patterns, or techniques like multi-layer 3D puff. Ultra Tough designs with extreme complexity are always quoted individually."},
    {q:"Do you offer patches and badges?",a:"Yes — we produce a full range of custom patches: cloth patches (embroidered, woven, printed), silicone and PVC patches, raised silicone transfers, and custom keyrings. We have a direct investment in our manufacturing partners, primarily UK-based. Orders are placed through our partner site USABadge.com."},
    {q:"What makes your patches better than cheap alternatives?",a:"We have a direct investment in our manufacturing partners — we're not sourcing from whoever is cheapest that week. That means consistent quality standards, real production visibility, and the ability to push back when something isn't right before it ships. Premium threads, tight density, no loose ends or thin spots."},
    {q:"Are your patches responsibly sourced?",a:"Yes. Because we have a direct investment in our manufacturing partners — primarily UK-based — we have genuine visibility into how production is run, not just a supplier relationship. We're not a middleman placing orders blind."},
    {q:"What's the minimum order for patches?",a:"Minimums vary by patch type. Visit USABadge.com for current minimums and live pricing — it's all there with an instant quote tool."},
    {q:"How long does patch production take?",a:"Production time varies by patch type and quantity. Visit USABadge.com for current lead times. Rush options are available for most patch types."},
  ];
  return <>
    <PH title="Frequently Asked Questions" sub="Everything you need to know about our digitizing, artwork, and patch services." bc="FAQ" setPage={setPage}/>
    <S>
      <div style={{maxWidth:800,margin:"0 auto"}}>
        {faqs.map((f,i)=>
          <div key={i} style={{borderBottom:"1px solid #e5e7eb",padding:"20px 0"}}>
            <button onClick={()=>setOpen(open===i?null:i)} style={{background:"none",border:"none",width:"100%",textAlign:"left",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",padding:0}}>
              <span style={{fontSize:17,fontWeight:600,color:C.dark}}>{f.q}</span>
              <span style={{fontSize:22,color:C.primary,fontWeight:700,flexShrink:0,marginLeft:16}}>{open===i?"−":"+"}</span>
            </button>
            {open===i&&<p style={{fontSize:16,color:"#555",lineHeight:1.7,margin:"12px 0 0",paddingRight:40}}>{f.a}</p>}
          </div>
        )}
      </div>
    </S>
  </>;
}

// ═══════════════════════════════════════
// PAGE: PROMO
// ═══════════════════════════════════════
function PromoPage({onChat,setPage}){
  return <>
    <PH title="New Customer Offer" sub="Try us risk-free. 50% off your first 2 designs." bc="Promo" setPage={setPage}/>
    <S><div style={{textAlign:"center",maxWidth:700,margin:"0 auto"}}>
      <div style={{background:C.accent,color:C.dark,display:"inline-block",padding:"8px 24px",borderRadius:24,fontSize:18,fontWeight:700,marginBottom:24}}>50% OFF</div>
      <h2 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:36,fontWeight:700,color:C.dark,margin:"0 0 16px"}}>Half Price on Your First 2 Designs</h2>
      <p style={{fontSize:18,color:"#555",lineHeight:1.7,margin:"0 0 12px"}}>We're confident that once you see the quality, you'll stay. That's why we're offering <strong>50% off your first 2 embroidery digitizing designs</strong> — so you can experience sew-out tested quality at half the price.</p>
      <p style={{fontSize:17,color:"#888",margin:"0 0 32px"}}>No code needed. Discount applied automatically for new customers.</p>
    </div></S>
    <S bg="#f7f8fa"><ST>What You Get</ST>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
        {[{t:"Simple Left Chest",was:"$15",now:"$7.50"},{t:"Complex Left Chest",was:"$25",now:"$12.50"},{t:"Simple Back Design",was:"$35",now:"$17.50"}].map((x,i)=>
          <div key={i} style={{background:C.white,borderRadius:14,padding:"28px",border:"1px solid #e5e7eb",textAlign:"center"}}>
            <div style={{fontSize:15,color:"#888",marginBottom:8}}>{x.t}</div>
            <div style={{fontSize:16,color:"#aaa",textDecoration:"line-through",marginBottom:4}}>{x.was}</div>
            <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:38,fontWeight:700,color:C.primary}}>{x.now}</div>
            <div style={{fontSize:14,color:C.accent,fontWeight:600,marginTop:4}}>Standard 1-2 days</div>
          </div>
        )}
      </div>
    </S>
    <S><ST>How It Works</ST>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24}}>
        {[{s:"1",t:"Upload Your Design",d:"Send us your logo or artwork through the chatbot. Any image format works."},{s:"2",t:"We Digitize & Test",d:"Hand-digitized in Wilcom. Tested on commercial machines. Sew-out proof included."},{s:"3",t:"Receive Your File",d:"Delivered in any format. If you're not happy, edits are included free."}].map((x,i)=>
          <div key={i} style={{textAlign:"center"}}><div style={{width:48,height:48,borderRadius:"50%",background:C.primary,color:C.white,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px",fontFamily:"'Space Grotesk',sans-serif",fontSize:22,fontWeight:700}}>{x.s}</div><h3 style={{fontSize:17,fontWeight:700,color:C.dark,margin:"0 0 6px"}}>{x.t}</h3><p style={{fontSize:15,color:"#555",lineHeight:1.5}}>{x.d}</p></div>
        )}
      </div>
    </S>
    <S bg={C.sectionBg} py={56}><div style={{textAlign:"center"}}>
      <h2 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:28,fontWeight:700,color:C.dark,margin:"0 0 10px"}}>Fine Print (There Isn't Much)</h2>
      <div style={{maxWidth:500,margin:"0 auto",textAlign:"left"}}>
        {["New customers only","Applies to your first 2 digitizing orders","Any complexity level — simple, complex, or back designs","50% off Standard pricing","Express upgrade available at normal surcharge","No code needed — discount applied automatically","Sew-out proof included on first design"].map((x,i)=>
          <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0"}}><Chk/><span style={{fontSize:16,color:"#555"}}>{x}</span></div>
        )}
      </div>
    </div></S>
    <CTA onChat={onChat} title="Ready to try us at half price?" desc="Upload your first design now. 50% off applied automatically."/>
  </>;
}

// ═══════════════════════════════════════
// PAGE: ABOUT
// ═══════════════════════════════════════
function AboutPage({onChat,setPage}){
  const team=[
    {name:"Mike Belanger",role:"Head of Digitizing",yrs:"30+ yrs",bio:"Started on punch-tape machines before CAD systems existed. Handles all ultra-tough designs personally and trains every new puncher we hire.",sp:["3D Puff","Ultra-fine detail","Complex satin work"]},
    {name:"Sandra Torres",role:"Senior Puncher",yrs:"15 yrs",bio:"Known for impossibly clean small text and multi-layer satin work. Trained in Wilcom and Pulse. If it can be stitched at 5mm, Sandra figures out how.",sp:["Small text","Multi-color crests","Script fonts"]},
    {name:"Dave Okonkwo",role:"Testing & QA Lead",yrs:"22 yrs",bio:"Former commercial embroidery shop owner. Runs our testing facility and knows every quirk of Barudan, Happy, and Tajima from the inside out.",sp:["Machine compatibility","Cap digitizing","Tension calibration"]},
    {name:"Rachel Kim",role:"Vector & Artwork",yrs:"12 yrs",bio:"Graphic designer turned production artist. Specializes in DTF-optimized artwork, vinyl cut paths, and laser-ready files. Knows exactly what each output method actually needs — and what it doesn't.",sp:["DTF optimization","Vinyl cut paths","Laser & hard goods"]},
  ];
  const milestones=[
    {yr:"Early 2000s",ev:"Managing an embroidery business. Our digitizer retired. Tried the cheap online services — and learned exactly why they weren't good enough."},
    {yr:"Mid 2000s",ev:"Shifted focus entirely to digitizing. Built the testing process from scratch: hand-digitize, stitch out, then deliver."},
    {yr:"2008",ev:"Launched online ordering — one of the first digitizing services to do so"},
    {yr:"2014",ev:"Passed 500,000 designs delivered"},
    {yr:"2019",ev:"Added dedicated sew-out testing lab with Barudan and Happy machines"},
    {yr:"2022",ev:"Launched USABadge.com for patches, badges, and keyrings"},
    {yr:"2024",ev:"Surpassed 1,000,000 designs delivered"},
  ];
  return <>
    <PH title="About Digitizing.US" sub="Over a million designs. One standard: if we wouldn't press start on it, we don't ship it." bc="About" setPage={setPage}/>

    {/* Mission */}
    <S><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:48,alignItems:"center"}}>
      <div>
        <div style={{display:"inline-block",background:"rgba(192,57,43,0.08)",border:"1px solid rgba(192,57,43,0.15)",borderRadius:6,padding:"4px 12px",fontSize:13,color:C.primary,fontWeight:600,marginBottom:16}}>OUR STORY</div>
        <h2 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:28,fontWeight:700,color:C.dark,margin:"0 0 16px",lineHeight:1.25}}>We learned the hard way what bad digitizing actually costs.</h2>
        <p style={{fontSize:16,color:"#555",lineHeight:1.7,margin:"0 0 14px"}}>In the early 2000s, we were managing an embroidery business. Digitizing was expensive — but we had a great digitizer, and the work ran clean. Then he retired. The internet had opened up, and suddenly there were plenty of services promising fast, cheap files. We tried a few.</p>
        <p style={{fontSize:16,color:"#555",lineHeight:1.7,margin:"0 0 14px"}}>The results were what you'd expect. Thread breaks, puckering, registration issues, designs that looked fine on screen and fell apart on fabric. We kept paying twice — once for the file, once for the damage. That experience made it clear: the only way to know a file was good was to test it on a real machine before it got anywhere near a production run.</p>
        <p style={{fontSize:16,color:"#555",lineHeight:1.7,margin:0}}>Eventually the focus shifted entirely — away from managing the embroidery side and into digitizing and patches full time. That's all we do now, and we do it the way we wished those early services had: hand-digitized, tested on real machines, with a flat rate so there are no surprises. Today we've delivered over a million designs, and that standard hasn't changed.</p>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:16}}>
        {[{n:"20+",l:"Years focused on digitizing"},{n:"1M+",l:"Designs delivered"},{n:"7 yrs",l:"Average client tenure"},{n:"100%",l:"Flat-rate pricing — no per-stitch surprises"}].map((x,i)=>
          <div key={i} style={{background:C.sectionBg,borderRadius:12,padding:"20px 24px",display:"flex",alignItems:"center",gap:20,border:"1px solid #e8dcc8"}}>
            <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:32,fontWeight:700,color:C.primary,minWidth:80}}>{x.n}</div>
            <div style={{fontSize:16,color:"#555",fontWeight:500}}>{x.l}</div>
          </div>
        )}
      </div>
    </div></S>

    {/* Values */}
    <S bg="#f7f8fa"><ST sub="These aren't marketing copy. They're why we're still here after 30 years.">What We Actually Believe</ST>
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:20}}>
        {[{i:"🧪",t:"Test before we deliver",d:"Our sew-out proofs aren't screen renders. They're scans of real thread on real fabric. We stitch before we ship because we know what a $60 garment costs when a bad file ruins it."},{i:"💬",t:"Tell you if something won't work",d:"If your text is too small or your detail too fine, we tell you upfront and offer alternatives. We'd rather have an honest conversation than deliver a file that fails on your machine."},{i:"💰",t:"Flat rates. No per-stitch math.",d:"You know what you're paying before you submit. 95% of designs are Simple — $15 flat. We set the price based on complexity, not stitch count. No unpleasant surprises."},{i:"🤝",t:"Partners, not vendors",d:"Many of our clients have been with us 10+ years. We know their machines, their garments, their style preferences. We're the digitizing team that works like part of your shop."}].map((x,i)=>
          <div key={i} style={{background:C.white,borderRadius:14,padding:"28px",border:"1px solid #e5e7eb",display:"flex",gap:18}}>
            <span style={{fontSize:32,flexShrink:0}}>{x.i}</span>
            <div><h3 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:18,fontWeight:700,color:C.dark,margin:"0 0 8px"}}>{x.t}</h3><p style={{fontSize:15,color:"#555",lineHeight:1.6,margin:0}}>{x.d}</p></div>
          </div>
        )}
      </div>
    </S>

    {/* Team */}
    <S><ST sub="The people behind every file.">Our Team</ST>
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:24}}>
        {team.map((p,i)=>
          <div key={i} style={{background:"#fafafa",borderRadius:16,padding:"28px",border:"1px solid #e5e7eb"}}>
            <div style={{display:"flex",alignItems:"flex-start",gap:16,marginBottom:14}}>
              <div style={{width:52,height:52,borderRadius:"50%",background:`linear-gradient(135deg,${C.primary},${C.primaryDark})`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Space Grotesk',sans-serif",fontSize:20,fontWeight:700,color:C.white,flexShrink:0}}>{p.name.split(" ").map(n=>n[0]).join("")}</div>
              <div><div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:17,fontWeight:700,color:C.dark}}>{p.name}</div><div style={{fontSize:14,color:C.primary,fontWeight:600}}>{p.role}</div><div style={{fontSize:13,color:"#888"}}>{p.yrs} experience</div></div>
            </div>
            <p style={{fontSize:15,color:"#555",lineHeight:1.6,margin:"0 0 14px"}}>{p.bio}</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>{p.sp.map((s,si)=><span key={si} style={{background:"rgba(192,57,43,0.08)",color:C.primary,fontSize:13,fontWeight:600,padding:"3px 10px",borderRadius:20,border:"1px solid rgba(192,57,43,0.15)"}}>{s}</span>)}</div>
          </div>
        )}
      </div>
    </S>

    {/* Timeline */}
    <S bg="#f7f8fa"><ST>30 Years, Briefly</ST>
      <div style={{maxWidth:700,margin:"0 auto"}}>
        {milestones.map((m,i)=>
          <div key={i} style={{display:"flex",gap:20,paddingBottom:24,position:"relative"}}>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",flexShrink:0}}>
              <div style={{width:40,height:40,borderRadius:"50%",background:i===milestones.length-1?C.primary:"#e5e7eb",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <div style={{width:14,height:14,borderRadius:"50%",background:i===milestones.length-1?C.white:C.primary}}/>
              </div>
              {i<milestones.length-1&&<div style={{width:2,flex:1,background:"#e5e7eb",marginTop:4}}/>}
            </div>
            <div style={{paddingTop:8,paddingBottom:i<milestones.length-1?0:0}}>
              <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:15,fontWeight:700,color:C.primary,marginBottom:4}}>{m.yr}</div>
              <div style={{fontSize:16,color:"#444",lineHeight:1.5}}>{m.ev}</div>
            </div>
          </div>
        )}
      </div>
    </S>
    <CTA onChat={onChat} title="Work with us" desc="Upload your design and see why shops stay with us for years."/>
  </>;
}

// ═══════════════════════════════════════
// PAGE: CONTACT
// ═══════════════════════════════════════
function ContactPage({onChat,setPage}){
  const [form,setForm]=useState({name:"",company:"",email:"",phone:"",service:"digitizing",message:""});
  const [sent,setSent]=useState(false);
  const upd=(k,v)=>setForm(p=>({...p,[k]:v}));
  const submit=()=>{if(!form.name||!form.email||!form.message)return;setSent(true)};
  return <>
    <PH title="Contact Us" sub="Talk to the team directly. We typically respond within 2 business hours." bc="Contact" setPage={setPage}/>
    <S>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:48,alignItems:"start"}}>
        {/* Form */}
        <div>
          <h2 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:22,fontWeight:700,color:C.dark,margin:"0 0 24px"}}>Send Us a Message</h2>
          {sent ? (
            <div style={{background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:14,padding:"32px",textAlign:"center"}}>
              <div style={{fontSize:40,marginBottom:12}}>✅</div>
              <h3 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:20,fontWeight:700,color:"#166534",margin:"0 0 8px"}}>Message sent!</h3>
              <p style={{fontSize:16,color:"#15803d",margin:"0 0 20px"}}>We'll be in touch within 2 business hours.</p>
              <button onClick={()=>setSent(false)} style={{background:C.primary,color:C.white,border:"none",borderRadius:8,padding:"10px 22px",fontSize:15,fontWeight:600,cursor:"pointer"}}>Send Another</button>
            </div>
          ) : (
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              {[
                {l:"Your Name *",k:"name",type:"text",ph:"Jane Smith"},
                {l:"Company",k:"company",type:"text",ph:"Acme Embroidery"},
                {l:"Email *",k:"email",type:"email",ph:"jane@example.com"},
                {l:"Phone",k:"phone",type:"tel",ph:"555-000-0000"},
              ].map(f=>(
                <div key={f.k}>
                  <label style={{display:"block",fontSize:14,fontWeight:600,color:C.dark,marginBottom:5}}>{f.l}</label>
                  <input type={f.type} value={form[f.k]} onChange={e=>upd(f.k,e.target.value)} placeholder={f.ph} style={{width:"100%",border:"1px solid #d1d5db",borderRadius:8,padding:"10px 12px",fontSize:15,color:C.dark,outline:"none",boxSizing:"border-box"}} onFocus={e=>e.target.style.borderColor=C.primary} onBlur={e=>e.target.style.borderColor="#d1d5db"}/>
                </div>
              ))}
              <div>
                <label style={{display:"block",fontSize:14,fontWeight:600,color:C.dark,marginBottom:5}}>Service</label>
                <select value={form.service} onChange={e=>upd("service",e.target.value)} style={{width:"100%",border:"1px solid #d1d5db",borderRadius:8,padding:"10px 12px",fontSize:15,color:C.dark,outline:"none",background:C.white}}>
                  <option value="digitizing">Embroidery Digitizing</option>
                  <option value="artwork">Vector Artwork</option>
                  <option value="patches">Patches & Badges</option>
                  <option value="general">General Question</option>
                </select>
              </div>
              <div>
                <label style={{display:"block",fontSize:14,fontWeight:600,color:C.dark,marginBottom:5}}>Message *</label>
                <textarea value={form.message} onChange={e=>upd("message",e.target.value)} placeholder="Tell us what you need..." rows={4} style={{width:"100%",border:"1px solid #d1d5db",borderRadius:8,padding:"10px 12px",fontSize:15,color:C.dark,outline:"none",resize:"vertical",boxSizing:"border-box"}} onFocus={e=>e.target.style.borderColor=C.primary} onBlur={e=>e.target.style.borderColor="#d1d5db"}/>
              </div>
              <button onClick={submit} style={{background:C.primary,color:C.white,border:"none",borderRadius:8,padding:"13px",fontSize:16,fontWeight:700,cursor:"pointer",marginTop:4}}>Send Message</button>
              <p style={{fontSize:13,color:"#888",margin:0}}>Or upload your design directly for a faster response →</p>
              <button onClick={onChat} style={{background:"transparent",color:C.primary,border:`2px solid ${C.primary}`,borderRadius:8,padding:"11px",fontSize:15,fontWeight:600,cursor:"pointer"}}>📤 Upload Design via Chat</button>
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{display:"flex",flexDirection:"column",gap:20}}>
          <div>
            <h2 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:22,fontWeight:700,color:C.dark,margin:"0 0 20px"}}>Get in Touch</h2>
            {[
              {i:"📞",t:"Phone",v:"401-655-1153",s:"Call or text"},
              {i:"✉️",t:"Email",v:"mail@digitizing.us",s:"We reply within 2 hours"},
              {i:"📍",t:"Address",v:"1812 Raspberry Ct, NJ 08817",s:"New Jersey, USA"},
            ].map((x,i)=>
              <div key={i} style={{display:"flex",gap:14,padding:"16px 0",borderBottom:"1px solid #f0f0f0"}}>
                <span style={{fontSize:24}}>{x.i}</span>
                <div><div style={{fontWeight:700,color:C.dark,fontSize:15}}>{x.t}</div><div style={{fontSize:16,color:C.primary,fontWeight:600,margin:"2px 0"}}>{x.v}</div><div style={{fontSize:13,color:"#888"}}>{x.s}</div></div>
              </div>
            )}
          </div>

          <div style={{background:C.sectionBg,borderRadius:14,padding:"24px",border:"1px solid #e8dcc8"}}>
            <h3 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:16,fontWeight:700,color:C.dark,margin:"0 0 14px"}}>Business Hours</h3>
            {[["Monday – Friday","9am – 6pm ET"],["Saturday","10am – 3pm ET"],["Sunday","Closed"]].map(([d,h],i)=>
              <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:i<2?"1px solid #e8dcc8":"none"}}>
                <span style={{fontSize:15,color:"#555"}}>{d}</span>
                <span style={{fontSize:15,fontWeight:600,color:i===2?"#999":C.dark}}>{h}</span>
              </div>
            )}
          </div>

          <div style={{background:C.dark,borderRadius:14,padding:"24px",color:C.white}}>
            <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:16,fontWeight:700,marginBottom:8}}>Fastest response?</div>
            <p style={{fontSize:15,color:"rgba(255,255,255,0.7)",lineHeight:1.6,margin:"0 0 14px"}}>Upload your design through the chat. We get the file immediately and can quote you in 6-7 hours.</p>
            <button onClick={onChat} style={{background:C.accent,color:C.dark,border:"none",borderRadius:8,padding:"10px 20px",fontSize:15,fontWeight:700,cursor:"pointer"}}>Upload Design Now</button>
          </div>

          <div style={{borderRadius:14,padding:"20px",background:"#f7f8fa",border:"1px solid #e5e7eb"}}>
            <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:15,fontWeight:700,color:C.dark,marginBottom:8}}>Patches & Badges</div>
            <p style={{fontSize:15,color:"#555",lineHeight:1.5,margin:"0 0 12px"}}>Patch orders go through our dedicated partner site.</p>
            <a href="https://usabadge.com" target="_blank" rel="noopener noreferrer" style={{color:C.primary,fontWeight:700,fontSize:15,textDecoration:"none"}}>Visit USABadge.com →</a>
          </div>
        </div>
      </div>
    </S>
  </>;
}

// ═══════════════════════════════════════
// PAGE: BLOG
// ═══════════════════════════════════════
const POSTS=[
  {id:"why-cheap-digitizing-costs-more",title:"Why Cheap Digitizing Usually Costs More",date:"Feb 18, 2026",author:"Mike Belanger",cat:"Industry Insights",rt:"5 min",excerpt:"A $8 digitizing file looks like a bargain until it ruins a $60 Carhartt jacket and wastes 45 minutes of machine time. Here's the real math.",body:["Every month we get calls from shop owners who tried a budget digitizing service and are now dealing with the fallout. Thread breaks every 300 stitches. Registration that's off by 3mm. Satin stitches pulling through the fabric. It's a pattern so consistent it practically has a name: the cheap file tax.","Here's the math most people don't run: a simple left chest design costs $8 from a discount service. That same design runs on a 6-head machine and breaks thread 4 times. Each break costs you 3-4 minutes to rethread and restart. On a 6-head, you've lost 20+ minutes of production time. At even $30/hour machine value, that's $10 in lost time — already more than the difference in file cost.","Then there's the garment. A Carhartt hoodie runs $55-65 wholesale. If the file has density issues and pulls the fabric, or if poor underlay causes puckering you can't press out, that garment is gone. One ruined jacket and you've spent 5x what the 'expensive' digitizer would have charged.","The deeper issue is that most budget services use auto-digitizing software with human cleanup — they're not hand-digitizing. Auto-punch can't account for fabric behavior, pull compensation, or the specific characteristics of your machine. A file that looks fine on screen can destroy production on an old Barudan.","We test every file on real machines before it leaves us. Yes, that costs more. But when you press start, you know it's going to run."],tags:["digitizing","cost","quality","production"]},
  {id:"3d-puff-complete-guide",title:"3D Puff Embroidery: A Complete Guide for Shop Owners",date:"Jan 30, 2026",author:"Dave Okonkwo",cat:"Technical Guides",rt:"8 min",excerpt:"3D puff is one of the most requested techniques — and one of the most misunderstood. Here's everything you need to know before you buy foam.",body:["3D puff embroidery creates a raised, dimensional effect by stitching over foam placed on top of the garment. Done right, it looks premium and holds up to washing. Done wrong, the foam collapses, the stitches pull through, and the design looks worse than flat embroidery would have.","The first thing to understand is that not every design works in puff. Bold, chunky letterforms and simple shapes translate beautifully. Fine detail, serifs, and small text do not — the foam creates a wobble in the stitch line that makes thin elements look sloppy. If your logo has fine lines or small text, we'll tell you upfront and suggest what can be puffed vs. what should stay flat.","Foam thickness matters. Standard 3mm EVA foam works for most caps. For a more pronounced effect, 6mm is available, but it requires significantly higher stitch density to lock down the foam edges cleanly. We test both options when a design is borderline.","The digitizing approach for puff is completely different from flat embroidery. You need extra underlay, higher density in the coverage stitches, and a very precise satin border that cuts through the foam cleanly. Path order matters too — you want to lock down the foam edges before stitching the fill, or the foam will shift during the run.","Machine speed is another variable. We recommend dropping to 600-700 SPM for puff runs, especially on older machines. Higher speeds increase vibration and can cause the foam to shift mid-run.","When you order puff from us, we test on actual foam on an actual cap blank. We adjust the density, check the foam cutoff, and send you a scanned sew-out proof. You'll know exactly what your customers are getting before you run a production batch."],tags:["3d puff","caps","technique","foam"]},
  {id:"embroidery-file-formats-explained",title:"Embroidery File Formats Explained (DST, PES, JEF, and 40+ More)",date:"Jan 12, 2026",author:"Sandra Torres",cat:"Technical Guides",rt:"6 min",excerpt:"DST? PES? JEF? If you're not sure what format your machine reads, you're not alone. Here's a plain-English guide to the most common embroidery file formats.",body:["Every embroidery machine reads a specific stitch file format — essentially a list of instructions telling the needle where to move, when to change color, and when to trim. The format depends on the machine brand and model, and using the wrong one means the file won't load.","DST (Tajima) is the most universal format. It's the closest thing embroidery has to a standard — most commercial machines and many consumer machines can read it. If you're not sure, start with DST.","PES is Brother's format. If you run a Brother BAS, PR, or VE series machine, you need PES. Brother machines typically won't load DST files, or will load them with issues. The current standard is PES version 6, though older Brother machines may need version 4 or 5.","JEF is Janome's format. VP3 is used by Husqvarna Viking and Pfaff. HUS is an older Husqvarna format. SEW is another Janome format for older machines. XXX is Singer.","The file format itself doesn't affect quality — the digitizing does. A well-digitized file will run clean in any format. A badly-digitized file will have problems in DST, PES, or any other format you try.","When you order from us, tell us your machine brand and model and we'll deliver the correct format. If you run multiple machines from different brands, we'll include all the formats you need at no extra charge. We support 40+ formats."],tags:["file formats","DST","PES","machines","technical"]},
  {id:"screen-print-vs-embroidery",title:"Screen Print vs. Embroidery: Which Is Right for Your Order?",date:"Dec 20, 2025",author:"Rachel Kim",cat:"Industry Insights",rt:"7 min",excerpt:"Both have their place. Here's how to think about the choice — and what it means for your artwork and pricing.",body:["Screen printing and embroidery aren't competing — they serve different purposes. The right choice depends on your garment, your design, your quantity, and what your customer actually wants.","Embroidery adds a premium feel that screen print can't replicate. Thread has texture, depth, and a perceived quality that reads as 'professional' in a way that ink doesn't. Corporate clients, sports teams, and premium brands usually want embroidery for left chests and caps.","Screen print is better for large designs with fine detail, gradients, or lots of colors. Back designs with photographic elements or complex gradients are almost always better as screen print. Embroidery has physical limits — very fine lines get lost in thread texture, and true gradients aren't possible.","On pricing, the comparison isn't as simple as per-piece cost. Embroidery has a one-time digitizing fee (from $15), then a per-piece embroidery cost that's typically $3-8 depending on stitch count and location. Screen printing has higher setup costs (screen fees, $25-50 per color) but lower per-piece costs at volume.","For quantities under 24, embroidery often wins on total cost. For large runs of printed tees, screen print wins. For left chests on professional workwear, embroidery almost always wins regardless of quantity.","Our artwork team can prepare files for either output — separated screen print files or digitized embroidery, depending on what your production requires."],tags:["screen print","embroidery","comparison","production"]},
];

function BlogPage({setPage}){
  const [active,setActive]=useState(null);
  const [filter,setFilter]=useState("All");
  const cats=["All",...[...new Set(POSTS.map(p=>p.cat))]];
  const shown=filter==="All"?POSTS:POSTS.filter(p=>p.cat===filter);
  if(active){const p=POSTS.find(x=>x.id===active);return <>
    <PH title={p.title} sub={`${p.date} · ${p.author} · ${p.rt} read`} bc="Blog" setPage={setPage}/>
    <S><div style={{maxWidth:760,margin:"0 auto"}}>
      <div style={{display:"flex",gap:8,marginBottom:28,flexWrap:"wrap"}}>
        <button onClick={()=>setActive(null)} style={{background:"transparent",border:"1px solid #d1d5db",color:"#555",borderRadius:20,padding:"6px 16px",fontSize:14,cursor:"pointer"}}>← All Posts</button>
        <span style={{background:"rgba(192,57,43,0.08)",color:C.primary,fontSize:13,fontWeight:600,padding:"6px 14px",borderRadius:20,border:"1px solid rgba(192,57,43,0.15)"}}>{p.cat}</span>
        {p.tags.map((t,i)=><span key={i} style={{background:"#f0f1f3",color:"#555",fontSize:13,padding:"6px 14px",borderRadius:20}}>{t}</span>)}
      </div>
      {p.body.map((para,i)=><p key={i} style={{fontSize:17,color:"#444",lineHeight:1.75,margin:"0 0 20px"}}>{para}</p>)}
      <div style={{borderTop:"1px solid #e5e7eb",paddingTop:24,marginTop:8,display:"flex",gap:12}}>
        <button onClick={()=>setActive(null)} style={{background:C.primary,color:C.white,border:"none",borderRadius:8,padding:"10px 22px",fontSize:15,fontWeight:600,cursor:"pointer"}}>← Back to Blog</button>
      </div>
    </div></S>
  </>;}
  return <>
    <PH title="Blog" sub="Guides, insights, and technical deep-dives from the team." bc="Blog" setPage={setPage}/>
    <S>
      <div style={{display:"flex",gap:10,marginBottom:32,flexWrap:"wrap"}}>
        {cats.map(c=><button key={c} onClick={()=>setFilter(c)} style={{background:filter===c?C.primary:"#f0f1f3",color:filter===c?C.white:C.dark,border:"none",borderRadius:20,padding:"8px 20px",fontSize:15,fontWeight:600,cursor:"pointer"}}>{c}</button>)}
      </div>
      {/* Featured post */}
      {filter==="All"&&<div onClick={()=>setActive(shown[0].id)} style={{background:C.dark,borderRadius:18,padding:"36px 40px",marginBottom:28,cursor:"pointer",display:"grid",gridTemplateColumns:"1fr auto",gap:24,alignItems:"center"}} onMouseEnter={e=>e.currentTarget.style.opacity="0.93"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
        <div>
          <div style={{display:"flex",gap:10,marginBottom:14,flexWrap:"wrap"}}>
            <span style={{background:"rgba(192,57,43,0.25)",color:C.accent,fontSize:13,fontWeight:700,padding:"4px 12px",borderRadius:20}}>FEATURED</span>
            <span style={{color:"rgba(255,255,255,0.4)",fontSize:13}}>{shown[0].cat}</span>
            <span style={{color:"rgba(255,255,255,0.4)",fontSize:13}}>·</span>
            <span style={{color:"rgba(255,255,255,0.4)",fontSize:13}}>{shown[0].rt} read</span>
          </div>
          <h2 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:24,fontWeight:700,color:C.white,margin:"0 0 12px",lineHeight:1.3}}>{shown[0].title}</h2>
          <p style={{fontSize:16,color:"rgba(255,255,255,0.6)",lineHeight:1.6,margin:"0 0 16px"}}>{shown[0].excerpt}</p>
          <div style={{display:"flex",gap:12,alignItems:"center"}}>
            <div style={{width:32,height:32,borderRadius:"50%",background:C.primary,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,color:C.white,fontSize:13}}>{shown[0].author.split(" ").map(n=>n[0]).join("")}</div>
            <span style={{fontSize:14,color:"rgba(255,255,255,0.6)"}}>{shown[0].author} · {shown[0].date}</span>
          </div>
        </div>
        <div style={{fontSize:40}}>→</div>
      </div>}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
        {(filter==="All"?shown.slice(1):shown).map((p,i)=>
          <div key={i} onClick={()=>setActive(p.id)} style={{background:C.white,borderRadius:14,border:"1px solid #e5e7eb",overflow:"hidden",cursor:"pointer",transition:"transform 0.15s,box-shadow 0.15s"}} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,0.08)"}} onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none"}}>
            <div style={{padding:"22px"}}>
              <div style={{display:"flex",gap:8,marginBottom:10}}><span style={{background:"rgba(192,57,43,0.08)",color:C.primary,fontSize:12,fontWeight:700,padding:"3px 10px",borderRadius:16}}>{p.cat}</span><span style={{fontSize:12,color:"#aaa",padding:"3px 0"}}>{p.rt} read</span></div>
              <h3 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:16,fontWeight:700,color:C.dark,margin:"0 0 10px",lineHeight:1.35}}>{p.title}</h3>
              <p style={{fontSize:14,color:"#666",lineHeight:1.6,margin:"0 0 16px"}}>{p.excerpt}</p>
              <div style={{display:"flex",alignItems:"center",gap:8,borderTop:"1px solid #f0f0f0",paddingTop:12}}>
                <div style={{width:26,height:26,borderRadius:"50%",background:C.primary,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:C.white}}>{p.author.split(" ").map(n=>n[0]).join("")}</div>
                <span style={{fontSize:13,color:"#888"}}>{p.author}</span>
                <span style={{fontSize:13,color:"#ccc"}}>·</span>
                <span style={{fontSize:13,color:"#aaa"}}>{p.date}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </S>
  </>;
}

// ═══════════════════════════════════════
// PAGE: TERMS & PRIVACY
// ═══════════════════════════════════════
function TermsPage({setPage}){
  const secs=[
    {t:"Services",b:"Fixed Price Digitizing (\"Digitizing.US\") provides embroidery digitizing, vector artwork conversion, and facilitates custom patch orders through partner sites. By submitting an order, you agree to these terms."},
    {t:"Pricing & Payment",b:"All prices are listed in USD. Flat-rate pricing applies as shown on the Pricing page. We never store credit card information. Payment is processed at time of order through secure third-party processors. Express pricing applies to next-business-day delivery and is charged at the rates listed."},
    {t:"Turnaround Times",b:"Standard turnaround is 1-2 business days from order confirmation and artwork approval. Express is next business day. Times are estimates and may vary during high-volume periods. We will notify you of any delays."},
    {t:"Revisions & Edits",b:"Minor edits and revisions are included with all orders at no charge. Fundamental redesigns or major changes to approved artwork are billed at $10 flat. We will notify you before billing any revision charges."},
    {t:"File Ownership",b:"Upon full payment, you own the digitized file. We retain a copy for 30 days for revision purposes. We do not sell, share, or re-use your artwork or files with third parties."},
    {t:"Artwork Submissions",b:"By submitting artwork, you confirm you have the right to use and reproduce that artwork. We accept no liability for trademark, copyright, or intellectual property issues arising from artwork submitted by customers."},
    {t:"Refunds",b:"If a delivered file is materially defective and cannot be corrected with revisions, we offer a full refund. We do not offer refunds for design choices or style preferences after approval. Refund requests must be made within 14 days of delivery."},
    {t:"Privacy",b:"We collect only the information necessary to process your order: name, company, email, phone, and design files. We do not sell or share your data. We do not store payment information. Design files are stored for 30 days then deleted unless you are an active account holder."},
    {t:"Contact",b:"For any terms or privacy questions, contact us at mail@digitizing.us or call 401-655-1153."},
  ];
  return <>
    <PH title="Terms & Privacy Policy" sub="Effective January 1, 2026. Questions? Email mail@digitizing.us." bc="Terms & Privacy" setPage={setPage}/>
    <S><div style={{maxWidth:800,margin:"0 auto"}}>
      <div style={{background:C.sectionBg,borderRadius:14,padding:"20px 24px",marginBottom:36,border:"1px solid #e8dcc8"}}>
        <p style={{fontSize:16,color:"#555",lineHeight:1.6,margin:0}}>This document covers the Terms of Service and Privacy Policy for Digitizing.US (Fixed Price Digitizing). We've written this in plain English so you can actually read it. Last updated: January 1, 2026.</p>
      </div>
      {secs.map((s,i)=>
        <div key={i} style={{marginBottom:32}}>
          <h2 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:20,fontWeight:700,color:C.dark,margin:"0 0 10px",display:"flex",alignItems:"center",gap:10}}>
            <span style={{width:28,height:28,borderRadius:"50%",background:C.primary,color:C.white,display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,flexShrink:0}}>{i+1}</span>
            {s.t}
          </h2>
          <p style={{fontSize:16,color:"#555",lineHeight:1.7,margin:"0 0 0 38px"}}>{s.b}</p>
        </div>
      )}
      <div style={{borderTop:"1px solid #e5e7eb",paddingTop:28,marginTop:8}}>
        <p style={{fontSize:15,color:"#888",lineHeight:1.6}}>© 2026 Fixed Price Digitizing. All rights reserved. Questions about these terms? Email <a href="mailto:mail@digitizing.us" style={{color:C.primary}}>mail@digitizing.us</a> or call <a href="tel:4016551153" style={{color:C.primary}}>401-655-1153</a>.</p>
      </div>
    </div></S>
  </>;
}

// ═══════════════════════════════════════
// ADMIN PANEL
// ═══════════════════════════════════════
const MOCK_ORDERS=[
  {id:"DUS-A1B2C3",type:"Quote",svc:"Digitizing",sz:"4 inches",prod:"flat",fmt:"DST",clr:"match",spec:"None",file:"logo_corp.png",name:"James Walton",co:"Walton & Sons Apparel",em:"j.walton@waltonapparel.com",ph:"617-555-0142",turn:"Standard 1-2 days",ts:"2026-03-12 09:14",status:"New"},
  {id:"DUS-D4E5F6",type:"Order",svc:"Digitizing",sz:"3.5 inches",prod:"caps",fmt:"PES",clr:"1-3",spec:"3D Puff",file:"team_crest.pdf",name:"Maria Gutierrez",co:"ProShop Hats",em:"maria@proshophats.com",ph:"305-555-0987",turn:"Express next-day",ts:"2026-03-12 08:02",status:"In Progress"},
  {id:"DUS-G7H8I9",type:"Quote",svc:"Artwork",sz:"—",prod:"—",fmt:"AI",clr:"4-6",spec:"Screen Print",file:"vintage_graphic.jpg",name:"Tom Eklund",co:"",em:"tom.eklund@gmail.com",ph:"206-555-0341",turn:"Standard",ts:"2026-03-11 16:47",status:"Complete"},
  {id:"DUS-J1K2L3",type:"Order",svc:"Digitizing",sz:"5 inches",prod:"flat",fmt:"DST",clr:"7+",spec:"None",file:"None",name:"Derek Owens",co:"Owens Workwear",em:"derek@owensworkwear.com",ph:"843-555-0214",turn:"Standard 1-2 days",ts:"2026-03-11 14:22",status:"Flagged"},
];
const STATUS_COLORS={New:"#2563eb",["In Progress"]:"#d97706",Complete:"#16a34a",Flagged:"#dc2626"};

function AdminPanel({onClose}){
  const [tab,setTab]=useState("orders");
  const [orders,setOrders]=useState(MOCK_ORDERS);
  const [sel,setSel]=useState(null);
  const [aiInput,setAiInput]=useState("");const [aiOutput,setAiOutput]=useState("");const [aiLoading,setAiLoading]=useState(false);
  const [copied,setCopied]=useState(false);

  const setStatus=(id,s)=>setOrders(o=>o.map(x=>x.id===id?{...x,status:s}:x));

  const callAI=async()=>{
    if(!aiInput.trim())return;
    setAiLoading(true);setAiOutput("");
    try{
      const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system:`You are a customer service assistant for Digitizing.US, a professional embroidery digitizing service.\n\nCOMPANY INFO:\n- Phone: 401-655-1153 | Email: mail@digitizing.us\n- Simple left chest: $15 standard / $19 express\n- Complex left chest: $25 / $30\n- Back designs from: $35 / $45\n- Cap designs from: $20 / $24\n- Edits: $10 flat\n- New customers: 50% off first 2 designs\n- Turnaround: 1-2 days standard, next-day express\n- We test on real machines and send sew-out proofs\n- We never store payment info\n- Patches via USABadge.com\n\nTONE: Professional but warm. Direct. Not salesy. Match the customer's register.\n\nALWAYS:\n- Reference their specific question\n- Include relevant pricing if they asked about cost\n- Sign off as "The Digitizing.US Team"\n- Keep replies concise — 3-5 short paragraphs max\n\nNEVER:\n- Make up pricing not listed above\n- Promise turnaround times shorter than what's listed\n- Discuss competitor services`,messages:[{role:"user",content:`Draft a reply to this customer email:\n\n${aiInput}`}]})});
      const d=await r.json();
      setAiOutput(d.content?.[0]?.text||"No response returned.");
    }catch(e){setAiOutput("Error calling AI. Check your connection.");}
    setAiLoading(false);
  };

  const tabs=[{k:"orders",l:"📋 Orders"},{k:"ai",l:"🤖 AI Reply"},{k:"health",l:"📊 Health"}];
  const panelStyle={background:C.chatBg,borderTop:`2px solid ${C.primary}`,padding:"20px 24px",color:C.text,fontFamily:"'DM Sans','Segoe UI',sans-serif"};

  return <div style={panelStyle}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
      <div style={{display:"flex",gap:4}}>
        {tabs.map(t=><button key={t.k} onClick={()=>{setTab(t.k);setSel(null)}} style={{background:tab===t.k?C.primary:"rgba(255,255,255,0.05)",color:tab===t.k?C.white:C.textMuted,border:"none",borderRadius:8,padding:"8px 16px",fontSize:14,fontWeight:600,cursor:"pointer"}}>{t.l}</button>)}
      </div>
      <div style={{display:"flex",gap:8,alignItems:"center"}}>
        <span style={{fontSize:12,color:C.textMuted}}>🔒 Admin Mode</span>
        <button onClick={onClose} style={{background:"rgba(255,255,255,0.08)",border:"none",borderRadius:6,padding:"6px 12px",color:C.textMuted,fontSize:13,cursor:"pointer"}}>Close ✕</button>
      </div>
    </div>

    {/* ORDERS TAB */}
    {tab==="orders"&&<div>
      {sel ? (
        <div>
          <button onClick={()=>setSel(null)} style={{background:"transparent",border:"1px solid rgba(255,255,255,0.15)",color:C.textMuted,borderRadius:6,padding:"5px 12px",fontSize:13,cursor:"pointer",marginBottom:16}}>← Back to queue</button>
          {(()=>{const o=orders.find(x=>x.id===sel);return(
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24}}>
              <div>
                <div style={{background:"rgba(255,255,255,0.04)",borderRadius:10,padding:"16px 18px",marginBottom:14}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                    <div><div style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:16}}>{o.id}</div><div style={{fontSize:13,color:C.textMuted,marginTop:2}}>{o.ts}</div></div>
                    <span style={{background:STATUS_COLORS[o.status],color:"#fff",fontSize:12,fontWeight:700,padding:"3px 10px",borderRadius:20}}>{o.status}</span>
                  </div>
                  {[["Service",o.svc+" — "+o.type],["Size",o.sz],["Product",o.prod],["Format",o.fmt],["Colors",o.clr],["Special",o.spec],["File",o.file],["Turnaround",o.turn]].map(([k,v])=>v&&v!=="—"&&<div key={k} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderTop:"1px solid rgba(255,255,255,0.05)",fontSize:14}}><span style={{color:C.textMuted}}>{k}</span><span style={{color:C.text,fontWeight:500,maxWidth:"60%",textAlign:"right"}}>{v}</span></div>)}
                </div>
                <div style={{background:"rgba(255,255,255,0.04)",borderRadius:10,padding:"16px 18px"}}>
                  <div style={{fontSize:13,fontWeight:600,color:C.textMuted,marginBottom:10}}>CUSTOMER</div>
                  {[["Name",o.name],["Company",o.co||"—"],["Email",o.em],["Phone",o.ph]].map(([k,v])=><div key={k} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderTop:"1px solid rgba(255,255,255,0.05)",fontSize:14}}><span style={{color:C.textMuted}}>{k}</span><span style={{color:C.text,fontWeight:500}}>{v}</span></div>)}
                </div>
              </div>
              <div>
                <div style={{fontSize:13,fontWeight:600,color:C.textMuted,marginBottom:8}}>UPDATE STATUS</div>
                <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:20}}>
                  {Object.entries(STATUS_COLORS).map(([s,col])=><button key={s} onClick={()=>{setStatus(o.id,s);setSel(null)}} style={{background:o.status===s?col:"rgba(255,255,255,0.05)",color:o.status===s?C.white:C.textMuted,border:`1px solid ${o.status===s?col:"rgba(255,255,255,0.1)"}`,borderRadius:8,padding:"9px 14px",fontSize:14,fontWeight:600,cursor:"pointer",textAlign:"left"}}>{s}</button>)}
                </div>
                <a href={`mailto:${o.em}?subject=Re: Order ${o.id}`} style={{display:"block",background:C.primary,color:C.white,borderRadius:8,padding:"10px 14px",fontSize:14,fontWeight:600,textDecoration:"none",textAlign:"center",marginBottom:8}}>✉️ Reply to Customer</a>
              </div>
            </div>
          );})()}
        </div>
      ) : (
        <div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <div style={{fontSize:13,color:C.textMuted}}>{orders.length} orders · {orders.filter(o=>o.status==="New").length} new</div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {orders.map(o=>(
              <div key={o.id} onClick={()=>setSel(o.id)} style={{background:"rgba(255,255,255,0.04)",borderRadius:10,padding:"12px 16px",cursor:"pointer",display:"flex",alignItems:"center",gap:14,border:"1px solid rgba(255,255,255,0.06)"}} onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.07)"} onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.04)"}>
                <span style={{background:STATUS_COLORS[o.status],width:10,height:10,borderRadius:"50%",display:"inline-block",flexShrink:0}}/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",gap:10,alignItems:"baseline",flexWrap:"wrap"}}>
                    <span style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:14}}>{o.id}</span>
                    <span style={{fontSize:13,color:C.textMuted}}>{o.name}</span>
                    {o.co&&<span style={{fontSize:12,color:"rgba(255,255,255,0.3)"}}>· {o.co}</span>}
                  </div>
                  <div style={{fontSize:13,color:C.textMuted,marginTop:2}}>{o.svc} · {o.type} · {o.turn}</div>
                </div>
                <div style={{textAlign:"right",flexShrink:0}}>
                  <span style={{background:STATUS_COLORS[o.status]+"22",color:STATUS_COLORS[o.status],fontSize:12,fontWeight:700,padding:"2px 9px",borderRadius:20}}>{o.status}</span>
                  <div style={{fontSize:12,color:"rgba(255,255,255,0.25)",marginTop:4}}>{o.ts.split(" ")[1]}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{marginTop:12,padding:"10px 14px",background:"rgba(212,160,60,0.08)",borderRadius:8,border:"1px solid rgba(212,160,60,0.2)",fontSize:13,color:C.accent}}>
            ⚠️ MVP mode — orders shown are demo data. Wire to <code style={{background:"rgba(255,255,255,0.08)",padding:"1px 5px",borderRadius:3,fontSize:12}}>/api/orders</code> for production.
          </div>
        </div>
      )}
    </div>}

    {/* AI REPLY TAB */}
    {tab==="ai"&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
      <div>
        <div style={{fontSize:13,fontWeight:600,color:C.textMuted,marginBottom:8}}>PASTE CUSTOMER EMAIL</div>
        <textarea value={aiInput} onChange={e=>setAiInput(e.target.value)} placeholder="Hi, I wanted to ask about pricing for a left chest logo..." rows={10} style={{width:"100%",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"12px",color:C.text,fontSize:14,lineHeight:1.5,resize:"vertical",outline:"none",boxSizing:"border-box"}}/>
        <button onClick={callAI} disabled={aiLoading} style={{marginTop:8,background:aiLoading?"#555":C.primary,color:C.white,border:"none",borderRadius:8,padding:"10px 20px",fontSize:14,fontWeight:700,cursor:aiLoading?"not-allowed":"pointer",width:"100%"}}>
          {aiLoading?"Generating...":"✨ Generate Reply"}
        </button>
      </div>
      <div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
          <div style={{fontSize:13,fontWeight:600,color:C.textMuted}}>SUGGESTED REPLY</div>
          {aiOutput&&<button onClick={()=>{navigator.clipboard.writeText(aiOutput);setCopied(true);setTimeout(()=>setCopied(false),2000)}} style={{background:"rgba(255,255,255,0.08)",border:"none",color:copied?C.success:C.textMuted,borderRadius:6,padding:"4px 10px",fontSize:12,cursor:"pointer"}}>{copied?"✓ Copied":"Copy"}</button>}
        </div>
        <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"12px",minHeight:240,fontSize:14,lineHeight:1.6,color:aiLoading?C.textMuted:C.text,whiteSpace:"pre-wrap",wordBreak:"break-word"}}>
          {aiLoading?"Generating reply...":aiOutput||<span style={{color:"rgba(255,255,255,0.2)"}}>Reply will appear here.</span>}
        </div>
      </div>
    </div>}

    {/* HEALTH TAB */}
    {tab==="health"&&<div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
      {[
        {l:"Orders Today",v:"4",sub:"2 new, 1 in progress"},
        {l:"Orders This Week",v:"23",sub:"↑ 15% vs last week"},
        {l:"Avg Response Time",v:"1.8h",sub:"Target: <2h"},
        {l:"Chat Sessions",v:"31",sub:"Today"},
        {l:"Completed Orders",v:"18",sub:"This week"},
        {l:"Flagged",v:"1",sub:"Needs attention",alert:true},
      ].map((x,i)=><div key={i} style={{background:x.alert?"rgba(220,38,38,0.1)":"rgba(255,255,255,0.04)",borderRadius:10,padding:"18px 20px",border:`1px solid ${x.alert?"rgba(220,38,38,0.3)":"rgba(255,255,255,0.06)"}`}}>
        <div style={{fontSize:12,color:C.textMuted,fontWeight:600,marginBottom:4}}>{x.l}</div>
        <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:28,fontWeight:700,color:x.alert?"#f87171":C.white}}>{x.v}</div>
        <div style={{fontSize:12,color:x.alert?"#f87171":C.textMuted,marginTop:2}}>{x.sub}</div>
      </div>)}
      <div style={{gridColumn:"1/-1",padding:"10px 14px",background:"rgba(212,160,60,0.08)",borderRadius:8,border:"1px solid rgba(212,160,60,0.2)",fontSize:13,color:C.accent}}>
        ⚠️ MVP mode — stats above are demo data. Wire to <code style={{background:"rgba(255,255,255,0.08)",padding:"1px 5px",borderRadius:3,fontSize:12}}>/api/admin/stats</code> for live data.
      </div>
    </div>}
  </div>;
}

// ═══════════════════════════════════════
// CHATBOT
// ═══════════════════════════════════════
const ST2={SVC:"svc",UPL:"upl",SZ:"sz",PROD:"prod",FMT:"fmt",CLR:"clr",MACH:"mach",SPEC:"spec",QO:"qo",TURN:"turn",NAME:"name",CO:"co",PH2:"ph",EM:"em",VER:"ver",CMT:"cmt",DONE:"done",FQ:"fq"};
const ALWD=[".jpg",".jpeg",".png",".pdf",".ai",".eps",".svg",".cdr",".bmp",".tiff",".tif"];

function Chat({onClose}){
  const [msgs,setMsgs]=useState([]);const [inp,setInp]=useState("");const [step,setStep]=useState(ST2.SVC);
  const [od,setOd]=useState({});const [uf,setUf]=useState(null);const [gc,setGc]=useState("");const [typing,setTyping]=useState(false);
  const endRef=useRef(null);const fileRef=useRef(null);
  useEffect(()=>endRef.current?.scrollIntoView({behavior:"smooth"}),[msgs,typing]);
  const bot=useCallback((t,o=null,d=400)=>{setTyping(true);setTimeout(()=>{setTyping(false);setMsgs(p=>[...p,{f:"b",t,o}])},d)},[]);
  const usr=(t)=>setMsgs(p=>[...p,{f:"u",t}]);

  useEffect(()=>{bot("Hey! 👋 Welcome to Digitizing.US\n\nWhat would you like to do?",[{l:"🧵 Embroidery Digitizing",v:"dig"},{l:"🎨 Vector Artwork",v:"art"},{l:"❓ Question first",v:"q"},{l:"🔑 Help with my account",v:"account"}],600)},[]);

  const pick=(v,l)=>{usr(l);go(v)};
  const send=()=>{if(!inp.trim())return;const t=inp.trim();setInp("");usr(t);go(t)};
  const file=(e)=>{const f=e.target.files[0];if(!f)return;const x="."+f.name.split(".").pop().toLowerCase();if(!ALWD.includes(x)){bot("⚠️ Not supported. Try JPG, PNG, PDF, AI, EPS, SVG");return;}if(f.size>25*1024*1024){bot("⚠️ Too large. Max 25MB.");return;}setUf(f);usr("📎 "+f.name);setOd(p=>({...p,file:f.name}));setTimeout(()=>{bot("Great, got your file! 👍\n\n**Quick note on sizing:**\nJust tell us your **largest dimension** — we'll keep the other proportionate.\n\n💡 **Left chest height guide:**\n• **Standard adult:** up to 4 inches\n• **XXL / XXXL+:** can go slightly higher\n• **Women's / smaller fits:** 3 – 3.5 inches\n• **Teens:** about 3 inches\n• **Kids:** 2.5 – 3 inches\n\nWhat size do you need?");setStep(ST2.SZ)},300)};

  const go=(v)=>{switch(step){
    case ST2.SVC:
      if(v==="dig"){setOd(p=>({...p,svc:"Digitizing"}));bot("Embroidery digitizing! 🧵\n\n💰 **Simple designs (95% of orders):**\n• Left chest: **$15** (1-2 days) / **$19** (express next-day)\n• Back design: from **$35** (1-2 days)\n\n💎 **Complex** (lots of detail):\n• Left chest: from **$25**\n• Back design: from **$50**\n\n🎉 **New customer? 50% off first 2 designs!** Left chest from $7.50.\n\nReady to upload?",[{l:"📤 Upload",v:"upl"},{l:"💬 Questions",v:"q"}]);setStep(ST2.UPL)}
      else if(v==="art"){setOd(p=>({...p,svc:"Artwork"}));bot("Artwork! 🎨 From **$7/hr**.\n\nWhat's it for?",[{l:"🖨️ DTF / Digital Print",v:"dtf"},{l:"✂️ Vinyl Cutting",v:"vinyl"},{l:"🔆 Laser / Hard Goods",v:"laser"},{l:"📤 Just upload",v:"upl"}]);setStep(ST2.UPL)}
      else if(v==="account"){bot("No problem! What do you need help with?",[{l:"🔑 Can't log in",v:"acc_login"},{l:"👤 Forgot username",v:"acc_user"},{l:"🔒 Forgot password",v:"acc_pass"},{l:"📦 Check order status",v:"acc_order"},{l:"💬 Something else",v:"acc_other"}]);setStep(ST2.FQ)}
      else{bot("Ask away! 😊");setStep(ST2.FQ)}break;
    case ST2.UPL:if(v==="upl"){bot("Click 📎 below. We accept JPG, PNG, PDF, AI, EPS, SVG, CDR, BMP, TIFF (max 25MB)")}else if(v==="q"){bot("Ask away! 😊");setStep(ST2.FQ)}else if(["dtf","vinyl","laser"].includes(v)){setOd(p=>({...p,app:v}));bot("Upload your design 📤")}break;
    case ST2.SZ:setOd(p=>({...p,sz:v}));bot("Product type?",[{l:"👕 Flat (shirts, bags)",v:"flat"},{l:"🧢 Caps / Hats",v:"caps"}]);setStep(ST2.PROD);break;
    case ST2.PROD:setOd(p=>({...p,prod:v}));bot("Stitch format?\n💡 Most: **DST**. Brother: **PES**.",[{l:"DST",v:"DST"},{l:"PES",v:"PES"},{l:"Tell machine",v:"mach"},{l:"Other",v:"other"}]);setStep(ST2.FMT);break;
    case ST2.FMT:if(v==="mach"){bot("Machine brand/model?");setStep(ST2.MACH)}else{setOd(p=>({...p,fmt:v}));bot("Colors?",[{l:"Match image",v:"match"},{l:"1-3",v:"1-3"},{l:"4-6",v:"4-6"},{l:"7+",v:"7+"}]);setStep(ST2.CLR)}break;
    case ST2.MACH:setOd(p=>({...p,mach:v,fmt:v.toLowerCase().includes("brother")?"PES":"DST"}));bot("Got it. Colors?",[{l:"Match image",v:"match"},{l:"1-3",v:"1-3"},{l:"4-6",v:"4-6"},{l:"7+",v:"7+"}]);setStep(ST2.CLR);break;
    case ST2.CLR:setOd(p=>({...p,clr:v}));bot("Special requirements?",[{l:"🏔️ 3D Puff",v:"puff"},{l:"Standard",v:"none"},{l:"Type mine",v:"type"}]);setStep(ST2.SPEC);break;
    case ST2.SPEC:if(v==="type"){bot("Go ahead:");return}setOd(p=>({...p,spec:v==="puff"?"3D Puff":v==="none"?"None":v}));bot("Quote or order?",[{l:"📋 Quote",v:"quote"},{l:"🚀 Order",v:"order"}]);setStep(ST2.QO);break;
    case ST2.QO:if(v==="quote"){setOd(p=>({...p,type:"Quote"}));bot("Quote! Mock-up in 6-7 hours.\n\n🎉 New customers: **50% off first 2 designs!**\n\nYour name?");setStep(ST2.NAME)}else{setOd(p=>({...p,type:"Order"}));bot("Turnaround?",[{l:"📦 Standard 1-2 days (from $15)",v:"2d"},{l:"⚡ Express next-day (from $19)",v:"nd"}]);setStep(ST2.TURN)}break;
    case ST2.TURN:setOd(p=>({...p,turn:v==="2d"?"Standard 1-2 days":"Express next-day"}));bot("Your name?");setStep(ST2.NAME);break;
    case ST2.NAME:setOd(p=>({...p,name:v}));bot(`Hi ${v}! Company? (or 'skip')`);setStep(ST2.CO);break;
    case ST2.CO:setOd(p=>({...p,co:v}));bot("Phone? (Design questions only — no marketing calls, ever 🤝)");setStep(ST2.PH2);break;
    case ST2.PH2:setOd(p=>({...p,ph:v}));bot("Email address?");setStep(ST2.EM);break;
    case ST2.EM:if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)){bot("Doesn't look right — try again?");return}setOd(p=>({...p,em:v}));const c=String(Math.floor(100000+Math.random()*900000));setGc(c);bot(`We've sent a verification email to **${v}** 📧\n\n**Already have an account with us?** The email will include a link to log in and submit through your account instead — this keeps all your orders in one place.\n\n**New customer?** Just enter the 6-digit code from the email to continue.\n\n(Demo code: **${c}**)`);setStep(ST2.VER);break;
    case ST2.VER:if(v.trim()===gc){bot("Verified! ✅\n\nComments? Or 'done'.",[{l:"Submit!",v:"done"}]);setStep(ST2.CMT)}else bot("Wrong code. Try again.");break;
    case ST2.CMT:if(v!=="done")setOd(p=>({...p,cmt:v}));const o={...od,...(v!=="done"?{cmt:v}:{})};const code="DUS-"+Date.now().toString(36).toUpperCase();
      bot(`🎉 **Done!**\n📌 **${code}**\n${o.type||"Quote"} — ${o.svc||""}\n📐 ${o.sz||""} | ${o.prod||""} | ${o.fmt||""}\n📎 ${o.file||"None"}\n👤 ${o.name||""} ${o.co?`(${o.co})`:""}\n📧 ${o.em||""}\n\n✅ We're on it!`);setStep(ST2.DONE);break;
    case ST2.FQ:const q=v.toLowerCase();let a="Great question! Upload your design or call 401-655-1153.";
      if(v==="acc_login")a="Let's troubleshoot! 🔧\n\n1️⃣ **Check your username** — our system uses usernames to log in, not email addresses. Your username may be different from your email.\n2️⃣ **Browser issue?** Make sure you're on an up-to-date browser (Chrome, Firefox, Edge, Safari). Try clearing your cache and cookies.\n3️⃣ **Server error?** If you see a 500 error or 'something went wrong', wait a few minutes and try again.\n4️⃣ **Forgot password?** Use the 'Forgot Password' link — it'll email you a reset link AND remind you of your username.\n\nStill stuck? Call us at **401-655-1153** — we'll sort it out.";
      else if(v==="acc_user")a="No worries! 👤\n\nClick **'Forgot Password'** on the login page and enter your **email address**. The system will send you an email with:\n\n✅ Your **username**\n✅ A **password reset link**\n\nCheck your spam folder if you don't see it within a few minutes. If your email address has changed since you signed up, call us at **401-655-1153** and we'll update it.";
      else if(v==="acc_pass")a="Easy fix! 🔒\n\nGo to the login page and click **'Forgot Password'**. Enter your email address and you'll receive:\n\n✅ A **password reset link**\n✅ A reminder of your **username**\n\nThe link expires after 24 hours, so use it promptly. If you're not receiving the email, check your spam folder or call **401-655-1153**.";
      else if(v==="acc_order")a="To check your order status, **log in to your account** — all your orders, proofs, and files are in there.\n\nIf you submitted through this chatbot and haven't received account details yet, your order is being processed — you'll get an email shortly with your login information.\n\nNeed it urgently? Call **401-655-1153**.";
      else if(v==="acc_other")a="No problem — just type your question and I'll help. If it's something I can't answer, I'll point you to the right person. You can also call us at **401-655-1153** or email **mail@digitizing.us**.";
      else if(q.includes("log in")||q.includes("login")||q.includes("can't log")||q.includes("cant log")||q.includes("cannot log")||q.includes("sign in"))a="Let's troubleshoot! 🔧\n\n1️⃣ **Check your username** — our system uses usernames, not email addresses. Your username may be different.\n2️⃣ **Forgot password?** Use 'Forgot Password' on the login page — it emails you a reset link AND your username.\n3️⃣ **Browser issue?** Try an up-to-date Chrome, Firefox, Edge, or Safari. Clear cache and cookies.\n4️⃣ **Server error?** If you see a 500 error, wait a few minutes and retry.\n\nStill stuck? Call **401-655-1153**.";
      else if(q.includes("username")||q.includes("user name")||q.includes("forgot user"))a="Click 'Forgot Password' on the login page and enter your email. The system will email you both your username and a password reset link. Check spam if it doesn't arrive.";
      else if(q.includes("password")||q.includes("forgot pass")||q.includes("reset pass"))a="Click 'Forgot Password' on the login page. Enter your email and you'll get a reset link plus your username. Link expires in 24 hours. Check spam if needed.";
      else if(q.includes("order status")||q.includes("where is my")||q.includes("my order")||q.includes("track"))a="Log in to your account to check order status. If you ordered through this chatbot and haven't received login details yet, your order is being set up — you'll get an email shortly. Call 401-655-1153 if urgent.";
      else if(q.includes("cost")||q.includes("price")||q.includes("how much"))a="Simple left chest: $15 (1-2 days) / $19 (express next-day). Complex from $25. Back designs from $35. Edits $10 flat. New customers: 50% off first 2 designs!";
      else if(q.includes("puff")||q.includes("3d"))a="We specialize in 3D puff! Works best with bold, simple designs. We test every puff design on foam. Upload your design and we'll advise if it's suitable.";
      else if(q.includes("small text")||q.includes("tiny")||q.includes("legib"))a="We go down to 4-5mm letter height with 60wt threads. If it can't go that small, we offer alternative layouts with a mock-up for approval.";
      else if(q.includes("format")||q.includes("dst")||q.includes("pes")||q.includes("file type"))a="Most machines: DST. Brother: PES. Janome: JEF. Husqvarna/Viking: HUS. We deliver any format — 40+ supported. Tell us your machine brand and we'll figure it out.";
      else if(q.includes("turnaround")||q.includes("how long")||q.includes("how fast")||q.includes("when will"))a="Standard: 1-2 business days. Express: next business day. Quotes with mock-up take 6-7 hours. Rush orders can be discussed — call 401-655-1153.";
      else if(q.includes("edit")||q.includes("revision")||q.includes("change")||q.includes("modify"))a="Edits are included with every order. If you need changes, we revise at no extra charge. Fundamental redesigns start at $10 flat regardless of your plan.";
      else if(q.includes("patch")||q.includes("badge")||q.includes("keyring"))a="We produce cloth patches (embroidered, woven, printed), silicone/PVC patches, raised silicone transfers, and custom keyrings. We have a direct investment in our UK-based manufacturing partners — not just a cheap supplier. Visit USABadge.com for current pricing, minimums, and lead times.";
      else if(q.includes("cap")||q.includes("hat"))a="Cap digitizing requires extra underlay and adjusted stitch angles for the curved surface. Stitch counts are typically higher. Simple cap: $20 (standard) / $24 (express). We'll advise if your design needs adjustments.";
      else if(q.includes("machine")||q.includes("barudan")||q.includes("tajima")||q.includes("happy")||q.includes("brother"))a="We test on commercial Barudan and Happy machines, including older models. If your shop runs 15-20 year old equipment, we digitize accordingly. Tell us your machine brand and model and we'll optimize the file.";
      else if(q.includes("payment")||q.includes("pay")||q.includes("credit card")||q.includes("invoice"))a="We never store your credit card details. All payments are processed securely through third-party processors. For volume accounts, we can discuss invoicing — call 401-655-1153.";
      bot(a+"\n\nAnything else?",[{l:"🧵 Digitizing",v:"sd"},{l:"🎨 Artwork",v:"sa"},{l:"❓ More questions",v:"mq"}]);
      if(v==="sd"){setStep(ST2.SVC);go("dig")}else if(v==="sa"){setStep(ST2.SVC);go("art")}break;
    case ST2.DONE:bot("Submitted! New order?",[{l:"📤 New",v:"new"}]);if(v==="new"){setOd({});setUf(null);setStep(ST2.SVC);bot("What do you need?",[{l:"🧵 Digitizing",v:"dig"},{l:"🎨 Artwork",v:"art"}])}break;
  }};

  return <div style={{position:"fixed",bottom:20,right:20,width:400,height:600,borderRadius:18,overflow:"hidden",zIndex:9999,boxShadow:"0 8px 40px rgba(0,0,0,0.3)",display:"flex",flexDirection:"column",background:C.chatBg,border:`1px solid ${C.border}`}}>
    <div style={{background:C.primary,padding:"12px 18px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:34,height:34,borderRadius:"50%",background:"rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center"}}><BotIcon/></div><div><div style={{color:C.white,fontWeight:700,fontSize:15}}>Digitizing.US</div><div style={{color:"rgba(255,255,255,0.6)",fontSize:14}}>Online</div></div></div>
      <button onClick={onClose} style={{background:"rgba(255,255,255,0.1)",border:"none",borderRadius:8,width:30,height:30,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:C.white}}><MinIcon/></button>
    </div>
    <div style={{flex:1,overflowY:"auto",padding:14,display:"flex",flexDirection:"column",gap:8}}>
      {msgs.map((m,i)=><div key={i} style={{display:"flex",flexDirection:"column",alignItems:m.f==="u"?"flex-end":"flex-start"}}>
        <div style={{background:m.f==="u"?C.userBubble:C.botBubble,color:C.text,padding:"10px 14px",borderRadius:m.f==="u"?"14px 14px 4px 14px":"14px 14px 14px 4px",maxWidth:"88%",fontSize:14,lineHeight:1.5,whiteSpace:"pre-wrap",wordBreak:"break-word",border:m.f==="b"?`1px solid ${C.border}`:"none"}}>
          {m.t.split("\n").map((line,li)=>{const b=line.replace(/\*\*(.+?)\*\*/g,"⟨b⟩$1⟨/b⟩");const ps=b.split(/⟨\/?b⟩/);const bs=[...b.matchAll(/⟨b⟩(.+?)⟨\/b⟩/g)].map(m=>m[1]);return <div key={li} style={{marginBottom:line===""?4:1}}>{ps.map((p,pi)=>bs.includes(p)?<strong key={pi}>{p}</strong>:<span key={pi}>{p}</span>)}</div>})}
        </div>
        {m.o&&<div style={{display:"flex",flexWrap:"wrap",gap:5,marginTop:5,maxWidth:"88%"}}>{m.o.map((o,oi)=><button key={oi} onClick={()=>pick(o.v,o.l)} style={{background:"transparent",border:`1px solid ${C.accent}`,color:C.accent,borderRadius:18,padding:"6px 13px",fontSize:14,cursor:"pointer",fontWeight:500}} onMouseEnter={e=>{e.target.style.background=C.accent;e.target.style.color="#000"}} onMouseLeave={e=>{e.target.style.background="transparent";e.target.style.color=C.accent}}>{o.l}</button>)}</div>}
      </div>)}
      {typing&&<div style={{display:"flex",gap:4,padding:"10px 14px",background:C.botBubble,borderRadius:14,width:"fit-content",border:`1px solid ${C.border}`}}>{[0,1,2].map(i=><div key={i} style={{width:7,height:7,borderRadius:"50%",background:C.textMuted,animation:`tp 1.2s infinite ${i*0.15}s`}}/>)}<style>{`@keyframes tp{0%,60%,100%{opacity:.3;transform:translateY(0)}30%{opacity:1;transform:translateY(-3px)}}`}</style></div>}
      <div ref={endRef}/>
    </div>
    <div style={{padding:"10px 12px",borderTop:`1px solid ${C.border}`,background:C.chatBg}}>
      <div style={{display:"flex",gap:6,alignItems:"center"}}>
        <input type="file" ref={fileRef} onChange={file} style={{display:"none"}} accept={ALWD.join(",")}/>
        <button onClick={()=>fileRef.current?.click()} style={{background:C.inputBg,border:`1px solid ${C.border}`,borderRadius:10,width:38,height:38,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:C.textMuted,flexShrink:0}}><UploadIcon/></button>
        <input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Type a message..." style={{flex:1,background:C.inputBg,border:`1px solid ${C.border}`,borderRadius:10,padding:"9px 12px",color:C.text,fontSize:14,outline:"none"}}/>
        <button onClick={send} style={{background:C.primary,border:"none",borderRadius:10,width:38,height:38,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:C.white,flexShrink:0}}><SendIcon/></button>
      </div>
      {uf&&<div style={{marginTop:5,fontSize:14,color:C.success}}>✅ {uf.name}</div>}
    </div>
  </div>;
}

// ═══════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════
export default function App(){
  const [page,setPage]=useState("home");const [chatOpen,setChatOpen]=useState(false);
  const [showAdmin,setShowAdmin]=useState(false);const [adminPass,setAdminPass]=useState("");const [isAdmin,setIsAdmin]=useState(false);
  const nav=(p)=>{setPage(p);window.scrollTo(0,0)};const onChat=()=>setChatOpen(true);
  const show=CHAT_PAGES.includes(page);

  const pages={
    home:<HomePage onChat={onChat} setPage={nav}/>,
    digitizing:<DigiPage onChat={onChat} setPage={nav}/>,
    artwork:<ArtworkPage onChat={onChat} setPage={nav}/>,
    pricing:<PricingPage onChat={onChat}/>,
    howwetest:<TestPage onChat={onChat} setPage={nav}/>,
    patches:<PatchesPage setPage={nav} onChat={onChat}/>,
    gallery:<GalleryPage setPage={nav}/>,
    faq:<FAQPage setPage={nav}/>,
    blog:<BlogPage setPage={nav}/>,
    promo:<PromoPage onChat={onChat} setPage={nav}/>,
    about:<AboutPage onChat={onChat} setPage={nav}/>,
    contact:<ContactPage onChat={onChat} setPage={nav}/>,
    terms:<TermsPage setPage={nav}/>,
  };

  return <div style={{fontFamily:"'DM Sans','Segoe UI',sans-serif",background:C.white,minHeight:"100vh"}}>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet"/>
    <Nav page={page} setPage={nav} setShowAdmin={setShowAdmin}/>
    {showAdmin&&!isAdmin&&<div style={{background:"#111",padding:"10px 20px",display:"flex",gap:8,alignItems:"center",justifyContent:"center"}}><input type="password" placeholder="Admin password" value={adminPass} onChange={e=>setAdminPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&adminPass==="digitizing2026"&&(setIsAdmin(true),setShowAdmin(false))} style={{padding:"7px 12px",borderRadius:4,border:"1px solid #444",background:"#222",color:"#fff",fontSize:14}}/><button onClick={()=>{if(adminPass==="digitizing2026"){setIsAdmin(true);setShowAdmin(false)}}} style={{padding:"7px 16px",borderRadius:4,background:C.accent,color:"#000",border:"none",fontWeight:600,fontSize:14,cursor:"pointer"}}>Enter</button></div>}
    {isAdmin&&<AdminPanel onClose={()=>setIsAdmin(false)}/>}
    {pages[page]||<div style={{padding:"80px 32px",textAlign:"center"}}><h2 style={{fontSize:26,fontWeight:700,color:C.dark,margin:"0 0 14px"}}>Page Not Found</h2><button onClick={()=>nav("home")} style={{background:C.primary,color:C.white,border:"none",borderRadius:8,padding:"12px 24px",fontSize:15,fontWeight:600,cursor:"pointer"}}>Back to Home</button></div>}
    <Footer setPage={nav}/>
    {show&&!chatOpen&&<button onClick={onChat} style={{position:"fixed",bottom:20,right:20,width:60,height:60,borderRadius:"50%",background:C.primary,color:C.white,border:"none",cursor:"pointer",boxShadow:"0 4px 20px rgba(192,57,43,0.4)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000}} onMouseEnter={e=>e.currentTarget.style.transform="scale(1.1)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}><BotIcon/></button>}
    {chatOpen&&<Chat onClose={()=>setChatOpen(false)}/>}
  </div>;
}
