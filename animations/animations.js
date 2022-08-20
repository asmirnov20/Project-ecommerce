export const fadeInUp = {
    initial: {
        y: 100,
        opacity: 0
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: [0.6, -0.05, 0.01, 0.99]
        }
    }
}
export const productsMainAnimate = {
    initial: {
        y: 100,
        opacity: 0
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            delay: 0.1,
            ease: [0.6, -0.05, 0.01, 0.99]
        }
    }
}

export const footerAnimate = {
    initial: {
        y: 50,
        opacity: 0
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
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

export const mainStagger = {
    animate: {
        transition: {
            staggerChildren: 0.1
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
            ease: [0.6, -0.05, 0.01, 0.99],
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

export const footerImageAnimate = {
    initial: {
        y: 200,
        opacity: 0
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 1.1,
            ease: [0.6, -0.05, 0.01, 0.99],
        }
    },
}

export const fadeInLeft = {
    initial: {
        x: 200,
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
// Cart
export const wrapperAnimate = {
    animate: {
        backgroundColor: '#00000080',
        transition: {
            ease: 'easeOut'
        }
    }
}

export const cartAnimate = {
    initial: {
        x: '110%',
    },
    animate: {
        x: 0,
        transition: {
            duration: 0.4,
            ease: 'easeOut',
        }
    },
    exit: {
        x: '110%',
        transition: {
            duration: 0.17
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


