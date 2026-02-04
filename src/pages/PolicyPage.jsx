import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/api';
import SEO from '../components/SEO';
import { ChevronRight, FileText, Clock, Printer, Share2, Scale, Shield, ScrollText } from 'lucide-react';
import toast from 'react-hot-toast';

const PolicyPage = () => {
    const { type } = useParams();
    const [policy, setPolicy] = useState(null);
    const [loading, setLoading] = useState(true);

    const staticPolicies = {
        cookies: {
            meta_title: 'Cookie Policy | Inkcore',
            meta_description: 'Cookie Policy for Inkcore.',
            content: `
                <h1>Cookie Policy for Inkcore</h1>
                
                <p>At Inkcore, we are committed to transparency and protecting your privacy. This Cookie Policy explains what cookies are, how and why we use them, and the choices available to you when using our website. This policy should be read alongside our Privacy Policy to better understand how we handle your personal data.</p>
                
                <h2>What Are Cookies?</h2>
                <p>Cookies are small text files that are stored on your device (computer, mobile phone, tablet, or other Internet-enabled devices) when you visit a website. Cookies help websites function efficiently, enhance user experience, and provide information to website owners about how their site is used.</p>
                <p>Cookies do not contain personal documents, cannot access files on your device, and do not give us control over your system.</p>
                
                <h2>How We Use Cookies</h2>
                <p>Inkcore uses cookies to ensure the proper functioning of the website and to improve your overall experience. Cookies help us to:</p>
                <ul>
                    <li>Enable essential website features such as secure login and shopping cart functionality</li>
                    <li>Remember your preferences and settings during and between visits</li>
                    <li>Maintain session continuity and prevent fraudulent activity</li>
                    <li>Analyze website traffic and user behavior to improve performance and usability</li>
                </ul>
                <p>The information collected through cookies is used in an aggregated and anonymized manner and does not directly identify individual users unless explicitly stated.</p>
                
                <h2>Types of Cookies We Use</h2>
                <h3>1. Essential Cookies</h3>
                <p>These cookies are necessary for the website to operate correctly. Without these cookies, certain features such as user authentication, checkout processes, and secure access areas may not function properly.</p>
                
                <h3>2. Performance and Analytics Cookies</h3>
                <p>These cookies collect information about how visitors use our website, such as pages visited, time spent on the site, and error messages encountered. This data helps us understand user interactions and improve website performance.</p>
                
                <h3>3. Functional Cookies</h3>
                <p>Functional cookies allow the website to remember your choices, such as language preferences, region, or previously viewed items. These cookies enhance personalization and provide a more tailored experience.</p>
                
                <h2>Managing and Controlling Cookies</h2>
                <p>Most web browsers allow you to manage or disable cookies through their settings. You may choose to accept, block, or delete cookies at any time. Please note that restricting cookies may impact the availability and functionality of certain parts of the website.</p>
                <p>For more information on managing cookies, you can refer to your browser's help section.</p>
                
                <h2>Updates to This Cookie Policy</h2>
                <p>We may update this Cookie Policy from time to time to reflect changes in legal requirements, technology, or our business practices. Any updates will be posted on this page with a revised effective date.</p>
                
                <h2>Contact Information</h2>
                <p>If you have any questions or concerns regarding this Cookie Policy or our use of cookies, please contact us through the details provided on our website.</p>
            `
        },
        privacy: {
            meta_title: 'Privacy Policy | Inkcore',
            meta_description: 'Privacy Policy for Inkcore.',
            content: `
                <h1>PRIVACY POLICY</h1>
                <p><strong>Last updated February 04, 2026</strong></p>
                
                <p>This Privacy Notice for Ink Core ("we," "us," or "our"), describes how and why we might access, collect, store, use, and/or share ("process") your personal information when you use our services ("Services"), including when you:</p>
                <ul>
                    <li>Visit our website at <a href="https://inkcore.shop/">https://inkcore.shop/</a> or any website of ours that links to this Privacy Notice</li>
                    <li>Use Ink Core. Inkcore is your reliable online destination for printers, ink, toner, and essential office technology solutions. We are committed to making printing simple, accessible, and efficient for homes, businesses, and professionals alike.</li>
                    <li>Engage with us in other related ways, including any marketing or events</li>
                </ul>
                <p><strong>Questions or concerns?</strong> Reading this Privacy Notice will help you understand your privacy rights and choices. We are responsible for making decisions about how your personal information is processed. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at <a href="mailto:Inkcore.shop@outlook.com">Inkcore.shop@outlook.com</a>.</p>

                <h2>SUMMARY OF KEY POINTS</h2>
                <p>This summary provides key points from our Privacy Notice, but you can find out more details about any of these topics by clicking the link following each key point or by using our table of contents below to find the section you are looking for.</p>
                
                <p><strong>What personal information do we process?</strong> When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use. Learn more about personal information you disclose to us.</p>
                
                <p><strong>Do we process any sensitive personal information?</strong> Some of the information may be considered "special" or "sensitive" in certain jurisdictions, for example your racial or ethnic origins, sexual orientation, and religious beliefs. We do not process sensitive personal information.</p>
                
                <p><strong>Do we collect any information from third parties?</strong> We do not collect any information from third parties.</p>
                
                <p><strong>How do we process your information?</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent. We process your information only when we have a valid legal reason to do so. Learn more about how we process your information.</p>
                
                <p><strong>In what situations and with which parties do we share personal information?</strong> We may share information in specific situations and with specific third parties. Learn more about when and with whom we share your personal information.</p>
                
                <p><strong>How do we keep your information safe?</strong> We have adequate organizational and technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Learn more about how we keep your information safe.</p>
                
                <p><strong>What are your rights?</strong> Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information. Learn more about your privacy rights.</p>
                
                <p><strong>How do you exercise your rights?</strong> The easiest way to exercise your rights is by submitting a data subject access request, or by contacting us. We will consider and act upon any request in accordance with applicable data protection laws.</p>
                
                <p>Want to learn more about what we do with any information we collect? Review the Privacy Notice in full.</p>

                <h2>TABLE OF CONTENTS</h2>
                <ol>
                    <li>WHAT INFORMATION DO WE COLLECT?</li>
                    <li>HOW DO WE PROCESS YOUR INFORMATION?</li>
                    <li>WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR PERSONAL INFORMATION?</li>
                    <li>WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</li>
                    <li>DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</li>
                    <li>HOW LONG DO WE KEEP YOUR INFORMATION?</li>
                    <li>HOW DO WE KEEP YOUR INFORMATION SAFE?</li>
                    <li>DO WE COLLECT INFORMATION FROM MINORS?</li>
                    <li>WHAT ARE YOUR PRIVACY RIGHTS?</li>
                    <li>CONTROLS FOR DO-NOT-TRACK FEATURES</li>
                    <li>DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</li>
                    <li>DO WE MAKE UPDATES TO THIS NOTICE?</li>
                    <li>HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</li>
                    <li>HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</li>
                </ol>

                <h2>1. WHAT INFORMATION DO WE COLLECT?</h2>
                <p><strong>Personal information you disclose to us</strong></p>
                <p><strong>In Short:</strong> We collect personal information that you provide to us.</p>
                <p>We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.</p>
                <p><strong>Personal Information Provided by You.</strong> The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:</p>
                <ul>
                    <li>names</li>
                    <li>phone numbers</li>
                    <li>email addresses</li>
                    <li>billing addresses</li>
                    <li>debit/credit card numbers</li>
                </ul>
                <p><strong>Sensitive Information.</strong> We do not process sensitive information.</p>
                <p><strong>Payment Data.</strong> We may collect data necessary to process your payment if you choose to make purchases, such as your payment instrument number, and the security code associated with your payment instrument. All payment data is handled and stored by PayPal, Visa and Master Card. You may find their privacy notice link(s) here:</p>
                <ul>
                    <li><a href="https://www.paypal.com/us/legalhub/paypal/privacy-full">https://www.paypal.com/us/legalhub/paypal/privacy-full</a></li>
                    <li><a href="https://www.visa.co.in/legal/global-privacy-notice.html">https://www.visa.co.in/legal/global-privacy-notice.html</a></li>
                    <li><a href="https://www.mastercard.com/us/en/global-privacy-notice.html">https://www.mastercard.com/us/en/global-privacy-notice.html</a></li>
                </ul>
                <p>All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.</p>

                <h2>2. HOW DO WE PROCESS YOUR INFORMATION?</h2>
                <p><strong>In Short:</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes only with your prior explicit consent.</p>
                <p>We process your personal information for a variety of reasons, depending on how you interact with our Services, including:</p>
                <ul>
                    <li>To facilitate account creation and authentication and otherwise manage user accounts. We may process your information so you can create and log in to your account, as well as keep your account in working order.</li>
                    <li>To deliver and facilitate delivery of services to the user. We may process your information to provide you with the requested service.</li>
                </ul>

                <h2>3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR INFORMATION?</h2>
                <p><strong>In Short:</strong> We only process your personal information when we believe it is necessary and we have a valid legal reason (i.e., legal basis) to do so under applicable law, like with your consent, to comply with laws, to provide you with services to enter into or fulfill our contractual obligations, to protect your rights, or to fulfill our legitimate business interests.</p>
                <p>If you are located in Canada, this section applies to you.</p>
                <p>We may process your information if you have given us specific permission (i.e., express consent) to use your personal information for a specific purpose, or in situations where your permission can be inferred (i.e., implied consent). You can withdraw your consent at any time.</p>
                <p>In some exceptional cases, we may be legally permitted under applicable law to process your information without your consent, including, for example:</p>
                <ul>
                    <li>If collection is clearly in the interests of an individual and consent cannot be obtained in a timely way</li>
                    <li>For investigations and fraud detection and prevention</li>
                    <li>For business transactions provided certain conditions are met</li>
                    <li>If it is contained in a witness statement and the collection is necessary to assess, process, or settle an insurance claim</li>
                    <li>For identifying injured, ill, or deceased persons and communicating with next of kin</li>
                    <li>If we have reasonable grounds to believe an individual has been, is, or may be victim of financial abuse</li>
                    <li>If it is reasonable to expect collection and use with consent would compromise the availability or the accuracy of the information and the collection is reasonable for purposes related to investigating a breach of an agreement or a contravention of the laws of Canada or a province</li>
                    <li>If disclosure is required to comply with a subpoena, warrant, court order, or rules of the court relating to the production of records</li>
                    <li>If it was produced by an individual in the course of their employment, business, or profession and the collection is consistent with the purposes for which the information was produced</li>
                    <li>If the collection is solely for journalistic, artistic, or literary purposes</li>
                    <li>If the information is publicly available and is specified by the regulations</li>
                </ul>
                <p>We may disclose de-identified information for approved research or statistics projects, subject to ethics oversight and confidentiality commitments</p>

                <h2>4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</h2>
                <p><strong>In Short:</strong> We may share information in specific situations described in this section and/or with the following third parties.</p>
                <p>We may need to share your personal information in the following situations:</p>
                <ul>
                    <li><strong>Business Transfers.</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
                </ul>

                <h2>5. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</h2>
                <p><strong>In Short:</strong> We may use cookies and other tracking technologies to collect and store your information.</p>
                <p>We may use cookies and similar tracking technologies (like web beacons and pixels) to gather information when you interact with our Services. Some online tracking technologies help us maintain the security of our Services and your account, prevent crashes, fix bugs, save your preferences, and assist with basic site functions.</p>
                <p>We also permit third parties and service providers to use online tracking technologies on our Services for analytics and advertising, including to help manage and display advertisements, to tailor advertisements to your interests, or to send abandoned shopping cart reminders (depending on your communication preferences). The third parties and service providers use their technology to provide advertising about products and services tailored to your interests which may appear either on our Services or on other websites.</p>
                <p>To the extent these online tracking technologies are deemed to be a "sale"/"sharing" (which includes targeted advertising, as defined under the applicable laws) under applicable US state laws, you can opt out of these online tracking technologies by submitting a request as described below under section "DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?"</p>
                <p>Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice.</p>
                <p><strong>Google Analytics</strong></p>
                <p>We may share your information with Google Analytics to track and analyze the use of the Services. The Google Analytics Advertising Features that we may use include: Google Analytics Demographics and Interests Reporting. To opt out of being tracked by Google Analytics across the Services, visit <a href="https://tools.google.com/dlpage/gaoptout">https://tools.google.com/dlpage/gaoptout</a>. You can opt out of Google Analytics Advertising Features through Ads Settings and Ads Settings for mobile apps. Other opt out means include <a href="http://optout.networkadvertising.org/">http://optout.networkadvertising.org/</a> and <a href="http://www.networkadvertising.org/mobile-choice">http://www.networkadvertising.org/mobile-choice</a>. For more information on the privacy practices of Google, please visit the Google Privacy & Terms page.</p>

                <h2>6. HOW LONG DO WE KEEP YOUR INFORMATION?</h2>
                <p><strong>In Short:</strong> We keep your information for as long as necessary to fulfill the purposes outlined in this Privacy Notice unless otherwise required by law.</p>
                <p>We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements). No purpose in this notice will require us keeping your personal information for longer than the period of time in which users have an account with us.</p>
                <p>When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.</p>

                <h2>7. HOW DO WE KEEP YOUR INFORMATION SAFE?</h2>
                <p><strong>In Short:</strong> We aim to protect your personal information through a system of organizational and technical security measures.</p>
                <p>We have implemented appropriate and reasonable technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Although we will do our best to protect your personal information, transmission of personal information to and from our Services is at your own risk. You should only access the Services within a secure environment.</p>

                <h2>8. DO WE COLLECT INFORMATION FROM MINORS?</h2>
                <p><strong>In Short:</strong> We do not knowingly collect data from or market to children under 18 years of age or the equivalent age as specified by law in your jurisdiction.</p>
                <p>We do not knowingly collect, solicit data from, or market to children under 18 years of age or the equivalent age as specified by law in your jurisdiction, nor do we knowingly sell such personal information. By using the Services, you represent that you are at least 18 or the equivalent age as specified by law in your jurisdiction or that you are the parent or guardian of such a minor and consent to such minor dependent's use of the Services. If we learn that personal information from users less than 18 years of age or the equivalent age as specified by law in your jurisdiction has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we may have collected from children under age 18 or the equivalent age as specified by law in your jurisdiction, please contact us at <a href="mailto:inkcore.shop@outlook.com">inkcore.shop@outlook.com</a>.</p>

                <h2>9. WHAT ARE YOUR PRIVACY RIGHTS?</h2>
                <p><strong>In Short:</strong> Depending on your state of residence in the US or in some regions, such as Canada, you have rights that allow you greater access to and control over your personal information. You may review, change, or terminate your account at any time, depending on your country, province, or state of residence.</p>
                <p>In some regions (like Canada), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; (iv) if applicable, to data portability; and (v) not to be subject to automated decision-making. If a decision that produces legal or similarly significant effects is made solely by automated means, we will inform you, explain the main factors, and offer a simple way to request human review. In certain circumstances, you may also have the right to object to the processing of your personal information. You can make such a request by contacting us by using the contact details provided in the section "HOW CAN YOU CONTACT US ABOUT THIS NOTICE?" below.</p>
                <p>We will consider and act upon any request in accordance with applicable data protection laws.</p>
                <p><strong>Withdrawing your consent:</strong> If we are relying on your consent to process your personal information, which may be express and/or implied consent depending on the applicable law, you have the right to withdraw your consent at any time. You can withdraw your consent at any time by contacting us by using the contact details provided in the section "HOW CAN YOU CONTACT US ABOUT THIS NOTICE?" below.</p>
                <p>However, please note that this will not affect the lawfulness of the processing before its withdrawal nor, when applicable law allows, will it affect the processing of your personal information conducted in reliance on lawful processing grounds other than consent.</p>
                <p><strong>Account Information</strong></p>
                <p>If you would at any time like to review or change the information in your account or terminate your account, you can:</p>
                <ul>
                    <li>Contact us using the contact information provided.</li>
                </ul>
                <p>Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, we may retain some information in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our legal terms and/or comply with applicable legal requirements.</p>
                <p>If you have questions or comments about your privacy rights, you may email us at <a href="mailto:inkcore.shop@outlook.com">inkcore.shop@outlook.com</a>.</p>

                <h2>10. CONTROLS FOR DO-NOT-TRACK FEATURES</h2>
                <p>Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage, no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this Privacy Notice.</p>
                <p>California law requires us to let you know how we respond to web browser DNT signals. Because there currently is not an industry or legal standard for recognizing or honoring DNT signals, we do not respond to them at this time.</p>

                <h2>11. DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</h2>
                <p><strong>In Short:</strong> If you are a resident of California, Colorado, Connecticut, Delaware, Florida, Indiana, Iowa, Kentucky, Maryland, Minnesota, Montana, Nebraska, New Hampshire, New Jersey, Oregon, Rhode Island, Tennessee, Texas, Utah, or Virginia, you may have the right to request access to and receive details about the personal information we maintain about you and how we have processed it, correct inaccuracies, get a copy of, or delete your personal information. You may also have the right to withdraw your consent to our processing of your personal information. These rights may be limited in some circumstances by applicable law. More information is provided below.</p>
                <p><strong>Categories of Personal Information We Collect</strong></p>
                <p>The table below shows the categories of personal information we have collected in the past twelve (12) months. The table includes illustrative examples of each category and does not reflect the personal information we collect from you. For a comprehensive inventory of all personal information we process, please refer to the section "WHAT INFORMATION DO WE COLLECT?"</p>
                
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                    <thead>
                        <tr style="border-bottom: 2px solid #e2e8f0; text-align: left;">
                            <th style="padding: 12px;">Category</th>
                            <th style="padding: 12px;">Examples</th>
                            <th style="padding: 12px;">Collected</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom: 1px solid #f1f5f9;">
                            <td style="padding: 12px;">A. Identifiers</td>
                            <td style="padding: 12px;">Contact details, such as real name, alias, postal address, telephone or mobile contact number, unique personal identifier, online identifier, Internet Protocol address, email address, and account name</td>
                            <td style="padding: 12px;">NO</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #f1f5f9;">
                            <td style="padding: 12px;">B. Personal information as defined in the California Customer Records statute</td>
                            <td style="padding: 12px;">Name, contact information, education, employment, employment history, and financial information</td>
                            <td style="padding: 12px;">YES</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #f1f5f9;">
                            <td style="padding: 12px;">C. Protected classification characteristics under state or federal law</td>
                            <td style="padding: 12px;">Gender, age, date of birth, race and ethnicity, national origin, marital status, and other demographic data</td>
                            <td style="padding: 12px;">NO</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #f1f5f9;">
                            <td style="padding: 12px;">D. Commercial information</td>
                            <td style="padding: 12px;">Transaction information, purchase history, financial details, and payment information</td>
                            <td style="padding: 12px;">NO</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #f1f5f9;">
                            <td style="padding: 12px;">E. Biometric information</td>
                            <td style="padding: 12px;">Fingerprints and voiceprints</td>
                            <td style="padding: 12px;">NO</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #f1f5f9;">
                            <td style="padding: 12px;">F. Internet or other similar network activity</td>
                            <td style="padding: 12px;">Browsing history, search history, online behavior, interest data, and interactions with our and other websites, applications, systems, and advertisements</td>
                            <td style="padding: 12px;">NO</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #f1f5f9;">
                            <td style="padding: 12px;">G. Geolocation data</td>
                            <td style="padding: 12px;">Device location</td>
                            <td style="padding: 12px;">NO</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #f1f5f9;">
                            <td style="padding: 12px;">H. Audio, electronic, sensory, or similar information</td>
                            <td style="padding: 12px;">Images and audio, video or call recordings created in connection with our business activities</td>
                            <td style="padding: 12px;">NO</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #f1f5f9;">
                            <td style="padding: 12px;">I. Professional or employment-related information</td>
                            <td style="padding: 12px;">Business contact details in order to provide you our Services at a business level or job title, work history, and professional qualifications if you apply for a job with us</td>
                            <td style="padding: 12px;">NO</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #f1f5f9;">
                            <td style="padding: 12px;">J. Education Information</td>
                            <td style="padding: 12px;">Student records and directory information</td>
                            <td style="padding: 12px;">NO</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #f1f5f9;">
                            <td style="padding: 12px;">K. Inferences drawn from collected personal information</td>
                            <td style="padding: 12px;">Inferences drawn from any of the collected personal information listed above to create a profile or summary about, for example, an individual's preferences and characteristics</td>
                            <td style="padding: 12px;">NO</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #f1f5f9;">
                            <td style="padding: 12px;">L. Sensitive personal information</td>
                            <td style="padding: 12px;"></td>
                            <td style="padding: 12px;">NO</td>
                        </tr>
                    </tbody>
                </table>
                
                <p>We may also collect other personal information outside of these categories through instances where you interact with us in person, online, or by phone or mail in the context of:</p>
                <ul>
                    <li>Receiving help through our customer support channels;</li>
                    <li>Participation in customer surveys or contests; and</li>
                    <li>Facilitation in the delivery of our Services and to respond to your inquiries.</li>
                </ul>
                <p>We will use and retain the collected personal information as needed to provide the Services or for:</p>
                <ul>
                    <li>Category B - As long as the user has an account with us</li>
                </ul>
                
                <p><strong>Sources of Personal Information</strong></p>
                <p>Learn more about the sources of personal information we collect in "WHAT INFORMATION DO WE COLLECT?"</p>
                
                <p><strong>How We Use and Share Personal Information</strong></p>
                <p>Learn more about how we use your personal information in the section, "HOW DO WE PROCESS YOUR INFORMATION?"</p>
                
                <p><strong>Will your information be shared with anyone else?</strong></p>
                <p>We may disclose your personal information with our service providers pursuant to a written contract between us and each service provider. Learn more about how we disclose personal information to in the section, "WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?"</p>
                <p>We may use your personal information for our own business purposes, such as for undertaking internal research for technological development and demonstration. This is not considered to be "selling" of your personal information.</p>
                <p>We have not disclosed, sold, or shared any personal information to third parties for a business or commercial purpose in the preceding twelve (12) months. We will not sell or share personal information in the future belonging to website visitors, users, and other consumers.</p>
                
                <p><strong>Your Rights</strong></p>
                <p>You have rights under certain US state data protection laws. However, these rights are not absolute, and in certain cases, we may decline your request as permitted by law. These rights include:</p>
                <ul>
                    <li>Right to know whether or not we are processing your personal data</li>
                    <li>Right to access your personal data</li>
                    <li>Right to correct inaccuracies in your personal data</li>
                    <li>Right to request the deletion of your personal data</li>
                    <li>Right to obtain a copy of the personal data you previously shared with us</li>
                    <li>Right to non-discrimination for exercising your rights</li>
                    <li>Right to opt out of the processing of your personal data if it is used for targeted advertising (or sharing as defined under California's privacy law), the sale of personal data, or profiling in furtherance of decisions that produce legal or similarly significant effects ("profiling")</li>
                </ul>
                <p>Depending upon the state where you live, you may also have the following rights:</p>
                <ul>
                    <li>Right to access the categories of personal data being processed (as permitted by applicable law, including the privacy law in Minnesota)</li>
                    <li>Right to obtain a list of the categories of third parties to which we have disclosed personal data (as permitted by applicable law, including the privacy law in California, Delaware, and Maryland)</li>
                    <li>Right to obtain a list of specific third parties to which we have disclosed personal data (as permitted by applicable law, including the privacy law in Minnesota and Oregon)</li>
                    <li>Right to obtain a list of third parties to which we have sold personal data (as permitted by applicable law, including the privacy law in Connecticut)</li>
                    <li>Right to review, understand, question, and depending on where you live, correct how personal data has been profiled (as permitted by applicable law, including the privacy law in Connecticut and Minnesota)</li>
                    <li>Right to limit use and disclosure of sensitive personal data (as permitted by applicable law, including the privacy law in California)</li>
                    <li>Right to opt out of the collection of sensitive data and personal data collected through the operation of a voice or facial recognition feature (as permitted by applicable law, including the privacy law in Florida)</li>
                </ul>
                
                <p><strong>How to Exercise Your Rights</strong></p>
                <p>To exercise these rights, you can contact us by submitting a data subject access request, by emailing us at <a href="mailto:inkcore.shop@outlook.com">inkcore.shop@outlook.com</a>, by calling toll-free at 1-530-564-1063, or by referring to the contact details at the bottom of this document.</p>
                <p>Under certain US state data protection laws, you can designate an authorized agent to make a request on your behalf. We may deny a request from an authorized agent that does not submit proof that they have been validly authorized to act on your behalf in accordance with applicable laws.</p>
                
                <p><strong>Request Verification</strong></p>
                <p>Upon receiving your request, we will need to verify your identity to determine you are the same person about whom we have the information in our system. We will only use personal information provided in your request to verify your identity or authority to make the request. However, if we cannot verify your identity from the information already maintained by us, we may request that you provide additional information for the purposes of verifying your identity and for security or fraud-prevention purposes.</p>
                <p>If you submit the request through an authorized agent, we may need to collect additional information to verify your identity before processing your request and the agent will need to provide a written and signed permission from you to submit such request on your behalf.</p>
                
                <p><strong>Appeals</strong></p>
                <p>Under certain US state data protection laws, if we decline to take action regarding your request, you may appeal our decision by emailing us at <a href="mailto:inkcore.shop@outlook.com">inkcore.shop@outlook.com</a>. We will inform you in writing of any action taken or not taken in response to the appeal, including a written explanation of the reasons for the decisions. If your appeal is denied, you may submit a complaint to your state attorney general.</p>
                
                <p><strong>California "Shine The Light" Law</strong></p>
                <p>California Civil Code Section 1798.83, also known as the "Shine The Light" law, permits our users who are California residents to request and obtain from us, once a year and free of charge, information about categories of personal information (if any) we disclosed to third parties for direct marketing purposes and the names and addresses of all third parties with which we shared personal information in the immediately preceding calendar year. If you are a California resident and would like to make such a request, please submit your request in writing to us by using the contact details provided in the section "HOW CAN YOU CONTACT US ABOUT THIS NOTICE?"</p>
                
                <h2>12. DO WE MAKE UPDATES TO THIS NOTICE?</h2>
                <p><strong>In Short:</strong> Yes, we will update this notice as necessary to stay compliant with relevant laws.</p>
                <p>We may update this Privacy Notice from time to time. The updated version will be indicated by an updated "Revised" date at the top of this Privacy Notice. If we make material changes to this Privacy Notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this Privacy Notice frequently to be informed of how we are protecting your information.</p>
                
                <h2>13. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h2>
                <p>If you have questions or comments about this notice, you may email us at <a href="mailto:inkcore.shop@outlook.com">inkcore.shop@outlook.com</a> or contact us by post at:</p>
                <p>
                    Ink Core<br/>
                    A Subsidiary of PrimeFix Solutions LLC<br/>
                    258 W 39th St,<br/>
                    New York, NY 10018<br/>
                    United States
                </p>
                
                <h2>14. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</h2>
                <p>Based on the applicable laws of your country or state of residence in the US, you may have the right to request access to the personal information we collect from you, details about how we have processed it, correct inaccuracies, or delete your personal information. You may also have the right to withdraw your consent to our processing of your personal information. These rights may be limited in some circumstances by applicable law. To request to review, update, or delete your personal information, please fill out and submit a data subject access request.</p>
            `
        },
        terms: {
            meta_title: 'Terms and Conditions | Inkcore',
            meta_description: 'Legal Terms and Conditions for using Inkcore services and website.',
            content: `
                <h1>TERMS AND CONDITIONS</h1>
                <p><strong>Last updated February 04, 2026</strong></p>
                
                <h2>AGREEMENT TO OUR LEGAL TERMS</h2>
                <p>We are Ink Core ("Company," "we," "us," or "our"), a company registered in New York, United States at 258 W 39th St, , New York, NY 10018.</p>
                <p>We operate the website <a href="https://inkcore.shop/">https://inkcore.shop/</a> (the "Site"), as well as any other related products and services that refer or link to these legal terms (the "Legal Terms") (collectively, the "Services").</p>
                <p>Inkcore is your reliable online destination for printers, ink, toner, and essential office technology solutions. We are committed to making printing simple, accessible, and efficient for homes, businesses, and professionals alike.</p>
                <p>You can contact us by phone at +1-530-564-1063, email at inkcore.shop@outlook.com, or by mail to 258 W 39th St, , New York, NY 10018, United States.</p>
                <p>These Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you"), and Ink Core, concerning your access to and use of the Services. You agree that by accessing the Services, you have read, understood, and agreed to be bound by all of these Legal Terms. IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.</p>
                <p>Supplemental terms and conditions or documents that may be posted on the Services from time to time are hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make changes or modifications to these Legal Terms at any time and for any reason. We will alert you about any changes by updating the "Last updated" date of these Legal Terms, and you waive any right to receive specific notice of each such change. It is your responsibility to periodically review these Legal Terms to stay informed of updates. You will be subject to, and will be deemed to have been made aware of and to have accepted, the changes in any revised Legal Terms by your continued use of the Services after the date such revised Legal Terms are posted.</p>
                <p>The Services are intended for users who are at least 18 years old. Persons under the age of 18 are not permitted to use or register for the Services.</p>
                <p>We recommend that you print a copy of these Legal Terms for your records.</p>
                
                <h2>TABLE OF CONTENTS</h2>
                <ol>
                    <li>OUR SERVICES</li>
                    <li>INTELLECTUAL PROPERTY RIGHTS</li>
                    <li>USER REPRESENTATIONS</li>
                    <li>USER REGISTRATION</li>
                    <li>PRODUCTS</li>
                    <li>PURCHASES AND PAYMENT</li>
                    <li>RETURN POLICY</li>
                    <li>PROHIBITED ACTIVITIES</li>
                    <li>USER GENERATED CONTRIBUTIONS</li>
                    <li>CONTRIBUTION LICENSE</li>
                    <li>GUIDELINES FOR REVIEWS</li>
                    <li>SERVICES MANAGEMENT</li>
                    <li>PRIVACY POLICY</li>
                    <li>TERM AND TERMINATION</li>
                    <li>MODIFICATIONS AND INTERRUPTIONS</li>
                    <li>GOVERNING LAW</li>
                    <li>DISPUTE RESOLUTION</li>
                    <li>CORRECTIONS</li>
                    <li>DISCLAIMER</li>
                    <li>LIMITATIONS OF LIABILITY</li>
                    <li>INDEMNIFICATION</li>
                    <li>USER DATA</li>
                    <li>ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES</li>
                    <li>CALIFORNIA USERS AND RESIDENTS</li>
                    <li>MISCELLANEOUS</li>
                    <li>CONTACT US</li>
                </ol>
                
                <h2>1. OUR SERVICES</h2>
                <p>The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Services from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.</p>
                <p>The Services are not tailored to comply with industry-specific regulations (Health Insurance Portability and Accountability Act (HIPAA), Federal Information Security Management Act (FISMA), etc.), so if your interactions would be subjected to such laws, you may not use the Services. You may not use the Services in a way that would violate the Gramm-Leach-Bliley Act (GLBA).</p>
                
                <h2>2. INTELLECTUAL PROPERTY RIGHTS</h2>
                <p><strong>Our intellectual property</strong></p>
                <p>We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services (collectively, the "Content"), as well as the trademarks, service marks, and logos contained therein (the "Marks").</p>
                <p>Our Content and Marks are protected by copyright and trademark laws (and various other intellectual property rights and unfair competition laws) and treaties in the United States and around the world.</p>
                <p>The Content and Marks are provided in or through the Services "AS IS" for your personal, non-commercial use or internal business purpose only.</p>
                <p><strong>Your use of our Services</strong></p>
                <p>Subject to your compliance with these Legal Terms, including the "PROHIBITED ACTIVITIES" section below, we grant you a non-exclusive, non-transferable, revocable license to:</p>
                <ul>
                    <li>access the Services; and</li>
                    <li>download or print a copy of any portion of the Content to which you have properly gained access,</li>
                </ul>
                <p>solely for your personal, non-commercial use or internal business purpose.</p>
                <p>Except as set out in this section or elsewhere in our Legal Terms, no part of the Services and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.</p>
                <p>If you wish to make any use of the Services, Content, or Marks other than as set out in this section or elsewhere in our Legal Terms, please address your request to: inkcore.shop@outlook.com. If we ever grant you the permission to post, reproduce, or publicly display any part of our Services or Content, you must identify us as the owners or licensors of the Services, Content, or Marks and ensure that any copyright or proprietary notice appears or is visible on posting, reproducing, or displaying our Content.</p>
                <p>We reserve all rights not expressly granted to you in and to the Services, Content, and Marks.</p>
                <p>Any breach of these Intellectual Property Rights will constitute a material breach of our Legal Terms and your right to use our Services will terminate immediately.</p>
                <p><strong>Your submissions</strong></p>
                <p>Please review this section and the "PROHIBITED ACTIVITIES" section carefully prior to using our Services to understand the (a) rights you give us and (b) obligations you have when you post or upload any content through the Services.</p>
                <p><strong>Submissions:</strong> By directly sending us any question, comment, suggestion, idea, feedback, or other information about the Services ("Submissions"), you agree to assign to us all intellectual property rights in such Submission. You agree that we shall own this Submission and be entitled to its unrestricted use and dissemination for any lawful purpose, commercial or otherwise, without acknowledgment or compensation to you.</p>
                <p><strong>You are responsible for what you post or upload:</strong> By sending us Submissions through any part of the Services you:</p>
                <ul>
                    <li>confirm that you have read and agree with our "PROHIBITED ACTIVITIES" and will not post, send, publish, upload, or transmit through the Services any Submission that is illegal, harassing, hateful, harmful, defamatory, obscene, bullying, abusive, discriminatory, threatening to any person or group, sexually explicit, false, inaccurate, deceitful, or misleading;</li>
                    <li>to the extent permissible by applicable law, waive any and all moral rights to any such Submission;</li>
                    <li>warrant that any such Submission are original to you or that you have the necessary rights and licenses to submit such Submissions and that you have full authority to grant us the above-mentioned rights in relation to your Submissions; and</li>
                    <li>warrant and represent that your Submissions do not constitute confidential information.</li>
                </ul>
                <p>You are solely responsible for your Submissions and you expressly agree to reimburse us for any and all losses that we may suffer because of your breach of (a) this section, (b) any third party's intellectual property rights, or (c) applicable law.</p>
                
                <h2>3. USER REPRESENTATIONS</h2>
                <p>By using the Services, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Legal Terms; (4) you are not a minor in the jurisdiction in which you reside; (5) you will not access the Services through automated or non-human means, whether through a bot, script or otherwise; (6) you will not use the Services for any illegal or unauthorized purpose; and (7) your use of the Services will not violate any applicable law or regulation.</p>
                <p>If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the Services (or any portion thereof).</p>
                
                <h2>4. USER REGISTRATION</h2>
                <p>You may be required to register to use the Services. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.</p>
                
                <h2>5. PRODUCTS</h2>
                <p>We make every effort to display as accurately as possible the colors, features, specifications, and details of the products available on the Services. However, we do not guarantee that the colors, features, specifications, and details of the products will be accurate, complete, reliable, current, or free of other errors, and your electronic display may not accurately reflect the actual colors and details of the products. All products are subject to availability, and we cannot guarantee that items will be in stock. We reserve the right to discontinue any products at any time for any reason. Prices for all products are subject to change.</p>
                
                <h2>6. PURCHASES AND PAYMENT</h2>
                <p>We accept the following forms of payment:</p>
                <ul>
                    <li>Visa</li>
                    <li>Mastercard</li>
                    <li>PayPal</li>
                </ul>
                <p>You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Services. You further agree to promptly update account and payment information, including email address, payment method, and payment card expiration date, so that we can complete your transactions and contact you as needed. Sales tax will be added to the price of purchases as deemed required by us. We may change prices at any time. All payments shall be in US dollars.</p>
                <p>You agree to pay all charges at the prices then in effect for your purchases and any applicable shipping fees, and you authorize us to charge your chosen payment provider for any such amounts upon placing your order. We reserve the right to correct any errors or mistakes in pricing, even if we have already requested or received payment.</p>
                <p>We reserve the right to refuse any order placed through the Services. We may, in our sole discretion, limit or cancel quantities purchased per person, per household, or per order. These restrictions may include orders placed by or under the same customer account, the same payment method, and/or orders that use the same billing or shipping address. We reserve the right to limit or prohibit orders that, in our sole judgment, appear to be placed by dealers, resellers, or distributors.</p>
                
                <h2>7. RETURN POLICY</h2>
                <p>Please review our Return Policy prior to making any purchases: <a href="https://inkcore.shop/pages/refund">https://inkcore.shop/pages/refund</a>.</p>
                
                <h2>8. PROHIBITED ACTIVITIES</h2>
                <p>You may not access or use the Services for any purpose other than that for which we make the Services available. The Services may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.</p>
                <p>As a user of the Services, you agree not to:</p>
                <ul>
                    <li>Systematically retrieve data or other content from the Services to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li>
                    <li>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.</li>
                    <li>Circumvent, disable, or otherwise interfere with security-related features of the Services, including features that prevent or restrict the use or copying of any Content or enforce limitations on the use of the Services and/or the Content contained therein.</li>
                    <li>Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Services.</li>
                    <li>Use any information obtained from the Services in order to harass, abuse, or harm another person.</li>
                    <li>Make improper use of our support services or submit false reports of abuse or misconduct.</li>
                    <li>Use the Services in a manner inconsistent with any applicable laws or regulations.</li>
                    <li>Engage in unauthorized framing of or linking to the Services.</li>
                    <li>Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material, including excessive use of capital letters and spamming (continuous posting of repetitive text), that interferes with any party's uninterrupted use and enjoyment of the Services or modifies, impairs, disrupts, alters, or interferes with the use, features, functions, operation, or maintenance of the Services.</li>
                    <li>Engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering and extraction tools.</li>
                    <li>Delete the copyright or other proprietary rights notice from any Content.</li>
                    <li>Attempt to impersonate another user or person or use the username of another user.</li>
                    <li>Upload or transmit (or attempt to upload or to transmit) any material that acts as a passive or active information collection or transmission mechanism, including without limitation, clear graphics interchange formats ("gifs"), 1x1 pixels, web bugs, cookies, or other similar devices (sometimes referred to as "spyware" or "passive collection mechanisms" or "pcms").</li>
                    <li>Interfere with, disrupt, or create an undue burden on the Services or the networks or services connected to the Services.</li>
                    <li>Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the Services to you.</li>
                    <li>Attempt to bypass any measures of the Services designed to prevent or restrict access to the Services, or any portion of the Services.</li>
                    <li>Copy or adapt the Services' software, including but not limited to Flash, PHP, HTML, JavaScript, or other code.</li>
                    <li>Except as permitted by applicable law, decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making up a part of the Services.</li>
                    <li>Except as may be the result of standard search engine or Internet browser usage, use, launch, develop, or distribute any automated system, including without limitation, any spider, robot, cheat utility, scraper, or offline reader that accesses the Services, or use or launch any unauthorized script or other software.</li>
                    <li>Use a buying agent or purchasing agent to make purchases on the Services.</li>
                    <li>Make any unauthorized use of the Services, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email, or creating user accounts by automated means or under false pretenses.</li>
                    <li>Use the Services as part of any effort to compete with us or otherwise use the Services and/or the Content for any revenue-generating endeavor or commercial enterprise.</li>
                    <li>Use the Services to advertise or offer to sell goods and services.</li>
                    <li>Sell or otherwise transfer your profile.</li>
                </ul>
                
                <h2>9. USER GENERATED CONTRIBUTIONS</h2>
                <p>The Services does not offer users to submit or post content. We may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on the Services, including but not limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal information or other material (collectively, "Contributions"). Contributions may be viewable by other users of the Services and through third-party websites. As such, any Contributions you transmit may be treated in accordance with the Services' Privacy Policy. When you create or make available any Contributions, you thereby represent and warrant that:</p>
                <ul>
                    <li>The creation, distribution, transmission, public display, or performance, and the accessing, downloading, or copying of your Contributions do not and will not infringe the proprietary rights, including but not limited to the copyright, patent, trademark, trade secret, or moral rights of any third party.</li>
                    <li>You are the creator and owner of or have the necessary licenses, rights, consents, releases, and permissions to use and to authorize us, the Services, and other users of the Services to use your Contributions in any manner contemplated by the Services and these Legal Terms.</li>
                    <li>You have the written consent, release, and/or permission of each and every identifiable individual person in your Contributions to use the name or likeness of each and every such identifiable individual person to enable inclusion and use of your Contributions in any manner contemplated by the Services and these Legal Terms.</li>
                    <li>Your Contributions are not false, inaccurate, or misleading.</li>
                    <li>Your Contributions are not unsolicited or unauthorized advertising, promotional materials, pyramid schemes, chain letters, spam, mass mailings, or other forms of solicitation.</li>
                    <li>Your Contributions are not obscene, lewd, lascivious, filthy, violent, harassing, libelous, slanderous, or otherwise objectionable (as determined by us).</li>
                    <li>Your Contributions do not ridicule, mock, disparage, intimidate, or abuse anyone.</li>
                    <li>Your Contributions are not used to harass or threaten (in the legal sense of those terms) any other person and to promote violence against a specific person or class of people.</li>
                    <li>Your Contributions do not violate any applicable law, regulation, or rule.</li>
                    <li>Your Contributions do not violate the privacy or publicity rights of any third party.</li>
                    <li>Your Contributions do not violate any applicable law concerning child pornography, or otherwise intended to protect the health or well-being of minors.</li>
                    <li>Your Contributions do not include any offensive comments that are connected to race, national origin, gender, sexual preference, or physical handicap.</li>
                    <li>Your Contributions do not otherwise violate, or link to material that violates, any provision of these Legal Terms, or any applicable law or regulation.</li>
                </ul>
                <p>Any use of the Services in violation of the foregoing violates these Legal Terms and may result in, among other things, termination or suspension of your rights to use the Services.</p>
                
                <h2>10. CONTRIBUTION LICENSE</h2>
                <p>You and Services agree that we may access, store, process, and use any information and personal data that you provide following the terms of the Privacy Policy and your choices (including settings).</p>
                <p>By submitting suggestions or other feedback regarding the Services, you agree that we can use and share such feedback for any purpose without compensation to you.</p>
                <p>We do not assert any ownership over your Contributions. You retain full ownership of all of your Contributions and any intellectual property rights or other proprietary rights associated with your Contributions. We are not liable for any statements or representations in your Contributions provided by you in any area on the Services. You are solely responsible for your Contributions to the Services and you expressly agree to exonerate us from any and all responsibility and to refrain from any legal action against us regarding your Contributions.</p>
                
                <h2>11. GUIDELINES FOR REVIEWS</h2>
                <p>We may provide you areas on the Services to leave reviews or ratings. When posting a review, you must comply with the following criteria: (1) you should have firsthand experience with the person/entity being reviewed; (2) your reviews should not contain offensive profanity, or abusive, racist, offensive, or hateful language; (3) your reviews should not contain discriminatory references based on religion, race, gender, national origin, age, marital status, sexual orientation, or disability; (4) your reviews should not contain references to illegal activity; (5) you should not be affiliated with competitors if posting negative reviews; (6) you should not make any conclusions as to the legality of conduct; (7) you may not post any false or misleading statements; and (8) you may not organize a campaign encouraging others to post reviews, whether positive or negative.</p>
                <p>We may accept, reject, or remove reviews in our sole discretion. We have absolutely no obligation to screen reviews or to delete reviews, even if anyone considers reviews objectionable or inaccurate. Reviews are not endorsed by us, and do not necessarily represent our opinions or the views of any of our affiliates or partners. We do not assume liability for any review or for any claims, liabilities, or losses resulting from any review. By posting a review, you hereby grant to us a perpetual, non-exclusive, worldwide, royalty-free, fully paid, assignable, and sublicensable right and license to reproduce, modify, translate, transmit by any means, display, perform, and/or distribute all content relating to review.</p>
                
                <h2>12. SERVICES MANAGEMENT</h2>
                <p>We reserve the right, but not the obligation, to: (1) monitor the Services for violations of these Legal Terms; (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Legal Terms, including without limitation, reporting such user to law enforcement authorities; (3) in our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or disable (to the extent technologically feasible) any of your Contributions or any portion thereof; (4) in our sole discretion and without limitation, notice, or liability, to remove from the Services or otherwise disable all files and content that are excessive in size or are in any way burdensome to our systems; and (5) otherwise manage the Services in a manner designed to protect our rights and property and to facilitate the proper functioning of the Services.</p>
                
                <h2>13. PRIVACY POLICY</h2>
                <p>We care about data privacy and security. Please review our Privacy Policy: <a href="https://inkcore.shop/pages/privacy">https://inkcore.shop/pages/privacy</a>. By using the Services, you agree to be bound by our Privacy Policy, which is incorporated into these Legal Terms. Please be advised the Services are hosted in Sweden. If you access the Services from any other region of the world with laws or other requirements governing personal data collection, use, or disclosure that differ from applicable laws in Sweden, then through your continued use of the Services, you are transferring your data to Sweden, and you expressly consent to have your data transferred to and processed in Sweden.</p>
                
                <h2>14. TERM AND TERMINATION</h2>
                <p>These Legal Terms shall remain in full force and effect while you use the Services. WITHOUT LIMITING ANY OTHER PROVISION OF THESE LEGAL TERMS, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SERVICES (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE LEGAL TERMS OR OF ANY APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR USE OR PARTICIPATION IN THE SERVICES OR DELETE YOUR ACCOUNT AND ANY CONTENT OR INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT WARNING, IN OUR SOLE DISCRETION.</p>
                <p>If we terminate or suspend your account for any reason, you are prohibited from registering and creating a new account under your name, a fake or borrowed name, or the name of any third party, even if you may be acting on behalf of the third party. In addition to terminating or suspending your account, we reserve the right to take appropriate legal action, including without limitation pursuing civil, criminal, and injunctive redress.</p>
                
                <h2>15. MODIFICATIONS AND INTERRUPTIONS</h2>
                <p>We reserve the right to change, modify, or remove the contents of the Services at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Services. We also reserve the right to modify or discontinue all or part of the Services without notice at any time. We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Services.</p>
                <p>We cannot guarantee the Services will be available at all times. We may experience hardware, software, or other problems or need to perform maintenance related to the Services, resulting in interruptions, delays, or errors. We reserve the right to change, revise, update, suspend, discontinue, or otherwise modify the Services at any time or for any reason without notice to you. You agree that we have no liability whatsoever for any loss, damage, or inconvenience caused by your inability to access or use the Services during any downtime or discontinuance of the Services. Nothing in these Legal Terms will be construed to obligate us to maintain and support the Services or to supply any corrections, updates, or releases in connection therewith.</p>
                
                <h2>16. GOVERNING LAW</h2>
                <p>These Legal Terms and your use of the Services are governed by and construed in accordance with the laws of the State of New York applicable to agreements made and to be entirely performed within the State of New York, without regard to its conflict of law principles.</p>
                
                <h2>17. DISPUTE RESOLUTION</h2>
                <p>Any legal action of whatever nature brought by either you or us (collectively, the "Parties" and individually, a "Party") shall be commenced or prosecuted in the state and federal courts located in New York, and the Parties hereby consent to, and waive all defenses of lack of personal jurisdiction and forum non conveniens with respect to venue and jurisdiction in such state and federal courts. Application of the United Nations Convention on Contracts for the International Sale of Goods and the Uniform Computer Information Transaction Act (UCITA) are excluded from these Legal Terms. In no event shall any claim, action, or proceeding brought by either Party related in any way to the Services be commenced more than one (1) years after the cause of action arose.</p>
                
                <h2>18. CORRECTIONS</h2>
                <p>There may be information on the Services that contains typographical errors, inaccuracies, or omissions, including descriptions, pricing, availability, and various other information. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the Services at any time, without prior notice.</p>
                
                <h2>19. DISCLAIMER</h2>
                <p>THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE SERVICES' CONTENT OR THE CONTENT OF ANY WEBSITES OR MOBILE APPLICATIONS LINKED TO THE SERVICES AND WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS, (2) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE SERVICES, (3) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION STORED THEREIN, (4) ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE SERVICES, (5) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE TRANSMITTED TO OR THROUGH THE SERVICES BY ANY THIRD PARTY, AND/OR (6) ANY ERRORS OR OMISSIONS IN ANY CONTENT AND MATERIALS OR FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE SERVICES. WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED OR OFFERED BY A THIRD PARTY THROUGH THE SERVICES, ANY HYPERLINKED WEBSITE, OR ANY WEBSITE OR MOBILE APPLICATION FEATURED IN ANY BANNER OR OTHER ADVERTISING, AND WE WILL NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND ANY THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES. AS WITH THE PURCHASE OF A PRODUCT OR SERVICE THROUGH ANY MEDIUM OR IN ANY ENVIRONMENT, YOU SHOULD USE YOUR BEST JUDGMENT AND EXERCISE CAUTION WHERE APPROPRIATE.</p>
                
                <h2>20. LIMITATIONS OF LIABILITY</h2>
                <p>IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, OUR LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER AND REGARDLESS OF THE FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO THE AMOUNT PAID, IF ANY, BY YOU TO US. CERTAIN US STATE LAWS AND INTERNATIONAL LAWS DO NOT ALLOW LIMITATIONS ON IMPLIED WARRANTIES OR THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES. IF THESE LAWS APPLY TO YOU, SOME OR ALL OF THE ABOVE DISCLAIMERS OR LIMITATIONS MAY NOT APPLY TO YOU, AND YOU MAY HAVE ADDITIONAL RIGHTS.</p>
                
                <h2>21. INDEMNIFICATION</h2>
                <p>You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys' fees and expenses, made by any third party due to or arising out of: (1) use of the Services; (2) breach of these Legal Terms; (3) any breach of your representations and warranties set forth in these Legal Terms; (4) your violation of the rights of a third party, including but not limited to intellectual property rights; or (5) any overt harmful act toward any other user of the Services with whom you connected via the Services. Notwithstanding the foregoing, we reserve the right, at your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify us, and you agree to cooperate, at your expense, with our defense of such claims. We will use reasonable efforts to notify you of any such claim, action, or proceeding which is subject to this indemnification upon becoming aware of it.</p>
                
                <h2>22. USER DATA</h2>
                <p>We will maintain certain data that you transmit to the Services for the purpose of managing the performance of the Services, as well as data relating to your use of the Services. Although we perform regular routine backups of data, you are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the Services. You agree that we shall have no liability to you for any loss or corruption of any such data, and you hereby waive any right of action against us arising from any such loss or corruption of such data.</p>
                
                <h2>23. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES</h2>
                <p>Visiting the Services, sending us emails, and completing online forms constitute electronic communications. You consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and other communications we provide to you electronically, via email and on the Services, satisfy any legal requirement that such communication be in writing. YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE SERVICES. You hereby waive any rights or requirements under any statutes, regulations, rules, ordinances, or other laws in any jurisdiction which require an original signature or delivery or retention of non-electronic records, or to payments or the granting of credits by any means other than electronic means.</p>
                
                <h2>24. CALIFORNIA USERS AND RESIDENTS</h2>
                <p>If any complaint with us is not satisfactorily resolved, you can contact the Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs in writing at 1625 North Market Blvd., Suite N 112, Sacramento, California 95834 or by telephone at (800) 952-5210 or (916) 445-1254.</p>
                
                <h2>25. MISCELLANEOUS</h2>
                <p>These Legal Terms and any policies or operating rules posted by us on the Services or in respect to the Services constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of these Legal Terms shall not operate as a waiver of such right or provision. These Legal Terms operate to the fullest extent permissible by law. We may assign any or all of our rights and obligations to others at any time. We shall not be responsible or liable for any loss, damage, delay, or failure to act caused by any cause beyond our reasonable control. If any provision or part of a provision of these Legal Terms is determined to be unlawful, void, or unenforceable, that provision or part of the provision is deemed severable from these Legal Terms and does not affect the validity and enforceability of any remaining provisions. There is no joint venture, partnership, employment or agency relationship created between you and us as a result of these Legal Terms or use of the Services. You agree that these Legal Terms will not be construed against us by virtue of having drafted them. You hereby waive any and all defenses you may have based on the electronic form of these Legal Terms and the lack of signing by the parties hereto to execute these Legal Terms.</p>
                
                <h2>26. CONTACT US</h2>
                <p>In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us at:</p>
                <p>
                    Ink Core<br/>
                    A subsidiary of PrimeFix Solutions LLC<br/>
                    258 W 39th St,<br/>
                    New York, NY 10018<br/>
                    United States<br/>
                    Phone: +1-530-564-1063<br/>
                    inkcore.shop@outlook.com
                </p>
            `
        },
        shipping: {
            meta_title: 'Shipping Policy | Inkcore',
            meta_description: 'Shipping and Delivery Policy for Inkcore products.',
            content: `
                <h1>SHIPPING DELIVERY POLICY</h1>
                <p><strong>Last updated February 04, 2026</strong></p>
                <p>This Shipping & Delivery Policy is part of our Terms and Conditions ("Terms") and should be therefore read alongside our main Terms: <a href="https://inkcore.shop/pages/terms">https://inkcore.shop/pages/terms</a>.</p>
                <p>Please carefully review our Shipping & Delivery Policy when purchasing our products. This policy will apply to any order you place with us.</p>
                
                <h2>1. WHAT ARE MY SHIPPING DELIVERY OPTIONS?</h2>
                <p>We offer various shipping options. In some cases a third-party supplier may be managing our inventory and will be responsible for shipping your products.</p>
                <p><strong>Free Shipping</strong></p>
                <p>We offer free Standard shipping on all orders.</p>
                
                <h2>2. DO YOU DELIVER INTERNATIONALLY?</h2>
                <p>We do not offer international shipping.</p>
                
                <h2>3. WHAT HAPPENS IF MY ORDER IS DELAYED?</h2>
                <p>If delivery is delayed for any reason we will let you know as soon as possible and will advise you of a revised estimated date for delivery.</p>
                
                <h2>4. QUESTIONS ABOUT RETURNS?</h2>
                <p>If you have questions about returns, please review our Return Policy: <a href="https://inkcore.shop/pages/refund">https://inkcore.shop/pages/refund</a>.</p>
                
                <h2>5. HOW CAN YOU CONTACT US ABOUT THIS POLICY?</h2>
                <p>If you have any further questions or comments, you may contact us by:</p>
                <ul>
                    <li>Phone: +1-530-564-1063</li>
                    <li>Email: inkcore.shop@outlook.com</li>
                </ul>
            `
        },
        refund: {
            meta_title: 'Return Policy | Inkcore',
            meta_description: 'Return and Refund Policy for Inkcore products.',
            content: `
                <h1>RETURN POLICY</h1>
                <p><strong>Last updated February 04, 2026</strong></p>
                <p>Thank you for your purchase. We hope you are happy with your purchase. However, if you are not completely satisfied with your purchase for any reason, you may return it to us for a refund only. Please see below for more information on our return policy.</p>
                
                <h2>1. RETURNS</h2>
                <p>All returns must be postmarked within thirty (30) days of the purchase date. All returned items must be in new and unused condition, with all original tags and labels attached.</p>
                
                <h2>2. RETURN PROCESS</h2>
                <p>To return an item, place the item securely in its original packaging and include your proof of purchase, then mail your return to the following address:</p>
                <p>
                    Ink Core<br/>
                    Attn: Returns<br/>
                    258 W 39th St,<br/>
                    New York, NY 10018<br/>
                    United States
                </p>
                <p>Return shipping charges will be paid or reimbursed by us.</p>
                
                <h2>3. REFUNDS</h2>
                <p>After receiving your return and inspecting the condition of your item, we will process your return. Please allow at least seven (7) days from the receipt of your item to process your return. Refunds may take 1-2 billing cycles to appear on your credit card statement, depending on your credit card company. We will notify you by email when your return has been processed.</p>
                
                <h2>4. EXCEPTIONS</h2>
                <p>For defective or damaged products, please contact us at the contact details below to arrange a refund or exchange.</p>
                
                <h2>5. QUESTIONS</h2>
                <p>If you have any questions concerning our return policy, please contact us at:</p>
                <ul>
                    <li>+1-530-564-1063</li>
                    <li>inkcore.shop@outlook.com</li>
                </ul>
            `
        }
    };

    useEffect(() => {
        const fetchPolicy = async () => {
            if (staticPolicies[type]) {
                setPolicy(staticPolicies[type]);
                setLoading(false);
                return;
            }

            const websiteId = import.meta.env.VITE_WEBSITE_ID || 1;
            try {
                setLoading(true);
                const res = await api.get(`/policies`, { params: { website_id: websiteId } });
                if (res.data && res.data[type]) {
                    setPolicy(res.data[type]);
                } else {
                    setPolicy(null);
                }
            } catch (error) {
                console.error(`Failed to fetch policy: ${type}`, error);
                setPolicy(null);
            } finally {
                setLoading(false);
            }
        };
        fetchPolicy();
        window.scrollTo(0, 0);
    }, [type]);

    const pageTitle = policy?.meta_title?.split('|')[0].trim() || type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-50 pt-20">
                <div className="w-12 h-12 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div>
                <p className="text-slate-500 font-medium animate-pulse">Loading documentation...</p>
            </div>
        );
    }

    if (!policy) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-slate-50 pt-20">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-6">
                    <FileText size={40} />
                </div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Policy Not Found</h1>
                <p className="text-slate-500 mb-8 max-w-md">The document you are looking for does not exist or has been moved.</p>
                <Link to="/" className="px-8 py-3 bg-brand-600 text-white rounded-xl font-bold hover:bg-brand-700 transition-all shadow-lg shadow-brand-600/20">
                    Return to Home
                </Link>
            </div>
        );
    }

    const sectionConfig = {
        privacy: [
            "Information Collection", "Processing Info", "Legal Bases", "Data Sharing", 
            "Cookies & Tracking", "Retention Policy", "Data Security", "Minors Info", 
            "Privacy Rights", "Do-Not-Track", "US Resident Rights", "Updates", "Contact Us", "Data Review"
        ],
        terms: [
            "Our Services", "Intellectual Property", "User Representations", "Registration", 
            "Products", "Payment", "Return Policy", "Prohibited Activities", "Contributions",
            "License", "Reviews", "Management", "Privacy Policy", "Termination", "Modifications",
            "Governing Law", "Dispute Resolution", "Corrections", "Disclaimer", "Liability",
            "Indemnification", "User Data", "Electronic Comms", "California Users", "Miscellaneous", "Contact"
        ],
        cookies: [
            "What Are Cookies?", "How We Use Them", "Types of Cookies", "Managing Cookies", "Updates", "Contact"
        ],
        shipping: [
            "Shipping Options", "International", "Delays", "Returns", "Contact"
        ],
        refund: [
            "Returns", "Return Process", "Refunds", "Exceptions", "Questions"
        ]
    };

    const sections = sectionConfig[type] || [];

    const getIcon = () => {
        switch(type) {
            case 'privacy': return <Shield className="w-12 h-12 text-brand-600" />;
            case 'terms': return <Scale className="w-12 h-12 text-brand-600" />;
            case 'cookies': return <FileText className="w-12 h-12 text-brand-600" />;
            case 'shipping': return <ScrollText className="w-12 h-12 text-brand-600" />;
            default: return <FileText className="w-12 h-12 text-brand-600" />;
        }
    };

    const getPdfName = () => {
        switch(type) {
            case 'privacy': return 'PRIVACY POLICY Inc core.pdf';
            case 'terms': return 'TERMS AND CONDITIONS Ink Core.pdf';
            case 'cookies': return 'Cookie Policy for Inkcore.pdf';
            case 'shipping': return 'SHIPPING DELIVERY POLICY InkCore.pdf';
            case 'refund': return 'RETURN POLICYinkcore.pdf';
            default: return null;
        }
    };

    return (
        <div className="bg-white min-h-screen font-sans selection:bg-brand-100 selection:text-brand-700">
            <SEO
                pageName={`policy_${type}`}
                fallbackTitle={policy.meta_title || pageTitle}
                fallbackDesc={policy.meta_description}
            />

            {/* --- REFINED PREMIUM HEADER --- */}
            <div className="bg-slate-50 border-b border-slate-200/60 pt-32 pb-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-brand-50/50 to-transparent"></div>
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-brand-100/30 rounded-full blur-3xl"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                        <div className="max-w-4xl">
                            <div className="flex items-center gap-2 text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-6">
                                <Link to="/" className="hover:text-brand-600 transition-colors">Home</Link>
                                <ChevronRight size={10} strokeWidth={3} />
                                <span className="text-slate-900">Legal Center</span>
                            </div>
                            
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full mb-6 shadow-sm">
                                <span className="w-1.5 h-1.5 bg-brand-600 rounded-full animate-pulse"></span>
                                <span className="text-brand-600 font-bold uppercase tracking-widest text-[9px]">Official Documentation</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
                                {pageTitle}
                            </h1>
                            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 font-medium">
                                <div className="flex items-center gap-2">
                                    <Clock size={16} className="text-slate-400" />
                                    <span>Last Updated: <span className="text-slate-900 font-bold">Feb 04, 2026</span></span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FileText size={16} className="text-slate-400" />
                                    <span>Document Type: <span className="text-slate-900 font-bold uppercase">{type}</span></span>
                                </div>
                            </div>
                        </div>
                        <div className="hidden lg:block">
                            <div className="w-24 h-24 bg-white rounded-3xl shadow-xl shadow-brand-500/10 flex items-center justify-center border border-slate-100 transform rotate-3">
                                {getIcon()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- CONTENT LAYOUT --- */}
            <div className="container mx-auto px-6 py-20">
                <div className="flex flex-col lg:flex-row gap-16">
                    
                    {/* Sidebar Navigation */}
                    {sections.length > 0 && (
                        <aside className="lg:w-1/4">
                            <div className="sticky top-32 space-y-8">
                                <div className="bg-slate-50/50 rounded-[2rem] p-8 border border-slate-100">
                                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">In this document</h3>
                                    <nav className="flex flex-col gap-1 border-l border-slate-200">
                                        {sections.map((section, idx) => (
                                            <a 
                                                key={idx}
                                                href={`#section-${idx + 1}`}
                                                className="pl-4 py-2 text-sm font-bold text-slate-500 hover:text-brand-600 hover:border-l-2 hover:border-brand-600 -ml-[1px] transition-all"
                                            >
                                                {idx + 1}. {section}
                                            </a>
                                        ))}
                                    </nav>
                                </div>
                                
                                <div className="p-8 bg-slate-900 rounded-[2rem] text-white shadow-xl shadow-slate-900/20 relative overflow-hidden group">
                                    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-brand-600/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                                    <div className="relative z-10">
                                        <h4 className="font-bold text-lg mb-2">Legal Help</h4>
                                        <p className="text-slate-400 text-xs mb-6 leading-relaxed">Need professional clarification regarding our legal terms or policies?</p>
                                        <Link to="/contact" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-400 hover:text-white transition-colors">
                                            Talk to Expert <ChevronRight size={14} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    )}

                    {/* Main Content Body */}
                    <main className={`${sections.length > 0 ? 'lg:w-3/4' : 'w-full max-w-4xl mx-auto'}`}>
                        <div className="bg-white border border-slate-200/60 rounded-[3rem] p-8 md:p-20 shadow-2xl shadow-slate-200/40 relative overflow-hidden">
                            {/* Decorative Background Icon */}
                            <div className="absolute top-12 right-12 opacity-[0.02] pointer-events-none transform rotate-12">
                                {getIcon()}
                            </div>

                            <article className="prose prose-slate prose-lg md:prose-xl prose-headings:text-slate-900 prose-headings:font-black prose-headings:tracking-tight prose-h2:mt-16 prose-h2:mb-8 prose-h2:pb-4 prose-h2:border-b prose-h2:border-slate-100 prose-h3:mt-10 prose-h3:mb-4 prose-p:text-slate-600 prose-p:leading-relaxed prose-p:mb-8 prose-li:text-slate-600 prose-li:mb-3 prose-strong:text-slate-900 prose-a:text-brand-600 prose-a:font-bold prose-a:no-underline hover:prose-a:underline max-w-none
                                prose-table:border prose-table:border-slate-100 prose-th:bg-slate-50 prose-th:px-4 prose-th:py-3 prose-td:px-4 prose-td:py-3 prose-td:border-t prose-td:border-slate-50">
                                <div 
                                    className="policy-content"
                                    dangerouslySetInnerHTML={{ 
                                        __html: policy.content.replace(/<h2>(\d+)\./g, (match, p1) => `<h2 id="section-${p1}" class="scroll-mt-32">${p1}.`) 
                                    }} 
                                />
                            </article>
                        </div>

                        {/* Document Footer */}
                        <div className="mt-12 pt-10 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="text-sm text-slate-400 font-medium">
                                © 2026 Inkcore • Official Regulatory Documentation
                            </div>
                            <div className="flex gap-4">
                                {getPdfName() && (
                                    <a 
                                        href={`/${getPdfName()}`} 
                                        download
                                        className="px-6 py-3 border border-slate-200 rounded-2xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2"
                                    >
                                        <Printer size={14} /> Download PDF
                                    </a>
                                )}
                                <button 
                                    onClick={() => {
                                        navigator.clipboard.writeText(window.location.href);
                                        toast.success("Link copied to clipboard!");
                                    }}
                                    className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-xs font-bold hover:bg-brand-600 transition-all shadow-lg flex items-center gap-2"
                                >
                                    <Share2 size={14} /> Share Link
                                </button>
                            </div>
                        </div>
                    </main>

                </div>
            </div>
        </div>
    );

};

export default PolicyPage;