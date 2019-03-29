function scrollNavbar() {
    // if (window.innerWidth < 768) {
    //     return;
    // }

    const controller = new ScrollMagic.Controller();

    const scrollNavbar = new ScrollMagic.Scene({
        triggerElement: "section",
        triggerHook: 0,
        offset: 50
    })
        .setClassToggle("#navbar", "scrolled")
        .addTo(controller);
}

scrollNavbar();