const header=document.querySelector('[data-header]');
const progress=document.querySelector('.scroll-progress span');
const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('.primary-nav');

const updateScrollUI=()=>{const scrollable=document.documentElement.scrollHeight-window.innerHeight;const ratio=scrollable>0?window.scrollY/scrollable:0;progress.style.transform=`scaleX(${Math.min(Math.max(ratio,0),1)})`;header.classList.toggle('scrolled',window.scrollY>24)};
updateScrollUI();
window.addEventListener('scroll',updateScrollUI,{passive:true});

menuButton.addEventListener('click',()=>{const isOpen=menuButton.getAttribute('aria-expanded')==='true';menuButton.setAttribute('aria-expanded',String(!isOpen));menuButton.querySelector('span').textContent=isOpen?'MENU':'CLOSE';nav.classList.toggle('open',!isOpen);document.body.classList.toggle('menu-open',!isOpen)});
nav.addEventListener('click',event=>{if(!event.target.closest('a'))return;menuButton.setAttribute('aria-expanded','false');menuButton.querySelector('span').textContent='MENU';nav.classList.remove('open');document.body.classList.remove('menu-open')});

const tabs=[...document.querySelectorAll('[role="tab"]')];
const panels=[...document.querySelectorAll('[role="tabpanel"]')];
const activateTab=tab=>{tabs.forEach(item=>{const active=item===tab;item.setAttribute('aria-selected',String(active));item.tabIndex=active?0:-1});panels.forEach(panel=>{panel.hidden=panel.id!==tab.getAttribute('aria-controls')})};
tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>activateTab(tab));tab.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();let nextIndex=index;if(event.key==='ArrowLeft')nextIndex=(index-1+tabs.length)%tabs.length;if(event.key==='ArrowRight')nextIndex=(index+1)%tabs.length;if(event.key==='Home')nextIndex=0;if(event.key==='End')nextIndex=tabs.length-1;activateTab(tabs[nextIndex]);tabs[nextIndex].focus()})});

const revealObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(!entry.isIntersecting)return;entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target)})},{threshold:.12});
document.querySelectorAll('.reveal').forEach(element=>revealObserver.observe(element));

const sections=[...document.querySelectorAll('main section[id]')];
const navLinks=[...document.querySelectorAll('.primary-nav a')];
const sectionObserver=new IntersectionObserver(entries=>{const visible=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(!visible)return;navLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')===`#${visible.target.id}`))},{rootMargin:'-30% 0px -55%',threshold:[0,.2,.6]});
sections.forEach(section=>sectionObserver.observe(section));

