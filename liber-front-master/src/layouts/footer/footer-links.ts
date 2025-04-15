import FaceBookIcon from 'components/icons/facebook.icon';
import InstagramIcon from 'components/icons/instagram.icon';
import TelegramIcon from 'components/icons/telegram.icon';
import TiktokIcon from 'components/icons/tik-tok.icon';
import YouTubeIcon from 'components/icons/yout-tube.icon';
import PlayStore from 'assets/png/googleplay.png';
import AppStore from 'assets/png/appstore.png';

interface FooterLinks {
  title_uz: string;
  title_ru: string;
  links: {
    label_uz?: string;
    label_ru?: string;
    href: string;
    img?: any;
  }[];
}

const footerLinks: FooterLinks[] = [
  {
    title_uz: 'Платформа хақида',
    title_ru: 'О платформе',
    links: [
      {
        label_uz: 'Liber ўзи нима?',
        label_ru: 'Что такое Либер?',
        href: '#',
      },
      {
        label_uz: 'Фойдаланиш шартлари',
        label_ru: 'Условия использования',
        href: '#',
      },
      {
        label_uz: 'Ёрдам',
        label_ru: 'Помощь',
        href: '#',
      },
    ],
  },
  {
    title_uz: 'Обуна хақида',
    title_ru: 'О подписке',
    links: [
      {
        label_uz: 'Обуна бўлиш',
        label_ru: 'Подписаться',
        href: '#',
      },
      {
        label_uz: 'Қандай тўлаш',
        label_ru: 'Как оплатить',
        href: '#',
      },
    ],
  },
  {
    title_uz: 'Китоблар',
    title_ru: 'Книги',
    links: [
      {
        label_uz: 'Аудио китоблар',
        label_ru: 'Аудиокниги',
        href: '#',
      },
      {
        label_uz: 'Электрон китоблар',
        label_ru: 'Электронные книги',
        href: '#',
      },
      {
        label_uz: 'Босма китоблар',
        label_ru: 'Печатные книги',
        href: '#',
      },
    ],
  },
  {
    title_uz: 'Мобил илова',
    title_ru: 'Мобильное приложение',
    links: [
      {
        img: PlayStore,
        href: '#',
      },
      {
        img: AppStore,
        href: '#',
      },
    ],
  },
];

export const socialLins = [
  {
    link: '#',
    Icon: FaceBookIcon,
  },
  {
    link: '#',
    Icon: YouTubeIcon,
  },
  {
    link: '#',
    Icon: TiktokIcon,
  },
  {
    link: '#',
    Icon: TelegramIcon,
  },
  {
    link: '#',
    Icon: InstagramIcon,
  },
];

export default footerLinks;
