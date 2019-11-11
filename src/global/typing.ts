export type ComponentStyle = 'plain' | 'primary' | 'success' | 'info' | 'warning' | 'danger';
export type ComponentSize = 'extra-small' | 'small' | 'normal' | 'medium' | 'large' | 'extra-large';

export type CenterPlacement = 'center';
export type EdgePlacement = 'top-center' | 'bottom-center' | 'right-center' | 'left-center';
export type CornerPlacement = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
export type Placement = EdgePlacement | CornerPlacement | CenterPlacement;

export type PositionHorizontal = 'left' | 'right';
export type PositionVertical = 'top' | 'bottom';