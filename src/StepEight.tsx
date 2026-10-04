import { Button, Icon } from "./components/flowone";
import {
  AIMotion, ChartMotion, FragmentationMotion, HeroFlowMotion, LivingTransactionMotion, NavigationMotion,
  NodeTransitionMotion, NumberMotion, OverlayMotion, PredictionMotion, ProductInteractionMotion,
  PulseStateDemo, RevealMotion, TransactionMotion,
} from "./components/motion-system";

const annotations = [
  ["FO-MOTION-HERO-01","Load","Hero flow reveal","700–1200ms","Power3.out","GSAP timeline","Grouped reveal","Instant stable state"],
  ["FO-MOTION-FLOW-01","State change","Connector pulse","350–700ms","Power3.inOut","CSS / GSAP","Shorter pulse","Static active line"],
  ["FO-MOTION-TRX-01","User / scroll","Order → next state","700ms","Power3.out","GSAP","Sequential block","Instant state change"],
  ["FO-MOTION-TRX-02","Scroll","Living Transaction","350–700ms","Power3.inOut","ScrollTrigger","No pinning","Sequential sections"],
  ["FO-MOTION-FRAG-01","Scroll","Connected → fragmented","700ms","Power3.inOut","GSAP","Simplified","Static separated state"],
  ["FO-MOTION-CONNECT-01","Scroll","Context reconnection","700ms","Expo.out","GSAP","Short sequence","Connected final state"],
  ["FO-MOTION-AI-01","State change","AI enters transaction","350ms","Power2.out","CSS / GSAP","Grouped","Content visible"],
  ["FO-MOTION-AI-02","Context ready","Forecast extension","700ms","Power3.out","SVG / GSAP","Short draw","Full forecast visible"],
  ["FO-MOTION-AI-03","Click","Suggested → complete","180–700ms","Power2.out","CSS / JS","Compact","Immediate confirmation"],
  ["FO-MOTION-FCAST-01","Reveal","Historical → forecast","700ms","Power3.out","SVG / GSAP","No scrub","Full chart visible"],
  ["FO-MOTION-NAV-01","Click","Mega menu","180–300ms","Power3.out","CSS","Accordion","Immediate open"],
  ["FO-MOTION-NAV-02","Tap","Mobile menu","250–350ms","Power3.inOut","CSS / JS","Native","Immediate open"],
  ["FO-MOTION-DRAWER-01","Click","Context drawer","250–350ms","Power3.out","CSS","Bottom sheet","Immediate open"],
];

function MotionDoc({ index,title,note,children,dark=false }: {index:string;title:string;note:string;children:React.ReactNode;dark?:boolean}) {
  return <section className={`motion-doc ${dark?"is-dark":""}`}><header><span>{index}</span><div role="heading" aria-level={3}>{title}</div><p>{note}</p></header><div className="motion-doc-stage">{children}</div></section>;
}

export default function StepEight() {
  return <div className="step-eight">
    <section className="motion-system-intro"><div className="container-wide"><span>STEP 08 · 10 — MOTION + INTERACTION</span><div role="heading" aria-level={2}>Motion must<br />explain change.</div><p>Something happens. You understand what happened. You understand what happens next.</p><div className="motion-levels">{[["01","MICRO","100–180ms"],["02","COMPONENT","180–350ms"],["03","NARRATIVE","350–700ms"],["04","CINEMATIC","700–1200ms"]].map(([n,l,t])=><div key={n}><b>{n}</b><strong>{l}</strong><span>{t}</span></div>)}</div></div></section>
    <div className="motion-system-body container-wide">
      <MotionDoc index="01" title="Motion Principles" note="Meaning before movement. Stillness remains the default."><div className="motion-principle-grid">{["Enter with purpose","Exit quickly","Move related elements together","Preserve context","Use direction for relationship","Use scale sparingly","Opacity supports motion","Prefer transform + opacity","Never animate idle data","Reduced motion preserves meaning"].map((x,i)=><div key={x}><b>{String(i+1).padStart(2,"0")}</b><span>{x}</span></div>)}</div></MotionDoc>
      <MotionDoc index="02" title="Motion Tokens" note="The existing foundation durations and easing remain canonical."><div className="motion-token-grid">{[["Instant","100ms","Micro feedback"],["Fast","180ms","Hover / focus"],["Standard","350ms","Component state"],["Expressive","700ms","Narrative change"],["Cinematic","1200ms","Rare signature moment"]].map(([a,b,c])=><div key={a}><span>{a}</span><strong>{b}</strong><small>{c}</small><i className={`token-${a.toLowerCase()}`} /></div>)}</div><div className="easing-row">{["Power2.out","Power3.out","Power3.inOut","Expo.out"].map(x=><span key={x}>{x}</span>)}</div></MotionDoc>
      <MotionDoc index="03" title="Micro Motion" note="Fast feedback confirms hover, focus, press and status."><div className="micro-motion-grid"><Button>Hover me</Button><Button state="focus">Visible focus</Button><Button state="pressed">Pressed</Button><a href="#motion-annotation">Directional link <Icon name="arrow" size={16} tone="action" /></a><div><StateChip /></div></div></MotionDoc>
      <MotionDoc index="04" title="Component Motion" note="Tabs, cards, accordions and insight reveals preserve local context."><ProductInteractionMotion /></MotionDoc>
      <MotionDoc index="05" title="Flow Pulse" note="The signature motion occurs once per meaningful transition—not continuously." dark><PulseStateDemo /></MotionDoc>
      <MotionDoc index="06" title="Flow Node States" note="Previous, connector, pulse and destination update in a clear sequence."><NodeTransitionMotion /></MotionDoc>
      <MotionDoc index="07" title="Transaction Motion" note="Persistent identity prevents a transaction becoming unrelated cards."><TransactionMotion /></MotionDoc>
      <MotionDoc index="08" title="Living Transaction" note="A progression prototype only: desktop may pin later; mobile always becomes sequential."><LivingTransactionMotion /></MotionDoc>
      <MotionDoc index="09" title="Fragmentation" note="Lost context is legible and controlled—never chaotic."><FragmentationMotion /></MotionDoc>
      <MotionDoc index="10" title="Connection" note="Reconnection restores identity, context, intelligence and outcome."><FragmentationMotion /></MotionDoc>
      <MotionDoc index="11" title="AI Motion" note="Intelligence enters an existing business object progressively."><AIMotion /></MotionDoc>
      <MotionDoc index="12" title="Prediction Motion" note="Forecast extends from the current state instead of animating from zero."><PredictionMotion /></MotionDoc>
      <MotionDoc index="13" title="Product UI Motion" note="Focused tab, selection and AI-action feedback—not a simulated application."><ProductInteractionMotion /></MotionDoc>
      <MotionDoc index="14" title="Navigation Motion" note="Existing header, mega menu, mobile menu and accordion use restrained disclosure."><NavigationMotion /></MotionDoc>
      <MotionDoc index="15" title="Drawer / Modal" note="Transform and opacity preserve the underlying context."><OverlayMotion /></MotionDoc>
      <MotionDoc index="16" title="Scroll Reveal" note="Reveal related groups together with modest distance and no long cascade."><RevealMotion /></MotionDoc>
      <MotionDoc index="17" title="Chart Motion" note="Only trend, comparison and forecast justify chart animation."><ChartMotion /></MotionDoc>
      <MotionDoc index="18" title="Number Motion" note="Use count-up only when introducing or changing a meaningful value."><NumberMotion /></MotionDoc>
      <MotionDoc index="19" title="Mobile Motion" note="Shorter, lighter and sequential—no full-screen pinning or heavy choreography."><div className="mobile-motion-rules"><div><span>DESKTOP</span><strong>Pinned narrative</strong><p>Stable narrative with changing product context.</p></div><Icon name="arrow" size={24} tone="muted" /><div><span>MOBILE</span><strong>Sequential content</strong><p>Vertical flow, bottom sheets and compact transitions.</p></div></div></MotionDoc>
      <MotionDoc index="20" title="Reduced Motion" note="Every experience remains complete when movement is removed." dark><div className="reduced-motion-grid">{[["Flow pulse","Static active connector"],["Pinned sequence","Sequential content"],["Parallax","No offset"],["Count-up","Final value"],["Long stagger","Grouped instant reveal"],["Chart draw","Complete chart"]].map(([a,b])=><div key={a}><span>DISABLE · {a}</span><Icon name="arrow" size={16} tone="muted" /><strong>{b}</strong></div>)}</div><code>@media (prefers-reduced-motion: reduce)</code></MotionDoc>
      <MotionDoc index="21" title="Motion Annotations" note="Each important interaction has trigger, behavior, timing and fallback." ><div id="motion-annotation" className="annotation-example"><header><span>INTERACTION ID</span><strong>FO-MOTION-TRX-01</strong></header><div>{[["TRIGGER","Scroll / state change"],["ELEMENT","Transaction"],["BEHAVIOR","Move Order → Inventory while preserving identity"],["DURATION","700ms"],["EASING","Power3.out"],["IMPLEMENTATION","GSAP ScrollTrigger"],["MOBILE","Sequential transition"],["REDUCED MOTION","Instant state change"]].map(([a,b])=><div key={a}><span>{a}</span><strong>{b}</strong></div>)}</div></div></MotionDoc>
      <MotionDoc index="22" title="Interaction IDs" note="Thirteen canonical interactions form the implementation contract."><div className="interaction-table"><div className="interaction-head"><span>ID</span><span>TRIGGER / ELEMENT</span><span>BEHAVIOR</span><span>TIMING</span><span>IMPLEMENTATION</span><span>FALLBACKS</span></div>{annotations.map(([id,trigger,element,duration,easing,impl,mobile,reduced])=><div key={id}><strong>{id}</strong><span>{trigger}<small>{element}</small></span><span>{easing}</span><span>{duration}</span><span>{impl}</span><span>{mobile}<small>{reduced}</small></span></div>)}</div><div className="motion-architecture"><span>PRODUCTION MODULES</span>{["flowone-motion.js","flowone-scroll.js","flowone-flow.js","flowone-transaction.js","flowone-ai.js","flowone-navigation.js","flowone-accessibility.js"].map(x=><code key={x}>{x}</code>)}</div></MotionDoc>
      <MotionDoc index="PROTOTYPE" title="Signature Interactions" note="Priority prototypes are replayable and communicate complete final states."><HeroFlowMotion /></MotionDoc>
    </div>
  </div>;
}

function StateChip() {
  return <span className="motion-status-chip"><Icon name="check" size={14} tone="success" />Approved</span>;
}
