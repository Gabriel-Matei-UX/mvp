window.addEventListener('load', () => {
    const bannerIMG = ["jewerly-banner02.jpg", "jewerly-banner03.jpg", "jewerly-banner04.jpg"];
    const bannerLength = bannerIMG.length;
    const portfolioBannerIMG = ["portfolio-01.jpg", "portfolio-02.jpg", "portfolio-03.jpg"];
    const portfolioBannerLength = portfolioBannerIMG.length;
    const heroContainer = document.getElementById("csm-hero-home");
    const portfolioHeroContainer = document.getElementById("csm-hero-portfolio");
    let thisBannerLength = 0;

    if (heroContainer) {
        for (let i = 1; i <= bannerLength; i++) {
            let newDiv = document.createElement("div");
            heroContainer.appendChild(newDiv);
            newDiv.classList.add('csm-bg');
            newDiv.id = `csm-bg-${i}`;
            newDiv.style.background = 'url(img/' + bannerIMG[i - 1] + ')';
            newDiv.setAttribute("data-speed", "0.85");
        }
        thisBannerLength = bannerLength;
    }

    if (portfolioHeroContainer) {
        for (let i = 1; i <= portfolioBannerLength; i++) {
            let newDiv = document.createElement("div");
            portfolioHeroContainer.appendChild(newDiv);
            newDiv.classList.add('csm-bg');
            newDiv.id = `csm-bg-${i}`;
            newDiv.style.background = 'url(img/' + portfolioBannerIMG[i - 1] + ')';
            newDiv.setAttribute("data-speed", "0.85");
        }
        thisBannerLength = portfolioBannerLength;
    }

    const firstBgContainer = document.getElementById('csm-bg-1');
    firstBgContainer.style.opacity = 1;

    setTimeout(() => {
        if (firstBgContainer) firstBgContainer.classList.add('active');
    }, 500);

    let currentIndex = 1;
    function showNextDiv() {
        const currentDiv = document.getElementById(`csm-bg-${currentIndex}`);
        if (currentDiv) currentDiv.classList.remove('active');
        currentIndex = (currentIndex % thisBannerLength) + 1;
        const nextDiv = document.getElementById(`csm-bg-${currentIndex}`);
        if (nextDiv) nextDiv.classList.add('active')
    }

    setInterval(showNextDiv, 7000);

    let footerH = document.querySelector("footer").offsetHeight;
    let content = document.getElementById("csm-spacing");
    content.style.paddingBottom = footerH + "px";

});

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, GSDevTools, SplitText);

document.addEventListener('DOMContentLoaded', () => {

    // SLIDE EFFECT
    gsap.registerEffect({
        name: "slideEffect",
        extendTimeline: true,
        defaults: {
            x: 0,
            y: -100,
            stagger: 0.05
        },
        effect: (targets, config) => {
            return gsap.from(targets, { opacity: 0, x: config.x, y: config.y, stagger: config.stagger })
        }
    });

    // SPLIT TEXT
    gsap.registerEffect({
        name: "splitText",
        extendTimeline: true,
        defaults: {
            duration: 0.8,
            opacity: 0,
            scale: 0,
            x: 0,
            y: -10,
            rotationX: 180,
            transformOrigin: "0% 50% -50",
            ease: "back",
            stagger: 0.01
        },
        effect: (targets, config) => {
            let split = new SplitText(targets, { types: "chars" })
            let tls = gsap.timeline()

            tls.from(split.chars, { 
                duration: config.duration,
                opacity: config.opacity,
                scale: config.scale,
                x: config.x,
                y: config.y,
                rotationX: config.rotationX,
                transformOrigin: config.transformOrigin,
                ease: config.ease,
                stagger: config.stagger
            });

            return tls
        }
    });

    gsap.registerEffect({
        name: "splitWordText",
        extendTimeline: true,
        defaults: {
            duration: 0.8,
            opacity: 0,
            scale: 0,
            y: -10,
            rotationX: 180,
            transformOrigin: "0% 50% -50",
            ease: "back",
            stagger: 0.01,
            scrollTrigger: null
        },
        effect: (targets, config) => {
            let splitW = new SplitText(targets, { types: "words, chars" });
            let tlsW = gsap.timeline({ 
                scrollTrigger: config.scrollTrigger 
            });

            tlsW.from(splitW.chars, { 
                duration: config.duration, 
                opacity: config.opacity, 
                scale: config.scale, 
                y: config.y, 
                rotationX: config.rotationX, 
                transformOrigin: config.transformOrigin, 
                ease: config.ease, 
                stagger: config.stagger 
            });

            return tlsW;
        }
    });

    gsap.registerEffect({
        name: "slideEffectSC",
        extendTimeline: true,
        defaults: {
            x: 0,
            y: -100,
            stagger: 0.05
        },
        effect: (targets, config) => {
            let tlsSR = gsap.timeline({ 
                scrollTrigger: config.scrollTrigger 
            });

            tlsSR.from(targets, { 
                opacity: 0,
                x: config.x,
                y: config.y,
                stagger: config.stagger
            });

            return tlsSR;
        }
    });

    gsap.registerEffect({
        name: "rainbowSplitText",
        extendTimeline: true,
        defaults: {
        y: -100,
            colors: ["turquoise", "magenta", "red", "pink", "purple"]
        },
        effect: (targets, config) => {
            let split = new SplitText(targets, { type: "chars" })
            let tl = gsap.timeline()

            tl.from(split.chars, { opacity: 0, x: config.x, y: config.y, stagger: 0.05 })
                .to(split.chars, { color: gsap.utils.wrap(config.colors), stagger: 0.05 }, 0)

            return tl
        }
    });

    function init() {

        let body = document.querySelector("body");
        body.classList.add('js-on');

        let smoother = ScrollSmoother.create({
            smooth: 2,
            speed: 2,
            effects: true,
            smoothTouch: 0.1
        });

        document.fonts.ready.then(() => {

            ScrollTrigger.refresh();

            let animation = gsap.timeline();

            const headerLogo = document.querySelector("#csm-content");
			if (headerLogo) {
                animation.splitText("header .csm-simple-slit-text");
            }

            const headerNavItems = document.querySelector("nav .menu-item");
			if (headerNavItems) {
                animation.slideEffect("nav .menu-item", { x: 1000, y: 0 });
            }
            const heroBannerHeading = document.querySelector(".hero-c-left h1");
			if (heroBannerHeading) {
                animation.splitText(".hero-c-left h1", 1);
            }

            const heroBannerDescription = document.querySelector(".hero-c-left .description");
			if (heroBannerDescription) {
                animation.splitText(".hero-c-left .description", {
                    duration: 0.8,
                    opacity: 0,
                    scale: 0,
                    x: 0,
                    y: 10,
                    rotationX: 90,
                    transformOrigin: "0% 50% -30",
                    ease: "back",
                    stagger: 0.01,
                });
            }

            const heroBannerSpD = document.querySelector(".hero-c-left .spec-description");
			if (heroBannerSpD) {
                animation.splitText(".hero-c-left .spec-description", {
                    duration: 0.8,
                    opacity: 0,
                    scale: 0,
                    x: 0,
                    y: 0,
                    rotationX: 0,
                    transformOrigin: "50% 50% 0",
                    ease: "back",
                    stagger: 0.03,
                });
            }

            const heroBannerSpDA = document.querySelector(".hero-c-left .specd");
			if (heroBannerSpDA) {

                const heroBannerSpDAL = document.querySelectorAll('span.specd');

                heroBannerSpDAL.forEach((p, i) => {
                    p.id = `id-${i + 1}`;
                    
                    const text = p.innerText;
                    p.innerHTML = text.split("").map(char => 
                    `<span class="char">${char === " " ? "&nbsp;" : char}</span>`
                    ).join("");
                });

                const mainTimeline = gsap.timeline({ 
                    repeat: -1, 
                    delay: 2.5 
                });

                heroBannerSpDAL.forEach((p) => {
                const specLetters = p.querySelectorAll('.char');
                
                mainTimeline
                    .to(p, { opacity: 1, duration: 0.1 })
                    .from(specLetters, {
                        y: 20,
                        opacity: 0,
                        rotateX: -90,
                        stagger: 0.03,
                        duration: 0.5,
                        ease: "back.out(1.7)"
                    })
                    
                    .to({}, { duration: 2 }) 

                    .to(specLetters, {
                        y: -20,
                        opacity: 0,
                        stagger: 0.02,
                        duration: 0.4,
                        ease: "power2.in"
                    })
                    .to(p, {
                        opacity: 0,
                        duration: 0.1
                    });
                }, 2.5);
            }

            const heroBannerBtnFull = document.querySelector(".hero-btn .csm-full-btn");
            const heroBannerBtnTr = document.querySelector(".hero-btn .csm-btn-white");
            if (heroBannerBtnFull) {
                animation.slideEffect(".hero-btn .csm-full-btn", { x: 10, y: 100 }, 3)
            }
            if (heroBannerBtnTr) {
                animation.slideEffect(".hero-btn .csm-btn-white", { x: 10, y: 100 }, 3.2);
            }

            const gridImageTitle = document.querySelector(".csm-slit-word");
			if (gridImageTitle) {
                gsap.utils.toArray(".csm-slit-word").forEach((el) => {
                    gsap.effects.splitWordText(el, {
                        y: 10,
                        rotationX: 45,
                        transformOrigin: "0% 50% -30",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 85%",
                            toggleActions: "play none none none"
                        }
                    });
                });
            }

            const textSlideUp = document.querySelector(".csm-text-slideUp");
            if (textSlideUp) {
                gsap.utils.toArray(".csm-text-slideUp").forEach((el) => {
                    gsap.effects.slideEffectSC(el, {
                        x: 0,
                        y: 100,
                        scrollTrigger: {
                            trigger: el,
                            start: "top 85%",
                            toggleActions: "play none none none"
                        }
                    });
                });
            }

            const rtiIN = document.getElementById('rti-in');
            const rtiTEXT = document.getElementById('rti-text');
            let wrtiTEXT = 0;
            if (rtiTEXT) {
                wrtiTEXT = rtiTEXT.offsetWidth;
            }
            if (rtiIN) {
                rtiIN.setAttribute('style', 'transform: translate(-' + wrtiTEXT +  'px, 0)');
            }

            const autoScrollText = document.querySelector(".scroll-text-smooth");
            if (autoScrollText) {
                const slideTextonScroll = () => {        
                    gsap.utils.toArray('.scroll-text-smooth').forEach((section) => {
                        gsap.fromTo('.scroll-text-smooth .wrapper', {  xPercent: 100  }, {
                            xPercent: -100,
                            scrollTrigger: { 
                                trigger: section,
                                start: "top bottom",
                                end: "bottom -50%",
                                scrub: true 
                            }
                        });
                    });
                }
                slideTextonScroll();
            }

            let boxesL = gsap.utils.toArray(".col-left .box");
            let boxesR = gsap.utils.toArray(".col-right .box");

            if (boxesL) {
                boxesL.forEach((box, i) => {
                    gsap.fromTo(box, {
                        xPercent: -100,
                    },
                    { 
                        xPercent: 0,
                        duration: 3,
                        ease: "none",
                        scrollTrigger: {
                            trigger: box,
                            start: "top 90%",
                            end: "bottom 30%",
                            toggleActions: "restart pause reverse pause",
                            toggleClass: "active",
                            scrub: true,
                        },
                    });
                });
            }

            if (boxesR) {
                boxesR.forEach((box, i) => {
                    gsap.fromTo(box, {
                        xPercent: 100,
                    },
                    { 
                        xPercent: 0,
                        duration: 3,
                        ease: "none",
                        scrollTrigger: {
                            trigger: box,
                            start: "top 90%",
                            end: "bottom 30%",
                            toggleActions: "restart pause reverse pause",
                            toggleClass: "active",
                            scrub: true,
                        },
                    });
                });
            }

            let highlight = gsap.utils.toArray(".text-highlight");

            if (highlight) {
                highlight.forEach((highlightText, i) => {
                    gsap.fromTo(highlightText, {
                        xPercent: 100,
                    },
                    {
                        scrollTrigger: {
                            trigger: highlightText,
                            start: "-100px center",
                            toggleActions: "restart pause reverse pause",
                            toggleClass: "active",
                            scrub: true,
                        },
                    });
                });
            }

            let stickyBox = gsap.utils.toArray('.sticky-container .sticky-box');
            if (stickyBox) {
                stickyBox.forEach((el, position) => {
    
                    const isLastPinnedBox = position === stickyBox.length - 1;
    
                    gsap.timeline({
                        scrollTrigger: {
                            trigger: isLastPinnedBox ? '' : el,
                            start: 'top top',
                            end: () => `+=${el.offsetHeight}`,
                            scrub: true,
                            pin: true,
                            pinSpacing: false,
                        }
                    }).to(el, {
                        ease: 'none',
                    }, 0);
                });
            }

            // Split text word by word
            // const splitText = (selector) => {
            //     document.querySelectorAll(selector).forEach(el => {

            //         const words = el.textContent.split(" ");
            //         // const words = el.textContent.split(""); // Split text char by char
            //         el.innerHTML = "";

            //         words.forEach(word => {
            //             const span = document.createElement("span");
            //             span.textContent = word + " ";
            //             span.style.display = "inline-block";
            //             el.appendChild(span);
            //         });

            //     });
            // };

            const titleReveal = document.querySelector(".title-reveal");
            if (titleReveal) {
                splitText(".title-reveal");
            }

            const accordionBox = document.querySelector(".csm-accordion-box");
            if (accordionBox) {
                gsap.utils.toArray(".csm-accordion-box").forEach((el) => {
                    gsap.effects.slideEffectSC(el, {
                        x: 1000,
                        y: 0,
                        scrollTrigger: {
                            trigger: el,
                            start: "top 85%",
                            toggleActions: "play none none none"
                        }
                    });
                });
            }

            const accordion = document.querySelector(".csm-accordion");
            if (accordion) {
                var acc = document.getElementsByClassName("csm-accordion");
                var i;
    
                for (i = 0; i < acc.length; i++) {
                    acc[i].addEventListener("click", function() {
                        this.classList.toggle("active");
                        var panel = this.nextElementSibling;
                        panel.classList.toggle("active");
                    });
                }
            }

            const revealAnimations = {
                "reveal-up": { y: 80 },
                "reveal-down": { y: -80 },
                "reveal-left": { x: -80 },
                "reveal-right": { x: 80 },
                "reveal-fade": { opacity: 0 }
            };

            Object.keys(revealAnimations).forEach((cls) => {

                gsap.utils.toArray("." + cls).forEach((el) => {

                    gsap.from(el.children.length ? el.children : el, {
                        opacity: 0,
                        ...revealAnimations[cls],
                        duration: 0.8,
                        ease: "power2.out",
                        stagger: 0.08,
                        scrollTrigger: {
                            trigger: el,
                            start: "top 85%",
                            toggleActions: "play none none none"
                        }
                    });

                });

            });

            // const animationsByAttr = {
            //     up: { y: 80 },
            //     down: { y: -80 },
            //     left: { x: -80 },
            //     right: { x: 80 },
            //     fade: { opacity: 0 }
            // };

            // const animateElement = (el) => {

            //     const type = el.dataset.animate;
            //     const delay = el.dataset.delay || 0;
            //     const stagger = el.dataset.stagger || 0.08;
            //     const distance = el.dataset.distance || 80;

            //     let config = { ...animationsByAttr[type] };

            //     if(type === "up") config.y = distance;
            //     if(type === "down") config.y = -distance;
            //     if(type === "left") config.x = -distance;
            //     if(type === "right") config.x = distance;

            //     gsap.from(el.children.length ? el.children : el, {
            //         opacity: 1,
            //         ...config,
            //         duration: 0.8,
            //         delay: delay,
            //         stagger: stagger,
            //         ease: "power2.out"
            //     });

            // };

            // ScrollTrigger.batch("[data-animate]", {
            //     start: "top 85%",
            //     once: true,

            //     onEnter: (batch) => {
            //         batch.forEach(el => animateElement(el));
            //     }

            // });

            // gsap.utils.toArray(".card").forEach(card => {

            //     const tl = gsap.timeline({ paused: true });

            //     tl.to(card, {
            //         y: -10,
            //         scale: 1.03,
            //         duration: 0.3,
            //         ease: "power2.out"
            //     });

            //     card.addEventListener("mouseenter", () => tl.play());
            //     card.addEventListener("mouseleave", () => tl.reverse());

            // });

            ScrollTrigger.create({
                trigger: "#csm-spacing",
                start: "top center",
                toggleClass: { targets: "#smooth-wrapper", className: "active" }
            });

            gsap.set("footer", { pointerEvents: "all" });

            const mobileTrigger = document.querySelector('.mobile-trigger');
            const menuItems = Array.from(document.querySelectorAll('.menu-item2'));
            let isOpen = false;

            mobileTrigger.addEventListener('click', () => {
                isOpen = !isOpen;

                if(isOpen) {
                    body.classList.add('nav-open');
                }
                
                const tl = gsap.timeline();
                const items = isOpen ? [...menuItems] : [...menuItems].reverse();

                items.forEach((item, index) => {
                    tl.to(item, {
                        duration: 0.2,
                        delay: index === 0 ? 0 : 0.1, 
                        onStart: () => {
                            if (isOpen) {
                                item.classList.add('active');
                                item.classList.remove('inactive');
                            } else {
                                item.classList.remove('active');
                                item.classList.add('inactive');
                            }
                            if (index === items.length - 1 && !isOpen) {
                                setTimeout(() => {
                                    menuItems.forEach(mi => {
                                        mi.classList.remove('inactive');
                                    });
                                    body.classList.remove('nav-open');
                                }, 300);
                            }
                        }
                    }, index * 0.1 + 0.1);
                });
            });

            $("#back-to-top").click(function(){
                $('body,html').animate({scrollTop:0},800);
                return false;
            });

        });
        
    }

    window.addEventListener('load', () => {
        init();
    });

});