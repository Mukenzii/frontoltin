import React from 'react';
import { IconType } from 'types/utility.types';

const HomeIcon: IconType = (props) => (
  <svg
    width="24"
    height="22"
    viewBox="0 0 24 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19.6364 22H4.36364C4.07431 22 3.79683 21.882 3.59225 21.6721C3.38766 21.4621 3.27273 21.1773 3.27273 20.8803V10.8031H0L11.2658 0.291519C11.4667 0.103946 11.7285 0 12 0C12.2715 0 12.5333 0.103946 12.7342 0.291519L24 10.8031H20.7273V20.8803C20.7273 21.1773 20.6123 21.4621 20.4078 21.6721C20.2032 21.882 19.9257 22 19.6364 22ZM5.45455 19.7606H18.5455V8.73955L12 2.63278L5.45455 8.73955V19.7606ZM7.63636 15.2819H16.3636V17.5213H7.63636V15.2819Z"
      fill={props.color}
    />
  </svg>
);

export default HomeIcon;
