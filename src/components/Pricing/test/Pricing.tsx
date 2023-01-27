import Layout from 'components/Layout'
import { StaticImage } from 'gatsby-plugin-image'
import React, { useState, useRef, useEffect } from 'react'
import { FAQs } from 'components/Pricing/FAQs'
import { Quote } from 'components/Pricing/Quote'
import 'components/Pricing/styles/index.scss'
import { SEO } from '../../seo'
import cntl from 'cntl'
import Link from 'components/Link'
import { SelfHostIcon } from 'components/Pricing/Calculator/index'
import AllPlans from 'components/Pricing/AllPlans'
import { animateScroll as scroll } from 'react-scroll'
import SelfHostOverlay from 'components/Pricing/Overlays/SelfHost'
import EnterpriseOverlay from 'components/Pricing/Overlays/Enterprise'
import WhyCloud from 'components/Pricing/Overlays/WhyCloud'
import usePostHog from '../../../hooks/usePostHog'
import { useActions, useValues } from 'kea'
import { TrackedCTA } from 'components/CallToAction'
import Enterprise from 'components/Pricing/Modals/Enterprise'
import { pricingSliderLogic } from 'components/Pricing/PricingSlider/pricingSliderLogic'
import { LogSlider } from 'components/Pricing/PricingSlider/LogSlider'
import { ProductIcons } from '../../ProductIcons/ProductIcons'
import { NotProductIcons } from '../../NotProductIcons/NotProductIcons'
import { RenderInClient } from 'components/RenderInClient'
import SelfHost from '../SelfHost'

export const section = cntl`
    max-w-6xl
    xl:max-w-7xl
    mx-auto
    px-4
`

export const gridCell = cntl`
    bg-white
    flex 
    flex-col 
    px-4
    xl:px-8
    shadow-xl 
`

export const gridCellTop = cntl`
    bg-white/40
    rounded-t-md
    pt-4 
    xl:pt-8 
`

export const gridCellMid = cntl`
    pt-4
    xl:pt-6
    pb-8 
`

export const gridCellBottom = cntl`
    mb-12 
    lg:mb-0 
    pb-4
    xl:pb-8
    rounded-b-md
`

const PricingTest = (): JSX.Element => {
    const [currentModal, setCurrentModal] = useState<string | boolean>(false)
    const posthog = usePostHog()
    const [showPlanBuilder, setShowPlanBuilder] = useState(false)
    const [enterpriseModalOpen, setEnterpriseModalOpen] = useState(false)
    const [whyCloudOpen, setWhyCloudOpen] = useState(false)
    const builderRef = useRef<HTMLDivElement>()
    const {
        cloudCost,
        sessionRecordingCost,
        sliderValue,
        sessionRecordingSliderValue,
        monthlyTotal,
        sessionRecordingEventNumber,
        eventNumber,
    } = useValues(pricingSliderLogic)
    const [enterpriseMode, setEnterpriseMode] = useState(false)
    const { setSessionRecordingSliderValue, setSliderValue } = useActions(pricingSliderLogic)

    useEffect(() => {
        if (showPlanBuilder) builderRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [showPlanBuilder])

    useEffect(() => {
        setSliderValue(13.815510557964274)
    }, [])

    return (
        <Layout>
            <SelfHostOverlay open={currentModal === 'self host'} setOpen={setCurrentModal} />
            <EnterpriseOverlay open={currentModal === 'enterprise'} setOpen={setCurrentModal} />
            <WhyCloud open={whyCloudOpen} setOpen={setWhyCloudOpen} />
            <Enterprise open={enterpriseModalOpen} setOpen={setEnterpriseModalOpen} />
            <SEO title="PostHog Pricing" description="Find out how much it costs to use PostHog" />
            <section>
                <div
                    className={`grid lg:grid-cols-2 lg:mt-12 md:mt-18 lg:gap-x-4 gap-y-3 lg:gap-y-0 mb-4 md:px-4 ${section}`}
                >
                    <div className="lg:order-2">
                        <StaticImage
                            alt="The cutest hedgehog you've ever seen driving a red tractor"
                            src="./images/tractor-hog.png"
                            className="max-w-screen-sm"
                            loading="eager"
                            placeholder="none"
                        />
                    </div>
                    <div className="lg:order-1 mb-12">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl mt-0 mb-2">Pricing</h1>
                        <p className="text-lg font-semibold opacity-60">
                            Use PostHog free forever (with generous usage limits). Or pay per use and get unrestricted
                            access to everything.
                        </p>
                        <RenderInClient>
                            <TrackedCTA
                                event={{
                                    name: `clicked Get started - free`,
                                    type: enterpriseMode ? 'cloud-enterprise' : 'cloud',
                                }}
                                type="primary"
                                width="full lg:w-auto"
                                className="shadow-md"
                                to={
                                    enterpriseMode
                                        ? 'https://posthog.com/signup/cloud/enterprise'
                                        : `https://${
                                              posthog?.isFeatureEnabled &&
                                              posthog?.isFeatureEnabled('direct-to-eu-cloud')
                                                  ? 'eu'
                                                  : 'app'
                                          }.posthog.com/signup`
                                }
                            >
                                {enterpriseMode ? 'Get in touch' : 'Get started - free'}
                            </TrackedCTA>
                        </RenderInClient>
                    </div>
                </div>
            </section>

            <section className={`${section} mb-12`}>
                <div className="grid lg:grid-cols-3 gap-8 xl:gap-12">
                    <div className="col-span-2">
                        <h4 className="mb-3">Pricing calculator</h4>

                        <div className="rounded-md bg-gray-accent-light grid grid-cols-4">
                            <div className="font-semibold opacity-70 text-sm border-b border-dashed border-gray-accent-light col-span-3 px-4 py-2">
                                Product
                            </div>
                            <div className="font-semibold opacity-70 text-sm border-b border-dashed border-gray-accent-light px-4 py-2 text-center">
                                Subtotal
                            </div>

                            <div className="border-b border-dashed  border-gray-accent-light col-span-3 p-2 pl-10 relative">
                                <span className="w-5 h-5 flex absolute top-3 left-3">{ProductIcons.analytics}</span>
                                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
                                    <strong>Product analytics + data stack</strong>
                                    <span>
                                        <span className="text-lg font-bold">{eventNumber.toLocaleString()}</span>{' '}
                                        <span className="opacity-60 text-sm">events</span>
                                    </span>
                                </div>
                                <div className="pt-4 pb-6">
                                    <LogSlider
                                        stepsInRange={100}
                                        marks={[1000000, 10000000, 100000000, 1000000000]}
                                        min={1000000}
                                        max={1000000000}
                                        onChange={(value) => setSliderValue(value)}
                                        value={sliderValue}
                                    />
                                </div>
                            </div>
                            <div className="border-b border-dashed border-gray-accent-light p-2 text-center">
                                <span className="text-lg font-bold">${cloudCost.toLocaleString()}</span>
                            </div>

                            <div className="border-b border-dashed border-gray-accent-light col-span-3 p-2 pl-10 relative">
                                <span className="w-5 h-5 flex absolute top-3 left-3">
                                    {ProductIcons.sessionRecording}
                                </span>
                                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
                                    <strong>Session recording</strong>
                                    <span>
                                        <span className="text-lg font-bold">
                                            {sessionRecordingEventNumber.toLocaleString()}
                                        </span>{' '}
                                        <span className="opacity-60 text-sm">recordings</span>
                                    </span>
                                </div>
                                <div className="pt-4 pb-6">
                                    <LogSlider
                                        stepsInRange={100}
                                        marks={[15000, 50000, 150000, 500000]}
                                        min={15000}
                                        max={500000}
                                        onChange={(value) => setSessionRecordingSliderValue(value)}
                                        value={sessionRecordingSliderValue}
                                    />
                                </div>
                            </div>
                            <div className="border-b border-dashed border-gray-accent-light p-2 text-center">
                                <span className="text-lg font-bold">${sessionRecordingCost.toLocaleString()}</span>
                            </div>

                            <div className="col-span-3 p-4">
                                <strong>Monthly estimate</strong>
                                <br />
                                <p className="opacity-60 text-sm mb-0">
                                    Cost with billing limits set at your selections
                                </p>
                            </div>
                            <div className="p-4 text-center">
                                <span className="text-lg font-bold">${monthlyTotal.toLocaleString()}</span>
                                <span className="opacity-60">/mo</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 className="border-b border-dashed border-gray-accent-light pb-2 mb-3">Discounts</h4>

                        <div className="pl-10 relative mb-4">
                            <span className="w-6 h-6 absolute top-0 left-1">{NotProductIcons.discount}</span>

                            <h5 className="text-base mb-0">B2C with millions of users?</h5>
                            <p className="text-[15px] mb-1">Get in touch for volume discounts after signing up.</p>
                        </div>

                        <div className="pl-10 relative mb-4">
                            <span className="w-6 h-6 absolute top-0 left-1">{NotProductIcons.discount}</span>

                            <h5 className="text-base mb-0">Non-profits</h5>
                            <p className="text-[15px] mb-1">50% off in most cases. Get in touch after signing up.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className={`${section} mb-12 mt-12 md:mt-24 md:px-4`}>
                <h2 className="text-2xl m-0 flex items-center border-b border-dashed border-gray-accent-light pb-4">
                    Compare all plans
                </h2>
                <AllPlans />
            </section>
            <section className={`${section} mb-12 mt-12 md:mt-24 md:px-4`}>
                <h2 className="text-2xl m-0 flex items-center border-b border-dashed border-gray-accent-light pb-4">
                    <SelfHostIcon className="opacity-30 w-[36px] mr-2" />
                    <span>Want to self-host PostHog?</span>
                </h2>
                <SelfHost />
            </section>
            <section className={`${section} mb-12 mt-12 md:mt-24 md:px-4`}>
                <h2 className="text-2xl m-0 mb-6 pb-6 border-b border-gray-accent-light border-dashed">Questions</h2>
                <FAQs />
            </section>
            <section className="bg-primary my-12 md:px-4">
                <Quote
                    className="py-12 md:py-16 px-5 bg-primary"
                    name={<span className="text-white">Jonathan Hyde</span>}
                    title={<span className="text-white">Former Head of Product, Legl</span>}
                    image={
                        <StaticImage
                            width={100}
                            height={100}
                            alt="Jonathan Hyde - Former Head of Product, Legl"
                            src="../../images/jonathan-hyde-plain.png"
                            placeholder="none"
                        />
                    }
                    quote={
                        <span className="text-white">
                            PostHog is the first analytics platform where{' '}
                            <span className="text-yellow">I can be 100% confident in the data.</span> I've finally got
                            the data insight platform I've always wanted as a Product person.
                        </span>
                    }
                />
            </section>
            <section className={`${section} mb-12 mt-16`}>
                <div className="sm:flex-row flex-col-reverse flex items-center sm:items-start justify-center">
                    <StaticImage src="./images/vacation-hog.png" alt="Vacation Hog" width={252} placeholder="none" />
                    <div className="text-center bg-[#2D2D2D] p-4 rounded-md relative sm:rotate-6 sm:-mr-8 flex-shrink-0">
                        <p className="text-white m-0 text-[18px] font-bold font-comic">
                            Looking for the signup button?
                        </p>
                        <p className="text-[15px] mt-0 mb-2 text-white font-comic">(I’ll take you there.)</p>
                        <button
                            onClick={() => scroll.scrollToTop()}
                            className="mx-auto flex space-x-2 items-center bg-red text-[15px] font-bold text-white px-3 py-2 rounded-sm relative active:top-[1px] active:scale-[.97]"
                        >
                            <span>Beam me up!</span>
                            <svg
                                width="17"
                                height="23"
                                viewBox="0 0 17 23"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M11.7211 16.9033V4.24645L14.1749 6.70024C14.6354 7.14428 15.366 7.13788 15.8183 6.6865C16.2697 6.23421 16.2761 5.50358 15.832 5.04306L11.3787 0.58972C10.9209 0.132854 10.1793 0.132854 9.72153 0.58972L5.26819 5.04306C4.82415 5.50358 4.83055 6.23421 5.28284 6.6865C5.73514 7.13789 6.46576 7.14428 6.92537 6.70024L9.37729 4.24645V16.9033C9.37729 18.5989 8.00301 19.9742 6.30636 19.9742C4.61072 19.9742 3.23637 18.599 3.23637 16.9033H0.892505C0.892505 18.8379 1.92434 20.6251 3.5999 21.592C5.27447 22.5597 7.33906 22.5597 9.01375 21.592C10.6892 20.6251 11.7211 18.8379 11.7211 16.9033H11.7211Z"
                                    fill="white"
                                />
                                <path d="M3.04878 15.0117V15.9493H0.70492V15.0117H3.04878Z" fill="white" />
                                <path d="M3.04878 13.1367V14.0743H0.70492V13.1367H3.04878Z" fill="white" />
                                <path d="M3.04878 7.51123V8.44878H0.70492V7.51123H3.04878Z" fill="white" />
                                <path d="M3.04878 9.38672V10.3243H0.70492V9.38672H3.04878Z" fill="white" />
                                <path d="M3.04878 11.2617V12.1993H0.70492V11.2617H3.04878Z" fill="white" />
                            </svg>
                        </button>
                        <svg
                            className="absolute right-2 sm:left-2 sm:right-auto -bottom-5 -scale-x-1"
                            width="35"
                            height="29"
                            viewBox="0 0 35 29"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M34.0329 28.7305L28.9422 2.03952L0.169405 0.617765C0.169405 0.617765 12.4378 8.50347 18.738 13.9774C25.0381 19.4513 34.0329 28.7305 34.0329 28.7305Z"
                                fill="#2D2D2D"
                            />
                        </svg>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default PricingTest