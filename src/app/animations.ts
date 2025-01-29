import { trigger, transition, style, animate, keyframes, state, animation, useAnimation } from '@angular/animations';

// Existing Animations
export const fadeIn = animation([
  style({ opacity: 0 }),
  animate('300ms ease-out', style({ opacity: 1 }))
]);

export const fadeOut = animation([
  animate('300ms ease-in', style({ opacity: 0 }))
]);

export const slideInRight = animation([
  animate('300ms ease-out', keyframes([
    style({ transform: 'translateX(100%)', opacity: 0, offset: 0 }),
    style({ transform: 'translateX(0)', opacity: 1, offset: 1 })
  ]))
]);

export const fadeInAnimation = trigger('fadeInAnimation', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.9)' }),
    animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
  ]),
]);

export const routeAnimations = trigger('routeAnimations', [
  transition('* <=> *', [
    style({ position: 'relative' }),
    useAnimation(fadeIn, { params: { timing: '300ms ease-out' } })
  ])
]);

export const tableAnimation = trigger('tableAnimation', [
  transition('void => *', [
    style({ opacity: 0, transform: 'translateY(20px)' }),
    animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
  ]),
]);

export const buttonAnimation = trigger('buttonAnimation', [
  transition('void => *', [
    style({ opacity: 0, transform: 'scale(0.8)' }),
    animate('300ms 100ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
  ]),
]);

export const fadeInTrigger = trigger('fadeInTrigger', [
  transition('void => *', [
    style({ opacity: 0 }),
    animate('500ms ease-in', style({ opacity: 1 })),
  ]),
]);

export const fadeInState = trigger('fadeInState', [
  state('in', style({ opacity: 1 })),
  transition('void => in', [
    style({ opacity: 0 }),
    animate('0.5s ease-in')
  ])
]);

export const buttonHover = trigger('buttonHover', [
  state('hover', style({ transform: 'scale(1.05)', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' })),
  transition('hover => *', [
    animate('0.3s ease')
  ]),
  transition('* => hover', [
    animate('0.3s ease')
  ])
]);

// New Animations for Table Rows and Floating Button

// Row Animation (For Table Rows)
export const rowAnimation = trigger('rowAnimation', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(20px)' }),
    animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
  ]),
  transition(':leave', [
    style({ opacity: 1, transform: 'translateY(0)' }),
    animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' })),
  ]),
]);

// Floating Action Button Animation
export const buttonScaleAnimation = trigger('buttonScaleAnimation', [
  transition('void => *', [
    style({ transform: 'scale(0)' }),
    animate('300ms ease-out', style({ transform: 'scale(1)' })),
  ]),
  transition('* => void', [
    animate('300ms ease-in', style({ transform: 'scale(0)' })),
  ]),
]);

// New animation for the Confirm Dialog
export const confirmDialogAnimation = trigger('confirmDialogAnimation', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.9)' }),
    animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
  ]),
]);

// New FadeIn and Bounce Animations
export const fadeInTriggerNew = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('500ms ease-in', style({ opacity: 1 }))
  ])
]);

export const bounce = trigger('bounce', [
  transition(':enter', [
    style({ transform: 'scale(0.5)' }),
    animate('500ms ease-out', style({ transform: 'scale(1)' }))
  ])
]);

// New Dialog Animations (for Fade In and Fade Out)
export const dialogFadeIn = trigger('dialogFadeIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.8)' }),
    animate('500ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
  ]),
]);

export const dialogFadeOut = trigger('dialogFadeOut', [
  transition(':leave', [
    style({ opacity: 1, transform: 'scale(1)' }),
    animate('300ms ease-in', style({ opacity: 0, transform: 'scale(0.8)' }))
  ])
]);
