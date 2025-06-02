import { IconType } from 'react-icons';

declare module 'react-icons' {
  export interface IconBaseProps extends React.SVGAttributes<SVGElement> {
    children?: never;
    size?: string | number;
  }

  export declare type IconType = (props: IconBaseProps) => JSX.Element;
}