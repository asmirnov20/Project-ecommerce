import Stripe from 'stripe'

const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`);

export default async function handler(req, res) {

    if (req.method === 'POST') {
        console.log(req.body)
        try {
            // Create Checkout Sessions from body params.
            const params = {
                submit_type: 'pay',
                mode: 'payment',
                payment_method_types: ['card'],
                billing_address_collection: 'auto',
                shipping_options: [
                    { shipping_rate: 'shr_1LWkGkIqRWvAfTal4z6DCPwP' },
                    { shipping_rate: 'shr_1LWkHIIqRWvAfTaluqlFAYTV' },
                ],

                line_items: req.body.map(item => {
                    const img = item.image[0].asset._ref;
                    // b2tk4g0e  - id проекта
                    // так как все мои файлы в формате 'webp'
                    const newImage = img.replace('image-', 'https://cdn.sanity.io/images/b2tk4g0e/production/').replace('-webp', '.webp')
                    console.log(newImage)
                    return {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: item.name,
                                images: [newImage],
                            },
                            unit_amount: Math.round(item.price * 100)
                        },
                        adjustable_quantity: {
                            enabled: true,
                            minimum: 1,
                        },
                        quantity: item.quantity
                    }
                }),
                success_url: `${req.headers.origin}/success`,
                cancel_url: `${req.headers.origin}/canceled`,
            }

            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create(params);
            res.status(200).json(session)
        } catch (error) {
            res.status(500).json({ statusCode: 500, message: error.message })
        }

    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}