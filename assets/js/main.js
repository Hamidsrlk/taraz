(function () {
  'use strict';

  var state = {
    lang: 'en',
    booted: false,
    reducedMotion: window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  };

  function $(sel, root) { root = root || document; return root.querySelector(sel); }

  function $$(sel, root) {
    root = root || document;
    return Array.prototype.slice.call(root.querySelectorAll(sel));
  }

  var I18N = {
    en: {
      'nav.solutions': 'Solutions',
      'nav.method': 'Method',
      'nav.process': 'Process',
      'nav.work': 'Work',
      'nav.contact': 'Contact',
      'nav.cta': 'Request an Assessment',

      'hero.title': '<span class="gradient-text">Smarter Systems</span><br>Clearer Decisions.',
      'hero.subtitle': 'We embed within your organization to diagnose operations, build custom AI products, and accelerate every critical workflow. Enterprise intelligence, deployed where it matters.',
      'hero.cta.primary': 'Request On-Site Assessment',
      'hero.cta.secondary': 'Explore Services',

      'trust.1': '<em>50%</em> Average Operational Cost Reduction',
      'trust.2': '<em>10x</em> Workflow Acceleration',
      'trust.3': '<em>100%</em> Custom Enterprise Design',

      'services.eyebrow': 'Expertise',
      'services.title': 'Specialized AI Services for Enterprise Operations',
      'services.item1.title': 'AI Strategy &amp; Roadmap',
      'services.item1.desc': 'We map your current operations, identify high-impact automation opportunities, and build a phased AI adoption plan aligned to your business goals.',
      'services.item2.title': 'Intelligent Process Automation',
      'services.item2.desc': 'Custom AI agents and workflow engines that eliminate repetitive tasks, reduce errors, and free your team to focus on strategic work.',
      'services.item3.title': 'Internal Tools &amp; Dashboards',
      'services.item3.desc': 'Custom dashboards, reporting systems, and internal tools designed around how your organization actually operates.',
      'services.item4.title': 'Product Engineering',
      'services.item4.desc': 'End-to-end development of AI-powered systems, from concept through deployment and continuous iteration.',
      'services.page.eyebrow': 'Enterprise Services',
      'services.page.title': 'Systems that remove operational friction.',
      'services.page.subtitle': 'We turn high-value operational problems into reliable, measurable systems—starting with the workflow, not the technology.',
      'services.page.cta': 'Discuss your challenge',
      'services.page.scope.eyebrow': 'What we deliver',
      'services.page.scope.title': 'From diagnosis to a working system',
      'services.page.card1.title': 'Operational diagnosis',
      'services.page.card1.desc': 'We map workflows, bottlenecks, systems, and decision points to identify the work worth changing first.',
      'services.page.card1.item1': 'Workflow and stakeholder mapping',
      'services.page.card1.item2': 'Impact and feasibility assessment',
      'services.page.card1.item3': 'Practical implementation roadmap',
      'services.page.card2.title': 'Intelligent automation',
      'services.page.card2.desc': 'We design secure automations for repetitive, document-heavy, or coordination-intensive work.',
      'services.page.card2.item1': 'AI-assisted workflows and agents',
      'services.page.card2.item2': 'Document extraction and routing',
      'services.page.card2.item3': 'Integration with existing systems',
      'services.page.card3.title': 'Internal products',
      'services.page.card3.desc': 'We build dashboards and internal tools around the way your people actually work.',
      'services.page.card3.item1': 'Decision and reporting dashboards',
      'services.page.card3.item2': 'Role-specific internal tools',
      'services.page.card3.item3': 'Maintainable product foundations',
      'services.page.card4.title': 'Product engineering',
      'services.page.card4.desc': 'We take an approved opportunity from architecture through deployment, adoption, and iteration.',
      'services.page.card4.item1': 'Product and technical architecture',
      'services.page.card4.item2': 'Incremental production delivery',
      'services.page.card4.item3': 'Monitoring and continuous improvement',
      'services.page.outcome.eyebrow': 'How we measure value',
      'services.page.outcome.title': 'Outcomes before features',
      'services.page.outcome.desc': 'Before delivery begins, we agree on the operational measure that matters: time saved, error reduction, faster decisions, or clearer visibility. We do not promise generic percentages.',
      'services.page.contact.title': 'Start with one important workflow.',
      'services.page.contact.desc': 'Tell us where your operation slows down. We will help you decide whether it is ready for improvement, automation, or a new product.',

      'process.eyebrow': 'Method',
      'process.title': 'How We Build',
      'process.subtitle': 'A four-phase operating model designed for enterprise rigor and real-world deployment.',
      'process.step1.num': '01',
      'process.step1.title': 'Discover',
      'process.step1.desc': 'We embed within your organization, map every workflow, interview stakeholders, and identify where automation creates the highest leverage.',
      'process.step2.num': '02',
      'process.step2.title': 'Design',
      'process.step2.desc': 'We architect custom solutions \u2014 AI agents, dashboards, automation engines \u2014 designed to integrate with your existing infrastructure and team workflows.',
      'process.step3.num': '03',
      'process.step3.title': 'Deliver',
      'process.step3.desc': 'We deploy incrementally in production environments, integrate with your systems, and ensure every component is tested, documented, and ready.',
      'process.step4.num': '04',
      'process.step4.title': 'Iterate',
      'process.step4.desc': 'Post-deployment monitoring, user feedback loops, and continuous refinement keep your systems aligned with evolving organizational needs.',

      'work.eyebrow': 'Selected Engagements',
      'work.title': 'Recent Work',
      'work.subtitle': 'Sample engagements across operations, data, and workflow automation. Each project is anonymized to protect client confidentiality.',
      'work.label.problem': 'Problem',
      'work.label.approach': 'Approach',
      'work.label.result': 'Result',
      'work.card1.tag': 'Operations',
      'work.card1.title': 'Consolidated Operations Dashboard',
      'work.card1.problem': 'Data scattered across six disconnected systems, requiring 20+ hours weekly for manual reporting.',
      'work.card1.approach': 'Custom dashboard with automated data pipelines and AI-powered forecasting built on existing infrastructure.',
      'work.card1.result': '70% reduction in reporting time, real-time visibility across all operations.',
      'work.card2.tag': 'Data Processing',
      'work.card2.title': 'AI Document Processing Pipeline',
      'work.card2.problem': 'Over 12,000 documents manually reviewed each month, causing bottlenecks and costly delays.',
      'work.card2.approach': 'Custom NLP pipeline with entity extraction, classification, and automated routing to downstream systems.',
      'work.card2.result': '92% automation rate, processing time reduced from days to minutes.',
      'work.card3.tag': 'Workflow Automation',
      'work.card3.title': 'Healthcare Intake Automation',
      'work.card3.problem': 'Multi-step patient intake process averaging 45+ minutes per patient with frequent data errors.',
      'work.card3.approach': 'Intelligent routing engine with automated data extraction, validation, and integration with existing EHR systems.',
      'work.card3.result': '70% faster intake, error rate reduced to near zero.',

      'about.eyebrow': 'Studio',
      'about.title': 'Built for Enterprise Depth',
      'about.subtitle': 'We believe the best AI strategy is the one already running in production. We bridge the gap between consulting and execution.',
      'about.body1': 'Most consultancies deliver reports. We deliver deployed, working systems. Every engagement starts with direct operational immersion and ends with production-ready infrastructure your team owns.',
      'about.body2': 'We are operators, engineers, and strategists who have built and scaled AI systems inside enterprises. We know what works because we have done it.',
      'about.principle1.num': '01',
      'about.principle1.title': 'Operational Depth',
      'about.principle1.desc': 'We do not propose solutions from templates. We embed in your workflows until we understand them completely.',
      'about.principle2.num': '02',
      'about.principle2.title': 'Measurable Impact',
      'about.principle2.desc': 'Every engagement defines clear metrics. We measure, iterate, and deliver results that move your business.',
      'about.principle3.num': '03',
      'about.principle3.title': 'Long-Term Partnership',
      'about.principle3.desc': 'We build so your team can run. You own the system. We stay on as architects and advisors.',

      'banner.eyebrow': 'Impact',
      'banner.title': 'AI That Works Alongside Your Team',
      'banner.subtitle': 'From on-site diagnosis to full deployment \u2014 every system is built to integrate with your existing workflows and amplify your team\u2019s capabilities.',
      'banner.metric1': 'Cost Reduction',
      'banner.metric2': 'Speed Increase',
      'banner.metric3': 'Custom Build',
      'banner.cta': 'Start the Conversation',

      'contact.title': 'Let\u2019s Talk About Your Enterprise',
      'contact.subtitle': 'Tell us about your operations. We\u2019ll show you what\u2019s possible. Fill out the form and we\u2019ll schedule a discovery call within two business days.',
      'contact.form.name': 'Full Name',
      'contact.form.company': 'Company Name',
      'contact.form.email': 'Work Email',
      'contact.form.phone': 'Phone Number',
      'contact.form.message': 'What operational challenges are you looking to solve?',
      'contact.form.submit': 'Submit Inquiry',
      'contact.trust': 'Your information is kept strictly confidential. No spam, no sales decks \u2014 just a direct conversation.',

      'footer.tagline': 'Enterprise AI Consulting &amp; Engineering',
      'footer.copyright': '\u00a9 2026 Taraz. All rights reserved.',
    },

    fa: {
      'nav.solutions': '\u0631\u0627\u0647\u06a9\u0627\u0631\u0647\u0627',
      'nav.method': '\u0631\u0648\u0634',
      'nav.process': '\u0641\u0631\u0622\u06cc\u0646\u062f',
      'nav.work': '\u067e\u0631\u0648\u0698\u0647\u200c\u0647\u0627',
      'nav.contact': '\u062a\u0645\u0627\u0633',
      'nav.cta': '\u062f\u0631\u062e\u0648\u0627\u0633\u062a \u0627\u0631\u0632\u06cc\u0627\u0628\u06cc',

      'hero.title': '<span class="gradient-text">\u0633\u06cc\u0633\u062a\u0645\u200c\u0647\u0627\u06cc \u0647\u0648\u0634\u0645\u0646\u062f\u062a\u0631</span><br>\u062a\u0635\u0645\u06cc\u0645\u200c\u0647\u0627\u06cc \u0634\u0641\u0627\u0641\u200c\u062a\u0631.',
      'hero.subtitle': '\u0645\u0627 \u062f\u0631 \u0633\u0627\u0632\u0645\u0627\u0646 \u0634\u0645\u0627 \u0645\u0633\u062a\u0642\u0631 \u0645\u06cc\u200c\u0634\u0648\u06cc\u0645\u060c \u0639\u0645\u0644\u06cc\u0627\u062a \u0631\u0627 \u0628\u0631\u0631\u0633\u06cc \u0645\u06cc\u200c\u06a9\u0646\u06cc\u0645\u060c \u0645\u062d\u0635\u0648\u0644\u0627\u062a \u0627\u062e\u062a\u0635\u0627\u0635\u06cc \u0647\u0648\u0634 \u0645\u0635\u0646\u0648\u0639\u06cc \u0645\u06cc\u200c\u0633\u0627\u0632\u06cc\u0645 \u0648 \u0647\u0631 \u06a9\u0631\u0627\u0646\u200c\u0648\u0648\u0631\u06a9 \u062d\u06cc\u0627\u062a\u06cc \u0631\u0627 \u0633\u0631\u0639\u062a \u0645\u06cc\u200c\u0628\u062e\u0634\u06cc\u0645. \u0647\u0648\u0634 \u0633\u0627\u0632\u0645\u0627\u0646\u06cc\u060c \u062f\u0631 \u062c\u0627\u06cc\u06cc \u06a9\u0647 \u0645\u0647\u0645 \u0627\u0633\u062a.',
      'hero.cta.primary': '\u062f\u0631\u062e\u0648\u0627\u0633\u062a \u0627\u0631\u0632\u06cc\u0627\u0628\u06cc \u062d\u0636\u0648\u0631\u06cc',
      'hero.cta.secondary': '\u0645\u0634\u0627\u0647\u062f\u0647 \u062e\u062f\u0645\u0627\u062a',

      'trust.1': '<em>\u06f5\u06f0\u066a</em> \u06a9\u0627\u0647\u0634 \u0645\u06cc\u0627\u0646\u06af\u06cc\u0646 \u0647\u0632\u06cc\u0646\u0647\u200c\u0647\u0627\u06cc \u0639\u0645\u0644\u06cc\u0627\u062a\u06cc',
      'trust.2': '<em>\u06f1\u06f0\u00d7</em> \u0627\u0641\u0632\u0627\u06cc\u0634 \u0633\u0631\u0639\u062a \u06a9\u0631\u0627\u0646\u200c\u0648\u0648\u0631\u06a9',
      'trust.3': '<em>\u06f1\u06f0\u06f0\u066a</em> \u0637\u0631\u0627\u062d\u06cc \u0627\u062e\u062a\u0635\u0627\u0635\u06cc \u0633\u0627\u0632\u0645\u0627\u0646\u06cc',

      'services.eyebrow': '\u062a\u062e\u0635\u0635\u200c\u0647\u0627',
      'services.title': '\u062e\u062f\u0645\u0627\u062a \u0627\u062e\u062a\u0635\u0627\u0635\u06cc \u0647\u0648\u0634 \u0645\u0635\u0646\u0648\u0639\u06cc \u0628\u0631\u0627\u06cc \u0639\u0645\u0644\u06cc\u0627\u062a \u0633\u0627\u0632\u0645\u0627\u0646\u06cc',
      'services.item1.title': '\u0637\u0631\u062d \u0627\u0633\u062a\u0631\u0627\u062a\u0698\u06cc \u0647\u0648\u0634 \u0645\u0635\u0646\u0648\u0639\u06cc',
      'services.item1.desc': '\u0639\u0645\u0644\u06cc\u0627\u062a \u0645\u0648\u062c\u0648\u062f \u0631\u0627 \u0646\u0642\u0634\u0647\u200c\u0628\u0631\u062f\u0627\u0631\u06cc \u0645\u06cc\u200c\u06a9\u0646\u06cc\u0645\u060c \u0641\u0631\u0635\u062a\u200c\u0647\u0627\u06cc \u062e\u0648\u062f\u06a9\u0627\u0631\u0633\u0627\u0632\u06cc \u0628\u0627 \u0628\u0627\u0632\u062f\u0647\u06cc \u0628\u0627\u0644\u0627 \u0631\u0627 \u0634\u0646\u0627\u0633\u0627\u06cc\u06cc \u0648 \u06cc\u06a9 \u0637\u0631\u062d \u062c\u0627\u0645\u0639 \u067e\u0630\u06cc\u0631\u0634 \u0647\u0648\u0634 \u0645\u0635\u0646\u0648\u0639\u06cc \u0645\u0646\u0637\u0628\u0642 \u0628\u0627 \u0627\u0647\u062f\u0627\u0641 \u0634\u0645\u0627 \u062a\u0647\u06cc\u0647 \u0645\u06cc\u200c\u06a9\u0646\u06cc\u0645.',
      'services.item2.title': '\u062e\u0648\u062f\u06a9\u0627\u0631\u0633\u0627\u0632\u06cc \u0647\u0648\u0634\u0645\u0646\u062f \u0641\u0631\u0622\u06cc\u0646\u062f\u0647\u0627',
      'services.item2.desc': '\u0639\u0627\u0645\u0644\u200c\u0647\u0627\u06cc \u0647\u0648\u0634\u0645\u0646\u062f \u0648 \u0645\u0648\u062a\u0648\u0631\u0647\u0627\u06cc \u06a9\u0631\u0627\u0646\u200c\u0648\u0648\u0631\u06a9 \u0633\u0627\u062e\u062a\u0647\u200c\u0634\u062f\u0647 \u06a9\u0647 \u0648\u0638\u0627\u06cc\u0641 \u062a\u06a9\u0631\u0627\u0631\u06cc \u0631\u0627 \u062d\u0630\u0641 \u06a9\u0631\u062f\u0647 \u0648 \u062e\u0637\u0627\u0647\u0627 \u0631\u0627 \u06a9\u0627\u0647\u0634 \u0645\u06cc\u200c\u062f\u0647\u0646\u062f.',
      'services.item3.title': '\u0627\u0628\u0632\u0627\u0631\u0647\u0627\u06cc \u062f\u0627\u062e\u0644\u06cc \u0648 \u062f\u0627\u0634\u0628\u0648\u0631\u062f\u0647\u0627',
      'services.item3.desc': '\u062f\u0627\u0634\u0628\u0648\u0631\u062f\u0647\u0627\u06cc \u0633\u0641\u0627\u0631\u0634\u06cc\u060c \u0633\u06cc\u0633\u062a\u0645\u200c\u0647\u0627\u06cc \u06af\u0632\u0627\u0631\u0634\u200c\u062f\u0647\u06cc \u0648 \u0627\u0628\u0632\u0627\u0631\u0647\u0627\u06cc \u062f\u0627\u062e\u0644\u06cc \u0645\u0637\u0627\u0628\u0642 \u0628\u0627 \u0646\u062d\u0648\u0647 \u06a9\u0627\u0631 \u0633\u0627\u0632\u0645\u0627\u0646 \u0634\u0645\u0627.',
      'services.item4.title': '\u0645\u0647\u0646\u062f\u0633\u06cc \u0645\u062d\u0635\u0648\u0644',
      'services.item4.desc': '\u062a\u0648\u0633\u0639\u0647 \u06a9\u0627\u0645\u0644 \u0633\u06cc\u0633\u062a\u0645\u200c\u0647\u0627\u06cc \u0647\u0648\u0634 \u0645\u0635\u0646\u0648\u0639\u06cc\u060c \u0627\u0632 \u0645\u0641\u0647\u0648\u0645 \u062a\u0627 \u0627\u0633\u062a\u0642\u0631\u0627\u0631 \u0648 \u0627\u0633\u062a\u0641\u0627\u062f\u0647 \u0645\u0633\u062a\u0645\u0631.',

      'services.page.eyebrow': 'خدمات سازمانی',
      'services.page.title': 'سیستم‌هایی که اصطکاک عملیاتی را حذف می‌کنند.',
      'services.page.subtitle': 'ما مشکلات عملیاتی باارزش را به سیستم‌های قابل اعتماد و قابل اندازه‌گیری تبدیل می‌کنیم—از گردش کار شروع می‌کنیم، نه از فناوری.',
      'services.page.cta': 'در مورد چالش خود گفتگو کنید',
      'services.page.scope.eyebrow': 'چه تحویل می‌دهیم',
      'services.page.scope.title': 'از تشخیص تا یک سیستم عملیاتی',
      'services.page.card1.title': 'تشخیص عملیاتی',
      'services.page.card1.desc': 'ما گردش‌های کار، گلوگاه‌ها، سیستم‌ها و نقاط تصمیم‌گیری را نقشه‌برداری می‌کنیم تا کاری را که ارزش تغییر دادن دارد شناسایی کنیم.',
      'services.page.card1.item1': 'نقشه‌برداری گردش کار و ذی‌نفعان',
      'services.page.card1.item2': 'ارزیابی تأثیر و امکان‌سنجی',
      'services.page.card1.item3': 'نقشه راه اجرایی عملی',
      'services.page.card2.title': 'خودکارسازی هوشمند',
      'services.page.card2.desc': 'ما خودکارسازی‌های امن برای کارهای تکراری، اسنادمحور یا هماهنگی‌فشرده طراحی می‌کنیم.',
      'services.page.card2.item1': 'گردش کار و عامل‌های هوش مصنوعی',
      'services.page.card2.item2': 'استخراج و مسیریابی اسناد',
      'services.page.card2.item3': 'یکپارچه‌سازی با سیستم‌های موجود',
      'services.page.card3.title': 'محصولات داخلی',
      'services.page.card3.desc': 'ما داشبوردها و ابزارهای داخلی را متناسب با نحوه کار واقعی تیم شما می‌سازیم.',
      'services.page.card3.item1': 'داشبوردهای تصمیم‌گیری و گزارش',
      'services.page.card3.item2': 'ابزارهای داخلی مختص نقش',
      'services.page.card3.item3': 'زیرساخت محصول قابل نگهداری',
      'services.page.card4.title': 'مهندسی محصول',
      'services.page.card4.desc': 'ما یک فرصت تأیید شده را از معماری تا استقرار، پذیرش و بهبود مستمر پیش می‌بریم.',
      'services.page.card4.item1': 'معماری محصول و فنی',
      'services.page.card4.item2': 'تحویل تدریجی تولید',
      'services.page.card4.item3': 'نظارت و بهبود مستمر',
      'services.page.outcome.eyebrow': 'چگونه ارزش را اندازه می‌گیریم',
      'services.page.outcome.title': 'نتایج پیش از ویژگی‌ها',
      'services.page.outcome.desc': 'پیش از شروع تحویل، بر روی معیار عملیاتی که اهمیت دارد توافق می‌کنیم: زمان صرفه‌جویی شده، کاهش خطا، تصمیم‌گیری سریع‌تر یا شفافیت بیشتر. ما درصدهای کلی وعده نمی‌دهیم.',
      'services.page.contact.title': 'با یک گردش کار مهم شروع کنید.',
      'services.page.contact.desc': 'به ما بگویید عملیات شما در کجا کند می‌شود. ما کمک می‌کنیم تصمیم بگیرید آیا آماده بهبود، خودکارسازی یا یک محصول جدید است.',
      'process.eyebrow': 'روش',
      'process.title': '\u0631\u0648\u0634 \u06a9\u0627\u0631 \u0645\u0627',
      'process.subtitle': '\u06cc\u06a9 \u0645\u062f\u0644 \u0639\u0645\u0644\u06cc\u0627\u062a\u06cc \u0686\u0647\u0627\u0631 \u0645\u0631\u062d\u0644\u0647\u200c\u0627\u06cc \u0628\u0631\u0627\u06cc \u0633\u062e\u062a\u06af\u06cc\u200c\u0647\u0627\u06cc \u0633\u0627\u0632\u0645\u0627\u0646\u06cc \u0648 \u0627\u0633\u062a\u0642\u0631\u0627\u0631 \u062f\u0631 \u062f\u0646\u06cc\u0627\u06cc \u0648\u0627\u0642\u0639\u06cc.',
      'process.step1.num': '\u06f0\u06f1',
      'process.step1.title': '\u06a9\u0634\u0641',
      'process.step1.desc': '\u062f\u0631 \u0633\u0627\u0632\u0645\u0627\u0646 \u0634\u0645\u0627 \u0645\u0633\u062a\u0642\u0631 \u0634\u062f\u0647\u060c \u0647\u0631 \u06a9\u0631\u0627\u0646\u200c\u0648\u0648\u0631\u06a9 \u0631\u0627 \u0646\u0642\u0634\u0647\u200c\u0628\u0631\u062f\u0627\u0631\u06cc \u0648 \u062c\u0627\u06cc\u06af\u0627\u0647\u200c\u0647\u0627\u06cc \u0628\u0627\u0644\u0627\u062a\u0631\u06cc\u0646 \u0627\u0647\u0631\u0645\u06cc\u062a \u0631\u0627 \u0634\u0646\u0627\u0633\u0627\u06cc\u06cc \u0645\u06cc\u200c\u06a9\u0646\u06cc\u0645.',
      'process.step2.num': '\u06f0\u06f2',
      'process.step2.title': '\u0637\u0631\u0627\u062d\u06cc',
      'process.step2.desc': '\u0631\u0627\u0647\u06a9\u0627\u0631\u0647\u0627\u06cc \u0633\u0641\u0627\u0631\u0634\u06cc \u2014 \u0639\u0627\u0645\u0644\u200c\u0647\u0627\u06cc \u0647\u0648\u0634\u0645\u0646\u062f\u060c \u062f\u0627\u0634\u0628\u0648\u0631\u062f\u0647\u0627\u060c \u0645\u0648\u062a\u0648\u0631\u0647\u0627\u06cc \u062e\u0648\u062f\u06a9\u0627\u0631 \u2014 \u0637\u0631\u0627\u062d\u06cc \u0634\u062f\u0647 \u0628\u0631\u0627\u06cc \u0633\u0627\u0632\u06af\u0627\u0631\u06cc \u0628\u0627 \u0632\u06cc\u0631\u0633\u0627\u062e\u062a \u0645\u0648\u062c\u0648\u062f \u0634\u0645\u0627.',
      'process.step3.num': '\u06f0\u06f3',
      'process.step3.title': '\u062a\u062d\u0648\u06cc\u0644',
      'process.step3.desc': '\u0628\u0647 \u0635\u0648\u0631\u062a \u062a\u0632\u0631\u06cc\u0642\u06cc \u062f\u0631 \u0645\u062d\u06cc\u0637 \u062a\u0648\u0644\u06cc\u062f \u0627\u0633\u062a\u0642\u0631\u0627\u0631 \u0645\u06cc\u200c\u06a9\u0646\u06cc\u0645\u060c \u0628\u0627 \u0633\u06cc\u0633\u062a\u0645\u0647\u0627 \u0647\u0645\u0631\u0627\u0647 \u0645\u06cc\u200c\u0634\u0648\u06cc\u0645 \u0648 \u0627\u0637\u0645\u06cc\u0646\u0627\u0646 \u0645\u06cc\u200c\u06cc\u0627\u0628\u06cc\u0645 \u06a9\u0647 \u0647\u0631 \u062c\u0632\u0621 \u0622\u0632\u0645\u0648\u062f\u0647 \u0648 \u0645\u0633\u062a\u0646\u062f \u0627\u0633\u062a.',
      'process.step4.num': '\u06f0\u06f4',
      'process.step4.title': '\u0628\u0647\u06cc\u0646\u0647\u200c\u0633\u0627\u0632\u06cc',
      'process.step4.desc': '\u0646\u0638\u0627\u0631\u062a \u067e\u0633 \u0627\u0632 \u0627\u0633\u062a\u0642\u0631\u0627\u0631\u060c \u062d\u0644\u0642\u0647\u200c\u0647\u0627\u06cc \u0628\u0627\u0632\u062e\u0648\u0631\u062f \u06a9\u0627\u0631\u0628\u0631\u0627\u0646 \u0648 \u0628\u0647\u06cc\u0646\u0647\u200c\u0633\u0627\u0632\u06cc \u0645\u0633\u062a\u0645\u0631\u060c \u0633\u06cc\u0633\u062a\u0645\u200c\u0647\u0627\u06cc \u0634\u0645\u0627 \u0631\u0627 \u0628\u0627 \u0646\u06cc\u0627\u0632\u0647\u0627\u06cc \u062f\u0631 \u062d\u0627\u0644 \u062a\u06a9\u0627\u0645\u0644 \u0633\u0627\u0632\u0645\u0627\u0646 \u0647\u0645\u0631\u0627\u0647 \u0646\u06af\u0647 \u0645\u06cc\u200c\u062f\u0627\u0631\u062f.',

      'work.eyebrow': '\u067e\u0631\u0648\u0698\u0647\u200c\u0647\u0627\u06cc \u0627\u0646\u062a\u062e\u0627\u0628\u06cc',
      'work.title': '\u067e\u0631\u0648\u0698\u0647\u200c\u0647\u0627\u06cc \u0627\u062e\u06cc\u0631',
      'work.subtitle': '\u0646\u0645\u0648\u0646\u0647 \u06a9\u0627\u0631\u0647\u0627\u06cc\u06cc \u0627\u0632 \u0639\u0645\u0644\u06cc\u0627\u062a\u060c \u062f\u0627\u062f\u0647\u200c\u0647\u0627 \u0648 \u062e\u0648\u062f\u06a9\u0627\u0631\u0633\u0627\u0632\u06cc \u06a9\u0631\u0627\u0646\u200c\u0648\u0648\u0631\u06a9. \u0647\u0631 \u067e\u0631\u0648\u0698\u0647 \u0628\u0631\u0627\u06cc \u062d\u0641\u0627\u0638\u062a \u0627\u0632 \u0645\u062d\u0631\u0645\u0627\u0646\u0647 \u0628\u0648\u062f\u0646 \u0645\u0634\u062a\u0631\u06cc \u0646\u0627\u0645\u0634\u0641\u062e\u0635 \u0634\u062f\u0647 \u0627\u0633\u062a.',
      'work.label.problem': '\u0686\u0627\u0644\u0634',
      'work.label.approach': '\u0631\u0648\u06cc\u06a9\u0631\u062f',
      'work.label.result': '\u0646\u062a\u06cc\u062c\u0647',
      'work.card1.tag': '\u0639\u0645\u0644\u06cc\u0627\u062a',
      'work.card1.title': '\u062f\u0627\u0634\u0628\u0648\u0631\u062f \u06cc\u06a9\u067e\u0627\u0631\u0686\u0647 \u0639\u0645\u0644\u06cc\u0627\u062a',
      'work.card1.problem': '\u067e\u0631\u0627\u06a9\u0646\u062f\u06af\u06cc \u062f\u0627\u062f\u0647\u200c\u0647\u0627 \u062f\u0631 \u0634\u0634 \u0633\u06cc\u0633\u062a\u0645 \u062c\u062f\u0627 \u0648 \u0646\u06cc\u0627\u0632 \u0628\u0647 20+ \u0633\u0627\u0639\u062a \u06af\u0632\u0627\u0631\u0634\u200c\u062f\u0647\u06cc \u062f\u0633\u062a\u06cc \u062f\u0631 \u0647\u0641\u062a\u0647.',
      'work.card1.approach': '\u062f\u0627\u0634\u0628\u0648\u0631\u062f \u0633\u0641\u0627\u0631\u0634\u06cc \u0628\u0627 \u062e\u0637 \u0644\u0648\u0644\u0647 \u062f\u0627\u062f\u0647 \u0627\u062a\u0648\u0645\u0627\u062a\u06cc\u06a9 \u0648 \u067e\u06cc\u0634\u200c\u0628\u06cc\u0646\u06cc \u0647\u0648\u0634\u0645\u0646\u062f.',
      'work.card1.result': '\u06a9\u0627\u0647\u0634 \u06f7\u06f0\u066a \u0632\u0645\u0627\u0646 \u06af\u0632\u0627\u0631\u0634\u200c\u062f\u0647\u06cc\u060c \u0642\u0627\u0628\u0644\u06cc\u062a \u0645\u0634\u0627\u0647\u062f\u0647 \u0628\u0644\u0627\u0641\u0627\u0635\u0644\u0647 \u062f\u0631 \u062a\u0645\u0627\u0645\u06cc \u0639\u0645\u0644\u06cc\u0627\u062a.',
      'work.card2.tag': '\u067e\u0631\u062f\u0627\u0632\u0634 \u062f\u0627\u062f\u0647',
      'work.card2.title': '\u062e\u0637 \u0644\u0648\u0644\u0647 \u067e\u0631\u062f\u0627\u0632\u0634 \u0627\u0633\u0646\u0627\u062f \u0647\u0648\u0634\u0645\u0646\u062f',
      'work.card2.problem': '\u0628\u06cc\u0634 \u0627\u0632 \u06f1\u06f2\u060c\u06f0\u06f0\u06f0 \u0633\u0646\u062f \u062f\u0631 \u0645\u0627\u0647 \u0628\u0647 \u0635\u0648\u0631\u062a \u062f\u0633\u062a\u06cc \u0628\u0631\u0631\u0633\u06cc \u0645\u06cc\u200c\u0634\u0648\u062f\u060c \u0627\u06cc\u062c\u0627\u062f \u06af\u0631\u0641\u062a\u06af\u06cc \u0648 \u062a\u0627\u062e\u06cc\u0631\u0647\u0627\u06cc \u067e\u0631\u0647\u0632\u06cc\u0646\u0647.',
      'work.card2.approach': '\u062e\u0637 \u0644\u0648\u0644\u0647 NLP \u0633\u0641\u0627\u0631\u0634\u06cc \u0628\u0627 \u0627\u0633\u062a\u062e\u0631\u0627\u062c \u0646\u0647\u0627\u062f\u060c \u0637\u0628\u0642\u0647\u200c\u0628\u0646\u062f\u06cc \u0648 \u0647\u062f\u0627\u06cc\u062a \u062e\u0648\u062f\u06a9\u0627\u0631.',
      'work.card2.result': '\u0645\u06cc\u0632\u0627\u0646 \u062e\u0648\u062f\u06a9\u0627\u0631\u0633\u0627\u0632\u06cc \u06f9\u06f2\u066a\u060c \u06a9\u0627\u0647\u0634 \u0632\u0645\u0627\u0646 \u067e\u0631\u062f\u0627\u0632\u0634 \u0627\u0632 \u0631\u0648\u0632 \u0628\u0647 \u062f\u0642\u06cc\u0642\u0647.',
      'work.card3.tag': '\u062e\u0648\u062f\u06a9\u0627\u0631\u0633\u0627\u0632\u06cc \u06a9\u0631\u0627\u0646\u200c\u0648\u0648\u0631\u06a9',
      'work.card3.title': '\u062e\u0648\u062f\u06a9\u0627\u0631\u0633\u0627\u0632\u06cc \u067e\u0630\u06cc\u0631\u0634 \u0628\u06cc\u0645\u0627\u0631 \u062f\u0631 \u0628\u0647\u062f\u0627\u0634\u062a',
      'work.card3.problem': '\u0641\u0631\u0622\u06cc\u0646\u062f \u067e\u0630\u06cc\u0631\u0634 \u0686\u0646\u062f \u0645\u0631\u062d\u0644\u0647\u200c\u0627\u06cc \u0628\u0627 \u0645\u06cc\u0627\u0646\u06af\u06cc\u0646 45+ \u062f\u0642\u06cc\u0642\u0647 \u0628\u0631\u0627\u06cc \u0647\u0631 \u0628\u06cc\u0645\u0627\u0631 \u0648 \u062e\u0637\u0627\u0647\u0627\u06cc \u0645\u06a9\u0631\u0631 \u062f\u0627\u062f\u0647.',
      'work.card3.approach': '\u0645\u0648\u062a\u0648\u0631 \u0647\u062f\u0627\u06cc\u062a \u0647\u0648\u0634\u0645\u0646\u062f \u0628\u0627 \u0627\u0633\u062a\u062e\u0631\u0627\u062c \u0627\u062a\u0648\u0645\u0627\u062a\u06cc\u06a9 \u062f\u0627\u062f\u0647\u200c\u0647\u0627\u060c \u0627\u0639\u062a\u0628\u0627\u0631\u0633\u0646\u062c\u06cc \u0648 \u0627\u062a\u0635\u0627\u0644 \u0628\u0647 \u0633\u06cc\u0633\u062a\u0645\u0647\u0627\u06cc EHR.',
      'work.card3.result': '\u06af\u0631\u0641\u062a\u0627\u0631\u06cc \u06f7\u06f0\u066a \u0633\u0631\u06cc\u0639\u200c\u062a\u0631\u060c \u0645\u06cc\u0632\u0627\u0646 \u062e\u0637\u0627 \u0646\u0632\u062f\u06cc\u06a9 \u0628\u0647 \u0635\u0641\u0631.',

      'about.eyebrow': '\u0627\u0633\u062a\u0648\u062f\u06cc\u0648',
      'about.title': '\u0633\u0627\u062e\u062a\u0647 \u0634\u062f\u0647 \u0628\u0631\u0627\u06cc \u0639\u0645\u0642 \u0633\u0627\u0632\u0645\u0627\u0646\u06cc',
      'about.subtitle': '\u0645\u0627 \u0628\u0627\u0648\u0631 \u062f\u0627\u0631\u06cc\u0645 \u0628\u0647\u062a\u0631\u06cc\u0646 \u0627\u0633\u062a\u0631\u0627\u062a\u0698\u06cc \u0647\u0648\u0634 \u0645\u0635\u0646\u0648\u0639\u06cc \u0622\u0646\u06cc \u0627\u0633\u062a \u06a9\u0647 \u062f\u0631 \u062d\u0627\u0644 \u0627\u062c\u0631\u0627 \u0627\u0633\u062a. \u0645\u0627 \u0634\u06a9\u0627\u0641 \u0645\u06cc\u0627\u0646 \u0645\u0634\u0627\u0648\u0631\u0647 \u0648 \u0627\u062c\u0631\u0627 \u0631\u0627 \u067e\u0631 \u0645\u06cc\u200c\u06a9\u0646\u06cc\u0645.',
      'about.body1': '\u0627\u06a9\u062b\u0631 \u0634\u0631\u06a9\u062a\u200c\u0647\u0627\u06cc \u0645\u0634\u0627\u0648\u0631\u0647\u200c\u0627\u06cc \u06af\u0632\u0627\u0631\u0634 \u062a\u062d\u0648\u06cc\u0644 \u0645\u06cc\u200c\u062f\u0647\u0646\u062f. \u0645\u0627 \u0633\u06cc\u0633\u062a\u0645\u200c\u0647\u0627\u06cc \u0639\u0627\u0645\u0644 \u0648 \u0645\u0633\u062a\u0642\u0631 \u062a\u062d\u0648\u06cc\u0644 \u0645\u06cc\u200c\u062f\u0647\u06cc\u0645. \u0647\u0631 \u0647\u0645\u06a9\u0627\u0631\u06cc \u0628\u0627 \u063a\u0648\u0637\u0647 \u0648\u0631\u0648\u062f\u06cc \u0645\u0633\u062a\u0642\u06cc\u0645 \u062f\u0631 \u0639\u0645\u0644\u06cc\u0627\u062a \u0634\u0631\u0648\u0639 \u0634\u062f\u0647 \u0648 \u0628\u0627 \u0632\u06cc\u0631\u0633\u0627\u062e\u062a \u0622\u0645\u0627\u062f\u0647 \u062a\u0648\u0644\u06cc\u062f \u0628\u0647 \u067e\u0627\u06cc\u0627\u0646 \u0645\u06cc\u200c\u0631\u0633\u062f.',
      'about.body2': '\u0645\u0627 \u0627\u067e\u0631\u0627\u062a\u0648\u0631\u0647\u0627\u06cc\u06cc \u0647\u0633\u062a\u06cc\u0645 \u06a9\u0647 \u0633\u06cc\u0633\u062a\u0645\u200c\u0647\u0627\u06cc \u0647\u0648\u0634 \u0645\u0635\u0646\u0648\u0639\u06cc \u0631\u0627 \u062f\u0631 \u0633\u0627\u0632\u0645\u0627\u0646\u200c\u0647\u0627 \u0633\u0627\u062e\u062a\u0647 \u0648 \u0645\u0642\u06cc\u0627\u0633 \u06a9\u0631\u062f\u0647\u200c\u0627\u06cc\u0645. \u0645\u06cc\u200c\u062f\u0627\u0646\u06cc\u0645 \u0686\u0647 \u0686\u06cc\u0632\u06cc \u062c\u0648\u0627\u0628 \u0645\u06cc\u200c\u062f\u0647\u062f \u0686\u0648\u0646 \u0627\u0646\u062c\u0627\u0645\u0634 \u062f\u0627\u062f\u0647\u200c\u0627\u06cc\u0645.',
      'about.principle1.num': '\u06f0\u06f1',
      'about.principle1.title': '\u0639\u0645\u0642 \u0639\u0645\u0644\u06cc\u0627\u062a\u06cc',
      'about.principle1.desc': '\u0645\u0627 \u0631\u0627\u0647\u200c\u062d\u0644\u200c\u0647\u0627\u06cc \u0627\u0632 \u067e\u06cc\u0634 \u062a\u0639\u0631\u06cc\u0641 \u0634\u062f\u0647 \u067e\u06cc\u0634\u0646\u0647\u0627\u062f \u0646\u0645\u06cc\u200c\u062f\u0647\u06cc\u0645. \u062f\u0631 \u06a9\u0631\u0627\u0646\u200c\u0648\u0648\u0631\u06a9\u0647\u0627\u06cc \u0634\u0645\u0627 \u0646\u0641\u0648\u0630 \u0645\u06cc\u200c\u06a9\u0646\u06cc\u0645 \u062a\u0627 \u0622\u0646\u0647\u0627 \u0631\u0627 \u06a9\u0627\u0645\u0644\u0627\u064b \u0628\u0641\u0647\u0645\u06cc\u0645.',
      'about.principle2.num': '\u06f0\u06f2',
      'about.principle2.title': '\u062a\u0627\u062b\u06cc\u0631 \u0642\u0627\u0628\u0644 \u0627\u0646\u062f\u0627\u0632\u0647\u200c\u06af\u06cc\u0631\u06cc',
      'about.principle2.desc': '\u0647\u0631 \u0647\u0645\u06a9\u0627\u0631\u06cc \u0645\u062a\u0631\u06cc\u06a9\u200c\u0647\u0627\u06cc \u0634\u0641\u0627\u0641\u06cc \u062a\u0639\u0631\u06cc\u0641 \u0645\u06cc\u200c\u06a9\u0646\u062f. \u0627\u0646\u062f\u0627\u0632\u0647 \u0645\u06cc\u200c\u06af\u06cc\u0631\u06cc\u0645\u060c \u0628\u0647\u06cc\u0646\u0647 \u0645\u06cc\u200c\u06a9\u0646\u06cc\u0645 \u0648 \u0646\u062a\u0627\u06cc\u062c\u06cc \u062a\u062d\u0648\u06cc\u0644 \u0645\u06cc\u200c\u062f\u0647\u06cc\u0645 \u06a9\u0647 \u06a9\u0633\u0628 \u0648 \u06a9\u0627\u0631 \u0634\u0645\u0627 \u0631\u0627 \u062c\u0627\u0628\u062c\u0627 \u06a9\u0646\u062f.',
      'about.principle3.num': '\u06f0\u06f3',
      'about.principle3.title': '\u0634\u0631\u0627\u06a9\u062a \u062f\u0631\u0627\u0632\u0645\u062f\u062a',
      'about.principle3.desc': '\u0645\u0627 \u0645\u06cc\u200c\u0633\u0627\u0632\u06cc\u0645 \u062a\u0627 \u062a\u06cc\u0645 \u0634\u0645\u0627 \u0628\u062a\u0648\u0627\u0646\u062f \u0627\u062f\u0627\u0631\u0647 \u06a9\u0646\u062f. \u0634\u0645\u0627 \u0635\u0627\u062d\u0628 \u0633\u06cc\u0633\u062a\u0645 \u0647\u0633\u062a\u06cc\u062f. \u0645\u0627 \u0628\u0647 \u0639\u0646\u0648\u0627\u0646 \u0645\u0639\u0645\u0627\u0631 \u0648 \u0645\u0634\u0627\u0648\u0631 \u062f\u0631 \u06a9\u0646\u0627\u0631 \u0634\u0645\u0627 \u0645\u06cc\u200c\u0645\u0627\u0646\u06cc\u0645.',

      'banner.eyebrow': '\u062a\u0627\u062b\u06cc\u0631\u06af\u0630\u0627\u0631\u06cc',
      'banner.title': '\u0647\u0648\u0634 \u0645\u0635\u0646\u0648\u0639\u06cc \u06a9\u0647 \u062f\u0631 \u06a9\u0646\u0627\u0631 \u062a\u06cc\u0645 \u0634\u0645\u0627 \u06a9\u0627\u0631 \u0645\u06cc\u200c\u06a9\u0646\u062f',
      'banner.subtitle': '\u0627\u0632 \u0639\u0627\u0631\u0636\u0647\u200c\u06cc\u0627\u0628\u06cc \u062d\u0636\u0648\u0631\u06cc \u062a\u0627 \u0627\u0633\u062a\u0642\u0631\u0627\u0631 \u06a9\u0627\u0645\u0644 \u2014 \u0647\u0631 \u0633\u06cc\u0633\u062a\u0645 \u0628\u0631\u0627\u06cc \u06cc\u06a9\u067e\u0627\u0631\u0686\u0647 \u0634\u062f\u0646 \u0628\u0627 \u06a9\u0631\u0627\u0646\u200c\u0648\u0648\u0631\u06a9 \u0645\u0648\u062c\u0648\u062f \u0634\u0645\u0627 \u0633\u0627\u062e\u062a\u0647 \u0634\u062f\u0647 \u0627\u0633\u062a.',
      'banner.metric1': '\u06a9\u0627\u0647\u0634 \u0647\u0632\u06cc\u0646\u0647',
      'banner.metric2': '\u0627\u0641\u0632\u0627\u06cc\u0634 \u0633\u0631\u0639\u062a',
      'banner.metric3': '\u0633\u0627\u062e\u062a \u0633\u0641\u0627\u0631\u0634\u06cc',
      'banner.cta': '\u0634\u0631\u0648\u0639 \u06af\u0641\u062a\u06af\u0648',

      'contact.title': '\u062f\u0631\u0628\u0627\u0631\u0647 \u0633\u0627\u0632\u0645\u0627\u0646 \u0634\u0645\u0627 \u0628\u062d\u062b \u06a9\u0646\u06cc\u0645',
      'contact.subtitle': '\u062f\u0631\u0628\u0627\u0631\u0647 \u0639\u0645\u0644\u06cc\u0627\u062a \u062e\u0648\u062f \u0628\u06af\u0648\u06cc\u06cc\u062f. \u0645\u0627 \u0627\u0645\u06a9\u0627\u0646\u0627\u062a \u0631\u0627 \u0646\u0634\u0627\u0646 \u062e\u0648\u0627\u0647\u06cc\u0645 \u062f\u0627\u062f. \u0641\u0631\u0645 \u0631\u0627 \u067e\u0631 \u06a9\u0646\u06cc\u062f \u0648 \u0637\u06cc \u062f\u0648 \u0631\u0648\u0632 \u06a9\u0627\u0631\u06cc \u0628\u0627 \u0634\u0645\u0627 \u062a\u0645\u0627\u0633 \u062e\u0648\u0627\u0647\u06cc\u0645 \u06af\u0631\u0641\u062a.',
      'contact.form.name': '\u0646\u0627\u0645 \u0648 \u0646\u0627\u0645 \u062e\u0627\u0646\u0648\u0627\u062f\u06af\u06cc',
      'contact.form.company': '\u0646\u0627\u0645 \u0633\u0627\u0632\u0645\u0627\u0646',
      'contact.form.email': '\u067e\u0633\u062a \u0627\u0644\u06a9\u062a\u0631\u0648\u0646\u06cc\u06a9\u06cc \u0633\u0627\u0632\u0645\u0627\u0646\u06cc',
      'contact.form.phone': '\u0634\u0645\u0627\u0631\u0647 \u062a\u0645\u0627\u0633',
      'contact.form.message': '\u0628\u0627 \u0686\u0647 \u0686\u0627\u0644\u0634\u200c\u0647\u0627\u06cc \u0639\u0645\u0644\u06cc\u0627\u062a\u06cc \u0645\u0648\u0627\u062c\u0647 \u0647\u0633\u062a\u06cc\u062f\u061f',
      'contact.form.submit': '\u062b\u0628\u062a \u062f\u0631\u062e\u0648\u0627\u0633\u062a',
      'contact.trust': '\u0627\u0637\u0644\u0627\u0639\u0627\u062a \u0634\u0645\u0627 \u06a9\u0627\u0645\u0644\u0627\u064b \u0645\u062d\u0631\u0645\u0627\u0646\u0647 \u0646\u06af\u0647\u062f\u0627\u0634\u062a\u0647 \u0645\u06cc\u200c\u0634\u0648\u062f. \u0647\u06cc\u0686 \u0627\u0633\u067e\u0645 \u0648 \u06cc\u0627 \u0627\u0631\u0627\u0626\u0647 \u0641\u0631\u0648\u0634\u06cc \u2014 \u0641\u0642\u0637 \u06cc\u06a9 \u06af\u0641\u062a\u06af\u0648\u06cc \u0645\u0633\u062a\u0642\u06cc\u0645.',

      'footer.tagline': '\u0645\u0634\u0627\u0648\u0631\u0647 \u0648 \u0645\u0647\u0646\u062f\u0633\u06cc \u0647\u0648\u0634 \u0645\u0635\u0646\u0648\u0639\u06cc \u0633\u0627\u0632\u0645\u0627\u0646\u06cc',
      'footer.copyright': '\u00a9 \u06f2\u06f0\u06f2\u06f6 \u062a\u0627\u0631\u0627\u0632. \u062a\u0645\u0627\u0645\u06cc \u062d\u0642\u0648\u0642 \u0645\u062d\u0641\u0648\u0638 \u0627\u0633\u062a.',
    },
  };

  function applyLang(lang) {
    state.lang = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    $$('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (I18N[lang][key]) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = I18N[lang][key];
        } else {
          el.innerHTML = I18N[lang][key];
        }
      }
    });
    if (I18N[lang]['hero.title']) {
      document.title = lang === 'fa'
        ? '\u062a\u062d\u0648\u0644 \u062f\u06cc\u062c\u06cc\u062a\u0627\u0644 \u0628\u0627 \u0647\u0648\u0634 \u0645\u0635\u0646\u0648\u0639\u06cc'
        : 'Enterprise AI Transformation';
    }
    var btns = $$('#langBtn, #drawerLangBtn');
    btns.forEach(function (btn) {
      btn.textContent = lang === 'en' ? 'FA' : 'EN';
      btn.setAttribute('aria-label', lang === 'en' ? 'Switch to Persian' : 'Switch to English');
    });
  }

  function initStaticLogos() {
    // Header, drawer, and footer use the shared brand lockup.
  }

  function initTheme() {
    var theme = localStorage.getItem('theme');
    if (!theme) {
      theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    var html = document.documentElement;
    function apply(t) {
      if (t === 'light') { html.setAttribute('data-theme', 'light'); } else { html.removeAttribute('data-theme'); }
      localStorage.setItem('theme', t);
      var isLight = t === 'light';
      $$('#themeBtn, #drawerThemeBtn').forEach(function (btn) {
        btn.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
      });
    }
    apply(theme);
    $$('#themeBtn, #drawerThemeBtn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var current = html.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
        apply(current === 'light' ? 'dark' : 'light');
      });
    });
  }

  function initHeaderScroll() {
    var header = $('#header');
    if (!header) return;
    var ticking = false;
    function onScroll() {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
      ticking = false;
    }
    function requestTick() {
      if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
    }
    onScroll();
    window.addEventListener('scroll', requestTick, { passive: true });
  }

  function initMobileDrawer() {
    var toggle = $('#menuToggle');
    var drawer = $('#mobileDrawer');
    var backdrop = $('#drawerBackdrop');
    var close = $('#drawerClose');
    if (!toggle || !drawer) return;
    var focusableSel = 'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])';
    var prevFocus = null;
    function open() {
      prevFocus = document.activeElement;
      drawer.classList.add('is-open');
      if (backdrop) backdrop.classList.add('is-visible');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', toggle.getAttribute('aria-label').replace('Open', 'Close'));
      document.body.style.overflow = 'hidden';
      focusTrap(drawer);
    }
    function closeDrawer() {
      drawer.classList.remove('is-open');
      if (backdrop) backdrop.classList.remove('is-visible');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', toggle.getAttribute('aria-label').replace('Close', 'Open'));
      document.body.style.overflow = '';
      if (prevFocus) prevFocus.focus();
    }
    function focusTrap(container) {
      var focusable = container.querySelectorAll(focusableSel);
      if (!focusable.length) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      first.focus();
      container.addEventListener('keydown', function trap(e) {
        if (e.key === 'Escape') { closeDrawer(); container.removeEventListener('keydown', trap); return; }
        if (e.key !== 'Tab') return;
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      });
    }
    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      if (expanded) closeDrawer(); else open();
    });
    if (close) close.addEventListener('click', closeDrawer);
    if (backdrop) backdrop.addEventListener('click', closeDrawer);
    drawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeDrawer);
    });
  }

  function initActiveNav() {
    var links = $$('.header__link');
    if (!links.length) return;
    var sections = [];
    links.forEach(function (link) {
      var href = link.getAttribute('href');
      if (href && href.charAt(0) === '#') {
        var el = document.getElementById(href.slice(1));
        if (el) sections.push({ el: el, link: link });
      }
    });
    if (!sections.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          sections.forEach(function (s) { s.link.classList.remove('is-active'); });
          var match = sections.find(function (s) { return s.el === entry.target; });
          if (match) match.link.classList.add('is-active');
        }
      });
    }, { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' });
    sections.forEach(function (s) { io.observe(s.el); });
  }

  function initReveal() {
    if (state.reducedMotion) {
      $$('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-clip').forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    $$('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-clip').forEach(function (el) { io.observe(el); });
  }

  function initParallax() {
    if (state.reducedMotion) return;
    var els = $$('.parallax');
    if (!els.length) return;
    var ticking = false;
    function update() {
      var sy = window.scrollY;
      els.forEach(function (el) {
        var rect = el.getBoundingClientRect();
        var center = rect.top + rect.height / 2;
        var viewCenter = window.innerHeight / 2;
        var offset = (center - viewCenter) * 0.08;
        el.style.transform = 'translateY(' + offset + 'px)';
      });
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  function initAmbientLight() {
    if (state.reducedMotion) return;
    if (typeof initParticleCanvas === 'function') {
      var canvas = document.getElementById('hero-canvas');
      if (canvas) initParticleCanvas(canvas);
    }
  }

  function initSpotlight() {
    if (state.reducedMotion) return;
    var spot = $('#heroSpotlight');
    if (!spot) return;
    var hero = $('#hero');
    if (!hero) return;
    var ticking = false;
    function onMove(e) {
      if (!ticking) {
        requestAnimationFrame(function () {
          var rect = hero.getBoundingClientRect();
          var x = e.clientX - rect.left;
          var y = e.clientY - rect.top;
          spot.style.left = x + 'px';
          spot.style.top = y + 'px';
          if (!spot.classList.contains('active')) spot.classList.add('active');
          ticking = false;
        });
        ticking = true;
      }
    }
    function onLeave() {
      spot.classList.remove('active');
    }
    hero.addEventListener('mousemove', onMove, { passive: true });
    hero.addEventListener('mouseleave', onLeave, { passive: true });
  }

  function initCardTilt() {
    if (state.reducedMotion) return;
    var cards = $$('.card-tilt');
    cards.forEach(function (card) {
      var content = card.querySelector('.card-tilt-content');
      if (!content) return;
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var cx = rect.width / 2;
        var cy = rect.height / 2;
        var rotateX = ((y - cy) / cy) * -6;
        var rotateY = ((x - cx) / cx) * 6;
        content.style.transform = 'rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateZ(10px)';
        card.style.setProperty('--mx', ((x / rect.width) * 100) + '%');
        card.style.setProperty('--my', ((y / rect.height) * 100) + '%');
      });
      card.addEventListener('mouseleave', function () {
        content.style.transform = 'rotateX(0) rotateY(0) translateZ(0)';
      });
    });
  }

  function initContactForm() {
    var form = $('#contactForm');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('.btn');
      var orig = btn.textContent;
      if (state.lang === 'fa') {
        btn.textContent = '\u062f\u0631\u062e\u0648\u0627\u0633\u062a \u0634\u0645\u0627 \u062b\u0628\u062a \u0634\u062f';
      } else {
        btn.textContent = 'Thank you. We will be in touch.';
      }
      btn.disabled = true;
      btn.style.opacity = '0.7';
      setTimeout(function () {
        form.reset();
        btn.textContent = orig;
        btn.disabled = false;
        btn.style.opacity = '1';
      }, 3000);
    });
  }

  function boot() {
    initTheme();
    applyLang('en');
    initHeaderScroll();
    initMobileDrawer();
    initActiveNav();
    initReveal();
    initStaticLogos();
    initAmbientLight();
    initSpotlight();
    initCardTilt();
    initParallax();
    initContactForm();
    var btns = $$('#langBtn, #drawerLangBtn');
    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyLang(state.lang === 'en' ? 'fa' : 'en');
      });
    });
  }

  var _booted = false;
  function bootOnce() {
    if (_booted) return;
    _booted = true;
    boot();
  }

  document.documentElement.classList.replace('no-js', 'js');
  initReveal();

  if (document.fonts && document.fonts.ready) {
    Promise.race([
      document.fonts.ready,
      new Promise(function (resolve) { setTimeout(resolve, 1600); }),
    ]).then(bootOnce).catch(bootOnce);
  } else {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', bootOnce, { once: true });
    } else {
      bootOnce();
    }
  }
})();
