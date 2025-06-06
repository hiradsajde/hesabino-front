/**
 * Types
 */
import type { MenuItem } from '@/app/(landing)/types';

/**
 * Assets
 */
import {
  ChartArea,
  Building2,
  Component,
  Code,
  BetweenHorizonalEnd,
  BrainCircuit,
  Blocks,
  Terminal,
  Package,
  SquareMousePointer,
  ChartPie,
  Files,
  UserRoundPen,
  GitFork,
  LaptopMinimal,
  ArrowBigDownDash,
  CreditCard,
  Twitter,
  Github,
  Linkedin,
  Instagram,
  Youtube,
} from 'lucide-react';

import {
  feature1,
  feature2,
  blog1,
  blog2,
  blog3,
  avatar1,
  avatar2,
  avatar3,
} from '@/app/(landing)/assets';

// Header
export const navMenu: MenuItem[] = [
  {
    href: '/products',
    label: 'Products',
    submenu: [
      {
        href: '#',
        icon: <ChartArea />,
        label: 'User Analytics',
        desc: 'Powerful options to securely authenticate and manage',
      },
      {
        href: '#',
        icon: <Building2 />,
        label: 'B2B SaaS Suite',
        desc: 'Add-on features built specifically for B2B applications',
      },
      {
        href: '#',
        icon: <Component />,
        label: 'React Components',
        desc: 'Embeddable prebuilt UI components for quick and seamless integrations',
      },
      {
        href: '#',
        icon: <Code />,
        label: 'Next.js Analytics',
        desc: 'The fastest and most seamless authentication solution for Next.js',
      },
      {
        href: '#',
        icon: <BetweenHorizonalEnd />,
        label: 'AnalytiX Elements',
        desc: 'Unstyled UI primitives for endless customization. Powered by AnalytiX',
      },
      {
        href: '#',
        icon: <BrainCircuit />,
        label: 'Authentication for AI',
        desc: 'Authentication and abuse protection tailored to AI applications',
      },
    ],
  },
  {
    href: '/features',
    label: 'Features',
  },
  {
    href: '/docs',
    label: 'Docs',
    submenu: [
      {
        href: '#',
        icon: <Terminal />,
        label: 'Getting Started',
        desc: 'Powerful options to securely authenticate and manage',
      },
      {
        href: '#',
        icon: <Package />,
        label: 'Core Concepts',
        desc: 'Add-on features built specifically for B2B applications',
      },
      {
        href: '#',
        icon: <SquareMousePointer />,
        label: 'Customization',
        desc: 'Embeddable prebuilt UI components for quick and seamless integrations',
      },
      {
        href: '#',
        icon: <Blocks />,
        label: 'Official Plugins',
        desc: 'The fastest and most seamless authentication solution for Next.js',
      },
    ],
  },
  {
    href: '/pricing',
    label: 'Pricing',
  },
];

// Hero
export const heroData = {
  sectionSubtitle: 'مدیریت ارتباط با مشتریان',
  sectionTitle: 'پرداخت به اندازه مصرف، قدم به قدم تا ',
  decoTitle: 'هدف',
  sectionText: 'حسابینو با الهام از بهترین‌ها، نسل آینده‌ی نرم افزار مدیریت ارتباط با مشتریان را با مدل چندوجهی و پرداخت به اندازه مصرف برای شما فراهم کرده تا همیشه یک قدم جلوتر باشید.',
};

// Feature
export const featureData = {
  sectionSubtitle: 'ویژگی ها',
  sectionTitle: 'قابلیت‌های قدرتمند را کشف کنید',
  sectionText:
    'قدرت پلتفرم ما را با مجموعه‌ای از امکانات پیشرفته تجربه کنید؛ ابزاری که شما را توانمند می‌سازد تا به اهداف خود برسید و فراتر بروید.',
  features: [
    {
      icon: <ChartPie size={32} />,
      iconBoxColor: 'bg-blue-600',
      title: 'گزارشات پیشرفته',
      desc: 'با بهره‌گیری از هوش تجاری، داده‌های کاربران را تجزیه و تحلیل می‌کند و عمیق‌ترین بینش‌ها و فرصت‌های رشد را نمایان می‌سازد.',
      imgSrc: feature1,
    },
    {
      icon: <Files size={32} />,
      iconBoxColor: 'bg-cyan-500',
      title: 'مدیریت اسناد',
      desc: 'اسناد را به‌صورت دیجیتال ثبت و تحلیل می‌کند؛ بدون نیاز به چاپ، در هزینه صرفه‌جویی و جستجوی آسان‌تری در میان مدارک خواهید داشت.',
      imgSrc: feature2,
    },
    {
      icon: <UserRoundPen size={32} />,
      iconBoxColor: 'bg-yellow-500',
      title: 'مدیریت فاکتورها',
      desc: 'مدیریت فاکتورها را ساده می‌کند و در زمان سررسید، پیامک یا ایمیل یادآوری پرداخت برای مشتریان ارسال می‌نماید.',
    },
    {
      icon: <GitFork size={32} />,
      iconBoxColor: 'bg-red-500',
      title: 'کاوش به سرعت نور',
      desc: 'در کسری از ثانیه می‌توان در داده‌های مشتریان جستجو کرد و هنگام تماس، پاسخ دقیق و بی‌درنگ دریافت نمود.',
    },
    {
      icon: <Blocks size={32} />,
      iconBoxColor: 'bg-purple-500',
      title: 'یکپارچه‌سازی چندوجهی',
      desc: 'این نرم‌افزار اطلاعات کاربر را در سامانه‌های مختلف، از جمله پنل پیامکی، یکپارچه و قابل رصد می‌کند.',
    },
  ],
};

// Process
export const processData = {
  sectionSubtitle: 'از کجا شروع کنید؟',
  sectionTitle: 'سادگی از دل پیچیدگی؛ الگوریتم‌های دشوار، برای ما بی‌پیرایه‌اند.',
  sectionText:
    '',
  list: [
    {
      icon: <LaptopMinimal size={32} />,
      title: 'ساخت حساب کاربری',
      text: 'همین حالا به ما بپیوندید و حساب کاربری خود را ایجاد کنید تا شروع به کاوش در پلتفرم ما کرده و از ویژگی‌های هیجان‌انگیز آن بهره‌مند شوید.',
    },
    {
      icon: <ArrowBigDownDash size={32} />,
      title: 'ورود داده های کسب و کار',
      text: 'حالا نوبت شماست! اطلاعات مشتریان‌تان را در سامانه ثبت کنید و تجربه‌ای حرفه‌ای را آغاز نمایید.',
    },
    {
      icon: <CreditCard size={32} />,
      title: 'دریافت گزارش هوشمند',
      text: 'حالا نوبت ماست! داده‌های مشتریان را تحلیل می‌کنیم. صبر کنید تا گزارشات مستمر دریافت نمایید.',
    },
  ],
};

// Overview
export const overviewData = {
  sectionSubtitle: 'چکیده',
  sectionTitle: 'سامانه یکپارچه تحلیل‌گری مشتریان',
  sectionText:
    'تصمیم‌های هوشمندانه بر اساس داده‌های مشتریان با سامانه جامع حسابینو.',
  listTitle: 'ده‌ها کسب‌وکار موفق در سراسر ایران، هم‌اکنون از راهکارهای هوشمند ما استفاده می‌کنند!',
  list: [
    {
      title: '10+',
      text: 'کسب‌وکار فعال',
    },
    {
      title: '4.86',
      text: 'میانگین امتیاز',
    },
    {
      title: '1K+',
      text: 'مشتریان',
    },
  ],
};

// Review
export const reviewData = {
  sectionSubtitle: 'نظر همراهان ما',
  sectionTitle: 'تجربه همکاران تجاری ما',
  reviewCard: [
    {
      title: 'حسابینو به ما کمک کرده نسخه قوی‌تر و هوشمندتری بسازیم!',
      text: 'همکاری با حسابینو منجر به توسعه نسخه پیشرفته‌تری از پلتفرم ما با قابلیت‌های تحلیلی گسترده شده است',
      reviewAuthor: 'علی احمدی',
      date: 'سه ماه پیش',
    },
    {
      title: 'سیستم پشتیبانی تخصصی حسابینو: خدمات حرفه‌ای برای کسب‌وکارهای هوشمند',
      text: 'پشتیبانی هوشمند حسابینو: ترکیبی از تخصص، تعهد و خدمات یکپارچه برای کسب‌وکارهای پیشرو',
      reviewAuthor: 'علی نوروزی',
      date: 'یک ماه پیش',
    },
    {
      title: 'تعرفه‌های استثنایی طراحی‌شده برای نیازهای کسب‌وکارهای کوچک و متوسط بین‌المللی',
      text: 'سیستم قیمت‌گذاری اختصاصی ما، راهکاری اقتصادی و رقابتی برای کسب‌وکارهای کوچک و متوسط بین‌المللی ارائه می‌دهد.',
      reviewAuthor: 'رضا رضایی',
      date: 'سه ماه پیش',
    },
  ],
};

// Blog
export const blogData = {
  sectionSubtitle: 'مقالات',
  sectionTitle: 'پایگاه دانش',
  sectionText:
    'دسترسی به بانک اطلاعات تخصصی و راهکارهای رشد کسب‌وکار در مرکز منابع هوشمند حسابینو',
  blogs: [
    {
      imgSrc: blog1,
      badge: 'رشد',
      title: 'چرا استراتژی‌های حفظ مشتری کلید رشد پایدار سازمان‌ها هستند؟',
      author: {
        avatarSrc: avatar1,
        authorName: 'هیراد سجده',
        publishDate: '8 فروردین 1404',
        readingTime: 'هشت دقیقه از گنجینه زمان',
      },
    },
    {
      imgSrc: blog2,
      badge: 'بازاریابی',
      title: 'بهینه‌سازی کمپین‌های تبلیغاتی برای بازدهی بالاتر سرمایه (ROAS)',
      author: {
        avatarSrc: avatar2,
        authorName: 'هیراد سجده',
        publishDate: '9 آذر 1404',
        readingTime: 'پنج دقیقه از گنجینه زمان',
      },
    },
    {
      imgSrc: blog3,
      badge: 'رشد',
      title: 'می‌خواهید ابزارهای فناوری برای رشد کسب‌وکارتان را بشناسید؟',
      author: {
        avatarSrc: avatar3,
        authorName: 'هیراد سجده',
        publishDate: '24 خرداد 1403',
        readingTime: 'دو دقیقه از گنجینه زمان',
      },
    },
  ],
};

// Cta
export const ctaData = {
  text: 'به جمع نام‌هایی بپیوندید که آینده را با جسارت و خلاقیت می‌سازند.',
};

// Footer
export const footerData = {
  links: [
    {
      title: 'Product',
      items: [
        {
          href: '#',
          label: 'Components',
        },
        {
          href: '#',
          label: 'Pricing',
        },
        {
          href: '#',
          label: 'Dashboard',
        },
        {
          href: '#',
          label: 'Feature requests',
        },
      ],
    },
    {
      title: 'Developers',
      items: [
        {
          href: '#',
          label: 'Documentation',
        },
        {
          href: '#',
          label: 'Discord server',
        },
        {
          href: '#',
          label: 'Support',
        },
        {
          href: '#',
          label: 'Glossary',
        },
        {
          href: '#',
          label: 'Changelog',
        },
      ],
    },
    {
      title: 'Company',
      items: [
        {
          href: '#',
          label: 'About',
        },
        {
          href: '#',
          label: 'Careers',
        },
        {
          href: '#',
          label: 'Blog',
        },
        {
          href: '#',
          label: 'Contact',
        },
      ],
    },
    {
      title: 'Legal',
      items: [
        {
          href: '#',
          label: 'Terms and Conditions',
        },
        {
          href: '#',
          label: 'Privacy Policy',
        },
        {
          href: '#',
          label: 'Data Processing Agreement',
        },
        {
          href: '#',
          label: 'Cookie manager',
        },
      ],
    },
  ],
  copyright: '© 2024 codewithsadee',
  socialLinks: [
    {
      href: 'https://x.com/codewithsadee_',
      icon: <Twitter size={18} />,
    },
    {
      href: 'https://www.linkedin.com/in/codewithsadee/',
      icon: <Linkedin size={18} />,
    },
    {
      href: 'https://www.instagram.com/codewithsadee',
      icon: <Instagram size={18} />,
    },
    {
      href: 'https://www.youtube.com/codewithsadee',
      icon: <Youtube size={18} />,
    },
  ],
};


export const FAQData = {
  heading: "پرسش های متداول",
  description:
    "اگر پاسخ پرسش تخصصی خود را نیافتید، تیم پشتیبانی ما آماده همکاری و پاسخگویی به دغدغه‌های شماست.",
  items: [
    {
      id: "faq-1",
      question: "مزایای استفاده از سامانه مدیریت ارتباط با مشتریان برای خوابگاه‌ها چیست؟",
      answer:
        "در فضای رقابتی امروز، مدیریت کارآمد ارتباط با دانشجویان و رزروها برای یک خوابگاه حیاتی است. با مدیریت ارتباطات با مشتریان، همه داده‌ها، درخواست‌ها و پیگیری‌ها به صورت یکپارچه و هوشمند مدیریت می‌شوند؛ نتیجتاً رضایت ساکنان افزایش یافته و بهره‌وری مجموعه شما به طور ملموسی رشد خواهد کرد.",
    },
    {
      id: "faq-2",
      question: "چگونه می‌توانم نحوه استفاده از سامانه را یاد بگیرم؟",
      answer:
        "برای بهره‌مندی کامل از امکانات سامانه، پیشنهاد می‌کنیم به بخش مستندات در وب‌سایت ما مراجعه فرمایید. این راهنماها به صورت گام‌به‌گام، فرآیند آشنایی و استفاده صحیح از محصول را برای تیم شما ساده و قابل فهم می‌کنند. در صورت نیاز به راهنمایی بیشتر، تیم پشتیبانی ما همواره آماده همکاری با شماست.",
    },
    {
      id: "faq-3",
      question: "آیا برای شروع استفاده از نرم‌افزار، باید هزینه‌ای پرداخت کنم؟",
      answer:
        "شروع استفاده از این نرم‌افزار برای خوابگاه‌ها کاملاً رایگان است و با ثبت‌نام، ۲۰۰ هزار تومان اعتبار اولیه دریافت می‌کنید. پس از رضایت از خدمات، امکان شارژ کیف‌پول فراهم است؛ برای مشاهده جزئیات هزینه‌ها به صفحه تعرفه‌ها مراجعه فرمایید.",
    },
    {
      id: "faq-4",
      question: "مدل پرداخت به میزان مصرف در این نرم‌افزار چگونه است و چه مزایایی برای خوابگاه دارد؟",
      answer:
        "در مدل درآمدی «پرداخت به میزان مصرف» (pay-as-you-go)، شما فقط به اندازه‌ای که از خدمات نرم‌افزار استفاده می‌کنید، هزینه پرداخت می‌کنید. نیازی به خرید بسته یا پرداخت مبلغ ثابت ماهانه وجود ندارد. هر زمان نیاز داشتید، کیف‌پول خود را شارژ می‌کنید و تنها بابت همان میزان مصرف مبلغ پرداخت می‌شود.",
    },
    {
      id: "faq-5",
      question: "آیا این نرم‌افزار پشتیبانی ارائه می‌دهد؟",
      answer:
        "این نرم‌افزار با پشتیبانی حرفه‌ای، همواره پاسخگوی نیازهای شماست. تیم ما از طریق ایمیل و تماس تلفنی، در تمامی مراحل استفاده همراه‌تان خواهد بود.",
    },
  ],
  supportHeading: "Still have questions?",
  supportDescription:
    "Can't find the answer you're looking for? Our support team is here to help with any technical questions or concerns.",
  supportButtonText: "Contact Support",
  supportButtonUrl: "https://shadcnblocks.com",
};