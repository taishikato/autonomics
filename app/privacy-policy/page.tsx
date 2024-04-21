import { MemoLogo } from "@/components/common-logo";
import { APP_NAME } from "@/utils/consts";
import { type Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: `Privacy Policy | ${APP_NAME}`,
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_APP_URL}/privacy-policy`,
  },
};

const PrivacyPolicy = async () => {
  return (
    <>
      <div className="px-3 mx-auto my-5 md:w-3/4">
        <h1 className="flex items-center justify-center mb-12">
          <Link href="/">
            <MemoLogo />
          </Link>
        </h1>
        <h2 className="mb-3 text-xl font-bold">
          Privacy Policy of {process.env.NEXT_PUBLIC_APP_URL}
        </h2>
        <p className="mb-1">
          At {APP_NAME}, we value and respect your privacy. This Privacy Policy
          explains how we use, protect, and handle the personal information you
          provide to us when using our software-as-a-service application
          ("Service"). By accessing or using our Service, you agree to this
          Privacy Policy.
        </p>

        <h3 className="mt-3 mb-2 text-lg font-semibold">Data Collected</h3>
        <p className="mb-1">
          We collect information you provide directly to us. For example, we
          collect information when you create an account, subscribe, participate
          in any interactive features of our services, fill out a form, request
          customer support or otherwise communicate with us. The types of
          information we may collect include your name, email address, postal
          address, credit card information and other contact or identifying
          information you choose to provide.
        </p>
        <p className="mb-1">
          We collect anonymous data from every visitor of the Website to monitor
          traffic and fix bugs. For example, we collect information like web
          requests, the data sent in response to such requests, the Internet
          Protocol address, the browser type, the browser language, and a
          timestamp for the request.
        </p>
        <p className="mb-1">
          We also use various technologies to collect information, and this may
          include sending cookies to your computer. Cookies are small data files
          stored on your hard drive or in your device memory that helps us to
          improve our services and your experience, see which areas and features
          of our services are popular and count visits. We may also collect
          information using web beacons (also known as "tracking pixels"). Web
          beacons are electronic images that may be used in our services or
          emails and to track count visits or understand usage and campaign
          effectiveness.
        </p>
        <h3 className="mt-3 mb-2 text-lg font-semibold">Use of the Data</h3>
        <p className="mb-1">
          We only use your personal information to provide you the Penelope AI
          services or to communicate with you about the Website or the services.
        </p>
        <p className="mb-1">
          We employ industry standard techniques to protect against unauthorized
          access of data about you that we store, including personal
          information.
        </p>
        <p className="mb-1">
          We do not share personal information you have provided to us without
          your consent, unless:
        </p>
        <ul className="mb-1">
          <li>Doing so is appropriate to carry out your own request</li>
          <li>
            We believe it's needed to enforce our legal agreements or that is
            legally required
          </li>
          <li>
            We believe it's needed to detect, prevent or address fraud, security
            or technical issues
          </li>
        </ul>
        <h3 className="mt-3 mb-2 text-lg font-semibold">
          Use of GPT-3.5 and GPT-4 Model from OpenAI
        </h3>
        <p className="mb-1">
          To provide enhanced features within our Service, we utilize the
          GPT-3.5 and the GPT-4 model from OpenAI. While interactions with this
          model may include sending texts and other non-personally identifiable
          information, we never share your email address or other personally
          identifiable information with OpenAI or any other third-party.
        </p>
        <h3 className="mt-3 mb-2 text-lg font-semibold">Sharing of Data</h3>
        <p className="mb-1">
          We don't share your personal information with third parties.
          Aggregated, anonymized data is periodically transmitted to external
          services to help us improve the Website and service.
        </p>
        <h3 className="mt-3 mb-2 text-lg font-semibold">Opt-Out Option</h3>
        <p className="mb-1">
          You always have the ability to opt-out of out service. The opt-out
          option can be found in your user dashboard within our application. If
          you choose to opt-out, your preferences will be honored, and
          applicable features or communications will cease.
        </p>
        <h3 className="mt-3 mb-2 text-lg font-semibold">Cookies</h3>
        <p className="mb-1">
          We may use cookies on our site to remember your preferences.
        </p>
        <p className="mb-1">
          We may allow third parties to provide analytics services. These third
          parties may use cookies, web beacons and other technologies to collect
          information about your use of the services and other websites,
          including your IP address, web browser, pages viewed, time spent on
          pages, links clicked and conversion information.
        </p>
        <p className="mb-1">
          We also use social buttons provided by services like Twitter, Google+,
          LinkedIn and Facebook. Your use of these third party services is
          entirely optional. We are not responsible for the privacy policies
          and/or practices of these third party services, and you are
          responsible for reading and understanding those third party services'
          privacy policies.
        </p>
        <h3 className="mt-3 mb-2 text-lg font-semibold">
          Opt-Out, Communication Preferences
        </h3>
        <p className="mb-1">
          You may modify your communication preferences and/or opt-out from
          specific communications at any time. Please specify and adjust your
          preferences.
        </p>
        <h3 className="mt-3 mb-2 text-lg font-semibold">Security</h3>
        <p className="mb-1">
          We take reasonable steps to protect personally identifiable
          information from loss, misuse, and unauthorized access, disclosure,
          alteration, or destruction. But, you should keep in mind that no
          Internet transmission is ever completely secure or error-free. In
          particular, email sent to or from the Sites may not be secure.
        </p>
        <h3 className="mt-3 mb-2 text-lg font-semibold">About Children</h3>
        <p className="mb-1">
          The Website is not intended for children under the age of 13. We do
          not knowingly collect personally identifiable information via the
          Website from visitors in this age group.
        </p>
        <h3 className="mt-3 mb-2 text-lg font-semibold">
          Changes to the Privacy Policy
        </h3>
        <p className="mb-1">
          We may amend this Privacy Policy from time to time. Use of information
          we collect now is subject to the Privacy Policy in effect at the time
          such information is used.
        </p>
        <p className="mb-1">
          If we make major changes in the way we collect or use information, we
          will notify you by posting an announcement on the Website or sending
          you an email.
        </p>
      </div>
    </>
  );
};

export default PrivacyPolicy;
