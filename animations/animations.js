export const fadeInUp = {
    initial: {
        y: 100,
        opacity: 0
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 1,
            ease: [0.6, -0.05, 0.01, 0.99]
        }
    }
}

export const stagger = {
    animate: {
        transition: {
            staggerChildren: 0.05
        }
    }
}
export const productFadeInUp = {
    initial: {
        y: 200,
        opacity: 0
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 1,
            ease: [0.6, -0.05, 0.01, 0.99]
        }
    }
}

export const fadeInRight = {
    initial: {
        x: -200,
        opacity: 0
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 1,
            ease: [0.6, -0.05, 0.01, 0.99]
        }
    },
}

export const cartAnimate = {
    initial: {
        x: '110%',
        opacity: 0
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: 'easeOut'
        }
    }
}

export const emptyAnimate = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.4,
            ease: 'easeOut'
        }
    }
}
