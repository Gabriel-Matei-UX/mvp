window.addEventListener('load', () => {
    const bannerIMG = ["jewerly-banner02.jpg", "jewerly-banner03.jpg", "jewerly-banner04.jpg"];
    const bannerLength = bannerIMG.length;
    const heroContainer = document.getElementById("csm-hero");

    for (let i = 1; i <= bannerLength; i++) {
        let newDiv = document.createElement("div");
        heroContainer.appendChild(newDiv);
        newDiv.classList.add('csm-bg');
        newDiv.id = `csm-bg-${i}`;
        newDiv.style.background = 'url(img/' + bannerIMG[i - 1] + ')';
        newDiv.setAttribute("data-speed", "0.85");
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
        currentIndex = (currentIndex % bannerLength) + 1;
        const nextDiv = document.getElementById(`csm-bg-${currentIndex}`);
        if (nextDiv) nextDiv.classList.add('active')
    }

    setInterval(showNextDiv, 7000);

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
            y: -10,
            rotationX: 180,
            transformOrigin: "0% 50% -50",
            ease: "back",
            stagger: 0.01
        },
        effect: (targets, config) => {
            let split = new SplitText(targets, { types: "chars" })
            let tls = gsap.timeline()

            tls.from(split.chars, { duration: config.duration, opacity: config.opacity, scale: config.scale, y: config.y, rotationX: config.rotationX, transformOrigin: config.transformOrigin, ease: config.ease, stagger: config.stagger })

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

            tl.from(split.chars, { opacity: 0, y: config.y, stagger: 0.05 })
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

            animation.splitText("header .csm-simple-slit-text");

            animation.slideEffect("nav .menu-item", { x: 1000, y: 0 });

            animation.splitText(".hero-c-left h1", 1);

            animation.splitText(".hero-c-left .description", {
                duration: 0.8,
                opacity: 0,
                scale: 0,
                y: 10,
                rotationX: 90,
                transformOrigin: "0% 50% -30",
                ease: "back",
                stagger: 0.01,
                toggleClass: "active",
            });

            animation.slideEffect(".hero-btn .csm-full-btn", { x: 10, y: 100 }, 3).slideEffect(".hero-btn .csm-btn-white", { x: 10, y: 100 }, 3.2);

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

            gsap.from(".box", {
                scrollTrigger: {
                    trigger: ".container",
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                opacity: 0,
                y: 50
            });

            const rtiIN = document.getElementById('rti-in');
            const rtiTEXT = document.getElementById('rti-text');
            const wrtiTEXT = rtiTEXT.offsetWidth;
            rtiIN.setAttribute('style', 'transform: translate(-' + wrtiTEXT +  'px, 0)');

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

            let boxesL = gsap.utils.toArray(".col-left .box");
            let boxesR = gsap.utils.toArray(".col-right .box");

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

            let highlight = gsap.utils.toArray(".text-highlight");

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

            let stickyBox = gsap.utils.toArray('.sticky-container .sticky-box');

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

            

        });

        
    }

    window.addEventListener('load', () => {
        init();
    });

});