import * as UI from './ui.js';

export function Button(...args) {
	return (new UI.Button(...args)).appendThis();
}

export function ButtonLink(...args) {
	return (new UI.ButtonLink(...args)).appendThis();
}

export function Link(...args) {
	return (new UI.Link(...args)).appendThis();
}

export function Input(...args) {
	return (new UI.Input(...args)).appendThis();
}

export function Select(...args) {
	return (new UI.Select(...args)).appendThis();
}

export function Block(...args) {
	return (new UI.Block(...args)).appendThis();
}

export function Header(...args) {
	return (new UI.Header(...args)).appendThis();
}

export function Text(...args) {
	return (new UI.Text(...args)).appendThis();
}

export function Paragraph(...args) {
	return (new UI.Paragraph(...args)).appendThis();
}

export function Newline(...args) {
	return (new UI.Newline(...args)).appendThis();
}

export function Badge(...args) {
	return (new UI.Badge(...args)).appendThis();
}

export function Container(...args) {
	return (new UI.Container(...args)).appendThis();
}

export function HorizontalLayout(...args) {
	return (new UI.HorizontalLayout(...args)).appendThis();
}

export function NavigationMenu(...args) {
	return (new UI.NavigationMenu(...args)).appendThis();
}

export function Card(...args) {
	return (new UI.Card(...args)).appendThis();
}

export function List(...args) {
	return (new UI.List(...args)).appendThis();
}

export function Segment(...args) {
	return (new UI.Segment(...args)).appendThis();
}

export function Overlay(...args) {
	return (new UI.Overlay(...args)).appendThis();
}

export function TopMenu(...args) {
	return (new UI.TopMenu(...args)).appendThis();
}

export function BottomMenu(...args) {
	return (new UI.BottomMenu(...args)).appendThis();
}

export function Space(...args) {
	return (new UI.Space(...args)).appendThis();
}

export const importCSSFiles = UI.importCSSFiles;
export const useLoader = UI.useLoader;